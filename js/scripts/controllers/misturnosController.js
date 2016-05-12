app.controller('misturnosController', function ($scope,misturnosService) {

	$scope.id = sessioncliente.getId();
	$scope.turno = []

	getAllturno()

	function getAllturno(){
        var promiseGet = misturnosService.getturnocliente(sessioncliente.getId()); 
        promiseGet.then(function (pl) {
            $scope.turno = pl.data;
            if(pl.data == ""){
                $scope.entro = false;
            }else{
                $scope.entro = true;
            }
            
        },
        function (errorPl) {
            console.log('failure loading sector', errorPl);
        });
    }

})