app.controller('reservarController', function ($scope,$routeParams,reservarService,sectorService,sesionService) {

	$scope.idservicio = $routeParams.idservicio;
	$scope.idsucusal = $routeParams.idsucursal;
	$scope.sucursal = $routeParams.sucursal;
	$scope.sector = $routeParams.sectorid;
	$scope.cupos = {}
	$scope.reserva = [];
	$scope.fecha;
	$scope.hora;
	$scope.idcliente;
	$scope.date = new Date();
	getcliente();

	var i = -1;
    var toastCount = 0;
    var $toastlast;

	toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-center",
        "showDuration": "50000",
        "progressBar": true,
        "hideDuration": "50000",
    }

	function getcliente(){
		var promiseGet = sesionService.getclientebyemail(sessioncliente.getCorreo()); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data))
            $scope.idcliente = pl.data.id;
        },
        function (errorPl) {
            console.log('failure loading Perfiles', errorPl);
        }); 
	}

	$scope.Reserva = {
		fecha: "",
		hora:  ""
	}

	numeroscupos()
	/*
    * n¨²mero de cupos
    */
   
    function numeroscupos(){

        var promiseGet = sectorService.sectorcupos($scope.sector); 
        
        promiseGet.then(function (pl) {
            $scope.cupos = pl.data
            var cupo = pl.data.cupos
            var cupo1 = parseInt(cupo) + 1
            //alert(Number(cupo))
            for(var i=1;i<cupo1;i++){
                var val = document.getElementsByName("numcupos"+i)[0];
                val.innerHTML = ""
                for(var j=1;j<cupo1;j++){
                    val.innerHTML += "<option value='"+j+"'>"+j+"</option>"
                }
            }
            
        },
        function (errorPl) {
            console.log('failure loading perfil', errorPl);
        });

    }

    $scope.tiempo = {
        minutos:""
    }

    $scope.getempleadosdisponibles = function(){
    	$scope.fecha = document.getElementsByName('fecha')[0].value;
    	$scope.hora = $scope.tiempo.minutos;
    	//alert($scope.fecha+" "+$scope.hora)
		var promiseGet = reservarService.empleadosdisponibles($scope.idservicio,$scope.idsucusal,
					$scope.fecha,$scope.hora,valor); 
        promiseGet.then(function (pl) {
        	//alert(JSON.stringify(pl.data));
        	$scope.reserva = pl.data;
        },
        function (errorPl) {
            console.log('failure loading perfil', errorPl);
        });
	}

	var valor = 1;
    $scope.valor = function(index){
        //alert(document.getElementsByName('numcupos'+index)[0].value) 
        valor = document.getElementsByName('numcupos'+index)[0].value
        //alert(valor)
    }

    $scope.postreservar = function(reserva){
    	//alert(JSON.stringify(reserva))
    	var object = {
    		idServicio:   $scope.idservicio,
    		idSucursal:   $scope.idsucusal,
    		idCliente:    $scope.idcliente,
    		idEmpleado:   reserva.id,
    		fechaReserva: $scope.fecha,
    		horaReserva:  $scope.hora,
    		cupos:        valor 
    	}
    	//alert(JSON.stringify(object))
    	var promisePost = reservarService.postreserva(object);

        promisePost.then(function (d) {

            toastr.success(d.data.msg);
            //$scope.getempleadosdisponibles();
                
        }, function (err) {

            if(err.status == 401){
                alert(err.data.msg);
                console.log(err.data.exception);

            }else{

                alert("Error Al procesar Solicitud");

            }

            console.log("Some Error Occured "+ JSON.stringify(err));
        });

    }

})
