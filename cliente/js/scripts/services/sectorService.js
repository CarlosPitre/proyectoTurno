app.service("sectorService", function ($http) {

    this.getSectores = function () {
        var req = $http.get(uri+'/sector/activos');
        return req;       
    };

    this.getCupos = function (idsector) {
        var req = $http.get(uri+'/sector/'+idsector+'/cupos');
        return req;       
    };

});