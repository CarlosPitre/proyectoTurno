app.service("reporteempleadoService", function ($http) {

	this.getempleado = function (id) {
        var req = $http.get(uri+'/empleado/'+id);
        return req;       
    };

    this.reporteempleado = function (id,fechainicial,fechafinal) {
        var req = $http.get(uri+'/reporte/empleado/'+id+'/'+fechainicial+'/'+fechafinal);
        return req;       
    };

    this.contabilidadempleado = function (id,fechainicial,fechafinal) {
        var req = $http.get(uri+'/contabilidad/empleado/'+id+'/'+fechainicial+'/'+fechafinal);
        return req;       
    };


})