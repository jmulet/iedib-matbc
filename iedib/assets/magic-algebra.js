
    (function() {

        var textos = [{
                'ca-ES': 'Pensa un nombre natural qualsevol',
                'es-ES': 'Piensa un número natural cualquiera'
            },
            {
                'ca-ES': 'Suma-li 2',
                'es-ES': 'Sumale 2'
            },
            {
                'ca-ES': 'Al resultat, el multipliques per 3',
                'es-ES': 'Al resultado, lo multiplicas por 3'
            },
            {
                'ca-ES': 'Resta 5',
                'es-ES': 'Restale 5'
            },
            {
                'ca-ES': 'Resta el nombre que havies pensat',
                'es-ES': 'Resta el número que havias pensado al principio'
            },
            {
                'ca-ES': 'Multiplica per 2 el resultat anterior',
                'es-ES': 'Multiplica por dos el resultado anterior'
            },
            {
                'ca-ES': 'Resta 1',
                'es-ES': 'Resta uno'
            },
        ];


        var escoltaNombre = function() {
            if (!IB.supported2) {
                return;
            }
            IB.speechRecognition(function(txt, s) {
                if (txt != null && s > 0.5) {
                    document.querySelector("#magic_res").value = txt;
                    //TODO check if is an integer
                    //Trigger fet!
                    funcReveal();
                }
            }, 'ca-ES');
        };
        if (IB.supported2) {
            document.querySelector('#magic_micro').addEventListener('click', function(evt) {
                escoltaNombre();
            });
        } else {
            document.querySelector('#magic_micro').style.display = 'none';
        }

        var $magic_interact_panel = document.querySelector("#magic_interact_panel");
        var steps = document.querySelectorAll("#magic_steps li");
        var nsteps = steps.length;
        IB.reader(textos[0]);
        for (var i = 0; i < nsteps; i++) {
            var el = steps[i];
            el.dataset.index = i + "";
            if (i > 0) {
                el.style.opacity = 0;
            }
            if (i < nsteps) {
                var btn = document.createElement("button");
                btn.style["margin-left"] = "10px";
                btn.innerHTML = "→";
                btn.classList.add("btn");
                btn.classList.add("btn-secondary");
                btn.addEventListener("click", function(evt) {


                    var currentP = evt.currentTarget.parentElement;
                    var currentBtn = evt.currentTarget;
                    var pos = parseInt(currentP.dataset.index);
                    //remove this button and link to the next one
                    currentBtn.style.opacity = 0;
                    var nextPos = pos + 1;
                    if (pos == nsteps - 1) {
                        // show input
                        var mip = $magic_interact_panel;
                        mip.style.opacity = 1;
                        escoltaNombre();
                    } else {
                        var nextP = document.querySelector('#magic_steps  li[data-index="' + nextPos + '"]');
                        nextP.style.opacity = 1;
                        IB.reader(textos[nextPos]);
                    }
                });
                el.append(btn);
            }
        }; // end loop steps

        function funcReveal() {
            var valor = parseInt(document.querySelector("#magic_res").value);
            document.querySelector("#magic_predict_panel").style.opacity = 1;
            var predict = (valor - 1) / 4.0;
            if (predict != Math.floor(predict)) {
                document.querySelector("#magic_predict").innerHTML = "No puc saber el teu nombre. Per favor, repeteix el joc i fes les operacions que et demano correctament.";
                document.querySelector("#magic_predict").style.color = "#FFBBBB";
            } else {
                document.querySelector("#magic_predict").innerHTML = "El nombre que havies pensat és el " + predict.toFixed(0);
                document.querySelector("#magic_predict").style.color = "lightyellow";
                document.querySelector("#magic_reveal").style.opacity = 1;
            }
        }

        document.querySelector("#magic_done").addEventListener("click", function(evt) {
            funcReveal();
        });

        document.querySelector("#magic_repeat").addEventListener("click", function(evt) {

            $magic_interact_panel.style.opacity = 0;
            document.querySelector("#magic_predict").innerHTML = "";
            document.querySelector("#magic_res").value = 0;
            document.querySelector("#magic_predict_panel").style.opacity = 0;
            document.querySelector("#magic_reveal").style.opacity = 0;
            for (var i = 0; i < nsteps; i++) {
                var el = steps[i];
                el.querySelector("button").style.opacity = 1;
                if (i > 0) {
                    el.style.opacity = 0;
                } else {
                    el.style.opacity = 1;
                }
            }
        });

    })();

