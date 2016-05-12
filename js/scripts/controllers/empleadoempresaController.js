app.controller('empleadoempresaController', function ($scope, empleadoempresaService,empleadoService) {

	$scope.idempresa = session.getIdempresa();
	$scope.sucursales = [];
	$scope.verdad = false;
	$scope.listacheck = [];
	$scope.Empleado = [];
    $scope.boton = false;
	var idempleado;
	getsucursales()
	listaempleados()

    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-center",
        "showDuration": "50000",
        "progressBar": true,
        "hideDuration": "50000",
    }

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

	function getsucursales(){
		var promiseGet = empleadoempresaService.listadesucursales($scope.idempresa); 
        promiseGet.then(function (pl) {
        	$scope.sucursales = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
	}

	$scope.buscar = function(){
		var id = document.getElementsByName('empresaid')[0].value;
		listaservicioempresa(id)
	}

	function listaservicioempresa(id){
        var promiseGet = empleadoService.getserviciosucursal(id); 
        promiseGet.then(function (pl) {
            $scope.listaserviciosucursal = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
    }

    function listaempleados(id){
        var promiseGet = empleadoempresaService.empleadobyempresa($scope.idempresa); 
        promiseGet.then(function (pl) {
        	//alert(JSON.stringify(pl.data))
            $scope.Empleado = pl.data;
            $scope.totalItems = $scope.Empleado.length;
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
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
                    "idSucursal":       document.getElementsByName('empresaid')[0].value,
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

                        
                        toastr.success(d.data.msg)

                        document.getElementsByName('identificacion')[0].value = "";
                        document.getElementsByName('email')[0].value = "";
                        document.getElementsByName('nombres')[0].value = "";
                        document.getElementsByName('apellidos')[0].value = "";
                        document.getElementsByName('identificacion')[0].value = "";
                        document.getElementsByName('telefono')[0].value = "";
                        document.getElementsByName('contrasena')[0].value = "";
                        document.getElementsByName('contrasena1')[0].value = "";
                        //location.reload();
                        listaempleados();
                        
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

    $scope.get = function(empleado,lista){
        $scope.verdad = true;
        $scope.boton = true;
        $scope.getempleado = empleado;
        //alert(JSON.stringify($scope.getempleado.id))
        document.getElementsByName('identificacion')[0].value = $scope.getempleado.identificacion;
        document.getElementsByName('email')[0].value = $scope.getempleado.email;
        document.getElementsByName('nombres')[0].value = $scope.getempleado.nombres;
        document.getElementsByName('apellidos')[0].value = $scope.getempleado.apellidos;
        document.getElementsByName('telefono')[0].value = $scope.getempleado.telefono;
        document.getElementsByName('contrasena')[0].disabled = true;
        document.getElementsByName('contrasena1')[0].disabled = true;
        idempleado = $scope.getempleado.id;
        $scope.listaserviciosucursal2($scope.getempleado.id,lista.id);
        var promiseGet = empleadoService.empleadosucursal($scope.getempleado.id)
        promiseGet.then(function (pl) {
            angular.forEach(pl.data, function(value, key) {
                document.getElementsByName('empresaid')[0].value = value.idSucursal
            });
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
        

    }

    $scope.listaserviciosucursal2 = function(idempleado,idsucursal){
        var promiseGet = empleadoService.getserviciosucursal(idsucursal); 
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
            "idSucursal":       document.getElementsByName('empresaid')[0].value
        }; 
        //alert(JSON.stringify(object)+" "+idempleado)
        var promisePut  = empleadoService.putempleado(idempleado, object);
        
        promisePut.then(function (d) {

            //toastr.success(d.data.msg)
            eliminar(idempleado)
            

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

    function eliminar(idempleado){
        var promisedelete  = empleadoempresaService.eliminarservicios(idempleado);        
        promisedelete.then(function (d) {                              
            agregarserviciosempleados(idempleado)
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
            listaempleados();
                
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

    $scope.nuevoempleado = function(){
    	document.getElementsByName('identificacion')[0].value = ""
        document.getElementsByName('email')[0].value = ""
        document.getElementsByName('nombres')[0].value = ""
        document.getElementsByName('apellidos')[0].value = ""
        document.getElementsByName('telefono')[0].value = ""
        document.getElementsByName('contrasena')[0].disabled = false;
        document.getElementsByName('contrasena1')[0].disabled = false;
        $scope.verdad = false;
        $scope.boton = false;
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

            listaempleados()
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

            listaempleados()
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

})