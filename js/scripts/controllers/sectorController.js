app.controller('sectorController', function ($scope,ngTableParams,$filter, sectorService) {

	$scope.title = "Registrar Sectores"
	$scope.title1 = "Lista De Sectores"
	$scope.Sector = [];
    $scope.sectores = {};
    $scope.estadoactivo = {}
    $scope.estadodesactivar = {}
    $scope.idempresa = session.getIdempresa();
    $scope.tipoturno = []
    $scope.listacheck = []
	$scope.predicate = 'name';  
    $scope.reverse = true;  
    $scope.currentPage = 1; 

    

    getAllSectores();
    getAllTipoturno()

    $scope.order = function (predicate) {  
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
        $scope.predicate = predicate;  
    };   

    //$scope.totalItems = $scope.Sector.length;
    
    $scope.numPerPage = 10;

    $scope.paginate = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.Sector.indexOf(value);  
        return (begin <= index && index < end);  
    };

    function getAllSectores(){
        var promiseGet = sectorService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Sector = pl.data;
            //alert(JSON.stringify($scope.Sector))
            $scope.totalItems = $scope.Sector.length;
            crearNgTabla()
        },
        function (errorPl) {
            console.log('failure loading sector', errorPl);
        });
    }

    function crearNgTabla(){
        self = this;
        data = $scope.Sector;
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: undefined
        }, { 
            total: $scope.Sector,
            getData: function (a, b) {
                var c = b.sorting ?
                        $filter('orderBy')($scope.Sector, b.orderBy()) :
                        $scope.Sector;
                c = b.filter() ?
                        $filter('filter')(c, b.filter()) :
                        c;
                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
                b.total(c.length);
                a.resolve($scope.usuario);
            }
        });
    }
	

    var i = -1;
    var toastCount = 0;
    var $toastlast;

    var getMessage = function () {
        var msg = 'Hi, welcome to Inspinia. This is example of Toastr notification box.';
        return msg;
    };

    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-center",
        "showDuration": "50000",
        "progressBar": true,
        "hideDuration": "50000",
    }

    

    function validar(){

        if(document.getElementsByName('nombresector')[0].value=="" || 
            document.getElementsByName('descripcion')[0].value == "" ||
            document.getElementsByName('cupos')[0].value == "")
            return true;
        else
            return false;
        
    }



	$scope.registrar = function(){
        if(validar() == true){
            toastr.success("todos los campos son obligatorios")
        }else{
            var object = {
                "nombre":       document.getElementsByName('nombresector')[0].value,
                "descripcion":  document.getElementsByName('descripcion')[0].value,
                "logo":         '/imagenes/noencontrado.png',
                "cupos":        document.getElementsByName('cupos')[0].value,
                "aleatorio":    document.getElementsByName('radio')[0].checked,
                "aplicaReserva": document.getElementsByName('reserva')[0].value
            };
            //alert(JSON.stringify(object))
            var promisePost = sectorService.postsectores(object);

            promisePost.then(function (d) {

                    //alert(d.data.msg);
                    toastr.success(d.data.msg)
                    getAllSectores()
                    document.getElementsByName('nombresector')[0].value = "";
                    document.getElementsByName('descripcion')[0].value = "";
                    document.getElementsByName('cupos')[0].value = "";
                    document.getElementsByName('radio')[0].checked = false
                    document.getElementsByName('reserva')[0].checked = false
                    //location.reload();
                    maximoid();
                    
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
		
	}

    $scope.get = function(sector){
        $scope.sectores = sector;
        //alert(JSON.stringify($scope.sectores))
        //$scope.listatipoturno($scope.sectores.id)
        $('#myModal').modal('show');
    }

    $scope.getestado = function(sector){
        $scope.estadoactivo = sector;
        //alert(JSON.stringify($scope.servicios));
        $('#myModal1').modal('show');
    }

    $scope.getestadodesactivar = function(sector){
        $scope.estadodesactivar = sector;
        //$scope.activarAdmin();
        $('#myModal2').modal('show');
    }

    $scope.modificarservicio = function(){
        var object = {
            nombre:                 $scope.sectores.nombre,
            descripcion:            $scope.sectores.descripcion,
            cupos:                  $scope.sectores.cupos,
            aleatorio:              $scope.sectores.aleatorio,
            aplicaReserva:          $scope.sectores.aplicaReserva
        }; 
        //alert(JSON.stringify(object)+" "+$scope.sectores.id)
        var promisePut  = sectorService.putsector($scope.sectores.id, object);
        
        promisePut.then(function (d) {

            toastr.success(d.data.msg)
            getAllSectores()
            //$('#myModal').modal('hide');
            //guardartipoturnosector($scope.sectores.id)
            $scope.guardarfoto1($scope.sectores.id)
            

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
        var promisePut  = sectorService.putservicioestado($scope.estadoactivo.id, object);
        
        promisePut.then(function (d) {

            toastr.success(d.data.msg)
            getAllSectores();
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

    $scope.desactivarestado = function(){
        var object = {
            estado:     "INACTIVO"
        }; 
        //alert(JSON.stringify(object)+" "+$scope.estadodesactivar.id)
        var promisePut  = sectorService.putservicioestadodesactivar($scope.estadodesactivar.id, object);
        
        promisePut.then(function (d) {

            toastr.success(d.data.msg)
            getAllSectores();
            $('#myModal2').modal('hide');

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


    function maximoid(){
        var promiseGet = sectorService.maxId(); 
        promiseGet.then(function (pl) {
            //console.log(JSON.stringify(pl.data));
            idmax = pl.data;
            $scope.guardarfoto(idmax)
            //$scope.registaradmin(idmax);
            
            //alert(idmax);
        },
        function (errorPl) {
            console.log('failure loading Maximo id', errorPl);
        });
    };


    /*
    * Guardar Logo de la sector 
    */
    $scope.guardarfoto = function(id){
        
        var file = $("#files")[0].files[0];
        var fileName = file.name;
        if(fileName==""){
            NomImg1 = "/imagenes/noencontrado.png";
            $scope.logobasedatos(NomImg1)
        }else{
            fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
            NomImg1 = "sector_"+id;


            var formData = new FormData();
            formData.append('imagen',file);
            
                
                var promisePost = sectorService.postImagen(formData,NomImg1,fileExtension);
                promisePost.then(function (d) {
                    
                    //alert(d.data);
                    $scope.logobasedatos(d.data)

                }, function (err) {
                    console.log(err)
                    if(err.status == 401){
                        alert(err.data.msg);
                        console.log(err.data.exception);
                    }else{
                        alert("Error Al procesar Solicitud");
                    }

                    console.log(err);
                });
        }
        
    }

    $scope.logobasedatos = function(namelogo){
        var ruta = "/imagenes/"+namelogo;
        var object = {
            "logo":      ruta    
        };
        //alert("entro: "+JSON.stringify(object),idmax);
        var promisePost = sectorService.fotobasedatos(object,idmax);

        promisePost.then(function (d) {

                //toastr.success(d.data.msg)
                //location.reload()
                getAllSectores()
                
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

    $scope.guardarfoto1 = function(id){

        var formData = new FormData();
        var file = $("#files1")[0].files[0];
        var fileName = file.name;
            
        
            fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
            NomImg1 = "sector_"+id;
            formData.append('imagen',file);
                
            var promisePost = sectorService.postImagen(formData,NomImg1,fileExtension);
            promisePost.then(function (d) {
                
                //alert(d.data);
                $scope.logobasedatos1(d.data,id)

            }, function (err) {
                console.log(err)
                if(err.status == 401){
                    alert(err.data.msg);
                    console.log(err.data.exception);
                }else{
                    alert("Error Al procesar Solicitud");
                }

                console.log(err);
            });
        
    }

    $scope.logobasedatos1 = function(namelogo,idmax){
        var ruta = "/imagenes/"+namelogo;
        var object = {
            "logo":      ruta    
        };
        //alert("entro: "+JSON.stringify(object),idmax);
        var promisePost = sectorService.fotobasedatos(object,idmax);

        promisePost.then(function (d) {
                getAllSectores();
                toastr.success(d.data.msg)
                
                $('#myModal').modal('hide');
                
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


    function getAllTipoturno(){
        var promiseGet = sectorService.getTipoturno(); 
        promiseGet.then(function (pl) {
            $scope.tipoturno = pl.data;
            //alert(JSON.stringify(pl.data))
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    }

    $scope.agregarservicios = function(tipo,$event){
        if($event.currentTarget.checked){
            $scope.listacheck.push(tipo);
        }else{
            var temp = angular.copy($scope.listacheck);
            $scope.listacheck = [];
            for(var i=0;i<temp.length;i++){
                if(temp[i].id != tipo.id){
                    $scope.listacheck.push(temp[i]);
                }
            }
        }

    }

    function guardartipoturnosector(idsectorturno){
        var list = document.getElementById("listaturno");
        //alert(list[0])
        for(var i=0; i<list.length; i++){
            if(list[i].checked){
                //alert(JSON.stringify(list[i].value))
                var object = {
                    idsector:            idsectorturno, 
                    idtipoturno:         list[i].value   
                };
                var promisePost = sectorService.posttipoturnosector(idsectorturno,object);
            }
        }

        promisePost.then(function (d) {

            toastr.success(d.data.msg)
            $('#myModal').modal('hidde');
                
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