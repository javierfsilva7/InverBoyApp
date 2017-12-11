/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var apiproyecto = (function () {

    var proyectos = [];

    var _fun = function (list) {
        for (var i = 0; i < list.length; i++) {
            console.info(list[i].nombre);
            console.info(list[i].logo);
            proyectos[i] = {"_id": list[i]._id, "direccion": list[i].direccion, "tipo": list[i].tipo, "logo": list[i].logo, "torres": list[i].torres, "pisos": list[i].pisos};
        }

    };


    return {
        
        loadProyectos: function () {
            controlador.getAllProyectos(_fun);
            
            setTimeout(function () {
                document.getElementById("proyectos").innerHTML += "<option selected>Seleccione proyecto</option>";
                for (var i = 0; i < proyectos.length; i++) {
                    console.info(proyectos[i]._id);
                    document.getElementById("proyectos").innerHTML += "<option value='" + proyectos[i]._id + "'>Proyecto " + proyectos[i]._id + "</option>";
                }
            }, 250);
        }
    };
})();

