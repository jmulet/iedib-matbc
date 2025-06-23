// Required window.iedibAPI https://piworld.es/iedib/assets/iedib-api.js

window.require(["jquery", "core/modal_factory", "core/modal_events"], function ($, ModalFactory, ModalEvents) {
    var videosOnPage = {};
    var isOnline = true;
    var pi = {};

    var H5P_Video_PLAYING;
    var H5P_Video_PAUSED;
    var H5P_Video_ENDED;

    // intervals all in seconds
    var TIMER_INTERVAL = 1; 
    var AJAX_INTERVAL = 30; 
    var TIME_ANSWER = 15;

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

    // Prepare dead man times
    var generate_dman = function (vop) {
        var d2 = vop.duration / 2.0;
        var d3 = vop.duration / 3.0;
        var n = Math.round(Math.random() * 2) + 1;
        if (n == 2) {
            vop.dman = [Math.random() * d2, d2 + Math.random() * d2];
        } else {
            vop.dman = [Math.random() * d3, d3 + Math.random() * d3, 2 * d3 + Math.random() * d3];
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

    var drawProgressStars = function (fstars, $container) {
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
        $container.html(builder);
        $container.attr("title", "Aconseguit " + (fstars * 100).toFixed(0) + "%");
    };

    var scale_color = function (f) {
        var x = Math.floor(255 * (1 - f));
        return "rgb(" + x + ",255," + x + ")";
    };

    var drawTimeSegments = function (segm, duration, $container) {
        var builder = [];
        var d10 = duration / 10.0;
        var total = 0.0;
        for (var i = 0; i < segm.length; i++) {
            total += segm[i];
            var color = scale_color(d10 > 0 ? (segm[i] / d10) : 0.0);
            builder.push('<span style="width:10px;height:15px;display:table-cell;background:' + color + '"></span>');
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
        var $pwvts = $(".iedib-caption-progress");
        $pwvts.css("background", "orangered");
        $pwvts.attr("title", "El registre de vídeos no funciona en aquests moments. No podreu obtenir punts fins que no s'activi.");
    };

    /* Close fullscreen */
    var closeFullscreen = function () {
        try {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        } catch (Ex) { }
    };

    var updateTimes = function (vonpage, t1, onlyUpdate) {
        var t0 = vonpage.t0;
        if(vonpage.info.maxtime < t1) {
            vonpage.info.maxtime = t1;
        }
        console.log(t1, t0);
        if (Math.abs(t1 - t0) > 2*TIMER_INTERVAL) {
            // Probably seeking
            console.log("Probably seeking");
            vonpage.t0 = t1;
            return;
        }
        if (Math.abs(t1 - t0) < 0.8*TIMER_INTERVAL) {
            console.log("too short interval");
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
        if (vonpage.dman) {
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


    var ajax_video_info = function (vop, forceUpdate) {
        /* If the video-caption-title is empty then fill it with title from video */
        if (!(vop.title_elem.text() || "").trim()) {
               vop.title_elem.text(": " + vop.title);
        }

        console.log("Doing ajax video info", vop);
        var initdata = {
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
            s1: 0,
            s2: 0,
            s3: 0,
            s4: 0,
            s5: 0,
            s6: 0,
            s7: 0,
            s8: 0,
            s9: 0,
            s10: 0,
            maxscore: vop.maxscore,
            score: 0,
            anchorId: vop.anchorId,
            counter: vop.counter,
            maxtime: 0.0,
            forceUpdate: forceUpdate? vop.info.idVideos : 0
        };

        $.ajax({
            method: "POST",
            url: "https://piworld.es/iedibapi/video/info",
            data: initdata,
            dataType: "json"
        }).done(function (json_res) {
            console.log("RAW JSON ", json_res);
            if (json_res.videoId) {
                var vopage = getVideosOnPage(json_res.videoId);
                json_res.maxscore = vopage.maxscore; //overwrite with current value
                var $ee = vopage.progress_elem;
                vopage.info = json_res;
                console.log("Set info into json_res", vopage);
                if ($ee) {
                    drawProgressStars(json_res.fstars, $ee);
                }                
            } else {
                console.log("Error mode");
                turnErrorMode();
                isOnline = false;
            }
        }).fail(function (Ex) {
            console.log("Error mode", Ex);
            turnErrorMode();
            isOnline = false;
        });

        if (vop.progress_elem) {
            drawProgressStars(0, vop.progress_elem);
        }
    };

    var updateTimesDB = function (vonpage) {
        if (isOnline && vonpage.info) {
            $.ajax({
                method: "POST",
                url: "https://piworld.es/iedibapi/video/update",
                data: vonpage.info,
                dataType: "json"
            }).done(function (json_res) {
                //Update stars
                console.log("video update has returned ", json_res);
                drawProgressStars(json_res.fstars, vonpage.progress_elem);
            }).fail(function (err) {
                turnErrorMode();
            });
        } else {
            //Attempt connection again
            ajax_video_info(vonpage);
        }
    };


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
            var videoId = evt.target.getVideoData().video_id;        
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
                    if(!vonpage.info.duration) {
                        var duration = vonpage.info.duration || player.getDuration();
                        console.log("FIXED DURATION!!!! ", duration);
                    }
                    
                    if(!vonpage.played && 
                     vonpage.info.maxtime > 60 && vonpage.info.maxtime < vonpage.info.duration - 60) {
                        vonpage.player.seekTo && vonpage.player.seekTo(vonpage.info.maxtime, true);
                    }

                    vonpage.played = true;

                    // Pause all other videos in page
                    $.each(videosOnPage, function(i, v){
                        if(v.videoId != vonpage.videoId) {
                            v.player.pauseVideo && v.player.pauseVideo();
                        }
                    });
                    if (!vonpage.timer) {
                        var callback_timer = function () {
                            var t1 = player.getCurrentTime();
                            updateTimes(vonpage, t1);
                            if (vonpage.calls >= AJAX_INTERVAL) {
                                console.log("ajax called");
                                vonpage.calls = 0;
                                updateTimesDB(vonpage);
                            } else {
                                vonpage.calls += TIMER_INTERVAL;
                            }
                        };
                        vonpage.t0 = player.getCurrentTime();
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
                var t1 = player.getCurrentTime();
                updateTimes(vonpage, t1, true);
                break;

            case ENDED:
                if (vonpage && vonpage.timer) {
                    vonpage.timer.pause();
                    console.log("Timer has been paused");
                }
                var t1 = player.getCurrentTime();
                updateTimes(vonpage, t1, true);
                updateTimesDB(vonpage);
                player.stopVideo && player.stopVideo();
                break;
        }
    };

    var flatten_obj = function(obj) {
            var str = "";
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
                f = map2str(arr[i].description);
            }
            i += 1;
        }
        return f;
    };


    var search_h5p_videos = function () {
        var $videos = $("div.iedib-video-container > iframe");
        var len_videos = $videos.length;
        console.log("Found H5P VIDEOS in this page n=", len_videos); 
        var num_errors = 0;
        $.each($videos, function(i, iframe){            
            var $iframe = $(iframe);
            var $videoContainer = $iframe.parent();
            if($videoContainer.hasClass("iedib-no-tracking")) {
                return;
            }
            var H5P;
            try {
                var embed_document = iframe.contentWindow.document;
                var h5p_iframe = embed_document.getElementsByClassName('h5p-iframe')[0].contentWindow;
                H5P = h5p_iframe.H5P;
                H5P_Video_PLAYING = H5P_Video_PLAYING || H5P.Video.PLAYING;
                H5P_Video_PAUSED = H5P_Video_PAUSED || H5P.Video.PAUSED;
                H5P_Video_ENDED = H5P_Video_ENDED || H5P.Video.ENDED;            
            } catch(Ex) {
                console.log("H5P not ready yet! ", Ex);
                num_errors += 1;
                return false;
            }
            var instance0 = H5P.instances[0];
            var player = instance0.video;

            var xapiData = instance0.getXAPIData();
            var maxscore = instance0.getMaxScore();
            console.log(xapiData, maxscore);
            var h5pId = xapiData.statement.object.id || "";
            h5pId = h5pId.split("id=")[1];
            var h5pNameObj = xapiData.statement.object.definition.name || {
                "en-us": ""
            };
            var h5pName = flatten_obj(h5pNameObj);

            var $caption_elem = $($iframe.parent().find(".iedib-caption")[0]);
            var $title_elem = $($caption_elem.find(".iedib-caption-title")[0]);
            var $progress_elem = $($caption_elem.find(".iedib-caption-progress")[0]);
            $progress_elem.css({"display": "inline-table", "height": "25px", "width": "80px"});
            
            // This info is not accessible since the video may not be ready!
            console.log(player, instance0);
            var duration = instance0.duration || player.getDuration();

            if(!duration) {
                window.setTimeout(search_h5p_videos, 250);     
                return;
            }

            videosOnPage[player.contentId] = {
                videoId: h5pId,
                title: h5pName + (" " + $title_elem.text() || ""),
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
                console.log(evt, vonpage);
                if (evt.statement.verb.id == "http://adlnet.gov/expapi/verbs/answered") {
                    if (evt.statement.result.score.raw > vonpage.info.score) {
                        vonpage.info.score = evt.statement.result.score.raw;
                    }
                    var formulation = flatten_obj(evt.statement.object.definition.description);
                    var answer = [];
                    var arr = evt.statement.object.definition.correctResponsesPattern;
                    for (var i = 0; i < arr.length; i++) {
                        answer.push(getDescriptionById(evt.statement.object.definition.choices, arr[i]));
                    }
                    var success = evt.statement.result.success;
                    console.log("You answered", answer, "and this is ", success);
    
                    var info2 = { "xapi": { "formulation": formulation, "answer": answer.join("; "), "correct": success } };
                    $.extend(info2, vonpage.info);
    
                    $.ajax({
                        method: "POST",
                        url: "https://piworld.es/iedibapi/video/update", 
                        data: info2,
                        dataType: "json"})
                    .done(function (res) {
                        //Update stars
                        console.log("video update has returned --do something with fstars--", res);                        
                        drawProgressStars(res.fstars, vonpage.progress_elem);
                    });
                }
            });
        });       

        if(num_errors > 0) {
            // Wait and try again
            window.setTimeout(search_h5p_videos, 250);            
        }  
    };


    var onYTPlayerReady = function (evt) {
        console.log("Ready", evt);
        var vdata = evt.target.getVideoData();
        var vop = videosOnPage[vdata.video_id];
        vop.duration = evt.target.getDuration();
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
        if ($videoContainer.hasClass("iedib-no-tracking")) {
            return;
        }
        var anchorId = $videoContainer.attr("data-anchor-id");
        var counter = $videoContainer.attr("data-counter");
        var ampliacio = $videoContainer.attr("data-ampliacio");

        var videoId = $iframe.attr("id").replace("pwVideoId_", "").split("?")[0];
        var $caption_elem = $($iframe.parent().parent().find(".iedib-caption")[0]);
        var $title_elem = $($caption_elem.find(".iedib-caption-title")[0]);
        var $progress_elem = $($caption_elem.find(".iedib-caption-progress")[0]);
        $progress_elem.css({"display": "inline-table", "height": "25px", "width": "80px"});

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
        var player = new YT.Player($iframe.attr("id"), {
            videoId: videoId,
            events: {
                'onReady': onYTPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

        videosOnPage[videoId].player = player;

        $iframe.addClass("pw-yt-video-handled");


    };

    var search_yt_videos = function () {
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
            iedibAPI.insertScript("https://www.youtube.com/iframe_api", true, false);
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
        var vop = getVideosOnPage(videoId);
        var $container = $("#iedib-report-div");
        $.ajax({
            method: "POST",
            url: "https://piworld.es/iedibapi/video/report",
            data: { isTeacher: pi.isTeacher, courseId: pi.courseId, bookId: pi.bookId, site: pi.site, videoId: videoId, userId: pi.userId },
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
                        var $p1 = $('<p style="display:inline; margin: 0 10px;"></p>');
                        drawProgressStars(row.fstars, $p1);
                        $li.append($p1);
                        var $p2 = $('<p style="display:inline; margin: 0 8px; position: relative; top: -10px;border:1px solid gray;"></p>');
                        drawTimeSegments(row.segments, row.duration, $p2);
                        $li.append($p2);
                        $li.append('<span style="font-size:80%; padding: 0 10px">' + format_date(row.first_access) + '-' + format_date(row.last_access) + '</span>');
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

    var index_cleanvideo = function (evt) {
        console.log(evt);
        var videoId = evt.currentTarget.dataset.videoid;
        var vop = getVideosOnPage(videoId);
        var title = vop ? vop.name : "";
        if (!window.confirm("Segur que voleu eliminar les entrades del vídeo ``" + title + " (" + videoId + ") " + "´´ d'aquest llibre?")) {
            return;
        }

        $.ajax({
            method: "POST",
            url: "https://piworld.es/iedibapi/video/clean",
            data: { isTeacher: pi.isTeacher, courseId: pi.courseId, bookId: pi.bookId, site: pi.site, videoId: videoId, userId: pi.userId },
            dataType: "json"
        })
            .done(function (res) {
                if (res.changes) {
                    var p = evt.currentTarget.parentNode;
                    p.parentNode.removeChild(p);
                }
            });
    };

    var create_index = function () {
        // Search for index page in book
        // Check if we are in first book page and show completion progress
        console.log("Index of videos");
        var $completionDiv = $("#video-completion-progress");
        console.log("The container is ", $completionDiv);

        if ($completionDiv.length) {
            $.ajax({
                method: "POST",
                url: "https://piworld.es/iedibapi/video/progress",
                data: pi,
                dataType: "json"
            }).done(function (res) {
                console.log("The ajax call returns ", res);

                if (Array.isArray(res) && res.length) {
                    $completionDiv.css({
                        "padding": "10px", "margin": "25px auto", "width": "75%", "border": "1px solid #e3e3e3",
                        "border-radius": "4px", "background-color": "#f5f5f5"
                    });

                    var $h4 = $('<h4 style="text-transform: uppercase; color: gray; font-size: 1.1em;">Progrés dels videos</h4>');
                    $completionDiv.append($h4);

                    for (var i = 0; i < res.length; i++) {
                        var row = res[i];
                        var $rowdiv = $("<div></div>");

                        var $p1 = $('<p style="display:inline-block; margin: 0 10px; width:60px;"></p>');
                        drawProgressStars(row.fstars, $p1);

                        var $p2 = $('<p style="margin: 0 10px; position: relative; display: inline-block; border: 1px solid lightgray;"></p>');
                        drawTimeSegments(row.segments, row.duration, $p2);

                        if (pi.isTeacher) {
                            var $btn1 = $('<button title="Generate report" style="width: 20px; padding: 0px; vertical-align: baseline; background: lightblue;"><span class="icon-plus-sign"></span></button>');
                            $btn1.on("click", index_report);
                            $btn1.attr("data-videoid", row.videoId);
                            $rowdiv.append($btn1);


                            var $btn2 = $('<button title="Remove from book" style="width:20px; padding: 0px; vertical-align: baseline; background: lightcoral;"><span class="icon-trash"></span></button>');
                            $btn2.on("click", index_cleanvideo);
                            $btn2.attr("data-videoid", row.videoId);
                            $btn2.prop("disabled", (row.owner != pi.userId));
                            $rowdiv.append($btn2);



                        }
                        $rowdiv.append($p1);
                        $rowdiv.append($p2);
                        var $span1 = $('<span></span>');
			if(row.ampliacio){
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
        search_h5p_videos();
        search_yt_videos();
        create_index();
    };

    $(document).ready(fireAPI);
    //addEventListener("load", fireAPI);
}); //end require
