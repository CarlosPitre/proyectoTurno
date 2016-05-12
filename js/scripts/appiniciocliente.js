var uri = "../api";
var gl_resultado = {};
var app;
///Colorprimario = #E42420
///colorprimariodark = #A5241F
(function(){
    app = angular.module("bienvenida", ['ngRoute','jkuri.timepicker','ng-currency','ui.keypress','ks.ngScrollRepeat','ngResource','ui.bootstrap']);
    
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
                .when('/cliente/mapareserva/:sector', {
                    templateUrl: 'pages/cliente/mapasectoragenda.html'
                })
                .when('/cliente/reservar/:idservicio/:idsucursal/:sectorid/:sucursal', {
                    templateUrl: 'pages/cliente/reservar.html'
                })
                .otherwise({
                    redirectTo:"/cliente/listasectorescliente"
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
