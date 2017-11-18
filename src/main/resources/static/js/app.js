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
                    console.info(sesionActual + "MIERDA");


                    $.get("proyecto.html", function (data) {
                        $("#contenedor").html(data);
                        document.getElementById("header").innerHTML = "<div class=\"col-md-4 encabezado\"><h1 id=\"nameuser\">Usuario: </><h1 id=\"titulo\">Proyecto </h1><img id=\"logo\"/><br></br><select id=\"proyectos\"class =\"select\" onchange=\"app.selectProyect()\"></select><br></br><select id=\"torres\" class =\"select\" onchange=\"apiproyecto.loadTorre()\"></select></div><div id=\"cotizador\" class=\"col-md-4\"></div> ";
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
                        apicotizador.load();
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
        }
    };

})();

