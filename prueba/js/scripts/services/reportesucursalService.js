app.service("reportesucursalService", function ($http) {

	this.getreportesucursales = function (id,fechainicial,fechafinal) {
        var req = $http.get(uri+'/turno/pedidos/'+id+"/"+fechainicial+"/"+fechafinal);
        return req;       
    };

    this.getreporteservicios = function (id,fechainicial,fechafinal) {
        var req = $http.get(uri+'/turno/pedidos/servicio/'+id+"/"+fechainicial+"/"+fechafinal);
        return req;       
    };

    this.getsucursal = function (id) {
        var req = $http.get(uri+'/getbysucursal/'+id);
        return req;       
    };
	
})