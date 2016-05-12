app.controller('empleadoController', function ($scope, empleadoService,sucursalService) {

	$scope.title = "Registrar Empleados";

	$scope.Idsucursal = session.getIdsucursal();

	$scope.Empleado = [];
	$scope.idempresa = session.getIdempresa()
    $scope.getempleado = {}
    $scope.listaserviciosucursal = []
    $scope.listacheck = []
    $scope.verdad = false;
    $scope.empleadoinactivar = {}
    $scope.empleadoactivar = {}

	$scope.predicate = 'name';  
    $scope.reverse = true;  
    $scope.currentPage = 1; 

    $scope.order = function (predicate) {  
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
        $scope.predicate = predicate;  
    };   
    
    
    $scope.numPerPage = 10;

    $scope.paginate = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.Empleado.indexOf(value);  
        return (begin <= index && index < end);  
    };

	getAllEmpleado();
	listaservicioempresa();

	toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-center",
        "showDuration": "50000",
        "progressBar": true,
        "hideDuration": "50000",
    }

    function validar(){

        if(document.getElementsByName('identificacion')[0].value == "" || 
            document.getElementsByName('email')[0].value == "" || 
            document.getElementsByName('nombres')[0].value == "" || 
            document.getElementsByName('apellidos')[0].value == "" || 
            document.getElementsByName('telefono')[0].value == "" || 
            document.getElementsByName('contrasena')[0].value == "")
            return true;
        else
            return false;
        
    }


	$scope.registrarempleado = function(){
        if(validar()){
            toastr.success("Todos los campos son obligatorios")
        }else{

            if(document.getElementsByName('contrasena')[0].value != document.getElementsByName('contrasena1')[0].value){
                toastr.success("Contraseñas no coinciden")
            }else{
                var object = {
                    "idSucursal":       session.getIdsucursal(),
                    "identificacion":   document.getElementsByName('identificacion')[0].value,
                    "email":            document.getElementsByName('email')[0].value,
                    "nombres":          document.getElementsByName('nombres')[0].value,
                    "apellidos":        document.getElementsByName('apellidos')[0].value,
                    "telefono":         document.getElementsByName('telefono')[0].value,
                    "pass":             document.getElementsByName('contrasena')[0].value,
                    "servicios":        $scope.listacheck
                };
                //alert(JSON.stringify(object))
                var promisePost = empleadoService.postempleado(object);

                promisePost.then(function (d) {

                        //alert(d.data.msg);
                        getAllEmpleado(); 
                        toastr.success(d.data.msg)

                        //maximoid();
                        
                        document.getElementsByName('identificacion')[0].value = "";
                        document.getElementsByName('email')[0].value = "";
                        document.getElementsByName('nombres')[0].value = "";
                        document.getElementsByName('apellidos')[0].value = "";
                        document.getElementsByName('identificacion')[0].value = "";
                        document.getElementsByName('telefono')[0].value = "";
                        document.getElementsByName('contrasena')[0].value = "";
                        document.getElementsByName('contrasena1')[0].value = "";
                        //location.reload();
                        
                        
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
		
	}

	function getAllEmpleado(){
		var promiseGet = empleadoService.getempleadobysucursal(session.getIdsucursal()); 
        promiseGet.then(function (pl) {
        	//alert(JSON.stringify(pl.data))
            $scope.Empleado = pl.data;
            $scope.totalItems = $scope.Empleado.length;
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
	}

	

    function listaservicioempresa(){
        var promiseGet = empleadoService.getserviciosucursal(session.getIdsucursal()); 
        promiseGet.then(function (pl) {
            $scope.listaserviciosucursal = pl.data;
            //alert(JSON.stringify($scope.listaserviciosucursal))
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
    }

    $scope.agregarservicios = function(servis,$event){
        //alert(JSON.stringify(servis))
        if($event.currentTarget.checked){
            $scope.listacheck.push(servis);
            //alert(JSON.stringify($scope.listacheck))
        }else{
            var temp = angular.copy($scope.listacheck);
            $scope.listacheck = [];
            for(var i=0;i<temp.length;i++){
                if(temp[i].id != servis.id){
                    $scope.listacheck.push(temp[i]);
                    //alert(JSON.stringify($scope.listacheck))
                }
            }
        }
    }

    function maximoid(){
        var promiseGet = empleadoService.maxidempleado(); 
        promiseGet.then(function (pl) {
            idmax = pl.data;
            agregarserviciosempleados(idmax)
        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });
    };

    function eliminar(id){
        var promisedelete  = empleadoService.eliminar(id);        
        promisedelete.then(function (d) {                              
            
        }, function (err) {                         
            console.log("Some Error Occured "+ JSON.stringify(err));
        });
    }

    function agregarserviciosempleados(idempleado){
        var list = document.getElementById("items");
        for(var i=0; i<list.length; i++){
            if(list[i].checked){
                //alert(list[i].value)
                var object = {
                    idEmpleado:         idempleado, 
                    idServicio:         list[i].value   
                };
                //alert(JSON.stringify(object))
                var promisePost = empleadoService.postserviciosempleado(object);
            }
        }

        promisePost.then(function (d) {

            toastr.success(d.data.msg)
            getAllEmpleado();
                
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

    var idempleado;

    $scope.get = function(empleado){
        $scope.verdad = true;
        $scope.getempleado = empleado;
        //alert(JSON.stringify($scope.getempleado.identificacion))
        document.getElementsByName('identificacion')[0].value = $scope.getempleado.identificacion;
        document.getElementsByName('email')[0].value = $scope.getempleado.email;
        document.getElementsByName('nombres')[0].value = $scope.getempleado.nombres;
        document.getElementsByName('apellidos')[0].value = $scope.getempleado.apellidos;
        document.getElementsByName('telefono')[0].value = $scope.getempleado.telefono;
        document.getElementsByName('contrasena')[0].disabled = true;
        document.getElementsByName('contrasena1')[0].disabled = true;
        idempleado = $scope.getempleado.id;
        $scope.listaserviciosucursal2($scope.getempleado.id);

    }

    $scope.listaserviciosucursal2 = function(idempleado){
        var promiseGet = empleadoService.getserviciosucursal(session.getIdsucursal()); 
        promiseGet.then(function (pl) {
            
            var promiseGet1 = empleadoService.getservicioxempleado(idempleado); 
            promiseGet1.then(function (pl1) {
                
                var check = false;
                var lista = document.getElementById("items");
                lista.innerHTML = "";
                for(var i=0;i<pl.data.length;i++){
                    for(var j=0;j<pl1.data.length;j++){
                        if(pl.data[i].idServicio == pl1.data[j].idServicio){
                            check=true;
                            break;
                        }
                    }
                    if(check){
                        $scope.verdad = true;
                        lista.innerHTML += "<div class='col-xs-6'><label><input type='checkbox' id='"+pl.data[i].idServicio+
                        "' value='"+pl.data[i].idServicio+"' checked='checked'/>"+pl.data[i].servicio+"</label></div>"
                    }else{
                        $scope.verdad = true;
                        lista.innerHTML += "<div class='col-xs-6'><label><input type='checkbox' id='"+pl.data[i].idServicio+
                        "' value='"+pl.data[i].idServicio+"'/>"+pl.data[i].servicio+"</label></div>"
                    }
                        check=false;
                }
                
            },
            function (errorPl) {
                console.log('failure loading Empleados', errorPl);
            });


        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
    }

    $scope.putEmpleado  = function(){
        var object = {
            "identificacion":   document.getElementsByName('identificacion')[0].value,
            "email":            document.getElementsByName('email')[0].value,
            "nombres":          document.getElementsByName('nombres')[0].value,
            "apellidos":        document.getElementsByName('apellidos')[0].value,
            "telefono":         document.getElementsByName('telefono')[0].value,
            "idSucursal":       $scope.Idsucursal
        }; 
        //alert(JSON.stringify(object))
        var promisePut  = empleadoService.putempleado(idempleado, object);
        
        promisePut.then(function (d) {

            //toastr.success(d.data.msg)
            eliminar(idempleado)
            agregarserviciosempleados(idempleado)

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

    $scope.getestadoinactivo = function(empleado){
        $scope.empleadoinactivar = empleado;
        //alert(JSON.stringify($scope.empleadoinactivar));
        $('#myModal').modal('show');
    }

    $scope.getestadoactivar = function(empleado){
        $scope.empleadoactivar = empleado;
        //alert(JSON.stringify($scope.empleadoinactivar));
        $('#myModal1').modal('show');
    }

    $scope.putEstadoEmpleado  = function(){
        var object = {
            "estado":   "INACTIVO"
        }; 
        var promisePut  = empleadoService.putempleadoestado($scope.empleadoinactivar.id, object);
        
        promisePut.then(function (d) {

            getAllEmpleado()
            $('#myModal').modal('hide');

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

    $scope.putEstadoEmpleado2  = function(){
        var object = {
            "estado":   "ACTIVO"
        }; 
        var promisePut  = empleadoService.putempleadoestado($scope.empleadoactivar.id, object);
        
        promisePut.then(function (d) {

            getAllEmpleado()
            $('#myModal1').modal('hide');

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

    

});