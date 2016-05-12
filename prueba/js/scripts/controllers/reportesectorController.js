app.controller('reportesectorController', function ($scope,$routeParams,reportesectorService) {

	$scope.idsector = $routeParams.idsector;
    $scope.grafo = false 
    $scope.reporte = []
    $scope.totalempresa;
    $scope.contabilidad = []
	$scope.buscar = function(){
		var fechainicial = document.getElementsByName('start')[0].value;
        var fechafinal = document.getElementsByName('end')[0].value;
        $scope.grafo = true;
        index(fechainicial,fechafinal)
        contabilidadsector(fechainicial,fechafinal)
	}

	function index(fechainicial,fechafinal){
		var data = {};
        var sites = [];
		var promiseGet = reportesectorService.reportesector($scope.idsector,fechainicial,fechafinal); 
        promiseGet.then(function (pl) {
            $scope.reporte = pl.data;
            //alert(JSON.stringify($scope.reporte))
            pl.data.forEach(function(e){
                sites.push(e.razonSocial);
                data[e.razonSocial] = e.sucursales;
            })

            chart = c3.generate({
                data: {
                    json: [ data ],
                    keys: {
                        value: sites,
                    },
                    type:'pie'
                },
            });

        },
        function (errorPl) {
            console.log('failure loading reporte', errorPl);
        });
	}

    var arraymoney = Array() 
    function contabilidadsector(fechainicial,fechafinal){
        var promiseGet = reportesectorService.reportecontabilidadsector($scope.idsector,fechainicial,fechafinal); 
        promiseGet.then(function (pl) {
            $scope.contabilidad = pl.data
            for(var i=0;i<pl.data.length;i++){
                arraymoney.push(pl.data[i].total)
            }
            var money = 0;
            for(var k=0;k<arraymoney.length;k++){
                money += arraymoney[k]
            }
            $scope.totalempresa = money
        },
        function (errorPl) {
            console.log('failure loading reporte', errorPl);
        });
    }

})