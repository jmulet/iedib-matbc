/** 
 * Common functions @IEDIB organized into an API
 * Josep Mulet Pol (pmulet@iedib.net) 
 **/

window.iedibAPI = window.iedibAPI || { DEBUG: false };

// Insert script to head or the end of body
// isPrepend to the beginning of the head
window.iedibAPI.insertScript = function (url, isPrepend = false, toBody = false, isAsync = false) {
    // Check if this script is already in page
    const scripts = document.getElementsByTagName('script');
    let found = false;
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === url) {
            found = true;
            break;
        }
    }
    if (found) {
        return;
    }
    const tag = document.createElement('script');
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
            const script0 = scripts[0];
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
    const params = {};
    if (!url) return params;

    let search;
    if (url.startsWith('?')) {
        search = url;
    } else if (url.indexOf('?') !== -1) {
        search = url.substring(url.indexOf('?'));
    } else {
        search = '?' + url;
    }

    const urlParams = new URLSearchParams(search);
    for (const [key, value] of urlParams.entries()) {
        params[key] = value || true;
    }
    return params;
};

// Change july2020: boost detection
window.iedibAPI.isBoost = function () {
    return document.querySelector('div[data-region="drawer-toggle"]') !== null;
};

// Change june2020: Allow guest user detection
// Change july2020: isTeacher, chapterid --> boost detection
window.iedibAPI.getPageInfo = function () {
    if (!document.querySelector) {
        return {};
    }
    // Get current user information
    let userId;
    let userFullname;

    const dataUserId = document.querySelector('[data-userid]');
    if (dataUserId) {
        userId = dataUserId.getAttribute('data-userid');
    }
    // Moodle4.1
    const userTextLink = document.querySelector('.footer-section .logininfo a[href*="profile.php"]');
    const isMoodle41 = userTextLink !== null;
    if (userTextLink) {
        userFullname = userTextLink.innerText;
    } else {
        const userTextElems = document.getElementsByClassName("usertext");
        if (userTextElems && userTextElems.length) {
            userFullname = userTextElems[0].innerText;
        }
    }

    if (!userId) {
        userId = -1;
        userFullname = "Usuari convidat";
    }

    // Get information about book id and chapter id (from the current url)
    let params = {};
    if (location.search) {
        params = iedibAPI.parseUrlParams(location.search);
    }
    let chapterId = params.chapterid;
    if (!chapterId) {
        // On first page, chapterid might not appear
        // Case on boost
        let ele = document.querySelector('input[name="chapterid"]');
        if (ele) {
            chapterId = ele.value;
        } else {
            // Try Moodle41
            ele = document.querySelector('section.block_book_toc a:first-child');
            if (ele) {
                const url = ele.href;
                const params2 = iedibAPI.parseUrlParams(url);
                chapterId = params2.chapterid || "";
            }
        }
    }

    let bookId = params.id;
    if (!bookId) {
        const ele = document.querySelector('div.singlebutton > form > input[name="id"]');
        if (ele) {
            bookId = ele.value;
        }
    }

    // Generate a unique identifier for the day and user (no cookies over wire)
    const dateStr = new Date().toISOString().slice(0, 10);
    const moodleSession = btoa(`${userId}-${dateStr}`).replace(/=/g, '');

    // Get information about the course
    window.M = window.M || { cfg: {} };
    let courseId = M.cfg.courseId ?? 0;
    let courseName;
    let isTeacher = 0;
    if (isMoodle41) {
        // Moodle 4.1
        isTeacher = document.querySelector('form.editmode-switch-form input[type="checkbox"].custom-control-input') !== null ? 1 : 0;
        // CourseName
        const elem = document.querySelector('#page-navbar ol.breadcrumb li.breadcrumb-item:first-child > a');
        if (elem) {
            courseName = elem.innerText;
        }
    } else {
        isTeacher = document.querySelector('.teacherdash.nav-item.nav-link') !== null ? 1 : 0;
        const footer = document.querySelector(".homelink > a");

        if (footer) {
            courseName = footer.innerText;
            const hrefVal = "?" + (footer.href.split("?")[1] || "");
            courseId = iedibAPI.parseUrlParams(hrefVal).id;
        }
    }

    const site = (location.href.split("?")[0] || "").replace("/mod/book/view.php", "");
    window.iedibAPI.lliurament = window.iedibAPI.lliurament || {};
    return {
        userId,
        userFullname,
        bookId,
        chapterId,
        assignNum: window.iedibAPI.lliurament.id || 0,
        assignName: window.iedibAPI.lliurament.title || "",
        courseName,
        courseId,
        isTeacher,
        site,
        moodleSession
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
                callback?.();
            });
        }, 'function');
        return;
    }

    let interval;
    const checkFn = () => {
        return (!type && typeof window[prop] !== "undefined") || (type && typeof window[prop] === type);
    };

    const timer_fn = function () {
        if (checkFn()) {
            if (interval) {
                window.clearInterval(interval);
            }
            if (window.iedibAPI.DEBUG) console.log("Found " + prop, window[prop]);
            callback?.();
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
        window.require(deps, function (...args) {
            if (callback) {
                callback(...args);
            }
        });
    }, 'function');
};

