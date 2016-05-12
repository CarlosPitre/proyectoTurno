app.service("empleadoadminService", function ($http) {

	this.getempresaactivas = function () {
        var req = $http.get(uri+'/empresas/activas');
        return req;       
    };

    this.getsucursalempresa = function (id) {
        var req = $http.get(uri+'/sucursal/empresas/'+id);
        return req;       
    };

    this.getservicioempresa = function () {
        var req = $http.get(uri+'/servicio/empleado');
        return req;       
    };

    this.getserviciosempresa = function (id) {
        var req = $http.get(uri+'/sectorempresa/'+id);
        return req;       
    };

    this.idultimoempleado = function () {
        var req = $http.get(uri+'/empleadomax');
        return req;       
    };

    this.postservicioempleado = function (object) {
        var req = $http.post(uri+'/servicioempleado',object);
        return req;       
    };

    this.postempleadoadmin = function (object) {
        var req = $http.post(uri+'/empleadoAdmin',object);
        return req;       
    };

    this.getallempleados = function () {
        var req = $http.get(uri+'/empleado/sucursal');
        return req;       
    };

    this.deleteservicioempleado = function (id) {
        var req = $http.delete(uri+'/servicioempleado/delete/'+id);
        return req;       
    };

    this.serviciossucursal = function (id) {
        var req = $http.get(uri+'/serviciosucursal/'+id);
        return req;       
    };

    this.putempleado = function (id,object) {
        var req = $http.put(uri+'/empleado/'+id,object);
        return req;       
    };

})