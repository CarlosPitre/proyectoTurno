app.service("calendarioService", function ($http) {

	this.getreservasbysucursal = function (idsucursal,fechainicial,fechafinal) {
        var req = $http.get(uri+'/reservas/idsucursal/'+idsucursal+'/fecha/'+fechainicial+'/'+
        	fechafinal);
        return req;       
    };

    this.getturnocalendario = function (idturno) {
        var req = $http.get(uri+'/ver/reserva/'+idturno);
        return req;       
    };

    this.cancelarturno = function (idturno) {
        var req = $http.put(uri+'/aplazar/calendario/'+idturno);
        return req;       
    };

    this.getcalendario = function (idsucursal,mes,año) {
        var req = $http.get(uri+'/reservas/idsucursal/'+idsucursal+'/mes/'+mes+'/ano/'+año
            +'/reservas');
        return req;       
    };

});