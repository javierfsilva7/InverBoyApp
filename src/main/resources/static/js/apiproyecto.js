/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var apiproyecto = (function () {

    var proyectos = [];
    var proyectoSeleccionado;
    var inmuebles = [];
    var torreSeleccionada;
    var apartamentoSel;
    var sesionSel;

    var _fun = function (list) {
        for (var i = 0; i < list.length; i++) {
            proyectos[i] = {"nombre": list[i].nombre, "direccion": list[i].direccion, "tipo": list[i].tipo, "logo": list[i].logo, "torres": list[i].torres, "pisos": list[i].pisos};
        }

    };


    var _fun3 = function (list) {
        for (var i = 0; i < list.length; i++) {
            console.info(list[i]);
            inmuebles[i] = {"seccion": list[i].seccion, "numero": list[i].numero, "tipo": list[i].tipo, "precio": list[i].precio};
        }

    };

    return {
        loadTorre: function () {
            var markup = ("<table class=\"table table-bordered\"><tbody></tbody></table>");
            document.getElementById("tabla").innerHTML = markup;
            torreSeleccionada = document.getElementById("torres").value;
            controlador.getInmuebleByTorre(proyectoSeleccionado.nombre, document.getElementById("torres").value, _fun3);
            setTimeout(function () {
                var cont = 0;
                for (var i = 0; i < proyectoSeleccionado.pisos; i++) {
                    $("table tbody").append("<tr>");
                    for (var j = 0; j < 4; j++) {
                        console.info(inmuebles[j + cont].numero);
                        $("table tbody").append("<td><button onclick=\"apiproyecto.loadinmueble('" + inmuebles[j + cont].numero + "')\">" + inmuebles[j + cont].numero + "</button></td>");
                    }
                    cont += 4;
                    $("table tbody").append("</tr>");
                }
            }, 250);
        }, loadinmueble: function (numero) {
            apartamentoSel = numero;
            document.getElementById("cotizador").innerHTML = ("<div class=\"col-md-5\"><h4>Apartamento:" + numero + "</h4><input type=\"text\"></input></div>");
        },  loadProyectos: function () {
            controlador.getAllProyectos(_fun);
            setTimeout(function () {
                console.info(proyectos);
                for (var i = 0; i < proyectos.length; i++) {
                    document.getElementById("proyectos").innerHTML += "<option value='" + proyectos[i].nombre + "'>Proyecto " + proyectos[i].nombre + "</option>";
                }
            }, 250);
        }
    };
})();

