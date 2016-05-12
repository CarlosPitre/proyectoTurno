app.controller('sucursalreporteController', function ($scope,totalempleadoService) {

	$scope.contabilidad = [];
	$scope.idsucursal = session.getIdsucursal()
	$scope.totalempleados

	$scope.buscar = function(){
		var fechainicial = document.getElementsByName('start')[0].value;
        var fechafinal = document.getElementsByName('end')[0].value;
        tablacontabilidad(fechainicial,fechafinal)
	}

	var arraymoney = Array() 
	function tablacontabilidad(fechainicial,fechafinal){
        var promiseGet = totalempleadoService.contaempleado($scope.idsucursal,fechainicial,fechafinal); 
        promiseGet.then(function (pl) {
        	//alert(JSON.stringify(pl.data))
        	$scope.contabilidad = pl.data;
        	for(var i=0;i<pl.data.length;i++){
                arraymoney.push(pl.data[i].total)
            }
            var money = 0;
            for(var k=0;k<arraymoney.length;k++){
                money += arraymoney[k]
            }
            $scope.totalempleados = money
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
	}

})
