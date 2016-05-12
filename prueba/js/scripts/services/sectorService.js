app.service("sectorService", function ($http) {

	this.postsectores = function (sector) {
        var req = $http.post(uri+'/sector', sector);
        return req;       
    };

    this.postinicio = function (inicio) {
        var req = $http.post(uri+'/administradorsesion', inicio);
        return req;       
    };

    this.getAll = function (sector) {
        var req = $http.get(uri+'/sector');
        return req;       
    };

    this.putsector = function (id,sector) {
        var req = $http.put(uri+'/sector/'+id, sector);
        return req;       
    };
    
    this.putservicioestado = function (id,sector) {
        var req = $http.put(uri+'/sector/estado/'+id, sector);
        return req;       
    };

    this.putservicioestadodesactivar = function (id,sector) {
        var req = $http.put(uri+'/sector/estado/desactivar/'+id, sector);
        return req;       
    };

    this.postsectoresxempresa = function (sector) {
        var req = $http.post(uri+'/sectorxempresa', sector);
        return req;       
    };

    this.postImagen = function (formData,tipo,ext) {
        var req = $http.post('./api/upload.php?n='+tipo+"&e="+ext, formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
            console.log(req)
        return req;
    };

    this.fotobasedatos = function (empleado,id){
        var req = $http.put(uri+'/logosector/'+id, empleado);
        return req;
    }

    this.maxId = function () {
        var req = $http.get(uri+'/sector/maxid');
        return req;       
    };

    this.getTipoturno = function () {
        var req = $http.get(uri+'/tipoturno');
        return req;       
    };

    this.getTipoturnosector = function (id) {
        var req = $http.get(uri+'/tipoturnosucursal/'+id);
        return req;       
    };

    this.posttipoturnosector = function (id,tipo) {
        var req = $http.post(uri+'/tipoturnosucursal/'+id, tipo);
        return req;       
    };

    this.sectoresactivo = function () {
        var req = $http.get(uri+'/sector/activos');
        return req;       
    };

    this.sectorcupos = function (idsector) {
        var req = $http.get(uri+'/sector/'+idsector+'/cupos');
        return req;       
    };

});