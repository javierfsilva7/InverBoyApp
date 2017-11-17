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
        document.getElementById("header").innerHTML = "<div class=\"col-md-4 encabezado\"><h1 id=titulo>Proyecto </h1><img id=\"logo\"/><br></br><select id=\"proyectos\"class =\"select\" onchange=\"apiproyecto.selectProyect()\"></select><br></br><select id=\"torres\" class =\"select\" onchange=\"apiproyecto.loadTorre()\"></select></div><div id=\"cotizador\" class=\"col-md-4\"></div> ";
        document.getElementById("container").innerHTML = "<div class=\"col-md-2\" id=\"tabla\"></div>";

        controlador.getAllProyectos(_fun);
        setTimeout(function () {
            for (var i = 0; i < proyectos.length; i++) {
                document.getElementById("proyectos").innerHTML += "<option value='" + proyectos[i].nombre + "'>Proyecto " + proyectos[i].nombre + "</option>";
            }
        }, 200);
    });

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
        }, selectProyect: function () {
            var proyecto = document.getElementById("proyectos").value;
            //controlador.getLastCotizacionByUser(user, _fun4);
            //setTimeout(function () {
              //  apiproyecto.wsconnect();
            //}, 1000);
            controlador.getProyectoByName(proyecto, _fun2);
            setTimeout(function () {
                document.getElementById("titulo").innerHTML = proyectoSeleccionado.nombre;
                document.getElementById("torres").innerHTML = "";
                document.getElementById("tabla").innerHTML = "";
                for (var i = 1; i <= proyectoSeleccionado.torres; i++) {
                    document.getElementById("logo").src=proyectoSeleccionado.logo;
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

