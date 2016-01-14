$(document).ready(function() {
    //Language handler
    if(Cookies.get('language') == null){
		language = slovak;
	}else{
		switch(Cookies.get('language')){
			case "slovak":
				language = slovak;
				break;
			case "english":
				language = english;
				break;
			case "czech":
				language = czech;
				break;
		}
	}
	setLanguage(language);
    
	//COOKIE LOADER
	if (Cookies.get('apiKey') === undefined) {
			window.location = 'index.html';
    	}
		else{
		  var apiKey = Cookies.get('apiKey');
		  var name = Cookies.get('name');
		  var urlPhoto = Cookies.get('urlPhoto');
		  var idAccount = Cookies.get('idAccount');
		  var idVenue = Cookies.get('idVenue');
          var language = Cookies.get('language');
		$('#idVenue').val(idVenue);
		$('#apiKey').val(apiKey);
		$('#venue_logo').append('<img class="logo" src="' + urlPhoto + '">');
		}
    //Mode cookie reader
    /*if (Cookies.get('mode') === undefined){
        $('link[href="css/main.css"]').attr('href','css/main.css');
    }
    else{
        if (Cookies.get('mode') === 'day'){
            $('link[href="css/main.css"]').attr('href','css/main.css');
        }
        else{
            $('link[href="css/main.css"]').attr('href','css/main.night.css');
        }
    }*/
    
    //Mode cookie reader
    if (Cookies.get('mode') === undefined){
        $('link[href="css/main.css"]').attr('href','css/main.css');
    }
    else{
        if (Cookies.get('mode') === 'day'){
            $('link[href="css/main.css"]').attr('href','css/main.css');
        }
        else{
            $('link[href="css/main.css"]').attr('href','css/main.night.css');
        }
    }
    
    // STYLE SWITCHER
	$('#night').click(function (){
   		$('link[href="css/main.css"]').attr('href','css/main.night.css');
        Cookies.set('mode', 'night');
	});
	$('#day').click(function (){
   		$('link[href="css/main.night.css"]').attr('href','css/main.css');
        Cookies.set('mode', 'day');
	});
    
    //Default load - welcome.html
    $("#contentPanel").empty();
    $("#contentPanel").load("welcome.html", function(){
        $("#statisticsExplanation").on('click', function(){
            $( "#contentPanel" ).load("statistics.html", function() {
            loadAllConcert(01);
            });
        });
        $("#mycalendarExplanation").on('click', function(){
            $( "#contentPanel" ).load("mycalendar.html", function() {
            
            });
        });
        $("#propagationExplanation").on('click', function(){
            $( "#contentPanel" ).load("propagation.html", function() {
                var clickedClubId = idVenue;
                loadConcertForClub(clickedClubId);
            });
        });
        $("#settingsExplanation").on('click', function(){
            $( "#contentPanel" ).load("manageaccount.html", function() {
            
            });
        });
    });
        
    //Go to statistics
        $("#statistics").on('click', function(){
            $("#contentPanel").empty();
            addspinner();
            $( "#contentPanel" ).load("statistics.html", function() {
                
            loadAllConcert(01);
                
            $("#contentPanel").remove(".spinner");
            });
        });
            
    //Go to My Calendar
        $("#mycalendar").on('click', function(){
            $("#contentPanel").empty();
            //$("").schow();
            $("#contentPanel").load("mycalendar.html"/*, null, $("").hide()*/);
        });
            
            
            
    //Go to Propagation
         $("#propagation").on('click', function(){
            $("#contentPanel").empty();
            //$("").schow();
            $("#contentPanel").load("propagation.html", function() {
                var clickedClubId = idVenue;
                loadConcertForClub(clickedClubId);
                
            $("#contentPanel").remove(".spinner");
            });
        });
            
            
            
    //Go to settings
         $("#settings").on('click', function(){
            $("#contentPanel").empty();
            //$("").schow();
            $("#contentPanel").load("manageaccount.html"/*, null, $("").hide()*/);
        });
    
    //Payment Braintree
        // We generated a client token for you so you can test out this code
            // immediately. In a production-ready integration, you will need to
            // generate a client token on your server (see section below).
            var clientToken;

                $(document).ready(function(){
                    $.ajax({
                        url: "php/generateClientToken.php",
                        success: function (ret) {
                            clientToken = ret;
                            braintree.setup(clientToken, 'dropin',{
                                container: "payment-form"
                            });
                        }
                    });
                });
    
    /* TRANSACTION CHECKOUT
    $('#checkout').submit(function(event) {
		  event.preventDefault();
        $.ajax({
          url: 'php/transactionCheckout.php',
          dataType: 'json',
          success: function(data) {
              console.log(data);
            alert('Plán bol vytvorený');
          },
          error: function(data){
              console.log(data);
            alert('Platba neprebehla!');
          },
        });
        event.preventDefault();
    }); */
    
    //Braintree Manage Account
    $("#unsubscribebutton").click(function(){
        var subscription = Cookies.get('subscriptionId');
        $.ajax({
          url: 'php/cancelsubscription.php?subscription=' + subscription,
          success: function(data) {
            alert('Plán bol prerušený');
          }
        });
    });
    
    //* Mouse position tracker *//
	$(document).mousemove(function(e){
           mouseX = e.pageX;
           mouseY = e.pageY;
           //To Get the relative position
           if( this.offsetLeft !=undefined)
             mouseX = e.pageX - this.offsetLeft;
           if( this.offsetTop != undefined)
             mouseY = e.pageY - this.offsetTop;

           if(mouseX < 0)
                mouseX =0;
           if(mouseY < 0)
               mouseY = 0;

           windowWidth  = $(window).width()+$(window).scrollLeft();
           windowHeight = $(window).height()+$(window).scrollTop();
   });
    //Logout handler
    $('#logoff').click(function(){
		var apiKey = Cookies.get('apiKey');
		var base_url = 'https://api.concertian.com/agents/auth';

	$.ajax({
		beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
					request.withCredentials = true;
                },
        type: "DELETE", 
        url: base_url,
        success: function(json){
			window.location = 'index.html';
			},
		});
	});
});
var page = 0;
var monthNumber = 01;
var chartData = new Array();
var results = [];
var idVenue = Cookies.get('idVenue')
var apiKey = Cookies.get('apiKey');
var language;
var mouseX,mouseY,windowWidth,windowHeight;
var popupLeft,popupTop;
var slovak ={
    
};
var english = {
    
};
var czech = {
    
};

