/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


apiclient = (function () {

    return {
        getProyectos: function (callback) {
            var x;
            $.get("proyectos", function (data) {
                x = data;
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
            $.get("/usuarios/"+user, function (data) {
                x = data;
                console.info(x);                
            }).done(function () {
                callback(x);
            });
        }
          
    };
})();

