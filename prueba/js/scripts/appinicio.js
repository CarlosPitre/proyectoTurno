var uri = "./api";
var gl_resultado = {};
var app;
///Colorprimario = #E42420
///colorprimariodark = #A5241F
(function(){
    app = angular.module("bienvenida", ['ngRoute','jkuri.timepicker','ngTable','ng-currency','ui.keypress','ks.ngScrollRepeat','ngResource','ui.bootstrap']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            
            $routeProvider
                .when('/cliente/misturnos', {
                    templateUrl: 'pages/cliente/misturnos.html'
                })
                .when('/cliente/perfilcliente', {
                    templateUrl: 'pages/cliente/perfilcliente.html'
                })
                .when('/cliente/sectormapas/:idsector', {
                    templateUrl: 'pages/cliente/mapasectores.html'
                })
                .when('/cliente/listasectorescliente', {
                    templateUrl: 'pages/cliente/listasectorescliente.html'
                })
                .when('/configuracion/empleadoadministrador', {
                    templateUrl: 'pages/configuracion/empleadoadmin.html'
                })
                .when('/configuracion/empleadoempresa', {
                    templateUrl: 'pages/configuracion/empleadoempresa.html'
                })
                .when('/configuracion/sucursaladmin', {
                    templateUrl: 'pages/configuracion/sucursales.html'
                })
                .when('/configuracion/empresa', {
                    templateUrl: 'pages/configuracion/empresa.html'
                })
                .when('/configuracion/listaempresa', {
                    templateUrl: 'pages/configuracion/listaempresa.html'
                })
                .when('/configuracion/ejemplo', {
                    templateUrl: 'pages/configuracion/ejemplo.html'
                })
                .when('/configuracion/sucursal', {
                    templateUrl: 'pages/configuracion/sucursal.html'
                })
                .when('/configuracion/sector', {
                    templateUrl: 'pages/configuracion/sector.html'
                })
                .when('/configuracion/listasucursal', {
                    templateUrl: 'pages/configuracion/listasucursal.html'
                })
                .when('/configuracion/empleados', {
                    templateUrl: 'pages/configuracion/empleado.html'
                })
                .when('/configuracion/servicios', {
                    templateUrl: 'pages/configuracion/servicio.html'
                })
                .when('/configuracion/perfil', {
                    templateUrl: 'pages/configuracion/perfil.html'
                })
                .when('/configuracion/serviciosempresa', {
                    templateUrl: 'pages/configuracion/serviciosempresa.html'
                })
                .when('/configuracion/turnos', {
                    templateUrl: 'pages/configuracion/pedirturno.html'
                })
                .when('/configuracion/listaservicios/:idservicio', {
                    templateUrl: 'pages/configuracion/turnoservicios.html'
                })
                .when('/configuracion/sucursalempresa', {
                    templateUrl: 'pages/configuracion/sucursalempresa.html'
                })
                .when('/configuracion/listasucursalempresa', {
                    templateUrl: 'pages/configuracion/listasucursalempresa.html'
                })
                .when('/configuracion/galeriaimagenes', {
                    templateUrl: 'pages/configuracion/galeria.html'
                })
                .when('/configuracion/galeriaimagenesadmin', {
                    templateUrl: 'pages/configuracion/galeriaadmin.html'
                })
                .when('/configuracion/reservas', {
                    templateUrl: 'pages/configuracion/listareserva.html'
                })
                .when('/configuracion/calendario', {
                    templateUrl: 'pages/configuracion/calendario.html'
                })
                .when('/configuracion/reservarecurrente', {
                    templateUrl: 'pages/configuracion/reservasrecurrentes.html'
                })
                .when('/reportes/reportetotalempleado', {
                    templateUrl: 'pages/reportes/totalempleados.html'
                })
                .when('/reportes/reportesector/:idsector', {
                    templateUrl: 'pages/reportes/reportesector.html'
                })
                .when('/reportes/listasectores', {
                    templateUrl: 'pages/reportes/listasector.html'
                })
                .when('/reportes/reporteempleado/:idempleado', {
                    templateUrl: 'pages/reportes/reporteempleado.html'
                })
                .when('/reportes/listaempleados', {
                    templateUrl: 'pages/reportes/listaempleado.html'
                })
                .when('/reportes/listasucursalreporte', {
                    templateUrl: 'pages/reportes/listasucursales.html'
                })
                .when('/reportes/listaempresareporte', {
                    templateUrl: 'pages/reportes/listaempresas.html'
                })
                .when('/reportes/reportesucursales/:idsucursal', {
                    templateUrl: 'pages/reportes/reportesucursales.html'
                })
                .when('/reportes/reporteempresas/:idempresa', {
                    templateUrl: 'pages/reportes/reporteempresas.html'
                })
                .when('/reportes/sucursalreporte', {
                    templateUrl: 'pages/reportes/sucursalreporte.html'
                })
                .when('/reportes/listasucursalempresas/', {
                    templateUrl: 'pages/reportes/listasucursalesempresa.html'
                })
                .when('/pages/inicio/', {
                    templateUrl: 'pages/blanco.html'
                })
                .otherwise({
                    redirectTo:"/pages/inicio/"
                }); 
            
    }]);

    app.directive('ngEnter', function () {
        return function (scope, elements, attrs) {
            elements.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
    
    app.filter('ifEmpty', function() {
        return function(input, defaultValue) {
            if (angular.isUndefined(input) || input === null || input === '') {
                return defaultValue;
            }

            return input;
        };
    });
    
    app.filter('sumByKey', function () {
        return function (data, key) {
            if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                return 0;
            }

            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                sum += parseInt(data[i][key]);
            }

            return sum;
        };
    });
    
    app.directive('uploaderModel',['$parse',function($parse){
        return{
            restrict: 'A',
            link: function(scope,iElement,iAttrs){
                iElement.on('change',function(e)
                {
                    $parse(iAttrs.uploaderModel).assign(scope,iElement[0].files[0]);
                });
            }
        };

    }]);
    
    app.config(['$provide', function($provide) {
        $provide.decorator('$locale', ['$delegate', function($delegate) {
          if($delegate.id == 'en-us') {
            $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
            $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
          }
          return $delegate;
        }]);
     }]);   

})();
