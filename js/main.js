var page = 0;
var monthNumber = 01;
var chartData = new Array();
var dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var results = [];
var idVenue = Cookies.get('idVenue');
var apiKey = Cookies.get('apiKey');
var venueName = Cookies.get('name');
var language = {};
var slovak = {};
var english = {};
var czech = {};
var mouseX,mouseY,windowWidth,windowHeight;
var popupLeft,popupTop;
var slovak ={
    calendarLang: 'sk',
    //app.html
    day:"DEŇ",
    night:"NOC",
    header1:"Nová úroveň organizovania koncertov",
    header2:"Z pohodlia vášho pc alebo tabletu",
    //welcome.html
    statistics:"Majte pod kontrolou svoje okolie<br><strong>Jednoducho a ľahko analyzujte najlepší termín pre koncert, alebo si nechajte poradiť naším concertian, ktorý Vám vždy poradí čo najlepší dátum a čas na koncert.</strong>",
    mycalendar:"Zahoďte svoju excelovskú tabuľku<br><strong>Vytvárajte koncerty, upravujte a presúvajte. Poznámky a potrebné informácie sa ukladajú pri vytváraní koncertu a ak chcete podujatie zverejniť, jednoducho zmeňte jeho status.</strong>",
    propagation:"Propagujte vytvorené koncerty<br><strong>1. Majte v momente svoj koncertný program na svojom fan page<br>2. Sledujte odozvu prostredníctvom nášho počítadla návštevnosti<br>3. Nenechajte veci na náhodu a reagujte na dopyt!</strong></span>",
    settings:"Aby toho nebolo málo<br><strong>Tu môžete spravovať svoj profil a uskutočniť platbu za produkt. Pozor - concertian LITE je na prvých</strong> 15 dní zadarmo.",
    placeholderCity:"city",
    //mycalendar.html
    calendarTitle:"Môj program <strong>LaFiesta</strong>",
    //propagation.html
    propagationTitle:"Propagácia koncertov <strong>" + Cookies.get('name') + "</strong>",
    legendDate:"DÁTUM",
    legendTime:"ČAS",
    legendPhoto:"OBRÁZOK",
    legendName:"NÁZOV",
    legendDetail:"POPIS",
    legendEntry:"VSTUPNÉ",
    legendAudience:"PRÍDU",
    legendDelete:"VYMAZAŤ",
    noConcertsResult:"Žiadne koncerty!",
    propagationText:"Propagovať koncerty jednoducho na facebook",
    propagationTextButton:"PROPAGOVAŤ",
    //manageaccount.html
    text2:"Meno",
    text3:"Priezvisko",
    text4:"Obchodné meno",
    text5:"Zaplatiť 19€",
    unsubscribeText:"Kliknutím na prerušiť odber, už nebude možné viac využívať balík concertian LITE. Prerušiť odber je možné v ktoromkoľvek momente bez ohľadu na to či ste s nami mesiac, dva alebo 6 mesiacov. Samozrejme treba zvážiť dopad na pokles návštevnosti vo vašom klube, nakoľko po zrušení odberu nebude môcť nasledujúci mesiac už pristupovať do aplikácie.",
    unsubscribeTextButton:"ZRUŠIŤ ODBER"
};
var english = {
    calendarLang: 'en',
        //app.html
    day:"DAY",
    night:"NIGHT",
    header1:"Whole new level of creating concerts",
    header2:"With comfort of your pc or tablet",
    //welcome.html
    statistics:"All concerts in your neighborhood<br><strong>By our statistics we provide ease and simple way how to choose the best date for concert. What more - the system does it for you.</strong>",
    mycalendar:"Forget about your excel sheet<br><strong>Create, edit and delete concerts within your personal calendar with all data you need, replacing your current notebook.</strong>",
    propagation:"Promote concert you have created<br><strong>1. Send concert program to your fan page by one click<br>2. Analyze the response by our traffic counter<br>3. React on your feedback for best outcome!</strong></span>",
    settings:"Manage your account here<br><strong>Contains payment gateway and subscription management settings.</strong>",
    placeholderCity:"city",
    //mycalendar.html
    calendarTitle:"My program <strong>LaFiesta</strong>",
    //propagation.html
    propagationTitle:"Concerts propagation <strong>" + Cookies.get('name') + "</strong>",
    legendDate:"DATE",
    legendTime:"TIME",
    legendPhoto:"PHOTO",
    legendName:"NAME",
    legendDetail:"DETAIL",
    legendEntry:"ENTRY",
    legendAudience:"COMING",
    legendDelete:"DELETE",
    noConcertsResult:"No concerts result!",
    propagationText:"Promote concerts on facebook",
    propagationTextButton:"PROMOTE",
    //manageaccount.html
    text2:"Name",
    text3:"Surname",
    text4:"Company name",
    text5:"Pay 19€",
    unsubscribeText:"By clicking unsubscribe, you are not going to be able to use concertian LITE anymore.Therefore you should consider your decision and its impact on your club visit rate. You will be able to access your account until the end of your current month subscription.",
    unsubscribeTextButton:"UNSUBSCRIBE"
};
var czech = {
	calendarLang: 'cs',
    //app.html
    day:"DEŇ",
    night:"NOC",
    header1:"Nová úroveň organizovania koncertov",
    header2:"Z pohodlia vášho pc alebo tabletu",
    //welcome.html
    statistics:"Majte pod kontrolou svoje okolie<br><strong>Jednoducho a ľahko analyzujte najlepší termín pre koncert, alebo si nechajte poradiť naším concertian, ktorý Vám vždy poradí čo najlepší dátum a čas na koncert.</strong>",
    mycalendar:"Zahoďte svoju excelovskú tabuľku<br><strong>Vytvárajte koncerty, upravujte a presúvajte. Poznámky a potrebné informácie sa ukladajú pri vytváraní koncertu a ak chcete podujatie zverejniť, jednoducho zmeňte jeho status.</strong>",
    propagation:"Propagujte vytvorené koncerty<br><strong>1. Majte v momente svoj koncertný program na svojom fan page<br>2. Sledujte odozvu prostredníctvom nášho počítadla návštevnosti<br>3. Nenechajte veci na náhodu a reagujte na dopyt!</strong></span>",
    settings:"Predaj lístkov online<br><strong>Zadajte množstvo a jednotkovú cenu lístku a my sa postaráme o zvyšok a to</strong> bez nároku na províziu.",
    placeholderCity:"city",
    //mycalendar.html
    calendarTitle:"Môj program <strong></strong>",
    //propagation.html
    propagationTitle:"Propagácia koncertov <strong></strong>",
    legendDate:"DÁTUM",
    legendTime:"ČAS",
    legendPhoto:"OBRÁZOK",
    legendName:"NÁZOV",
    legendDetail:"POPIS",
    legendEntry:"VSTUPNÉ",
    legendAudience:"PRÍDU",
    legendDelete:"VYMAZAŤ",
    noConcertsResult:"Žádne koncerty nenalezeny!",
    propagationText:"Propagovať koncerty jednoducho na facebook",
    propagationTextButton:"PROPAGOVAŤ",
    //manageaccount.html
    text2:"Meno",
    text3:"Priezvisko",
    text4:"Obchodné meno",
    text5:"Zaplatiť 19€",
    unsubscribeText:"Kliknutím na prerušiť odber, už nebude možné viac využívať balík concertian LITE. Prerušiť odber je možné v ktoromkoľvek momente bez ohľadu na to či ste s nami mesiac, dva alebo 6 mesiacov. Samozrejme treba zvážiť dopad na pokles návštevnosti vo vašom klube, nakoľko po zrušení odberu nebude môcť nasledujúci mesiac už pristupovať do aplikácie.",
    unsubscribeTextButton:"ZRUŠIŤ ODBER"
};

