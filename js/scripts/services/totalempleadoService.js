app.service("totalempleadoService", function ($http) {

	this.totalempleado = function (idsucursal,fechainicial,fechafinal) {
        var req = $http.get(uri+'/empleado/reporte/'+idsucursal+'/'+fechainicial+'/'+fechafinal);
        return req;       
    };

    this.contaempleado = function (idsucursal,fechainicial,fechafinal) {
        var req = $http.get(uri+'/empleado/contabilidad/sucursal/'+idsucursal+'/'+fechainicial+'/'+fechafinal);
        return req;       
    };
	
})