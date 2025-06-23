

$(function () {

    var audiosInPage = {};

    //define custom css
    var incrustaCss = ' .pw-laser-nw{position:relative;}\n .pw-laser-nw::after{content:"";position:absolute;left:0;top:0;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;}\n ';
    incrustaCss += ' .pw-laser-ne{position:relative;}\n .pw-laser-ne::after{content:"";position:absolute;right:0;top:0;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;}\n ';
    incrustaCss += ' .pw-laser-sw{position:relative;}\n .pw-laser-sw::after{content:"";position:absolute;left:0;bottom:0;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;} \n';
    incrustaCss += ' .pw-laser-se{position:relative;}\n .pw-laser-se::after{content:"";position:absolute;right:0;bottom:0;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;}\n ';
    incrustaCss += ' .pw-laser-md{position:relative;}\n .pw-laser-md::after{content:"";position:absolute;left:50%;bottom:50%;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;}\n ';
    incrustaCss += ' .audible-media-player{max-width:600px;padding:6px;border-radius:7px;display:flex;margin:auto;margin-bottom:15px;}\n ';
    incrustaCss += '  \n .audible-frog span, .audible-frog button{color: #4f6e46;}\n .audible-sky{background:rgb(241,245,254);}\n .audible-frog{background:#e6ede6;}\n .audible-sky span, .audible-sky button{color:rgb(31,106,219);} \n ';
    incrustaCss += ' .pw-audible-btn{background: none; border: none; color: #4f6e46; margin: 0 5px;} \n';
    incrustaCss += ' .pw-pen-yellow{-webkit-box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, 5px 5px 15px 5px rgba(0,0,0,0);box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, 5px 5px 15px 5px rgba(0,0,0,0);background: rgb(255,255,193,0.5);} \n ';
    incrustaCss += ' .pw-pen-green{-webkit-box-shadow: #FFF 0 -1px 4px, #3f3 0 -2px 10px, 5px 5px 15px 5px rgba(0,0,0,0);box-shadow: #FFF 0 -1px 4px, #3f3 0 -2px 10px, 5px 5px 15px 5px rgba(0,0,0,0);background: rgb(193,255,200,0.5);}\n ';
    incrustaCss += ' .pw-pen-red{-webkit-box-shadow: #FFF 0 -1px 4px, #f33 0 -2px 10px, 5px 5px 15px 5px rgba(0,0,0,0);box-shadow: #FFF 0 -1px 4px, #f33 0 -2px 10px, 5px 5px 15px 5px rgba(0,0,0,0);background: rgb(255,193,193,0.5);} \n ';
    incrustaCss += '  @media print{.audible-media-player{display:none;} }\n';

    //insert css into page
    var createStyleSheet = function (src, id) {
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
    createStyleSheet(incrustaCss, 'audible_css');

    //Shows a dedication of dedication time for the current section
    $.fn.dedication = function (options) {
        var ptime = this.attr("data-dedication") || "";
        var container = $('#pw-rt-content');
        if (container.length) {
            var $el = $(
                '<div title="Temps de dedicació recomanat per aquesta secció" data-toggle="tooltip" style="display:inline-block;margin:10px;padding:5px;border-radius:5px;background:rgb(241,245,254);color:rgb(31,106,219);"><i class="fad fa-stopwatch" aria-hidden="true"></i> <b>' + ptime + '</b></div>'
            );
            container.append($el);
        } else {
            var $el = $('<div id="pw-rt-content" style="display: flex; justify-content: flex-end; align-items:center;">' +
                '<div title="Temps de dedicació recomanat per aquesta secció" data-toggle="tooltip" style="display:inline-block;margin:10px;padding:5px;border-radius:5px;background:rgb(241,245,254);color:rgb(31,106,219);"><i class="fad fa-stopwatch" aria-hidden="true"></i> ' + ptime + '</div>' +
                '</div>');
            this.replaceWith($el);
        }
    };

    //Shows guidance
    $.fn.guidance = function (options) {
        var guidance_url = this.attr("data-guidance") || "";
        var print_url = this.attr("data-print") || "";
        var titol = this.attr("data-title") || "";
        var url = guidance_url;
        var srcs = [];
        var isYoutube = false;
        if (!url.startsWith("http")) {
            url = "https://ibsuite.es/iedib/audible/" + guidance_url;
            srcs.push(url + ".m4a");
            srcs.push(url + ".mp3");
        } else {
            srcs.push(url);
            isYoutube = true;
        }

        var container = $('#pw-rt-content');
        var $el = null;
        if (container.length) {
            $el = $('<div style="display:inline-block;position:relative;">'
                + '<div class="dropdown-toggle" title="Orientacions per a la secció" data-toggle="modal" data-target="#videoModal" style="cursor:pointer;margin:10px;padding:5px;border-radius:5px;background:rgb(241,245,254);color:rgb(31,106,219);"><i class="far fa-compass"></i></i> Orientacions</div>'
                + '<img src="https://ibsuite.es/iedib/img/pepavatar2.png" style="width:40px;position:absolute;top:-40px;left:10px;">'
                + '</div>');
            if(print_url) {
                container.append($('<a class="btn btn-outline-primary" data-toggle="tooltip" style="height:34px;" title="Versió optimitzada per a l\'impressió" href="'+print_url+'" target="_blank"><i class="fa fas fa-print"></i></a>'));
            }
            container.append($el);
        } else {
            container = $('<div id="pw-rt-content" style="display: flex; justify-content: flex-end;align-items:center;"></div>');
            $el = $('<div style="display: inline-block;position: relative;">'
                + '<div class="dropdown-toggle" title="Orientacions per a la secció" data-toggle="modal" data-target="#videoModal" style="cursor:pointer;margin:10px;padding:5px;border-radius:5px;background:rgb(241,245,254);color:rgb(31,106,219);"><i class="far fa-compass"></i></i> Orientacions</div>'
                + '<img src="https://ibsuite.es/iedib/img/pepavatar2.png" style="width:40px;position:absolute;top:-40px;left:10px;">'
                + '</div>');
            if(print_url) {
                container.append($('<a class="btn btn-outline-primary" data-toggle="tooltip" style="height:34px;" title="Versió optimitzada per a l\'impressió" href="'+print_url+'" target="_blank"><i class="fa fas fa-print"></i></a>'));
            }
            container.append($el);
            this.replaceWith(container);
        }
        // Case of Youtube video
        if (isYoutube) {

            //create a fullscreen youtube player
            //<!-- Modal -->
            var videoModal = $('#videoModal');
            if(!videoModal.length) {
                videoModal = $('<div class="modal fade" id="videoModal" tabindex="-1" role="dialog">'+
                '<div class="modal-dialog modal-dialog-centered modal-lg" role="document">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header bg-dark border-dark">'+
                            '<span style="color:white;font-weight:bold;">'+titol+'</span>' +
                            '<button id="modalCloseBtn" type="button" class="close text-white" data-dismiss="modal">&times;</button>'+
                        '</div>'+
                        '<div class="modal-body bg-dark p-0">'+
                            '<div class="embed-responsive embed-responsive-16by9">'+
                            '<iframe id="iframeModal"  class="embed-responsive-item" src="'+srcs[0]+'?version=3&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '</div>');

                $("body").append(videoModal);

                //TODO: Play on show

                videoModal.on("hide.bs.modal", function() {
                    console.error("Executing hidden.bs.modal");
                    //Stop video when hidding the modal
                    var iframeModal = $("#iframeModal");
                    iframeModal.attr("src", iframeModal.attr("src"));
                });

                $("#modalCloseBtn").on("click", function() {
                    console.error("Executing click");
                    //Stop video when hidding the modal
                    var iframeModal = $("#iframeModal");
                    iframeModal.attr("src", iframeModal.attr("src"));
                });
            }
            

        } else {
            // Audio embed
            // Now add to the $el a player
            $el.pwmplayer({
                id: guidance_url,
                src: srcs,
                css: 'position:absolute;top:47px;right:10px;display:none;z-index:100;',
                skin: 'sky'
            });

            $el.find(".dropdown-toggle").on("click", function () {
                var playerElement = $el.find('.audible-media-player');
                playerElement.toggle();
                //play or pause audio
                var player = audiosInPage[guidance_url];
                if (player) {

                    if (playerElement.css('display') == 'none') {
                        player.pause();
                    } else {
                        player.play();
                    }
                }
            });
        }
    };

    // Plugin that draws an overlay rectangle over it
    $.fn.overlaypen = function (options) {
        // this must act like a div
        if (!this.old_display) {
            this.old_display = this.css('display');
        }
        if (!this.old_position) {
            this.old_position = this.css('position');
        }
        this.css({ 'position': 'relative', 'display': 'inline-block' });

        var settings = $.extend({
            'width': '15px',
            'height': '60%',
            'background': 'orange',
            'opacity': '0.37',
            'z-index': '100',
            'border-radius': '20%'
        }, options);

        var keys = Object.keys(settings);
        var stys = [];
        for (var i = 0, len = keys.length; i < len; i++) {
            var k = keys[i];
            stys.push(k + ':' + settings[k]);
        }

        var overlay = $('<div class="pw-overlaypen" style="position:absolute;' + stys.join(";") + '"></div>');
        this.append(overlay);
        return this;
    };

    $.fn.erasepen = function () {
        this.css({ 'position': this.old_position, 'display': this.old_display });
        this.find(".pw-overlaypen").remove();
    };

    // Plugin for creating a media player based on HTML5 tecnology
    $.fn.pwmplayer = function (options) {
        //var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (!window['Audio']) {
            console.error("No HTML5 Audio support");
            return this;
        }
        var settings = $.extend({
            id: 'p' + Math.random().toString(32).substring(2),
            src: [],
            'skin': 'frog',
            'css': ''
        }, options);

        var sty = "";
        if (settings.css) {
            sty = 'style="' + settings.css + '"';
        }

        var seeking = false;
        var audioElement = new Audio();
        audioElement.id = settings.id;
        audiosInPage[settings.id] = audioElement;
        var stop_btn = $('<button class="pw-audible-btn" style="background: none; border: none; margin: 0 5px;" id="' + settings.id + '_stop"><i class="fa fas fa-sync"></i></button>');
        var slider = $('<input type="range" value="0" min="0" max="100" style="margin-left:5px;flex-grow:96;"/>');
        var ctime = $('<span style="margin-left:5px;font-family:arial;">00:00</span>');
        var play_btn = $('<button style="background: none; border: none; margin: 0 5px;" class="pw-audible-btn"><i class="fa fas fa-play"></i></button>');
        var player_el = $('<div class="audible-media-player audible-' + settings.skin + '" ' + sty + ' id="pwmplayer_' + settings.id + '" title="AudioPlayer by Josep Mulet"></div>');

        $.each(settings.src, function (i, url) {
            var $src1 = $('<source id="' + settings.id + '_src' + i + '" src="' + url + '"></source>');
            $(audioElement).append($src1);
        }); //end adding sources
        audioElement.load();

        audioElement.addEventListener('loadeddata', function () {
            var duration = audioElement.duration;
            //console.log(audioElement, duration);

            stop_btn.on('click', function (ev) {
                audioElement.pause();
                $(play_btn).html('<i class="fa fas fa-play"></i>');
                audioElement.currentTime = 0;
                ctime.html('00:00');
                slider.val(0);
                if (settings.onStop) {
                    settings.onStop();
                }
            }); //end onstop


            play_btn.on('click', function (ev) {
                audioElement.stopped = false;
                if (audioElement.paused) {
                    audioElement.play();
                    $(play_btn).html('<i class="fa fas fa-pause"></i>');
                } else {
                    audioElement.pause();
                    $(play_btn).html('<i class="fa fas fa-play"></i>');
                }
            }); //endonplay


            audioElement.addEventListener('timeupdate', function (ev) {
                var target = ev.target;
                if (seeking) {
                    //console.log("Target is seeking, so discard");
                    return;
                }
                //console.log("Ha canviat el temps!", target.currentTime);
                var tsec = Math.floor(target.currentTime);
                var min = Math.floor(tsec / 60) + '';
                var sec = tsec - min * 60 + '';
                if (min.length < 2) {
                    min = '0' + min;
                }
                if (sec.length < 2) {
                    sec = '0' + sec;
                }
                ctime.html(min + ':' + sec);

                var sliderpos = Math.round(100 * tsec / duration);
                //console.log("posant slider a ", sliderpos);
                slider.val(sliderpos);

                if (settings.onTimeupdate) {
                    settings.onTimeupdate(target.currentTime);
                }
            }); //end ontimeupdate


            audioElement.addEventListener('ended', function (ev) {
                var $target = $(ev.target);
                $target.val(100);
                $(play_btn).html('<i class="fa fas fa-play"></i>');
                ctime.html('00:00');
                slider.val(0);
                audioElement.stopped = true;
                audioElement.currentTime = 0;
            }); //end on ended


            slider.on("mousedown", function (ev) {
                //console.log("On mousedown", ev);
                seeking = true;
            });

            slider.on("mouseup", function (ev) {
                //console.log("On mouseup", ev);
                seeking = false;
            });

            slider.on('change', function (ev) {
                var target = ev.target;
                var noutemps = Math.floor(0.01 * $(target).val() * duration);
                //console.log("Posant el temps a ", noutemps);
                var min = Math.floor(noutemps / 60) + '';
                var sec = noutemps - min * 60 + '';
                if (min.length < 2) {
                    min = '0' + min;
                }
                if (sec.length < 2) {
                    sec = '0' + sec;
                }
                ctime.html(min + ':' + sec);
                if (noutemps == 0) {
                    ctime.html('00:00');
                }
                audioElement.currentTime = noutemps;
            }); //end onchange


            player_el.append(play_btn);
            player_el.append(slider);
            player_el.append(ctime);
            player_el.append(stop_btn);

        }); //end event loadeddata



        //prepend to the selected container
        this.prepend(player_el);

    }; //end plugin pwmplayer



    // Plugin for audible component
    $.fn.audible = function (options) {
        var $e = this;
        $e.find("a.accordion-toggle").append('<span title="Explicació en àudio"> narrada <i class="fa fas fa-headphones"></i></span>');

        var innerAccordion = $e.find(".accordion-inner");
        var data_audible = $e.attr('data-audible');
        var url = data_audible;
        var srcs = [];
        if (!url.startsWith("http")) {
            url = "https://ibsuite.es/iedib/audible/" + data_audible;
            srcs.push(url + ".m4a");
            srcs.push(url + ".mp3");
        } else {
            srcs.push(url);
        }

        var fromElements = $e.find('[data-from]');
        var laserElements = $e.find('[data-laser]');
        var penElements = $e.find('[data-pen]');
        //console.log("Quant elements amb data-from", fromElements);
        //console.log("Quants elements amb laser", laserElements);
        fromElements.each(function (k, el) {
            var fromTime = $(el).attr('data-from');
            el.fromTime = fromTime;
        });
        laserElements.each(function (k, el) {
            var laserRaw = $(el).attr('data-laser');
            //console.log(laserRaw);
            el.lasers = [];
            var parts = laserRaw.split('|');
            for (var j = 0, len = parts.length; j < len; j++) {
                var alaser = parts[j];
                var parts2 = alaser.split(",");

                if (parts2.length >= 2) {
                    var start = 0;
                    var end = 0;
                    var pos = 'md';
                    start = parseInt(parts2[0]);
                    end = parseInt(parts2[1]);
                    if (parts2.length > 2) {
                        pos = (parts2[2] || 'md').trim().toLowerCase();
                    }
                    el.lasers.push({ start: start, end: end, pos: pos });
                } else {
                    console.error("Invalid laser ", alaser);
                }
            }
        });
        penElements.each(function (k, el) {
            var penRaw = $(el).attr('data-pen');
            //console.log(penRaw);
            el.pen = [];
            var parts = penRaw.split('|');
            for (var j = 0, len = parts.length; j < len; j++) {
                var apen = parts[j];
                var parts2 = apen.split(",");

                if (parts2.length === 3) {
                    var start = 0;
                    var end = 0;
                    var opts = {};
                    start = parseInt(parts2[0]);
                    end = parseInt(parts2[1]);
                    var stys = parts2[2].split(";");
                    for (var k = 0, lenk = stys.length; k < lenk; k++) {
                        var sty = stys[k];
                        var kvpair = sty.split(":");
                        if (kvpair.length == 2) {
                            var kkk = kvpair[0].trim();
                            var vvv = kvpair[1].trim();
                            opts[kkk] = vvv;
                        }
                    }

                    el.pen.push({ start: start, end: end, opts: opts });
                } else {
                    console.error("Invalid penmarker ", apen);
                }
            }
        });

        var onTimeupdate = function (tsec) {

            if (tsec == 0) {
                fromElements.fadeTo('fast', 1);
                laserElements.removeClass("pw-laser-md").removeClass("pw-laser-nw").removeClass("pw-laser-ne").removeClass("pw-laser-sw").removeClass("pw-laser-se");
                penElements.each(function (i, pel) {
                    var $pel = $(pel);
                    $pel.erasepen();
                });
                return;
            }


            for (var i = 0, len = fromElements.length; i < len; i++) {
                var elem = fromElements[i];
                if (elem.fromTime > tsec) {
                    $(elem).fadeTo('fast', 0);
                } else {
                    $(elem).fadeTo('fast', 1);
                }
            }
            for (var i = 0, len = laserElements.length; i < len; i++) {
                var elem = laserElements[i];
                //todo
                var tobeshown = null;
                for (var k = 0, len2 = elem.lasers.length; k < len2; k++) {
                    var laa = elem.lasers[k];
                    //console.log(laa);
                    if (laa.start <= tsec && tsec <= laa.end) {
                        //console.log("set to tobe shwon");
                        tobeshown = laa.pos;
                        break;
                    }
                }
                if (tobeshown) {
                    $(elem).addClass("pw-laser-" + tobeshown);
                } else {
                    $(elem).removeClass("pw-laser-md").removeClass("pw-laser-nw").removeClass("pw-laser-ne").removeClass("pw-laser-sw").removeClass("pw-laser-se");
                }
            }

            for (var i = 0, len = penElements.length; i < len; i++) {
                var elem = penElements[i];

                var $elem = $(elem);
                $elem.each(function (i, pel) {
                    var $pel = $(pel);
                    $pel.erasepen();
                });
                for (var k = 0, len2 = elem.pen.length; k < len2; k++) {
                    var laa = elem.pen[k];
                    //console.log(laa);
                    if (laa.start <= tsec && tsec <= laa.end) {
                        //console.log("set to tobe shown");
                        var pen_options = laa.opts;
                        if (pen_options) {
                            $elem.overlaypen(pen_options);
                        }
                    }
                }


            }
        };

        var onStop = function () {
            fromElements.fadeTo('fast', 1);
        };

        // create the media player

        innerAccordion.pwmplayer({
            id: data_audible,
            src: srcs,
            onTimeupdate: onTimeupdate,
            onStop: onStop
        });


    }; //end audible plugin


    //Automatically activate all audible in page
    $('[data-audible]').each(function (i, e) {
        $(e).audible();
    });

    var scrollspy_activated = false;
    var activate_scrollspy = function() {
        scrollspy_activated = true; 
        var is_shown = true;
        window.onscroll = function() {
            var pw_rt_content = $('#pw-rt-content');
            var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollPosition > 300 && is_shown) {
                is_shown = false;
                pw_rt_content.fadeTo(500, 0);
            }
            if(scrollPosition < 300 && !is_shown) {
                is_shown = true;
                pw_rt_content.fadeTo(500, 1);
            }
        };
    };
    // Prevent to show dedications in PBAU
    if (($('div.page-header-headings > h1').html() || '').indexOf("PBAU") < 0) {
        //Automatically activate all dedications in page
        $('[data-dedication]').each(function (i, e) {
            if(i==0 && !scrollspy_activated) {
                activate_scrollspy();
            } 
            $(e).dedication();
        });
    }

    //Automatically show guidances
    $('[data-guidance]').each(function (i, e) {
        if (i == 0) {
            $('div.no-overflow').css("overflow", "initial");
        }
        if(i==0 && !scrollspy_activated) {
            activate_scrollspy();
        } 
        $(e).guidance();
    });



}); //end jquery ready function

