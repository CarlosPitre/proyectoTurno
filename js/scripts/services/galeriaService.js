app.service("galeriaService", function ($http) {

	this.postImagen = function (formData,tipo,ext) {
        var req = $http.post('./api/upload.php?n='+tipo+"&e="+ext, formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
            console.log(req)
        return req;
    };

    this.postgaleria = function (galeria) {
        var req = $http.post(uri+'/galeria', galeria);
        return req;       
    };

    this.getgaleria = function (id) {
        var req = $http.get(uri+'/galeria/'+id);
        return req;       
    };

    this.deletegaleria = function (id) {
        var req = $http.delete(uri+'/galeria/'+id);
        return req;       
    };

})