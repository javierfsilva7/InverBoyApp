/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = (function () {

    var proyectos = [];
    var proyectoSeleccionado;
    var inmuebles = [];
    var torreSeleccionada;
    var apartamentoSel;
    var inm;
    var username;

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
            console.info(list[i]);
            inmuebles[i] = {"seccion": list[i].seccion, "numero": list[i].numero, "tipo": list[i].tipo, "precio": list[i].precio};
        }

    };
    var _fun4 = function (user) {
        username = {"nombre": user.nombre, "celular": user.celular, "correo": user.correo, "rol": user.rol};
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
            torreSeleccionada = document.getElementById("torres").value;
            apiclient.getInmuebleByTorre(proyectoSeleccionado.nombre, document.getElementById("torres").value, _fun3);
            setTimeout(function () {
                var cont = 0;
                for (var i = 0; i < proyectoSeleccionado.pisos; i++) {
                    $("table tbody").append("<tr>");
                    for (var j = 0; j < 4; j++) {
                        console.info(inmuebles[j + cont].numero);
                        $("table tbody").append("<td><button onclick=\"app.loadinmueble('" + inmuebles[j + cont].numero + "')\">" + inmuebles[j + cont].numero + "</button></td>");
                    }
                    cont += 4;
                    $("table tbody").append("</tr>");
                }
            }, 250);
        }, loadinmueble: function (numero) {
            apartamentoSel = numero;
            document.getElementById("cotizador").innerHTML = ("<div class=\"col-md-5\"><h4>Apartamento:" + numero + "</h4><input type=\"text\"></input></div>");
        },
        inicio: function () {
            var user = document.getElementById("username").value;
            console.info(user);
            apiclient.getUsuarioByName(user, _fun4);
            window.location.href = "/proyecto.html";
            
        },
        selectProyect: function (name) {
            apiclient.getProyectoByName(name, _fun2);
            setTimeout(function () {
                document.getElementById("header").innerHTML = "<div class=\"col-md-4 encabezado\"><h1>" + proyectoSeleccionado.nombre + "</h1>" + "<br></br><select id=\"torres\" class =\"select\" onchange=\"app.loadTorre()\"></select></div><div id=\"cotizador\" class=\"col-md-4\"></div> ";
                document.getElementById("container").innerHTML = "<div class=\"col-md-2\" id=\"tabla\"></div>";
                for (var i = 1; i <= proyectoSeleccionado.torres; i++) {
                    document.getElementById("torres").innerHTML += "<option value='" + i + "'>Torre " + i + "</option>";
                }
            }, 200);
            var cotizacion = {usuario: username};
            console.info(cotizacion);
            jQuery.ajax({
                url: "/cotizaciones",
                type: "POST",
                data: JSON.stringify(cotizacion),
                dataType: "json",
                contentType: "application/json; charset=utf-8"

            });

        }
    };

})();

