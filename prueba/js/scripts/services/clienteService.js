app.service("clienteService", function ($http) {

	this.postcliente = function (facebook) {
        var req = $http.post(uri+'/cliente/sesion/facebook', facebook);
        return req;       
    };

    this.registercliente = function (cliente) {
        var req = $http.post(uri+'/cliente', cliente);
        return req;       
    };

    this.validarcorreo = function (email) {
        var req = $http.get(uri+'/validarcorreo/'+email);
        return req;       
    };

});