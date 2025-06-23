

(function () {
    var COMPONENT_NAME = "presentacio";
    if (window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: " + COMPONENT_NAME + " loaded twice.");
        window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
    }

    // Crea la classe per cada component a partir del contenidor
    var Snippet = function (contenidor) {
        var self = this;
        this.contenidor = contenidor;

        var TipusContingut = "<b>Exemple </b>";
        var NumTotalItems = 6;
        var Durada = [];
        var Evolucio = "Temporitzada";    // Manual / Temporitzada



        //TODO S'ha de parsejar a integer parseInt(str)
        var Durada = [contenidor.dataset.transition];
        var tabs = contenidor.querySelector('ul.nav.nav-tabs');
        tabs.style.display = 'none';
        var diapositives = contenidor.querySelectorAll("div.tab-content > div.tab-pane");


        var num = diapositives.length;
        //diapositives[0].classList.remove("active");
        //diapositives[num-1].classList.add("active");


        var eliminarActive_Seguent = function () {
            var k = -1;
            for (var i = 0; i < num; i++) {
                if (diapositives[i].classList.contains("active")) {
                    k = i + 1;
                }
                diapositives[i].classList.remove("active");
            }
            if (k == num) {
                k = num - 1;
            }
            diapositives[k].classList.add("active");

            document.querySelector('.Comptador').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;  (Element " + (k + 1) + " de " + num + ")";

        };



        var eliminarActive_Anterior = function () {
            var k = -1;
            for (var i = 0; i < num; i++) {
                if (diapositives[i].classList.contains("active")) {
                    k = (i - 1) % num;
                }
                diapositives[i].classList.remove("active");
            }
            if (k < 0) {
                k = 0;
            }
            diapositives[k].classList.add("active");

            document.querySelector('.Comptador').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;  (Element " + (k + 1) + " de " + num + ")";
        };


        var eliminarActive_Primer = function () {
            var k = -1;
            for (var i = 0; i < num; i++) {
                diapositives[i].classList.remove("active");
            }

            k = 0;

            diapositives[k].classList.add("active");

            document.querySelector('.Comptador').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;  (Element " + (k + 1) + " de " + num + ")";
        };


        var eliminarActive_Darrer = function () {
            var k = -1;
            for (var i = 0; i < num; i++) {
                diapositives[i].classList.remove("active");
            }

            k = num - 1;

            diapositives[k].classList.add("active");

            document.querySelector('.Comptador').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;  (Element " + (k + 1) + " de " + num + ")";
        };



        contenidor.querySelector(".btn-step-forward").addEventListener("click", function (evt) {

            eliminarActive_Seguent();

        });

        contenidor.querySelector(".btn-step-backward").addEventListener("click", function (evt) {

            eliminarActive_Anterior();

        });

        contenidor.querySelector(".btn-first").addEventListener("click", function (evt) {

            eliminarActive_Primer();

        });

        contenidor.querySelector(".btn-last").addEventListener("click", function (evt) {

            eliminarActive_Darrer();

        });




        Durada[1] = 4;
        Durada[2] = 2;
        Durada[3] = 4;
        Durada[4] = 3;
        Durada[5] = 5;
        Durada[6] = 2;


        var boxContingut = document
            .querySelector('.box_continguts');

        var i = 0;
        var continua = "si";


        if (Evolucio == "Manual") {

            /*
            document.getElementById("b_anterior").style.display = "inline";
              document.getElementById("b_seguent").style.display = "inline";
              document.getElementById("b_pausa").style.display = "none";
              document.getElementById("b_play").style.display = "none";
          }
          else {
              document.getElementById("b_anterior").style.display = "none";
              document.getElementById("b_seguent").style.display = "none";
              document.getElementById("b_pausa").style.display = "inline";
              document.getElementById("b_play").style.display = "inline";     
              
              */
        }





        function pausa() {
            continua = "no";
            return setContingut();
        }

        function mostra() {

            if (i == 0) { i = 1; }

            continua = "si";
            return setContingut();
        }


        function setContingut() {


            boxContingut.innerHTML = TipusContingut + "<b>" + i + "</b><br><br>" + Contingut[i] + "<br><br>";

            if (Evolucio == "Temporitzada" && continua == "si" && i < NumTotalItems) {
                setTimeout(seguent, Durada[i] * 1000);
            }

        }











    };
    Snippet.prototype.dispose = function () {

    };


    var alias = { author: "Tomeu Fiol Coll", version: "1.0", inst: {} };
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