app.service("inicioService", function ($http) {

	this.postinicio = function (inicio) {
        var req = $http.post(uri+'/empleado/login', inicio);
        return req;       
    };

    this.getAll = function (sector) {
        var req = $http.get(uri+'/sector');
        return req;       
    };

    this.getPermisos = function (id) {
        var req = $http.get(uri+'/perfilpermisos/'+id);
        return req;       
    };

    this.getsoloPermisos = function (id) {
        var req = $http.get(uri+'/perfilpermisos/permisos/'+id);
        return req;       
    };

    this.maxcliente = function () {
        var req = $http.get(uri+'/idmax/cliente');
        return req;       
    };

    this.getmodulospermisos = function (id) {
        var req = $http.get(uri+'/modulospermisos/'+id);
        return req;       
    };

    this.buscarempleado = function (peticion) {
        var req = $http.get(uri+'/empleado/buscar/'+peticion);
        return req;       
    };

    this.postemail = function (object) {
        var req = $http.post(uri+'/empleado/email', object);
        return req;       
    };

    this.getempleado = function (id) {
        var req = $http.get(uri+'/empleado/'+id);
        return req;       
    };

    this.getcliente = function (id) {
        var req = $http.get(uri+'/cliente/'+id);
        return req;       
    };

    this.putclave = function (object,id,email) {
        var req = $http.put(uri+'/clave/empleado/'+id, object);
        return req;       
    };
   
    this.putclavecliente = function (object,id) {
        var req = $http.put(uri+'/cliente/'+id+'/clave', object);
        return req;       
    };

});