app.controller('blancoController', function ($scope,sesionService) {

	$scope.idperfil = session.getIdperfil();
	$scope.idsucursal = session.getIdsucursal();

	$scope.empresa = false;
	$scope.super = false;
	$scope.sucu = false;
	$scope.empleado = false;

	$scope.aplicareserva;

	initialize();
	vertipo();

	function initialize(){
		if($scope.idperfil == '3'){
			$scope.empresa = true;
		}
		if($scope.idperfil == '1'){
			$scope.super = true;
		}
		if($scope.idperfil == '4'){
			$scope.sucu = true;
		}
		if($scope.idperfil == '2'){
			$scope.empleado = true;
		}
	}

	function vertipo(){
        if($scope.idsucursal != null){
            aplicaReserva($scope.idsucursal)
        }
    }

	function aplicaReserva(idsucursal){
        var promiseGet = sesionService.aplicareserva(idsucursal); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data))
            $scope.aplicareserva = pl.data[0].aplicaReserva;
        },
        function (errorPl) {
            console.log('failure loading sucursal', errorPl);
        });
    }
	

})