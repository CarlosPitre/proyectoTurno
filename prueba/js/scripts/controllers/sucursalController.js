app.controller('sucursalController', function ($scope, sucursalService,empresaService,sectorService) {

	$scope.title = "Registrar Sucursales";
    $scope.title1 = "Lista de Sucursales";
    $scope.idperfil = session.getIdperfil();
    $scope.idempresa = session.getIdempresa()

    EmpresasRegistradas();
    //MunicipiosRegistradas();
    DepartamentoRegistradas();
    initMap();
    $scope.empresas = [];
    $scope.idempresa = session.getIdempresa();
    $scope.municipios = [];
    $scope.departamentos = [];
    $scope.Sucursal = [];
    $scope.servicios = [];
    $scope.listacheck = [];
    $scope.listaempresasucursal = [];
    $scope.getsucursal = {};
    $scope.serviciosucursal = {}
    $scope.iddepartamento = {};
    $scope.objectsucursal = {}
    $scope.objectsucursalactivo = {}
    $scope.listasectorempresa = []
    $scope.tipoturno = []
    $scope.idEmpleado;
    $scope.turno = false;
    $scope.precios = {}
    var nombremun;
    var idmax = null;
    var idsucursal;
    $scope.depa;
    $scope.muni;

    initialize();
    //getAllservicio()
    sucursalxempresa()
    listaservicioempresa()
    getAllTipoturno()

    var departamento = null;
    var municipio = null;
    var lat;
    var lng;

    $scope.predicate = 'name';  
    $scope.reverse = true;  
    $scope.currentPage = 1; 
    

    $scope.order = function (predicate) {  
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
        $scope.predicate = predicate;  
    };   
    
    $scope.totalItems = $scope.listaempresasucursal.length;
    $scope.numPerPage = 10;

    $scope.paginate = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.listaempresasucursal.indexOf(value);  
        return (begin <= index && index < end);  
    };

    function initialize(){
        $scope.Sucursal = { 
            "nombre": "",
            "direccion":"",
            "telefono":"",
            "promedio":"",
            "iddepartamento":"",
            "idmunicipio":"",
            "usuario":"",
            "pass":"",
            servicio: []
        }

    }

    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-center",
        "showDuration": "50000",
        "progressBar": true,
        "hideDuration": "50000",
    }
    
    $scope.verLocalizado = function(){
        //alert(JSON.stringify(localizacion));
        lat = localizacion.lat()
        lng = localizacion.lng()
    }

    function EmpresasRegistradas(){
    	var promiseGet = empresaService.empresaregistradas(); 
        promiseGet.then(function (pl) {
         	//console.log(JSON.stringify(pl.data));
            $scope.empresas = pl.data;
            //alert(JSON.stringify($scope.empresas));
        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });
    }
    
    function getAllsucursal(){
        var promiseGet = sucursalService.listaServicios($scope.idempresa); 
        promiseGet.then(function (pl) {
            //console.log(JSON.stringify(pl.data));
            $scope.servicios = pl.data;
            //alert(JSON.stringify($scope.servicios));
        },
        function (errorPl) {
            console.log('failure loading Servicios', errorPl);
        });
    }

    
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
            GetLocation2(geo);
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    }

    $scope.buscarDireccion  = function(direccion){
        var buscar = direccion+" "+$scope.depa+" "+$scope.muni;
        if($scope.muni == ""){
            alert("No se ha agregado un municipio en donde buscar");
        }else{
            GetLocation(buscar);    
        }
        
    };

    function validar(){

        if(document.getElementsByName('listamunicipios')[0].value=="" || 
            document.getElementsByName('direccion')[0].value == "" )
            return true;
        else
            return false;
        
    }

    $scope.registrarSucursal = function(){
        if(validar() == true){
            toastr.success("Los campos direccion y municipios son obligatorios")
        }else{

            if(document.getElementsByName("pass")[0].value != document.getElementsByName("pass1")[0].value){
                toastr.success("Las contraseñas no coinciden")
            }else{
                var object = {
                    "idEmpresa":        $scope.idempresa,
                    "idMunicipio":      document.getElementsByName("listamunicipios")[0].value,
                    "nombre":           document.getElementsByName("nombre")[0].value,
                    "direccion":        document.getElementsByName("direccion")[0].value,
                    "telefono":         document.getElementsByName("telefono")[0].value,
                    "latitud":          latitud,
                    "longitud":         longuitud,
                    "promedio":         '0',
                    "pass":             document.getElementsByName("pass")[0].value,
                    "nombres":          document.getElementsByName("nombreadmin")[0].value,
                    "apellidos":        document.getElementsByName("apellidoadministrador")[0].value,
                    "identificacion":   document.getElementsByName("idadmin")[0].value,
                    "telefonoadmin":    document.getElementsByName("telefonoadmin")[0].value,
                    "email":            document.getElementsByName("email")[0].value
                    //"servicios":        $scope.listacheck
                }
                var promisePost = sucursalService.postsucursal(object);

                promisePost.then(function (d) {

                    toastr.success(d.data.msg);
                    //document.getElementsByName("promedio")[0].value = "";
                    document.getElementsByName("pass")[0].value = "";
                    document.getElementsByName("nombreadmin")[0].value = "";
                    document.getElementsByName("apellidoadministrador")[0].value = "";
                    document.getElementsByName("idadmin")[0].value = "";
                    document.getElementsByName("telefonoadmin")[0].value = "";
                    document.getElementsByName("email")[0].value = "";
                    document.getElementsByName("pass1")[0].value = "";

                    
                    maximoid();
                    sucursalxempresa();
                    marker.setMap(null);
                    limpiar();

                        
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

        }
        

    }


    function limpiar(){
        document.getElementsByName("nombre")[0].value = ""
        document.getElementsByName("direccion")[0].value = ""
        document.getElementsByName("telefono")[0].value = ""
        //document.getElementsByName("promedio")[0].value = ""
        //document.getElementsByName("user")[0].value = ""
        document.getElementsByName("pass")[0].value = ""
        document.getElementsByName("nombreadmin")[0].value = ""
        document.getElementsByName("apellidoadministrador")[0].value = ""
        document.getElementsByName("idadmin")[0].value = ""
        document.getElementsByName("telefonoadmin")[0].value = ""
        document.getElementsByName("email")[0].value = ""


    }

    function maximoid(){
        var promiseGet = sucursalService.maxsucursal(); 
        promiseGet.then(function (pl) {
            idmax = pl.data;
            agregarservicios(idmax)
            agregarturnosucursal(idmax)
            //$scope.adminsucursal(idmax);
            //$scope.guardarserviciosucursal(idmax);
            //alert(idmax);
        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });
    };

    
    /*$scope.agregarservicios = function(servis,$event){
        alert(servis)
        if($event.currentTarget.checked){
            $scope.listacheck.push(servis);
            //alert(JSON.stringify($scope.listacheck))
        }else{
            var temp = angular.copy($scope.listacheck);
            $scope.listacheck = [];
            for(var i=0;i<temp.length;i++){
                if(temp[i].id != servis.id){
                    $scope.listacheck.push(temp[i]);
                    //alert(JSON.stringify($scope.listacheck))
                }
            }
        }

    }*/

    $scope.adminsucursal = function(id){
        var object = {
            "nombres":          document.getElementsByName("nombreadmin")[0].value,
            "apellidos":        document.getElementsByName("apellidoadmin")[0].value,
            "identificacion":   document.getElementsByName("idadmin")[0].value,
            "pass":             document.getElementsByName("pass")[0].value,
            "telefono":         document.getElementsByName("telefonoadmin")[0].value,
            "idperfil":         '4',
            "idSucursal":       id
        }
        //alert(JSON.stringify(object))
        var promisePost = sucursalService.postadminsucursal(object);

        promisePost.then(function (d) {

            //alert(d.data.msg);
            document.getElementsByName("nombreadmin")[0].value = "";
            document.getElementsByName("apellidoadmin")[0].value = "";
            document.getElementsByName("idadmin")[0].value = "";
            document.getElementsByName("pass")[0].value = "";
            document.getElementsByName("telefonoadmin")[0].value = "";
            getAllsucursal();
                
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

    function sucursalxempresa(){
        var promiseGet = sucursalService.listaSucursalesxEmpresas($scope.idempresa); 
        promiseGet.then(function (pl) {
            $scope.listaempresasucursal = pl.data;
            $scope.totalItems = $scope.listaempresasucursal.length;
            //alert(JSON.stringify($scope.listaempresasucursal))
        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });
    };

    $scope.get = function(sucursal){
        primero = false;
        $scope.getsucursal = sucursal;
        $scope.verdad = true;
        $scope.turno = true;
        //alert(JSON.stringify($scope.getsucursal))
        var label = $scope.getsucursal.nombre;
        var location = new google.maps.LatLng($scope.getsucursal.latitud, $scope.getsucursal.longitud);
        addMarker(location,map);
        lat = $scope.getsucursal.latitud;
        lng = $scope.getsucursal.longitud;
        document.getElementsByName("nombre")[0].value = $scope.getsucursal.nombre;
        document.getElementsByName("direccion")[0].value = $scope.getsucursal.direccion;
        document.getElementsByName("telefono")[0].value = $scope.getsucursal.telefono;
        //document.getElementsByName("promedio")[0].value = $scope.getsucursal.promedio;
        document.getElementsByName("pass")[0].disabled = true;
        document.getElementsByName("pass1")[0].disabled = true;
        //document.getElementsByName("departamento")[0].disabled = true;
        //document.getElementsByName("listamunicipios")[0].disabled = true;
        serviciosucursal($scope.getsucursal.id)
        $scope.listatipoturno($scope.getsucursal.id)
        idsucursal = $scope.getsucursal.id;

        /*
        * Empleados registrados por sucursal
        */

        var promiseGet = sucursalService.getempleadobysucursal($scope.getsucursal.id); 
        promiseGet.then(function (pl) {
            angular.forEach(pl.data, function(item, key){
                $scope.idEmpleado = item.id;
                document.getElementsByName("nombreadmin")[0].value = item.nombres;
                document.getElementsByName("apellidoadministrador")[0].value = item.apellidos;
                document.getElementsByName("idadmin")[0].value = item.identificacion;
                document.getElementsByName("telefonoadmin")[0].value = item.telefono;
                document.getElementsByName("email")[0].value = item.email;
            })
        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });

        /*
        *  Departamentos con municipios
        */

        var promiseGet = sucursalService.getDepartamento($scope.getsucursal.idMunicipio); 
        promiseGet.then(function (pl) {
            $scope.iddepartamento = pl.data;
            $.each(pl.data,function(index,item){
                //alert(item.idDepartamento)
                document.getElementsByName("departamento")[0].value = item.idDepartamento;
                $scope.buscarmunicipio(item.idDepartamento,item.id)
                /*var promiseGet1 = sucursalService.municipioscondepartamento(item.idDepartamento); 
                promiseGet1.then(function (pl) {
                    var mun = document.getElementsByName('listamunicipios')[0];
                    mun.innerHTML = "";
                    $.each(pl.data,function(){
                        mun.innerHTML += "<option value='"+item.id+"'>"+item.nombre+"</option>"
                    })
                },
                function (errorPl) {
                    console.log('failure loading city', errorPl);
                });*/
            });
        },
        function (errorPl) {
            console.log('failure loading departamento', errorPl);
        });

        /*var promiseGetAdmin = sucursalService.getAdmin($scope.getsucursal.id); 

        promiseGetAdmin.then(function (pl) {
            
            angular.forEach(pl.data, function(item, value){
                alert(JSON.stringify(item))
                document.getElementsByName("nombreadmin")[0].value = item.nombres;
                document.getElementsByName("apellidoadmin")[0].value = item.apellidos;
                document.getElementsByName("idadmin")[0].value = item.identificacion;
                document.getElementsByName("telefonoadmin")[0].value = item.telefono;
            });
            
        },

        function (errorPl) {
            console.log('failure loading delete services', errorPl);
        });*/
        
    }

    $scope.buscarmunicipio = function(id,id2){
        var promiseGet = sucursalService.municipioscondepartamento(id); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data));
            $scope.municipios = pl.data;
            //alert(JSON.stringify($scope.municipios));
            var mun = document.getElementsByName('listamunicipios')[0];
            mun.innerHTML = "";

            for(var i=0;i<pl.data.length;i++){
                municipio = pl.data[i].nombre;
                mun.innerHTML += "<option value='"+pl.data[i].id+"'>"+pl.data[i].nombre+"</option>" 
                nombremun = pl.data[i].nombre;            
            }
            document.getElementsByName('listamunicipios')[0].value = id2;


        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });
    }

    $scope.sersu = [];
    $scope.verdad = false;

    function serviciosucursal(id){
        var promiseGet = sucursalService.getserviciosempresa($scope.idempresa); 
        promiseGet.then(function (pl) {
            //var prim = false;
            
            var promiseGet1 = sucursalService.sucursalservicios(id); 
            promiseGet1.then(function (pl1) {
                var check = false;
                var lista = document.getElementById("idservis");
                lista.innerHTML = "";

                for(var k=0;k<pl.data.length;k++){
                    for(var i=0;i<pl.data[k].servicio.length;i++){
                        //alert(pl.data[k].servicio[i].nombre)
                        for(var j = 0; j < pl1.data.length; j++){
                            if(pl.data[k].servicio[i].idServicio == pl1.data[j].idServicio){
                                check=true;
                                break;
                            }
                        }
                        if(check){
                            $scope.verdad = true;
                            lista.innerHTML += "<div ><label><input type='checkbox' id='"+pl.data[k].servicio[i].idServicio+
                            "' value='"+pl.data[k].servicio[i].idServicio+"' checked='checked'/>"+pl.data[k].servicio[i].nombre+"</label></div>"
                        }else{
                            $scope.verdad = true;
                            lista.innerHTML += "<div ><label><input type='checkbox' id='"+pl.data[k].servicio[i].idServicio+
                            "' value='"+pl.data[k].servicio[i].idServicio+"'/>"+pl.data[k].servicio[i].nombre+"</label></div>"
                        }
                            check=false;

                    }
                }

            },function (errorPl) {
                console.log('failure loading Servicios1', errorPl);
            });

        },
        function (errorPl) {
            console.log('failure loading Servicios', errorPl);
        });
    }

    $scope.updateSucursal = function(){
        var promiseGet = sucursalService.deletesucursalservicios(idsucursal);
                
        promiseGet.then(function (pl) {
            $scope.actualizarsucursal()
            eliminar(idsucursal)
            guardarlistaservicios(idsucursal);
            sucursalxempresa()
            
        },

        function (errorPl) {
            console.log('failure loading delete services', errorPl);
        });
    }

    function eliminar(id){
        var promisedelete  = sucursalService.deletetipoturnosucursal(id);        
        promisedelete.then(function (d) {                              
            guardarlistatiposucursal(idsucursal);
        }, function (err) {                         
            console.log("Some Error Occured "+ JSON.stringify(err));
        });
    }
    
    function guardarlistaservicios(idsucursal){
        var list = document.getElementById("idservis");
        //alert(list[0])
        for(var i=0; i<list.length; i++){
            if(list[i].checked){
                //alert(JSON.stringify(list[i].value))
                var object = {
                    idSucursal:         idsucursal, 
                    idServicio:         list[i].value   
                };
                var promisePost = sucursalService.postservisucursal(object);
            }
        }

        promisePost.then(function (d) {

            toastr.success(d.data.msg);

            

            //$scope.modificarsucursal(idsucursal)
                
        }, function (err) {

                if(err.status == 401){
                    //alert(err.data.msg);
                    console.log(err.data.exception);

                }else{

                    //alert("Error Al procesar Solicitud");

                }

                console.log("Some Error Occured "+ JSON.stringify(err));
        });

    }

    function guardarlistatiposucursal(idsucursal){
        var list = document.getElementById("idturno");
        //alert(list[0])
        for(var i=0; i<list.length; i++){
            if(list[i].checked){
                //alert(JSON.stringify(list[i].value))
                var object = {
                    idsucursal:         idsucursal, 
                    idtipoturno:        list[i].value   
                };
                //alert(JSON.stringify(object))
                var promisePost = sucursalService.posttiposucursal(object)
            }
        }

        promisePost.then(function (d) {

            //alert(d.data.msg);
                
        }, function (err) {

                if(err.status == 401){
                    //alert(err.data.msg);
                    console.log(err.data.exception);

                }else{

                    //alert("Error Al procesar Solicitud");

                }

                console.log("Some Error Occured "+ JSON.stringify(err));
        });

    }

    

    $scope.getestadodesactivar = function(lista){
        $scope.objectsucursal = lista;
        //alert(JSON.stringify($scope.objectsucursal));
        $('#myModal').modal('show');
    }

    $scope.getestadoactivar = function(lista){
        $scope.objectsucursalactivo = lista;
        //alert(JSON.stringify($scope.objectsucursal));
        $('#myModal1').modal('show');
    }

    $scope.modalprecios = function(lista){
        $scope.precios = lista;
        //alert(JSON.stringify($scope.precios.id));
        var campos = document.getElementById("campos");
        campos.innerHTML = "";
        var promiseGet = sucursalService.sucursalservicios($scope.precios.id); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data))
            idservi = new Array()
            for(var i=0;i<pl.data.length;i++){
                idservi.push(pl.data[i].id)
                campos.innerHTML += "<div class='col-md-5'><h5>"+pl.data[i].servicio+" estandar</h5><input type='number' value='"+pl.data[i].precio+"' name='camponormal' class='form-control' placeholder='"+pl.data[i].servicio+" estandar'><br>"+
                "<h5>"+pl.data[i].servicio+" VIP</h5><input type='number' class='form-control' value='"+pl.data[i].precioVIP+"' name='campovip' placeholder='"+pl.data[i].servicio+" VIP'></div>"
            } 
        },
        function (errorPl) {
            console.log('failure loading sector', errorPl);
        });

        $('#myModalprecio').modal('show');

    }
    var idservi; 
    $scope.agregarprecios = function(){
        //alert(idservi)
        var frmvip = document.getElementsByName("campovip");
        var frmnor = document.getElementsByName("camponormal");
        var v = new Array();
        var v1 = new Array()

        for(var i=0;i<frmvip.length;i++){
            v.push(frmvip[i].value)
            //alert(v)
        }

        for(var i=0;i<frmnor.length;i++){
            v1.push(frmnor[i].value)
            //alert(frm1[i].value)
        }

        for(var i=0;i<idservi.length;i++){
            //alert(idservi[i])
            //alert(v[i])
            var object = {
                precio:     v1[i],
                precioVIP:  v[i]
            }
            //alert(JSON.stringify(object)+" "+idservi[i])
            var promisePut  = sucursalService.putsucusalservice(idservi[i],object);
        }

        promisePut.then(function (d) {

            toastr.success(d.data.msg)
            $('#myModalprecio').modal('hide');

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

    $scope.desactivarestado = function(){
        var object = {
            estado:     "INACTIVO"
        }; 
        //alert(JSON.stringify(object)+" "+$scope.servicios.id)
        var promisePut  = sucursalService.putsucursaldesactivo($scope.objectsucursal.id, object);
        
        promisePut.then(function (d) {

            //initialize();
            sucursalxempresa();
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

    $scope.activarestado = function(){
        var object = {
            estado:     "ACTIVO"
        }; 
        //alert(JSON.stringify(object)+" "+$scope.servicios.id)
        var promisePut  = sucursalService.putsucursaldesactivo($scope.objectsucursalactivo.id, object);
        
        promisePut.then(function (d) {

            //initialize();
            sucursalxempresa();
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


    /*
    * lista de servicios sin registrar
    */
    function listaservicioempresa(){
        //alert($scope.idempresa)
        var promiseGet = sucursalService.getserviciosempresa($scope.idempresa); 
        promiseGet.then(function (pl) {
            //$scope.listasectorempresa = pl.data;
            //alert(JSON.stringify(pl.data.length))
            var lista = document.getElementById("items");
                lista.innerHTML = "";
            angular.forEach(pl.data,function(item,key){
                //alert(JSON.stringify(item.servicio.nombre))
                
                for(var i=0;i<item.servicio.length;i++){
                    lista.innerHTML += "<div><label>"+"<input type='checkbox' value='"+item.servicio[i].idServicio+"'"+ 
                   "name='servisucur'>"+item.servicio[i].nombre+"</label></div>"
                }
                
            })
        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });
    }
    /*
    *   lista de turnos sin registrar
    */
    function getAllTipoturno(){
        var promiseGet = sectorService.getTipoturno(); 
        promiseGet.then(function (pl) {
            $scope.tipoturno = pl.data;
            var lista = document.getElementById("turno");
            lista.innerHTML = "";
            angular.forEach(pl.data,function(item,key){
                lista.innerHTML += "<div ><label>"+"<input type='checkbox'"+
                "value='"+item.id+"'"+ 
                "name='servisucur'>"+item.nombre+"</label></div>"
            })

        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    }

    $scope.listatipoturno = function(idsector){
        var promiseGet = sectorService.getTipoturno(); 
        promiseGet.then(function (pl) {
            var promiseGet1 = sectorService.getTipoturnosector(idsector); 
                promiseGet1.then(function (pl1) {
                    var check = false;
                    var lista = document.getElementById("idturno");
                    lista.innerHTML = "";
                    for(var i=0;i<pl.data.length;i++){
                        for(var j=0;j<pl1.data.length;j++){
                            if(pl.data[i].id == pl1.data[j].idtipoturno){
                                check=true;
                                break;
                            }
                        }
                        if(check){
                            $scope.turno = true;
                            lista.innerHTML += "<div ><label><input type='checkbox' id='"+pl.data[i].id+
                            "' value='"+pl.data[i].id+"' checked='checked' />"+ pl.data[i].nombre+"</label></div>"
                        }else{
                            $scope.turno = true;
                            lista.innerHTML += "<div ><label><input type='checkbox' id='"+pl.data[i].id+
                            "' value='"+pl.data[i].id+"' />"+ pl.data[i].nombre+"</label></div>"
                        }
                            check=false;
                    }

                },
                function (errorPl) {
                    console.log('failure loading Deportes', errorPl);
                });
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    }

    function agregarservicios(idsucursal){
        var list = document.getElementById("items");
        //alert(list[0])
        for(var i=0; i<list.length; i++){
            if(list[i].checked){
                //alert(list[i].value)
                var object = {
                    idSucursal:         idsucursal, 
                    idServicio:         list[i].value   
                };
                //alert(JSON.stringify(object))
                var promisePost = sucursalService.postservisucursal(object);
            }
        }

        promisePost.then(function (d) {

            //alert(d.data.msg);
            for(var i=0; i<list.length; i++){
                if(list[i].type == "checkbox"){
                    list[i].checked = 0
                }
            }
                
        }, function (err) {

                if(err.status == 401){
                    //alert(err.data.msg);
                    console.log(err.data.exception);

                }else{

                    alert("Error Al procesar Solicitud");

                }

                console.log("Some Error Occured "+ JSON.stringify(err));
        });

    }

    function agregarturnosucursal(idsucursal){
        var list = document.getElementById("turno");
        //alert(list[0])
        for(var i=0; i<list.length; i++){
            if(list[i].checked){
                //alert(list[i].value)
                var object = {
                    idsucursal:         idsucursal, 
                    idtipoturno:        list[i].value   
                };
                //alert(JSON.stringify(object))
                var promisePost = sucursalService.posttiposucursal(object);
            }
        }

        promisePost.then(function (d) {

            //alert(d.data.msg);
            //
            for(var i=0; i<list.length; i++){
                if(list[i].type == "checkbox"){
                    list[i].checked = 0
                }
            }
                
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

    $scope.actualizarsucursal = function(){
        var lacactual
        var lngactual 
        if(latitud == null && longuitud == null){
            lacactual = lat
            lngactual = lng
        }else{
            lacactual = latitud;
            lngactual = longuitud
        }
        var object = {
            "idMunicipio":      document.getElementsByName("listamunicipios")[0].value,
            "nombre":           document.getElementsByName("nombre")[0].value,
            "direccion":        document.getElementsByName("direccion")[0].value,
            "telefono":         document.getElementsByName("telefono")[0].value,
            "latitud":          lacactual,
            "longitud":         lngactual,
            "nombres":          document.getElementsByName("nombreadmin")[0].value,
            "apellidos":        document.getElementsByName("apellidoadministrador")[0].value,
            "identificacion":   document.getElementsByName("idadmin")[0].value,
            "telefonoadmin":    document.getElementsByName("telefonoadmin")[0].value,
            "email":            document.getElementsByName("email")[0].value
        }
        //alert(JSON.stringify(object)+" "+idsucursal+" "+$scope.idEmpleado)
        var promisePut = sucursalService.putsucursal(object,idsucursal,$scope.idEmpleado);

            promisePut.then(function (d) {

                //toastr.success(d.data.msg);
                getAllsucursales()

                    
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

    $scope.modalhoras = function(lista){
        $scope.horas = lista;
        serviciosxhora(lista.id)
        $('#myModalhoras').modal('show');
        
    }

    function serviciosxhora(idsucursal){
        var promiseGet = sucursalService.sucursalservicios(idsucursal); 
        promiseGet.then(function (pl) {
            $scope.sucursalhoras = pl.data; 
        },
        function (errorPl) {
            console.log('failure loading horas', errorPl);
        });
    }

    $scope.time = [{
        id: "",
    }]

    $scope.agregarhoras = function(tiempo,time){
        //alert(tiempo);alert(time.id)
        $scope.updatetiempo(tiempo,time.id)
    }

    $scope.updatetiempo = function(tiempo,id){
        var object = {
            minutos:     tiempo
        }; 
        //alert(JSON.stringify(object)+" "+$scope.servicios.id)
        var promisePut  = sucursalService.puttiemposervicio(object,id);
        
        promisePut.then(function (d) {
            toastr.success("Tiempo modificado correctamente")
            getAllsucursales();
            $('#myModalhoras').modal('hide');

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