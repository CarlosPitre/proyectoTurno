app.service("pedirturnoService", function ($http) {

	this.getempleadoservicio = function (idempleado) {
        var req = $http.get(uri+'/empleado/'+idempleado+'/servicio');
        return req;       
    };

})