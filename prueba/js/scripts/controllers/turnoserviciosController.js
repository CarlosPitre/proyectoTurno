app.controller('turnoserviciosController', function ($scope,$routeParams, turnoserviciosService) {

	$scope.idServicio = $routeParams.idservicio;
	$scope.idEmpleado = session.getId();
	$scope.estadocola = false;
	$scope.estadoespera = false;
	$scope.Cola = []
    $scope.Espera = []

    getEmpleadoservicioscola()
    getEmpleadoserviciosespera()
    initialize()
    function initialize(){
        setInterval(function(){
            getEmpleadoservicioscola()
        },5000)
        setInterval(function(){
            getEmpleadoserviciosespera()
        },5000)
    }
    
    
    
    

	function getEmpleadoservicioscola(){
        var promiseGet = turnoserviciosService.getempleadocola($scope.idEmpleado,$scope.idServicio); 
        promiseGet.then(function (pl) {
        	$scope.estadocola = true;
        	$scope.Cola = pl.data;
        },
        function (errorPl) {
            $scope.estadocola = false;
            console.log('failure loading Empleados', errorPl);
        });

	}

	function getEmpleadoserviciosespera(){
        var promiseGet = turnoserviciosService.getempleadoespera($scope.idEmpleado,$scope.idServicio); 
        promiseGet.then(function (pl) {
        	$scope.estadoespera = true;
            $scope.Espera = pl.data;
        },
        function (errorPl) {
            $scope.estadoespera = false;
            console.log('failure loading Empleados', errorPl);
        });
        
	}


	$scope.putestadoturno  = function(){
		var idturno = document.getElementsByName('idturno')[0].value;
        var object = {
            estadoTurno:   "ATENDIENDO"
        }; 
        //alert(JSON.stringify(object)+" "+idturno)
        var promisePut  = turnoserviciosService.estadoatendiendo($scope.idEmpleado,$scope.idServicio,idturno,object);
        
        promisePut.then(function (d) {

            toastr.success("Este turno va hacer atendido")
            getEmpleadoservicioscola()

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

    $scope.putestadoturnofinalizado  = function(){
		var idturno = document.getElementsByName('idturno')[0].value;
        var object = {
            estadoTurno:   "TERMINADO"
        }; 
        //alert(JSON.stringify(object)+" "+idturno)
        var promisePut  = turnoserviciosService.estadoatendiendo($scope.idEmpleado,$scope.idServicio,idturno,object);
        
        promisePut.then(function (d) {

            toastr.success("Este turno a terminado")
            getEmpleadoservicioscola()

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

    $scope.putestadoturnocancelar  = function(){
        var idturno = document.getElementsByName('idturno')[0].value;
        var object = {
            estadoTurno:   "CANCELADO"
        }; 
        //alert(JSON.stringify(object)+" "+idturno)
        var promisePut  = turnoserviciosService.estadoatendiendo($scope.idEmpleado,$scope.idServicio,idturno,object);
        
        promisePut.then(function (d) {

            toastr.success("Se cancelo este turno")
            getEmpleadoserviciosespera()

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

    $scope.putestadoturnoaceptar  = function(){
        var idturno = document.getElementsByName('idturno')[0].value;
        var object = {
            estadoTurno:   "CONFIRMADO"
        }; 
        //alert(JSON.stringify(object)+" "+idturno)
        var promisePut  = turnoserviciosService.estadoatendiendo($scope.idEmpleado,$scope.idServicio,idturno,object);
        
        promisePut.then(function (d) {

            toastr.success("Se ha confirmado este turno")
            getEmpleadoserviciosespera()

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


    $scope.putaplazarturno  = function(){
        var idturno = document.getElementsByName('idturno')[0].value;
        /*var object = {
            estadoTurno:   "CONFIRMADO"
        };*/ 
        //alert(JSON.stringify(object)+" "+idturno)
        var promisePut  = turnoserviciosService.aplazarturno(idturno,$scope.idServicio,$scope.idEmpleado);
        
        promisePut.then(function (d) {

            toastr.success(d.data.msg)
            getEmpleadoservicioscola()

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

    $scope.putaplazarcancelarturno  = function(){
        var idturno = document.getElementsByName('idturno')[0].value;
        /*var object = {
            estadoTurno:   "CONFIRMADO"
        };*/ 
        //alert(JSON.stringify(object)+" "+idturno)
        var promisePut  = turnoserviciosService.aplazarcancelarturno(idturno,$scope.idServicio,$scope.idEmpleado);
        
        promisePut.then(function (d) {

            toastr.success(d.data.msg)
            getEmpleadoservicioscola()

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


})