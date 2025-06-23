

window.iedibAPI = window.iedibAPI || {};
window.iedibAPI.DEBUG = false;

window.iedibAPI.cleanVideo = function (evt) {
    var videoId = this.dataset.videoid;
    var vop = getVideosOnPage(videoId);
    var title = vop ? vop.name : "";
    if (!window.confirm("Segur que voleu eliminar les entrades del vídeo ``" + title + " (" + videoId + ") " + "´´ d'aquest llibre?")) {
        return;
    }

    var pi = window.iedibAPI.pi;
    ajax("https://piworld.es/iedibapi/video/clean", { isTeacher: pi.isTeacher, courseId: pi.courseId, bookId: pi.bookId, site: pi.site, videoId: videoId }, function (resRaw) {
        var res = JSON.parse(resRaw);
        if (res.changes) {
            var p = evt.target.parentNode;
            p.parentNode.removeChild(p);
        }
    });

};

window.iedibAPI.replaceVideo = function (evt) {
    var videoId = this.dataset.videoid;
    var pi = window.iedibAPI.pi;
    var title = vop ? vop.name : "";
    if (!window.confirm("Segur que voleu modificat les entrades del vídeo ``" + title + " (" + videoId + ") " + "´´ d'aquest llibre?")) {
        return;
    }

};

window.iedibAPI.report = function (evt) {
    var videoId = this.dataset.videoid;
    var pi = window.iedibAPI.pi;

};