// Setting language
// SET TEXT BUILDER
function setLanguage(language){}

// ADDING SPINER WHILE LOADING #contentPanel
function addspinner(){
    $("#contentPanel").append('<div class="spinner">' +
                                  '<div class="dot1"></div>'+
                                  '<div class="dot2"></div>'+
                             '</div>');
}
// Load all concert for month ajax call
function loadAllConcert(monthNumber){
    $("#resultsList").empty();
    chartData = new Array();
    
	$.ajax({ 'url' : 'https://api.concertian.com/agents/events/month/' + monthNumber,
		  'method' : 'GET',
          beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
                    request.withCredentials = true;
                },
	  	  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
          addElements(json);
	  	},
	  	'error': function(error){
	  		console.log('Error. ' + error);
	  	}
    });
}
//Load concert by city ajax call
function loadConcertByCity(city){
	$.ajax({ 'url' : 'https://api.concertian.com/users/events/city',
		  'method' : 'POST',
		  'data' : { 'results' : "20",
			 		 'page' : page,
			 		 'city' : city
		 		   },
	  	  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
			  addElements(json);
	  	},
	  	'error': function(error){
	  		console.log('Error. ' + error);
	  	}
    });
}

// Load concerts for Club (on club click) by ajax call
function loadConcertForClub(clickedClubId){
    $("#propagationElements").empty();
	$.ajax({ 'url' : 'https://api.concertian.com/users/events/venue',
		  'method' : 'POST',
		  'data' : { 'results' : "20",
					 'page' : page,
					 'idVenue' : clickedClubId
				   },
		  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
			  addPropagationElements(json);
		},
		'error': function(error){
			console.log('Error. ' + error);
			$(".spinner").remove();
		}
	});
}

// DELETE CONCERT
function deleteConcert(eventID){
    var ID = eventID;

			$.ajax({
				type        : 'DELETE',
				//crossDomain	: true,
				//xhrFields	: {withCredentials:false},
                beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
					request.withCredentials = true;
                },
				url         : 'https://api.concertian.com/agents/events/'+ID,
				dataType    : 'json',
                success     : function(json){
					$("#propagationElements").empty();
                    loadConcertForClub();
                },
                error       : function(json){
                    console.log("Nevymazané");
                },
                });
}

