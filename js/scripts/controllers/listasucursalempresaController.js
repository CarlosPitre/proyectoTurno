app.controller('listasucursalempresaController', function ($scope, listasucursalempresaService,listasucursalService) {

	initMap1();
	getAllSurcusales()
	$scope.idempresa = session.getIdempresa()

	$scope.predicate = 'name';  
    $scope.reverse = true;  
    $scope.currentPage = 1; 
    $scope.listasucursalempresa = []

    $scope.order = function (predicate) {  
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
        $scope.predicate = predicate;  
    };   

    //$scope.totalItems = $scope.Sector.length;
    
    $scope.numPerPage = 5;

    $scope.paginate = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.listasucursalempresa.indexOf(value);  
        return (begin <= index && index < end);  
    };

    function getAllSurcusales(){
    	//alert($scope.idempresa)
    	var promiseGet = listasucursalService.listaSucursalesxEmpresa(session.getIdempresa()); 
        promiseGet.then(function (pl) {
            
            $scope.listasucursalempresa = pl.data;
            $scope.totalItems = $scope.listasucursalempresa.length;
            $.each(pl.data,function(index,item){
                var label = item.nombre;
                var location = new google.maps.LatLng(item.latitud, item.longitud);
                addMarker(location,item);
            });
            
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
        
    }

    function addMarker(location,datos) {
      // Add the marker at the clicked location, and add the next-available labe
        var contenido = "<h5>"+datos.nombre+"</h5><br>"+"Telefono<br>"+datos.telefono+"<br>"+
                        "Dirección<br>"+datos.direccion+"<br>Estado<br>"+datos.estado;

        var marker = new google.maps.Marker({
            position: location,
            label: datos.nombre,
            animation: google.maps.Animation.DROP,
            map: map
        });
        (function(marker, contenido) {
            google.maps.event.addListener(marker, 'click', function() {
            infoWindow = new google.maps.InfoWindow({map: map});
            infoWindow.setContent(contenido);
            infoWindow.open(map, marker);

        });
      })(marker, contenido);

    }


})