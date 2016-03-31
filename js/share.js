var language;
var slovak = {
	moreconcerts:"Viac podujatí",
	buyTickets:"Zakúpiť vstupenky",
	free:"vstup<br>voľný",
	nodata:"Žiadne informácie",
	submitPayment:"Zaplatiť",
	payheading:"Platba kartou",
    name:"Meno",
    lastname:"Priezvisko",
    contactemail:"Email",
    checkboxText:"Súhlasím s <strong>obchodnými podmienkami</strong> platnými pre kúpu vstupenky concertian",
	langLink:"terms.html",
    quantityLegend:"Množstvo",
    priceLegend:"Jednotková cena",
    submitForm:"KÚPIŤ VSTUPENKU",
    responsebox: "ešte nezahájil predaj vstupeniek",
    responsebox2: "vypredané",
    noResult:"Žiadne výsledky hľadania",
    checkemail: "Vstupenku nájdete vo svojej emailovej schránke",
    checkemailWrong: "Došlo k chybe, skúste to ešte raz. Ďakujeme.",
    checkboxWarning: "Zabudli ste potvrdiť svoj súhlas s obchodnými podmienkami. Ďakujeme.",
    termsheading:"Obchodné podmienky concertian",
}
var english = {
	moreconcerts:"More events",
	buyTickets:"Buy tickets",
	nodata:"No more data",
	free:"free<br>entry",
	submitPayment:"PAY",
	payheading:"Pay with card",
    name:"Name",
    lastname:"Surname",
    contactemail:"Email",
    checkboxText:"I agree with <strong>terms and conditions</strong> applying to this service",
	langLink:"terms_en.html",
    quantityLegend:"Units",
    priceLegend:"Unit price",
    submitForm:"BUY TICKETS",
    responsebox: "has not yet launched selling",
	responsebox2: "sold out",
    noResult:"No resulsts",
    checkemail: "Ticket should be in your mailbox in short time",
    checkemailWrong: "An mistake occurred, please try it again",
    checkboxWarning: "You have forgotten to agree with terms and services for this service. Thank you.",
    termsheading:"Terms and services concertian",
}
var czech = {
	moreconcerts:"Více akcí",
	buyTickets:"Zakoupit vstupenky",
	free:"volný<br>vstup",
	nodata:"Žádné informace",
	submitPayment:"Zaplatit",
	payheading:"Platba kartou",
    name:"Jméno",
    lastname:"Příjmení",
    contactemail:"Email",
    checkboxText:"Souhlasím s <strong>obchodními podmínkami</strong> platnými pro nákup vstupenky concertian",
	langLink:"terms.html",
    quantityLegend:"Množství",
    priceLegend:"Jednotková cena",
    submitForm:"KOUPIT VSTUPENKU",
    responsebox: "ještě nespustil prodej vstupenek",
	responsebox2: "vyprodáno",
    noResult:"Žádné výsledky hledání",
    checkemail: "Vstupenku najdete ve své emailové schránce",
    checkemailWrong: "Došlo k chybě, zkuste to ještě jednou. Děkujeme.",
    checkboxWarning: "Zapomněli jste potvrdit svůj souhlas s obchodními podmínkami. Děkujeme.",
    termsheading:"Obchodní podmínky concertian",
}

