app.controller('calendarioController', function ($scope, calendarioService) {

	dateend();
	consulta();
	update();

	setTimeout(function(){ consulta(); }, 40000);
	
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $scope.Idsucursal = session.getIdsucursal();

    $scope.object = [];
    $scope.calendario = [];
   	$scope.fechafinal;
   	$scope.vercalendario;
   	var fecha2;

   	function consulta(){
   		var date3 = new Date();
	    var d3 = date3.getDate();
	    var m3 = date3.getMonth()+1;
	    var y3 = date3.getFullYear();
   		var fecha = y3+"-"+m3+"-"+1;
   		getcalendario(m3,y3);
   		//getbyreservas(fecha);
   	}

    function dateend(){
    	var date1 = new Date();
	    var d1 = date1.getDate();
	    var m1 = date1.getMonth()+1;
	    var y1 = date1.getFullYear();
	    fecha2 = y1+"-"+m1+"-"+d1;
		//alert("dateend"+fecha2)
	    if(m1==1)
	    	return $scope.fechafinal = y1+"-"+m1+"-"+31;
	    if(m1==2)
	    	if((y1 % 4 == 0) && (y1 % 100 != 0) || (y1 % 400 == 0))
	    		return $scope.fechafinal = y1+"-"+m1+"-"+29;
	    	else
	    		return $scope.fechafinal = y1+"-"+m1+"-"+28;
	    if(m1==3)
	    	return $scope.fechafinal = y1+"-"+m1+"-"+31;
	    if(m1==4)
	    	return $scope.fechafinal = y1+"-"+m1+"-"+30;
	    if(m1==5)
	    	return $scope.fechafinal = y1+"-"+m1+"-"+31;
	    if(m1==6)
	    	return $scope.fechafinal = y1+"-"+m1+"-"+30;
	    if(m1==7)
	    	return $scope.fechafinal = y1+"-"+m1+"-"+31;
	    if(m1==8)
	    	return $scope.fechafinal = y1+"-"+m1+"-"+31;
	    if(m1==9)
	    	return $scope.fechafinal = y1+"-"+m1+"-"+30;
	    if(m1==10)
	    	return $scope.fechafinal = y1+"-"+m1+"-"+31;
	    if(m1==11)
	    	return $scope.fechafinal = y1+"-"+m1+"-"+30;
	    if(m1==12)
	    	return $scope.fechafinal = y1+"-"+m1+"-"+31;
    }

    $('#calendar').on('click', '.fc-prev-button', function(){
        var moment = $('#calendar').fullCalendar('getDate');
        var fecha = moment.format();
		var año = fecha.substring(0,4);
		var mes = fecha.substring(5,7)
		getcalendario(mes,año)
        //getbyreservas(moment.format());
    }); 

	$('#calendar').on('click', '.fc-next-button', function(){
		var moment = $('#calendar').fullCalendar('getDate');
		//alert(moment.format());
		var fecha = moment.format();
		var año = fecha.substring(0,4);
		var mes = fecha.substring(5,7)
		//alert(año+" "+mes);
		getcalendario(mes,año)
    });

    $(".fc-today-button").click(function () {
    	var date3 = new Date();
	    var d3 = date3.getDate();
	    var m3 = date3.getMonth()+1;
	    var y3 = date3.getFullYear();
   		var fecha = y3+"-"+m3+"-"+1;
   		getcalendario(m3,y3);
    });

    /*function getbyreservas(fecha){
    	//alert(fecha+" "+$scope.fechafinal)
    	var promiseGet = calendarioService.getreservasbysucursal(session.getIdsucursal(),
			fecha,$scope.fechafinal); 
        promiseGet.then(function (pl) {
        	var res;var str;var ano;var mes;var dia;var hora;
        	var str1;var res1;var horafinal;var str2;
        	$scope.calendario = [];
        	//alert(JSON.stringify(pl.data));
        	inicial(pl.data);

        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
	}*/

	function getcalendario(mes,año){
    	//alert(fecha+" "+$scope.fechafinal)
    	var promiseGet = calendarioService.getcalendario(session.getIdsucursal(),
			mes,año); 
        promiseGet.then(function (pl) {
        	var res;var str;var ano;var mes;var dia;var hora;
        	var str1;var res1;var horafinal;var str2;
        	$scope.calendario = [];
        	//alert(JSON.stringify(pl.data));
        	inicial(pl.data);

        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
	}

	function ver(id){
		var promiseGet = calendarioService.getturnocalendario(id); 
        promiseGet.then(function (pl) {
        	$scope.vercalendario = pl.data;
        	//alert(JSON.stringify(pl.data))
        },
        function (errorPl) {
            console.log('failure loading Empleados', errorPl);
        });
	}

	$scope.cancelarturnoagenda = function(id){
		var promisePut  = calendarioService.cancelarturno(id);
        
        promisePut.then(function (d) {

            toastr.success(d.data.msg)
            consulta();
            $('#fullCalModal').modal('hide');

        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.msg);
                console.log(err.data.exception);
                
            }else{
                
                alert("Error Al procesar Solicitud");
                
            }

            console.log("Some Error Occured "+ JSON.stringify(err));
        });
	}

	function inicial(lista){
		var date2 = new Date();
	    var d2 = date2.getDate();
	    var m2 = date2.getMonth()+1;
	    var y2 = date2.getFullYear();
		fecha2 = y2+"-"+m2+"-"+d2;

		$scope.calendario = [];
		//alert(JSON.stringify(lista))
		for(i=0;i<lista.length;i++){
			$scope.calendario.push({
				id:  lista[i].id,
    			title: lista[i].nombres,
                start: new Date(lista[i].fechaReserva+' '+lista[i].horaReserva),
                end:  new Date(lista[i].fechaReserva+' '+lista[i].horaFinalReserva)
    		});
		}
		
		$("#calendar").fullCalendar('removeEvents');
		$("#calendar").fullCalendar('addEventSource',$scope.calendario);
		$("#calendar").fullCalendar('rerenderEvents');

		//$scope.object = $scope.calendario;
		//alert(JSON.stringify($scope.calendario)
	}

	function update(){
		$('#calendar').fullCalendar({
				
			header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            
            /*eventClick: function(calEvent, jsEvent, view) {

		        alert('Evento: ' + calEvent.title);
		        
		    },*/

		    
		    /*eventRender: function (event, element) {
		        element.attr('href', 'javascript:void(0);');
		        element.click(function() {
		            $("#eventContent").dialog({ modal: true, title: event.title, width:350});
		        });
    		},*/

    		eventClick:  function(event, jsEvent, view) {
	            //$('#modalTitle').html(event.title);
	            //$('#modalBody').html(event.description);
	            //$('#eventUrl').attr('href',event.url);
            	//$('#fullCalModal').modal();
            	ver(event.id)
            	$('#fullCalModal').modal('show');
        	},

		    views: {
		        agenda: {
		            eventLimit: 2 // adjust to 6 only for agendaWeek/agendaDay
		        }
    		},

		    eventLimit: true,
            editable: false,
            droppable: true, // this allows things to be dropped onto the calendar
            
            eventDrop: function(event, delta) {
				alert(event.title + ' was moved ' + delta + ' days\n' +
				'(should probably update your database)');
			},

            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			monthNameShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun','Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado'],
			dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],

            buttonText: {
				today: 'hoy',
				month: 'mes',
				week: 'semana',
				day: 'dia'
			}

        });
	}


})