window.iedibAPI.createStyleSheet = function (src, id) {
    if (id && document.getElementById(id)) {
        return;
    }
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = src;
    if (id) {
        style.id = id;
    }
    document.head.appendChild(style);
};

window.iedibAPI.createLinkSheet = function (href, id) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    if (id) {
        link.id = id;
    }
    document.head.appendChild(link);
};

window.iedibAPI.addBookEvent = function (element, evnt, funct) {
    return element.addEventListener(evnt, funct, false);
};

window.iedibAPI.ready = function (fun) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        fun();
    } else {
        document.addEventListener('DOMContentLoaded', fun, false);
    }
};

// Converts seconds to human readable time lapse
window.iedibAPI.convertTimeLapse = function (delta) {
    if (!delta) {
        return "mai";
    }
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const seconds = delta % 60;

    if (days) {
        return `${days} d  ${hours} h`;
    } else if (hours) {
        return `${hours} h  ${minutes} min`;
    } else if (minutes) {
        return `${minutes} min  ${seconds} s`;
    } else {
        return `${seconds} s`;
    }
};

// Parses yyyy-mm-dd hh:mm
window.iedibAPI.parseDate = function (str) {
    if (!str) return new Date();
    const parts = str.trim().split(/\s+/);
    let sep = "-";
    if (parts[0].indexOf("/") > 0) {
        sep = "/";
    }
    const datePart = parts[0].split(sep);
    const timePart = (parts[1] || "0:0").split(":");
    return new Date(datePart[0], datePart[1] - 1, datePart[2], timePart[0] || 0, timePart[1] || 0);
};

//Convert date to string
const myLocale = (d) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

