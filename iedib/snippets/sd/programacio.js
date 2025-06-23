(function(){
    // LOOK_AND_FEEL pot ésser default, github o xcode
    var LOOK_AND_FEEL = 'xcode';

    var createLinkSheet = function(href, id) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        if(id) {
            link.id = id;
        }
        document.getElementsByTagName('head')[0].appendChild(link);
    };

    var createScript = function(src, id, cb) {
        var scriptElem = document.createElement('script'); 
        scriptElem.src = src;
        if(id) {
            scriptElem.id = id;
        }
        if(cb) {
            scriptElem.onload = function() {
                cb();
            };
        }
        document.getElementsByTagName('head')[0].appendChild(scriptElem);
       
    };
    
    var _loadHighlight = function() {
        var cb1 = function() {
            console.log("Load done");
            _doHighlight();
        };
        console.log("loading....");
        createScript("https://iedib.net/assets/js/highlight.min.js", "highlight.min.js", cb1)
        //createScript("https://iedib.net/assets/js/highlightjs-line-numbers.min.js", "highlightjs-line-numbers.min.js", cb2);
    };

    var _doHighlight = function() {
        hljs.initHighlightingOnLoad();
        hljs.initLineNumbersOnLoad && hljs.initLineNumbersOnLoad();
        window.document.dispatchEvent(new Event("DOMContentLoaded", {
            bubbles: true,
            cancelable: true
        }));
    };

    if(!document.querySelector("#hljs_styles")) {
        console.log("Loading css...");
        createLinkSheet("https://iedib.net/assets/css/"+LOOK_AND_FEEL+".min.css", "hljs_styles");
    } 
    //Check if the page contains hljs
    if(window.hljs) {
        _doHighlight();
    } else {
        _loadHighlight();
    }  
})();