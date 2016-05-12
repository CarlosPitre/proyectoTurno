app.controller('recurrenteController', function ($scope,listareservaService,empleadoService,reservarService,misclienteService) {
	
	$scope.Idsucursal = session.getIdsucursal();
	$scope.listaserviciosucursal = [];
	$scope.date = new Date();
	$scope.fecha;
    $scope.hora;
    $scope.idCliente;
    $scope.reserva = [];
    $scope.entro;
    $scope.cliente = {}
    $scope.idCliente;
    $scope.meses = [];
    $scope.tiempo = {
        minutos:""
    }
	$scope.open = true;
	$scope.title = "Registrar Cliente";
    $scope.Reserva = {
        fecha: "",
        hora:  ""
    }
    misclientes();

    cargarmeses();

    function cargarmeses(){
    	$scope.meses = [
    			{id: 1, value: 1},
    			{id: 2, value: 2},
    			{id: 3, value: 3},
    			{id: 4, value: 4},
    			{id: 5, value: 5},
    			{id: 6, value: 6},
    			{id: 7, value: 7},
    			{id: 8, value: 8},
    			{id: 9, value: 9},
    			{id: 10, value: 10},
    			{id: 11, value: 11},
    			{id: 12, value: 12},
    		]
    }

	listaservicioempresa();

	function listaservicioempresa(){
        var promiseGet = empleadoService.getserviciosucursal(session.getIdsucursal()); 
        promiseGet.then(function (pl) {
            $scope.listaserviciosucursal = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
    }

    $scope.getempleadosdisponibles = function(){
    	$scope.fecha = document.getElementsByName('fecha')[0].value;
        $scope.hora = $scope.tiempo.minutos;
        var id = document.getElementsByName('servicios')[0].value;
        //alert($scope.fecha+" "+$scope.hora+" "+id+" "+valor);
        var promiseGet = reservarService.empleadosdisponibles(id,$scope.Idsucursal,
                    $scope.fecha,$scope.hora,1); 
        promiseGet.then(function (pl) {
            $scope.reserva = pl.data;
            //alert(JSON.stringify($scope.reserva));
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

    $scope.buscarcliente = function(){
       /* var correo = document.getElementsByName('correo')[0].value;
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
        });*/
        
        if ($scope.open == true){
	        $scope.open = false;
	        $scope.title = "Listado Cliente";
        }else{
        	$scope.open = true;
	        $scope.title = "Registrar Cliente";
        }
        
    }

    $scope.registrarse = function(){


            var object = {
                "email":        document.getElementsByName('email')[0].value,
                "nombres":      document.getElementsByName('nombres')[0].value,
                "apellidos":    document.getElementsByName('apellidos')[0].value,
                "telefono":     document.getElementsByName('celular')[0].value,
                "pass":         123456789,//document.getElementsByName('passadmin')[0].value,
            };

            var promisePost = listareservaService.postcliente(object);

                promisePost.then(function (d) {

                    //document.getElementsByName('correo')[0].value = document.getElementsByName('email')[0].value;
                    toastr.success(d.data.msg)
                    $scope.postreservar(d.data.idCliente)

                        
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

    $scope.postreservar = function(idCliente){
        //alert(JSON.stringify(reserva))
        var object = {
        	idSucursal:   $scope.Idsucursal,
            idServicio:   document.getElementsByName('servicios')[0].value,
            idCliente:    idCliente,
            idEmpleado:   $scope.idEmpleado,
            horaReserva:  $scope.hora,
            fechaReserva: document.getElementsByName('fecha')[0].value,
            cupos:        1,
            meses: 		  document.getElementsByName('meses')[0].value,
            rango: 		  document.getElementsByName('rango')[0].value	 
        }
        //alert(JSON.stringify(object))
        var promisePost = reservarService.postreservarecurrente(object);

        promisePost.then(function (d) {

            toastr.success(d.data.msg);
            $('#myModal1').modal('hide');
            //$scope.getempleadosdisponibles();
            //$scope.getempleadosdisponibles();
            $scope.reserva = [];
                
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
    
    function misclientes(){
	        var promiseGet = misclienteService.getmisclientes($scope.Idsucursal);
	        promiseGet.then(function (pl) {
	            if(pl.data != null){
	            	$scope.misClientes = pl.data;
	            	//crearNgTabla();
	            }
	        },
	        function (errorPl) {
	            console.log('failure loading search', errorPl);
	        });
	    }

})