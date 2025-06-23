(function () {
    var COMPONENT_NAME = "speak";
    if (window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: " + COMPONENT_NAME + " loaded twice.");
        window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
    } 
    var findVoice = function (lang, voices) {
        lang = (lang || "").toLowerCase();
        var k = 0;
        var voice = null;
        var len = (voices || []).length;
        while (k < len && voice == null) {
            if (voices[k].lang.toLowerCase() == lang) {
                voice = voices[k];
            }
            k++;
        }
        return voice;
    };

    var VoicePlayer = function(elem) {
        var self = this;
        this._elem = elem;
        var idioma = elem.getAttribute("href").split("_")[1];
        elem.title = "Speak!";
        var voices = window.speechSynthesis.getVoices();
        var voice = findVoice(idioma, voices);
        this.handler = null;
        if (voice) { 
            var idioma = this._elem.getAttribute("href").split("_")[1];
            this.utterance = new SpeechSynthesisUtterance(elem.innerText);
            this.utterance.voice = voice;
            elem.classList.add("sd-speak-enabled");
            this.handler = function (evt) {
                evt.preventDefault(); // Evita que executi el link    
                self.play();
            }; 
            elem.addEventListener("click", this.handler);
        } else {
            //Get rid of the a link since browser does not support this feature
            elem.removeAttribute("href");
        }
    };
    VoicePlayer.prototype = {
        play: function() {
            // TODO call abort pending...
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(this.utterance); 
        },
        dispose: function() {
            this._elem.removeEventListener("click", this.handler);
            this._elem.classList.remove("sd-speak-enabled"); 
            this._elem.removeAttribute('data-active'); 
            this._elem.removeAttribute('title'); 
        }
    }

    var onVoicesLoaded = function (listElem) {
        for (var i = 0, len = listElem.length; i < len; i++) {
            var elem = listElem[i];
            if (elem.classList.contains("sd-speak-enabled")) {
                //already treated
                continue;
            }
            var instance = new VoicePlayer(elem);
            var id = elem.getAttribute("id")
            if(!id) {
                id = "sd_"+Math.random().toString(32).substring(2);
                elem.setAttribute("id", id);
            }
            window.IB.sd[COMPONENT_NAME].inst[id] = instance;
        }

        //Stop voices on page change
        window.addEventListener('unload', function(evt) {
            window.speechSynthesis.cancel();
        });
    };
 
    var alias = { author: "Josep Mulet", version: "1.0", inst: {} };
    window.IB.sd[COMPONENT_NAME] = alias;
    var bind = function () {
        //Comprovar si està suportada window.SpeechSynthesisUtterance, i l'idioma demanat, sinó elimina l'enllaç 
        var synth = window.speechSynthesis;
        var supported = synth != null && window.SpeechSynthesisUtterance != null;
        var allReadable = document.querySelectorAll('a[href^="#speak_"]');
        if (!supported) {
            //Get rid of links
            for (var i = 0, len = allReadable.length; i < len; i++) {
                allReadable[i].removeAttribute("href");
            }
            return;
        }

        if ((synth.getVoices() || []).length) {
               onVoicesLoaded(allReadable);
        } else {
            // wait until the voices have been loaded asyncronously
            synth.addEventListener("voiceschanged", function () {
                onVoicesLoaded(allReadable);
            });
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
