app.controller('listareservaController', function ($scope,ngTableParams,listareservaService,empleadoService,reservarService,misclienteService) {

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
		$scope.open = true;
		$scope.title = "Registrar Cliente";

    listaservicioempresa();
    getAllEmpleado();
    misclientes();

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
        /*var correo = document.getElementsByName('correo')[0].value;
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
$scope.postreservar(d.data.idCliente);

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
            idServicio:   document.getElementsByName('servicios')[0].value,
            idSucursal:   $scope.Idsucursal,
            idCliente:    idCliente,
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
        //alert("ser: "+id+" fec:"+$scope.fecha+" hor:"+$scope.hora+" sucu:"+$scope.Idsucursal);
        var promiseGet = reservarService.empleadosdisponibles(id,$scope.Idsucursal,
                    $scope.fecha,$scope.hora,1);
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

	    function crearNgTabla(){
	        self = this;
	        data = $scope.misClientes;
	        $scope.tableParams = new ngTableParams({
	            page: 1,
	            count: 10,
	            sorting: undefined
	        }, {
	            total: $scope.misClientes,
	            getData: function (a, b) {
	                var c = b.sorting ?
	                        $filter('orderBy')($scope.misClientes, b.orderBy()) :
	                        $scope.misClientes;
	                c = b.filter() ?
	                        $filter('filter')(c, b.filter()) :
	                        c;
	                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
	                b.total(c.length);
	                a.resolve($scope.usuario);
	            }
	        });
	    }

})