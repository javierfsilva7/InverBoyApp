/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var apiproyecto = (function () {

    var proyectos = [];

    var _fun = function (list) {
        for (var i = 0; i < list.length; i++) {
            proyectos[i] = {"nombre": list[i].nombre, "direccion": list[i].direccion, "tipo": list[i].tipo, "logo": list[i].logo, "torres": list[i].torres, "pisos": list[i].pisos};
        }

    };


    return {
        
        loadProyectos: function () {
            controlador.getAllProyectos(_fun);
            setTimeout(function () {
                for (var i = 0; i < proyectos.length; i++) {
                    document.getElementById("proyectos").innerHTML += "<option value='" + proyectos[i].nombre + "'>Proyecto " + proyectos[i].nombre + "</option>";
                }
            }, 250);
        }
    };
})();

