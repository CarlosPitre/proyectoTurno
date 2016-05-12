app.controller('galeriaadminController', function ($scope, galeriaService,empleadoadminService) {

	//$scope.idsucursal = session.getIdsucursal();
    $scope.galeria = [];
    $scope.empresas = [];
    $scope.idsucu;
    $scope.selecion = false;

    //getAllgalerias();
    getEmpresas()

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
            "idsucursal":  $scope.idsucu   
        };
        //alert("entro: "+JSON.stringify(object)+" "+$scope.id);
        var promisePost = galeriaService.postgaleria(object);

        promisePost.then(function (d) {

                toastr.success(d.data.msg)
                getAllgalerias($scope.idsucu)
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

    function getAllgalerias(idsucu){
        var promiseGet = galeriaService.getgaleria(idsucu); 
        promiseGet.then(function (pl) {
            $scope.galeria = pl.data;
            //alert(JSON.stringify(pl.data))
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
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
        $scope.selecion = true;
        var id = document.getElementsByName('empresaid')[0].value;
        getsucursal(id)
    }

    function getsucursal(id){
        var promiseGet = empleadoadminService.getsucursalempresa(id); 
        promiseGet.then(function (pl) {
            $scope.sucursal = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
    }

    $scope.buscarsucu = function(){
        $scope.idsucu = document.getElementsByName('idsucu')[0].value;
        getAllgalerias($scope.idsucu)
    }

    $scope.deletegaleria = function(idgaleria){
        var promiseGet = galeriaService.deletegaleria(idgaleria); 
        promiseGet.then(function (pl) {
            toastr.success("Eliminado correctamente")
            getAllgalerias($scope.idsucu)
        },
        function (errorPl) {
            console.log('failure loading delete galeria', errorPl);
        });
    }


})