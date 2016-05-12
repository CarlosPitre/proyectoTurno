app.controller('listaempresareporteController', function ($scope, listaempresareporteService,listaempresaService) {


	$scope.Empresa = [];

    $scope.predicate = 'name';  
    $scope.reverse = true;  
    $scope.currentPage = 1; 
    $scope.empresa = {};
    $scope.estado = {}
    $scope.desactivar = {};

    
    function initialize() {
        $scope.empresa ={
            id  : "",
            nit : "",
            razonSocial  : "",
            email  : "",
            telefono : "",
            contacto: "",
            promedio: "",
            estado: ""
        };
    }

    loadEmpresa()
    
    $scope.numPerPage = 10;

    $scope.paginate = function (value) {  
        var begin, end, index;  
        begin = ($scope.currentPage - 1) * $scope.numPerPage;  
        end = begin + $scope.numPerPage;  
        index = $scope.Empresa.indexOf(value);  
        return (begin <= index && index < end);  
    };
    
	function loadEmpresa(){
       	var promiseGet = listaempresaService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Empresa = pl.data;
            $scope.totalItems = $scope.Empresa.length;
            
        },
        function (errorPl) {
            console.log('failure loading Deportes', errorPl);
        });
    };
	
})
