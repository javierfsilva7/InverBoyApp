/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


controlador = (function () {
    var stompClient = null;

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
        getInmueblesByProyecto: function (name, callback) {
            var x;
            $.get("/proyectos/" + name + "/inmuebles", function (data) {
                x = data;
            }).done(function () {
                callback(x);
            });
        },
        getInmuebleByTorre: function (name, torre, callback) {
            var x;
            $.get("/proyectos/" + name + "/inmuebles/" + torre, function (data) {
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
            console.info("Entro last");
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
                    console.info(evento);
                    document.getElementById("titulo").innerHTML = evento.proyecto.nombre;
                    document.getElementById("torres").innerHTML = "";
                    document.getElementById("tabla").innerHTML = "";
                    document.getElementById("nameuser").innerHTML = evento.cliente.nombre;
                    document.getElementById("logo").src = evento.proyecto.logo;
                    for (var i = 1; i <= evento.proyecto.torres; i++) {
                        document.getElementById("torres").innerHTML += "<option value='" + i + "'>Torre " + i + "</option>";
                    }
                });

            });
        }

    };
})();

