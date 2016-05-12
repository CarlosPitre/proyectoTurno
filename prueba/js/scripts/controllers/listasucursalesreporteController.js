app.controller('listasucursalesreporteController', function ($scope,listasucursalesreporteService,listasucursalService) {

    $scope.idperfil = session.getIdperfil();
    $scope.idempresa = session.getIdempresa()
	$scope.listasucursalempresa = []

	$scope.title = "Lista de sucursales registradas";

	$scope.predicate = 'name';  
    $scope.reverse = true;  
    $scope.currentPage = 1; 

    $scope.totalItems = $scope.listasucursalempresa.length;
    
    $scope.numPerPage = 10;

    $scope.paginate = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.listasucursalempresa.indexOf(value);  
        return (begin <= index && index < end);  
    };

    getAllSurcusales()

	function getAllSurcusales(){

        if($scope.idperfil == 3){
            var promiseGet = listasucursalService.listaSucursalesxEmpresa($scope.idempresa); 
            promiseGet.then(function (pl) {
                //$scope.listasucursal = pl.data;
                //console.log(pl.data);
                //alert(JSON.stringify(pl.data))
                $scope.listasucursalempresa = pl.data;
                //alert(JSON.stringify($scope.listasucursalempresa))
                
            },
            function (errorPl) {
                console.log('failure loading Deportes', errorPl);
            });

        }else{
            var promiseGet = listasucursalesreporteService.sucursalexempresa(); 
            promiseGet.then(function (pl) {
                //alert(JSON.stringify(pl.data))
                $scope.listasucursalempresa = pl.data;
                
            },
            function (errorPl) {
                console.log('failure loading sucursales', errorPl);
            });
        }
        
        
        
    }


})