$(document).ready(function() {
	$(window).resize(function() {
	    if (timeout === false){
	        rtime = new Date();
	        timeout = true;
	    }else if( (new Date() - rtime) > delta && !disabled && $(window).width() < limitWidth) {
	        setNormal = false;
	        timeout = false;
	        disabled = true;
	        repaindTextSecond();
	    }else if ( $(window).width() > limitWidth){
	        disabled = false;
	        setNormal = true;
	        restore();
	    }
	});
	
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
    
    var calendarLang  = language["calendarLang"];
    window.language = language;
	setLanguage();

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
    
    //Go to welcome screen (tutorial)
    $("#welcome").on('click', function(){
        $("#contentPanel").empty();
        addspinner();
        $("#contentPanel").load("welcome.html", function(){
            $("#statisticsExplanation").on('click', function(){
                $("#statistics").trigger( "click" );
            });
            $("#mycalendarExplanation").on('click', function(){
                $("#mycalendar").trigger( "click" );
            });
            $("#propagationExplanation").on('click', function(){
                $("#propagation").trigger( "click" );
            });
            $("#marketExplanation").on('click', function(){
                $("#marketPlace").trigger( "click" );
            });
            $("#contentPanel").remove(".spinner");
            setLanguage();
        });
    });
    
    //Default load - welcome.html
    $("#contentPanel").empty();
    setLanguage();
    $("#welcome").trigger("click");
        
    //Go to statistics
        $("#statistics").on('click', function(){
            $( "#contentPanel" ).load("statistics.html", null, function() {
            	var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            	$("#monthSelectorList").empty();
	          
            	var date = new Date();
            	var month = date.getMonth() + 1;
            	
            	for(var i = month; i <= monthName.length; i++){
            		$("#monthSelectorList").append('<li><a onclick="loadAllConcert(' + (i < 10 ? '0' + i : i) + ')" >' + monthName[i-1] + '</a></li>');
            	}
            	
            	if(month > 1){
            		for(var i = 1; i < month; i++){
                		$("#monthSelectorList").append('<li><a onclick="loadAllConcert(' + (i < 10 ? '0' + i : i) + ')">' + monthName[i-1] + '</a></li>');
                	}
            	}
	        	
            	loadAllConcert(01);
            });
            $("#contentPanel").remove(".spinner");
        });
            
    //Go to My Calendar
    $("#mycalendar").on('click', function(){
        $("#contentPanel").empty();
        addspinner();
        $("#contentPanel").load("mycalendar.html", null, function() {
            initCalendar();
            setLanguage();
            $(".heading_venueName").append(language["calendarTitle"]);
            renderEdit();
            $(".heading_venueName").append(window.language["calendarTitle"]);
            $("#contentPanel").remove(".spinner");
        });
    });   
            
    //Go to Propagation
    $("#propagation").on('click', function(){
        $("#contentPanel").empty();
        addspinner();
        $("#contentPanel").load("propagation.html", null, function(){
            var clickedClubId = Cookies.get('idVenue');
            loadConcertForClub(clickedClubId);
            setLanguage();
            $("#contentPanel").remove(".spinner");
          });
    });
        
    //Go to ticket market
    $("#marketPlace").on('click', function(){
        $("#contentPanel").empty();
        addspinner();
        $("#contentPanel").load("market.html", null, function(){
            $(".heading_venueName").append(language["calendarTitle"]);
        });
    });
    
    //Go to settings
    $("#settings").on('click', function(){
        $("#contentPanel").empty();
        addspinner();
        $("#contentPanel").load("manageaccount.html", null, function(){
			$.getScript("https://js.braintreegateway.com/v2/braintree.js").done(function(){
			        
			        var clientToken;
			
			            $.ajax({
			                url: "php/generateClientToken.php",
			                success: function (ret) {
			                    $('#payment-form').empty();
			                    clientToken = ret;
			                    braintree.setup(clientToken, 'dropin',{
			                        container: "payment-form"
			                    });
			                }
			            });
			    
			    //TRANSACTION CHECKOUT
			    $('#checkout').submit(function(event) {
			    event.preventDefault();
			        $.ajax({
			          url: 'php/transactionCheckout.php',
			          dataType: 'json',
			          success: function(data) {
			            window.location = "response.html";
			          },
			          error: function(data){
			            window.location = "response.html";
			          }
			        });
			        event.preventDefault();
			    });
			    
			    //Braintree Manage Account
			    $("#unsubscribebutton").on('click', function(){
			        var subscription = Cookies.get('subscriptionId');
			        $.ajax({
			          url: 'php/cancelsubscription.php?subscription=' + subscription,
			          success: function(data) {
			            window.location = "response.html";
			          }
			        });
			    });
			});
            setLanguage();
            $("#contentPanel").remove(".spinner");
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
			}
		});
	});
    
    /* ---- Facebook graph stories ----- */
		/* Facebook jquery sdk implementation */
	  $.ajaxSetup({ cache: true });
	  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
		FB.init({
		  appId: '468434010007064',
		  version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
		});     
		$('#loginbutton,#feedbutton').removeAttr('disabled');
		FB.getLoginStatus(updateStatusCallback);
	  });
});

