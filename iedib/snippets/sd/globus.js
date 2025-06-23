

(function () {
/**
* @fileOverview
* @author Zoltan Toth
* @version 0.1
*/

    /**
    * @description
    * Vanilla Javascript tooltip.
    *
    * @class
    * @param {string} [options.theme=dark] - Selects one of the pre-defined tooltip styles - light or dark.
    * @param {number} [options.dist=10] - Specifies the distance in pixels from trigger to tooltip.
    * @param {number} [options.delay=0] - Specifies how long the tooltip remains visible after the mouse leaves the trigger.
    */

    var Tooltip = function (options) {
        var theme = options.theme || "dark",
            delay = options.delay || 0,
            dist = options.distance || 10;

        /* 
        * Attaching one mouseover and one mouseout listener to the document
        * instead of listeners for each trigger 
        */
        document.body.addEventListener("mouseover", function (e) {
            if (e.target.getAttribute('role')!='globus') return;

            var tooltip = document.createElement("div");
            tooltip.className = "b-tooltip " + "b-tooltip-" + theme;
            tooltip.innerHTML = e.target.getAttribute('data-original-title');

            document.body.appendChild(tooltip);

            var pos = e.target.getAttribute('data-position') || "center top",
                posHorizontal = pos.split(" ")[0];
            posVertical = pos.split(" ")[1];

            positionAt(e.target, tooltip, posHorizontal, posVertical);
        });

        document.body.addEventListener("mouseout", function (e) {
            if (e.target.getAttribute('role')=='globus') {
                setTimeout(function () {
                    document.body.removeChild(document.querySelector(".b-tooltip"));
                }, delay);
            }
        });

        /**
         * Positions the tooltip.
         * 
         * @param {object} parent - The trigger of the tooltip.
         * @param {object} tooltip - The tooltip itself.
         * @param {string} posHorizontal - Desired horizontal position of the tooltip relatively to the trigger (left/center/right)
         * @param {string} posVertical - Desired vertical position of the tooltip relatively to the trigger (top/center/bottom)
         * 
         */
        function positionAt(parent, tooltip, posHorizontal, posVertical) {
            var parentCoords = parent.getBoundingClientRect(), left, top;

            console.log(posVertical)

            switch (posHorizontal) {
                case "left":
                    left = parseInt(parentCoords.left) - dist - tooltip.offsetWidth;
                    if (parseInt(parentCoords.left) - tooltip.offsetWidth < 0) {
                        left = dist;
                    }
                    break;

                case "right":
                    left = parentCoords.right + dist;
                    if (parseInt(parentCoords.right) + tooltip.offsetWidth > document.documentElement.clientWidth) {
                        left = document.documentElement.clientWidth - tooltip.offsetWidth - dist;
                    }
                    break;

                default:
                case "center":
                    left = parseInt(parentCoords.left) + ((parent.offsetWidth - tooltip.offsetWidth) / 2);
            }

            switch (posVertical) {
                case "center":
                    top = (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 - tooltip.offsetHeight / 2;
                    break;

                case "bottom":
                    top = parseInt(parentCoords.bottom) + dist;
                    break;

                default:
                case "top":
                    top = parseInt(parentCoords.top) - tooltip.offsetHeight - dist;
            }

            left = (left < 0) ? parseInt(parentCoords.left) : left;
            top = (top < 0) ? parseInt(parentCoords.bottom) + dist : top;

            tooltip.style.left = left + "px";
            tooltip.style.top = top + pageYOffset + "px";
        }
    };


    var COMPONENT_NAME = "globus";
    if (window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: " + COMPONENT_NAME + " loaded twice.");
        window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
    }

    // Crea la classe per cada component a partir del contenidor
    var Snippet = function (contenidor) {
        contenidor.addEventListener("click", function(evt){
            evt.preventDefault();
        });
        var ds = contenidor.dataset;
        var flavor = ds.dataset;
        // Delega la responsabilitat al component tooltip
        ds.originalTitle=contenidor.getAttribute("title");
        contenidor.removeAttribute("title");
        this.tooltip = new Tooltip({theme: 'light', delay: 10});
    }
    Snippet.prototype.dispose = function () {

    };


    var alias = { author: "Josep Mulet Pol", version: "1.0", inst: {} };
    window.IB.sd[COMPONENT_NAME] = alias;

    var bind = function () {
        // Cerca tots els contenidors dels components d'aquest tipus
        var componentContainers = document.querySelectorAll('[role="' + COMPONENT_NAME + '"]');
        // Crea una instància de la classe anterior per a cadascun dels components trobats en la pàgina
        for (var i = 0, len = componentContainers.length; i < len; i++) {
            var container = componentContainers[i];
            // Evita que un contenidor pugui ésser tractat més d'una vegada degut a múltiples insercions de la llibreria
            if (container.dataset.active) {
                continue;
            }
            container.dataset.active = "1";

            var instancia = new Snippet(container);
            // Exposa l'objecte a window per si es volgués emprar la seva API
            // Aquesta seria la forma d'utilitzar comunicació entre components (si fos necessari)
            // s'assegura que el contenidor del component té id, sinó l'assigna
            var id = container.getAttribute("id");
            if (!id) {
                id = "dynamic_" + Math.random().toString(32).substring(2);
                container.id = id;
            }
            window.IB.sd[COMPONENT_NAME].inst[id] = instancia;
        }
    };
    alias.bind = bind;
    alias.unbind = function () {
        var lInst = Object.values(alias.inst);
        for (var i = 0, l = lInst.length; i < l; i++) {
            lInst[i].dispose();
        }
        alias.inst = {};
    };

    bind();
})(); 