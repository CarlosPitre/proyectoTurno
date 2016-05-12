app.controller('servicioController', function ($scope,ngTableParams,$filter, servicioService,empresaService,sectorService) {

	$scope.title = "Registrar Servicios";
	$scope.title1 = "Lista De Servicios"

	//$scope.listaempresas = [];
	$scope.listaservicios = [];
    $scope.idperfil = session.getIdperfil();
    $scope.idempresa = session.getIdempresa();
    $scope.servicios = {};
    $scope.estado = {}
    $scope.estadoactivo = {}
    $scope.listasectores = {}

    $scope.predicate = 'name';  
    $scope.reverse = true;  
    $scope.currentPage = 1; 

	//EmpresasRegistradas();
	getAllServicios();
    getAllSector()

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
    
    //$scope.totalItems = $scope.listaservicios.length;
    $scope.numPerPage = 10;
    

    $scope.paginate = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.listaservicios.indexOf(value);  
        return (begin <= index && index < end);  
    };

    function getAllServicios(){

        var promiseGet = servicioService.getservicios(); 
        promiseGet.then(function (pl) {
            $scope.listaservicios = pl.data;
            $scope.totalItems = $scope.listaservicios.length;
            crearNgTabla()
            //alert(JSON.stringify($scope.listaservicios));
        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });

    }

    function crearNgTabla(){
        self = this;
        data = $scope.listaservicios;
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: undefined
        }, { 
            total: $scope.listaservicios,
            getData: function (a, b) {
                var c = b.sorting ?
                        $filter('orderBy')($scope.listaservicios, b.orderBy()) :
                        $scope.listaservicios;
                c = b.filter() ?
                        $filter('filter')(c, b.filter()) :
                        c;
                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
                b.total(c.length);
                a.resolve($scope.usuario);
            }
        });
    }

    function initialize() {
        $scope.empresa ={
            id:             "",
            idEmpresa  :    "",
            nombre :        "",
            descripcion  :  ""
        };
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
            toastr.success("Todos los campos son obligatorios")
        }else{
            var object = {
                "nombre":       document.getElementsByName('nombreservicio')[0].value,
                "descripcion":  document.getElementsByName('descripcion')[0].value,
                "estado":       "ACTIVO",
                "idSector":     document.getElementsByName('idsector')[0].value
            };
            
            var promisePost = servicioService.postservicio(object);

            promisePost.then(function (d) {

                    toastr.success(d.data.msg)
                    document.getElementsByName('nombreservicio')[0].value = "";
                    document.getElementsByName('descripcion')[0].value = "";
                    document.getElementsByName('idsector')[0].value = "";
                    getAllServicios();
                    
            }, function (err) {

                    if(err.status == 401){
                        alert(err.data.msg);
                        console.log(err.data.exception);

                    }else{

                        alert("Error Al procesar Solicitud de servicios");

                    }

                    console.log("Some Error Occured "+ JSON.stringify(err));
            });
        }

	}

	
    function getAllSector(){
        var promiseGet = sectorService.sectoresactivo(); 
        promiseGet.then(function (pl) {
            $scope.listasectores = pl.data;
        },
        function (errorPl) {
            console.log('failure loading sectores', errorPl);
        });
    }

    $scope.get = function(servicios){
        $scope.servicios = servicios;
        //alert(JSON.stringify($scope.servicios));
        $('#myModal').modal('show');
    }

    $scope.getestado = function(servicios){
        $scope.estadoactivo = servicios;
        //alert(JSON.stringify($scope.estadoactivo));
        $('#myModal2').modal('show');
    }

    $scope.getestadodesactivar = function(servicios){
        $scope.estado = servicios;
        //$scope.activarAdmin();
        $('#myModal1').modal('show');
    }

    $scope.modificarservicio = function(){
        var object = {
            nombre:                 $scope.servicios.nombre,
            descripcion:            $scope.servicios.descripcion
        }; 
        //alert(JSON.stringify(object)+" "+$scope.servicios.id)
        var promisePut  = servicioService.putservicio($scope.servicios.id, object);
        
        promisePut.then(function (d) {

            toastr.success(d.data.msg)
            initialize();
            getAllServicios();
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

    $scope.desactivarestado = function(){
        var object = {
            estado:     "INACTIVO"
        }; 
        //alert(JSON.stringify(object)+" "+$scope.servicios.id)
        var promisePut  = servicioService.putservicioestadodesactivar($scope.estado.idServicio, object);
        
        promisePut.then(function (d) {

            alert(d.data.msg);
            initialize();
            getAllServicios();
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

    $scope.activarestado = function(){
        var object = {
            estado:     "ACTIVO"
        }; 
        //alert(JSON.stringify(object)+" "+$scope.estadoactivo.id)
        var promisePut  = servicioService.putservicioestado($scope.estadoactivo.idServicio, object);
        
        promisePut.then(function (d) {

            alert(d.data.msg);
            initialize();
            getAllServicios();
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
    }

});