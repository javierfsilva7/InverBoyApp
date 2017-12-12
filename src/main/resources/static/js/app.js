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
    var conversacionSeleccionada;
    var mensajeenviado;

    var _fun = function (user) {
        username = {"_id": user._id, "nombre": user.nombre, "correo": user.correo, "rol": user.rol};
    };
    var _fun2 = function (sesion) {
        sesionActual = {"id": sesion.id, "cliente": sesion.cliente, "asesor": sesion.asesor, "cotizaciones": sesion.cotizaciones, "estado": sesion.estado, "proyecto": sesion.proyecto, "inmuebleSeleccionado": sesion.inmuebleSeleccionado, "torreSeleccionada": sesion.torreSeleccionada};
    };
    var _fun3 = function (proyecto) {
        proyectoSeleccionado = {"_id": proyecto._id, "direcion": proyecto.direccion, "tipo": proyecto.tipo, "logo": proyecto.logo, "torres": proyecto.torres, "pisos": proyecto.pisos, "imp": proyecto.imp};
    };
    var _fun4 = function (list) {
        for (var i = 0; i < list.length; i++) {
            sesiones[i] = {"id": list[i].id, "cliente": list[i].cliente, "asesor": list[i].asesor, "cotizaciones": list[i].cotizaciones, "estado": list[i].estado};
        }
    };
    var _fun5 = function (proyecto) {
        var inmuebles = [];
        var list = proyecto.inmuebles;
        for (var i = 0; i < list.length; i++) {
            if (list[i].seccion == torreSeleccionada.toString()) {
                inmuebles[inmuebles.length] = {"_id": list[i]._id, "seccion": list[i].seccion, "numero": list[i].numero, "tipo": list[i].tipo, "valor": list[i].valor, "estado": list[i].estado};
            }
        }
        for (var i = 0; i < inmuebles.length; i++) {
            if (inmuebles[i].numero == apartamentoSel.toString()) {
                inmueble = inmuebles[i];
                console.info(inmueble);
            }
        }
    };
    var _fun6 = function (proyecto) {
        var inmuebles = [];
        var list = proyecto.inmuebles;
        for (var i = 0; i < list.length; i++) {
            if (list[i]._id === (proyecto._id + "-" + torreSeleccionada.toString() + "-" + apartamentoSel)) {
                inmuebles[i] = {"_id": list[i]._id, "seccion": list[i].seccion, "numero": list[i].numero, "tipo": list[i].tipo, "valor": list[i].valor, "estado": "reservado"};
            } else {
                inmuebles[i] = {"_id": list[i]._id, "seccion": list[i].seccion, "numero": list[i].numero, "tipo": list[i].tipo, "valor": list[i].valor, "estado": list[i].estado};

            }
        }
        proyecto.inmuebles = inmuebles;
        proyectoSeleccionado = proyecto;
    };

    var _fun7 = function (conversacion) {
        
        console.info(conversacion.mensajes+"CONVERSACIONNNNN");
        var list = conversacion.mensajes;
        conversacion.mensajes[list.length] = {"remitente": "", "mensaje": mensajeenviado};
        conversacionSeleccionada = conversacion;
    };

    return {
        inicio: function () {
            user = document.getElementById("username").value;
            controlador.getUsuarioByName(user, _fun);
            setTimeout(function () {
                if (username.rol === 'cliente') {
                    var sesion = {"id": 0, "cliente": {"_id": username._id, "nombre": username.nombre, "correo": username.correo, "rol": username.rol}, "asesor": null, "cotizacion": {}, "estado": null};
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
                        document.getElementById("container").innerHTML = "<div class=\"col-md-2\" id=\"tabla\" style=\"margin-left:15%;\"></div><div style=\"margin-left:15%;\" class=\"col-md-6\"><div id=\"chat\" style=\" background-color:lightgrey; height:300px; width:400px; overflow-y: scroll;\"></div><div><input id=\"mensaje\" type=\"text\"><button class=\"btn btn-danger\" onclick=\"app.enviar()\">Enviar</button></div></div>";
                        document.getElementById("nameuser").innerHTML = username.nombre;

                        document.getElementById("cotizador").innerHTML = ("<div><p>Apartamento: </p><input id=\"apto\" disabled type=\"number\" class=\"form-control\" ><p>Valor:</p><input id=\"valor\" type=\"number\" disabled class=\"form-control\">");
                        document.getElementById("cotizador").innerHTML += ("<p>Ingresos mensuales: </p><input id=\"ingresos\"onchange=\"app.updateCotizacion()\" type=\"number\" class=\"form-control\">");
                        document.getElementById("cotizador").innerHTML += ("<p>Crédito aproximado: </p><input id=\"credito\" class=\"form-control\" onchange=\"app.updateCotizacion()\" type=\"number\"><p>Subsidio: </p><input id=\"subsidio\"  class=\"form-control\" onchange=\"app.updateCotizacion()\" type=\"number\">");
                        document.getElementById("cotizador").innerHTML += ("<p>Cesantias: </p><input  id=\"cesantias\" class=\"form-control\" onchange=\"app.updateCotizacion()\" type=\"number\">");
                        document.getElementById("cotizador").innerHTML += ("<p>Ahorro programado: </p><input  id=\"ahorropr\" class=\"form-control\" onchange=\"app.updateCotizacion()\" type=\"number\">");
                        document.getElementById("cotizador").innerHTML += ("<p>Recursos propios: </p><input id=\"recpropios\"  class=\"form-control\" onchange=\"app.updateCotizacion()\" type=\"number\">");
                        document.getElementById("cotizador").innerHTML += ("<p>Numero de cuotas: </p><input type=\"number\" id=\"numcuotas\" class=\"form-control\" onchange=\"app.updateCotizacion()\" ><p>Cuotas mensuales de: </p><input type=\"number\" id=\"cuotas\" class=\"form-control\" onchange=\"app.updateCotizacion()\" ></div>");
                        document.getElementById("cotizador").innerHTML += ("<br><button id=\"reservar\" class=\"btn btn-danger btn-lg btn-block\" onclick=\"app.reservar()\"> Reservar </button>");

                        apiproyecto.loadProyectos();
                        setTimeout(function () {
                            controlador.wsconnect(sesionActual.id);
                        }, 250);
                    });
                } else {
                    $.get("cotizador.html", function (data) {
                        $("#contenedor").html(data);
                        document.getElementById("container").innerHTML = "<h1>LISTA DE SESIONES</h1> <br></br>";
                        document.getElementById("container").innerHTML += "<div class=\"col-md-4\" id=\"tabla\"></div>";
                        document.getElementById("tabla").innerHTML = "<table class=\"table table-hover\"><tbody></tbody></table>";
                        $("table tbody").append("<td><h4><strong>Numero de sesion</strong></h4></td><td><h4><strong>Cliente</strong></h4></td><td><h4><strong>Estado</strong></h4></td><td><h4><strong>Suscribirse</strong></h4></td>");

                        controlador.getAllSesiones(_fun4);
                        setTimeout(function () {
                            for (var i = 0; i < sesiones.length; i++) {
                                $("table tbody").append("<tr>");
                                $("table tbody").append("<td><h4>" + sesiones[i].id + "</h4></td><td><h4>" + sesiones[i].cliente.nombre + "</h4></td><td><h4> " + sesiones[i].estado + "</h4></td><td><button class=\"btn btn-info\" onclick=\"app.subscribe('" + sesiones[i].id + "')\">Suscribirse</button></td>");
                                $("table tbody").append("</tr>");
                            }
                        }, 200);
                    });
                }
            }, 200);
        }, selectProyect: function () {
            document.getElementById("container").innerHTML = "<div class=\"col-md-2\" id=\"tabla\" style=\"margin-left:15%;\"></div><div style=\"margin-left:15%;\" class=\"col-md-6\"><div id=\"chat\" style=\" background-color:lightgrey; height:300px; width:400px; overflow-y: scroll;\"></div><div><input id=\"mensaje\" type=\"text\"><button class=\"btn btn-danger\" onclick=\"app.enviar()\">Enviar</button></div></div>";
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
            document.getElementById("container").innerHTML = "<div class=\"col-md-2\" id=\"tabla\" style=\"margin-left:15%;\"></div><div style=\"margin-left:15%;\" class=\"col-md-6\"><div id=\"chat\" style=\" background-color:lightgrey; height:300px; width:400px; overflow-y: scroll;\"></div><div><input id=\"mensaje\" type=\"text\"><button class=\"btn btn-danger\" onclick=\"app.enviar()\">Enviar</button></div></div>";

            document.getElementById("cotizador").innerHTML = ("<div><p>Apartamento: </p><input id=\"apto\" disabled class=\"form-control\" type=\"number\" ><p>Valor:</p><input id=\"valor\" class=\"form-control\" type=\"number\" disabled >");
            document.getElementById("cotizador").innerHTML += ("<p>Ingresos mensuales: </p><input id=\"ingresos\" class=\"form-control\" onchange=\"app.updateCotizacion()\" type=\"number\">");
            document.getElementById("cotizador").innerHTML += ("<p>Crédito aproximado: </p><input id=\"credito\" class=\"form-control\" onchange=\"app.updateCotizacion()\" type=\"number\"><p>Subsidio: </p><input id=\"subsidio\"  class=\"form-control\" onchange=\"app.updateCotizacion()\" type=\"number\">");
            document.getElementById("cotizador").innerHTML += ("<p>Cesantias: </p><input  id=\"cesantias\" class=\"form-control\" onchange=\"app.updateCotizacion()\" type=\"number\">");
            document.getElementById("cotizador").innerHTML += ("<p>Ahorro programado: </p><input  id=\"ahorropr\" class=\"form-control\" onchange=\"app.updateCotizacion()\" type=\"number\">");
            document.getElementById("cotizador").innerHTML += ("<p>Recursos propios: </p><input id=\"recpropios\"  class=\"form-control\" onchange=\"app.updateCotizacion()\" type=\"number\">");
            document.getElementById("cotizador").innerHTML += ("<p>Numero de cuotas: </p><input type=\"number\" id=\"numcuotas\" class=\"form-control\" onchange=\"app.updateCotizacion()\" ><p>Cuotas mensuales de: </p><input type=\"number\" id=\"cuotas\" class=\"form-control\" onchange=\"app.updateCotizacion()\" ></div>");
            document.getElementById("cotizador").innerHTML += ("<br><button id=\"reservar\" class=\"btn btn-danger btn-lg btn-block\" onclick=\"app.reservar()\"> Reservar </button>");

            apiproyecto.loadProyectos();
            setTimeout(function () {
                controlador.wsconnect(sesion);
            }, 250);
        },
        selectTorre: function () {

            torreSeleccionada = document.getElementById("torres").value;
            setTimeout(function () {

                var sesion = {"id": sesionActual.id, "cliente": sesionActual.cliente, "asesor": sesionActual.asesor, "cotizacion": sesionActual.cotizacion, "proyecto": proyectoSeleccionado, "inmuebleSeleccionado": sesionActual.inmuebleSeleccionado, "torreSeleccionada": torreSeleccionada};
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

                controlador.getProyectoByName(sesionActual.proyecto._id, _fun5);
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
                var cotizacion = {"cliente": sesionActual.cliente, "inmueble": sesionActual.inmuebleSeleccionado, "asesor": sesionActual.asesor, "proyecto": sesionActual.proyecto._id, "ingresos": ingresos, "credito": credito, "subsidio": subsidio, "cesantias": cesantias, "ahorro": ahorro, "recpropios": recpropios, "numcuotas": numcuotas, "cuotas": cuotas};
                var sesion = {"id": sesionActual.id, "cliente": sesionActual.cliente, "asesor": sesionActual.asesor, "cotizacion": cotizacion, "proyecto": sesionActual.proyecto, "inmuebleSeleccionado": sesionActual.inmuebleSeleccionado, "torreSeleccionada": sesionActual.torreSeleccionada};
                $.ajax({
                    url: "/sesiones",
                    type: "PUT",
                    data: JSON.stringify(sesion),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            }, 200);
        },
        singUp: function () {
            document.getElementById("contenedor").innerHTML = ("<div id=\"contenedor\"><div class=\"row\"><div class=\"col-md-2\" id=\"contenedorlog\"><img src=\"/img/logo-png.png\" class=\"img-responsive\" alt=\"Conxole Admin\"/><input placeholder=\"Nombre\" id=\"nombre\" type=\"text\" class=\"form-control form-control-success\"><input  placeholder=\"Celular\" id=\"id\" type=\"text\" class=\" form-control form-control-success\"><input placeholder=\"Correo\" id=\"correo\" type=\"text\" class=\" form-control form-control-success\"> <br></br><button id=\"singup\" class=\"btn btn-success btn-lg btn-block\" onclick=\"app.registrarse()\"> Registrarse </button><a href=\"index.html\"> Ingresar</a> </div></div></div>");

        },
        registrarse: function () {
            console.info("entro a la funcion");
            var nombre = document.getElementById("nombre").value;
            var _id = document.getElementById("id").value;
            var correo = document.getElementById("correo").value;

            var cliente = {"_id": _id, "nombre": nombre, "correo": correo, "rol": "cliente"};
            console.info(cliente);
            setTimeout(function () {
                $.ajax({
                    url: "/usuarios",
                    type: "POST",
                    data: JSON.stringify(cliente),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            }, 200);
        },
        reservar: function () {
            controlador.getProyectoByName(sesionActual.proyecto._id, _fun6);
            setTimeout(function () {
                $.ajax({
                    url: "/proyectos",
                    type: "PUT",
                    data: JSON.stringify(proyectoSeleccionado),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            }, 200);
        },
        enviar: function () {            
            var conv = {"_id": sesionActual.id, "mensajes":[]};
            $.ajax({
                    url: "/conversaciones",
                    type: "PUT",
                    data: JSON.stringify(conv),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            mensajeenviado = document.getElementById("mensaje").value;
            console.info(sesionActual.id);            
            setTimeout(function () {
                controlador.getConversacionById(sesionActual.id, _fun7);
            }, 200);
        }
    };
})();

