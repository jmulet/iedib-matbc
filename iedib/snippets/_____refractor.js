window.refractor_snippets_js = function(attoId) {
    //Reciving the atto id
    console.log("Recieved the attoId ", attoId);
    var atto = document.getElementById(attoId);
    if(!atto) {
        return;
    }
    atto.dispatchEvent(new CustomEvent('growl', {detail: {type: 'success', msg: 'Hola des de refractor'}}));
    
}