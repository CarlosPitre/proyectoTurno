app.service("reservarService", function ($http) {

	this.empleadosdisponibles = function (idServicio,idSucursal,fecha,hora,cupos) {
        var req = $http.get(uri+'/empleado/disponibles/'+idServicio+'/'+idSucursal+'/'+
        			fecha+'/'+hora+'/'+cupos);
        return req;       
    };

	this.postreserva = function (object) {
        var req = $http.post(uri+'/turno/reserva',object);
        return req;       
    }; 

    this.postreservarecurrente = function (object) {
        var req = $http.post(uri+'/turno/recurrente',object);
        return req;       
    };    
	
})