app.controller('mapasectoresagendaController', function ($scope,$routeParams,mapasectoresService) {

	$scope.idSector = $routeParams.sector;
	$scope.servicios = [];
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
	* buscar sucursale en el mapa
	*/
	$scope.buscarservicios = function(){
		//alert(document.getElementsByName('idsector')[0].value)
		var id = document.getElementsByName('idsector')[0].value
		initMapcliente(id)
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
        var contenido = "<h5>"+datos.nombre+"</h5><br>"+"<h3><a href='#cliente/reservar/"+idservicio+"/"+datos.id+"/"+$scope.idSector+"/"+datos.nombre+"'>Hacer Reserva</a></h3>"+
      					"Telefono<br>"+datos.telefono+"<br>"+
                        "Direccion<br>"+datos.direccion;

        var marker = new google.maps.Marker({
            position: location,
            animation: google.maps.Animation.DROP,
            map: map
        });
        marker.setIcon('/images/marker_empresa.png');
        (function(marker, contenido) {
            google.maps.event.addListener(marker, 'click', function() {
            infoWindow = new google.maps.InfoWindow({map1: map,maxWidth: 200});
            infoWindow.setContent(contenido);
            infoWindow.open(map, marker);
            //empleadossucursal(datos.id,idservicio,datos.nombre)
        });
      	})(marker, contenido);

    }

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
	

})