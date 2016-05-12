app.service("serviciosempresaService", function ($http) {

	this.getserviciosucursal = function (id) {
        var req = $http.get(uri+'/empresa/'+id+'/sucursal/servicio');
        return req;       
    };

    this.getsecotorempresa = function (id) {
        var req = $http.get(uri+'/sector/empresa/'+id);
        return req;       
    };

})