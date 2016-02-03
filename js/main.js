$(document).ready(function() {
    //ScrolBar
    $(".outer").perfectScrollbar();    
    $("#citySelect").perfectScrollbar({
    });    
    
    //Setting language
    if(Cookies.get('language') == null){
		language = slovak;
        citySource = citySK;
        setSelector(citySource);
	}else{
		switch(Cookies.get('language')){
			case "slovak":
				language = slovak;
                citySource = citySK;
                setSelector(citySource);
				$("#language_menu").text('SK');
				break;
			case "english":
				language = english;
                citySource = cityEN;
                setSelector(citySource);
				$("#language_menu").text('EN');
				break;
			case "czech":
				language = czech;
                citySource = cityCZ;
                setSelector(citySource);
				$("#language_menu").text('CZ');
				break;
		}
	}
	setLanguage();
    
    // LANGUAGE MENU HANDLER
    $("#language_menu").click(function(event){
        event.stopPropagation();
        $(".languagemenu").fadeIn(200);
    });
    $(document).click( function(){
    $('.languagemenu').fadeOut(200);
    });
    
    //SET COOKIE FOR LANGUAGE
    $("#en").on('click', function(){
		language = english;
        citySource = cityEN;
        setSelector(citySource);
		$("#language_menu").text('EN');
		setLanguage();
        Cookies.set('language', 'english', { expires: 100 });
    });
    $("#sk").on('click', function(){
		language = slovak;
        citySource = citySK;
        setSelector(citySource);
		$("#language_menu").text('SK');
		setLanguage();
        Cookies.set('language', 'slovak', { expires: 100 });
    });
    $("#cz").on('click', function(){
		language = czech;
        citySource = cityCZ;
        setSelector(citySource);
		$("#language_menu").text('CZ');
		setLanguage();
        Cookies.set('language', 'czech', { expires: 100 });
    });
    
    // Default load
    loadAllConcert();
    selectLoad = all;
    
    // FORM after enter press don't reload page
	$('#form').attr('action', 'javascript:void(0);');
	
	// Handler for search button click
	$(".imgSearch").click(function(){
		    page = 0;
			emptyContainerAddSpinner();
            removeAllMarkers();
            if(!$("#search_input").val()){
                loadAllConcert();
            }else{
                if(selectLoad == byCity){
                    var city = $("#search_input").val();
                    loadConcertByCity(city);
                }else if(selectLoad == byClub){
                    var selectedClubId = $("#clubId").val();
                    loadConcertByClub(selectedClubId);
                }
            }
	});
    
    	// AUTOCOMPLETE
	function getFields(results){
    	return results;
	}
	
    $(".byClub").on('click', function(){
        $(this).css('color', '#ffbb33');
        $(".byCity").css('color', '#546078');
        $("#search_input").attr("placeholder", language["searchplaceholder2"]);
        selectLoad = byClub;
    });
    $(".byCity").on('click', function(){
        $(this).css('color', '#ffbb33');
        $(".byClub").css('color', '#546078');
        $("#search_input").attr("placeholder", language["searchplaceholder1"]);
        selectLoad = byCity;
    });
    
    var autocomplete = $("#search_input").autocomplete({
        minLength: 2,
        source: function (request, response) {
			if(selectLoad == byClub){
				$.ajax({
					'url': 'https://api.concertian.com/agents/venues/name',
					'method': 'POST',
					'data': {'startsWith': request.term},
					'success': function (data) {
						response($.map(data, function(d) {
							return {
								fields: getFields(d)
							};
						}));
					},
					'error': function () {
						
					}
				});
			}
        },
		
      select: function fillValues( event, ui ) {
		selectedClubId = ui.item.fields.idVenue;
        $("#search_input").val(ui.item.fields.name);
        $("#clubId").val(selectedClubId);
		  	emptyContainerAddSpinner();
			removeAllMarkers();
            loadConcertByClub(selectedClubId);
        },
        appendTo: $('#concertlist')
    }).data("uiAutocomplete")._renderItem = function (ul, item) {
            return $("<li>").append('<a>' + item.fields.name + '</a>')
                .appendTo(ul);
    };
    
      	// Scroll effect
	$(".outer").scroll(function(){
			clearTimeout($.data(this, 'scrollTimer'));
		    $.data(this, 'scrollTimer', setTimeout(function() {
	        	if($("#spinnerActivator").is_on_screen()){
	        		$("#spinnerActivator").remove();
	        		
	        		if(selectLoad == all){
	        			loadAllConcert();
	        		}else if(selectLoad == byCity){
	        			loadConcertByCity(city);
	        		}else if(selectLoad == byClub){
	        			loadConcertByClub(selectedClubId);
	        		}
	        	}
		    }, 19));
		}
	);
	
	// Check if scroll is on end
	$.fn.is_on_screen = function(){
	    var win = $(window);
	    var viewport = {
	        top : win.scrollTop(),
	        left : win.scrollLeft()
	    };
	    viewport.right = viewport.left + win.width();
	    viewport.bottom = viewport.top + win.height();
	 
	    var bounds = this.offset();
	    
	    if(bounds != null){
	    	bounds.right = bounds.left + this.outerWidth();
	    	bounds.bottom = bounds.top + this.outerHeight();
	 
	    	return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	    }else{
	    	return false;
	    }
	};
    
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
    	/* ---- Facebook graph stories ----- */
		/* Facebook jquery sdk implementation */
	  $.ajaxSetup({ cache: true });
	  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
		FB.init({
		  appId: '1128811043811214',
		  version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
		});     
		$('#loginbutton,#feedbutton').removeAttr('disabled');
		FB.getLoginStatus(updateStatusCallback);
	  });
	//* --------- Twitter asynchronus calling -------- *//
	window.twttr = (function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0],
			t = window.twttr || {};
		  if (d.getElementById(id)) return t;
		  js = d.createElement(s);
		  js.id = id;
		  js.src = "https://platform.twitter.com/widgets.js";
		  fjs.parentNode.insertBefore(js, fjs);

		  t._e = [];
		  t.ready = function(f) {
			t._e.push(f);
		  };
  	return t;
	}
	(document, "script", "twitter-wjs"));
    
});
                  
