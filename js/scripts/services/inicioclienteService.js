app.service("inicioclienteService", function ($http) {

	this.postinicio = function (inicio) {
        var req = $http.post(uri+'/cliente/sesion', inicio);
        return req;       
    };

        this.getcliente = function (email) {
        var req = $http.get(uri+'/email/'+email+'/cliente');
        return req;       
    };    

    this.postenvio = function (inicio) {
        var req = $http.post(uri+'/cliente/email', inicio);
        return req;       
    };
	
})