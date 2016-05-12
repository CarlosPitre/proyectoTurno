app.controller('reportesucursalController', function ($scope,$routeParams,reportesucursalService) {

	
	$scope.idSucursa = $routeParams.idsucursal;
	$scope.title = "Reporte por turno solicitados"
    $scope.title1 = "Reporte de turno por servicios"
    $scope.reporte = []
    $scope.reporteservicio = []
    $scope.nombresucursal = {}
    $scope.date = {}
    $scope.grafo = false
    getsucursal()
    fechas()
    

    function getsucursal(){
        var promiseGet = reportesucursalService.getsucursal($scope.idSucursa); 
        promiseGet.then(function (pl) {
            $scope.nombresucursal = pl.data.nombre

        },
        function (errorPl) {
            console.log('failure loading reporte', errorPl);
        });
    }
    
    
    function fechas(){
        var d = new Date(); 
        var inicio = (d.getDate()) + "-" + (d.getMonth() +1) + "-" + d.getFullYear()
        document.getElementsByName('start')[0].value = inicio;
        document.getElementsByName('end')[0].value = inicio;
    }

    $scope.buscar = function(){

        var fechainicial = document.getElementsByName('start')[0].value;
        var fechafinal = document.getElementsByName('end')[0].value;
        $scope.grafo = true;
        index(fechainicial,fechafinal)
        turnosxserviciosterminado(fechainicial,fechafinal)
    }
	
    function index(fechainicial,fechafinal){
        var data = {};
        var sites = [];
        var colores = [];
        var promiseGet = reportesucursalService.getreportesucursales($scope.idSucursa,fechainicial,fechafinal); 
        promiseGet.then(function (pl) {
            $scope.reporte = pl.data;
            //alert(JSON.stringify(pl.data))
                

                var cadena = "{"
            pl.data.forEach(function(e){
                sites.push(e.estadoTurno);
                data[e.estadoTurno] = e.contador;
                cadena += '"'+e.estadoTurno+'" : "'+e.color+'",';
            })
            cadena = cadena.slice(0,-1);
            cadena += "}"
//alert(cadena);
            

                chart = c3.generate({
                    data: {
                        json: [ data ],
                        keys: {
                            value: sites,
                        },
                        colors: JSON.parse(cadena) ,
                        type:'pie'
                    },
                }); 

            

        },
        function (errorPl) {
            console.log('failure loading reporte', errorPl);
        });
        
    }

    function turnosxserviciosterminado(fechainicial,fechafinal){
        var data = {};
        var data1 = {}
        var sites = [];
        var total = [];
        var promiseGet = reportesucursalService.getreporteservicios($scope.idSucursa,fechainicial,fechafinal); 
        promiseGet.then(function (pl) {
            $scope.reporteservicio = pl.data;
            //alert(JSON.stringify(pl.data))
            var cadena = "{"
            pl.data.forEach(function(e){
                //$scope.nombresucursal = e.sucursal;
                sites.push(e.nombre);
                total.push(e.contador);
                data[e.nombre] = e.contador;
                cadena += '"'+e.nombre+'" : "'+e.contador+'",';
            })
            cadena = cadena.slice(0,-1);
            cadena += "}"
            chart1 = c3.generate({
                bindto: '#chart1',
                data: {
                    json: [ data ],
                    keys: {
                        value: sites,
                    },
                    type:'bar'
                },
                bar: {
                    width: {
                        ratio: 0.3
                    }
                }
            });
        },function (errorPl) {
            console.log('failure loading reporte', errorPl);
        })
    }

    

})