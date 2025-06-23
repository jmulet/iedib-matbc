(function () {
    //@include intersector.css
    //supported?
    if(!window.IntersectionObserver) {
        console.log("dynamic/intersector:: IntersectionObserver not supported.");
        return;
    }
    var options = {
        root: null,
        threshold: 0.98
    };
    var observer = new IntersectionObserver(handleIntersection, options);
    var elems = document.querySelectorAll('[role="dynamic_intersector"]');
    for (var i = 0, len=elems.length; i < len; i++) {
        observer.observe(elems[i]);
    }
    function handleIntersection(entries) {
        for(var i=0, len=entries.length; i<len; i++) {
            var entry = entries[i];
            if (entry.isIntersecting) { 
                entry.target.classList.remove("pw-faded");
                entry.target.classList.add("pw-apareix");
                observer.unobserve(entry.target);
            } else { 
                entry.target.classList.add("pw-faded"); 
            }
        };
    };
}());