$(document).ready(function(){
	var url = $(location).attr('href');
	var urlId = url.split('/');
	var eventId = urlId[3].split('?');
	var eventID = eventId[1];
	loadconcertbyeventID(eventID);
	
	//Language handler
	if(Cookies.get('language') == null){
		language = slovak;
	}else{
		switch(Cookies.get('language')){
			case "slovak":
				language = slovak;
				$("#language_menu").text('SK');
				break;
			case "english":
				language = english;
				$("#language_menu").text('EN');
				break;
			case "czech":
				language = czech;
				$("#language_menu").text('CZ');
				break;
		}
	}
	
	$("#shareBoxMoreConcerts").text(language["moreconcerts"]);
	$("#buyTickets").text(language["buyTickets"]);
	
	//Buy ticket handler
	$("#buyTickets").on('click', function(){
		$(".buyTicketButton").trigger("click");
	});
});
function loadconcertbyeventID(eventID){
	
	$.ajax({ 'url' : 'https://api.concertian.com/users/events/'+eventID+'',
		  'method' : 'GET',
		  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
			  buildContent(json);
		  },
		  'error': function(error){
			console.log('Error. ' + error);
			$(".spinner").remove();
		  }
		  });
}
function buildContent(json){
	var value = json.events[0];
	var elementDetail = 
			'<span class="outer">'+
				'<span class="header">'+
					'<img class="img" src="'+( value.imgUrl == "" ? 'img/default.jpg' : value.imgUrl) +'">'+
				'</span>'+
    '<span class="detailCore">'+
        '<span class="leftColumn">'+
            '<span class="sharevenueNamePicture">'+
                '<img class="sharevenueNamePictureImg" src="'+value.urlPhoto+'">'+
            '</span>'+
            '<span class="sharevenueName">'+value.venueName+'</span>'+
            '<span class="maindetailCore">'+value.eventName+'</span>'+
            '<span class="subdetailCore">'+(value.detail == "" ? language["nodata"] : value.detail)+'</span>'+
    '</span>'+
    '<span class="rightColumn">'+
            '<span class="youtube '+(value.youtubeVideo == null ? "center" : "")+'">'+
                '<iframe width="100%" height="auto" class="'+(value.youtubeVideo == null ? "youtubeIcon" : "")+'" style="display: block; width: 100%; height: auto; margin: 0; padding: 0; border: none;" src="'+(value.youtubeVideo == null ? "" : value.youtubeVideo)+'"></iframe>'+
            '</span>'+
            '<span class="buyTicketButton ' + (value.entry == 0 ? "freeText" : '') +'">'+(value.entry == "" ? language["free"] : language["submitPayment"] + " " +value.entry + "€")+'</span>'+
    '</span>'+
        '</span>'+
			'</span>';
	$("#shareBoxResults").empty();
	$("#shareBoxResults").append(elementDetail);
	$("#shareBoxResults").addClass("edgetoedge black");
	$(".outer").perfectScrollbar();
	
	//Buy ticket via popup
		$(".buyTicketButton").on('click', function(){
			if(value.entry != ""){
				var tickets = value.tickets;

				if(tickets != null){
					var available = value.tickets.available;
					var sold = value.tickets.sold;
				}

				var eventName = value.eventName;
				var eventID = value.id;
				var price = value.entry;
				var origin = value.state;
				var venuename = value.venueName;
				var soldout = available - sold;
				if(price != ""){
					buyTickets(eventID, price, origin, tickets, venuename, soldout, eventName);
				}
			}
			else{
				$(".buyTicketButton").css('opacity', 0.5);
			}
		});
}
function buyTickets(eventID, price, origin, tickets, venuename, soldout, eventName){
	var elementTicketForm =
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
                '<input type="checkbox" class="checkbox" name="vehicle" value="Bike" required><span class="checkboxText"><a href="'+language.langLink+'" target="_blank">'+language.checkboxText+'</a></span>'+
                '<span class="summary">'+
                    '<ul>'+
                        '<li>'+language.quantityLegend+'</li>'+
                        '<li>'+language.priceLegend+'</li>'+
                    '</ul>'+
                    '<span class="Ticketprice">'+(price == 0 ? language["free"] : price)+'</span>'+
                    '<span class="TicketpriceTag '+(price == 0 ? 'hide' : '')+'">'+ (origin === 'Czech Republic' ? 'czk':'eur') + '</span>'+
                    '<span class="Ticketquantity">1</span>'+
                '</span>'+
                '<input type="submit" name="submit" id="submitForm" value="'+language.submitForm+'">'+  
            '</form>'+
        '</span>'+
    '</span>';
	$("#popup").empty();
	$("#popup").show();
    $("#popup").append(elementTicketForm);
	$(".outer").perfectScrollbar();
	
	//Submit process
	if(tickets != null){
		if(soldout != 0){
			//Buy ticket submit
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
					'lastName': $('input[name=lastName]').val(),
					'email'   : $('input[name=email]').val(),
					'idEvent' : $('#eventID').val(),
					'price': price,
					'time'    : time,
					'date'    : date,
				};

				if(formData.name != "" && formData.lastname != "" && formData.email != "" && formData.eventID != "" && formData.ticketPrice != "" && formData.time != ""){

					$("#popup").empty();
					$("#popup").append(
                        '<span class="outer">'+
						'<span class="cardPayHeader">'+language.payheading+'</span>'+
						'<form id="checkout">'+
							'<span id="payment-form"></span>'+
							'<input type="hidden" name="price" id="price" val="'+ price +'">'+
							'<input type="submit" id="submit" value="'+language.submitForm+' '+price+'€">'+
						'</form>'+
                        '</span>');
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
											console.log("error",data);
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
		}
		else{
			soldoutTickets(eventName);
		}
	}
    else{
		askbuyTickets(venuename);
    }
}
function askbuyTickets(venuename){
     var elementresponse =
         '<span class="responseBox">'+
            '<span class="responseBoxIcon"></span>'+
            '<span class="responseBoxtext">'+venuename+' '+ language.responsebox+'</span>'+
         '</span>';
    $("#popup .outer").empty();
    $("#popup .outer").append(elementresponse);
}
function soldoutTickets(eventName){
     var elementresponse =
         '<span class="responseBox">'+
            '<span class="responseBoxIcon"></span>'+
            '<span class="responseBoxtext">'+eventName+' '+ language.responsebox2+'</span>'+
         '</span>';
	$("#popup .outer").empty();
    $("#popup .outer").append(elementresponse);
}
function generateTicket(formData){
    $("#popup .outer").empty();
    var element = '<span class="checkemail">'+language.checkemail+'</span>'+
                  '<span class="checkemailIcon"></span>';
    $(".shareBoxEvent").append(element);
         $.ajax({ 'url' : 'https://api.concertian.com/tickets/buy',
         'method' : 'POST',
         'data' : formData,
         contentType : "application/x-www-form-urlencoded",
         'success' : function (json){
         },
         'error': function(error){
         console.log('Error. ' + error);
         $(".spinner").remove();
         }
         });
}
function errorMessage(){
    $("#popup .outer").empty();
        var element = '<span class="checkemail" style="color: #546078;">'+language.checkemailWrong+'</span>'+
                  '<span class="checkemailIconWrong"></span>';
    $(".outer").append(element);
}