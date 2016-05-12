app.controller('inicioController', function ($scope, inicioService) {

	$scope.title = "Logo";
        $scope.title2 = "Ingresa tu usuario y contraseè´–a para empezar a trabajar";
    $scope.idpermisos = [];
    var object1 = {}
    var object2 = {}
    var arrayper = new Array();

    $scope.noencontrado = false;
    $scope.estado = false;

    $scope.encontrado = false;
    $scope.estado1 = false;

    function initialize(){
        $('#animacion').removeAttr('class').attr('class', '');
        var animation = $(this).attr("bounceInDown");
        $('#animacion').addClass('animated');
        //$('#animacion').addClass(animation);
        return false;
    }

    function validar(){
        if(document.getElementsByName('user')[0].value == "" || document.getElementsByName('pass')[0].value=="")
            return true;
        else
            return false;
    }

	$scope.ingresar = function(){
		if(validar()){
            alert("Los campos son validos");
        }else{
            var object = {
                "identificacion":   document.getElementsByName('user')[0].value,
                "pass":             document.getElementsByName('pass')[0].value
            };
            //alert(JSON.stringify(object));
            var promisePost = inicioService.postinicio(object);

            promisePost.then(function (d) {

                    //alert(JSON.stringify(d.data.admin));
                    
                    
                    getAllModulospermisos(d.data.admin.idPerfil)
                    sessionStorage.setItem("usuario","");
                    session.setUsuario(JSON.stringify(d.data.admin));
                    
                    
                    //location.href = "http://localhost/PagesTurno/bienvenida.html#/";
                    
            }, function (err) {

                    if(err.status == 401){
                        //alert(err.data.msg);
                        console.log(err.data.exception);

                    }else{

                        alert("Error Usuario o contrase√±a incorrecta");
                        document.getElementsByName('user')[0].value = ""
                        document.getElementsByName('pass')[0].value = ""
                    }

                    console.log("Some Error Occured "+ JSON.stringify(err));
            });    
        }
		
	}

    $scope.enviaremail = function(){
        var object = {
            "identificacion":           $scope.encontrado.identificacion
        };
        var promisePost = inicioService.postemail(object);

            promisePost.then(function (d) {

                    alert(d.data.msg)
                    $('#myModal1').modal('hide');
            }, function (err) {

                    if(err.status == 401){
                        //alert(err.data.msg);
                        console.log(err.data.exception);

                    }else{

                        
                    }

                    console.log("Some Error Occured "+ JSON.stringify(err));
            }); 
    }

    function getAllModulospermisos(id){
        
        var promiseGet = inicioService.getmodulospermisos(id); 
        promiseGet.then(function (pl) {
            for(var i=0;i<pl.data.length;i++){
                object2["modulo_"+i] = JSON.stringify(parseInt(pl.data[i].idmodulo));
                for(var j=0;j<pl.data[i].permisos.length;j++){
                    //alert(JSON.stringify(pl.data[i].permisos[j].idpermiso)+" pe")
                    arrayper.push(JSON.stringify(parseInt(pl.data[i].permisos[j].idpermiso)));
                }
            }
            for(var i=0;i<arrayper.length;i++){
                object1["permiso_"+i] = arrayper[i]
            }
            sessionStorage.setItem("modulos","");
            session.setModulos(JSON.stringify(object2));
            sessionStorage.setItem("permisos","");
            session.setPermisos(JSON.stringify(object1)); 
            location.href = "/bienvenida.html#/";
        },
        function (errorPl) {
            console.log('failure loading Modulos', errorPl);
        });
    }

    $scope.modal = function(){

        $('#myModal1').modal('show');
        
    }

    $scope.buscar = function(){
        var peticion = document.getElementsByName('buscar')[0].value;
        var promiseGet = inicioService.buscarempleado(peticion); 
        promiseGet.then(function (pl) {
            if(pl.data.std == 0){
                $scope.noencontrado = pl.data.empleado;
                $scope.estado1 = false;
                $scope.estado = true;
            }else{
                $scope.encontrado = pl.data.empleado;
                $scope.estado = false;
                $scope.estado1 = true;
            }
        },
        function (errorPl) {
            console.log('failure loading Permisos', errorPl);
        });
    }

	/*function getAllModulos(id){
        
        var promiseGet = inicioService.getPermisos(id); 
        promiseGet.then(function (pl) {
            alert(JSON.stringify(pl.data))
            for(var i=0;i<pl.data.length;i++){
                object2["modulo_"+i] = pl.data[i].idmodulo;
                object1["permiso_"+i] = pl.data[i].idpermiso;
            }
            //alert(JSON.stringify(object1))
            sessionStorage.setItem("modulos","");
            session.setModulos(JSON.stringify(object2));
            //sessionStorage.setItem("permisos","");
            //session.setPermisos(JSON.stringify(object1));
            //location.href = "http://localhost/PagesTurno/bienvenida.html#/";
        },
        function (errorPl) {
            console.log('failure loading Modulos', errorPl);
        });
	}

    function getAllsoloPermisos(id){
        
        var promiseGet = inicioService.getsoloPermisos(id); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data))
            for(var i=0;i<pl.data.length;i++){
                object1["permiso_"+i] = pl.data[i].idpermiso;
            }
            sessionStorage.setItem("permisos","");
            session.setPermisos(JSON.stringify(object1));
            location.href = "http://localhost/PagesTurno/bienvenida.html#/";
        },
        function (errorPl) {
            console.log('failure loading Permisos', errorPl);
        });
    }*/

    
	
});