app.controller('clienteReservaController', function($scope, $routeParams,listareservaService){
	
	$scope.Turnos = [];
	$scope.Idsucursal = session.getIdsucursal();
	$scope.serial = "";
	getTurnos();

	function getTurnos(){
        var promiseGet = listareservaService.getTurnos($routeParams.idCliente, $scope.Idsucursal); 
        promiseGet.then(function (pl) {
            $scope.Turnos = pl.data;
            console.log(JSON.stringify($scope.Turnos));
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
    }

   	$scope.eliminarTurno = function  (serial) {
   		$scope.serial = serial;
   		$('#myModal').modal('show');
   	}

   	$scope.ConfirmarEliminar = function  () {
   		var promiseGet = listareservaService.deleteTurno($scope.serial); 
        promiseGet.then(function (pl) {
        	$('#myModal').modal('hide');
            alert(pl.data);
            getTurnos();
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
   	}

})