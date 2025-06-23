(function(){
var all = document.querySelectorAll('[role="abc"');
for(var i=0; i<all.length; i++) {
    all[i].innerHTML = "ABC";
    all[i].style.color = "red";
}
})();