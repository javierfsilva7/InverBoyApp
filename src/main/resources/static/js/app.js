/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = (function () {

    var username;
    var sesionActual;
    var proyectoSeleccionado;
    var user;
    var sesiones = [];
    var torreSeleccionada;
    var inmueble;
    var apartamentoSel;
    var _fun = function (user) {
        username = {"nombre": user.nombre, "celular": user.celular, "correo": user.correo, "rol": user.rol};
    };
    var _fun2 = function (sesion) {
        sesionActual = {"id": sesion.id, "cliente": sesion.cliente, "asesor": sesion.asesor, "cotizaciones": sesion.cotizaciones, "estado": sesion.estado, "proyecto": sesion.proyecto, "inmuebleSeleccionado": sesion.inmuebleSeleccionado, "torreSeleccionada": sesion.torreSeleccionada};
    };
    var _fun3 = function (proyecto) {
        proyectoSeleccionado = {"nombre": proyecto.nombre, "direcion": proyecto.direccion, "tipo": proyecto.tipo, "logo": proyecto.logo, "torres": proyecto.torres, "pisos": proyecto.pisos, "imp": proyecto.imp};
    };
    var _fun4 = function (list) {

        for (var i = 0; i < list.length; i++) {
            sesiones[i] = {"id": list[i].id, "cliente": list[i].cliente, "asesor": list[i].asesor, "cotizaciones": list[i].cotizaciones, "estado": list[i].estado};
        }
    };
    var _fun5 = function (list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].numero == apartamentoSel) {
                inmueble = list[i];
            }
        }
    };
    return {
        inicio: function () {
            user = document.getElementById("username").value;
            controlador.getUsuarioByName(user, _fun);
            setTimeout(function () {
                if (username.rol === 'cliente') {
                    var sesion = {"id": 0, "cliente": {"nombre": username.nombre, "celular": username.celular, "correo": username.correo, "rol": username.rol}, "asesor": null, "cotizacion": {}, "estado": null};
                    $.ajax({
                        url: "/sesiones",
                        type: "POST",
                        data: JSON.stringify(sesion),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    });
                    controlador.getLastSesionByUser(user, _fun2);
                    $.get("proyecto.html", function (data) {
                        $("#contenedor").html(data);
                        document.getElementById("header").innerHTML = "<div class=\"col-md-4 encabezado\"><h1 id=\"nameuser\">Usuario: </><h1 id=\"titulo\">Proyecto </h1><img id=\"logo\"/><br></br><select id=\"proyectos\"class =\"select\" class= \"form-control\" onchange=\"app.selectProyect()\"></select><br></br><select id=\"torres\" class =\"select\" onchange=\"app.selectTorre()\"></select></div><div id=\"cotizador\" class=\"col-md-4\"></div> ";
                        document.getElementById("nameuser").innerHTML = username.nombre;

                        document.getElementById("cotizador").innerHTML = ("<div><p>Apartamento: </p><input id=\"apto\" disabled type=\"number\" class=\"form-control form-control-success\" ><p>Valor:</p><input id=\"valor\" type=\"number\" disabled >");
                        document.getElementById("cotizador").innerHTML += ("<p>Ingresos mensuales: </p><input id=\"ingresos\"onchange=\"app.updateCotizacion()\" type=\"number\">");
                        document.getElementById("cotizador").innerHTML += ("<p>Crédito aproximado: </p><input id=\"credito\" onchange=\"app.updateCotizacion()\" type=\"number\"><p>Subsidio: </p><input id=\"subsidio\"  onchange=\"app.updateCotizacion()\" type=\"number\">");
                        document.getElementById("cotizador").innerHTML += ("<p>Cesantias: </p><input  id=\"cesantias\" onchange=\"app.updateCotizacion()\" type=\"number\">");
                        document.getElementById("cotizador").innerHTML += ("<p>Ahorro programado: </p><input  id=\"ahorropr\" onchange=\"app.updateCotizacion()\" type=\"number\">");
                        document.getElementById("cotizador").innerHTML += ("<p>Recursos propios: </p><input id=\"recpropios\"  onchange=\"app.updateCotizacion()\" type=\"number\">");
                        document.getElementById("cotizador").innerHTML += ("<p>Numero de cuotas: </p><input type=\"number\" id=\"numcuotas\" onchange=\"app.updateCotizacion()\" ><p>Cuotas mensuales de: </p><input type=\"number\" id=\"cuotas\" onchange=\"app.updateCotizacion()\" ></div>");

                        apiproyecto.loadProyectos();
                        setTimeout(function () {
                            controlador.wsconnect(sesionActual.id);
                        }, 250);
                    });
                } else {
                    $.get("cotizador.html", function (data) {
                        $("#contenedor").html(data);
                        document.getElementById("container").innerHTML = "<div class=\"col-md-4\" id=\"tabla\"></div>";
                        document.getElementById("tabla").innerHTML = "<table class=\"table table-bordered\"><tbody></tbody></table>";
                        controlador.getAllSesiones(_fun4);
                        setTimeout(function () {
                            for (var i = 0; i < sesiones.length; i++) {
                                $("table tbody").append("<tr>");
                                $("table tbody").append("<td><button onclick=\"app.subscribe('" + sesiones[i].id + "')\">Suscribirse</button></td><td><h4>" + sesiones[i].cliente.nombre + "</h4></td><td><h4> Estado: " + sesiones[i].estado + "</h4></td>");
                                $("table tbody").append("</tr>");
                            }
                        }, 200);
                    });
                }
            }, 200);
        }, selectProyect: function () {
            document.getElementById("container").innerHTML = "<div class=\"col-md-2\" id=\"tabla\"></div>";
            var proyecto = document.getElementById("proyectos").value;
            controlador.getProyectoByName(proyecto, _fun3);
            setTimeout(function () {

                var sesion = {"id": sesionActual.id, "cliente": sesionActual.cliente, "asesor": sesionActual.asesor, "cotizacion": sesionActual.cotizacion, "proyecto": proyectoSeleccionado, "inmuebleSeleccionado": null, "torreSeleccionada": null};
                $.ajax({
                    url: "/sesiones",
                    type: "PUT",
                    data: JSON.stringify(sesion),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            }, 200);
        }, subscribe: function (sesion) {
            controlador.getSesionById(sesion, _fun2);
            document.getElementById("header").innerHTML = "<div class=\"col-md-4 encabezado\"><h1 id=\"nameuser\">Usuario: </><h1 id=\"titulo\">Proyecto </h1><img id=\"logo\"/><br></br><select id=\"proyectos\"class =\"select\" onchange=\"app.selectProyect()\"></select><br></br><select id=\"torres\" class =\"select\" onchange=\"app.selectTorre()\"></select></div><div id=\"cotizador\" class=\"col-md-4\"></div> ";
            document.getElementById("container").innerHTML = "<div class=\"col-md-2\" id=\"tabla\"></div>";

            document.getElementById("cotizador").innerHTML = ("<div><p>Apartamento: </p><input id=\"apto\" disabled type=\"number\" ><p>Valor:</p><input id=\"valor\" type=\"number\" disabled >");
            document.getElementById("cotizador").innerHTML += ("<p>Ingresos mensuales: </p><input id=\"ingresos\"onchange=\"app.updateCotizacion()\" type=\"number\">");
            document.getElementById("cotizador").innerHTML += ("<p>Crédito aproximado: </p><input id=\"credito\" onchange=\"app.updateCotizacion()\" type=\"number\"><p>Subsidio: </p><input id=\"subsidio\"  onchange=\"app.updateCotizacion()\" type=\"number\">");
            document.getElementById("cotizador").innerHTML += ("<p>Cesantias: </p><input  id=\"cesantias\" onchange=\"app.updateCotizacion()\" type=\"number\">");
            document.getElementById("cotizador").innerHTML += ("<p>Ahorro programado: </p><input  id=\"ahorropr\" onchange=\"app.updateCotizacion()\" type=\"number\">");
            document.getElementById("cotizador").innerHTML += ("<p>Recursos propios: </p><input id=\"recpropios\"  onchange=\"app.updateCotizacion()\" type=\"number\">");
            document.getElementById("cotizador").innerHTML += ("<p>Numero de cuotas: </p><input type=\"number\" id=\"numcuotas\" onchange=\"app.updateCotizacion()\" ><p>Cuotas mensuales de: </p><input type=\"number\" id=\"cuotas\" onchange=\"app.updateCotizacion()\" ></div>");

            apiproyecto.loadProyectos();
            setTimeout(function () {
                controlador.wsconnect(sesion);
            }, 250);
        },
        selectTorre: function () {

            torreSeleccionada = document.getElementById("torres").value;
            setTimeout(function () {

                var sesion = {"id": sesionActual.id, "cliente": sesionActual.cliente, "asesor": sesionActual.asesor, "cotizacion": sesionActual.cotizacion, "proyecto": proyectoSeleccionado, "inmuebleSeleccionado": null, "torreSeleccionada": torreSeleccionada};
                $.ajax({
                    url: "/sesiones",
                    type: "PUT",
                    data: JSON.stringify(sesion),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            }, 200);
        },
        loadinmueble: function (numero) {
            apartamentoSel = numero;
            controlador.getSesionById(sesionActual.id, _fun2);
            setTimeout(function () {

                controlador.getInmuebleByTorre(sesionActual.proyecto.nombre, sesionActual.torreSeleccionada, _fun5);
                setTimeout(function () {
                    var sesion = {"id": sesionActual.id, "cliente": sesionActual.cliente, "asesor": sesionActual.asesor, "cotizacion": sesionActual.cotizacion, "proyecto": proyectoSeleccionado, "inmuebleSeleccionado": inmueble, "torreSeleccionada": torreSeleccionada};
                    $.ajax({
                        url: "/sesiones",
                        type: "PUT",
                        data: JSON.stringify(sesion),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    });
                }, 200);
            }, 200);

        },
        updateCotizacion: function () {
            controlador.getSesionById(sesionActual.id, _fun2);
            setTimeout(function () {
                var ingresos = document.getElementById("ingresos").value;
                var credito = document.getElementById("credito").value;
                var subsidio = document.getElementById("subsidio").value;
                var cesantias = document.getElementById("cesantias").value;
                var ahorro = document.getElementById("ahorropr").value;
                var recpropios = document.getElementById("recpropios").value;
                var numcuotas = document.getElementById("numcuotas").value;
                var cuotas = document.getElementById("cuotas").value;
                var cotizacion = {"cliente": sesionActual.cliente, "inmueble": sesionActual.inmuebleSeleccionado, "asesor": sesionActual.asesor, "proyecto": sesionActual.proyecto.nombre, "ingresos": ingresos, "credito": credito, "subsidio": subsidio, "cesantias": cesantias, "ahorro": ahorro, "recpropios": recpropios, "numcuotas": numcuotas, "cuotas": cuotas};
                var sesion = {"id": sesionActual.id, "cliente": sesionActual.cliente, "asesor": sesionActual.asesor, "cotizacion": cotizacion, "proyecto": sesionActual.proyecto, "inmuebleSeleccionado": sesionActual.inmuebleSeleccionado, "torreSeleccionada": sesionActual.torreSeleccionada};
                $.ajax({
                    url: "/sesiones",
                    type: "PUT",
                    data: JSON.stringify(sesion),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            }, 200);
        }
    };
})();

