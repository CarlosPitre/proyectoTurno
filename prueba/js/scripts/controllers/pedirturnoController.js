app.controller('pedirturnoController', function ($scope, pedirturnoService) {

	$scope.idempleado = session.getId();
	$scope.ServicioEmpleado = []
	getEmpleadoservicios()

	function getEmpleadoservicios(){
		var promiseGet = pedirturnoService.getempleadoservicio($scope.idempleado); 
        promiseGet.then(function (pl) {
        	//alert(JSON.stringify(pl.data))
            $scope.ServicioEmpleado = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
	}

})