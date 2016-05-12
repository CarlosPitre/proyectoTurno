app.service("listaempresaService", function ($http) {

	this.getAll = function () {
        var req = $http.get(uri+'/empresa');
        return req;       
    };

    this.postactivarempresa = function (admin) {
        var req = $http.post(uri+'/administrador', admin);
        return req;       
    };

    this.postImagen = function (formData,tipo,ext) {
        var req = $http.post('./api/upload.php?n='+tipo+"&e="+ext, formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
            console.log(req)
        return req;
    };

    this.fotobasedatos = function (empleado,id){
        var req = $http.put(uri+'/logoempresa/'+id, empleado);
        return req;
    }

});