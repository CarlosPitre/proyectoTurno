app.service("sesionService", function ($http) {

	this.getIdperfilpermisos = function (id) {
        var req = $http.get(uri+'/perfilpermisos/'+id);
        return req;       
    };

    this.getpermisos = function (id) {
        var req = $http.get(uri+'/perfilpermisosturno/'+id);
        return req;       
    };

    this.getusuario = function (id) {
        var req = $http.get(uri+'/empleado/'+id);
        return req;       
    };

    this.getbyclienteid = function (id) {
        var req = $http.get(uri+'/ver/cliente/'+id);
        return req;       
    };

    this.sucursal = function (id) {
        var req = $http.get(uri+'/sucursal/'+id);
        return req;       
    };

    this.empresa = function (id) {
        var req = $http.get(uri+'/empresa/'+id);
        return req;       
    };

    this.getclientebyemail = function (email) {
        var req = $http.get(uri+'/email/'+email+'/cliente');
        return req;       
    };

    this.aplicareserva = function (idsucursal) {
        var req = $http.get(uri+'/aplicareserva/'+idsucursal);
        return req;       
    };

});