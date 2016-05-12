app.service("servicioService", function ($http) {

	this.postservicio = function (servicio) {
        var req = $http.post(uri+'/servicio', servicio);
        return req;       
    };

    this.getservicios = function (servicio) {
        var req = $http.get(uri+'/getallservicio', servicio);
        return req;       
    };

    this.putservicio = function (id,servicio) {
        var req = $http.put(uri+'/servicio/'+id, servicio);
        return req;       
    };

    this.putservicioestado = function (id,servicio) {
        var req = $http.put(uri+'/servicio/estado/'+id, servicio);
        return req;       
    };

    this.putservicioestadodesactivar = function (id,servicio) {
        var req = $http.put(uri+'/servicio/estado/desactivar/'+id, servicio);
        return req;       
    };

});