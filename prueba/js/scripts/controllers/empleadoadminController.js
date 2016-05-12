app.controller('empleadoadminController', function ($scope,ngTableParams,$filter,empleadoadminService,empleadoService,sucursalesService,sucursalService) {

	$scope.empresas = []
	$scope.sucursal = []
	$scope.sucursal2 = []
	$scope.selecion = false;
	$scope.selecion2 = false;
	$scope.boton = false;
	$scope.servicios = []
	$scope.listacheck = []
	$scope.empleadoactivos = []
	$scope.verdad = false;
        crearNgTabla(); 
	getallempleados()
	getEmpresas()
	//listaservicioempresa()
   
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
        index = $scope.empleadoactivos.indexOf(value);  
        return (begin <= index && index < end);  
    };

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
                    "idSucursal":       document.getElementsByName('idsucu')[0].value,
                    "identificacion":   document.getElementsByName('identificacion')[0].value,
                    "email":            document.getElementsByName('email')[0].value,
                    "nombres":          document.getElementsByName('nombres')[0].value,
                    "apellidos":        document.getElementsByName('apellidos')[0].value,
                    "telefono":         document.getElementsByName('telefono')[0].value,
                    "pass":             document.getElementsByName('contrasena')[0].value
                    //"servicios":        $scope.listacheck
                };
                
                var promisePost = empleadoadminService.postempleadoadmin(object);

                promisePost.then(function (d) {

                        
                        toastr.success(d.data.msg)

                        maxempleado()
                        getallempleados()
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

	function getEmpresas(){
		var promiseGet = empleadoadminService.getempresaactivas(); 
        promiseGet.then(function (pl) {
        	$scope.empresas = pl.data;

        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
	}

	$scope.buscar = function(){
		//$scope.selecion = false;
		$scope.selecion2 = false;
		var id = document.getElementsByName('empresaid')[0].value;
		getsucursal(id)
		//listaservicioempresa(id)
	}

	
	$scope.buscarsucu = function(){
		var idsucu = document.getElementsByName('idsucu')[0].value;
		listaservicioempresa(idsucu)
	}
	

	function getsucursal(id){
		var promiseGet = empleadoadminService.getsucursalempresa(id); 
        promiseGet.then(function (pl) {
        	$scope.sucursal = pl.data;
        	$scope.selecion = true
			//listaservicioempresa()
            //$scope.sucursal = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
	}

	function getallempleados(){
		var promiseGet = empleadoadminService.getallempleados(); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data))
        	$scope.empleadoactivos = pl.data;
        	$scope.totalItems = $scope.empleadoactivos.length;
                crearNgTabla()
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
	}

        function crearNgTabla(){
        self = this;
        data = $scope.empleadoactivos;
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: undefined
        }, { 
            total: $scope.empleadoactivos,
            getData: function (a, b) {
                var c = b.sorting ?
                        $filter('orderBy')($scope.empleadoactivos, b.orderBy()) :
                        $scope.empleadoactivos;
                c = b.filter() ?
                        $filter('filter')(c, b.filter()) :
                        c;
                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
                b.total(c.length);
                a.resolve($scope.usuario);
            }
        });
    }  

	function listaservicioempresa(idsucu){
        var promiseGet = empleadoadminService.serviciossucursal(idsucu); 
        promiseGet.then(function (pl) {
        	var lista = document.getElementById("items");
                lista.innerHTML = "";
            
                //alert(JSON.stringify(pl.data[i].servicio))
                for(var j=0;j<pl.data.length;j++){
                    lista.innerHTML += "<div><label>"+"<input type='checkbox' value='"+pl.data[j].idServicio+"'"+ 
                   "name='servisucur'>"+pl.data[j].servicio+"</label></div>"
                    //alert(JSON.stringify(pl.data[i].servicio[j].nombre))
                }
            
        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });
    }

    function listaservicioempresaupdate(idempresa){
        var promiseGet = empleadoadminService.getserviciosempresa(idempresa); 
        promiseGet.then(function (pl) {
        	//alert(JSON.stringify(pl.data))
        	var lista = document.getElementById("idservis");
                lista.innerHTML = "";
            for(var i=0;i<pl.data.length;i++){
                //alert(JSON.stringify(pl.data[i].servicio))
                for(var j=0;j<pl.data[i].servicio.length;j++){
                    lista.innerHTML += "<div><label>"+"<input type='checkbox' value='"+pl.data[i].servicio[j].idServicio+"'"+ 
                   "name='servisucur'>"+pl.data[i].servicio[j].nombre+"</label></div>"
                    //alert(JSON.stringify(pl.data[i].servicio[j].nombre))
                }
            }
        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });
    }

    function maxempleado(){
		var promiseGet = empleadoadminService.idultimoempleado(); 
        promiseGet.then(function (pl) {
        	var idempleado = pl.data;
        	agregarserviciosempleados(idempleado)
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
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
    var idempl;
    $scope.get = function(empleado){
        $scope.verdad = true;
        $scope.boton = true;
        $scope.selecion2 = true;
        $scope.selecion = false;
        $scope.getempleado = empleado;
        idempl = $scope.getempleado.id
        //alert(JSON.stringify($scope.getempleado.identificacion))
        document.getElementsByName('identificacion')[0].value = $scope.getempleado.identificacion;
        document.getElementsByName('email')[0].value = $scope.getempleado.email;
        document.getElementsByName('nombres')[0].value = $scope.getempleado.nombres;
        document.getElementsByName('apellidos')[0].value = $scope.getempleado.apellidos;
        document.getElementsByName('telefono')[0].value = $scope.getempleado.telefono;
        document.getElementsByName('contrasena')[0].disabled = true;
        document.getElementsByName('contrasena1')[0].disabled = true;
        document.getElementsByName('empresaid')[0].disabled = true;
        //document.getElementsByName('identificacion')[0].disabled = true;

        document.getElementsByName('empresaid')[0].value = $scope.getempleado.idempresa;

        $scope.listaserviciosucursal2($scope.getempleado.idsucursal,$scope.getempleado.id)

        var promiseGet = empleadoadminService.getsucursalempresa($scope.getempleado.idempresa) 
        promiseGet.then(function (pl) {
        	var mun = document.getElementsByName('idsucu2')[0];
            mun.innerHTML = "";
        	for(var i=0;i<pl.data.length;i++){
        		//alert(JSON.stringify(pl.data[i].nombre))
        		mun.innerHTML += "<option value='"+pl.data[i].id+"'>"+pl.data[i].nombre+"</option>"
        	}
        	document.getElementsByName('idsucu2')[0].value = $scope.getempleado.idsucursal
        	//document.getElementsByName('idsucu2')[0].disabled = true;
        
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });


    }

    $scope.listaserviciosucursal2 = function(id,idempleado){
    	var promiseGet = empleadoService.getserviciosucursal(id); 
        promiseGet.then(function (pl) {
            
            var promiseGet1 = empleadoService.getservicioxempleado(idempleado); 
            promiseGet1.then(function (pl1) {
                
                var check = false;
                var lista = document.getElementById("idservis");
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
                        lista.innerHTML += "<div><label><input type='checkbox' id='"+pl.data[i].idServicio+
                        "' value='"+pl.data[i].idServicio+"' checked='checked'/>"+pl.data[i].servicio+"</label></div>"
                    }else{
                        $scope.verdad = true;
                        lista.innerHTML += "<div><label><input type='checkbox' id='"+pl.data[i].idServicio+
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

    $scope.putEmpleado = function(){
    	var object = {
            "identificacion":   document.getElementsByName('identificacion')[0].value,
			"email":  			document.getElementsByName('email')[0].value,
			"nombres": 			document.getElementsByName('nombres')[0].value,
			"apellidos":  		document.getElementsByName('apellidos')[0].value,
			"telefono": 		document.getElementsByName('telefono')[0].value,
            "idSucursal":       document.getElementsByName('idsucu2')[0].value
		};

		var promisePut = empleadoadminService.putempleado(idempl,object);

			promisePut.then(function (d) {

	            eliminar(idempl) 
                getallempleados()   
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

   
	function eliminar(id){
        var promisedelete  = empleadoadminService.deleteservicioempleado(id);        
        promisedelete.then(function (d) {                              
            guardarlistatiposucursal(id)
        }, function (err) {                         
            console.log("Some Error Occured "+ JSON.stringify(err));
        });
    }

    function guardarlistatiposucursal(id){
        var list = document.getElementById("idservis");
        //alert(list[0])
        for(var i=0; i<list.length; i++){
            if(list[i].checked){
                //alert(JSON.stringify(list[i].value))
                var object = {
                    idEmpleado:         id, 
                    idServicio:        list[i].value   
                };
                //alert(JSON.stringify(object))
                var promisePost = empleadoadminService.postservicioempleado(object)
            }
        }

        promisePost.then(function (d) {

            //alert(d.data.msg);
                
        }, function (err) {

                if(err.status == 401){
                    //alert(err.data.msg);
                    console.log(err.data.exception);

                }else{

                    //alert("Error Al procesar Solicitud");

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
        document.getElementsByName('empresaid')[0].disabled = false;
        document.getElementsByName('identificacion')[0].disabled = false;
        document.getElementsByName('idsucu2')[0].disabled = false;
        $scope.verdad = false;
        $scope.boton = false;
    }

    /*$scope.agregarservicios = function(servis,$event){
        alert(JSON.stringify(servis))
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
    }*/

})

