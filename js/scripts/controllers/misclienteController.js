app.controller('misclienteController', function ($scope,ngTableParams,$filter,misclienteService) {

	$scope.Idsucursal = session.getIdsucursal();
	$scope.misClientes = [];

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


})
