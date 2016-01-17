$(document).ready(function(){
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
    
    //Header handler
    $(".header").click(function(){
        switch(Cookies.get('language')){
            case "slovak":
                window.location = "../manager.html";
                break;
            case "english":
                window.location = "../manager.en.html";
                break;
            case "czech":
                window.location = "../manager.cz.html";
                break;
			default:
                window.location = "../manager.html";
                break;
        }
    });
    
    // REGISTER BUTTON
    $("#registrate").click(function(){
        switch(Cookies.get('language')){
            case "slovak":
                window.location = "../registrate.html";
                break;
            case "english":
                window.location = "../registrate.en.html";
                break;
            case "czech":
                window.location = "../registrate.cz.html";
                break;
			default:
                window.location = "../registrate.html";
                break;
        }
    });
    
    //Loading cookies
    if (Cookies.get('name') === undefined) {
        $("#log_inForm").addClass("paddingtop");
        $(".venue_name").text(language["text1"]);
    }
    else{
        var name = Cookies.get('name');
        var urlPhoto;
        if((urlPhoto = Cookies.get('urlPhoto')) != undefined){
            var element = '<img class="venue_img" src="'+urlPhoto+'">';
            $(".login_venue_img").append(element);
        }
        else{
            $(".login_venue_img").hide();
            $(".venue_name").css('margin-top', '32%');
        }
        
        $("#log_inForm").removeClass("paddingtop");
        $(".venue_name").append(name);
        $("#hide").hide();
    }
	// LOGIN SCRIPT
	 $("#log_inForm").submit(function(event){
    		event.preventDefault();
		$("#loginResult").empty();

	var loginData = {
            'email' : $('#email').val(),
            'password'  : $('#password').val()
    };

	if (loginData['email'] && loginData['password']) { // values are not empty
      $.ajax({
        type: "POST",
        url: "https://api.concertian.com/agents/auth",
        contentType: "application/x-www-form-urlencoded",
        data: loginData,
        success: function(json){
            
            
            
			  $('form#log_inForm').hide();
			  $('.header').hide();
			  $('#bottom_bar').hide();
			  $(".loginBox").append('<div class="success">'+ language.successMessage +'</div>'+
									'<div class="spinner">' +
                                          '<div class="dot1_login"></div>'+
                                          '<div class="dot2_login"></div>'+
                                    '</div>');
			var apiKey = json.apiKey;
			var name = json.name;
		  	var urlPhoto = json.urlPhoto;		
		  	var idAccount = json.idAccount;		
		  	var idVenue = json.idVenue;		
            var subscription = json.subscriptionId;
			  Cookies.set('apiKey', apiKey, { expires: 7 });
			  Cookies.set('name', name, { expires: 7 });
                if(urlPhoto)
			  Cookies.set('urlPhoto', urlPhoto, { expires: 7 });
			  Cookies.set('idAccount', idAccount, { expires: 7 });
			  Cookies.set('idVenue', idVenue, { expires: 7 });
              Cookies.set('subscriptionId', subscription, { expires: 7 });
           if(subscription != null){
             $.ajax({
                url: 'php/checkoutValidation.php?subscription=' + json.subscriptionId,
                success: function(data){
                    if (data == 1){
                        window.location ="http://localhost/manager.concertian.com/app.html";
                    }
                    else{
 window.location="../payment.html";
                    }
                }
            });   
           }
            else{
                window.location ="http://localhost/manager.concertian.com/app.html";
            }
        },
		  error: function(json){
			  $("#loginResult").text(JSON.parse(json.responseText).message);
	  }
      }); // ajax
    } // if
    else {
      $('div#loginResult').text(language["errorMessage"]);
    } // else
  });
});
                  var language;
                  var slovak = {
                    registerButton:"Registrovať",
                    checkboxText:"Zapamätať prihlásenie",
                    submitButton:"Prihlásiť",
                    subscription:"Pošlite pozvánku do systému aj ostatným klubom v okolí",
                    text1:"Prihlásenie",
                    successMessage:"Vitajte",
                    errorMessage:"Zadajte meno a heslo"
                  };
                  var english = {
                    registerButton:"Register",
                    checkboxText:"Remember me",
                    submitButton:"Log in",
                    subscription:"Send invitation to club managers in your neighborhood",
                    text1:"Log in form",
                    successMessage:"Welcome",
                    errorMessage:"Insert email and password"
                  };
                  var czech ={
                    registerButton:"Registrovat",
                    checkboxText:"Pamatovat si mě",
                    submitButton:"Přihlásit",
                    subscription:"Pošlete pozvánku do systému i ostatním klubem v okolí",
                    text1:"Přihlášení",
                    successMessage:"Vítejte",
                    errorMessage:"Zadejte jméno a heslo"
                  }; 
function setLanguage(){
     $("#registrate").text(language["registerButton"]);
     $("#hide").append(language["checkboxText"]);
     $("#submit").text(language["submitButton"]);
     $("#invitation").text(language["subscription"]);
}   