// Setting language
// SET TEXT BUILDER
function setLanguage(){
    //app.html
    $("#day").text(language["day"]);
    $("#night").text(language["night"]);
    $(".leftBanner_text").text(language["header1"]);
    $(".rightBanner_text").text(language["header2"]);
    $(".rightBanner_text").text(language["header2"]);
    //welcome.html
    $("#explanationtext1").append(language["statistics"]);
    $("#explanationtext2").append(language["mycalendar"]);
    $("#explanationtext3").append(language["propagation"]);
    $("#explanationtext4").append(language["settings"]);
    //statistics.html
    $("#cityName").attr("placeholder", language["placeholderCity"]);
    $("#cityName").attr("placeholder", language["placeholderCity"]);
    //mycalendar.html
    $(".heading_venueName").html(language["calendarTitle"]);
    //propagation.html
    $(".heading_venueName2").html(language["propagationTitle"]);
    $("#lidate").text(language["legendDate"]);
    $("#litime").text(language["legendTime"]);
    $("#eventphoto").text(language["legendPhoto"]);
    $("#liname").text(language["legendName"]);
    $("#detail").text(language["legendDetail"]);
    $("#lientry").text(language["legendEntry"]);
    $("#eventAudience").text(language["legendAudience"]);
    $("#eventDelete").text(language["legendDelete"]);
    $(".propagationText").text(language["propagationText"]);
    $("#propagationButton").text(language["propagationTextButton"]);
    //manageaccount.html
    $("#text2").append(language["text2"]);
    $("#text3").append(language["text3"]);
    $("#text4").append(language["text4"]);
    $("#text5").append(language["text5"]);
    $(".unsubscribetext").append(language["unsubscribeText"]);
    $("#unsubscribebutton").append(language["unsubscribeTextButton"]);
}

