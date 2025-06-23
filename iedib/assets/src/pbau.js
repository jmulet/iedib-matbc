 

window.iedibAPI = window.iedibAPI || {};
window.iedibAPI.DEBUG = false;

window.iedibAPI.makeTabs = function(selector) {
	var tab_lists_anchors = document.querySelectorAll(selector + " > ul li a");
	var elems = document.querySelector(selector);
	if (!elems) {
		return;
	}
	var divs = document.querySelectorAll(selector + " > div");
	for (var i = 0; i < tab_lists_anchors.length; i++) {
		var anc = tab_lists_anchors[i];
		if (anc.classList.contains('active')) {
			divs[i].style.display = "block";
		}
		// Add title attr to corresponding div with its id
		var id = (anc.href.split("#")[1] || '').trim();
		var divElem = document.getElementById(id);
		if (divElem) {
			divElem.title = anc.innerText;
		}
	}            
	for (i = 0; i < tab_lists_anchors.length; i++) {
		window.iedibAPI.addBookEvent(tab_lists_anchors[i], 'click', function (e) {
			for (i = 0; i < divs.length; i++) {
				divs[i].style.display = "none";
			}            
			for (i = 0; i < tab_lists_anchors.length; i++) {
				tab_lists_anchors[i].classList.remove("active");
			}

			clicked_tab = e.target || e.srcElement;
			clicked_tab.classList.add('active');
			div_to_show = clicked_tab.getAttribute('href');            
			document.querySelector(div_to_show).style.display = "block";
		});
	}            
};