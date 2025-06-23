
$(function(){

    //define custom css
    var incrustaCss = '.pw-laser-nw{position:relative;} .pw-laser-nw::after{content:"";position:absolute;left:0;top:0;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;} ';
    incrustaCss += '.pw-laser-ne{position:relative;} .pw-laser-ne::after{content:"";position:absolute;right:0;top:0;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;} ';
    incrustaCss += '.pw-laser-sw{position:relative;} .pw-laser-sw::after{content:"";position:absolute;left:0;bottom:0;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;} ';
    incrustaCss += '.pw-laser-se{position:relative;} .pw-laser-se::after{content:"";position:absolute;right:0;bottom:0;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;} ';
    incrustaCss += '.pw-laser-md{position:relative;} .pw-laser-md::after{content:"";position:absolute;left:50%;bottom:50%;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;} '; 
    incrustaCss += '.audible-media-player{ background:#444444;max-width:600px;padding:6px;border-radius:7px;display:flex;margin:auto;margin-bottom:15px;} ';
    incrustaCss += '.pw-audible-btn{background: none; border: none; color: whitesmoke; margin: 0 5px;} ';
    incrustaCss +=  '@media-print{.audible-media-player{display:none;} }';

    //inscruta a la pàgina
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

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)(); 
    console.log(audioCtx);
    if(!audioCtx || !window.Audio) {
        console.error("No HTML5 Audio support");
        return;
    }
    var audioPlayers = {};
    var audibles = $('div[data-audible]');
    audibles.each(function(i, e) { 
        var $e = $(e);
        $e.find("a.accordion-toggle").append('<span title="Explicació en àudio"> narrada <i class="fas fa-headphones"></i></span>');
        var innerAccordion = $e.find(".accordion-inner");
        var data_audible = $e.attr('data-audible');
        var url = "https://piworld.es/iedib/audible/" + data_audible;
        var audioElement = new Audio();
        audioElement.id = data_audible;
        var fromElements = $e.find('[data-from]');
        var laserElements = $e.find('[data-laser]');
        fromElements.each(function(k, el){
            var fromTime = $(el).attr('data-from');
            el.fromTime = fromTime;
        });
        laserElements.each(function(k, el){
            var laserRaw = $(el).attr('data-laser');
            el.lasers = [];
            var parts = laserRaw.split('|');
            for(var j=0, len=parts.length; j<len; j++) {
                var alaser = parts[j];
                var parts2 = alaser.split(",");
                
                if(parts2.length >= 2) { 
                    var start = 0;
                    var end = 0;
                    var pos = 'md';
                    start = parseInt(parts2[0]);
                    end = parseInt(parts2[1]);
                    if(parts2.length>2) {
                        pos = (parts2[2] || 'md').trim().toLowerCase();
                    }
                    el.lasers.push({start: start, end: end, pos: pos});
                }
            }
        });
        audioPlayers[data_audible] = {
            parent: innerAccordion,
            audioElement: audioElement,
            fromElements: fromElements,
            laserElements: laserElements
        };
        var $src1 = $('<source id="'+data_audible+'_src1" src="'+url+'.m4a"></source>');
        var $src2 = $('<source id="'+data_audible+'_src2" src="'+url+'.mp3"></source>');
        $(audioElement).append($src1);
        $(audioElement).append($src2);

        audioElement.addEventListener('loadeddata', function() {
            let duration = audioElement.duration;
            console.log(audioElement, duration);
         

            var stop_btn = $('<button class="pw-audible-btn" style="background: none; border: none; color: whitesmoke; margin: 0 5px;" id="'+data_audible+'_stop"><i class="fas fa-sync"></i></button>');
            var slider = $('<input type="range" value="0" min="0" max="100" style="margin-left:5px;flex-grow:96;"/>');
            var ctime = $('<span style="margin-left:5px; color:white;font-family:arial;">00:00</span>');
            var play_btn = $('<button style="background: none; border: none; color: whitesmoke; margin: 0 5px;" class="pw-audible-btn"><i class="fas fa-play"></i></button>');
            var player_el = $('<div class="audible-media-player"></div>');


            stop_btn.on('click', function(ev){
                audioElement.pause();
                $(play_btn).html('<i class="fas fa-play"></i>'); 
                audioElement.currentTime = 0;
                audioPlayers[data_audible].fromElements.css('visibility', 'visible');
                ctime.html('00:00');
                slider.val(0);
            });


            play_btn.on('click', function(ev){
                audioElement.stopped = false;
                if(audioElement.paused) {
                    audioElement.play();
                    $(play_btn).html('<i class="fas fa-pause"></i>');
                } else {
                    audioElement.pause();
                    $(play_btn).html('<i class="fas fa-play"></i>');
                }
            });

           
            audioElement.addEventListener('timeupdate', function(ev){
                var target = ev.target;
                if(target.seeking) {
                    target.seeking = false;
                    return;
                }
                
                console.log("Ha canviat el temps!", target.currentTime)
                var obj = audioPlayers[target.id];
                var tsec = Math.floor(target.currentTime);
                if(tsec == 0) {
                    obj.fromElements.css('visibility', 'visible');
                    return;
                 }
                var min = Math.floor(tsec/60)+'';
                var sec = tsec - min*60+'';
                if(min.length < 2) {
                    min = '0' + min;
                }
                if(sec.length < 2) {
                    sec = '0' + sec;
                }
                ctime.html(min + ':' + sec); 

                var sliderpos = Math.round(100*tsec/duration);
                console.log("posant slider a ", sliderpos);
                slider.val(sliderpos);

                // check if some element requires action
               
                for(var i=0, len=obj.fromElements.length; i<len; i++) {
                    var elem = obj.fromElements[i];
                    if(elem.fromTime > tsec) {
                        $(elem).css('visibility', 'hidden');
                    } else {
                        $(elem).css('visibility', 'visible');
                    }
                }
                for(var i=0, len=obj.laserElements.length; i<len; i++) {
                    var elem = obj.laserElements[i];
                    //todo
                    var tobeshown = null;
                    for(var k=0, len2=elem.lasers.length; k<len2; k++) {
                        var laa = elem.lasers[k]; 
                        console.log(laa);
                        if(laa.start <= tsec && tsec <= laa.end ) {
                            console.log("set to tobe shwon")
                            tobeshown = laa.pos;
                            break;
                        }  
                    }
                    if(tobeshown) {
                        $(elem).addClass("pw-laser-"+tobeshown); 
                    } else {
                        $(elem).removeClass("pw-laser-md").removeClass("pw-laser-nw").removeClass("pw-laser-ne").removeClass("pw-laser-sw").removeClass("pw-laser-se");
                    }
                }
            });

            audioElement.addEventListener('ended', function(ev){
                var $target = $(ev.target);
                $target.val(100); 
                $(play_btn).html('<i class="fas fa-play"></i>');
                ctime.html('00:00');
                slider.val(0);
                audioElement.stopped = true;
                audioElement.currentTime = 0;
            });

            slider.on('change', function(ev){
                console.log("Activant seeking!");
                var target = ev.target;
                target.seeking = true;
                var noutemps = Math.floor(0.01*$(target).val()*duration);
                console.log("Posant el temps a ", noutemps);
                var obj = audioPlayers[audioElement.id];
                var min = Math.floor(noutemps/60)+'';
                var sec = noutemps - min*60+'';
                if(min.length < 2) {
                    min = '0' + min;
                }
                if(sec.length < 2) {
                    sec = '0' + sec;
                }
                ctime.html(min + ':' + sec); 
                if(noutemps == 0) {
                    //mostrar tot;
                    obj.fromElements.css('visibility', 'visible');
                    ctime.html('00:00');
                }
                audioElement.currentTime = noutemps;
            });

          
           
            player_el.append(play_btn);
            player_el.append(slider);
            player_el.append(ctime);
            player_el.append(stop_btn);

            //prepend
            innerAccordion.prepend(player_el);
            

        });

    });


});