// ADDING SPINER WHILE LOADING #contentPanel
function addspinner(){
    $("#contentPanel").append('<div class="spinner">' +
                                  '<div class="dot1"></div>'+
                                  '<div class="dot2"></div>'+
                             '</div>');
}
// Load all concert for month ajax call
function loadAllConcert(month){
	monthNumber = month;
    $("#resultsList").empty();
    $("#concerts").empty();
	$("#concertsDate").empty();
	$("#lineContainer").empty();

	$("#resultsList").append('<div class="spinner">' +
				             	'<div class="dot1"></div>'+
					            '<div class="dot2"></div>'+
				       		 '</div>');
	
	setChart(new Array());
	
	$("#monthSelectorList").children(".selectedMonth").removeClass();
	$("#monthSelectorList").find("li:nth-child(" + monthNumber + ")").addClass("selectedMonth");
	
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
	  		$("#resultsList").empty();
	  		
	  		var element = 
                '<span class="resultElement">'+
                    '<span class="noDataResult">' + language["noConcertsResult"] + '</span>'+
                '</span>'+
                '<span class="spacer"></span>';
	  		
	  		$("#resultsList").append(element);
	  		
	  		
	  	}
    });
}

//Load concert by city ajax call
/*function loadConcertByCity(city){
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
}*/