// addElements
function addElements(json){
	$(".spinner").remove();
	var minus = 0;
	var bufferedArray = new Array();
	var length = page * 20;
	for(var i = 0; i < json.events.length; i++){
		var value = json.events[i];
        var arr = value.date.split('-');
	
        results[length + i] = value;
        
		var element = 
                    '<span class="resultElement">'+
                        '<input type="hidden" value="' + value.venueId  + '">'+
                        '<span class="firstPart">'+
                            '<span class="date">' + arr[2] + ' ' + arr[1] + "<br>" + arr[0] + '</span>'+
                            '<span class="time">'+ value.time +'</span>'+
                            '<span class="price">'+ value.entry +'</span>'+
                        '</span>'+
                        '<span class="secondPart">'+
                            '<span class="eventPhototext">'+
                            '<img class="eventPhoto" src="'+ value.imgUrl +'">'+ (length + i) +
                            '</span>'+
                        '</span>'+
                        '<span class="thirdPart">'+
                            '<span class="eventName">' + value.eventName + '</span>'+
                            '<a href="mailto:' + value.venueEmail + '" class="venueName">'+
                                '<span class="venuePhoto">'+
                                    '<img class="venuePhotoPhoto" src="' + value.urlPhoto + '">'+
                                '</span>'+
                                '<span class="venueNametext">by ' + value.venueName + ' in ' + value.city + '</span>'+
                            '</a>'+
                        '</span>'+
                    '</span>'+
                    '<span class="spacer"></span>';
		
		$("#resultsList").append(element);
		if(json.events.length % 20 === 0 && i == json.events.length - 5)		{
			$("#resultsList").append('<span id="spinnerActivator"></span>');
			minus = 1;
		}
		
		// filter date duplication
		if(chartData.length > 0 && bufferedArray.length === 0 && value.date == chartData[chartData.length - 1][0][0]){
			bufferedArray = chartData[chartData.length - 1];
			chartData = jQuery.grep(chartData, function( a ) {
							  return a !== bufferedArray;
						});
		}
		
		bufferedArray.push(new Array(value.date, value.time, value.urlPhoto, value.eventName));
		
		if((i + 1 < json.events.length && value.date != json.events[i+1].date) || i + 1 == json.events.length){
			chartData.push(bufferedArray);
			bufferedArray = new Array();
		}
	}
	
	if(page > 0){
		$(".secondPart").off();
	}
	
    $(".wrapper").on( "click", function() {
        $("#resultsList").empty();
        $("#concerts").empty();
		$("#concertsDate").empty();
		$("#custom_program_menu").empty();
		chartData = new Array();
		page = 0;
		selectLoad = byClub;
		selectClub = results[$(this).find(".eventPhototext").text()].venueId;
		loadConcertForClub(selectClub);
	});
	
	//* Timeline - vertical align based on time *//
	$("#concerts").empty();
	$("#concertsDate").empty();
	$("#lineContainer").empty();
	
	var height = $("#concerts").innerHeight() - 75;
//	For 24 hour
	var constant = height / 1440;
//	For 10 hours
//	var constant = height / 600;
	var counter = 0;
	/*
	 *  <= 5  - yelow
	 *  <= 12 - blue
	 *  > 12 - red
	 */
	var color = {'yelow' : '#ffbb33',
        		  'blue'  : '#5F7395',
        		  'red'  : '#FF4747'};
	
	for(var i = 0; i < chartData.length; i++){
		var arrayForDay = chartData[i];
		var element = '<td>';
		for(var j = 0; j < arrayForDay.length; j++){
			if((j+1 < arrayForDay.length && arrayForDay[j][1] != arrayForDay[j+1][1]) || j+1 == arrayForDay.length){
				if(arrayForDay[j][1].split(':')[0] > 13){
					element = element + '<span class="venuePointChart" style="top:' + (height - getMinutes(arrayForDay[j][1]) * constant) + 'px; background-color: ' + (counter <= 5 ? color['yelow'] : (counter <= 12 ? color['blue'] : color['red'])) + ';">' + i + '</span>';
				}
				counter = 0;
			}else{
				counter++;
			}
		}
		$("#concerts").append(element + '</td>');
		var arr = arrayForDay[0][0].split('-');
		$("#concertsDate").append('<td>' + arr[2] + ' ' + arr[1] + "<br>" + arr[0] + '</td>');
	}
	
//	22 = 1320
//	20 = 1200
	
// 22 = 480
// 20 = 360
	
	$("#lineContainer").append(	'<span class="timeLine" style="top: ' + (height - 1320 * constant) + 'px;">' +
						  	   		'<span class="timeLineText">22:00</span>' +
						  	   		'<span class="timeLineLine"></span>' +
					  	   		'</span>' +
					  	   		'<span class="timeLine" style="top: ' + (height - 1200 * constant) + 'px;">' +
									'<span class="timeLineText">20:00</span>' +
									'<span class="timeLineLine"></span>' +
							   	'</span>' +
								'<span class="timeLine" style="top: ' + (height - 840 * constant) + 'px;">' +
									'<span class="timeLineText">14:00</span>' +
									'<span class="timeLineLine"></span>' +
							   	'</span>');


function getMinutes(time){
	var timeSplit = time.split(":");
	var hour = parseInt(timeSplit[0]);
	var minute = parseInt(timeSplit[1]);
	
	// ignore 14 hours  840
	return (hour * 60) + minute;
}
	//* ----- On click concerts showcase ----- *//
	$(".venuePointChart").on('mouseenter', function(){
		$("#custom_program_menu").empty();
		var value = chartData[$(this).text()];
		for(var i = 0; i < value.length; i++){
			var element = 
			'<span class="result">'+
				'<span class="event_time">'+ value[i][1] +'</span>'+
				'<span class="box">'+
				'<span class="venue_img">'+
					'<img class="venue_img_src" src="'+ value[i][2] +'">'+
				'</span>'+	
				'<span class="event_name">'+ value[i][3] +'</span>'+
				'</span>'+
			'</span>';
			$("#custom_program_menu").append(element);
		}
		$("#custom_program_menu").show();
		 var popupWidth  = $('#custom_program_menu').outerWidth();
		 var popupHeight =  $('#custom_program_menu').outerHeight();

		if(mouseX+popupWidth > windowWidth)
         popupLeft = mouseX-popupWidth;
		  else
		   popupLeft = mouseX;

			if(mouseY+popupHeight > windowHeight)
		     popupTop = mouseY-popupHeight;
				else
			     popupTop = mouseY; 

			if( popupLeft < $(window).scrollLeft()){
			 popupLeft = $(window).scrollLeft();
			}
			if( popupTop < $(window).scrollTop()){
			 popupTop = $(window).scrollTop();
			}
			if(popupLeft < 0 || popupLeft === undefined)
			 popupLeft = 0;
		    if(popupTop < 0 || popupTop === undefined)
			 popupTop = 0;

	$('#custom_program_menu').offset({top:popupTop,left:popupLeft});
	});
	$("#custom_program_menu").on('mouseleave', function(){
		$("#custom_program_menu").hide(200);
	});
	
	page++;
}



//Load concerts for manager
function addPropagationElements(json){
    
    for(var i = 0; i < json.events.length; i++){
        var value = json.events[i];
        var element = 
            '<span class="propagationElement">'+
                '<ul>'+
                    '<li class="eventDate">'+ value.stringDate +'</li>'+
                    '<li class="eventTime">'+ value.time +'</li>'+
                    '<li class="eventPhoto"><img class="eventPhotoImg" src="'+ value.imgUrl +'"></li>'+
                    '<li class="eventName">'+ value.eventName +'</li>'+
                    '<li class="eventDetail">'+ value.detail +'</li>'+
                    '<li class="eventEntry">'+ value.entry +'</li>'+
                    '<li class="eventAudience">23</li>'+
                    '<li>'+
                        '<span class="eventDelete">'+
                            '<input type="hidden" id="idEvent" value="'+ value.id +'">'+
                        '</span>'+
                    '</li>'+
                '</ul>'+
            '</span>'+
            '<span class="spacer"></span>';
        
        $("#propagationElements").append(element);
    }
    //Delete handler
    $(".eventDelete").on("click", function(){
    eventID = $(this).find("#idEvent").val();
    deleteConcert(eventID);
    });
}