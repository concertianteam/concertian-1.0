$(document).ready(function(){
	//Slider handler
	$("#underBar").unslider({
		autoplay: true,
		delay: 8000,
		speed: 2000,
		arrows: false
	});
	$("#functionSlider").unslider({
		keys: false, 
		arrows: false,
		nav: false
	});
	//  Delay is a custom function
	$('.benefitSelection ul li').on('click', function() {
	var slide =	$(this).attr("id");
	$('#functionSlider').unslider('animate:' + slide);
	});
	// Perfect scrollbar
	$(".wrapper").perfectScrollbar();
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
	setLanguage();
    // LANGUAGE MENU HANDLER
    $("#languageButton").click(function(event){
        event.stopPropagation();
        $(".languagemenu").fadeIn(200);
    });
    $(document).click( function(){
        $('.languagemenu').fadeOut(200);
    });
    
    //SET COOKIE FOR LANGUAGE
    $("#en").on('click', function(){
        Cookies.set('language', 'english', { expires: 100 }, { domain: 'manager.concertian.com' });
    });
    $("#sk").on('click', function(){
        Cookies.set('language', 'slovak', { expires: 100 }, { domain: 'manager.concertian.com' });
    });
    $("#cz").on('click', function(){
        Cookies.set('language', 'czech', { expires: 100 }, { domain: 'manager.concertian.com' });
    });
	//Set language
	
	
	// Email Verify
	$("#verify").submit(function(event){
		event.preventDefault();
		var email = $('input[name=email]').val();
 $.ajax({ 'url' 		: 'https://api.concertian.com/agents/verifyemail',
		  'method'  	: 'POST',
		  'data'		: {'email': email},
		  'contentType' : "application/x-www-form-urlencoded",
		  'success' 	: function (json){
			  	$("#appendOuter").empty();		  
				$("#appendOuter").load("form.html", function(){
					setLanguage();
					filloutform(json,email);
					$("#registration_form").submit(function(event){
						event.preventDefault();
						registrate();
					});
				});
          },
          'error': function(error){
                window.location = 'index.html';             
		  },
        });
	});
	
	// Calculate outcome
	var quantity = $("#quantity").val();
	var unitprice = $("#unitprice").val();
	var total = Math.round((quantity * unitprice) * 0.98);
	$("#finalprice").val(total);
	
	$("#finalprice").append(total);
	$("input[type='text']").change(function(){
		var quantity = $("#quantity").val();
		var unitprice = $("#unitprice").val();
		var total = Math.round((quantity * unitprice) * 0.98);
		$("#finalprice").val(total);
	});
});

var language = {};
var results ={};
var slovak = {
	registration: "REGISTRÁCIA",
	terms: "OBCHODNÉ PODMIENKY",
	verifyemailfieldname: "Email na potvrdenie",
	submit_verify: "Aktivovať účet",
	email: "Email",
	password: "Heslo",
    domain: "webová doména",
	name: "Názov podniku",
	address: "Adresa",
	country: "Krajina",
	city: "Mesto",
	checkbox_text: "Súhlasim Obchodnými podmienkami platnými pre túto službu",
	registration_submit: "Dokončiť registráciu",
	free: "vstup voľný",
	moreonconcertian: "Viac koncertov na concertian.com",
    text2:"Meno",
    text3:"Priezvisko",
    text4:"Obchodné meno",
    text5:"Zaplatiť 19€",
};
var english = {
	registration: "REGISTRATE",
	terms: "TERMS AND SERVICES",
	verifyemailfieldname: "Email for activation",
	submit_verify: "Activate account",
	email: "Email",
	password: "Password",
    domain: "Web domain",
	name: "Venue name",
	address: "Address",
	country: "Country",
	city: "City",
	checkbox_text: "I agree with terms & conditions applying to this service",
	registration_submit: "Finish registration",
	free: "entry free",
	moreonconcertian:"Find more concerts on concertian.com",
    text2:"Name",
    text3:"Surname",
    text4:"Company name",
    text5:"Pay 19€",
};
var czech = {
	registration: "REGISTROVAT",
	terms: "OBCHODNÍ PODMÍNKY",
	verifyemailfieldname: "Mail na potvrzení",
	submit_verify: "Aktivovat účet",
	email: "Email",
	password: "Heslo",
    domain: "Webová doména",
	name: "Název podniku",
	address: "Adresa",
	country: "Země",
	city: "Město",
	checkbox_text: "Souhlasím Obchodními podmínkami platnými pro tuto službu",
	registration_submit: "Dokončit registraci",
	free:"vstup volny",
	moreonconcertian:"Více koncertů na concertian.coV",
    text2:"Jméno",
    text3:"Příjmení",
    text4:"Obchodní jméno",
    text5:"Zaplatit 19€",
};

// Set language
function setLanguage(){
	 $("#registration_nav").text(language["registration"]);
	 $("#hide").text(language["terms"]);
	 $("#verifyemailfieldname").text(language["verifyemailfieldname"]);
	 $("#submit").prop("value", language["submit_verify"]);
	 $("#inputemail").text(language["email"]);
	 $("#inputpassword").text(language["password"]);
	 $("#inputdomain").text(language["domain"]);
	 $("#inputname").text(language["name"]);
	 $("#inputaddress").text(language["address"]);
	 $("#inputcountry").text(language["country"]);
	 $("#inputcity").text(language["city"]);
	 $(".checkbox_text").text(language["checkbox_text"]);
	 $("#submitregistration").attr("value", language["registration_submit"]);
    $("#text2").append(language["text2"]);
    $("#text3").append(language["text3"]);
    $("#text4").append(language["text4"]);
    $("#text5").append(language["text5"]);
}

