app.service("listasucursalService", function ($http) {

	this.listaSucursalesxEmpresa = function (id) {
        var req = $http.get(uri+'/sucursal/idempresa/'+id);
        return req;       
    }; 

    this.sucursalesxsector = function (id) {
        var req = $http.get(uri+'/getsectorxsucursales/'+id);
        return req;       
    };
	
});