require(["jquery", "core/modal_factory"], function($, ModalFactory){

// -------------------------------- UTILITY METHODS
// Extract query parameters from url
var parseUrlParams = function (url) {
    var params = {};
    var parts = url.substring(1).split('&');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
    return params;
};

// Cross browser ajax
var ajax = function (url, data, successCB, errorCB) {
    try {
        var x = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
        x.open(data ? 'POST' : 'GET', url, 1);
        //x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.setRequestHeader('Content-type', 'application/json');
        x.onreadystatechange = function () {
            if (x.readyState > 3) {
                successCB && successCB(x.responseText, x);
            } else {
                errorCB && errorCB(x.responseText, x);
            }
        };
        x.send(JSON.stringify(data));
    } catch (e) {
        console.log(e);
        errorCB && errorCB(e);
    }
};

// Cross browser load function
/*
var ready = function (fun, elem) {
    elem = elem || window.document;
    if (elem.readyState === "complete" || elem.readyState === "interactive") {
        fun();
    } else {
        if (elem.addEventListener) {
            elem.addEventListener('DOMContentLoaded', fun, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('onload', fun);
        } else {
            fun();
        }
    }
};
*/

//Extends the src object into the dst
var obj_extend = function (dst, src) {
    var keys = Object.keys(src);
    for (var i = 0; i < keys.length; i++) {
        dst[keys[i]] = src[keys[i]];
    }
};

//Converts a map into a string
var map2str = function (map) {
    var keys = Object.keys(map);
    var flat = [];
    for (var i = 0; i < keys.length; i++) {
        flat.push(map[keys[i]]);
    }
    return flat.join(" ");
}
// Insert script after or before 
var insertScript = function (url, isBefore, isBody) {
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

    if(isBody) {
        // Append to the end of the body
        document.body.appendChild(tag);
    } else {
        // Append to the head
        if (isBefore && scripts.length) {
            var script0 = scripts[0];
            script0.parentNode.insertBefore(tag, script0);
        } else {
            document.head.appendChild(tag);
        }
    }
};

var getPageInfo = function () {
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
    var userText = document.getElementsByClassName("usertext");
    if (userText && userText.length) {
        userFullname = userText[0].innerText;
    }

    // Get information about book id and chapter id
    var params = {};

    if (location.search) {
        params = parseUrlParams(location.search);
    }
    // Get cookie for MoodleSession
    var moodleSession = (document.cookie || "").split("MoodleSession=")[1];
    moodleSession = moodleSession.split(";")[0];

    // Get information about the course
    var courseId;
    var courseName;

    var footer = document.querySelector(".homelink > a");

    if (footer) {
        courseName = footer.innerText;
        var hrefVal = "?" + (footer.href.split("?")[1] || "");
        courseId = parseUrlParams(hrefVal).id;
    }

    var isTeacher = document.querySelector('.usermenu li a[href*="switchrole"]') != null;
    var site = (location.href.split("?")[0] || "").replace("/mod/book/view.php", "");
    return {
        userId: userId, userFullname: userFullname, bookId: params.id, chapterId: params.chapterid, term: window.iedibAPI.lliurament > 4 ? 2 : 1,
        courseName: courseName, courseId: courseId, isTeacher: isTeacher, site: site, moodleSession: moodleSession
    };
};

var getDescriptionById = function (arr, id) {
    var n = arr.length;
    var i = 0;
    var f = "";
    while (i < n && f.length == 0) {
        if (arr[i].id == id) {
            f = map2str(arr[i].description);
        }
        i += 1;
    }
    return f;
}

// Stoppable interval
var AJAX_INTERVAL = 10;

var RecurringTimer = function (callback, delay) {
    var timerId, start, remaining = delay;
    this.pause = function () {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
        timerId = null;
    };
    this.paused = function () {
        return timerId === null;
    };
    var resume = function () {
        start = new Date();
        timerId = window.setTimeout(function () {
            remaining = delay;
            resume();
            callback();
        }, remaining);
    };
    this.resume = resume;
};

var videosOnPage = {};
var isOnline = true;

var getVideosOnPage = function (videoId) {
    console.log(videosOnPage, videoId);
    var f = null;
    var i = 0;
    var keys = Object.keys(videosOnPage);
    while (!f && i < keys.length) {
        if (videosOnPage[keys[i]].h5pId == videoId || videosOnPage[keys[i]].ytId == videoId) {
            f = videosOnPage[keys[i]];
        }
        i++;
    }
    console.log("return f", f);
    return f;
};

var drawProgressStars = function (fstars, container) {
    var builder;
    if (fstars <= 0.2) {
        builder = '<img src="https://piworld.es/iedib/img/star-empty.png"><img src="https://piworld.es/iedib/img/star-empty.png"><img src="https://piworld.es/iedib/img/star-empty.png">';
    } else if (fstars > 0.2 && fstars <= 0.6) {
        builder = '<img src="https://piworld.es/iedib/img/star.png"><img src="https://piworld.es/iedib/img/star-empty.png"><img src="https://piworld.es/iedib/img/star-empty.png">';
    } else if (fstars > 0.6 && fstars <= 0.8) {
        builder = '<img src="https://piworld.es/iedib/img/star.png"><img src="https://piworld.es/iedib/img/star.png"><img src="https://piworld.es/iedib/img/star-empty.png">';
    } else {
        builder = '<img src="https://piworld.es/iedib/img/star.png"><img src="https://piworld.es/iedib/img/star.png"><img src="https://piworld.es/iedib/img/star.png">';
    }
    container.innerHTML = builder;
    container.title = "Aconseguit " + (fstars * 100).toFixed(0) + "%"
};

var scale_color = function (f) {
    var x = Math.floor(255 * (1 - f));
    return "rgb(" + x + ",255," + x + ")";
};

var drawTimeSegments = function (segm, duration, container) {
    var builder = [];
    var d6 = duration / 6.0;
    var total = 0.0;
    for (var i = 0; i < segm.length; i++) {
        total += segm[i];
        var color = scale_color(d6 > 0 ? (segm[i] / d6) : 0.0);
        builder.push('<span style="width:15px;height:15px;display:table-cell;border:1px solid gray;background:' + color + '"></span>');
    }
    container.innerHTML = builder.join("");
    if (duration > 0) {
        container.title = "Visualitzat " + (total * 100 / duration).toFixed(0) + "%";
    }
};

var turnErrorMode = function () {
    var pwvts = document.getElementsByClassName("iedib-caption-progress");
    for (var i = 0; i < pwvts.length; i++) {
        pwvts[i].style.background = "orangered";
        pwvts[i].title = "El registre de vídeos no funciona en aquests moments. No podreu obtenir punts fins que no s'activi.";
    }
};

var updateTimes = function (vonpage, t1) {
    var t0 = vonpage.t0;
    if (t1 - t0 > 2) {
        // Probably seeking
        vonpage.t0 = t1;
        return;
    }
    var d6 = vonpage.duration / 6.0;
    if (t0 <= d6) {
        vonpage.info.seconds1 += 1;
    } else if (t0 > d6 && t0 <= 2 * d6) {
        vonpage.info.seconds2 += 1;
    } else if (t0 > 2 * d6 && t0 <= 3 * d6) {
        vonpage.info.seconds3 += 1;
    } else if (t0 > 3 * d6 && t0 <= 4 * d6) {
        vonpage.info.seconds4 += 1;
    } else if (t0 > 4 * d6 && t0 <= 5 * d6) {
        vonpage.info.seconds5 += 1;
    } else {
        vonpage.info.seconds6 += 1;
    }

    // Check for deadman
    if(vonpage.dman){
        var found_dman = false;
        for(i =0; i<vonpage.dman.length; i++) {
            if(t0 <= vonpage.dman[i] && vonpage.dman[i]<=t1) {
                found_dman = true;
                break;
            }
        }
        if(found_dman) {
            vonpage.player.stopVideo();
            var before = new Date();    
            ModalFactory.create({
                title: "Estàs seguint el vídeo?",
                body: "<p>Clica sobre la pantalla per continuar la visualització. Si trigues més de 5 segons en fer-ho, perdràs els punts de visualització d'aquest vídeo.</p>"
            }).then(function(modal){
                modal.show();
            }).done(function(modal){
                var lapsed = new Date().getTime() - before.getTime();
                if(lapsed > 5000) {
                    confirm(":-( Ho sentim. Has perdut els punts d'aquesta visualització.");
                } else {
                    vonpage.player.playVideo();
                }
            });                              
        }
    }

    vonpage.t0 = t1;
};

var updateTimesDB = function(vonpage) {
    if (isOnline) {
        ajax("https://piworld.es/iedibapi/video/update", vonpage.info, function (res) {
            //Update stars
            console.log("video update has returned ", res);
        });
    } else {
        //Attempt connection again
        attemptConnection();
    }
};

var search_h5p_videos = function () {
    var snippet_iframes = document.querySelectorAll("div.iedib-video-container > iframe");
    var len_snippet = snippet_iframes.length;
    console.log("Found H5P VIDEOS in this page n=", len_snippet);
    var pi = window.iedibAPI.pi;

    for (var ik = 0; ik < len_snippet; ik++) {
        console.log("Processing snippet num", ik);
        var snippet_iframe = snippet_iframes[ik];
        var videoContainer = snippet_iframe.parentElement;
        var snippet_document = snippet_iframe.contentWindow.document;
        var iframeH5P = snippet_document.getElementsByClassName('h5p-iframe')[0].contentWindow.H5P;

        console.log(iframeH5P);
        var instance0 = iframeH5P.instances[0];
        console.log("how many instances?", iframeH5P.instances.length);
        var iframeVideo = instance0.video;
        var xapiData = instance0.getXAPIData();
        var maxscore = instance0.getMaxScore();
        console.log(xapiData, maxscore);
        var h5pId = xapiData.statement.object.id || "";
        h5pId = h5pId.split("id=")[1];
        var h5pNameObj = xapiData.statement.object.definition.name || {
            "en-us": ""
        };
        var h5pName = "";
        var h5pNameKeys = Object.keys(h5pNameObj);
        for (var i = 0; i < h5pNameKeys.length; i++) {
            h5pName += h5pNameObj[h5pNameKeys[i]] + " ";
        }
        console.log(snippet_iframe);
        console.log(snippet_iframe.parentNode);
        console.log(snippet_iframe.parentElement);

        var caption_elem = snippet_iframe.parentNode.getElementsByClassName("iedib-caption")[0];
        var title_elem = caption_elem.getElementsByClassName("iedib-caption-title")[0];
        var progress_elem = caption_elem.getElementsByClassName("iedib-caption-progress")[0];
        if (!(title_elem.innerText || "").trim()) {
            title_elem.innerText = ": " + h5pName;
        } else {
            title_elem.title = h5pName;
        }

        var duration = iframeVideo.getDuration();

        videosOnPage[iframeVideo.contentId] = {
            h5pId: h5pId,
            name: h5pName,
            duration: duration,
            caption_elem: caption_elem,
            title_elem: title_elem,
            progress_elem: progress_elem,
            maxscore: maxscore,
            anchorId: videoContainer.dataset.anchorId || "",
            counter: videoContainer.dataset.counter || 100,
        };


        console.log("videos", iframeVideo, h5pId, h5pName);
        var initdata = {
            videoId: h5pId,
            title: h5pName,
            author: "Josep Mulet",
            duration: duration,
            type: "h5p",
            term: pi.term,
            bookId: pi.bookId,
            chapterId: pi.chapterId,
            courseId: pi.courseId,
            courseName: pi.courseName,
            userId: pi.userId,
            userFullname: pi.userFullname,
            isTeacher: pi.isTeacher,
            site: pi.site,
            jsession: pi.moodleSession,
            seconds1: 0,
            seconds2: 0,
            seconds3: 0,
            seconds4: 0,
            seconds5: 0,
            seconds6: 0,
            maxscore: maxscore,
            score: 0,
            anchorId: videoContainer.dataset.anchorId || "",
            counter: videoContainer.dataset.counter || 100
        };
        console.log("INIT DATA IS", initdata);

        var attemptConnection = function () {
            ajax("https://piworld.es/iedibapi/video/info", initdata, function (res) {
                try {
                    var json_res = JSON.parse(res);
                    console.log("RAW JSON ", json_res);
                    var vopage = getVideosOnPage(json_res.videoId);
                    json_res.maxscore = vopage.maxscore; //overwrite with current value
                    var ee = vopage.progress_elem;
                    vopage.info = json_res;
                    console.log("Set info into json_res", vopage);
                    if (ee) {
                        drawProgressStars(json_res.fstars, ee);
                    }
                } catch (Ex) {
                    console.log("Error mode", Ex);
                    turnErrorMode();
                    isOnline = false;
                }
            });
        };

        attemptConnection();

        if (progress_elem) {
            drawProgressStars(0, progress_elem);
        }


        iframeH5P.externalDispatcher.on('xAPI', function (evt0) {
            var vonpage = videosOnPage[this.contentId];
            var evt = evt0.data;
            console.log(evt, vonpage);
            if (evt.statement.verb.id == "http://adlnet.gov/expapi/verbs/answered") {
                if (evt.statement.result.score.raw > vonpage.info.score) {
                    vonpage.info.score = evt.statement.result.score.raw;
                }
                var formulation = map2str(evt.statement.object.definition.description);
                var answer = [];
                var arr = evt.statement.object.definition.correctResponsesPattern;
                for (var i = 0; i < arr.length; i++) {
                    answer.push(getDescriptionById(evt.statement.object.definition.choices, arr[i]));
                }
                var success = evt.statement.result.success;
                console.log("You answered", answer, "and this is ", success);

                var info2 = { "xapi": { "formulation": formulation, "answer": answer.join("; "), "correct": success } };
                obj_extend(info2, vonpage.info);

                ajax("https://piworld.es/iedibapi/video/update", info2, function (res) {
                    //Update stars
                    console.log("video update has returned --do something with fstars--", res);
                });
            }
        });

        /*
        iframeVideo.on('loaded', function (evt) {
            console.log("ready fired", evt);
        });
        */
       
        iframeVideo.on('stateChange', function (event) {
            console.log("State change", event);
            var vonpage = videosOnPage[this.contentId];
            switch (event.data) {
                /*  case iframeH5P.Video.ENDED:
                    break;
                */
                case iframeH5P.Video.PLAYING:
                    console.log('Playing');
                    if (vonpage) {
                        if (!vonpage.timer) {
                            var callback_timer = function () {
                                var t1 = iframeVideo.getCurrentTime();
                                updateTimes(vonpage, t1);
                                if (vonpage.calls >= AJAX_INTERVAL) {
                                    console.log("ajax called");
                                    vonpage.calls = 0;
                                    updateTimesDB(vonpage);
                                } else {
                                    vonpage.calls += 1;
                                }
                            };
                            vonpage.t0 = iframeVideo.getCurrentTime();
                            vonpage.calls = 0;
                            vonpage.timer = new RecurringTimer(callback_timer, 1000);
                            console.log("timer has been created");
                        }
                        vonpage.timer.resume();
                        console.log("Timer has been resumed");
                    }
                    break;

                case iframeH5P.Video.PAUSED:
                    if (vonpage.timer) {
                        vonpage.timer.pause();
                        console.log("Timer has been paused");
                    }
                    var t1 = iframeVideo.getCurrentTime();
                    updateTimes(vonpage, t1);
                    break;

                /*case iframeH5P.Video.BUFFERING:
                    console.log('Wait on your slow internet connection...');
                    break;
                */
            }
        });

    };

};

var ajax_video_info = function (vop) {
    console.log("Doing ajax video info", vop);
    var pi = iedibAPI.pi;
    var initdata = {
        videoId: vop.ytId ? vop.ytId : vop.h5pId,
        title: vop.title,
        author: vop.author || "Josep Mulet",
        duration: vop.duration,
        type: vop.ytId ? "yt" : "h5p",
        term: pi.term,
        bookId: pi.bookId,
        chapterId: pi.chapterId,
        courseId: pi.courseId,
        courseName: pi.courseName,
        userId: pi.userId,
        userFullname: pi.userFullname,
        isTeacher: pi.isTeacher,
        site: pi.site,
        jsession: pi.moodleSession,
        seconds1: 0,
        seconds2: 0,
        seconds3: 0,
        seconds4: 0,
        seconds5: 0,
        seconds6: 0,
        maxscore: vop.maxscore,
        score: 0,
        anchorId: vop.anchorId,
        counter: vop.counter
    };
    console.log("INIT DATA IS", initdata);


    ajax("https://piworld.es/iedibapi/video/info", initdata, function (res) {
        try {
            var json_res = JSON.parse(res);
            console.log("RAW JSON ", json_res);
            var vopage = getVideosOnPage(json_res.videoId);
            json_res.maxscore = vopage.maxscore; //overwrite with current value
            var ee = vopage.progress_elem;
            vopage.info = json_res;
            console.log("Set info into json_res", vopage);
            if (ee) {
                drawProgressStars(json_res.fstars, ee);
            }
        } catch (Ex) {
            console.log("Error mode", Ex);
            turnErrorMode();
            isOnline = false;
        }
    });

    if (vop.progress_elem) {
        drawProgressStars(0, vop.progress_elem);
    }
};

var onYTPlayerReady = function (evt) {
     
    var vdata = evt.target.getVideoData();
    var vop = videosOnPage[vdata.video_id];
    vop.duration = evt.target.getDuration();
    vop.author = vdata.author;
    vop.title = vdata.title;
    console.log("player ready", evt);
    console.log(vop);
    ajax_video_info(vop);

    /* If the video-caption-title is empty then fill it with title from youtube */
    if (!(vop.title_elem.innerText || "").trim()) {
        vop.title_elem.innerText = ": " + vdata.title;
    }

    /* Prepare dead man times */
    var d6 = vop.duration / 6.0;
    vop.dman = [d6 + Math.random()*(2*d6), 4*d6 + Math.random()*(2*d6)];
};

var onYTPlayerStateChange = function (evt) {
    var videoId = evt.target.getVideoData().video_id;
    console.log("player stateChange", evt, videoId);
    var vonpage = videosOnPage[videoId];
    console.log("vonpage", vonpage)
    var iframeVideo = vonpage.player;
    switch (evt.data) {        
        case YT.PlayerState.PLAYING:
            console.log('Playing');
            if (vonpage) {
                if (!vonpage.timer) {
                    var callback_timer = function () {
                        var t1 = iframeVideo.getCurrentTime();
                        updateTimes(vonpage, t1);
                        if (vonpage.calls >= AJAX_INTERVAL) {
                            console.log("ajax called");
                            vonpage.calls = 0;
                            updateTimesDB(vonpage);
                        } else {
                            vonpage.calls += 1;
                        }
                    };
                    vonpage.t0 = iframeVideo.getCurrentTime();
                    vonpage.calls = 0;
                    vonpage.timer = new RecurringTimer(callback_timer, 1000);
                    console.log("timer has been created");
                }
                vonpage.timer.resume();
                console.log("Timer has been resumed");
            }
            break;

        case YT.PlayerState.PAUSED:
            if (vonpage.timer) {
                vonpage.timer.pause();
                console.log("Timer has been paused");
            }
            var t1 = iframeVideo.getCurrentTime();
            updateTimes(vonpage, t1);
            break;
    }
};

var initYoutubeVideo = function (snippet_iframe) {
    var videoContainer = snippet_iframe.parentElement;
    if (videoContainer.className.indexOf("iedib-no-tracking") >= 0) {
        return;
    }
    var anchorId = videoContainer.dataset.anchorId;
    var counter = videoContainer.dataset.counter;
    var videoId_elements = snippet_iframe.id.replace("pwVideoId_", "").split("?");
    var videoId = videoId_elements[0];

    // Initialize control
    var player = new YT.Player(snippet_iframe.id, {
        videoId: videoId,
        events: {
            'onReady': onYTPlayerReady,
            'onStateChange': onYTPlayerStateChange
        }
    });
    var caption_elem = snippet_iframe.parentNode.parentNode.getElementsByClassName("iedib-caption")[0];
    var title_elem = caption_elem.getElementsByClassName("iedib-caption-title")[0];
    var progress_elem = caption_elem.getElementsByClassName("iedib-caption-progress")[0];
    progress_elem.style.display = "inline-table";

    snippet_iframe.className = "pw-yt-video pw-yt-video-handled";
    videosOnPage[videoId] = {
        ytId: videoId,
        name: "",
        duration: 0,
        caption_elem: caption_elem,
        title_elem: title_elem,
        progress_elem: progress_elem,
        maxscore: 0,
        anchorId: anchorId,
        counter: counter,
        player: player
    };
    
};

var search_yt_videos = function () {
    var videos = document.querySelectorAll("div.iedib-videoWrapper > iframe.pw-yt-video");
    var videos_len = videos.length;
    console.log("Found Youtube videos in this page n=", videos_len);
    if (!videos_len) {
        return;
    }

    // It contains youtube videos --> inject youtube iframe API
    if (window.YT) {
        console.log("inspectYoutube: YT already in page");

        // YT already in page
        for (var i = 0; i < videos_len; i++) {
            initYoutubeVideo(videos[i]);
        }

    } else {
        // Inject iframe script
        window.onYouTubeIframeAPIReady = function () {
            console.log("inspectYoutube: onYoutubeIframeAPIReady called");
            for (var i = 0; i < videos_len; i++) {
                initYoutubeVideo(videos[i]);
            }
        }
        console.log("inspectYoutube: insert script https://www.youtube.com/iframe_api");
        insertScript("https://www.youtube.com/iframe_api", true);
    }
};


var create_book_video_index = function () {
    var pi = window.iedibAPI.pi;
    // Search for index page in book
    // Check if we are in first book page and show completion progress
    console.log("Index of videos");
    var completionDiv = document.getElementById("video-completion-progress");
    console.log("The container is ", completionDiv);

    if (completionDiv) {
        ajax("https://piworld.es/iedibapi/video/progress", pi, function (resRaw) {
            var res = JSON.parse(resRaw);
            console.log("The ajax call returns ", res);

            if (Array.isArray(res) && res.length) {
                completionDiv.style = "padding:10px; margin:25px auto; width:75%; border: 1px solid #e3e3e3; border-radius: 4px; background-color: #f5f5f5;";

                var h4 = document.createElement("h4");
                h4.style = "text-transform: uppercase; color: gray; font-size: 1.1em;"
                h4.innerText = "Progrés dels videos";
                completionDiv.appendChild(h4);

                for (var i = 0; i < res.length; i++) {
                    var row = res[i];
                    var rowdiv = document.createElement("div");

                    var p1 = document.createElement("p");
                    p1.style.display = "inline";
                    p1.style.margin = "0 10px";
                    drawProgressStars(row.fstars, p1);

                    var p2 = document.createElement("p");
                    p2.style.display = "inline";
                    p2.style.margin = "0 10px";
                    p2.style.position = "relative";
                    p2.style.top = "-10px";
                    drawTimeSegments(row.segments, row.duration, p2);

                    if (pi.isTeacher) {
                        var btn1 = document.createElement('button');
                        btn1.onclick = iedibAPI.report;
                        btn1.innerHTML = '<span class="icon-plus-sign"></span>';
                        btn1.title = "Generate report";
                        btn1.style = "width:24px; height:24px; font-size: small; padding: 0px; vertical-align: baseline; background: lightblue; font-weight: bold;";
                        btn1.setAttribute("data-videoid", row.videoId);
                        btn1.disabled = (row.owner != window.iedibAPI.pi.userId);
                        rowdiv.appendChild(btn1);

                        var btn2 = document.createElement('button');
                        btn2.onclick = iedibAPI.cleanVideo;
                        btn2.title = "Remove from book";
                        btn2.innerHTML = '<span class="icon-trash"></span>';
                        btn2.style = "width:24px; height:24px; font-size: small; padding: 0px; vertical-align: baseline; background: lightcoral; font-weight: bold;";
                        btn2.setAttribute("data-videoid", row.videoId);
                        btn2.disabled = (row.owner != window.iedibAPI.pi.userId);
                        rowdiv.appendChild(btn2);

                        var btn3 = document.createElement('button');
                        btn3.onclick = iedibAPI.replaceVideo;
                        btn3.title = "Replace videoId";
                        btn3.innerHTML = '<span class="icon-pencil"></span>';
                        btn3.style = "width:24px; height:24px; font-size: small; padding: 0px; vertical-align: baseline; background: orange; font-weight: bold;";
                        btn3.setAttribute("data-videoid", row.videoId);
                        btn3.disabled = (row.owner != window.iedibAPI.pi.userId);
                        rowdiv.appendChild(btn3);
                    }
                    rowdiv.appendChild(p1);
                    rowdiv.appendChild(p2);
                    var span1 = document.createElement('span');
                    span1.innerHTML = row.title;
                    rowdiv.appendChild(span1);
                    completionDiv.appendChild(rowdiv);
                }


                // Check if the user is a teacher and display students progress
                if (pi.isTeacher) {
                    var reportDiv = document.createElement('div');
                    reportDiv.id = "iedib-report-div";
                    completionDiv.appendChild(reportDiv);
                }
            }
        });

    }
};

// Fire the API
var onLoad = function (evt) {
    window.iedibAPI.pi = getPageInfo();
    search_h5p_videos();
    search_yt_videos();
    create_book_video_index();   
};

//ready(onLoad);
window.addEventListener("load", onLoad);

});