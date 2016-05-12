app.controller('perfilController', function ($scope, perfilService) {

	$scope.title = "Actualizar Perfil"
	$scope.id = session.getId();
	$scope.perfil = {}
	$scope.logo

	getPerfil()


	function getPerfil(){
		var promiseGet = perfilService.getperfilempleado($scope.id); 
        promiseGet.then(function (pl) {
        	//alert(pl.data[0].logo)
        	$scope.logo = pl.data[0].logo;
            $scope.perfil = pl.data[0];
            document.getElementById("image").innerHTML = "<center><img class='img-responsive' src='./api"+$scope.logo+"' alt='User profile picture' style='width: 250px; height: 290px;'></center>";
            //alert(JSON.stringify(pl.data[0]));
        },
        function (errorPl) {
            console.log('failure loading perfil', errorPl);
        });
	}

	$scope.actualizarperfil = function(){

		var object = {
            "email":   			document.getElementsByName('email')[0].value,
            "nombres":          document.getElementsByName('nombres')[0].value,
            "apellidos":        document.getElementsByName('apellidos')[0].value,
            "telefono":        	document.getElementsByName('telefono')[0].value
        }; 
        var promisePut  = perfilService.updateperfil($scope.id, object);
        
        promisePut.then(function (d) {

            toastr.success(d.data.msg)
            
        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.msg);
                console.log(err.data.exception);
                
            }else{
                
                //alert("Error Al procesar Solicitud");
                
            }

            console.log("Some Error Occured "+ JSON.stringify(err));
        });

	}

	$scope.guardarfoto = function(){
        
        var file = $("#files")[0].files[0];
        var fileName = file.name;
        if(fileName==""){
            NomImg1 = "NULL";
            $scope.logobasedatos(NomImg1)
        }else{
            fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
            NomImg1 = "perfil_"+$scope.id;


            var formData = new FormData();
            formData.append('imagen',file);
            
                
                var promisePost = perfilService.postImagen(formData,NomImg1,fileExtension);
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
        
    }

    $scope.logobasedatos = function(namelogo){
        var ruta = "/imagenes/"+namelogo;
        var object = {
            "logo":      ruta    
        };
        //alert("entro: "+JSON.stringify(object)+" "+$scope.id);
        var promisePost = perfilService.fotobasedatos(object,$scope.id);

        promisePost.then(function (d) {

                toastr.success(d.data.msg)
                
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


})