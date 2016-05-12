app.controller('clienteController', function ($scope, clienteService,inicioService) {

	$scope.title = "Registrar Cliente"
	var app_id = '908318025955700';
	var scopes = "read_stream,email,user_friends,read_custom_friendlists,public_profile";
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
/*******************************************/
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
/*************************************************/
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

            toastr.success(d.data.msg)
            Maxidcliente()
            
                
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

   function validaremail(email){
    var promiseGet = clienteService.validarcorreo(email); 
        promiseGet.then(function (pl) {
          
          if(pl.data.std == "1"){
            alert(JSON.stringify(pl.data.msg));

          }else{
            registrar_cliente();
          }
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
  }

  function validar(){
    if(document.getElementsByName('email')=="" || document.getElementsByName('nombres')[0].value ==""
      || document.getElementsByName('apellidos')[0].value=="" || document.getElementsByName('celular')[0].value=="")
        return true;
    else
            return false;
  }

  $scope.registrarse = function(){
    if(validar()){
      toastr.success("Todos los campos son obligatorios")
    }else{

        if(document.getElementsByName('passadmin')[0].value != document.getElementsByName('passadmin1')[0].value){
      toastr.success("Las contrasenas no coinciden verifique")
    }else{

      var correo = document.getElementsByName('email')[0].value
      validaremail(correo)

    }

    }
    
  }

  function registrar_cliente(){
     
     var object = {
          "email":        document.getElementsByName('email')[0].value,
          "nombres":      document.getElementsByName('nombres')[0].value,
          "apellidos":    document.getElementsByName('apellidos')[0].value,
          "telefono":     document.getElementsByName('celular')[0].value,
          "pass":         document.getElementsByName('passadmin')[0].value
      };
      var promisePost = clienteService.registercliente(object);

        promisePost.then(function (d) {

            toastr.success(d.data.msg)
            document.getElementsByName('email')[0].value = ""
            document.getElementsByName('nombres')[0].value = ""
            document.getElementsByName('apellidos')[0].value = ""
            document.getElementsByName('celular')[0].value = ""
            document.getElementsByName('passadmin')[0].value = ""
            document.getElementsByName('passadmin1')[0].value = ""
            toastr.success("Ya puedes iniciar sesion correctamente")
            setTimeout(function(){ location.href = "http://turnomovil.com/sesion.html#/sesioncliente"  }, 3000);
            

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