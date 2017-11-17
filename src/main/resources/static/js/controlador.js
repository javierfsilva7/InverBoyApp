/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


controlador = (function () {
    var nameuser;
    return {
        getAllProyectos: function (callback) {
            var x;
            $.get("/proyectos", function (data) {
                x = data;
                console.info(x+"CONTROLLER")
            }).done(function () {
                callback(x);
            });
        },
        getProyectoByName: function (name, callback) {
            var x;
            $.get("/proyectos/"+name, function (data) {
                x = data;
            }).done(function () {
                callback(x);
            });
        },
        getInmueblesByProyecto: function (name, callback) {
            var x;
            $.get("/proyectos/"+name+"/inmuebles", function (data) {
                x = data;
            }).done(function () {
                callback(x);
            });
        },
        getInmuebleByTorre : function (name, torre, callback) {
            var x;
            $.get("/proyectos/"+name+"/inmuebles/"+torre, function (data) {
                x = data;
            }).done(function () {
                callback(x);
            });
        },
        getUsuarioByName: function(user, callback){
            var x;
            nameuser=user;
            $.get("/usuarios/"+user, function (data) {
                x = data;
                console.info(x);                
            }).done(function () {
                callback(x);
            });
        },
        getAllCotizaciones : function (callback) {
            var x;
            $.get("/cotizaciones", function (data) {
                x = data;
                console.info(x+"COTIZACIONES")
            }).done(function () {
                callback(x);
            });
        },
        getLastCotizacionByUser: function(user, callback){
            console.info("Entro last");
            var x;
            $.get("/cotizaciones/usuario/"+nameuser, function (data) {
                x = data;
                console.info(x);                
            }).done(function () {
                callback(x);
            });
        }
          
    };
})();