// Initialize components
(function () {
    const pageInfo = window.iedibAPI.getPageInfo();
    const cId = String(pageInfo.courseId);
    const isBAT1 = cId === '55';
    const isBAT2 = cId === '56' || cId === '102';

    if (isBAT1 || isBAT2) {
        let aiHook = document.querySelector('div[role="main"] div.ai-course-summarise-controls');
        if (!aiHook) {
            const main = document.querySelector('div[role="main"]');
            if (main) {
                aiHook = document.createElement("DIV");
                aiHook.classList.add('ai-course-summarise-controls', 'pt-3', 'pb-3');
                main.prepend(aiHook);
            }
        }
        if (aiHook) {
            const assistantURL = isBAT1 ? 'https://chatgpt.com/g/g-6852662ed1bc81919120a6237e44ec61-assistent-de-matematiques-i' :
                'https://chatgpt.com/g/g-68526aaaba9c8191aa8c6eecd60372ed-assistent-de-matematiques-ii';

            aiHook.innerHTML = `
                <a href="${assistantURL}" target="_blank" class="btn btn-outline-secondary" data-toggle="tooltip" data-original-title="Demana ajuda a l'assistent del curs">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="#818a95">
                        <path d="M64 416L168.6 180.7c15.3-34.4 40.3-63.5 72-83.7l146.9-94c3-1.9 6.5-2.9 10-2.9C407.7 0 416 8.3 416 18.6l0 1.6c0 2.6-.5 5.1-1.4 7.5L354.8 176.9c-1.9 4.7-2.8 9.7-2.8 14.7c0 5.5 1.2 11 3.4 16.1L448 416l-207.1 0 11.8-35.4 40.4-13.5c6.5-2.2 10.9-8.3 10.9-15.2s-4.4-13-10.9-15.2l-40.4-13.5-13.5-40.4C237 276.4 230.9 272 224 272s-13 4.4-15.2 10.9l-13.5 40.4-40.4 13.5C148.4 339 144 345.1 144 352s4.4 13 10.9 15.2l40.4 13.5L207.1 416 64 416zM279.6 141.5c-1.1-3.3-4.1-5.5-7.6-5.5s-6.5 2.2-7.6 5.5l-6.7 20.2-20.2 6.7c-3.3 1.1-5.5 4.1-5.5 7.6s2.2 6.5 5.5 7.6l20.2 6.7 6.7 20.2c1.1 3.3 4.1 5.5 7.6 5.5s6.5-2.2 7.6-5.5l6.7-20.2 20.2-6.7c3.3-1.1 5.5-4.1 5.5-7.6s-2.2-6.5-5.5-7.6l-20.2-6.7-6.7-20.2zM32 448l448 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
                    </svg> Assistent IA
                </a>`;
        }
    }

    // Do smooth scroll to #where for tags annotated with class ib-smooth-scroll
    const scrollToElement = (target, offset = 0) => {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        } else {
            window.scrollTo(0, targetPosition);
        }
    };

    document.querySelectorAll("a.ib-smooth-scroll").forEach(link => {
        const where = link.getAttribute('href');
        if (where && where.startsWith('#')) {
            const wherename = where.slice(1);
            const target = document.querySelector(`a[name="${wherename}"], #${wherename}`);
            if (target) {
                link.addEventListener('click', (evt) => {
                    evt.preventDefault();
                    scrollToElement(target, 60);
                });
            }
        }
    });

    // TinyMCE removes onload on geogebra iframe's, add manually
    document.querySelectorAll('iframe.pw-ggb').forEach(e => {
        const id = e.id?.replace('ggb', 'ggb_spinner');
        const spinner = document.querySelector('#' + id);
        if (!spinner) {
            return;
        }
        e.onload = () => {
            spinner.style.display = 'none';
        };
        // After a long wait, remove them
        window.setTimeout(() => { if (spinner) spinner.style.display = 'none'; }, 4000);
    });

    // Handle iedib-restricted-access class (Replaced jQuery with fetch)
    const restrictedElems = document.querySelectorAll(".iedib-restricted-access");
    if (restrictedElems.length > 0) {
        fetch("https://videotracker.ibsuite.es/iedibapi/date")
            .then(response => response.json())
            .then(json_res => {
                const serverDate = new Date(json_res);
                restrictedElems.forEach(e => {
                    const fromdate = window.iedibAPI.parseDate(e.getAttribute("data-fromdate"));
                    const resElems = e.querySelectorAll(".pw-resolucio");

                    resElems.forEach(eres => {
                        if (pageInfo.isTeacher) {
                            eres.style.display = "";
                            eres.style.background = (fromdate > serverDate) ? "lightgray" : "#eefbff";
                        } else {
                            if (fromdate <= serverDate) {
                                eres.style.display = "";
                                eres.style.background = "#eefbff";
                            } else {
                                eres.style.display = "";
                                eres.style.background = "lightgray";
                                eres.innerHTML = `<p>S'obrirà la solució dia ${myLocale(fromdate)}</p>`;
                            }
                        }
                    });
                });
            })
            .catch(err => {
                if (window.iedibAPI.DEBUG) console.error("Error fetching restricted access date:", err);
            });
    }
})();
