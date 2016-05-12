app.service("turnoserviciosService", function ($http) {

	this.getempleadocola = function (idempleado,idservicio) {
        var req = $http.get(uri+'/empleado/'+idempleado+'/servicio/'+idservicio+'/confirmados/turnos');
        return req;       
    };

    this.getempleadoespera = function (idempleado,idservicio) {
        var req = $http.get(uri+'/empleado/'+idempleado+'/servicio/'+idservicio+'/solicitados/turnos');
        return req;       
    };

    this.estadoatendiendo = function (idempleado,idservicio,idturno,turno) {
        var req = $http.put(uri+'/servicio/'+idservicio+'/empleado/'+idempleado+'/turno/'+idturno,turno);
        return req;       
    };

    this.aplazarturno = function (idturno,idservicio,idempleado) {
        var req = $http.put(uri+'/aplazar/turno/'+idturno+'/empleado/'+idempleado+'/servicio/'+idservicio);
        return req;       
    };

    this.aplazarcancelarturno = function (idturno,idservicio,idempleado) {
        var req = $http.put(uri+'/aplazar/cancelar/turno/'+idTurno+'/empleado/'+idEmpleado+'/servicio/'+idServicio);
        return req;       
    };

})