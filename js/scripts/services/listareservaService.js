app.service("listareservaService", function ($http) {

	this.getreservadisponible = function (idsucursal,idServicio,fechaReserva) {
        var req = $http.get(uri+'/sucursal/'+idsucursal+'/idServicio/'+idServicio+'/fecha/'+
        			fechaReserva+'/reservas');
        return req;       
    };

    this.getclienteemail = function (email) {
        var req = $http.get(uri+'/email/'+email+'/cliente');
        return req;       
    };

    this.postcliente = function (cliente) {
        var req = $http.post(uri+'/cliente', cliente);
        return req;       
    };

    this.getTurnos = function  (idCliente,idSucursal) {
        var req = $http.get(uri+'/cliente/'+ idCliente + '/sucursal/'+ idSucursal+'/reservas');
        return req; 
    }

    this.deleteTurno = function  (serial) {
        var req = $http.put(uri + '/reserva/serial/' + serial );
        return req;
    }
	
})
