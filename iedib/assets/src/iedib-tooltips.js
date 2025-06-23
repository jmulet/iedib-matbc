require(["jquery", "theme_boost/tooltip"], function($){
    $(function(){
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    });
});