// Load concerts for Club (on club click) by ajax call
function loadConcertForClub(clickedClubId){
	$.ajax({ 'url' : 'https://api.concertian.com/users/events/venue',
		  'method' : 'POST',
		  'data' : { 'results' : "20",
					 'page' : page,
					 'idVenue' : clickedClubId
				   },
		  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
			  addElements(json);
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
                }
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
                            '<img class="eventPhoto" src="'+ value.urlPhoto +'">'+ (length + i) +
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
		
		if(json.events.length % 20 === 0 && i == json.events.length - 5) {
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
	
    $(".secondPart").on( "click", function() {
        $("#resultsList").empty();
        $("#concerts").empty();
		$("#concertsDate").empty();
		$("#custom_program_menu").empty();
		chartData = new Array();
		page = 0;
		selectClubId = results[$(this).find(".eventPhototext").text()].venueId;        
		loadConcertForClub(selectClubId);
	});
	
	//* Timeline - vertical align based on time *//
	$("#concerts").empty();
	$("#concertsDate").empty();
	$("#lineContainer").empty();
	
	setChart(chartData);
	
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

function setChart(chartData){
	var height = $("#concerts").outerHeight() - 75;
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
	
	var arr = [2016, monthNumber, 0];
	var previousDay = 0;
	
	for(var i = 0; i < chartData.length; i++){
		var arrayForDay = chartData[i];
		var element = '<td>'+
						'<span class="timeLineVertic" style="top: 10px">' +
					   		'<span class="timeLineLineVertic"></span>' +
					    '</span>';
		for(var j = 0; j < arrayForDay.length; j++){
			if((j + 1 < arrayForDay.length && arrayForDay[j][1] != arrayForDay[j+1][1]) || j + 1 == arrayForDay.length){
//				if(arrayForDay[j][1].split(':')[0] > 13){
					element = element + '<span class="venuePointChart" style="top:' + (height - (getMinutes(arrayForDay[j][1]) * constant) + 3) + 'px; background-color: ' + (counter <= 5 ? color['yelow'] : (counter <= 12 ? color['blue'] : color['red'])) + ';">' + i + '</span>';
//				}
				counter = 0;
			}else{
				counter++;
			}
		}
		
		arr = arrayForDay[0][0].split('-');
		
		// add missing days between previous and actual day
		for(var j = parseInt(previousDay) + 1; j < parseInt(arr[2]); j++){
			$("#concerts").append('<td>'+
								  	'<span class="timeLineVertic" style="top: 10px">' +
							  	   		'<span class="timeLineLineVertic"></span>' +
							   	    '</span>'+
						   	      '</td>');
			$("#concertsDate").append('<td>' + (j < 10 ? "0" + j : j) + ' ' + arr[1] + "<br>" + arr[0] + '</td>');
		}
		
		$("#concerts").append(element + '</td>');
		$("#concertsDate").append('<td>' + arr[2] + ' ' + arr[1] + "<br>" + arr[0] + '</td>');
		
		previousDay = arr[2];
	}
	
	// change sting to integer
	var arrInt = [parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]) + 1];
	var monthDays;
	
	// check if is gap year
	if(arrInt[1] == 2 && ((arrInt[0] % 4 == 0) && (arrInt[0] % 100 != 0)) || (arrInt[0] % 400 == 0)){
		monthDays = parseInt(dayInMonth[monthNumber-1]) + 1;
	}else{
		monthDays = parseInt(dayInMonth[monthNumber-1]);
	}
	
	// add days to end of month
	for(var i = arrInt[2]; i <= monthDays; i++){
		$("#concerts").append('<td>'+
							  	'<span class="timeLineVertic" style="top: 10px">' +
						  	   		'<span class="timeLineLineVertic"></span>' +
						   	    '</span>'+
					   	      '</td>');
		$("#concertsDate").append('<td>' + (i < 10 ? "0" + i : i) + ' ' + (arrInt[1] < 10 ? "0" + arrInt[1] : arrInt[1] ) + "<br>" + arrInt[0] + '</td>');
	}
	
	
//	22 = 1320
//	20 = 1200
	
// 22 = 480
// 20 = 360
	
	for(var i = 1; i <= 24; i++){
		$("#lineContainer").append('<span class="timeLine" style="top: ' + (height - (60 * i) * constant) + 'px;">' +
							  	   		'<span class="timeLineText">' + (i < 10 ? '0' + i : i) + ':00</span>' +
							  	   		'<span class="timeLineLine"></span>' +
							   	   '</span>');
	}
}

function getMinutes(time){
	var timeSplit = time.split(":");
	var hour = parseInt(timeSplit[0]);
	var minute = parseInt(timeSplit[1]);
	var result = (hour * 60) + minute;
	
//	console.log(time + " => " + result);
	
	// ignore 14 hours  840
	return result == 0 ? 1440 : result;
}

//Load concerts for manager
function addPropagationElements(json){
    var length = results.length;
    
    for(var i = 0; i < json.events.length; i++){
        results[length + i] = value;
        var value = json.events[i];
        var element = 
            '<span class="propagationElement">'+
                '<ul>'+
                    '<li id="eventShareButton">'+
        '<span class="eventShareButtonText">'+ (length + i) +'</span>'+
                    '</li>'+
                    '<li class="eventDate">'+ value.stringDate +'</li>'+
                    '<li class="eventTime">'+ value.time +'</li>'+
                    '<li class="propagationeventPhoto">'+(value.imgUrl === "" ? '<span class="uploadimgUrlButton"><span class="upload_icon"></span>' : '<img class="propagationeventPhotoImg" src="'+ value.imgUrl +'">')+'</li>'+
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
    //Upload popup handler
    $(".uploadimgUrlButton").on('click', function(){
        $("#contentPanel").append('<span id="popup"></span>');
        $("#popup").empty();
        $("#popup").load("basic-plus.html");
    });
    $("#closeButton").on('click', function(){
    $("#popup").empty();
    $("#popup").hide();
    });
    //Share Button Handler
    $("li#eventShareButton").on("click", function(){
        $(this).css("background", "#ffbb33");
		var value = results[$(this).find(".eventShareButtonText").text()];
				FB.ui({
				  method: 'feed',
				  picture: value.imgUrl,
				  name: value.eventName,
				  caption: value.venueName,
				  description: value.date +" o "+value.time+" lístky "+value.entry,
				}, function(response){});
	});
    // Concert to share selector
    $("#propagationButton").on('click', function(){        
        $("#shareButton").addClass("display");
        $("li#eventShareButton").each(function(){
            $(this).addClass("display");
        });
        $("li.eventAudience").hide();
        $(".eventDelete").hide();
        $("#eventAudience").hide();
        $("#eventDelete").hide();
    });
}