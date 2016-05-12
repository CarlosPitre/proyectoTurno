app.controller('listasucursalController', function ($scope, listasucursalService,sectorService,sucursalService) {

    $scope.title = "Listas De Sucursales";
    $scope.title1 = "Lista De Sectores";
    $scope.title2 = "Lista De Sucursales De La Empresa";
    $scope.title3 = "Lista De Sucursales Registradas Por Sectores";
    $scope.idperfil = session.getIdperfil();
    $scope.idempresa = session.getIdempresa()
    $scope.listacheck = {}
    $scope.checkeds = false
    $scope.listasucursales = []
    $scope.listasucursalempresa = []

    initMap1();
    getAllSectores();
    getAllSurcusales();
    DepartamentoRegistradas();
    $scope.Sector = [];

    $scope.predicate = 'name';  
    $scope.reverse = true;  
    $scope.currentPage = 1; 


    function DepartamentoRegistradas(){
        var promiseGet = sucursalService.departamentosregistrados(); 
        promiseGet.then(function (pl) {
            //console.log(JSON.stringify(pl.data));
            $scope.departamentos = pl.data;
            var dep = document.getElementsByName('departamento')[0];
            dep.innerHTML = "";

            for(var i=0;i<pl.data.length;i++){
                departamento = pl.data[i].nombre;
                dep.innerHTML += "<option value='"+pl.data[i].id+"'>"+pl.data[i].nombre+"</option>"             
            }


        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });
    }

    $scope.buscarmun = function(){
        //alert($scope.Sucursal.iddepartamento);
        var promiseGet = sucursalService.municipioscondepartamento($scope.Sucursal.iddepartamento); 
        promiseGet.then(function (pl) {
            //console.log(JSON.stringify(pl.data));
            $scope.municipios = pl.data;
            //alert(JSON.stringify($scope.municipios));
            var mun = document.getElementsByName('listamunicipios')[0];
            mun.innerHTML = "";

            for(var i=0;i<pl.data.length;i++){
                municipio = pl.data[i].nombre;
                mun.innerHTML += "<option value='"+pl.data[i].id+"'>"+pl.data[i].nombre+"</option>" 
                nombremun = pl.data[i].nombre;            
            }


        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });
    }

    $scope.geocoder = function(){
        var promiseGet = sucursalService.getdepartamentomunicipio($scope.Sucursal.idmunicipio); 
        promiseGet.then(function (pl) {
            $scope.depa = pl.data.departamento;
            $scope.muni = pl.data.nombre;
            var geo = pl.data.departamento+' '+pl.data.nombre;
            GetLocation3(geo);
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    }

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
        index = $scope.Sector.indexOf(value);  
        return (begin <= index && index < end);  
    };

    /*
    * paginations lista de sucursales
    */
    $scope.numPerPage1 = 5;
    $scope.currentPage1 = 1; 
    $scope.paginate1 = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage1 - 1) * $scope.numPerPage1;  
        end = begin + $scope.numPerPage1;  
        index = $scope.listasucursales.indexOf(value);  
        return (begin <= index && index < end);  
    };

    function getAllSectores(){
        var promiseGet = sectorService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Sector = pl.data;
            //alert(JSON.stringify($scope.Sector));
            $scope.totalItems = $scope.Sector.length;
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    }
    
    function getAllSurcusales(){

        if($scope.idperfil == 3){
        
            var promiseGet = listasucursalService.listaSucursalesxEmpresa($scope.idempresa); 
            promiseGet.then(function (pl) {
                //$scope.listasucursal = pl.data;
                //console.log(pl.data);
                //alert(JSON.stringify(pl.data))
                $scope.listasucursalempresa = pl.data;
                //alert(JSON.stringify($scope.listasucursalempresa))
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
            infoWindow = new google.maps.InfoWindow({map1: map});
            infoWindow.setContent(contenido);
            infoWindow.open(map, marker);
            //infoWindow = new google.maps.InfoWindow({map: map});
        });
      })(marker, contenido);

    }

    var markers = [];

    function addMarkersector(location,datos,id) {
      // Add the marker at the clicked location, and add the next-available labe
        var contenido = "<h5>"+datos.nombre+"</h5><br>"+"Telefono<br>"+datos.telefono+"<br>"+
                        "Dirección<br>"+datos.direccion+"<br>Estado<br>"+datos.estado;
        
        //alert(JSON.stringify(datos.nombre))
        var marker = new google.maps.Marker({
            position: location,
            label: datos.nombre,
            animation: google.maps.Animation.DROP,
            map: map
        });
        marker.set("id",id);
        markers.push(marker);
        (function(marker, contenido) {
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow = new google.maps.InfoWindow({map1: map});
                infoWindow.setContent(contenido);
                infoWindow.open(map, marker);
            });
        })(marker, contenido);
    }

    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    function clearMarkers() {
        setMapOnAll(null);
    }

    

    $scope.empresasxsectores = function(sector,$event){
        if($event.currentTarget.checked){

            var promiseGet = listasucursalService.sucursalesxsector(sector.id); 
            promiseGet.then(function (pl) {
                //var div = document.getElementById("tabla");
                //div.innerHTML = "";
                for(var i=0; i<pl.data.length; i++){
                    for(var j=0;j<pl.data[i].servicio.length;j++){
                        $scope.listasucursales = pl.data[i].servicio;
                        $scope.totalItems1 = $scope.listasucursales.length;
                        //$scope.totalItems = $scope.listasucursales.length;
                        //alert(JSON.stringify($scope.listasucursales))
                        var label = pl.data[i].servicio[j].nombre;
                        var location = new google.maps.LatLng(pl.data[i].servicio[j].latitud, 
                                    pl.data[i].servicio[j].longitud);
                        addMarkersector(location,pl.data[i].servicio[j],sector.id);
                        $scope.checkeds = true;
                        //
                    }
                }

            },
            function (errorPl) {
                console.log('failure loading Deportes', errorPl);
            });
        }
        else{
            for(var i=0;markers.length;i++){
                if(markers[i].get("id")==sector.id){
                    markers[i].setMap(null);
                }
            }
            
        }
    }

    

})