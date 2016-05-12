app.controller('empresaController', function ($scope,ngTableParams,$filter, empresaService,sectorService,listaempresaService) {

	$scope.title = "Registrar Empresa";
	$scope.logo = "Logo De La Empresa";
	$scope.perfil = {}
	$scope.maxid = {}
    $scope.listaSector = [];
    $scope.listacheck = [];
    var idmax = null;
    var d = new Date(); 
	var NI = d.getDate() + "" + (d.getMonth() +1) + "" + d.getFullYear() + '' +d.getHours()+''+d.getMinutes()+''+d.getSeconds();
	
    getAllSectores()

    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-center",
        "showDuration": "50000",
        "progressBar": true,
        "hideDuration": "50000",
    }

    function soloNumeros(e){
        var key = window.Event ? e.which : e.keyCode
        return (key >= 48 && key <= 57)
    }

    function validar(){

        if(document.getElementsByName('nit')[0].value=="" || 
            document.getElementsByName('razon')[0].value == "" || 
            document.getElementsByName('email')[0].value == "" || 
            document.getElementsByName('celular')[0].value == "" ||
            document.getElementsByName('contacto')[0].value == "" || 
            document.getElementsByName('passadmin')[0].value == "" || 
            document.getElementsByName('nombreadmin')[0].value == "" ||
            document.getElementsByName('apellidoadmin')[0].value == "" || 
            document.getElementsByName('idamin')[0].value == "" || 
            document.getElementsByName('telefonoadmin')[0].value == "" || 
            document.getElementsByName('correo')[0].value == "" || $scope.listacheck == "")
            return true;
        else
            return false;
        
    }

	/*
	* Registrar datos de la Empresa 
	*/
	$scope.registrar = function(){
		var nit = document.getElementsByName('nit')[0].value;
        if(validar() == true){
            toastr.success("todos los campos son obligatorios")
        }else{

            if(document.getElementsByName('passadmin')[0].value != 
                document.getElementsByName('passadmin1')[0].value){
                toastr.success("Las contraseñas no coinciden");
            }else{

                var object = {
                    "nit":               document.getElementsByName('nit')[0].value,
                    "razonSocial":       document.getElementsByName('razon')[0].value,
                    "email":             document.getElementsByName('email')[0].value,
                    "telefono":          document.getElementsByName('celular')[0].value,
                    "contacto":          document.getElementsByName('contacto')[0].value,
                    "promedio":          '0',
                    "pass":              document.getElementsByName('passadmin')[0].value,
                    "nombres":           document.getElementsByName('nombreadmin')[0].value,
                    "apellidos":         document.getElementsByName('apellidoadmin')[0].value,
                    "identificacion":    document.getElementsByName('idamin')[0].value,
                    "telefonoadmin":     document.getElementsByName('telefonoadmin')[0].value,
                    "emailadmin":        document.getElementsByName('correo')[0].value,
                    "sectores":          $scope.listacheck     
                };
                //alert(JSON.stringify(object))
            
                var promisePost = empresaService.postempleado(object);
                promisePost.then(function (d) {
                        toastr.success(d.data.msg)
                        maximoid();

                        document.getElementsByName('nit')[0].value = "";
                        document.getElementsByName('razon')[0].value = "";
                        document.getElementsByName('email')[0].value = "";
                        document.getElementsByName('celular')[0].value = "";
                        document.getElementsByName('contacto')[0].value = "";
                        document.getElementsByName('promedio')[0].value = "";
                        document.getElementsByName('passadmin')[0].value = "";
                        document.getElementsByName('nombreadmin')[0].value = ""
                        document.getElementsByName('apellidoadmin')[0].value = "";
                        document.getElementsByName('idamin')[0].value = "";
                        document.getElementsByName('telefonoadmin')[0].value = "";
                        document.getElementsByName('correo')[0].value = "";
                        document.getElementsByName('passadmin1')[0].value = "";
                        //$scope.guardarfoto();
                        //alert(d.data.msg);
                        
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
    //Registrar empresa administardor
    $scope.registaradmin = function(idempresa){
        var object = {
            "nombres":              document.getElementsByName('razon')[0].value,
            "identificacion":       document.getElementsByName('nit')[0].value,
            "pass":                 document.getElementsByName('pass')[0].value,
            "idperfil":             '3',
            "correo":               document.getElementsByName('email')[0].value,
            "idempresa":            idempresa
        };

        var promisePost = empresaService.postempresaadmin(object);
        //alert(JSON.stringify(object));

        promisePost.then(function (d) {

                
                
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

    $scope.agregarservicios = function(sectores,$event){
        
        if($event.currentTarget.checked){
            $scope.listacheck.push(sectores);
            //alert(JSON.stringify($scope.listacheck))
        }else{
            var temp = angular.copy($scope.listacheck);
            $scope.listacheck = [];
            for(var i=0;i<temp.length;i++){
                if(temp[i].id != sectores.id){
                    $scope.listacheck.push(temp[i]);
                }
            }
        }

    }

	function maximoid(){
		var promiseGet = empresaService.maxId(); 
        promiseGet.then(function (pl) {
         	//console.log(JSON.stringify(pl.data));
            $scope.maxid = pl.data;
            idmax = pl.data;
            $scope.guardarfoto(idmax)
            //$scope.registaradmin(idmax);
            
            //alert(idmax);
        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });
	};

    var NomImg1 ="";

	/*
	* Guardar Logo de la Empresa al servidor
	*/
	$scope.guardarfoto = function(id){
        var formData = new FormData();
        //alert(JSON.stringify(formData))
        /*if($("#files")[0].files[0]) == ""){
            alert("imagen vacia")
        }*/
        var file = $("#files")[0].files[0];
        var fileName = file.name;
        //alert(file)
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //NomImg1 = "empresa_"+idmax+"."+fileExtension;
        NomImg1 = "empresa_"+id;
        formData.append('imagen',file);
        //formData.append('id', id);
        //alert($scope.perfil.foto+" "+id)
        //
        	
        	var promisePost = empresaService.postImagen(formData,NomImg1,fileExtension);
            promisePost.then(function (d) {
                
                //alert(d.data);
                $scope.logobasedatos(d.data)

            }, function (err) {
                console.log(err)
                if(err.status == 401){
                    alert(err.data.msg);
                    console.log(err.data.exception);
                }else{
                    alert("Error Al procesar Solicitud");
                }

                console.log(err);
            });
	}

	$scope.logobasedatos = function(namelogo){
        var ruta = "/imagenes/"+namelogo;
        var object = {
            "logo":      ruta    
        };
        //alert("entro: "+JSON.stringify(object),idmax);
        var promisePost = empresaService.fotobasedatos(object,idmax);

        promisePost.then(function (d) {

                //alert(d.data.msg);
                //location.reload()
                
                
        }, function (err) {

                if(err.status == 401){
                    //alert(err.data.msg);
                    console.log(err.data.exception);

                }else{

                    alert("Error Al procesar Solicitud");

                }

                console.log("Some Error Occured "+ JSON.stringify(err));
        });

    }

    function getAllSectores(){
        var promiseGet = sectorService.sectoresactivo(); 
        promiseGet.then(function (pl) {
            $scope.listaSector = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    }

    /////////Lista de empresas//////////////////////
    ///
    $scope.Empresa = [];

    $scope.predicate = 'name';  
    $scope.reverse = true;  
    $scope.currentPage = 1; 
    $scope.empresa = {};
    $scope.estado = {}
    $scope.desactivar = {};

    $scope.modelo = {
        "nit": "",
        "razonSocial":"",
        "email":"",
        "telefono":"",
        "contacto":""
    }

    $scope.order = function (predicate) {  
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
        $scope.predicate = predicate;  
    };

    $scope.numPerPage = 10;

    $scope.paginate = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.Empresa.indexOf(value);  
        return (begin <= index && index < end);  
    };
    crearNgTabla();
    loadEmpresa();

    
    function loadEmpresa(){
        var promiseGet = listaempresaService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Empresa = pl.data;
            $scope.totalItems = $scope.Empresa.length;
            crearNgTabla()
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    };

    function crearNgTabla(){
        self = this;
        data = $scope.Empresa;
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: undefined
        }, { 
            total: $scope.Empresa,
            getData: function (a, b) {
                var c = b.sorting ?
                        $filter('orderBy')($scope.Empresa, b.orderBy()) :
                        $scope.Empresa;
                c = b.filter() ?
                        $filter('filter')(c, b.filter()) :
                        c;
                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
                b.total(c.length);
                a.resolve($scope.usuario);
            }
        });
    }

    $scope.get = function(empresa) {
        $scope.empresa = empresa;
        $('#myModal').modal('show');
    }

    $scope.getestado = function(empresa){
        $scope.estado = empresa;
        //alert(JSON.stringify($scope.estado))
        $('#myModal1').modal('show');
    }

    $scope.getestadodesactivar = function(empresa){
        $scope.desactivar = empresa;
        //alert(JSON.stringify($scope.desactivar))
        $('#myModal2').modal('show');
    }

    

    $scope.modificar = function(){

        var object = {
            nit:                $scope.empresa.nit,
            razonSocial:        $scope.empresa.razonSocial,
            email:              $scope.empresa.email,
            telefono:           $scope.empresa.telefono,
            contacto:           $scope.empresa.contacto,
            promedio:           $scope.empresa.promedio
        }; 
        //alert(JSON.stringify(object)+" "+$scope.empresa.id)
        var promisePut  = empresaService.put($scope.empresa.id, object);
        
        promisePut.then(function (d) {

            toastr.success(d.data.msg)
            $scope.guardarfoto1($scope.empresa.id)
            //initialize();
            
            
        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.msg);
                console.log(err.data.exception);
                
            }else{
                
                alert("Error Al procesar Solicitud");
                
            }

            console.log("Some Error Occured "+ JSON.stringify(err));
        });
        
    };
    ///activar estado de la empresa
    $scope.modificarestado = function(){

        var object = {
            estado:             "ACTIVO"
        }; 
        //alert(JSON.stringify(object)+$scope.estado.id);
        var promisePut  = empresaService.putestado($scope.estado.id, object);
        
        promisePut.then(function (d) {

            //alert(d.data.msg);
            //initialize();
            $scope.modificarestadoactivaradmin($scope.estado.id);
            //loadEmpresa();
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
        
    };
    ///desactivar estado de la empresa
    $scope.modificarestadodesactivar = function(){

        var object = {
            estado:             "INACTIVO"
        }; 
        var promisePut  = empresaService.putestado($scope.desactivar.id, object);
        
        promisePut.then(function (d) {

            $scope.modificarestadodesactivaradmin($scope.desactivar.id)
            //$('#myModal2').modal('hide');

        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.msg);
                console.log(err.data.exception);
                
            }else{
                
                alert("Error Al procesar Solicitud");
                
            }

            console.log("Some Error Occured "+ JSON.stringify(err));
        });
        
    };
    //activar estado en la tabla admin
    $scope.modificarestadoactivaradmin = function(id){

        var object = {
            estado:             "ACTIVO"
        }; 
        //alert(JSON.stringify(object)+$scope.estado.id);
        var promisePut  = empresaService.putestadoadmin(id, object);
        
        promisePut.then(function (d) {

            //alert(d.data.msg);
            //initialize();
            loadEmpresa();
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
        
    };

        //activar estado en la tabla admin
    $scope.modificarestadodesactivaradmin = function(id){

        var object = {
            estado:             "INACTIVO"
        }; 
        //alert(JSON.stringify(object)+$scope.estado.id);
        var promisePut  = empresaService.putestadoadmin(id, object);
        
        promisePut.then(function (d) {

            //alert(d.data.msg);
            //initialize();
            loadEmpresa();
            $('#myModal2').modal('hide');

        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.msg);
                console.log(err.data.exception);
                
            }else{
                
                alert("Error Al procesar Solicitud");
                
            }

            console.log("Some Error Occured "+ JSON.stringify(err));
        });
        
    };

    $scope.guardarfoto1 = function(id){
        
            var formData = new FormData();
            var file = $("#files1")[0].files[0];
            var fileName = file.name;
            fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
            NomImg1 = "empresa_"+id;
            formData.append('imagen',file);
        
            
            var promisePost = listaempresaService.postImagen(formData,NomImg1,fileExtension);
            promisePost.then(function (d) {
                
                $scope.logobasedatos1(d.data,id)

            }, function (err) {
                console.log(err)
                if(err.status == 401){
                    //alert(err.data.msg);
                    console.log(err.data.exception);
                }else{
                    //alert("Error Al procesar Solicitud");
                }

                console.log(err);
            });
        
        
    }

    $scope.logobasedatos1 = function(namelogo,idmax){
        var ruta = "/imagenes/"+namelogo;
        var object = {
            "logo":      ruta    
        };
        //alert("entro: "+JSON.stringify(object),idmax);
        var promisePost = listaempresaService.fotobasedatos(object,idmax);

        promisePost.then(function (d) {

                //toastr.success(d.data.msg)
                loadEmpresa();
                $('#myModal').modal('hide');

                //location.reload()
                
                
        }, function (err) {

                if(err.status == 401){
                    //alert(err.data.msg);
                    console.log(err.data.exception);

                }else{

                    alert("Error Al procesar Solicitud");

                }

                console.log("Some Error Occured "+ JSON.stringify(err));
        });

    }

});