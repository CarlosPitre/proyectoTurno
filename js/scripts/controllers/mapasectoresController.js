app.controller('mapasectoresController', function ($scope,$routeParams,mapasectoresService,sectorService,sesionService) {

	$scope.idCliente = sessioncliente.getId();
    $scope.idface =   sessioncliente.getIdface();
	$scope.idSector = $routeParams.idsector
	$scope.servicios = []
	$scope.idSucursalempresa
	$scope.sucursal
    $scope.idusuario;
    $scope.cupos = {}
	var lat;var long;
	$scope.Empleadosucursal = []

	toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-center"
    }

	verperfilcliente();
	getServicios()
        
	/*
	*	servicios disponibles
	*/
	function getServicios(){
		var promiseGet = mapasectoresService.getServicios($scope.idSector); 
        promiseGet.then(function (pl) {
        	if(pl.data[0] != null){
                        //alert(JSON.stringify(pl.data))
        		$scope.servicios = pl.data;
            	initMapcliente(pl.data[0].id)
        	}else{
        		toastr.success("No hay servicios en este sector")
        	}
            
        },
        function (errorPl) {
            console.log('failure loading perfil', errorPl);
        });
	}
	/*
	* sucursales de la ciudad
	*/

	function sucursalesciudad(idservicio,ciudad,lat,long){
		var promiseGet = mapasectoresService.getsucursalesciudad(idservicio,ciudad,lat,long); 
        promiseGet.then(function (pl) {
        	//alert(JSON.stringify(pl.data))
        	$.each(pl.data,function(index,item){
                var label = item.nombre;
                var location = new google.maps.LatLng(item.latitud, item.longitud);
                addMarkersucursales(location,item,idservicio);
            });

        },
        function (errorPl) {
            console.log('failure loading perfil', errorPl);
        });
	}

	/*
	*	surcusales cercanas a tu posicion
	*/
	function getsucursalescercanas(idservicio,lat,long){
		var promiseGet = mapasectoresService.getsucursalescercanas(idservicio,lat,long); 
        promiseGet.then(function (pl) {

        	$.each(pl.data,function(index,item){
                var label = item.nombre;
                var location = new google.maps.LatLng(item.latitud, item.longitud);
                addMarkersucursales(location,item,idservicio);
            });

        },
        function (errorPl) {
            console.log('failure loading perfil', errorPl);
        });
	}
    /*
    * n¨²mero de cupos
    */
   
    function numeroscupos(){

        var promiseGet = sectorService.sectorcupos($routeParams.idsector); 
        
        promiseGet.then(function (pl) {
            $scope.cupos = pl.data
            var cupo = pl.data.cupos
            var cupo1 = parseInt(cupo) + 1
            //alert(Number(cupo))
            for(var i=1;i<cupo1;i++){
                var val = document.getElementsByName("numcupos"+i)[0];
                val.innerHTML = ""
                for(var j=1;j<cupo1;j++){
                    val.innerHTML += "<option value='"+j+"'>"+j+"</option>"
                }
            }

            
            
        },
        function (errorPl) {
            console.log('failure loading perfil', errorPl);
        });

    }
    var valor = 1;
    $scope.valor = function(index){
        //alert(document.getElementsByName('numcupos'+index)[0].value) 
        valor = document.getElementsByName('numcupos'+index)[0].value
        //alert(valor)
    }
 
        function verperfilcliente(){
              //alert("da")
            if($scope.idCliente != null){
                var promiseGet = sesionService.getbyclienteid(sessioncliente.getId()); 
                promiseGet.then(function (pl) {
                      $scope.idusuario = pl.data.id;
                    //alert(JSON.stringify(pl.data))
                    //$scope.usuario = pl.data;
                },
                function (errorPl) {
                    console.log('failure loading Perfiles', errorPl);
                });
            }
            if($scope.idface != null){
                var promiseGet = sesionService.getbyclienteid(sessioncliente.getIdface()); 
                promiseGet.then(function (pl) {
                    $scope.idusuario = pl.data.id;
                    //alert(JSON.stringify(pl.data))
                    //$scope.usuario = pl.data;
                },
                function (errorPl) {
                    console.log('failure loading Perfiles', errorPl);
                });
            }

        }
          

	/*
	* 	
	*/
	$scope.pedirTurno = function(empleado){
		var object = {
			"idCliente":  		$scope.idusuario,
			"idEmpleado": 		empleado.idEmpleado,
			"idSucursal": 		document.getElementsByName('idsucursal')[0].value,
			"idServicio": 		empleado.idServicio,
            "numeroTurnos":     valor
		};
                //alert(JSON.stringify(object))   
		var promisePost = mapasectoresService.postpedirturno(object);

		promisePost.then(function (d) {
			
			toastr.success(d.data.msg)
			$('#myModal').modal('hide');
			    
        }, function (err) {

                if(err.status == 401){
                    alert(err.data.msg);
                    console.log(err.data.exception);

                }else{

                    //alert("Error Al procesar Solicitud");

                }
                toastr.success(err.data.msg)
                $('#myModal').modal('hide');
                console.log("Some Error Occured "+ JSON.stringify(err));
        });
	}

	/*
	* buscar sucursale en el mapa
	*/
	$scope.buscarservicios = function(){
		//alert(document.getElementsByName('idsector')[0].value)
		var id = document.getElementsByName('idsector')[0].value
		initMapcliente(id)
	}

	/*
	*	empleados de esa sucursal disponibles
	*/
	function empleadossucursal(idsucursal,idservicio,sucursal){
        //alert("idse"+idservicio+"idsu"+idsucursal+"su"+sucursal)
		var promiseGet = mapasectoresService.getempleadosucursal(idsucursal,idservicio); 
        promiseGet.then(function (pl) {
            
        	if(pl.data != ""){
        		$scope.idSucursalempresa = idsucursal;
        		$scope.sucursal = sucursal
        		$scope.Empleadosucursal = pl.data
                //alert(JSON.stringify($scope.Empleadosucursal))
                numeroscupos()
        		$('#myModal').modal('show');
        	}
        	if(pl.data == ""){
        		toastr.success("En esta sucursal no hay empleados registrados")
        	}
            
        },
        function (errorPl) {
            console.log('failure loading perfil', errorPl);
        });
	}
	/*
	* inicializacion del mapa
	*/
	function initMapcliente(idservicio){

	  	map = new google.maps.Map(document.getElementById('mapa'), {
	    	center: {lat: -34.397, lng: 150.644},
	    	zoom: 15
	  	});

	  		//var infoWindow = new google.maps.InfoWindow({map: map});

	  	if (navigator.geolocation) {
        	navigator.geolocation.getCurrentPosition(function(position) {

        	var pos = {
            	lat: position.coords.latitude,
            	lng: position.coords.longitude
        	};

        	lat = JSON.stringify(pos.lat)
        	long = JSON.stringify(pos.lng)
        	//alert(lat+' '+long)
        	var geocoder = new google.maps.Geocoder;
        	var infowindow = new google.maps.InfoWindow;
        	//getsucursalescercanas(idservicio,lat,long)
        	geocodeLatLng(geocoder,map,infowindow,lat,long,idservicio)
        	//alert(JSON.stringify(pos.lat))
        		//infoWindow.setPosition(pos);
      			//infoWindow.setContent('Esta es tu ubicacion actual');
      			var ubicacion = "Esta es tu ubicacion actual"
            	map.setCenter(pos);
            	var marker = new google.maps.Marker({
            		position: pos,
            		map: map,
            		animation: google.maps.Animation.DROP
            	});
            	marker.setIcon('/images/male-2.png');
            	(function(marker, ubicacion) {
		            google.maps.event.addListener(marker, 'click', function() {
		            var infoWindow = new google.maps.InfoWindow({mapa: map});
		            infoWindow.setContent(ubicacion);
		            infoWindow.open(map, marker);
		            //infoWindow = new google.maps.InfoWindow({map: map});
		        });
      			})(marker, ubicacion);

	        },function() {
	            handleLocationError(true, infoWindow, map.getCenter());
	        });
	    }else{
	    	handleLocationError(false, infoWindow, map.getCenter());
	    }

	}
	/*
	* agregar market de tu posicion
	*/
	function addMarker(location, map) {
	    
	    if(marker!=null){
	        marker.setMap(null);
	    }
    	localizacion = location;
	    marker = new google.maps.Marker({
	        position: location,
	        label: labels[labelIndex++ % labels.length],
	        map: map
	    });

	}
	/*
	* Agregamos market de las sucursales mas cercanas
	*/
	function addMarkersucursales(location,datos,idservicio) {
      // Add the marker at the clicked location, and add the next-available labe
      	var contenido = "<h5>"+datos.nombre+"</h5><br>"+"Telefono<br>"+datos.telefono+"<br>"+
                        "Direccion<br>"+datos.direccion+"<br>Estado<br>"+datos.estado;

        var marker = new google.maps.Marker({
            position: location,
            animation: google.maps.Animation.DROP,
            map: map
        });
        marker.setIcon('/images/marker_empresa.png');
        (function(marker, contenido) {
            google.maps.event.addListener(marker, 'click', function() {
            infoWindow = new google.maps.InfoWindow({map1: map});
            infoWindow.setContent(contenido);
            //infoWindow.open(map, marker);
            empleadossucursal(datos.id,idservicio,datos.nombre)
        });
      	})(marker, contenido);

    }
    /*
    * Encontramos la ciudad por medio de la latitud y longuitud
    */
   function geocodeLatLng(geocoder, map, infowindow,lat,long,idservicio) {
  		var latlng = {lat: parseFloat(lat), lng: parseFloat(long)}
  		geocoder.geocode({'location': latlng}, function(results, status) {
    		if (status === google.maps.GeocoderStatus.OK) {
      			if (results[1]) {
        			map.setZoom(14);
			        /*var marker = new google.maps.Marker({
			          	position: latlng,
			          	map: map
			        });*/
		        	//infowindow.setContent(results[1].formatted_address);
		        	var city = results[2].formatted_address
                    //alert(city)
		        	var ciudad = city.split(",",1)
                    //alert(ciudad)
		        	sucursalesciudad(idservicio,ciudad,lat,long)
		        	//alert(ciudad)
		        	//console.log(results[0].geometry.location)
		        	//infowindow.open(map, marker);
      			} else {
        			window.alert('No results found');
      			}
    		} else {
      			window.alert('Geocoder failed due to: ' + status);
    		}
 		});
	}



})