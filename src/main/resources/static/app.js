/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = (function () {

    var proyectos = [];
    var proyectoSeleccionado;
    var inmuebles = [];

    var _fun = function (list) {
        for (var i = 0; i < list.length; i++) {
            proyectos[i] = {"nombre": list[i].nombre, "direcion": list[i].direccion, "tipo": list[i].tipo, "logo": list[i].logo};
        }

    };
    var _fun2 = function (proyecto) {
        proyectoSeleccionado = {"nombre": proyecto.nombre, "direcion": proyecto.direccion, "tipo": proyecto.tipo, "logo": proyecto.logo, "torres": proyecto.torres, "pisos": proyecto.pisos, "imp": proyecto.imp};
    };

    var _fun3 = function (list) {
        for (var i = 0; i < list.length; i++) {
            inmuebles[i] = {"seccion": list[i].seccion, "numero": list[i].numero, "tipo": list[i].tipo};
        }

    };

    return {
        getProyectos: function () {
            apiclient.getProyectos(_fun);
            setTimeout(function () {
                for (var i = 0; i < proyectos.length; i++) {
                    var name = proyectos[i].nombre;
                    var markup = "<div class=\"col-md-4\"><h3 style=\"margin-left:15%\">" + name + "</h3><img src=\"" + proyectos[i].logo + "\"/><br></br><button style=\"margin-left: 22%\" class=\"btn btn-info\" onclick=\"app.selectProyect('" + name + "');\">Cotizar</button>";
                    document.getElementById("container").innerHTML += markup;
                }
            }, 150);

        },
        loadTorre: function () {
            var markup = ("<table class=\"table table-bordered\"><tbody></tbody></table>");
            document.getElementById("tabla").innerHTML = markup;
            apiclient.getInmuebleByTorre(proyectoSeleccionado.nombre, document.getElementById("torres").value, _fun3);
            setTimeout(function () {
                var cont=0;
                for (var i = 0; i < proyectoSeleccionado.pisos; i++) {
                    $("table tbody").append("<tr>");
                    for (var j = 0; j < 4; j++) {
                        console.info(inmuebles[j+cont].numero);
                        $("table tbody").append("<td>" + inmuebles[j+cont].numero + "</td>");
                    }
                    cont+=4;
                    $("table tbody").append("</tr>");
                }
            }, 250);
        },
        inicio: function () {
            window.location.href = "/proyecto.html";
        },
        selectProyect: function (name) {
            apiclient.getProyectoByName(name, _fun2);
            setTimeout(function () {
                document.getElementById("container").innerHTML = "<h3>" + proyectoSeleccionado.nombre + "</h3>" + "<br></br><select id=\"torres\" onchange=\"app.loadTorre()\"></select><img src=\"" + proyectoSeleccionado.imp + "\"/><div id=\"tabla\"></div>";
                for (var i = 1; i <= proyectoSeleccionado.torres; i++) {
                    document.getElementById("torres").innerHTML += "<option value='" + i + "'>Torre " + i + "</option>";
                }
            }, 200);

        }
    };

})();

