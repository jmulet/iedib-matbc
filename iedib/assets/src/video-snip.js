// Vnotify (Growl like notifications)
window.IB = window.IB || {}; window.IB.sd = window.IB.sd || {};  
!function(){if(document.getElementById("sd_css_vnotify.js")){return;}; var l = '.vnotify-container {  position: fixed; }  .vnotify-container.vn-top-right {   right: 10px;   top: 10px; }  .vnotify-container.vn-top-left {   top: 10px;   left: 10px; }  .vnotify-container.vn-bottom-right {   bottom: 10px;   right: 10px; }  .vnotify-container.vn-bottom-left {   bottom: 10px;   left: 10px; }  .vnotify-container.vn-center {   top: 50%;   left: 50%;   transform: translate(-50%, -50%); }  .vnotify-container .vn-close {   position: absolute;   top: 5px;   right: 10px;   width: 15px;   height: 15px;   padding: 2px;   cursor: pointer; }   .vnotify-container .vn-close:before, .vnotify-container .vn-close:after {    content: \'\';    position: absolute;    width: 100%;    top: 50%;    height: 2px;    background: #fff; }   .vnotify-container .vn-close:before {    -webkit-transform: rotate(45deg);    -moz-transform: rotate(45deg);    transform: rotate(45deg); }   .vnotify-container .vn-close:after {    -webkit-transform: rotate(-45deg);    -moz-transform: rotate(-45deg);    transform: rotate(-45deg); } .vnotify-item {  width: 20em;  padding: 15px;  position: relative;  -webkit-border-radius: 5px;  -moz-border-radius: 5px;  -ms-border-radius: 5px;  border-radius: 5px;  margin-bottom: 15px;  opacity: 0.75;  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=75)";  filter: alpha(opacity=75); }  .vnotify-item:hover {   opacity: 1; } .vnotify-title {  font-weight: bold; } .vnotify-info {  background: #3498db;  color: #fff; } .vnotify-success {  background: #2ecc71;  color: #fff; } .vnotify-error {  background: #e74c3c;  color: #fff; } .vnotify-warning {  background: #f39c12;  color: #fff; } .vnotify-notify {  background: #333;  color: #fff; } '; var s = document.createElement('style'); s.type = 'text/css'; s.innerHTML = l; s.id="sd_css_vnotify.js"; document.getElementsByTagName('head')[0].appendChild(s);}();
!function(){var t={topLeft:"topLeft",topRight:"topRight",bottomLeft:"bottomLeft",bottomRight:"bottomRight",center:"center"},n={fadeInDuration:1e3,fadeOutDuration:1e3,fadeInterval:50,visibleDuration:5e3,postHoverVisibleDuration:500,position:t.topRight,sticky:!1,showClose:!0},e=function(t){var e=JSON.parse(JSON.stringify(n));if(t&&"object"==typeof t)for(var o=Object.keys(t),i=0,r=o.length;r>i;i++){var a=o[i];e[a]=t[a]}return e},o=function(t){return t=e(t),t.notifyClass="vnotify-info",l(t)},i=function(t){return t=e(t),t.notifyClass="vnotify-success",l(t)},r=function(t){return t=e(t),t.notifyClass="vnotify-error",l(t)},a=function(t){return t=e(t),t.notifyClass="vnotify-warning",l(t)},s=function(t){return t=e(t),t.notifyClass="vnotify-notify",l(t)},u=function(t){return t=e(t),l(t)},l=function(t){if(!t.title&&!t.text)return null;var n=document.createDocumentFragment(),e=document.createElement("div");e.classList.add("vnotify-item"),e.classList.add(t.notifyClass),e.style.opacity=0,e.options=m(t),t.title&&e.appendChild(f(t.title)),t.text&&e.appendChild(c(t.text)),e.options.showClose&&e.appendChild(d(e)),e.visibleDuration=e.options.visibleDuration;var o=function(){e.fadeInterval=D("out",e.options.fadeOutDuration,e)},i=function(){clearTimeout(e.interval),clearTimeout(e.fadeInterval),e.style.opacity=null,e.visibleDuration=e.options.postHoverVisibleDuration},r=function(){e.interval=setTimeout(o,e.visibleDuration)};n.appendChild(e);var a=v(e.options.position);return a.appendChild(n),e.addEventListener("mouseover",i),D("in",e.options.fadeInDuration,e),e.options.sticky||(e.addEventListener("mouseout",r),r()),e},c=function(t){var n=document.createElement("div");return n.classList.add("vnotify-text"),n.innerHTML=t,n},f=function(t){var n=document.createElement("div");return n.classList.add("vnotify-title"),n.innerHTML=t,n},d=function(t){var n=document.createElement("span");return n.classList.add("vn-close"),n.addEventListener("click",function(){b(t)}),n},v=function(t){var n=y(t),e=document.querySelector("."+n);return e?e:p(n)},p=function(t){var n=document.createDocumentFragment();return container=document.createElement("div"),container.classList.add("vnotify-container"),container.classList.add(t),container.setAttribute("role","alert"),n.appendChild(container),document.body.appendChild(n),container},y=function(n){switch(n){case t.topLeft:return"vn-top-left";case t.bottomRight:return"vn-bottom-right";case t.bottomLeft:return"vn-bottom-left";case t.center:return"vn-center";default:return"vn-top-right"}},m=function(t){return{fadeInDuration:t.fadeInDuration||n.fadeInDuration,fadeOutDuration:t.fadeOutDuration||n.fadeOutDuration,fadeInterval:t.fadeInterval||n.fadeInterval,visibleDuration:t.visibleDuration||n.visibleDuration,postHoverVisibleDuration:t.postHoverVisibleDuration||n.postHoverVisibleDuration,position:t.position||n.position,sticky:null!=t.sticky?t.sticky:n.sticky,showClose:null!=t.showClose?t.showClose:n.showClose}},b=function(t){t.style.display="none",t.outerHTML="",t=null},D=function(t,e,o){function i(){a=r?a+u:a-u,o.style.opacity=a,0>=a&&(b(o),h()),(!r&&s>=a||r&&a>=s)&&window.clearInterval(l)}var r="in"===t,a=r?0:o.style.opacity||1,s=r?.8:0,u=n.fadeInterval/e;r&&(o.style.display="block",o.style.opacity=a);var l=window.setInterval(i,n.fadeInterval);return l},h=function(){var t=document.querySelector(".vnotify-item");if(!t)for(var n=document.querySelectorAll(".vnotify-container"),e=0;e<n.length;e++)n[e].outerHTML="",n[e]=null},L=function(t,e){n[t]=e};window.vNotify={info:o,success:i,error:r,warning:a,notify:s,custom:u,setOption:L}}();

