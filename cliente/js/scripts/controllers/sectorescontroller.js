app.controller('sectoresControler', function($scope,sectorService){
	$scope.Sectores = [];
	loadSectores();

	function loadSectores () {
		var promiseGet = sectorService.getSectores(); 
        promiseGet.then(function (pl) {
            $scope.Sectores = pl.data;
        },
        function (errorPl) {
            console.log('failure loading sucursal', errorPl);
        });
	}

})