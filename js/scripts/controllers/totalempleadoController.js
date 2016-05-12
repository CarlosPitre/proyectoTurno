app.controller('totalempleadoController', function ($scope,totalempleadoService) {

	$scope.total = []
	$scope.idsucursal = session.getIdsucursal()
	$scope.grafo = false;
	$scope.contabilidad = [];
	$scope.totalempleados

	$scope.buscar = function(){
		var fechainicial = document.getElementsByName('start')[0].value;
        var fechafinal = document.getElementsByName('end')[0].value;
        $scope.grafo = true;
        totalempleadoturno(fechainicial,fechafinal)
        tablacontabilidad(fechainicial,fechafinal)
	}

	function totalempleadoturno(fechainicial,fechafinal){
		var data = {};
        var sites = [];
		var promiseGet = totalempleadoService.totalempleado($scope.idsucursal,fechainicial,fechafinal); 
        promiseGet.then(function (pl) {
            $scope.total = pl.data
            if(pl.data == null){

            }else{
            	pl.data.forEach(function(e){
            		var empleado = e.nombres + ' ' + e.apellidos
                	sites.push(empleado);
                	data[empleado] = e.contador;
           		})

	            chart = c3.generate({
	                data: {
	                    json: [ data ],
	                    keys: {
	                        value: sites,
	                    },
	                    type:'pie'
	                },
	            });
            }
            
        },
        function (errorPl) {
            console.log('failure loading empleado', errorPl);
        });
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
            $scope.estadoespera = false;
            console.log('failure loading Empleados', errorPl);
        });
	}

})