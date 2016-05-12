app.controller('ejemploController', function ($scope, ejemploService) {

	$scope.title = "Ejemplo de tablas";

	$scope.predicate = 'name';  
   	$scope.reverse = true;  
   	$scope.currentPage = 1;  
   	$scope.order = function (predicate) {  
    	$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
     	$scope.predicate = predicate;  
   	};  
   	
       $scope.students = [  
         { name: 'Kevin', age: 25, gender: 'boy' },  
         { name: 'John', age: 30, gender: 'girl' },  
         { name: 'Laura', age: 28, gender: 'girl' },  
         { name: 'Joy', age: 15, gender: 'girl' },  
         { name: 'Mary', age: 28, gender: 'girl' },  
         { name: 'Peter', age: 95, gender: 'boy' },  
         { name: 'Bob', age: 50, gender: 'boy' },  
         { name: 'Erika', age: 27, gender: 'girl' },  
         { name: 'Patrick', age: 40, gender: 'boy' },  
         { name: 'Tery', age: 60, gender: 'girl' }  
       ];  
       $scope.totalItems = $scope.students.length;  
       $scope.numPerPage = 5; 
	
    $scope.paginate = function (value) {  
         var begin, end, index;  
         begin = ($scope.currentPage - 1) * $scope.numPerPage;  
         end = begin + $scope.numPerPage;  
         index = $scope.students.indexOf(value);  
         return (begin <= index && index < end);  
    };   



});