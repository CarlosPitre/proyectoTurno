app.controller('registrarempresaController', function ($scope, empresaService,sectorService,listaempresaService) {

	getAllSectores();
	$scope.listacheck = [];

	function getAllSectores(){
        var promiseGet = sectorService.sectoresactivo(); 
        promiseGet.then(function (pl) {
            $scope.listaSector = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    }

    function validar(){

        if(document.getElementsByName('nit')[0].value=="" || 
            document.getElementsByName('razon')[0].value == "" || 
            document.getElementsByName('email')[0].value == "" || 
            document.getElementsByName('celular')[0].value == "" ||
            document.getElementsByName('contacto')[0].value == "" || 
            document.getElementsByName('promedio')[0].value == "" ||
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
                
                var promisePost = empresaService.postempleado(object);
                promisePost.then(function (d) {
                        toastr.success(d.data.msg)
                        
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

});