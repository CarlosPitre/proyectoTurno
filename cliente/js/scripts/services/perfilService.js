app.service("perfilService", function ($http) {

	this.getperfilempleado = function (id) {
        var req = $http.get(uri+'/empleado/'+id);
        return req;       
    };

    this.updateperfil = function (id,object) {
        var req = $http.put(uri+'/empleado/'+id,object);
        return req;       
    };

    this.postImagen = function (formData,tipo,ext) {
        var req = $http.post(uri+'/upload.php?n='+tipo+"&e="+ext, formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
            console.log(req)
        return req;
    };

    this.fotobasedatos = function (empleado,id){
        var req = $http.put(uri+'/empleado/foto/'+id, empleado);
        return req;
    }

    this.updateperfilcliente = function (id,object) {
        var req = $http.put(uri+'/cliente/perfil/'+id,object);
        return req;       
    };
	
})