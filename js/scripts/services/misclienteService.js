app.service("misclienteService", function ($http) {

	this.getmisclientes = function (idsucursal) {
        var req = $http.get(uri+'/sucursal/'+idsucursal+'/clientes');
        return req;       
    };

    this.put = function  (object,id) {
    	var req = $http.put(uri+'/cliente/'+id, object);
        return req;
    }

})