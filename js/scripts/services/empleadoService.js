app.service("empleadoService", function ($http) {

	this.postempleado = function (empleado) {
        var req = $http.post(uri+'/empleado', empleado);
        return req;       
    };

    this.getempleadobysucursal = function (id) {
        var req = $http.get(uri+'/empleado/bysucursal/empleado/'+id);
        return req;       
    };

	this.getIdempresa = function (id) {
        var req = $http.get(uri+'/empleado/getempresaxByIdsucursal/'+id);
        return req;       
    };    

    this.maxidempleado = function () {
        var req = $http.get(uri+'/empleadomax');
        return req;       
    };

    this.postserviciosempleado = function (empleado) {
        var req = $http.post(uri+'/servicioempleado', empleado);
        return req;       
    };

    this.getserviciosucursal = function (id) {
        var req = $http.get(uri+'/serviciosucursal/'+id);
        return req;       
    };

    this.getservicioxempleado = function (id) {
        var req = $http.get(uri+'/servicioempleado/'+id);
        return req;       
    };

    this.putempleado = function (id,empleado) {
        var req = $http.put(uri+'/empleado/'+id, empleado);
        return req;       
    };

    this.putempleadoestado = function (id,empleado) {
        var req = $http.put(uri+'/trabajador/estado/'+id, empleado);
        return req;       
    };

    this.eliminar = function(id){
        var req = $http.delete(uri+'/servicioempleado/'+id);
        return req;
    };

    this.empleadosucursal = function (id) {
        var req = $http.get(uri+'/empleado/'+id);
        return req;       
    };

});