// Required window.iedibAPI https://ibsuite.es/iedib/assets/iedib-api.js
window.require(["jquery", "core/modal_factory", "core/modal_events"], function ($, ModalFactory, ModalEvents) {
    var isBoost = iedibAPI.isBoost();
    var videosOnPage = {};
    var isOnline = true;
    var pi = {}; 
    var handshake = {};

    var H5P_Video_PLAYING;
    var H5P_Video_PAUSED;
    var H5P_Video_ENDED;

    // intervals all in seconds
    var TIMER_INTERVAL = 1; 
    var AJAX_INTERVAL = 15;           // 30 segons default   
    var MIN_INTERVAL_UPDATES = 4;     // Cannot call update before 5 seconds
    var TIME_ANSWER = 30;
    var REPORTS_ON = true;
    var REMOTE_URL= "https://videotracker.ibsuite.es/iedibapi"; 
    var ENABLE_DMAN = false;

    var encObj = function(obj) {
	    obj.tz = new Date().getTime();
        return encodeURI(window.btoa(JSON.stringify(obj)));
    };

    // Attempt to execute a funcion up to n times, after a delay, before cancelling
    // E----- delay ---> E----- delay ---> .... (n)
    // fun must return true if success
    var FunctionAttemptExec = function(fun, ntimes, delay) {
        var res = fun();
        if(!res && ntimes > 0) {
            // wait a delay
            window.setTimeout(function(){
                FunctionAttemptExec(fun, ntimes-1, delay);
            }, delay);
        }
    };

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
                window.clearTimeout(timerId);
                resume();
                callback();
            }, remaining);
        };
        this.resume = resume;
    };

    var map2str = function(map) {
        if(!map) {
            return "";
        }
        if(typeof(map) != 'object') {
            return map;
        }
        var keys = Object.keys(map);
        var builder = "";
        for(var i=0, len=keys.length; i<len; i++) {
            builder += map[keys[i]] + " ";
        }
        return builder;
    };

    // Prepare dead man times
    var generate_dman = function (vop) {
        if(!ENABLE_DMAN) {
            return;
        }
        var d2 = vop.duration / 2.0; 
        var n = Math.round(Math.random()) + 1;
        if (n == 2) {
            vop.dman = [Math.random() * d2, d2 + Math.random() * d2];
        } else {
            vop.dman = [Math.random() * d2];
        }
    };

    var getVideosOnPage = function (videoId) {
        console.log(videosOnPage, videoId);
        var f = null;
        var i = 0;
        var keys = Object.keys(videosOnPage);
        while (!f && i < keys.length) {
            if (videosOnPage[keys[i]].videoId == videoId) {
                f = videosOnPage[keys[i]];
            }
            i++;
        }
        console.log("return f", f);
        return f;
    };
 
    var drawProgressStars = function (prog, $container, erqPayload) {
        var builder;
        var fstars = prog.fstars;
        if(isBoost) {
            var emptyStar = '<span><i class="fa fa-star-o far fa-star" style="color: #e09100;"></i></span>';
            var halfStar = '<span><i class="fa fas fa-star-half-alt" style="color: #e09100;"></i></span>';
            var fullStar = '<span><i class="fa fas fa-star" style="color: #e09100;"></i></span>';
            if(fstars <= 0.1) {
                builder = emptyStar + emptyStar + emptyStar;
            } else if (fstars > 0.1 && fstars <= 0.2) {
                builder = halfStar + emptyStar + emptyStar;
            } else if (fstars > 0.2 && fstars <= 0.4) {
                builder = fullStar + emptyStar + emptyStar;
            } else if (fstars > 0.4 && fstars <= 0.6) {
                builder = fullStar + halfStar + emptyStar;
            } else if (fstars > 0.6 && fstars <= 0.7) {
                builder = fullStar + fullStar + emptyStar;
            } else if (fstars > 0.7 && fstars <= 0.9) {
                builder = fullStar + fullStar + halfStar;
            } else {
                builder = fullStar + fullStar + fullStar;
            }
        } else {
            if (fstars <= 0.2) {
                builder = '<img src="https://ibsuite.es/iedib/img/star-empty.png"><img src="https://ibsuite.es/iedib/img/star-empty.png"><img src="https://ibsuite.es/iedib/img/star-empty.png">';
            } else if (fstars > 0.2 && fstars <= 0.6) {
                builder = '<img src="https://ibsuite.es/iedib/img/star.png"><img src="https://ibsuite.es/iedib/img/star-empty.png"><img src="https://ibsuite.es/iedib/img/star-empty.png">';
            } else if (fstars > 0.6 && fstars <= 0.8) {
                builder = '<img src="https://ibsuite.es/iedib/img/star.png"><img src="https://ibsuite.es/iedib/img/star.png"><img src="https://ibsuite.es/iedib/img/star-empty.png">';
            } else {
                builder = '<img src="https://ibsuite.es/iedib/img/star.png"><img src="https://ibsuite.es/iedib/img/star.png"><img src="https://ibsuite.es/iedib/img/star.png">';
            }
        }
        var tpc = Math.floor(prog.fvis*100);
        if(tpc > 100) {
            tpc = 100;
        }
        $container.css("background", "linear-gradient(90deg, #ffca8e 0%, #ffca8e "+tpc+"%, #FFFFFF "+tpc+"%, #FFFFFF 100%)");
        if(erqPayload && REPORTS_ON && REMOTE_URL) {
            builder = '<a href="'+REMOTE_URL+'/vw_vb?erq='+erqPayload+'" target="_blank">' + builder +  "</a>";
        }
        $container.html(builder);
        $container.attr("title", "Visualitzat " + tpc.toFixed(0) + "%");
    };

    var scale_color = function (f) {
        //var x = Math.floor(255 * (1 - f));
        //return "rgb(" + x + ",255," + x + ")";
        var x = Math.floor(245*f+10);
        return "rgb(10," + x + ",10)";
    };

    var drawTimeSegments = function (segm, duration, $container) {
        var builder = [];
        var d10 = duration / 10.0;
        var total = 0.0;
        for (var i = 0; i < segm.length; i++) {
            total += segm[i];
            var color = scale_color(d10 > 0 ? (segm[i] / d10) : 0.0);
            builder.push('<span style="width:10px;height:15px;display:table-cell;border:1px solid gray;background:' + color + '"></span>');
        }
        $container.html(builder.join(""));
        var frac = Math.round(total * 100 / (0.98*duration)).toFixed(0);
        if(frac > 100) {
            frac = 100;
        }
        if (duration > 0) {
            $container.attr("title", "Visualitzat " + frac + "%");
        }
    };

    var turnErrorMode = function () {
         // Tell the user that something went wrong
         window.vNotify.error({title: ":-( Error registre de vídeos", text: "No funciona la connexió."});
               
        var $pwvts = $(".iedib-caption-progress");
        $pwvts.css("color", "red");
        $pwvts.attr("title", "El registre de vídeos no funciona en aquests moments. No podreu obtenir punts fins que no s'activi.");
    };

    /* Close fullscreen */
    var closeFullscreen = function () {
        // Only close if really in fullscreen
        if(window.fullScreen) {
            try {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { /* Firefox */
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {     /* IE/Edge */
                    document.msExitFullscreen();
                }
            } catch (Ex) { }
        }
    };

    var updateTimes = function (vonpage, t1, onlyUpdate) {
        var t0 = vonpage.t0;
        if(vonpage.info.maxtime < t1) {
            vonpage.info.maxtime = t1;
        }
        console.log(t0, t1);
        if (Math.abs(t1 - t0) > 3*TIMER_INTERVAL) {
            // Probably seeking
            console.log("Probably seeking");
            vonpage.t0 = t1;
            return;
        }
        if (Math.abs(t1 - t0) < 0.5*TIMER_INTERVAL) {
            console.log("too short interval");
            // Check if video is really playing (otherwise stop the timer)
            // TODO (Cannot stop otherwise we have a problem!!)
            
            if(vonpage.player && Math.abs(t1-t0)<1e-3) {
                console.log("the player is >>> ", vonpage.player);
                vonpage.timer.pause();
                vonpage.player.pause && vonpage.player.pause();
            }
            
            vonpage.t0 = t1 - 1.0;
            return;
        }
        var d10 = vonpage.duration*0.1;
        if (t0 <= d10) {
            vonpage.info.s1 += TIMER_INTERVAL;
        } else if (t0 > d10 && t0 <= 2 * d10) {
            vonpage.info.s2 += TIMER_INTERVAL;
        } else if (t0 > 2 * d10 && t0 <= 3 * d10) {
            vonpage.info.s3 += TIMER_INTERVAL;
        } else if (t0 > 3 * d10 && t0 <= 4 * d10) {
            vonpage.info.s4 += TIMER_INTERVAL;
        } else if (t0 > 4 * d10 && t0 <= 5 * d10) {
            vonpage.info.s5 += TIMER_INTERVAL;
        } else if (t0 > 5 * d10 && t0 <= 6 * d10) {
            vonpage.info.s6 += TIMER_INTERVAL;
        } else if (t0 > 6 * d10 && t0 <= 7 * d10) {
            vonpage.info.s7 += TIMER_INTERVAL;
        } else if (t0 > 7 * d10 && t0 <= 8 * d10) {
            vonpage.info.s8 += TIMER_INTERVAL;
        } else if (t0 > 8 * d10 && t0 <= 9 * d10) {
            vonpage.info.s9 += TIMER_INTERVAL;
        } else {
            vonpage.info.s10 += TIMER_INTERVAL;
        }

        if (onlyUpdate) {
            return;
        }

        // Check for deadman
        if (vonpage.dman && ENABLE_DMAN) {
            var found_dman = false;
            for (i = 0; i < vonpage.dman.length; i++) {
                if (t0 <= vonpage.dman[i] && vonpage.dman[i] <= t1) {
                    found_dman = true;
                    break;
                }
            }
            if (found_dman) {
                generate_dman(vonpage);
                vonpage.player.pauseVideo();
                var before = new Date();
                closeFullscreen();
                ModalFactory.create({
                    title: "Estàs seguint el vídeo?",
                    body: "<p>Clica sobre la pantalla per continuar la visualització. Si trigues més de " + TIME_ANSWER + " segons en fer-ho, perdràs els punts de visualització d'aquest vídeo.</p>"
                }).then(function (modal) {
                    console.log("Showing modal");
                    //Make sure to exit fullscreen
                    modal.show();
                    modal.getRoot().on(ModalEvents.hidden, function () {
                        modal.destroy();
                        console.log("Done!");
                        var lapsed = new Date().getTime() - before.getTime();
                        if (lapsed > 1000*TIME_ANSWER) {
                            modal.hide();
                            confirm && confirm(":-( Ho sentim. Massa tard. Cal que estiguis atent si no vols perdre punts de les visualitzacions.");
                            vonpage.info.s1 = 0;
                            vonpage.info.s2 = 0;
                            vonpage.info.s3 = 0;
                            vonpage.info.s4 = 0;
                            vonpage.info.s5 = 0;
                            vonpage.info.s6 = 0;
                            vonpage.info.s7 = 0;
                            vonpage.info.s8 = 0;
                            vonpage.info.s9 = 0;
                            vonpage.info.s10 = 0;
                            updateTimesDB(vonpage);
                            vonpage.player.stopVideo();
                        } else {
                            vonpage.player.playVideo();
                        }
                    });

                });
            }
        }

        vonpage.t0 = t1;
    };
 

    var ajax_handshake = function(success_cb) {
        console.log("Doing ajax handshake");
        var initdata = { 
            assignNum: pi.assignNum,
            assignName: pi.assignName,
            bookId: pi.bookId, 
            courseId: pi.courseId,
            courseName: pi.courseName,
            userId: pi.userId,
            userFullname: pi.userFullname,
            isTeacher: pi.isTeacher,
            site: pi.site,
            jsession: pi.moodleSession 
        };

        $.ajax({
            method: "POST",
            url: REMOTE_URL + "/video/handshake",
            data: initdata,
            dataType: "json"
        }).done(function (json_res) {
            console.log(json_res);
            if(!json_res.msg) {
                handshake = json_res;
                success_cb && success_cb();
            } else { 
                // Tell the user that something went wrong
                window.vNotify.error({title: ":-( Error registre de vídeos", text: "No es pot establir acord amb el servidor."});
                console.error(json_res.msg);
                handshake = {};
            }
        });
    };

    var ajax_video_info = function (vop, forceUpdate) {
        /* If the video-caption-title is empty then fill it with title from video */
        if (!(vop.title_elem.text() || "").trim()) {
               vop.title_elem.text(": " + vop.title);
        }

        console.log("Doing ajax video info", vop);
        var initdata = {
            idSite: handshake.idSite,
            idSession: handshake.idSession,

            videoId: vop.videoId,
            title: vop.title,
            author: vop.author || "Josep Mulet",
            duration: vop.duration,
            type: vop.type,
            assignNum: pi.assignNum,
            assignName: pi.assignName,
            bookId: pi.bookId,
            chapterId: pi.chapterId,
            courseId: pi.courseId,
            courseName: pi.courseName,
            userId: pi.userId,
            userFullname: pi.userFullname,
            isTeacher: pi.isTeacher,
            site: pi.site,
            jsession: pi.moodleSession, 
            maxscore: vop.maxscore,
            score: 0,
            anchorId: vop.anchorId,
            counter: vop.counter,
            maxtime: 0.0,
            forceUpdate: forceUpdate? vop.info.idVideos : 0
        };
        vop.info = initdata;

        $.ajax({
            method: "POST",
            url: REMOTE_URL + "/video/info",
            data: initdata,
            dataType: "json"
        }).done(function (json_res) {
            console.log("RAW JSON ", json_res);
            if (json_res.current) {
                var vopage = getVideosOnPage(json_res.current.videoId);
                json_res.current.maxscore = vopage.maxscore; //overwrite with current value
                var $ee = vopage.progress_elem;
                vopage.info = json_res.current;
                vopage.info.idSite = handshake.idSite;
                vopage.info.idSession = handshake.idSession;
                vopage.info.bookId = pi.bookId;
                vopage.info.chapterId = pi.chapterId;
                vopage.info.userId = pi.userId; 
                vopage.info.assignNum = pi.assignNum;
                if(!vopage.info.chapterId) {
                    vopage.info.chapterId = json_res.chapterId;
                }
                if(window.btoa) {
                    var erqPayload = {
                        s: handshake.idSite,
                        u: pi.userId,
                        c: pi.courseId,
                        b: pi.bookId,
                        p: vopage.info.chapterId,
                        v: json_res.current.videoId
                    };
                    vopage.erqPayload = encObj(erqPayload);
                }
                console.log("Set info into json_res", vopage);
                if ($ee) {
                    drawProgressStars(json_res.global, $ee, vopage.erqPayload);
                }                
            } else {
                console.error("Activate error mode Error POST /video/info");
                turnErrorMode();
                isOnline = false;
            }
        }).fail(function (Ex) {
            console.error("Activate error mode", Ex);
            turnErrorMode();
            isOnline = false;
        });

        if (vop.progress_elem) {
            drawProgressStars({fstars:0, fvis:0}, vop.progress_elem);
        }
    };

    var updateTimesDB = function (vonpage) {
        if (isOnline && vonpage.info) {
            // Prevent calls to update too frequently
            if(!vonpage.last_db_access) {
                vonpage.last_db_access = new Date().getTime();
            } else {
                var now = new Date().getTime();
                var diff = now - vonpage.last_db_access;
                if(diff < 1000*MIN_INTERVAL_UPDATES) {
                    console.log("Accessing to DB too frequently...");
                    return;
                }
                vonpage.last_db_access = now;
            }
            // Cal passar el numAssign perquè pugui determinar la penalty
            console.log("assignNum must be passed!!!! ", vonpage.info);

            if(vonpage.info.s1 != null) {
                $.ajax({
                    method: "POST",
                    url: REMOTE_URL + "/video/update",
                    data: vonpage.info,
                    dataType: "json"
                }).done(function (json_res) {
                    //Update stars
                    console.log("video update has returned ", json_res);
                    // must update the idVisualization
                    vonpage.info.idVisualization = json_res.idVisualization || 0;
                    drawProgressStars(json_res, vonpage.progress_elem, vonpage.erqPayload);
                }).fail(function (err) {
                    turnErrorMode();
                });
            }
        }
        /*
        else {
            //Attempt connection again
            ajax_video_info(vonpage);
        }
        */
    };

    var getCurrentTime = function(player) {
        if(player.getCurrentTime) {
            return player.getCurrentTime();
        }
        if(player.playerInfo) {
            return player.playerInfo.currentTime || 0;
        }
        return 0;
    }

    var onPlayerStateChange = function (evt) {
        // Shared between h5p and yt
        // Decide which type of player is running
        console.log("player stateChange", evt);
        var vonpage;
        var PLAYING;
        var PAUSED;
        var ENDED;

        if(this.contentId) {
            vonpage = videosOnPage[this.contentId];
            PLAYING = H5P_Video_PLAYING;
            PAUSED = H5P_Video_PAUSED;
            ENDED = H5P_Video_ENDED;
        } else {
           
            var videoId = null;
            if(evt.target.getVideoData) {
                videoId = evt.target.getVideoData().video_id; 
            } else {
                console.log(evt.target);
                videoId = evt.target.playerInfo.videoData.video_id; 
            }
            if(!videoId) {
                console.error("Error: cannot get videoId");
                return;
            }
                 
            var vonpage = videosOnPage[videoId];
            PLAYING = YT.PlayerState.PLAYING;
            PAUSED = YT.PlayerState.PAUSED;
            ENDED = YT.PlayerState.ENDED;
        }        
        console.log("vonpage", vonpage)
        var player = vonpage.player;

        switch (evt.data) {
            case PLAYING:                
                console.log('Playing');                
                if (vonpage) {
                    if(!vonpage.info) {
                        // This video has not been registered yet?
                        onYTPlayerReady(evt);
                    }
                    if(!vonpage.info.duration) {
                        var realDuration = 0;
                        if(player.getDuration) {
                            realDuration = player.getDuration();
                        } else if(player.playerInfo) {
                            realDuration = Math.floor(player.playerInfo.duration || 0);
                        }
                        var duration = vonpage.info.duration || realDuration;
                        console.log("FIXED DURATION!!!! ", duration);
                    }
                    
                    if(!vonpage.played && 
                     vonpage.info.maxtime > 60 && vonpage.info.maxtime < vonpage.info.duration - 60) {
                        vonpage.player.seekTo && vonpage.player.seekTo(vonpage.info.maxtime, true);
                    }

                    vonpage.played = true;

                    // on first play create visualization entry
                    if(!vonpage.initialized) {
                        vonpage.initialized = true;
                        updateTimesDB(vonpage);
                    }

                    // Pause all other videos in page
                    $.each(videosOnPage, function(i, v){
                        if(v.videoId != vonpage.videoId) {
                            v.player.pauseVideo && v.player.pauseVideo();
                        }
                    });
                    if (!vonpage.timer) {
                        var callback_timer = function () {
                            var t1 = getCurrentTime(player);
                            updateTimes(vonpage, t1);
                            if (vonpage.calls >= AJAX_INTERVAL) {
                                console.log("ajax called");
                                vonpage.calls = 0;
                                updateTimesDB(vonpage);
                            } else {
                                vonpage.calls += TIMER_INTERVAL;
                            }
                        };
                        vonpage.t0 = getCurrentTime(player);
                        vonpage.calls = 0;
                        vonpage.timer = new RecurringTimer(callback_timer, 1000*TIMER_INTERVAL);
                        console.log("timer has been created");
                    }
                    vonpage.timer.resume();
                    console.log("Timer has been resumed");
                }
                break;

            case PAUSED:
                if (vonpage && vonpage.timer) {
                    vonpage.timer.pause();
                    console.log("Timer has been paused");
                }
                var t1 = getCurrentTime(player);
                updateTimes(vonpage, t1, true);
                // change:: make sure to update times on db when video is paused
                updateTimesDB(vonpage);
                break;

            case ENDED:
                if (vonpage && vonpage.timer) {
                    vonpage.timer.pause();
                    console.log("Timer has been paused");
                }
                var t1 = getCurrentTime(player);
                updateTimes(vonpage, t1, true);
                updateTimesDB(vonpage);
                player.stopVideo && player.stopVideo();
                break;
        }
    };

    var flatten_obj = function(obj) {
            var str = "";
            if(obj == null) {
                return str;
            }
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                str += obj[keys[i]] + " ";
            }
            return str;
    };

    var getDescriptionById = function (arr, id) {
        var n = arr.length;
        var i = 0;
        var f = "";
        while (i < n && f.length == 0) {
            if (arr[i].id == id) {
                console.log("Trying to flatten...." , arr[i].description)
                f = map2str(arr[i].description);
            }
            i += 1;
        }
        return f;
    };

    // Detects if an H5P Iframe is ready
    var waitForH5P_Iframe_Ready = function(iframe, onsuccess, nattempt, maxAttempts) {
        nattempt = nattempt || 0;
        var error_msg = null;
        var H5P = null;
        var instance0 = null;
        var player = null;
        var duration = null;
        try {
            var embed_document = iframe.contentWindow.document;
            //There is a doble iframe
            var h5p_iframe = embed_document.getElementsByClassName('h5p-iframe')[0].contentWindow;
            H5P = h5p_iframe.H5P;

            if(H5P != null) {
                instance0 = H5P.instances[0];
                if(instance0 != null) { 
                    player = instance0.video;
                    if(player!=null) {
                        duration = instance0.duration || player.getDuration();
                        if(!duration) {   
                            error_msg = "H5P.instances[0] does not have any duration"; 
                        } 
                    } else {
                        error_msg = "H5P.instances[0] does not have video property"; 
                    }
                } else {
                    error_msg = "H5P.instances[0] does not exist";
                }
            } else {
                error_msg = "NO H5P found in iframe";
            }

        } catch(ex) {
            error_msg = "H5P exception "+ ex;
        }

        if(error_msg==null) {
            //Excel·lent continue with success callback passing the required info
            onsuccess && onsuccess(iframe, H5P, instance0, player, duration);
        } else {
            //Bad luck
            if(maxAttempts && nattempt > maxAttempts) {
                console.error("NO H5P found in iframe after ", maxAttempts);
                return;
            }
            //Gradual delay
            var delay = (nattempt+1)*250;
            setTimeout(function(){waitForH5P_Iframe_Ready(iframe, onsuccess, nattempt+1, maxAttempts);}, delay);
        }
    };

    // Do the actual work when the H5P is ready
    var onH5PReady = function(iframe, H5P, instance0, player, duration) { 
        var $iframe = $(iframe);
        var $videoContainer = $iframe.parent();
        if($videoContainer.hasClass('h5p-placeholder')) {
            // Support for native h5p
            $videoContainer = $videoContainer.parent();
        }
        var H5P_Video = H5P.Video || {ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3};
        H5P_Video_PLAYING = H5P_Video_PLAYING || H5P_Video.PLAYING;
        H5P_Video_PAUSED = H5P_Video_PAUSED || H5P_Video.PAUSED;
        H5P_Video_ENDED = H5P_Video_ENDED || H5P_Video.ENDED;            
        
        var xapiData = instance0.getXAPIData();
        var maxscore = instance0.getMaxScore();
        console.log(xapiData, maxscore);
        var h5pId = xapiData.statement.object.id || "";
        if(h5pId.indexOf("id=")>=0) {
            h5pId = h5pId.split("id=")[1];
        } else if(h5pId.indexOf("url=")>=0) {
            // Support for native h5p
            h5pId = decodeURIComponent(h5pId.split("url=")[1]);
            var parts = h5pId.split("/");
            h5pId = parts[parts.length - 1];
        } else {
            // Cannot rely on id property, fallback to name
            h5pId = flatten_obj(xapiData.statement.object.definition.name);
        }
        var h5pNameObj = xapiData.statement.object.definition.name || {
            "en-us": ""
        };
        var h5pName = flatten_obj(h5pNameObj);
        if(!(h5pName || '').trim()) {
            h5pName = $videoContainer.find(".iedib-caption-counter").text() || '';
        }

        var $caption_elem = $($videoContainer.find(".iedib-caption")[0]);
        var $title_elem = $($caption_elem.find(".iedib-caption-title")[0]);
        var $progress_elem = $($caption_elem.find(".iedib-caption-progress")[0]);
        $progress_elem.css({"display": "inline-table", "height": "25px", "width": "70px", "font-size": "80%", "border-top": "3px solid #e9b04f", "border-bottom": "3px solid #e9b04f"});
         
        console.log(player, instance0); 

        videosOnPage[player.contentId] = {
            videoId: h5pId,
            title: h5pName + (" " + $title_elem.text() || "").trim(),
            duration: duration,
            caption_elem: $caption_elem,
            title_elem: $title_elem,
            progress_elem: $progress_elem,
            maxscore: maxscore,
            anchorId: $videoContainer.attr("data-anchor-id") || "",
            counter: $videoContainer.attr("data-counter") || 100,
            ampliacio: $videoContainer.attr("data-ampliacio") || 0,
            player: player,
            type: "h5p"
        };
        ajax_video_info(videosOnPage[player.contentId]);

       
        // Attach events
        player.on('stateChange', onPlayerStateChange);
        var vop = videosOnPage[player.contentId];
        if(!duration) {
            player.on('ready', function(){
                vop.duration = instance0.duration || player.getDuration();
                ajax_video_info(videosOnPage[player.contentId], pi.isTeacher);
            });
        }

        H5P.externalDispatcher.on('xAPI', function (evt0) {
            var vonpage = videosOnPage[this.contentId];
            var evt = evt0.data;
           
            if (evt.statement.verb.id == "http://adlnet.gov/expapi/verbs/answered" && 
                evt.statement.object.definition.correctResponsesPattern) {

                console.log(evt, vonpage);

                var choices = evt.statement.object.definition.choices;
                var response = evt.statement.result.response;
                if(response && typeof(response) == 'string') {
                    response = response.split('[,]');
                }
                console.log("Response is ", response);
                var answer_given = [];
                if(response && Array.isArray(response)) {
                    for(var i=0, len=response.length; i<len; i++) {
                        answer_given.push(getDescriptionById(choices, response[i]));
                    }
                }
                console.log("answer given", answer_given);

                var formulation = flatten_obj(evt.statement.object.definition.description);
                console.log("I've got formulation: ", formulation);

                // Try the correct answer
                var answer = [];
                var arr = evt.statement.object.definition.correctResponsesPattern;
                if(arr) {
                    for (var i = 0, len=arr.length; i < len; i++) {
                        var arr2 = arr[i].split('[,]');
                        for(var j=0, len2=arr2.length; j<len2; j++) {
                            answer.push(getDescriptionById(choices, arr2[j]));
                        }
                    }
                }
                var success = evt.statement.result.success;
                console.log("The correct answer", answer, "and this is ", success);

                var scoreraw = 0;
                if (evt.statement.result.score.raw > 0) {
                    scoreraw = evt.statement.result.score.raw;
                    if(success) {
                        vonpage.info.score += evt.statement.result.score.raw;
                    } else {
                        vonpage.info.score -= evt.statement.result.score.raw/3.0;
                    }
                    if(vonpage.info.score < 0) {
                        vonpage.info.score = 0;
                    } else if(vonpage.info.score > vonpage.info.maxscore) {
                        vonpage.info.score = vonpage.info.maxscore;
                    }
                }

                var info2 = null;
                if(formulation && success!=null) {
                    info2 = { "xapi_formulation": formulation, "xapi_answer_correct": answer.join("; "), 
                            "xapi_answer": answer_given.join("; "), "xapi_correct": (success? 'S': 'N'), "xapi_scoreraw": scoreraw };
                    console.log("**** PAYLOAD:: ", info2);
                    $.extend(info2, vonpage.info);
                } else {
                    info2 = vonpage.info;
                }

                 
                    $.ajax({
                        method: "POST",
                        url: REMOTE_URL + "/video/update", 
                        data: info2,
                        dataType: "json"})
                    .done(function (res) {
                        //Update stars
                        console.log("video update has returned --do something with fstars--", res);                        
                        drawProgressStars(res, vonpage.progress_elem,  vonpage.erqPayload);
                    });
                
            }
        });

        //Everything went fine ... mark as processed
        $iframe.attr("data-vsnip", "true"); 
    };

    var search_h5p_videos = function () {
        var $videos = $("div.iedib-video-container  iframe");
        var len_videos = $videos.length;
        console.log("I have found H5P VIDEOS in this page n=", len_videos);  
        for(var i=0, len = $videos.length; i< len; i++) {

            var iframe = $videos[i];
            var $iframe = $(iframe);
            
            //Check if already processed
            if( $iframe.attr("data-vsnip")=="true"){ 
                continue;
            }    
            var $videoContainer = $iframe.parent();
            if($videoContainer.hasClass("iedib-no-tracking")) {
                return;
            }

            waitForH5P_Iframe_Ready(iframe, onH5PReady, 0);
 
        }  //end loop iframes in page     
    };


    var onYTPlayerReady = function (evt) {
        console.log("Ready", evt);
        var vdata = null;
        if(evt.target.getVideoData) {
           vdata = evt.target.getVideoData();
        } else {
            console.log(evt.target);
            vdata = evt.target.playerInfo.videoData;
        }
        if(!vdata) {
            console.log("Error: no videodata available!");
            return;
        }
        var vop = videosOnPage[vdata.video_id];
        vop.duration = 0;
        if(evt.target.getDuration){
            vop.duration = evt.target.getDuration();
        } else {
            vop.duration = Math.floor(evt.target.playerInfo.duration || 0);
        }
        vop.author = vdata.author;
        vop.title = vdata.title;
        console.log("player ready", evt);
        console.log(vop);
        ajax_video_info(vop);

        /* Prepare dead man times */
        generate_dman(vop)
    };


    var initYoutubeVideo = function (iframe) {
        console.log("init_yt_video", iframe);
        var $iframe = $(iframe);
        var $videoContainer = $iframe.parent();
        if ($iframe.hasClass("pw-yt-video-handled") || $videoContainer.hasClass("iedib-no-tracking")) {
            return;
        }
        var anchorId = $videoContainer.attr("data-anchor-id");
        var counter = $videoContainer.attr("data-counter");
        var ampliacio = $videoContainer.attr("data-ampliacio");

        var videoId = $iframe.attr("id").replace("pwVideoId_", "").split("?")[0];
        var $caption_elem = $($iframe.parent().parent().find(".iedib-caption")[0]);
        var $title_elem = $($caption_elem.find(".iedib-caption-title")[0]);
        var $progress_elem = $($caption_elem.find(".iedib-caption-progress")[0]);
        $progress_elem.css({"display": "inline-table", "height": "25px", "width": "70px", "font-size": "80%", "border-top": "3px solid #e9b04f", "border-bottom": "3px solid #e9b04f"});
           
        videosOnPage[videoId] = {
            type: "yt",
            videoId: videoId,
            name: "",
            duration: 0,
            caption_elem: $caption_elem,
            title_elem: $title_elem,
            progress_elem: $progress_elem,
            maxscore: 0,
            anchorId: anchorId,
            counter: counter,
            ampliacio: ampliacio
        };

        console.log("Created vonpage", videosOnPage);

        // Initialize control
        var myid = $iframe.attr("id");
        var player = new YT.Player(myid, {
            videoId: videoId,
            events: {
                'onReady': onYTPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        }); 
        videosOnPage[videoId].player = player; 

        $iframe.addClass("pw-yt-video-handled");


    };

    /**
     * 
     * @returns Youtube videos have now a problem detecting the api
     */
    var search_yt_videos = function() {
        var $videos = $("div.iedib-videoWrapper > iframe.pw-yt-video");
        var videos_len = $videos.length;
        console.log("Found Youtube videos in this page n=", videos_len);
        if (!videos_len) {
            return;
        }
        // It contains youtube videos --> inject youtube iframe API
        if (window.YT) {
            console.log("inspectYoutube: YT already in page");

            // YT already in page
            $.each($videos, function (i, $v) {
                initYoutubeVideo($v);
            });

        } else {
            // Inject iframe script
            window.onYouTubeIframeAPIReady = function () {
                console.log("inspectYoutube: onYoutubeIframeAPIReady called");
                $.each($videos, function (i, $v) {
                    initYoutubeVideo($v);
                });
            }
            console.log("inspectYoutube: insert script https://www.youtube.com/iframe_api");
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            //iedibAPI.insertScript("https://www.youtube.com/iframe_api", true, false);
        }
    };

    var format_date = function(str_date) {
        if(!str_date) {
            return "Mai";
        }
        var date = new Date(str_date);
        return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    };

    var index_report = function (evt) {
        console.log(evt);
        var videoId = evt.currentTarget.dataset.videoid;
        // cannot rely on videoOnpage, must generate encrypted request payload
        var erqPayload = null;
        if(window.btoa) {
            erqPayload = {
                s: handshake.idSite,
                u: pi.userId,
                c: pi.courseId,
                b: pi.bookId
            };
            erqPayload= encObj(erqPayload);
        }
        var $container = $("#iedib-report-div");
        $.ajax({
            method: "POST",
            url: REMOTE_URL + "/video/report",
            data: { isTeacher: pi.isTeacher, courseId: pi.courseId, bookId: pi.bookId, site: pi.site, videoId: videoId, userId: pi.userId,
                    idSite: handshake.idSite, idSession: handshake.idSession },
            dataType: "json"
        })
            .done(function (res) {
                console.log("res");
                if (!res.length) {
                    $container.html("<i>No hi ha dades</i><br>");
                } else {
                    var $list = $("<ol></ol>");
                    $.each(res, function (i, row) {
                        var $li = $("<li></li>");
                        var $p1 = $('<p style="display:inline; margin: 0 10px; font-size: 110%;"></p>');
                        drawProgressStars(row, $p1, erqPayload);
                        $li.append($p1);
                        var $p2 = $('<p style="display:inline-table; margin:0 8px; position:relative; border:1px solid gray;"></p>');
                        drawTimeSegments(row.segments, row.duration, $p2);
                        $li.append($p2);
                        $li.append('<span style="font-size:80%; padding: 0 10px" title="Primer accés">' + format_date(row.first_access) + '</span>');
                        $li.append($('<span>' + row.fullName + '</span>'));
                        $list.append($li);
                    });
                    $container.html("");
                    $container.append($list);
                }
            }).fail(function (err) {
                $container.html("<i>S'ha produït un error. No hi ha dades</i><br>");
            });

    };
 
    var create_index = function () {
        // Search for index page in book
        // Check if we are in first book page and show completion progress
        console.log("Index of videos");
        var $completionDiv = $("#video-completion-progress");
        console.log("The container is ", $completionDiv);

        if ($completionDiv.length) { 
            var data = $.extend({idSite: handshake.idSite, idSession: handshake.idSession, idVideo: pi.idVideo}, pi); 
            $.ajax({
                method: "POST",
                url: REMOTE_URL + "/video/progress",
                data: data,
                dataType: "json"
            }).done(function (res) {
                console.log("The ajax call returns ", res);

                if (Array.isArray(res) && res.length) {
                    $completionDiv.css({
                        "padding": "10px", "margin": "25px auto", "width": "85%", "border": "1px solid #e3e3e3",
                        "border-radius": "4px", "background-color": "#f5f5f5"
                    });

                    var IS_ADD_LINK = REPORTS_ON && window.btoa;
                    var htmlCode = '<h4 style="text-transform: uppercase; color: gray; font-size: 1.1em;margin-top:5px;">';
                    if(IS_ADD_LINK ) {       
                        var erqPayload = {
                            s: handshake.idSite,
                            u: pi.userId,
                            c: pi.courseId,
                            b: pi.bookId
                        };
                        erqPayload = encObj(erqPayload);                  
                        htmlCode += '<a href="'+REMOTE_URL+'/vw_bk?erq='+erqPayload+'" target="_blank"> <i class="fa fas fa-list"></i>'
                    }
                    htmlCode +=' Índex de les video-explicacions ';
                    if(IS_ADD_LINK) {
                        htmlCode += '</a>'
                    }
                    htmlCode += '</h4>';
                    var $h4 = $(htmlCode);
                    $completionDiv.append($h4);

                    for (var i = 0; i < res.length; i++) {
                        var row = res[i];
                        var $rowdiv = $('<div style="overflow: hidden;white-space: nowrap;"></div>');

                        var $p1 = $('<p style="display:inline; margin: 0 10px; font-size: 110%"></p>');
                        // TODO vonpage aquí no estarà definit?
                        var vonpage = getVideosOnPage(row.videoId);
			drawProgressStars(row, $p1, vonpage);

			//Do not show segments to the student
                        //var $p2 = $('<p style="margin: 0 10px; position: relative; display: inline-block; border: 1px solid lightgray;"></p>');
                        //drawTimeSegments(row.segments, row.duration, $p2);

                        if (pi.isTeacher) {
                            var $btn1 = $('<button title="Generate report" class="btn" style="width: 20px; padding: 0; margin-right:5px; vertical-align: baseline; background: lightblue;"><span class="fa fa-plus" style="color:white"></span></button>');
                            $btn1.on("click", index_report);
                            $btn1.attr("data-videoid", row.videoId);
                            $btn1.attr("data-chapterid", 0);  // TODO Pass chapterId here!
                            $rowdiv.append($btn1);
                        }
                        $rowdiv.append($p1);
                        //$rowdiv.append($p2);
                        var $span1 = $('<span></span>');
			if(row.ampliacio=='S'){
				$span1.css("background", "lightblue");
				$span1.attr("title", "Ampliació");
			}
                        $span1.html(row.title);
                        $rowdiv.append($span1);
                        $completionDiv.append($rowdiv);
                    }


                    // Check if the user is a teacher and display students progress
                    if (pi.isTeacher) {
                        var $reportDiv = $('<div id="iedib-report-div" style="border-top: 1px solid lightgray; max-height: 400px; overflow-y: auto; padding: 5px;"></div>');
                        $completionDiv.append($reportDiv);
                    }
                }
            });

        }
    };

    // FIRE API
    var fireAPI = function () {
        pi = iedibAPI.getPageInfo();
        console.log("pageInfo is ", pi);
        // unless guest user
        if(pi.userId > 0) { 
                ajax_handshake(function(){
                    //window.setTimeout(function(){search_yt_videos()}, 5000);
                    search_yt_videos(); 
                    search_h5p_videos();
                    //Index on first page
                    create_index();
                });
        }
    };

    $(document).ready(fireAPI);
    //addEventListener("load", fireAPI);
}); //end require
