/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var apicotizador = (function () {

    var cotizaciones = [];

    var _fun = function (list) {
        console.info("entro");
        for (var i = 0; i < list.length; i++) {
            cotizaciones[i] = {"cliente": list[i].cliente, "inmueble": list[i].inmueble, "id": list[i].id, "asesor": list[i].asesor};
        }

    }

    return{
        load: function () {
            document.getElementById("container").innerHTML = "<div class=\"col-md-4\" id=\"tabla\"></div>";
            document.getElementById("tabla").innerHTML = "<table class=\"table table-bordered\"><tbody></tbody></table>";
            controlador.getAllCotizaciones(_fun);
            setTimeout(function () {
                for (var i = 0; i < cotizaciones.length; i++) {
                    $("table tbody").append("<tr>");
                    $("table tbody").append("<td><button onclick=\"apicotizador.subscribe('" + cotizaciones[i].id + "')\">Suscribirse</button></td><td><h4>"+cotizaciones[i].cliente.nombre+"</h4></td><td><h4> Cotizacion: " + cotizaciones[i].id + "</h4></td>");
                    $("table tbody").append("</tr>");
                }
            }, 200);
        }

    }
})();
