app.controller('mapaSectoresController', function($scope,$routeParams,mapasectoresService){
	$scope.Servicios = []
	initMap();
	loadServicios();
	//loadSucursales()

	/*function loadSucursales() {
		$scope.Sucursales = [
			{
				nombre:"Transito"
			},
			{
				nombre:"Transito1"
			},
			{
				nombre:"Transito1"
			},
			{
				nombre:"Transito1"
			},
			
		]
	}*/

	function loadServicios () {
		var promiseGet = mapasectoresService.getServicios($routeParams.idSector); 
        promiseGet.then(function (pl) {
            $scope.Servicios = pl.data;
            console.log(JSON.stringify($scope.Servicios));
        },
        function (errorPl) {
            console.log('failure loading sucursal', errorPl);
        });
	}

	function initMap() {
		map = new google.maps.Map(document.getElementById('mapa'), {
	    	center: {lat: -34.397, lng: 150.644},
	    	zoom:  14
	  	});
	}


})