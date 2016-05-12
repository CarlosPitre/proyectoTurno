app.controller('reporteempresasController', function ($scope,$routeParams,reporteempresasService,empresaService) {

	$scope.idEmpresa = $routeParams.idempresa;
	$scope.torta = [];
	$scope.nombreempresa = {}
	$scope.title = "Reporte de empresas por turnos terminados"
	$scope.title1 = "Contabilidad de la empresa"
	$scope.turnosucursal = []
	$scope.contabilidad = []
	$scope.totalempresa
	$scope.signo
	$scope.grafo = false;

	getempresa();

	$scope.buscar = function(){

        var fechainicial = document.getElementsByName('start')[0].value;
        var fechafinal = document.getElementsByName('end')[0].value;
        $scope.grafo = true;
        reportetorta(fechainicial,fechafinal)
        contabilidadempresa(fechainicial,fechafinal)
    }

    function getempresa(){
        var promiseGet = empresaService.getempresaid($scope.idEmpresa); 
        promiseGet.then(function (pl) {
            $scope.nombreempresa = pl.data.razonSocial

        },
        function (errorPl) {
            console.log('failure loading reporte', errorPl);
        });
    }
	var arraymoney = Array() 
    function contabilidadempresa(fechainicial,fechafinal){
        var promiseGet = reporteempresasService.getcontabillidadempresa($scope.idEmpresa,fechainicial,fechafinal); 
        promiseGet.then(function (pl) {
            $scope.contabilidad = pl.data
            var tabla = document.getElementById('tabla')
            tabla.innerHTML = ""
            for(var i=0;i<pl.data.length;i++){
            	//alert(JSON.stringify(pl.data[i].sucursal))
            	for(var j=0;j<pl.data[i].sucursal.length;j++){
            		tabla.innerHTML += "<tr><td>"+pl.data[i].nombre+"</td>"+
            				"<td>"+pl.data[i].sucursal[j].nombres+" "+pl.data[i].sucursal[j].apellidos+"</td>"+
            				"<td>"+pl.data[i].sucursal[j].servicio+"</td>"+
            				"<td>"+pl.data[i].sucursal[j].fechaSolicitud+"</td>"+
            				"<td>"+pl.data[i].sucursal[j].suma+"</td>"
            				"</tr>"
            		$scope.signo = "Total: $"
            		arraymoney.push(pl.data[i].sucursal[j].suma)
            	}
            }
            var money = 0;
            for(var k=0;k<arraymoney.length;k++){
            	money += arraymoney[k]
            }
            $scope.totalempresa = money
        },
        function (errorPl) {
            console.log('failure loading reporte', errorPl);
        });
    }

	
	function reportetorta(fechainicial,fechafinal){

		var data = {};
        var sites = [];
		var promiseGet = reporteempresasService.getreporteempresa($scope.idEmpresa,fechainicial,fechafinal);
		promiseGet.then(function (pl) {
			var divempr = document.getElementById('empresa')
			divempr.innerHTML = "";
			for(var i=0;i<pl.data.length;i++){
				for(var j=0;j<pl.data[i].turno.length;j++){
					sites.push(pl.data[i].turno[j].nombre);
					data[pl.data[i].turno[j].nombre] = pl.data[i].turno[j].contador
					divempr.innerHTML += "<div class='col-md-5'><h4>"+pl.data[i].turno[j].nombre+
								": <strong>"+pl.data[i].turno[j].contador+" Turnos</strong></h4></div>"
				}
			}

			chart = c3.generate({
                data: {
                    json: [ data ],
                    keys: {
                        value: sites,
                    },
                    type:'pie'
                },
            }); 

		},
		function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        })
	}


})