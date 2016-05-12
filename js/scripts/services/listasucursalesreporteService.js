app.service("listasucursalesreporteService", function ($http) {

	this.sucursalexempresa = function () {
        var req = $http.get(uri+'/sucursalxempresa');
        return req;       
    };

    this.contabilidadsucursal = function (id,fechainicial,fechafinal) {
        var req = $http.get(uri+'/contabilidad/sucursal/'+id+'/'+fechainicial+'/'+fechafinal);
        return req;       
    };
	
})