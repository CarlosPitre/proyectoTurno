app.controller('perfilclienteController', function ($scope, perfilService,sesionService) {

	$scope.id = sessioncliente.getId()
	$scope.perfil;
	$scope.title = "Actualizar Perfil"

	getbyId()

	function getbyId(){
        var promiseGet = sesionService.getbyclienteid(sessioncliente.getId()); 
        promiseGet.then(function (pl) {
            $scope.perfil = pl.data;
            //alert(JSON.stringify($scope.perfil))
        },
        function (errorPl) {
            console.log('failure loading Perfiles', errorPl);
        });
    }

    $scope.actualizarperfil = function(){

		var object = {
            "email":   			document.getElementsByName('email')[0].value,
            "nombres":          document.getElementsByName('nombres')[0].value,
            "apellidos":        document.getElementsByName('apellidos')[0].value,
            "telefono":        	document.getElementsByName('telefono')[0].value
        }; 
        var promisePut  = perfilService.updateperfilcliente($scope.id, object);
        
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

})