// Filling out registrate formula
function filloutform(json,email){
	var name = json.name;
	  var state = json.state;
	  var city = json.city;
	  var addressFirst = json.addressFirst;
	  var venueId = json.idVenue;
	  var addressId = json.idAddress;
	
	
	if  (name == undefined) {
        $('#email').val(email);
            switch(Cookies.get('language')){
                case "slovak":
		$( "#response1" ).append( "<p>Emailovú adresu, ktroú ste zadali nemáme v databáze. Prosím zaregistrujte sa.</p>");
                    break;
                case "english":
		$( "#response1" ).append( "<p>Email address you entered in not in our database. Please register.</p>");
                    break;
                case "czech":
		$( "#response1" ).append( "<p>Emailovou adresu, kterou jste zadali nemáme v databázi. Prosím zaregistrujte se.</p>");
                    break;
				default:
		$( "#response1" ).append( "<p>Emailovú adresu, ktroú ste zadali nemáme v databáze. Prosím zaregistrujte sa.</p>");
                    break;
            }
	}
	else{
	$('#email').val(email);
	$('#idVenue').val(venueId);
	$('#venueName').val(name);
	$('#state').val(state);
	$('#city').val(city);
	$('#addressFirst').val(addressFirst);  
	$('#addressId').val(addressId); 
        switch(Cookies.get('language')){
            case "slovak":
	$( "#response1" ).append( "<p>Doplnte len heslo a sme hotoví. Jednoduché.</p>");
                break;
            case "english":
	$( "#response1" ).append( "<p>Great. Insert your password and we are done here.</p>");
                break; 
            case "czech":
	$( "#response1" ).append( "<p>Doplňte jen heslo a jsme hotovi. Jednoduché.</p>");
                break;
			default:
	$( "#response1" ).append( "<p>Doplnte len heslo a sme hotoví. Jednoduché.</p>");
                break;
                
        }
	}
}
//Submit Registrate formula
function registrate(){
	if($('.checkbox').prop('checked') == true){
var formData = {
    'email'          : $('input[name=email]').val(),
    'name'           : $('input[name=venue_name]').val(),
    'password'       : $('input[name=password]').val(),
    'domain'       : $('input[name=domain]').val(),
    'addressFirst'   : $('input[name=address]').val(),
    'state'          : $('input[name=state]').val(),
    'city'           : $('input[name=city]').val(),
    'idVenue'        : $('input[name=idVenue]').val(),
    'idAddress'      : $('input[name=addressId]').val(),
    };
		
 $.ajax({ 'url' 		: 'https://api.concertian.com/agents/register',
		  'method'  	: 'POST',
		  'contentType' : "application/x-www-form-urlencoded",
		  'data'		: formData,
		  'success' 	: function(json){
				$("#appendOuter").empty();	
			var element = '<span class="response_text"></span>'+
						  '<span class="response_button"></span>';
			  	$("#appendOuter").append(element);
			  	var response = json.success;
			  	responseScript(response);
		  },
		  'error': function(error){
				$("#appendOuter").empty();
		  },
        });
	}
}
function responseScript(response){
	switch(response){
			case true:
				switch(Cookies.get('language')){
                case "slovak":
            $(".response_button").append("Prihlásenie");
            $(".response_text").append( "<p>Registrácia prebehla úspešne,<br> potvrdzovací email bol zaslaný do Vašej emailovej schránky.<p>");
            $(".response_button").click(function() {
                  location.href='payment.html';
            });
                    break;
                case "english":
            $(".response_button").append("Log In");
            $(".response_text").append( "<p>Registration was successful,<br> confirmation email was sent to your mailbox.<p>");
            $(".response_button").click(function() {
                  location.href='payment.html';
            });
                    break;
                case "czech":
            $(".response_button").append("Přihlášení");
            $(".response_text").append( "<p>Registrace proběhla úspěšně,<br> potvrzovací email byl zaslán do Vaší emailové schránky.<p>");
            $(".response_button").click(function() {
                  location.href='payment.html';
            });   
                    break;
                default:
            $(".response_button").append("Log In");
            $(".response_text").append( "<p>Registration was successful,<br> confirmation email was sent to your mailbox.<p>");
            $(".response_button").click(function() {
                  location.href='payment.html';
            }); 
                    break;
            }
            break;
				break;
			case false:
				switch(Cookies.get('language')){
                case "slovak":
            $(".response_text").append( "<p>Zadaný email sa už používa. Skúste to ešte raz.</p>");
            $(".response_button").click(function() {
                  location.href='registration.html';
            });
            $(".response_button").append("Späť");
                    break; 
                case "english":
            $(".response_text").append( "<p>Entered email is already being used. Please try again.</p>");
            $(".response_button").click(function() {
                  location.href='registration.html';
            });
            $(".response_button").append("Back");
                    break;
                case "czech":
            $(".response_text").append( "<p>Zadaný email se již používá. Zkuste to ještě jednou.</p>");
            $(".response_button").click(function() {
                  location.href='registration.html';
            });
            $(".response_button").append("Zpět");
                    break;
                default:
            $(".response_text").append( "<p>Zadaný email sa už používa. Skúste to ešte raz.</p>");
            $(".response_button").click(function() {
                  location.href='registration.html';
            });
            $(".response_button").append("Späť");
                    break;
			}
				break;
	}
}