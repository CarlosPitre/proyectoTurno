var uri = "./api";
var gl_resultado = {};
var app;
(function(){
    app = angular.module("sesion", ['ngRoute','ng-currency','ui.keypress','ks.ngScrollRepeat']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            
            $routeProvider
                .when('/registrarcliente', {
                    templateUrl: 'pages/registrarcliente.html'
                })
                .when('/registrarempresas', {
                    templateUrl: 'pages/registrarempresa.html'
                })
                .when('/sesioncliente', {
                    templateUrl: 'pages/sesioncliente.html'
                })
                .when('/iniciosesion', {
                    templateUrl: 'pages/iniciarsesion.html'
                })
                .when('/cambiarclave/:id/:val', {
                    templateUrl: 'pages/cambiarclave.html'
                })
                .when('/cambiarclavecliente/:id/:val', {
                    templateUrl: 'pages/cambiarclavecliente.html'
                })
                .otherwise({
                    redirectTo:"iniciosesion"
                });
                    
            
    }]);

})();