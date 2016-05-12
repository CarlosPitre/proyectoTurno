app.service("sucursalService", function ($http) {

	this.municipiosregistrados = function () {
        var req = $http.get(uri+'/municipios');
        return req;       
    };

    this.departamentosregistrados = function () {
        var req = $http.get(uri+'/departamento');
        return req;       
    };

    this.municipioscondepartamento = function (id) {
        var req = $http.get(uri+'/municipios/iddepartamento/'+id);
        return req;       
    };

    this.maxsucursal = function () {
        var req = $http.get(uri+'/sucursal/maxid');
        return req;       
    };

    this.postsucursal = function (sucursal) {
        var req = $http.post(uri+'/sucursal', sucursal);
        return req;                 
    };
    
    this.listaSucursales = function () {
        var req = $http.get(uri+'/sucursal');
        return req;       
    };              

    this.listaServicios = function (id) {
        var req = $http.get(uri+'/servicio/activos/'+id);
        return req;       
    };

    this.postserviciossucursal = function (sucursal) {
        var req = $http.post(uri+'/serviciosucursal', sucursal);
        return req;                 
    };


    this.postadminsucursal = function (adminsucursal) {
        var req = $http.post(uri+'/administrador/sucursal', adminsucursal);
        return req;                 
    };

    this.listaSucursalesxEmpresas = function (id) {
        var req = $http.get(uri+'/sucursal/empresas/'+id);
        return req;       
    }; 

    this.sucursalservicios = function (id) {
        var req = $http.get(uri+'/serviciosucursal/'+id);
        return req;       
    };     

    this.deletesucursalservicios = function (id) {
        var req = $http.delete(uri+'/serviciosucursal/'+id);
        return req;       
    };  

    this.postservisucursal = function (sucursal) {
        var req = $http.post(uri+'/servisucursal', sucursal);
        return req;                 
    };

    this.putsucursal = function (id,sucursal) {
        var req = $http.put(uri+'/sucursal/'+id, sucursal);
        return req;       
    };

    this.getDepartamento = function (id) {
        var req = $http.get(uri+'/municipios/departamento/'+id);
        return req;       
    };

    this.putsucursalactivo = function (id,sucursal) {
        var req = $http.put(uri+'/sucursal/estado/'+id, sucursal);
        return req;       
    };

    this.putsucursaldesactivo = function (id,sucursal) {
        var req = $http.put(uri+'/sucursal/estado/desactivar/'+id, sucursal);
        return req;       
    };

    this.getAdmin = function (id) {
        var req = $http.get(uri+'/admin/'+id);
        return req;       
    };

    this.putadminsucursal = function (id,admin) {
        var req = $http.put(uri+'/administrador/'+id, admin);
        return req;       
    };

    this.getserviciosempresa = function (id) {
        var req = $http.get(uri+'/sectorempresa/'+id);
        return req;       
    };

    this.getempleadobysucursal = function (id) {
        var req = $http.get(uri+'/empleado/bysucursal/'+id);
        return req;       
    };

    this.posttiposucursal = function (tiposucursal) {
        var req = $http.post(uri+'/tipoturnosucursal', tiposucursal);
        return req;                 
    };

    this.posttiposucursalupdate = function (id,tiposucursal) {
        var req = $http.post(uri+'/tipoturnosucursal/'+id, tiposucursal);
        return req;                 
    };

    this.putsucusalservice = function (id,object) {
        var req = $http.put(uri+'/putserviciosucursal/'+id, object);
        return req;       
    };

    this.deletetipoturnosucursal = function (id) {
        var req = $http.delete(uri+'/tipoturnosucursal/'+id);
        return req;       
    };

    this.putsucursal = function (object,id,idempleado) {
        var req = $http.put(uri+'/sucursal/'+id+'/'+idempleado,object);
        return req;       
    };

    this.getdepartamentomunicipio = function (id) {
        var req = $http.get(uri+'/municipios/departamento/'+id);
        return req;       
    };

    this.puttiemposervicio = function (object,id) {
        var req = $http.put(uri+'/tiemposervicio/'+id,object);
        return req;       
    };

});