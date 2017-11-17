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
    var usuario;
    var cotizacionSel;
    var stompClient = null;

    var _fun = function (list) {
        console.info("entro");
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

    var _fun4 = function (cotizacion) {
        console.info(cotizacion.id);
        cotizacionSel = cotizacion.id;
    };

    $(function () {
        controlador.getAllProyectos(_fun);
        setTimeout(function () {
            for (var i = 0; i < proyectos.length; i++) {
                var name = proyectos[i].nombre;
                var markup = "<div class=\"col-md-4\"><h3 style=\"margin-left:15%\">" + name + "</h3><img src=\"" + proyectos[i].logo + "\"/><br></br><button style=\"margin-left: 22%\" class=\"btn btn-info\" onclick=\"apiproyecto.selectProyect('" + name + "','" + usuario + "');\">Cotizar</button>";
                document.getElementById("container").innerHTML += markup;
            }
        }, 200);
    });

    return {
        getProyectos: function (user) {
            console.info(user);
            usuario = user;
        },
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
        }, selectProyect: function (name, user) {
            console.info(user);
            controlador.getLastCotizacionByUser(user, _fun4);
            setTimeout(function () {
                apiproyecto.wsconnect();
            }, 1000);
            controlador.getProyectoByName(name, _fun2);
            setTimeout(function () {
                document.getElementById("header").innerHTML = "<div class=\"col-md-4 encabezado\"><h1>" + proyectoSeleccionado.nombre + "</h1>" + "<br></br><select id=\"torres\" class =\"select\" onchange=\"apiproyecto.loadTorre()\"></select></div><div id=\"cotizador\" class=\"col-md-4\"></div> ";
                document.getElementById("container").innerHTML = "<div class=\"col-md-2\" id=\"tabla\"></div>";
                for (var i = 1; i <= proyectoSeleccionado.torres; i++) {
                    document.getElementById("torres").innerHTML += "<option value='" + i + "'>Torre " + i + "</option>";
                }
            }, 150);
        }, wsconnect: function () {

            var socket = new SockJS('/stompendpoint');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);

                //subscriptions

                stompClient.subscribe("/topic/cotizacion." + cotizacionSel.toString(), function (event) {
                    console.info(event);
                });

            });
        }
    };
})();

