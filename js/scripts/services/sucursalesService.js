app.service("sucursalesService", function ($http) {

	this.listaServicios = function () {
        var req = $http.get(uri+'/servicio');
        return req;       
    };

    this.empresasactivas = function () {
        var req = $http.get(uri+'/empresas/activas');
        return req;       
    };

    this.sucursaleactivas = function () {
        var req = $http.get(uri+'/sucursal/activas');
        return req;       
    };

    this.getAllsucursal = function () {
        var req = $http.get(uri+'/sucursal');
        return req;       
    };

    this.putsucursal = function (object,id,idempleado) {
        var req = $http.put(uri+'/sucursal/'+id+'/'+idempleado,object);
        return req;       
    };
	
})