var page = 0;
var all = 0;
var byCity = 1;
var byClub = 2;
var markers = [];
var results = [];
var mouseX,mouseY,windowWidth,windowHeight;
var popupLeft,popupTop;
var citySource;
var citySK = [
    "Bratislava",
    "Nitra",
    "Banská Bystrica",
    "Martyn",
    "Žilina",
    "Košice",
    "Prešov"
];
var cityEN = [
    "Bratislava",
    "Praha",
    "Brno",
    "Košice",
    "Prešov",
    "Ostrava",
    "Plzeň",
];
var cityCZ = [
    "Praha",
    "Brno",
    "Ostrava",
    "Plzeň",
    "Liberec",
    "Olomouc",
    "Ústí nad Labem"
];
var language;
var slovak = {
    byclub:"KLUB",
    bycity:"MESTO",
    searchplaceholder1:"Kde hľadáme?",
    searchplaceholder2:"Aký klub hľadáme?",
    by:"u",
    in:"v",
    name:"Meno",
    lastname:"Priezvisko",
    contactemail:"Email",
    checkboxText:"Súhlasím s <a>obchodnými podmienkami</a> platnými pre kúpu vstupenky concertian",
    quantityLegend:"Množstvo",
    priceLegend:"Jednotková cena",
    submitForm:"KÚPIŤ VSTUPENKU",
    submitPayment:"Zaplatiť",
    noResult:"Žiadne výsledky hľadania",
    checkemail: "Vstupenku nájdete vo svojej emailovej schránke",
    checkemailWrong: "Došlo k chybe, skúste to ešte raz. Ďakujeme.",
    checkboxWarning: "Zabudli ste potvrdiť svoj súhlas s obchodnými podmienkami. Ďakujeme.",
};
var english = {
    byclub:"CLUB",
    bycity:"CITY",
    searchplaceholder1:"Insert city",
    searchplaceholder2:"Insert club name",
    by:"by",
    in:"in",
    name:"Name",
    lastname:"Surname",
    contactemail:"Email",
    checkboxText:"I agree with <a>terms and conditions</a> applying to this service",
    quantityLegend:"Units",
    priceLegend:"Unit price",
    submitForm:"BUY TICKETS",
    submitPayment:"PAY",
    noResult:"No resulsts",
    checkemail: "Ticket should be in your mailbox in short time",
    checkemailWrong: "An mistake occurred, please try it again",
    checkboxWarning: "You have forgotten to agree with terms and services for this service. Thank you.",
};
var czech = {
    byclub:"KLUB",
    bycity:"MĚSTO",
    searchplaceholder1:"Kde hledáme?",
    searchplaceholder2:"Jaký klub hledáme?",
    by:"u",
    in:"v",
    name:"Jméno",
    lastname:"Příjmení",
    contactemail:"Email",
    checkboxText:"Souhlasím s <a>obchodními podmínkami</a> platnými pro nákup vstupenky concertian",
    quantityLegend:"Množství",
    priceLegend:"Jednotková cena",
    submitForm:"KOUPIT VSTUPENKU",
    submitPayment:"Zaplatit",
    noResult:"Žádné výsledky hledání",
    checkemail: "Vstupenku najdete ve své emailové schránce",
    checkemailWrong: "Došlo k chybě, zkuste to ještě jednou. Děkujeme.",
    checkboxWarning: "Zapomněli jste potvrdit svůj souhlas s obchodními podmínkami. Děkujeme.",
};

