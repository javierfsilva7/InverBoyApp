/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = (function () {

    var username;
    var sesionActual;
    var sesionSel;
    var proyectoSeleccionado;
    var user;
    var sesiones = [];
    var torreSeleccionada;
    var inmuebles = [];
    var apartamentoSel;

    var _fun = function (user) {
        username = {"nombre": user.nombre, "celular": user.celular, "correo": user.correo, "rol": user.rol};
    };

    var _fun2 = function (sesion) {
        console.info(sesion);
        sesionActual = {"id": sesion.id, "cliente": sesion.cliente, "asesor": sesion.asesor, "cotizaciones": sesion.cotizaciones, "estado": sesion.estado};
        console.info(sesionActual.id + "FUN2");
    };

    var _fun3 = function (proyecto) {
        console.info(proyecto.nombre + "ESTE ES EL PROYECTO QUE LLEGA A FUN3");
        proyectoSeleccionado = {"nombre": proyecto.nombre, "direcion": proyecto.direccion, "tipo": proyecto.tipo, "logo": proyecto.logo, "torres": proyecto.torres, "pisos": proyecto.pisos, "imp": proyecto.imp};
    };

    var _fun4 = function (list) {
        console.info("entro");
        for (var i = 0; i < list.length; i++) {
            sesiones[i] = {"id": list[i].id, "cliente": list[i].cliente, "asesor": list[i].asesor, "cotizaciones": list[i].cotizaciones, "estado": list[i].estado};
        }

    }
    var _fun5 = function (list) {
        for (var i = 0; i < list.length; i++) {
            console.info(list[i]);
            inmuebles[i] = {"seccion": list[i].seccion, "numero": list[i].numero, "tipo": list[i].tipo, "precio": list[i].precio};
        }

    };

    return {
        inicio: function () {
            user = document.getElementById("username").value;
            controlador.getUsuarioByName(user, _fun);
            setTimeout(function () {
                if (username.rol === 'cliente') {
                    var sesion = {"id": 0, "cliente": {"nombre": username.nombre, "celular": username.celular, "correo": username.correo, "rol": username.rol}, "asesor": null, "cotizaciones": null, "estado": null};
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
                        document.getElementById("header").innerHTML = "<div class=\"col-md-4 encabezado\"><h1 id=\"nameuser\">Usuario: </><h1 id=\"titulo\">Proyecto </h1><img id=\"logo\"/><br></br><select id=\"proyectos\"class =\"select\" onchange=\"app.selectProyect()\"></select><br></br><select id=\"torres\" class =\"select\" onchange=\"app.loadTorre()\"></select></div><div id=\"cotizador\" class=\"col-md-4\"></div> ";
                        document.getElementById("container").innerHTML = "<div class=\"col-md-2\" id=\"tabla\"></div>";
                        document.getElementById("nameuser").innerHTML = username.nombre;
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
            var proyecto = document.getElementById("proyectos").value;
            controlador.getProyectoByName(proyecto, _fun3);
            setTimeout(function () {

                var sesion = {"id": sesionActual.id, "cliente": sesionActual.cliente, "asesor": sesionActual.asesor, "cotizaciones": sesionActual.cotizaciones, "proyecto": proyectoSeleccionado};
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
            document.getElementById("header").innerHTML = "<div class=\"col-md-4 encabezado\"><h1 id=\"nameuser\">Usuario: </><h1 id=\"titulo\">Proyecto </h1><img id=\"logo\"/><br></br><select id=\"proyectos\"class =\"select\" onchange=\"app.selectProyect()\"></select><br></br><select id=\"torres\" class =\"select\" onchange=\"app.loadTorre()\"></select></div><div id=\"cotizador\" class=\"col-md-4\"></div> ";
            document.getElementById("container").innerHTML = "<div class=\"col-md-2\" id=\"tabla\"></div>";
            apiproyecto.loadProyectos();
            setTimeout(function () {
                controlador.wsconnect(sesion);
            }, 250);
        }, loadTorre: function () {
            var markup = ("<table class=\"table table-bordered\"><tbody></tbody></table>");
            document.getElementById("tabla").innerHTML = markup;
            torreSeleccionada = document.getElementById("torres").value;
            controlador.getInmuebleByTorre(proyectoSeleccionado.nombre, document.getElementById("torres").value, _fun5);
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
        },loadinmueble: function (numero) {
            apartamentoSel = numero;
            document.getElementById("cotizador").innerHTML = ("<div class=\"col-md-5\"><h4>Apartamento:" + numero + "</h4><input type=\"text\"></input></div>");
        }
    };

})();

