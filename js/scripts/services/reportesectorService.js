app.service("reportesectorService", function ($http) {

	this.reportesector = function (id,fechainicial,fechafinal) {
        var req = $http.get(uri+'/reporte/sector/'+id+'/'+fechainicial+'/'+fechafinal);
        return req;       
    };

    this.reportecontabilidadsector = function (id,fechainicial,fechafinal) {
        var req = $http.get(uri+'/contabilidad/sectorempresa/'+id+'/'+fechainicial+'/'+fechafinal);
        return req;       
    };

    

})