// SET TEXT BUILDER
function setLanguage(){
    $(".byClub").text(language["byclub"]);
    $(".byCity").text(language["bycity"]);
    $("#search_input").attr("placeholder", language["searchplaceholder1"]);
}
//Fill citySelect element
function setSelector(citySource){
    $("#citySelectList").empty();
    $.each(citySource, function(key, city){
        $("#citySelectList").append('<li>' + city + '</li>');
            // Load by city
            $("#citySelectList li").on('click', function(){
                city = $(this).text();
                selectLoad = byCity;
                emptyContainerAddSpinner();
                removeAllMarkers();
                loadConcertByCity(city);
            });
    });
}
// Empty container before load
function emptyContainerAddSpinner(){
        page = 0;
		$(".outer").empty();
		$(".outer").append(
								  '<div class="spinner">' +
									  '<div class="dot1"></div>'+
									  '<div class="dot2"></div>'+
								  '</div>');
}
function removeAllMarkers(){
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}

// The resource does not exists
function noResults(){
    $(".outer").html('<span id="response"></span>');
    $("#response").append('<span class="noResults"></span>');
    $("#response").append(language["noResult"]);
}

// Load all concert by URL
function loadAllConcert(){
    var url = "https://api.concertian.com/users/events";
	$.ajax({ 'url' : url,
		  'method' : 'POST',
		  'data' : { 'results' : "20",
			 		 'page' : page
		 		   },
	  	  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
                            addElements(json);
	  	            },
	  	'error': function(error){
	  		console.log('Error. ' + error);
	  		$(".spinner").remove();
            noResults();
	  	}
    });
}

// Load concert by City
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
	  		$(".spinner").remove();
            noResults();
	  	}
    });
}
// Load concert by Club
function loadConcertByClub(selectedClubId){
	$.ajax({ 'url' : 'https://api.concertian.com/users/events/venue',
		  'method' : 'POST',
		  'data' : { 'results' : "20",
					 'page' : page,
					 'idVenue' : selectedClubId
				   },
		  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
			  addElements(json);
		},
		'error': function(error){
			console.log('Error. ' + error);
			$(".spinner").remove();
            noResults();
		}
	});
}

// Add a like to event
function addLike(eventID){
    $.ajax({ 'url' : 'https://api.concertian.com/users/events/'+eventID+'',
		  'method' : 'GET',
		  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
		},
		'error': function(error){
			console.log('Error. ' + error);
			$(".spinner").remove();
		}
	});
}

