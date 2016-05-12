app.controller('listaempresaController', function ($scope, listaempresaService,empresaService) {

	$scope.title = "Listas De Empresas Registradas";
	$scope.Empresa = [];

    $scope.predicate = 'name';  
    $scope.reverse = true;  
    $scope.currentPage = 1; 
    $scope.empresa = {};
    $scope.estado = {}
    $scope.desactivar = {};

    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-center",
        "showDuration": "50000",
        "progressBar": true,
        "hideDuration": "50000",
    }

    $scope.order = function (predicate) {  
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
        $scope.predicate = predicate;  
    };   
    
    /*function initialize() {
        $scope.empresa ={
            id  : "",
            nit : "",
            razonSocial  : "",
            email  : "",
            telefono : "",
            contacto: "",
            promedio: "",
            estado: "",
            "logo": "",
        };
    }*/
    
    $scope.numPerPage = 10;

    $scope.paginate = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.Empresa.indexOf(value);  
        return (begin <= index && index < end);  
    };

    loadEmpresa();

    
	function loadEmpresa(){
       	var promiseGet = listaempresaService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Empresa = pl.data;
            $scope.totalItems = $scope.Empresa.length;
            
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    };

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
            $scope.guardarfoto($scope.empresa.id)
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
    ///desactivar estado de la empresa
    $scope.modificarestadodesactivar = function(){

        var object = {
            estado:             "INACTIVO"
        }; 
        var promisePut  = empresaService.putestado($scope.desactivar.id, object);
        
        promisePut.then(function (d) {

            $scope.modificarestadodesactivaradmin($scope.desactivar.id)
            loadEmpresa(); 
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
            initialize();
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
            initialize();
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

    $scope.guardarfoto = function(id){
        
            var formData = new FormData();
            var file = $("#files")[0].files[0];
            var fileName = file.name;
            fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
            NomImg1 = "empresa_"+id;
            formData.append('imagen',file);
        
            
            var promisePost = listaempresaService.postImagen(formData,NomImg1,fileExtension);
            promisePost.then(function (d) {
                
                $scope.logobasedatos(d.data,id)

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

    $scope.logobasedatos = function(namelogo,idmax){
        var ruta = "/imagenes/"+namelogo;
        var object = {
            "logo":      ruta    
        };
        //alert("entro: "+JSON.stringify(object),idmax);
        var promisePost = listaempresaService.fotobasedatos(object,idmax);

        promisePost.then(function (d) {

                toastr.success(d.data.msg)
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