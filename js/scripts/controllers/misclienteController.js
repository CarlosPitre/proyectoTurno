app.controller('misclienteController', function ($scope,ngTableParams,$filter,misclienteService) {

	$scope.Idsucursal = session.getIdsucursal();
	$scope.misClientes = [];
    $scope.Cliente = {};

	misclientes();

	function misclientes(){
        var promiseGet = misclienteService.getmisclientes($scope.Idsucursal);
        promiseGet.then(function (pl) {
            if(pl.data != null){
            	$scope.misClientes = pl.data;
            	//crearNgTabla();
            	//alert(JSON.stringify($scope.misClientes));
            }
        },
        function (errorPl) {
            console.log('failure loading search', errorPl);
        });
    }

    function crearNgTabla(){
        self = this;
        data = $scope.misClientes;
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: undefined
        }, {
            total: $scope.misClientes,
            getData: function (a, b) {
                var c = b.sorting ?
                        $filter('orderBy')($scope.misClientes, b.orderBy()) :
                        $scope.misClientes;
                c = b.filter() ?
                        $filter('filter')(c, b.filter()) :
                        c;
                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
                b.total(c.length);
                a.resolve($scope.usuario);
            }
        });
    }

    $scope.editarCliente = function  (cliente) {
        $("#myModal1").modal('show');
        $scope.Cliente = cliente;
    }

    $scope.update = function  () {
        var object = {
            "email":        $scope.Cliente.email,
            "nombres":      $scope.Cliente.nombres,
            "apellidos":    $scope.Cliente.apellidos,
            "telefono":     $scope.Cliente.telefono,
            "pass":         "",
        };

        var promiseGet = misclienteService.put(object,$scope.Cliente.id);
        promiseGet.then(function (pl) {
            if(pl.data != null){
                $("#myModal1").modal('hide');
                alert(JSON.stringify(pl.data.msg));
                misClientes();

            }
        },
        function (errorPl) {
            console.log('failure loading search', errorPl);
        });
    }


})
