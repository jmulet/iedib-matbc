/** 
 * Common functions @IEDIB organized into an API
 * Josep Mulet Pol (pmulet@iedib.net) 
 **/

window.iedibAPI = window.iedibAPI || { DEBUG: false };

// Insert script to head or the end of body
// isPrepend to the beginning of the head
window.iedibAPI.insertScript = function (url, isPrepend, toBody, isAsync) {
    // Check if this script is already in page
    var scripts = document.getElementsByTagName('script');
    var found;
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i]
        if (script.src === url) {
            found = true;
            break;
        }
    }
    if (found) {
        return;
    }
    var tag = document.createElement('script');
    tag.src = url;
    tag.type = "text/javascript";
    if (isAsync) {
        tag.async = true;
        if (typeof isAsync === 'function') {
            console.error("Setting onload");
            tag.onload = function () { isAsync(); };
        }
    }
    if (toBody) {
        // Append to the end of the body
        document.body.appendChild(tag);
    } else {
        // Append to the head
        if (isPrepend && scripts.length) {
            var script0 = scripts[0];
            script0.parentNode.insertBefore(tag, script0);
        } else {
            document.head.appendChild(tag);
        }
    }
};

window.iedibAPI.insertScriptBody = function (url) {
    window.iedibAPI.insertScript(url, false, true);
};

window.iedibAPI.parseUrlParams = function (url) {
    var params = {};
    var parts = url.substring(1).split('&');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
    return params;
};

// Change july2020: boost detection
window.iedibAPI.isBoost = function () {
    return document.querySelector('div[data-region="drawer-toggle"]') != null;
};

// Change june2020: Allow guest user detection
// Change july2020: isTeacher, chapterid --> boost detection
window.iedibAPI.getPageInfo = function () {
    if (!document.querySelector) {
        return {};
    }
    // Get current user information
    var userId;
    var userFullname;

    var dataUserId = document.querySelector('[data-userid]');
    if (dataUserId) {
        userId = dataUserId.getAttribute('data-userid');
    }
    // Moodle4.1
    var userText = document.querySelector('.footer-section .logininfo a[href*="profile.php"]');
    var isMoodle41 = userText != null;
    if (userText) {
        userFullname = userText.innerText;
    } else {
        var userText = document.getElementsByClassName("usertext");
        if (userText && userText.length) {
            userFullname = userText[0].innerText;
        }
    }

    if (!userId) {
        //TODO:: check if the current user is guest
        userId = -1;

        userFullname = "Usuari convidat";
    }

    // Get information about book id and chapter id (from the current url)
    var params = {};
    if (location.search) {
        params = iedibAPI.parseUrlParams(location.search);
    }
    var chapterId = params.chapterid;
    if (!chapterId) {
        // On first page, chapterid might not appear
        // Case on boost
        var ele = document.querySelector('input[name="chapterid"]');
        if (ele) {
            chapterId = ele.value;
        } else {
            // Try Moodle41
            ele = document.querySelector('section.block_book_toc a:first-child');
            if (ele) {
                var url = ele.href;
                var params2 = iedibAPI.parseUrlParams(url);
                chapterId = params2.chapterid || "";
            }
        }
    }

    var bookId = params.id;
    if (!bookId) {
        var ele = document.querySelector('div.singlebutton > form > input[name="id"]');
        if (ele) {
            bookId = ele.value;
        }
    }

    // Get cookie for MoodleSession
    //var moodleSession = (document.cookie || "").split("MoodleSession=")[1];
    //moodleSession = moodleSession.split(";")[0];
    var cookie = (document.cookie || "");
    var eq_cookie_pos = cookie.indexOf("=");
    var moodleSession = "";
    if (eq_cookie_pos > 0) {
        moodleSession = cookie.substr(eq_cookie_pos + 1);
    }
    if (moodleSession && moodleSession.indexOf(";") > 0) {
        moduleSession = moodleSession.split(";")[0];
    }

    // Get information about the course
    var courseId = M.cfg.courseId;
    var courseName;
    var isTeacher = 0;
    if (isMoodle41) {
        // Moodle 4.1
        isTeacher = document.querySelector('form.editmode-switch-form input[type="checkbox"].custom-control-input') != null ? 1 : 0;
        // CourseName
        var elem = document.querySelector('#page-navbar ol.breadcrumb li.breadcrumb-item:first-child > a');
        if (elem) {
            courseName = elem.innerText;
        }
    } else {
        isTeacher = document.querySelector('.teacherdash.nav-item.nav-link') != null ? 1 : 0;
        var footer = document.querySelector(".homelink > a");

        if (footer) {
            courseName = footer.innerText;
            var hrefVal = "?" + (footer.href.split("?")[1] || "");
            courseId = iedibAPI.parseUrlParams(hrefVal).id;
        }
    }

    /* var isTeacher = document.querySelector('.teacherdash.nav-item.nav-link') != null? 1 : 0;
    if(!isTeacher) {
        
      isTeacher = document.querySelector('div.singlebutton > form > input[type="hidden"][name="edit"] ~ button[type="submit"]')
                     != null? 1 : 0;
     
         isTeacher = document.querySelector('.usermenu li a[href*="switchrole"]') != null? 1 : 0;
    }
   */

    var site = (location.href.split("?")[0] || "").replace("/mod/book/view.php", "");
    window.iedibAPI.lliurament = window.iedibAPI.lliurament || {};
    return {
        userId: userId, userFullname: userFullname, bookId: bookId, chapterId: chapterId,
        assignNum: window.iedibAPI.lliurament.id || 0,
        assignName: window.iedibAPI.lliurament.title || "",
        courseName: courseName, courseId: courseId, isTeacher: isTeacher, site: site, moodleSession: moodleSession
    };
};

