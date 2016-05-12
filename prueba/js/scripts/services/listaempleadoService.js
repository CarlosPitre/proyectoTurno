app.service("listaempleadoService", function ($http) {

	this.getAllempleado = function (id) {
        var req = $http.get(uri+'/empleado/empresa/'+id);
        return req;       
    };

})