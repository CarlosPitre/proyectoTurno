app.controller('galeriaController', function ($scope, galeriaService) {

	$scope.idsucursal = session.getIdsucursal();
    $scope.galeria = [];

    getAllgalerias();

	var d = new Date(); 
    var NI = d.getDate() + "" + (d.getMonth() +1) + "" + d.getFullYear() + '' +d.getHours()+''+d.getMinutes()+''+d.getSeconds();	

    function inizialice(){
    	d = new Date(); 
    	NI = d.getDate() + "" + (d.getMonth() +1) + "" + d.getFullYear() + '' +d.getHours()+''+d.getMinutes()+''+d.getSeconds();	
    }

	$scope.guardarfoto = function(){
		var file = $("#files")[0].files[0];
        var fileName = file.name;
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        var photo = NI;
        var photo1 = NI+"."+fileExtension;
    	var formData = new FormData();
        formData.append('imagen',file);
            
            var promisePost = galeriaService.postImagen(formData,photo,fileExtension);
            promisePost.then(function (d) {
                
                $scope.guardargaleria(photo1);
                
                
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

    $scope.guardargaleria = function(photo){
        var object = {
            "logo":        'imagenes/'+photo,
            "idsucursal":  $scope.idsucursal   
        };
        //alert("entro: "+JSON.stringify(object)+" "+$scope.id);
        var promisePost = galeriaService.postgaleria(object);

        promisePost.then(function (d) {

                toastr.success(d.data.msg)
                getAllgalerias()
                inizialice();

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

    function getAllgalerias(){
        var promiseGet = galeriaService.getgaleria(session.getIdsucursal()); 
        promiseGet.then(function (pl) {
            $scope.galeria = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    }


})