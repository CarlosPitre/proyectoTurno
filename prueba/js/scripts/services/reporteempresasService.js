app.service("reporteempresasService", function ($http) {

	this.getreporteempresa = function (id,fechainicial,fechafinal) {
        var req = $http.get(uri+'/turno/empresa/servicio/'+id+'/'+fechainicial+'/'+fechafinal);
        return req;       
    };

    this.getcontabillidadempresa = function (id,fechainicial,fechafinal) {
        var req = $http.get(uri+'/ingreso/empresa/'+id+'/'+fechainicial+'/'+fechafinal);
        return req;       
    };
	
})