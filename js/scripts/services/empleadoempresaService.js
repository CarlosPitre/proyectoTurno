app.service("empleadoempresaService", function ($http) {

	this.listadesucursales = function (id) {
        var req = $http.get(uri+'/sucursalbyempresa/'+id);
        return req;       
    };

    this.empleadobyempresa = function (id) {
        var req = $http.get(uri+'/empleado/empresa/'+id);
        return req;       
    };

    this.eliminarservicios = function(id){
        var req = $http.delete(uri+'/servicioempleado/delete/'+id);
        return req;
    };


})