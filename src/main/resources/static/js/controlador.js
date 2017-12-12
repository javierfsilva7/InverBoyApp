/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


controlador = (function () {
    var stompClient = null;
    var inmuebles = [];
    var torreSeleccionada;

    var _fun5 = function (proyecto) {
        var list = proyecto.inmuebles;
        for (var i = 0; i < list.length; i++) {
            if (list[i].seccion == torreSeleccionada.toString()) {
                inmuebles[inmuebles.length] = {"_id": list[i]._id, "seccion": list[i].seccion, "numero": list[i].numero, "tipo": list[i].tipo, "valor": list[i].valor, "estado": list[i].estado};
            }
        }

    };

    return {
        getAllProyectos: function (callback) {
            var x;
            $.get("/proyectos", function (data) {
                x = data;
            }).done(function () {
                callback(x);
            });
        },
        getProyectoByName: function (name, callback) {
            var x;
            $.get("/proyectos/" + name, function (data) {
                x = data;
            }).done(function () {
                callback(x);
            });
        },
        getUsuarioByName: function (user, callback) {
            var x;
            $.get("/usuarios/" + user, function (data) {
                x = data;
            }).done(function () {
                callback(x);
            });
        },
        getAllCotizaciones: function (callback) {
            var x;
            $.get("/cotizaciones", function (data) {
                x = data;
            }).done(function () {
                callback(x);
            });
        },
        getAllSesiones: function (callback) {
            var x;
            $.get("/sesiones", function (data) {
                x = data;
            }).done(function () {
                callback(x);
            });
        },
        getLastCotizacionByUser: function (user, callback) {
            var x;
            $.get("/cotizaciones/usuario/" + user, function (data) {
                x = data;
            }).done(function () {
                callback(x);
            });
        },
        getLastSesionByUser: function (user, callback) {
            var x;
            $.get("/sesiones/usuario/" + user, function (data) {
                x = data;
            }).done(function () {
                callback(x);
            });

        },
        getSesionById: function (sesion, callback) {
            var x;
            $.get("/sesiones/" + sesion, function (data) {
                x = data;
            }).done(function () {
                callback(x);
            });
        },
        wsconnect: function (sesion) {

            var socket = new SockJS('/stompendpoint');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);

                //subscriptions

                stompClient.subscribe("/topic/sesion." + sesion.toString(), function (event) {
                    var evento = JSON.parse(event.body);
                    document.getElementById("titulo").innerHTML = evento.proyecto._id;
                    document.getElementById("torres").innerHTML = "";
                    document.getElementById("tabla").innerHTML = ("<table class=\"table table-hover\"><tbody></tbody></table>");
                    document.getElementById("nameuser").innerHTML = evento.cliente.nombre;
                    document.getElementById("logo").src = evento.proyecto.logo;
                    document.getElementById("torres").innerHTML += "<option selected>Seleccione una torre</option>";
                    for (var i = 1; i <= evento.proyecto.torres; i++) {
                        document.getElementById("torres").innerHTML += "<option value='" + i + "'>Torre " + i + "</option>";
                    }

                    if (evento.torreSeleccionada !== null) {
                        $("table tbody").val("<table class=\"table table-hover\"><tbody></tbody></table>");
                        torreSeleccionada = evento.torreSeleccionada;
                        controlador.getProyectoByName(evento.proyecto._id, _fun5);
                        setTimeout(function () {
                            var cont = 0;
                            for (var i = 0; i < evento.proyecto.pisos; i++) {
                                $("table tbody").append("<tr>");
                                for (var j = 0; j < 4; j++) {
                                    console.info(inmuebles[j + cont].estado);
                                    if (inmuebles[j + cont].estado == "reservado") {
                                        $("table tbody").append("<td><button disabled=\"true\" class=\"btn btn-danger btn-lg btn-block\" onclick=\"app.loadinmueble('" + inmuebles[j + cont].numero + "')\">" + inmuebles[j + cont].numero + "</button></td>");
                                    } else {
                                        $("table tbody").append("<td><button class=\"btn btn-success btn-lg btn-block\" onclick=\"app.loadinmueble('" + inmuebles[j + cont].numero + "')\">" + inmuebles[j + cont].numero + "</button></td>");
                                    }
                                }
                                cont += 4;
                                $("table tbody").append("</tr>");
                            }
                        }, 250);
                        if (evento.inmuebleSeleccionado !== null) {
                            document.getElementById("apto").value = evento.inmuebleSeleccionado.numero;
                            document.getElementById("valor").value = evento.inmuebleSeleccionado.valor;
                            document.getElementById("ingresos").value = evento.cotizacion.ingresos;
                            document.getElementById("credito").value = evento.cotizacion.credito;
                            document.getElementById("subsidio").value = evento.cotizacion.subsidio;
                            document.getElementById("cesantias").value = evento.cotizacion.cesantias;
                            document.getElementById("ahorropr").value = evento.cotizacion.ahorro;
                            document.getElementById("recpropios").value = evento.cotizacion.recpropios;
                            document.getElementById("numcuotas").value = evento.cotizacion.numcuotas;
                            document.getElementById("cuotas").value = evento.cotizacion.cuotas;
                        }
                    }
                });

            });
        }

    };
})();

