app.service("misturnosService", function ($http) {

	this.getturnocliente = function (id) {
        var req = $http.get(uri+'/cliente/'+id+'/turnos');
        return req;       
    };

})