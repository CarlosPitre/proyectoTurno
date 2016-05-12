app.service("misclienteService", function ($http) {

	this.getmisclientes = function (idsucursal) {
        var req = $http.get(uri+'/sucursal/'+idsucursal+'/clientes');
        return req;       
    };

})