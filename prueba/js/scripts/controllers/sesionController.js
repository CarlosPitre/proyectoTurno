app.controller('sesionController',function ($scope,sesionService){ 


	$scope.idperfil = session.getIdperfil();
    $scope.idsucursal = session.getIdsucursal();
    $scope.idempleado = session.getId();
    $scope.getIdempresa = session.getIdempresa();
    $scope.nombresucursal;
    $scope.razonSocial; 
    $scope.permiso0 = session.getPermiso_0();
    $scope.permiso1 = session.getPermiso_1();
    $scope.permiso2 = session.getPermiso_2();
    $scope.permiso3 = session.getPermiso_3();
    $scope.permiso4 = session.getPermiso_4();
    $scope.permiso5 = session.getPermiso_5();
    $scope.permiso6 = session.getPermiso_6();
    $scope.permiso7 = session.getPermiso_7();
    $scope.permiso8 = session.getPermiso_8();
    $scope.permiso9 = session.getPermiso_9();
    $scope.permiso10 = session.getPermiso_10();
    $scope.modulo0 = session.getModulo_0();
    $scope.modulo1 = session.getModulo_1();
    $scope.modulo2 = session.getModulo_2();
    $scope.modulo3 = session.getModulo_3();
    $scope.modulo4 = session.getModulo_4();
    $scope.modulo5 = session.getModulo_5();
    $scope.modulo6 = session.getModulo_6();
    $scope.modulo7 = session.getModulo_7();
    $scope.listapermisos = [];
    $scope.permiso = {};
    $scope.usuario = {}
    $scope.empr = false;
    $scope.sucu = false;
    $scope.aplicareserva;
 
    perfilpermisos()
    allusuario()
    vertipoempresa()

    function vertipoempresa(){
        if($scope.idsucursal == null){
            empresa($scope.getIdempresa)
        }
        if($scope.getIdempresa == null){
            sucursal($scope.idsucursal);
            aplicaReserva($scope.idsucursal);
        }
    }

    function aplicaReserva(idsucursal){
        var promiseGet = sesionService.aplicareserva(idsucursal); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data))
            $scope.aplicareserva = pl.data[0].aplicaReserva;
        },
        function (errorPl) {
            console.log('failure loading sucursal', errorPl);
        });
    }

    function sucursal(idsucursal){
        var promiseGet = sesionService.sucursal(idsucursal); 
        promiseGet.then(function (pl) {
            $scope.empr = false;
            $scope.sucu = true;
            $scope.nombresucursal = pl.data.nombre;
        },
        function (errorPl) {
            console.log('failure loading sucursal', errorPl);
        });
    }

    function empresa(idempresa){
        var promiseGet = sesionService.empresa(idempresa); 
        promiseGet.then(function (pl) {
            $scope.sucu = false;
            $scope.empr = true;
            $scope.razonSocial = pl.data.razonSocial;
        },
        function (errorPl) {
            console.log('failure loading empresa', errorPl);
        });
    }

    function allusuario(){
        var promiseGet = sesionService.getusuario(session.getId()); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data))
            $scope.usuario = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Perfiles', errorPl);
        });
    }


	function perfilpermisos(){
        var promiseGet = sesionService.getpermisos(session.getIdperfil()); 
        promiseGet.then(function (pl) {
            $scope.listapermisos = pl.data;
            if(pl.data == ""){
                alert("Error en la conexion intentelo de nuevo")
                session.cerrarSesion();
            }
        },
        function (errorPl) {
            console.log('failure loading Permisos', errorPl);
        });
	}
	
	$scope.verPermiso = function(permiso){
        if($scope.idperfil == 1){
            if(permiso == $scope.permiso0){return true}
            if(permiso == $scope.permiso1){return true}
            if(permiso == $scope.permiso2){return true}
            if(permiso == $scope.permiso3){return true}
            if(permiso == $scope.permiso4){return true}
            if(permiso == $scope.permiso5){return true}
            if(permiso == $scope.permiso6){return true}
            if(permiso == $scope.permiso7){return true}
            if(permiso == $scope.permiso8){return true}
            if(permiso == $scope.permiso9){return true}
            if(permiso == $scope.permiso10){return true}
            return false;
        }
        if($scope.idperfil == 2){
            if(permiso == $scope.permiso0){return true}
            if(permiso == $scope.permiso1){return true}
            if(permiso == $scope.permiso2){return true}
            if(permiso == $scope.permiso3){return true}
            if(permiso == $scope.permiso4){return true}
            if(permiso == $scope.permiso5){return true}
            if(permiso == $scope.permiso6){return true} 
            if(permiso == $scope.permiso7){return true}
            if(permiso == $scope.permiso8){return true}
            if(permiso == $scope.permiso9){return true}  
            if(permiso == $scope.permiso10){return true} 
            return false;
        }
        if($scope.idperfil == 3){
            if(permiso == $scope.permiso0){return true}
            if(permiso == $scope.permiso1){return true}
            if(permiso == $scope.permiso2){return true}
            if(permiso == $scope.permiso3){return true}
            if(permiso == $scope.permiso4){return true}
            if(permiso == $scope.permiso5){return true}
            if(permiso == $scope.permiso6){return true}
            if(permiso == $scope.permiso7){return true}
            if(permiso == $scope.permiso8){return true}
            if(permiso == $scope.permiso9){return true}   
            if(permiso == $scope.permiso10){return true} 
            return false;
        }
        if($scope.idperfil == 4){
            if(permiso == $scope.permiso0){return true}
            if(permiso == $scope.permiso1){return true}
            if(permiso == $scope.permiso2){return true}
            if(permiso == $scope.permiso3){return true}
            if(permiso == $scope.permiso4){return true}
            if(permiso == $scope.permiso5){return true}
            if(permiso == $scope.permiso6){return true}
            if(permiso == $scope.permiso7){return true}
            if(permiso == $scope.permiso8){return true}
            if(permiso == $scope.permiso9){return true}
            if(permiso == $scope.permiso10){return true} 
            return false;
        }
        if($scope.idperfil == 6){
            if(permiso == $scope.permiso0){return true}
            if(permiso == $scope.permiso1){return true}
            if(permiso == $scope.permiso2){return true}
            if(permiso == $scope.permiso3){return true}
            if(permiso == $scope.permiso4){return true}
            if(permiso == $scope.permiso5){return true}
            if(permiso == $scope.permiso6){return true}
            if(permiso == $scope.permiso7){return true}
            if(permiso == $scope.permiso8){return true}
            if(permiso == $scope.permiso9){return true}
            if(permiso == $scope.permiso10){return true}
            return false;
        }
	}

    $scope.verModulo= function(modulo){ 
        if($scope.idperfil == 1){
            if (modulo == $scope.modulo0){ return true;}     
            if (modulo == $scope.modulo1){ return true;}
            if (modulo == $scope.modulo2){ return true;}
            if (modulo == $scope.modulo3){ return true;}
            if (modulo == $scope.modulo4){ return true;}
            if (modulo == $scope.modulo5){ return true;}  
            if (modulo == $scope.modulo6){ return true;} 
            if (modulo == $scope.modulo7){ return true;}
            return  false;
        }
        if($scope.idperfil == 2){
            if (modulo == $scope.modulo0){ return true;}     
            if (modulo == $scope.modulo1){ return true;}
            if (modulo == $scope.modulo2){ return true;}
            if (modulo == $scope.modulo3){ return true;}
            if (modulo == $scope.modulo4){ return true;}
            if (modulo == $scope.modulo5){ return true;}  
            if (modulo == $scope.modulo6){ return true;}
            return  false;
        }
        if($scope.idperfil == 3){
            if (modulo == $scope.modulo0){ return true;}     
            if (modulo == $scope.modulo1){ return true;}
            if (modulo == $scope.modulo2){ return true;}
            if (modulo == $scope.modulo3){ return true;}
            if (modulo == $scope.modulo4){ return true;}
            if (modulo == $scope.modulo5){ return true;}  
            if (modulo == $scope.modulo6){ return true;}
            return  false;
        }
        if($scope.idperfil == 4){
            if (modulo == $scope.modulo0){ return true;}     
            if (modulo == $scope.modulo1){ return true;}
            if (modulo == $scope.modulo2){ return true;}
            if($scope.aplicareserva == 'SI'){
                if (modulo == $scope.modulo3){ return true;}
            }
            if (modulo == $scope.modulo4){ return true;}
            if (modulo == $scope.modulo5){ return true;}  
            if (modulo == $scope.modulo6){ return true;}
            return  false;
        }
        if($scope.idperfil == 6){
            if (modulo == $scope.modulo0){ return true;}     
            if (modulo == $scope.modulo1){ return true;}
            if (modulo == $scope.modulo2){ return true;}
            if (modulo == $scope.modulo3){ return true;}
            if (modulo == $scope.modulo4){ return true;}
            if (modulo == $scope.modulo5){ return true;}  
            if (modulo == $scope.modulo6){ return true;}
            return  false;
        }
    };

	
});