 

// Exemple de mòdul aïllat amb Vainilla JS
(function(){  
    var WORDS_MINUTE = 110;
    var MIN_IMATGE = 1.1;
    var MIN_TAULA = 1;
    var MIN_VIDEO = 10;
    var MIN_PER_ACTIVITAT = 5;
    // Aquest nom ha de coincidir amb el role="sample" del contenidor HTML
     var COMPONENT_NAME = "dedicacio";
     if(window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: "+COMPONENT_NAME+" loaded twice.");
        window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
      } 

     // Crea la classe per cada component a partir del contenidor
     var Snippet = function(container) {  
         var aSpan = container.querySelector("span");
         if(!aSpan) {
             return;
         }
         var aSpanText = aSpan.innerText.trim(); 
         // Ready to perform estimation
         this.container = container;
         this.aSpan = aSpan;
         if(!aSpanText) {
            this.estimate();
         }
    };
 
     // API del component que es vol exposar
     Snippet.prototype = {
         estimate: function() {
             if(!this.aSpan) {
                 return;
             }
            // Realitza una estimació del temps necessari de dedicació de la pàgina 
            var pageContent = document.querySelector("div.no-overflow");
            var words = pageContent.innerText.replace(/\s+/g,' ').split(' ');
            var wlen = words.length;
            var minuts = 0.0;
            if(wlen > 0) {
                minuts = wlen/WORDS_MINUTE; 
            }
            // Imatges
            var nimg = pageContent.querySelectorAll("img").length;
            minuts += nimg*MIN_IMATGE; 
            // Taules
            var ntaules = pageContent.querySelectorAll("table.iedib-table").length;
            minuts += ntaules*MIN_TAULA; 
            // Videos youtube
            var nvideos = pageContent.querySelectorAll(".iedib-video-container").length;
            minuts += nvideos*MIN_VIDEO; 
            // exercici-proposat
            var ex_proposat = pageContent.querySelector(".iedib-proposat");
            if(ex_proposat) {
                var num_activitats = 3;
                minuts += num_activitats*MIN_PER_ACTIVITAT;
            }

            // Convertim temps a hores, minuts i arrodomin el temps
            var dedicationTimeStr = "" 
            if(minuts > 60) {
                var dedicationTimeHour = Math.floor(minuts/60.0);
                var dedicationTimeMin = minuts - dedicationTimeHour*60.0;
                dedicationTimeMin = 10*Math.floor(dedicationTimeMin/10); 
                if (dedicationTimeMin > 0) {
                    dedicationTimeStr +=  dedicationTimeHour + ' h ' + dedicationTimeMin + ' min';
                }  
            } else {
                // Arrodoneix minuts a múltiple de 5
                minuts = 5*Math.round(minuts/5.);
                dedicationTimeStr = minuts + ' min';
            }
            if(minuts < 5){
                // No mostris dedicació per pàgines massa curtes
                this.container.parentElement.style.display = "none";
            } else {
                this.aSpan.innerText = dedicationTimeStr;
            }
 
            console.error("words=",wlen," imatges=", nimg, " taules=", ntaules, " videos=", nvideos, " proposats=", ex_proposat, "Total (min)=", minuts);

         },
         dispose: function() {
            this.container.dataset.active="";
            if(this.aSpan) {
                this.aSpan.innerHTML = "";
            }
         }
     };
 
    
    var alias = {author: "Josep Mulet", version: "1.0", inst: {}};
    window.IB.sd[COMPONENT_NAME] = alias;
  
     var bind = function() {
        // Cerca tots els contenidors dels components d'aquest tipus
        var componentContainers = document.querySelectorAll('[role="' + COMPONENT_NAME + '"]');
        // Crea una instància de la classe anterior per a cadascun dels components trobats en la pàgina
        for(var i=0, len=componentContainers.length; i<len; i++) {
            var container = componentContainers[i];
            // Evita que un contenidor pugui ésser tractat més d'una vegada degut a múltiples insercions de la llibreria
            if(container.dataset.active) {
                continue;
            }
            container.dataset.active = "1";

            var instancia = new Snippet(container);
            // Exposa l'objecte a window per si es volgués emprar la seva API
            // Aquesta seria la forma d'utilitzar comunicació entre components (si fos necessari)
            // s'assegura que el contenidor del component té id, sinó l'assigna
            var id = container.getAttribute("id");
            if(!id) {
                id = "dynamic_"+Math.random().toString(32).substring(2);
                container.id = id;
            }
            window.IB.sd[COMPONENT_NAME].inst[id] = instancia;
        }
    }; 
    alias.bind = bind;
    alias.unbind = function() {
        var lInst = Object.values(alias.inst);
        for(var i=0, l=lInst.length; i<l; i++) {
            lInst[i].dispose(); 
        }
        alias.inst = {};
     };
        
    bind();   
 })(); 