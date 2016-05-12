app.controller('reporteempleadoController', function ($scope,$routeParams, reporteempleadoService) {

	$scope.idempleado = $routeParams.idempleado
	$scope.empleado = {}
    $scope.contaempleado = {}
	$scope.turno = {}
    $scope.decision;
	$scope.title = "Número de turnos completados";
    
    
	getEmpreado()


	$scope.buscar = function(){

        var fechainicial = document.getElementsByName('start')[0].value;
        var fechafinal = document.getElementsByName('end')[0].value;
        contabilidadempleado(fechainicial,fechafinal)
        $scope.decision = true;
        //turnodiario(fechainicial,fechafinal)
    }

	function getEmpreado(){
		var promiseGet = reporteempleadoService.getempleado($scope.idempleado); 
        promiseGet.then(function (pl) {
            $scope.empleado = pl.data[0];
            $scope.decision = false;
            //alert(JSON.stringify($scope.empleado));
        },
        function (errorPl) {
            console.log('failure loading empleado', errorPl);
        });
	}

	function turnodiario(fechainicial,fechafinal){

		var turn = document.getElementById('turn')
		turn.innerHTML = ""
		var promiseGet = reporteempleadoService.reporteempleado($scope.idempleado,fechainicial,fechafinal); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data));
            $scope.turno = pl.data[0].contador
            turn.innerHTML += "<h1 style='position: absolute; top: 90px; left: 265px; color: white; font-style:bold'>"+$scope.turno+"</h1>"
        },
        function (errorPl) {
            console.log('failure loading empleado', errorPl);
        });
	}

    function contabilidadempleado(fechainicial,fechafinal){
        var promiseGet = reporteempleadoService.contabilidadempleado($scope.idempleado,fechainicial,fechafinal); 
        promiseGet.then(function (pl) {
            $scope.contaempleado = pl.data[0];
            //alert(JSON.stringify($scope.contaempleado))
        },
        function (errorPl) {
            console.log('failure loading empleado', errorPl);
        });
    }

})