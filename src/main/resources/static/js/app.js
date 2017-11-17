/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = (function () {

    var username;

    var _fun = function (user) {
        username = {"nombre": user.nombre, "celular": user.celular, "correo": user.correo, "rol": user.rol};
    };

    return {
        inicio: function () {
            var user = document.getElementById("username").value;
            controlador.getUsuarioByName(user, _fun);
            setTimeout(function () {
                console.info(username.rol);
                if (username.rol === 'cliente') {
                    var cotizacion = {"cliente": {"nombre": username.nombre, "celular": username.celular, "correo": username.correo, "rol": username.rol}, "inmueble": null, "id": 0, "asesor": null};
                    console.info(cotizacion);
                    $.ajax({
                        url: "/cotizaciones",
                        type: "POST",
                        data: JSON.stringify(cotizacion),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    });
                    window.location.href = "/proyecto.html";
                } else {
                    window.location.href = "/cotizador.html";
                }
            }, 200);

        }
    };

})();

