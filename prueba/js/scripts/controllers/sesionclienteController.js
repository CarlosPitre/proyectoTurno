app.controller('sesionclienteController',function ($scope,sesionService){

	$scope.id = sessioncliente.getId()
    $scope.idface = sessioncliente.getIdface();
    $scope.usuario;

	getbyId()

	function getbyId(){
        /*if($scope.id == null){
            var promiseGet = sesionService.getbyclienteid(sessioncliente.getIdface()); 
            promiseGet.then(function (pl) {
                //alert(JSON.stringify(pl.data))
                $scope.usuario = pl.data;
            },
            function (errorPl) {
                console.log('failure loading Perfiles', errorPl);
            });
        }else{
            var promiseGet = sesionService.getbyclienteid(sessioncliente.getId()); 
            promiseGet.then(function (pl) {
                //alert(JSON.stringify(pl.data))
                $scope.usuario = pl.data;
            },
            function (errorPl) {
                console.log('failure loading Perfiles', errorPl);
            });
        }
        if($scope.idface == null){
            var promiseGet = sesionService.getbyclienteid(sessioncliente.getId()); 
            promiseGet.then(function (pl) {
                //alert(JSON.stringify(pl.data))
                $scope.usuario = pl.data;
            },
            function (errorPl) {
                console.log('failure loading Perfiles', errorPl);
            });
        }else{

            var promiseGet = sesionService.getbyclienteid(sessioncliente.getIdface()); 
            promiseGet.then(function (pl) {
                //alert(JSON.stringify(pl.data))
                $scope.usuario = pl.data;
            },
            function (errorPl) {
                console.log('failure loading Perfiles', errorPl);
            });

        }*/
        var promiseGet = sesionService.getclientebyemail(sessioncliente.getCorreo()); 
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data))
            $scope.usuario = pl.data;
        },
        function (errorPl) {
            console.log('failure loading Perfiles', errorPl);
        }); 
        
    }

})