window.iedibAPI.waitForWindow = function (prop, callback, type) {
    if (prop === '$') {
        window.iedibAPI.waitForWindow('require', function () {
            window.require(['jquery'], function ($) {
                if (!window.$) {
                    window.$ = $;
                    window.jQuery = $;
                }
                callback && callback();
            });
        }, 'function');
    }
    var interval;
    var timer_fn = function () {
        if ((!type && typeof window[prop] != "undefined") || (type && typeof window[prop] == type)) {
            if (interval) {
                window.clearInterval(interval);
            }
            console.log("Found " + prop, window[prop]);
            callback && callback();
        }
        else {
            if (!interval) {
                interval = window.setInterval(timer_fn, 250);
            }
        }
    };
    timer_fn();
};

window.iedibAPI.require = function (deps, callback) {
    window.iedibAPI.waitForWindow('require', function () {
        window.require(deps, function () {
            if (callback) {
                callback.apply(null, Array.prototype.slice.call(arguments));
            }
        });
    }, 'function');
};

window.iedibAPI.createStyleSheet = function (src, id) {
    if (id && document.getElementById(id)) {
        return;
    }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = src;
    if (id) {
        style.id = id;
    }
    document.getElementsByTagName('head')[0].appendChild(style);
};

window.iedibAPI.createLinkSheet = function (href, id) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
};

window.iedibAPI.addBookEvent = function (element, evnt, funct) {
    if (element.attachEvent) {
        return element.attachEvent('on' + evnt, funct);
    } else {
        return element.addEventListener(evnt, funct, false);
    }
};

window.iedibAPI.ready = function (fun) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        fun();
    } else {
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fun, false);
        } else if (window.attachEvent) {
            window.attachEvent('onload', fun);
        } else {
            fun();
        }
    }
};

// Converts seconds to human readable time lapse
window.iedibAPI.convertTimeLapse = function (delta) {
    if (!delta) {
        return "mai";
    }
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    var seconds = delta % 60;

    if (days) {
        return days + " d  " + hours + " h";
    } else if (hours) {
        return hours + " h  " + minutes + " min";
    } else if (minutes) {
        return minutes + " min  " + seconds + " s";
    } else {
        return seconds + " s";
    }
};

// Parses yyyy-mm-dd hh:mm
window.iedibAPI.parseDate = function (str) {
    var parts = str.replace(/ /g, " ").split(" ");
    var sep = "-";
    if (parts[0].indexOf("/") > 0) {
        sep = "/";
    }
    var datePart = parts[0].split(sep);
    var timePart = parts[1].split(":");
    return new Date(datePart[0], datePart[1] - 1, datePart[2], timePart[0] || 0, timePart[1] || 0);
};