// Buy tickets form
function buyTickets(eventID, price, origin){
    var elementTicketForm =
        '<span id="close">'+
            '<span class="closebutton">'+
                '<span class="closebuttonIcon"></span>'+
            '</span>'+
        '</span>'+
    '<span class="outer">'+
        '<span class="ticketForm">'+
            '<form id="buyTicketForm">'+
                 '<label for="firstName">'+
                    '<span class="fieldName">'+language.name+'</span>'+
                '<input type="text" id="firstName" name="firstName" value="" required>'+
                '</label>'+
                '<label for="lastName">'+
                    '<span  class="fieldName">'+language.lastname+'</span>'+
                '<input type="text" id="lastName" name="lastName" value="" required>'+
                '</label>'+
                '<label for="email">'+
                    '<span class="fieldName">'+language.contactemail+'</span>'+
                '<input type="text" id="email" name="email" value="" required>'+
                '</label>'+
                '<input type="hidden" id="eventID" name="eventID" value="'+ eventID+'">'+
                '<input type="hidden" name="price" value="'+price+'">'+
                '<input type="checkbox" class="checkbox" name="vehicle" value="Bike"><span class="checkboxText" required>'+language.checkboxText+'</span>'+
                '<span class="summary">'+
                    '<ul>'+
                        '<li>'+language.quantityLegend+'</li>'+
                        '<li>'+language.priceLegend+'</li>'+
                    '</ul>'+
                    '<span class="Ticketprice">'+(price == 0 ? 'free' : price)+'</span>'+
                    '<span class="TicketpriceTag '+(price == 0 ? 'hide' : '')+'">'+ (origin === 'Czech Republic' ? 'czk':'eur') + '</span>'+
                    '<span class="Ticketquantity">1</span>'+
                '</span>'+
                '<input type="submit" name="submit" id="submitForm" value="'+language.submitForm+'">'+  
            '</form>'+
        '</span>'+
    '</span>';
    $("#popup").append(elementTicketForm);
    $("#popup").fadeIn(100);
    $(".outer").perfectScrollbar();
    $("#buyTicketForm").submit(function(event){
        event.preventDefault();
        if($('.checkbox').prop('checked') == true){
        var dt = new Date();
        var month = dt.getMonth()+1;
        var day = dt.getDate();
        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        var date = dt.getFullYear() + '-' +
    ((''+month).length<2 ? '0' : '') + month + '-' +
    ((''+day).length<2 ? '0' : '') + day;
        var formData = {
            'name'    : $('input[name=firstName]').val(),
            'lastname': $('input[name=lastName]').val(),
            'email'   : $('input[name=email]').val(),
            'eventID' : $('#eventID').val(),
            'ticketPrice': price,
            'time'    : time,
            'date'    : date,
        };
        console.log(formData);
        
        
        if(formData.name != "" && formData.lastname != "" && formData.email != "" && formData.eventID != "" && formData.ticketPrice != "" && formData.time != ""){
            
            $("#popup .outer").empty();
            $("#popup .outer").append(
                '<form id="checkout">'+
                    '<span id="payment-form"></span>'+
                    '<input type="hidden" name="price" id="price" val="'+ price +'">'+
                    '<input type="submit" id="submit" value="'+language.submitPayment+' '+price+'€">'+
                '</form>');
            $.getScript("https://js.braintreegateway.com/v2/braintree.js").done(function(){
        
        var clientToken;

            $.ajax({
                url: "php/generateClientToken.php",

                success: function (ret) {
                    $('#payment-form').empty();
                    clientToken = ret;
                    braintree.setup(clientToken, 'dropin',{
                        container: "payment-form",
                        paymentMethodNonceReceived: function (event, nonce) {
                            $.ajax({
                                url: 'php/transactionCheckout.php?price='+price,
                                dataType: 'json',
                                method: 'POST',
                                data:{
                                    payment_method_nonce: nonce
                                },
                                success: function(data) {
                                    generateTicket(formData);
                                },
                                error: function(data){
                                    console.log(data);
                                    errorMessage();
                                }
                            });
                        }
                    });
                }
            });
                
        $('#checkout').submit(function(event){
            event.preventDefault();
            });
        });
        }
    }
    else{
        window.alert(language.checkboxWarning);
    }
    });
    $(".closebutton").on('click', function(){
        $("#popup").empty();
        $("#popup").hide();
    });
}

