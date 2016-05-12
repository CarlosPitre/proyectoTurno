app.service("empresaService", function ($http) {

	this.postempleado = function (empleado) {
        var req = $http.post(uri+'/empresa', empleado);
        return req;       
    };

    this.postempresaadmin = function (empleado) {
        var req = $http.post(uri+'/administrador/empresa', empleado);
        return req;       
    };
    /*
    *   Logo de la empresa al servidor 
    */
    this.postImagen = function (formData,tipo,ext) {
        var req = $http.post('./api/upload.php?n='+tipo+"&e="+ext, formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        	console.log(req)
        return req;
    };

    this.maxId = function () {
        var req = $http.get(uri+'/empresas/maxid');
        return req;       
    };
    /*
    *   nombre de la foto a la base de datos
    */
    this.fotobasedatos = function (empleado,id){
        var req = $http.put(uri+'/logoempresa/'+id, empleado);
        return req;
    }

    this.empresaregistradas = function () {
        var req = $http.get(uri+'/empresa');
        return req;       
    };

    this.put = function (id,empresa) {
        var req = $http.put(uri+'/empresa/' + id, empresa);
        return req;
    };

    this.putestado = function (id,empresa) {
        var req = $http.put(uri+'/empresaestado/' + id, empresa);
        return req;
    };

    this.putestadodesactivar = function (id,empresa) {
        var req = $http.put(uri+'/empresaestadodescativar/' + id, empresa);
        return req;
    };

    this.putestadoadmin = function (id,admin) {
        var req = $http.put(uri+'/empleado/estado/admin/' + id, admin);
        return req;
    };

    this.putestadodesactivaradmin = function (id,admin) {
        var req = $http.put(uri+'/empleado/estado/admin/desac/' + id, admin);
        return req;
    };

    this.getempresaid = function (id) {
        var req = $http.get(uri+'/empresa/'+id);
        return req;       
    };

});