var incrustaCss='.accordion-inner>.mediaplugin.mediaplugin_videojs{width:99%;margin-bottom:15px;}\n .accordion-inner >.mediaplugin.mediaplugin_videojs>div{max-width:none!important;}\n  .accordion-inner .mediaplugin, .mediaplugin video {width:99%;}\n .accordion-inner .video-js.vjs-audio {background: #426e34;}';
incrustaCss += '.pw-pointer-nw{position:relative;} .pw-pointer-nw::after{content:"";position:absolute;left:0;top:0;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;} ';
incrustaCss += '.pw-pointer-ne{position:relative;} .pw-pointer-ne::after{content:"";position:absolute;right:0;top:0;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;} ';
incrustaCss += '.pw-pointer-sw{position:relative;} .pw-pointer-sw::after{content:"";position:absolute;left:0;bottom:0;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;} ';
incrustaCss += '.pw-pointer-se{position:relative;} .pw-pointer-se::after{content:"";position:absolute;right:0;bottom:0;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;} ';
incrustaCss += '.pw-pointer-md{position:relative;} .pw-pointer-md::after{content:"";position:absolute;left:50%;bottom:50%;width:10px;height:10px;border-radius:50%;background:rgba(255,0,0,0.6);box-shadow: 0 0 5px 3px red;} '; 
 incrustaCss +=  '@media-print{.accordion-inner>.mediaplugin.mediaplugin_videojs{display:none;} }'
 

//'-webkit-box-shadow: 5px 5px 15px 5px #FF8080, -9px 5px 15px 5px #FFE488, 12px 10px 15px 7px #E488FF, -10px 10px 15px 7px #FF616B, -5px -16px 6px -10px rgba(0,0,0,0); box-shadow: 5px 5px 15px 5px #FF8080, -9px 5px 15px 5px #FFE488, 12px 10px 15px 7px #E488FF, -10px 10px 15px 7px #FF616B, -5px -16px 6px -10px rgba(0,0,0,0);'; 
//incrustaCss += '}';
window.iedibAPI.createStyleSheet(incrustaCss);


 require(['media_videojs/video-lazy'], function(videojs){
                    console.log(videojs);
                    window.setTimeout(function() {
                        //find all data-audibles
                        var audiblePanels = {};
                        $('.accordion[data-audible]').each(function(i,e) {
                           var $e = $(e);
                           var recurs = $e.attr('data-audible');
                           console.log("Recurs", recurs);
                           audiblePanels[recurs] = {
                             e: $e.find('.accordion-inner'),
			     link: $e.find('.accordion-group>.accordion-heading>a[data-toggle="collapse"]'),
                             t: 0
                           };
                        });
                      
//                        $(".mediaplugin, .mediaplugin video").css("width","300px");
                      
                        var audios = videojs.players;
                        var audiosIds = Object.keys(audios); 
                        for(var i=0, len=audiosIds.length; i<len; i++) {
                           var audioId = audiosIds[i];
                           var audio = audios[audioId];
                           console.log(audioId, audio);
                           var player = audio.player_;
                           //do something with the player
                           console.log(player);
			   var pa = audiblePanels[audio.tagAttributes.title];

			  //quan clica el link reseteja
			  pa.link.on("click", function(evt){
			  	player.pause();
				player.currentTime(0);
				pa.e.find("[data-from]").css('visibility','visible');
				pa.e.find("[data-pointer]").removeClass('pw-pointer-md');
			  });

                           player.on('timeupdate', function(){
                              var t = player.currentTime();
                              // necessit saber quin panell correspon
                              console.log(audio);
                              var pa = audiblePanels[audio.tagAttributes.title];
                              
				if(t==0){
					pa.e.find("[data-from]").css('visibility','visible');
                                	pa.e.find("[data-pointer]").removeClass('pw-pointer-md')
					.removeClass('pw-pointer-nw').removeClass('pw-pointer-nw')
					.removeClass('pw-pointer-sw').removeClass('pw-pointer-se');
					return;
				}
                              
                             pa.e.find("[data-from]").each(function(j, ee){
                               var $ee=$(ee);
                               if($ee.attr("data-from")<t) {
                                   $ee.css('visibility','visible');
                               } else {
                                  $ee.css('visibility','hidden');
                               } 
                               
                             });

			     pa.e.find("[data-pointer]").each(function(j, ee){
			       var $ee=$(ee);
                               var parts = ($ee.attr("data-pointer") || "").split(",");
                               if(parts.length>1) {
			          var t0=parts[0];
                                  var t1=parts[1];
				  var pos = 'md';
				  if(parts.length > 2) {
				  	pos = parts[2].trim();
				  }
            	                  if(t0<=t && t<=t1) {
                                       //$ee.css('background','yellow');
				       //$ee.addClass("pw-pointer");
				       $ee.addClass("pw-pointer-"+pos);
                                  } else {
                                       //$ee.css('background','none');
				       //$ee.removeClass("pw-pointer");
 				       $ee.removeClass("pw-pointer-"+pos);      
                                  } 
			       }

				
      	                     });
                               
                             pa.t = t;
                             console.log('the time was updated to: ' + t);
                          }); 
                        } }, 2000);
                       
     
                  });