function addElements(json){
    $(".spinner").remove();
    page++;
    var minus = 0;
    var address = [];
    var length = results.length;
    
    for(var i = 0; i < json.events.length; i++){
		var value = json.events[i];
        var arr = value.stringDate.split('-');
        
        address[i] = encodeURIComponent(value.address + " " + value.city);
        results[length + i] = value;
        
        var element = 
                    '<span class="resultElement">'+
            '<span class="photoElement">'+
                '<span id="share">'+
                            '<span class="lenght">'+ (length + i) +'</span>'+
                '</span>'+
                '<img class="photoElementImg" src="'+ value.imgUrl +'">'+
            '</span>'+
            '<span class="whenElement">'+
                '<span class="date">'+arr[2]+'<br>'+arr[1]+'<strong></span>'+
                '<span class="time">'+ value.time +'</span>'+
            '</span>'+
            '<span class="whatElement">'+
                '<span class="eventName">'+ value.eventName +'</span>'+
                '<span class="venueName">'+
                    '<span class="lenght">'+ (length + i) +'</span>'+
                    '<input type="hidden" id="venueId" val="'+ value.venueId +'">'+
                    '<span class="venueNamePicture">'+
                        '<img class="venueNamePictureImg" src="'+ value.urlPhoto +'">'+
                    '</span>'+
                    '<span class="venueNameText"><span id="by">'+language.by+'</span>'+" "+'<strong>'+ value.venueName +'</strong>'+" "+'<span id="in">'+language.in+'</span>'+" "+'<strong>'+ value.city +'</strong></span>'+
                '</span>'+
            '</span>'+
            '<span class="detailElement'+(value.detail == "" ? 'hide' : '')+'">'+ value.detail +'<span class="lenght">'+ (length + i) +'</span></span>'+
            '<span id="allDetails"></span>'+
            '<span class="buttonsElement">'+
                '<ul>'+
                    '<li>'+
                        '<span id="tickets">'+
                            '<span class="lenght">'+ (length + i) +'</span>'+     
                        '</span>'+
                    '</li>'+
                    '<li>'+
                        '<span class="price">' + (value.entry == 0 ? 'free' : value.entry) + '</span>'+
            '<span class="price_tag '+(value.entry == 0 ? 'hide' : '')+'">'+ (value.state === 'Czech Republic' ? 'czk':'eur') + '</span>'+
                    '</li>'+
                '</ul>'+
            '</span>'+
        '</span>'+
        '<span class="spacer"></span>';
            
    $(".outer").append(element);
        
        if(json.events.length % 20 == 0 && i == json.events.length - 5){
			$(".outer").append('<span id="spinnerActivator"></span>');
			minus = 2;
		}
}
    // Hover show details for event
    	$(".detailElement").on('mouseenter', function(){
		$("#allDetails").empty();
		var value = results[$(this).find(".lenght").text()];
			var element = 
			'<span class="allDetailsText">'+ value.detail +'</span>';
			$("#allDetails").append(element);
		$("#allDetails").show();
		 var popupWidth  = $('#allDetails').outerWidth();
		 var popupHeight =  $('#allDetails').outerHeight();

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

	$('#allDetails').offset({top:popupTop,left:popupLeft});
	});
	$(".detailElement").on('mouseleave', function(){
		$("#allDetails").hide(200);
	});
    
    //Load concerts for club handler
    $(".venueName").on("click", function(){
        selectLoad = byClub;
        emptyContainerAddSpinner();
        removeAllMarkers();
        var value = results[$(this).find(".lenght").text()];
        var selectedClubId = value.venueId;
        loadConcertByClub(selectedClubId);
    });
    
    //By tickets handler
    $(".buttonsElement").on("click", function(){
        var value = results[$(this).find(".lenght").text()];
        var eventID = value.id;
        var price = value.entry;
        var origin = value.state;
        buyTickets(eventID, price, origin);
    });
    
    // Share concert on facebook    
    $("span #share").on("click", function(){
        $(this).addClass("share_clicked");
		var value = results[$(this).find(".lenght").text()];
        var eventID = value.id;
        addLike(eventID);
				FB.ui({
				  method: 'feed',
				  picture: value.urlPhoto,
				  name: value.eventName,
				  caption: value.venueName,
				  description: value.date +" o "+value.time,
				}, function(response){});
	});
    
    // Search for location and add markers
    var bounds = new google.maps.LatLngBounds();
	for(var i = 0; i < address.length; i++){
		$.ajax({ 'url' : 'https://maps.googleapis.com/maps/api/geocode/xml?address=' + address[i] + '&sensor=false?key=AIzaSyDMkYXW-SqynB-eACTqCPWfaT0Wv3bpI5I',
			  'method' : 'GET',
		  	  contentType : "application/x-www-form-urlencoded",
			  'success' : function (results, status){
				  if (status == 'success') {
					  var doc = $.parseXML((new XMLSerializer()).serializeToString(results));
					  
					  var location = $($(doc).find('geometry')).find('location');
					  var lat = parseFloat($(location).find('lat').text());
					  var lng = parseFloat($(location).find('lng').text());
					  var title = $(doc).find('formatted_address').text();
					 
					  if(!isNaN(lat)){
						  var myLatLng = new google.maps.LatLng(lat, lng);
						  var marker = new google.maps.Marker({
							  position: myLatLng,
							  map: map,
							  title: title,
							  icon: 'img/marker.svg'
					      });
						  
						  markers.push(marker);
						  bounds.extend(myLatLng);
						  map.fitBounds(bounds);
					  }
				  }
  			   },
  			   'error': function(error){
  				   console.log('Error. ' + error);
  			   }
	    });
	}
}
function generateTicket(formData){
    $("#popup .outer").empty();
    var element = '<span class="checkemail">'+language.checkemail+'</span>'+
                  '<span class="checkemailIcon"></span>';
    $("#popup .outer").append(element);
        /* $.ajax({ 'url' : 'https://api.concertian.com/tickets/buy',
         'method' : 'POST',
         'data' : formData,
         contentType : "application/x-www-form-urlencoded",
         'success' : function (json){
         },
         'error': function(error){
         console.log('Error. ' + error);
         $(".spinner").remove();
         }
         });*/
}
function errorMessage(){
    $("#popup .outer").empty();
        var element = '<span class="checkemail" style="color: #546078;">'+language.checkemailWrong+'</span>'+
                  '<span class="checkemailIconWrong"></span>';
    $("#popup .outer").append(element);
}