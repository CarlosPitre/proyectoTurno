app.controller('listasectorclienteController', function ($scope,sectorService) {

	$scope.title = "Sectores Disponibles";

	$scope.Sector = [];

	getAllSectores()

	function getAllSectores(){
        var promiseGet = sectorService.sectoresactivo(); 
        promiseGet.then(function (pl) {
        	$scope.Sector = pl.data;
            //alert(JSON.stringify($scope.Sector))
        },
        function (errorPl) {
            console.log('failure loading sector', errorPl);
        });
    }

})