app.service("mapasectoresService", function ($http) {

	this.posicioncercanas = function (idservicio) {
        var req = $http.get(uri+'/servicio/'+idservicio+'/posicion/lat/long/sucursal');
        return req;       
    };

    this.getServicios = function (idsector) {
        var req = $http.get(uri+'/sector/'+idsector+'/servicio');
        return req;       
    };

    this.getsucursalescercanas = function (idservicio,lat,long) {
        var req = $http.get(uri+'/servicio/'+idservicio+'/posicion/'+lat+'/'+long+'/sucursal');
        return req;       
    };

    this.getempleadosucursal = function (idsucursal,idservcio) {
        var req = $http.get(uri+'/sucursal/'+idsucursal+'/'+idservcio+'/empleado');
        return req;       
    };

    this.postpedirturno = function (object) {
        var req = $http.post(uri+'/turno',object);
        return req;       
    };

    this.getsucursalesciudad = function (idservicio,nombre,lat,long) {
        var req = $http.get(uri+'/servicio/'+idservicio+'/ciudad/'+nombre+'/posicion/'+lat+'/'+long+'/sucursal');
        return req;       
    };

})