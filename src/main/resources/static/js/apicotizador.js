/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var apicotizador = (function () {

    var sesiones = [];

    var _fun = function (list) {
        console.info("entro");
        for (var i = 0; i < list.length; i++) {
            sesiones[i] = {"id": list[i].id, "cliente": list[i].cliente, "asesor": list[i].asesor, "cotizaciones": list[i].cotizaciones, "estado": list[i].estado};
        }

    }

    return{
        load: function () {

            document.getElementById("container").innerHTML = "<div class=\"col-md-4\" id=\"tabla\"></div>";
            document.getElementById("tabla").innerHTML = "<table class=\"table table-bordered\"><tbody></tbody></table>";
            controlador.getAllSesiones(_fun);
            setTimeout(function () {
                for (var i = 0; i < sesiones.length; i++) {
                    $("table tbody").append("<tr>");
                    $("table tbody").append("<td><button onclick=\"apicotizador.subscribe('" + sesiones[i].id + "')\">Suscribirse</button></td><td><h4>" + sesiones[i].cliente.nombre + "</h4></td><td><h4> Estado: " + sesiones[i].estado + "</h4></td>");
                    $("table tbody").append("</tr>");
                }
            }, 200);
        },
        subscribe: function (sesion) {
            document.getElementById("header").innerHTML = "<div class=\"col-md-4 encabezado\"><h1 id=\"nameuser\">Usuario: </><h1 id=\"titulo\">Proyecto </h1><img id=\"logo\"/><br></br><select id=\"proyectos\"class =\"select\" onchange=\"app.selectProyect()\"></select><br></br><select id=\"torres\" class =\"select\" onchange=\"apiproyecto.loadTorre()\"></select></div><div id=\"cotizador\" class=\"col-md-4\"></div> ";
            document.getElementById("container").innerHTML = "<div class=\"col-md-2\" id=\"tabla\"></div>";
            apiproyecto.loadProyectos();
            setTimeout(function () {
                controlador.wsconnect(sesion);
            }, 250);
        }


    }
})();
