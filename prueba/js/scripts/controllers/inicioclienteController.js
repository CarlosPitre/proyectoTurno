app.controller('inicioclienteController', function ($scope, inicioclienteService,inicioService,clienteService) {

	$scope.title = "BIENVENIDO A TURNOMOVIL";
    var object1 = {}
    var object2 = {}

        $scope.noencontrado = false;
    $scope.estado = false;

    $scope.encontrado = false;
    $scope.estado1 = false;

	$scope.ingresar = function(){

        if(document.getElementsByName('correo')[0].value=="" || document.getElementsByName('pass')[0].value==""){
             alert("Los campos son validos")
        }else{

            var object = {
                "email":            document.getElementsByName('correo')[0].value,
                "pass":             document.getElementsByName('pass')[0].value
            };

            var promisePost = inicioclienteService.postinicio(object);

            promisePost.then(function (d) {
            
                  if(d.data.cliente == null){
                     alert(JSON.stringify(d.data.msg));
                  }  
                  if(d.data.std == '1'){
                        sessionStorage.setItem("cliente","");
                        sessioncliente.setCliente(JSON.stringify(d.data.cliente))
                        location.href = "inicio.html#/";
                  }
                  if(d.data.std == '2'){
                      alert(JSON.stringify(d.data.msg));
                  } 
                  if(d.data.std == '3'){
                      alert(JSON.stringify(d.data.msg));
                  }   
            

            
                
            }, function (err) {

                    if(err.status == 401){
                        //alert(err.data.msg);
                        console.log(err.data.exception);

                    }else{

                        alert("Error Usuario o password incorrecta");
                        document.getElementsByName('correo')[0].value = ""
                        document.getElementsByName('pass')[0].value = ""
                    }

                    console.log("Some Error Occured "+ JSON.stringify(err));
            });

        }
		
	}

    function getAllModulos(id){
        
        var promiseGet = inicioService.getPermisos(id); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data))
            for(var i=0;i<pl.data.length;i++){
                object2["modulo_"+i] = pl.data[i].idmodulo;
            }
            sessionStorage.setItem("modulos","");
            session.setModulos(JSON.stringify(object2));
            
            
        },
        function (errorPl) {
            console.log('failure loading modulos', errorPl);
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
            location.href = "http://turnomovil.com/inicio.html#/";
        },
        function (errorPl) {
            console.log('failure loading permisos', errorPl);
        });
    }

    $scope.modal = function(){

        $('#myModal1').modal('show');
        
    }
    var email; 
    $scope.buscar = function(){
        var peticion = document.getElementsByName('buscar')[0].value;
        var promiseGet = inicioclienteService.getcliente(peticion); 
        promiseGet.then(function (pl) {
            if(pl.data.std == 0){
                $scope.noencontrado = pl.data;
                $scope.estado1 = false;
                $scope.estado = true;
            }else{
                email = document.getElementsByName('buscar')[0].value;
                $scope.encontrado = pl.data;
                $scope.estado = false;
                $scope.estado1 = true;
            }
        },
        function (errorPl) {
            console.log('failure loading Permisos', errorPl);
        });
    }

    $scope.enviaremail = function(){
        var object = {
            "email":        email
        };
        var promisePost = inicioclienteService.postenvio(object);

            promisePost.then(function (d) {

                    alert(d.data.msg)
                    $('#myModal1').modal('hidden');
            }, function (err) {

                    if(err.status == 401){
                        //alert(err.data.msg);
                        console.log(err.data.exception);

                    }else{

                        
                    }

                    console.log("Some Error Occured "+ JSON.stringify(err));
            }); 
    }

    ////////////   LOGIN FACEBOOK  //////////////

     var app_id = '908318025955700';
	var scopes = "email,user_friends,read_custom_friendlists,public_profile";
	$scope.face;

    (function(d, s, id) {
    	var js, fjs = d.getElementsByTagName(s)[0];
    	if (d.getElementById(id)) return;
		    js = d.createElement(s); js.id = id;
		    js.src = "//connect.facebook.net/en_US/sdk.js";
		    fjs.parentNode.insertBefore(js, fjs);
  	}(document, 'script', 'facebook-jssdk'));

	window.fbAsyncInit = function() {
	  FB.init({
	    appId      : app_id,
	    status     : true,
	    cookie     : true,                      
	    xfbml      : true,  
	    version    : 'v2.2' 
	  });

	  /*FB.getLoginStatus(function(response) {
	    statusChangeCallback(response, function(){

	    });
	  });*/
  };


       var  statusChangeCallback = function(response, callback) 
  {
	    console.log(response);

	    if (response.status === 'connected') {
	    	getFacebookData();
	    } else {
	      callback(false);
	    }
  }

       var  checkLoginState = function(callback) 
   {
	    FB.getLoginStatus(function(response) {
	      statusChangeCallback(response,function(data){
	      		callback(data);
	      });
	    });
  	}


       var getFacebookData =function()
  	{
  		FB.api('/me?fields=email,first_name,last_name,id,picture', function(response){
  			//alert(JSON.stringify(response));
  			//console.log(JSON.stringify(response.picture.data.url))
  			$scope.face = response
  			$scope.registrar(response)
  			//"http://graph.facebook.com/response.id/picture?type=large"
  			//alert($scope.face.first_name)
  			console.log('http://graph.facebook.com/'+response.id+'/picture?type=large');
  		});
  	}

  	  function invitar_friends()
        {
            FB.ui({
                method: 'apprequests',
                message: 'Unete a la comunidad Turnomovil Soccer y disfruta con tus amigos!'
            });
        }

  	var friends = function(){
  		FB.api("/me/friends", function (response) {
	     	 console.log(response)
    	});
  	}

        var facebookLogin = function()
  	{
  		checkLoginState(function(response){
  			if(!response){
  				FB.login(function(response){
  				if(response.status === 'connected')	
  					getFacebookData();
  				},{scope:scopes});
  			}
  		})
  	}

  	$(document).on('click', '#facebookLogin', function(e){
  		e.preventDefault();
  		facebookLogin();
  	})

  	$(document).on('click', '#facebookInvitar', function(e){
  		e.preventDefault();
  		invitar_friends();
  	})

        $scope.registrar = function(response){
        
        var object = {
            "idFace":        response.id,
            "nombres":  	response.first_name,
            "apellidos": 	response.last_name,
            "email":         response.email
        };
        //alert(JSON.stringify(object))
        var promisePost = clienteService.postcliente(object);

        promisePost.then(function (d) {
             
            sessionStorage.setItem("cliente","");
            sessioncliente.setCliente(JSON.stringify(object))
            //toastr.success(d.data.msg)
            //Maxidcliente()
            location.href = "http://turnomovil.com/inicio.html#/";
                
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

      var object1 = {}
  var object2 = {}
  $scope.user = {}
  function Maxidcliente(){
        
        var promiseGet = inicioService.maxcliente(); 
        promiseGet.then(function (pl) {
          //alert(JSON.stringify(pl.data.id))
            $scope.user = pl.data;
            //var idmax = pl.data;
            var object = {
                id:         $scope.user.id,
                email:      $scope.user.email,
                nombre:     $scope.user.nombres,
                apellidos:   $scope.user.apellidos,
                telefono:   $scope.user.telefono,
                idPush:     $scope.user.idPush,
                idFace:     $scope.user.idFace,
                estado:     $scope.user.estado
            }
            sessionStorage.setItem("cliente","");
            sessioncliente.setCliente(JSON.stringify(object))
            location.href = "http://turnomovil.com/inicio.html#/";
            
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    } 



})