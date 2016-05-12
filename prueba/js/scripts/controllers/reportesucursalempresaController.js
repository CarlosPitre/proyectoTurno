app.controller('reportesucursalempresaController', function ($scope,listasucursalesreporteService) {

	$scope.idempresa = session.getIdempresa()
	$scope.totalempresa;
	

	$scope.predicate = 'name';  
    $scope.reverse = true;  
    $scope.currentPage = 1; 

    var d = new Date(); 
    $scope.CurrentDate = new Date();
    var fentrega = d.getFullYear() + "-" + (d.getMonth() +1) + "-" + d.getDate();


    //$scope.totalItems = $scope.listasucursalempresa.length;
    
    $scope.numPerPage = 10;

    $scope.paginate = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.listasucursalempresa.indexOf(value);  
        return (begin <= index && index < end);  
    };

    $scope.buscar = function(){
        var fechainicial = document.getElementsByName('start')[0].value;
        var fechafinal = document.getElementsByName('end')[0].value;
        listasucursal(fechainicial,fechafinal)
    }


    var arraymoney = Array() 
	function listasucursal(fechainicial,fechafinal){
		var promiseGet = listasucursalesreporteService.contabilidadsucursal($scope.idempresa,fechainicial,fechafinal); 
        promiseGet.then(function (pl) {
            //$scope.listasucursal = pl.data;
            //console.log(pl.data);
            //alert(JSON.stringify(pl.data))
            $scope.listasucursalempresa = pl.data;
            $scope.totalItems = $scope.listasucursalempresa.length;
            for(var i=0;i<pl.data.length;i++){
                arraymoney.push(pl.data[i].total)
            }
            var money = 0;
            for(var k=0;k<arraymoney.length;k++){
                money += arraymoney[k]
            }
            $scope.totalempresa = money
            
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
	}


})