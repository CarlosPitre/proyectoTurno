app.controller('listareservaController', function ($scope,listareservaService,empleadoService,reservarService) {

	$scope.date = new Date();
    $scope.Idsucursal = session.getIdsucursal();
	$scope.listaserviciosucursal = [];
	$scope.servicio;
	$scope.idservicio;
	$scope.fecha;
    $scope.hora;
	$scope.reserva = [];
    $scope.entro;
    $scope.cliente = {};
    $scope.listaserviciosucursal = [];
    $scope.reserva = [];
    $scope.idEmpleado;
    $scope.idCliente;

    listaservicioempresa();
    getAllEmpleado()

    $scope.tiempo = {
        minutos:""
    }

    $scope.Reserva = {
        fecha: "",
        hora:  ""
    }

    var toastCount = 0;
    var $toastlast;

    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-center",
        "showDuration": "50000",
        "progressBar": true,
        "hideDuration": "50000",
    }

    $scope.buscarcliente = function(){
        var correo = document.getElementsByName('correo')[0].value;
        var promiseGet = listareservaService.getclienteemail(correo); 
        promiseGet.then(function (pl) {
            if(pl.data != null){
                $scope.entro = true;
                $scope.cliente = pl.data;
                $scope.idCliente = pl.data.id;
                //alert(JSON.stringify(pl.data))
            }
        },
        function (errorPl) {
            $scope.entro = false;
            console.log('failure loading search', errorPl);
        });
    }


    $scope.registrarse = function(){

        if(document.getElementsByName('passadmin')[0].value != 
            document.getElementsByName('passadmin1')[0].value){
            toastr.success("Error las contraseñas no coinciden")
        }else{

            var object = {
                "email":        document.getElementsByName('email')[0].value,
                "nombres":      document.getElementsByName('nombres')[0].value,
                "apellidos":    document.getElementsByName('apellidos')[0].value,
                "telefono":     document.getElementsByName('celular')[0].value,
                "pass":         document.getElementsByName('passadmin')[0].value,
            };

            var promisePost = listareservaService.postcliente(object);

                promisePost.then(function (d) {

                    document.getElementsByName('correo')[0].value = document.getElementsByName('email')[0].value;
                    toastr.success(d.data.msg)
                        
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

    }

    $scope.postreservar = function(){
        //alert(JSON.stringify(reserva))
        var object = {
            idServicio:   document.getElementsByName('servicios')[0].value,
            idSucursal:   $scope.Idsucursal,
            idCliente:    $scope.idCliente,
            idEmpleado:   $scope.idEmpleado,
            fechaReserva: document.getElementsByName('fecha')[0].value,
            horaReserva:  $scope.hora,
            cupos:        1 
        }
        //alert(JSON.stringify(object))
        var promisePost = reservarService.postreserva(object);

        promisePost.then(function (d) {

            toastr.success(d.data.msg);
            $('#myModal1').modal('hide');
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

    function listaservicioempresa(){
        var promiseGet = empleadoService.getserviciosucursal(session.getIdsucursal()); 
        promiseGet.then(function (pl) {
            $scope.listaserviciosucursal = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
    }

    function getAllEmpleado(){
        var promiseGet = empleadoService.getempleadobysucursal(session.getIdsucursal()); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data))
            $scope.Empleado = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
    }

    $scope.getempleadosdisponibles = function(){
        $scope.fecha = document.getElementsByName('fecha')[0].value;
        $scope.hora = $scope.tiempo.minutos;
        var id = document.getElementsByName('servicios')[0].value;
        // alert($scope.fecha+" "+$scope.hora)
        var promiseGet = reservarService.empleadosdisponibles(id,$scope.Idsucursal,
                    $scope.fecha,$scope.hora,valor); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data));
            $scope.reserva = pl.data;
        },
        function (errorPl) {
            console.log('failure loading perfil', errorPl);
        });
    }

    $scope.modal = function(reserva){
        $scope.idEmpleado = reserva.id;
        $('#myModal').modal('show');
    }


    $scope.modalbuscar = function(){
        $('#myModal').modal('hide');
        $('#myModal1').modal('show');
    }

	//listaservicioempresa();

	/*function listaservicioempresa(){
        var promiseGet = empleadoService.getserviciosucursal(session.getIdsucursal()); 
        promiseGet.then(function (pl) {
            $scope.listaserviciosucursal = pl.data;
            $scope.idservicio = pl.data[0].idServicio;
            $scope.getreservasdisponibles()
            setInterval(function(){
            	$scope.getreservasdisponibles()
        	},30000)
            
            
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
    }

    $scope.getreservasdisponibles = function(){
    	$scope.servicio = document.getElementsByName('servicios')[0].value;
    	$scope.fecha = document.getElementsByName('fecha')[0].value;
    	if($scope.servicio == ""){
    		$scope.servicio  = $scope.idservicio;
    	}
    	//alert($scope.servicio+' '+$scope.fecha+' '+session.getIdsucursal())
    	var promiseGet = listareservaService.getreservadisponible(session.getIdsucursal(),$scope.servicio,$scope.fecha); 
        promiseGet.then(function (pl) {
        	$scope.reserva = pl.data;
            //alert(JSON.stringify(pl.data))
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
    }*/

})