//Convert date to string
function myLocale(d) {
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
}

var pageInfo = window.iedibAPI.getPageInfo();
var cId = pageInfo.courseId + '';
var isBAT1 = cId === '55';
var isBAT2 = cId === '56' || cId === '102';
if (isBAT1 || isBAT2) {
    var aiHook = document.querySelector('div[role="main"] div.ai-course-summarise-controls');
    if (!aiHook) {
        // On Moodle 4.1 does not exist
        var main = document.querySelector('div[role="main"]');
        if (main) {
            aiHook = document.createElement("DIV");
            aiHook.classList.add('ai-course-summarise-controls', 'pt-3', 'pb-3');
            main.prepend(aiHook);
        }
    }
    var assistantURL = isBAT1 ? 'https://chatgpt.com/g/g-6852662ed1bc81919120a6237e44ec61-assistent-de-matematiques-i' :
    'https://chatgpt.com/g/g-68526aaaba9c8191aa8c6eecd60372ed-assistent-de-matematiques-ii';
    aiHook.innerHTML = '<a href="' + assistantURL + '" target="_blank" class="btn btn-outline-secondary" data-toggle="tooltip" data-original-title="Demana ajuda a l\'assistent del curs">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="#818a95"><path d="M64 416L168.6 180.7c15.3-34.4 40.3-63.5 72-83.7l146.9-94c3-1.9 6.5-2.9 10-2.9C407.7 0 416 8.3 416 18.6l0 1.6c0 2.6-.5 5.1-1.4 7.5L354.8 176.9c-1.9 4.7-2.8 9.7-2.8 14.7c0 5.5 1.2 11 3.4 16.1L448 416l-207.1 0 11.8-35.4 40.4-13.5c6.5-2.2 10.9-8.3 10.9-15.2s-4.4-13-10.9-15.2l-40.4-13.5-13.5-40.4C237 276.4 230.9 272 224 272s-13 4.4-15.2 10.9l-13.5 40.4-40.4 13.5C148.4 339 144 345.1 144 352s4.4 13 10.9 15.2l40.4 13.5L207.1 416 64 416zM279.6 141.5c-1.1-3.3-4.1-5.5-7.6-5.5s-6.5 2.2-7.6 5.5l-6.7 20.2-20.2 6.7c-3.3 1.1-5.5 4.1-5.5 7.6s2.2 6.5 5.5 7.6l20.2 6.7 6.7 20.2c1.1 3.3 4.1 5.5 7.6 5.5s6.5-2.2 7.6-5.5l6.7-20.2 20.2-6.7c3.3-1.1 5.5-4.1 5.5-7.6s-2.2-6.5-5.5-7.6l-20.2-6.7-6.7-20.2zM32 448l448 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg> Assistent IA</a>';
}
    
// Handle iedib-restricted-access class (jQuery ajax is required so wait for it!)
window.iedibAPI.require(['jquery'], function ($) {
    var $elems = $(".iedib-restricted-access");
    if ($elems.length) {
        // query datetime from server
        $.ajax({
            method: "GET",
            url: "https://piworld.es/iedibapi/date",
            dataType: "json"
        }).done(function (json_res) {
            console.log(json_res)
            var serverDate = new Date(json_res);
            console.log(pageInfo);
            for (var i = 0, elems_length = $elems.length; i < elems_length; i++) {
                var $e = $($elems[i]);
                var fromdate = window.iedibAPI.parseDate($e.attr("data-fromdate"));
                // only hide class .pw-resolucio
                var $eres = $e.find(".pw-resolucio");
                if (pageInfo.isTeacher) {
                    $eres.css("display", "")
                    if (fromdate > serverDate) {
                        $eres.css("background", "lightgray");
                    } else {
                        $eres.css("background", "#eefbff");
                    }
                } else {
                    if (fromdate <= serverDate) {
                        $eres.css("display", "");
                        $eres.css("background", "#eefbff");
                    } else {
                        $eres.css("display", "");
                        $eres.css("background", "lightgray");
                        $eres.html("<p>S'obrirà la solució dia " + myLocale(fromdate) + "</p>");
                    }
                }
            }
        });
    }

}, "function");

