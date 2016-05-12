app.controller('serviciosempresaController', function ($scope,serviciosempresaService,sectorService,servicioService) {

	$scope.listasectores = {}
	$scope.idempresa = session.getIdempresa()
	getAllSector()
	getAllserviciosucursales()

	$scope.predicate = 'name';  
    $scope.reverse = true;  
    $scope.currentPage = 1; 

    $scope.numPerPage = 1;
    
toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-center",
        "showDuration": "50000",
        "progressBar": true,
        "hideDuration": "50000",
    }

    $scope.paginate = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.listaserviciosector.indexOf(value);  
        return (begin <= index && index < end);  
    };

	function getAllserviciosucursales(){
        var promiseGet = serviciosempresaService.getserviciosucursal($scope.idempresa); 
        promiseGet.then(function (pl) {
            $scope.listaserviciosector = pl.data;
            $scope.totalItems = $scope.listaserviciosector.length;
            //alert(JSON.stringify($scope.listaserviciosector))
        },
        function (errorPl) {
            console.log('failure loading sectores', errorPl);
        });
    }


	function getAllSector(){
        var promiseGet = serviciosempresaService.getsecotorempresa($scope.idempresa); 
        promiseGet.then(function (pl) {
            $scope.listasectores = pl.data;
        },
        function (errorPl) {
            console.log('failure loading sectores', errorPl);
        });
    }

    function validar(){

        if(document.getElementsByName('nombreservicio')[0].value=="" || 
            document.getElementsByName('descripcion')[0].value == "" || 
            document.getElementsByName('idsector')[0].value == "")
            return true;
        else
            return false;
        
    }

    $scope.registrar = function(){
        if(validar() == true){
            toastr.success("todos los campos son obligatorios")
        }else{

            var object = {
                "nombre":       document.getElementsByName('nombreservicio')[0].value,
                "descripcion":  document.getElementsByName('descripcion')[0].value,
                "estado":       "INACTIVO",
                "idSector":     document.getElementsByName('idsector')[0].value
            };
            
            var promisePost = servicioService.postservicio(object);

            promisePost.then(function (d) {

                    toastr.success(d.data.msg);
                    //getAllserviciosucursales();
                    
            }, function (err) {

                    if(err.status == 401){
                        alert(err.data.msg);
                        console.log(err.data.exception);

                    }else{

                        //alert("Error Al procesar Solicitud de servicios");

                    }

                    console.log("Some Error Occured "+ JSON.stringify(err));
            });

        }
        
    }

})