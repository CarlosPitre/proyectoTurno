app.controller('listaempleadoController', function ($scope, listaempleadoService) {

	$scope.idempresa = session.getIdempresa()
	$scope.empresa = []
    $scope.empresa1 = []
    $scope.reverse = true;  
    $scope.currentPage = 1; 
	loadempleados()

	$scope.numPerPage = 5;

    $scope.totalItems = $scope.empresa.length;
    //$scope.totalItems1 = $scope.empresa1.length;

    $scope.paginate = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.empresa.indexOf(value);  
        return (begin <= index && index < end);  
    };

    /*$scope.paginate1 = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.empresa1.indexOf(value);  
        return (begin <= index && index < end);  
    };*/
    

	function loadempleados(){
        var promiseGet = listaempleadoService.getAllempleado($scope.idempresa); 
        promiseGet.then(function (pl) {
        	
        	$scope.empresa = pl.data
            $scope.totalItems = $scope.empresa.length;
            //alert(JSON.stringify($scope.empresa.length))

            /*for(var i=0;i<pl.data.length;i++){
                $scope.empresa1 = pl.data[i].empleados;
                //$scope.totalItems = $scope.empresa1.le
                $scope.totalItems1 = $scope.empresa1.length;
                alert(JSON.stringify($scope.empresa1.length))
            }*/
            

        },
        function (errorPl) {
            console.log('failure loading empleados', errorPl);
        });
    };

})