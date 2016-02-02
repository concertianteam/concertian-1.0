jQuery(document).ready(function() {
    
    switch(Cookies.get('successfull')){
        case "1": //account created
            
            switch(Cookies.get('language')){
                case "slovak":
            $(".response_button").append("Prihlásenie");
            $(".response_text").append( "<p>Registrácia prebehla úspešne,<br> potvrdzovací email bol zaslaný do Vašej emailovej schránky. Využívajte aplikáciu na 15 dní zadarmo<p>");
            $(".response_button").click(function() {
                  location.href='../index.html';
            });
                    break;
                case "english":
            $(".response_button").append("Log In");
            $(".response_text").append( "<p>Registration was successful,<br> confirmation email was sent to your mailbox. Now you are able to use app for free, next 15 days.<p>");
            $(".response_button").click(function() {
                  location.href='../index.html';
            });
                    break;
                case "czech":
            $(".response_button").append("Přihlášení");
            $(".response_text").append( "<p>Registrace proběhla úspěšně,<br> potvrzovací email byl zaslán do Vaší emailové schránky. Využívejte aplikaci na 15 dní zdarma.<p>");
            $(".response_button").click(function() {
                  location.href='../index.html';
            });   
                    break;
                default:
            $(".response_button").append("Log In");
            $(".response_text").append( "<p>Registration was successful,<br> confirmation email was sent to your mailbox. Now you are able to use app for free, next 15 days.<p>");
            $(".response_button").click(function() {
                  location.href='../index.html';
            }); 
                    break;
            }
            break;
        case "2": //create account failed
            
            switch(Cookies.get('language')){
                case "slovak":
            $(".response_text").append( "<p>Zadaný email sa už používa. Skúste to ešte raz.</p>");
            $(".response_button").click(function() {
                  location.href='../registrate.html';
            });
            $(".response_button").append("Späť");
                    break; 
                case "english":
            $(".response_text").append( "<p>Entered email is already being used. Please try again.</p>");
            $(".response_button").click(function() {
                  location.href='../registrate.en.html';
            });
            $(".response_button").append("Back");
                    break;
                case "czech":
            $(".response_text").append( "<p>Zadaný email se již používá. Zkuste to ještě jednou.</p>");
            $(".response_button").click(function() {
                  location.href='../registrate.cz.html';
            });
            $(".response_button").append("Zpět");
                    break;
                default:
            $(".response_text").append( "<p>Zadaný email sa už používa. Skúste to ešte raz.</p>");
            $(".response_button").click(function() {
                  location.href='../registrate.html';
            });
            $(".response_button").append("Späť");
                    break;
			}
            break;
        case "3": //Payment was successful

            switch(Cookies.get('language')){
                case "slovak":
            $(".response_text").append( "<p>Platba prebehla úspešne. Ďakujeme.<br> Pokračujte do aplikácie.</p>");
            $(".response_button").click(function() {
                  location.href='../index.html';
            });
            $(".response_button").append("Prihlásenie");
                    break;
                case "english":
            $(".response_text").append( "<p>Payment was successful, please continue to login. Thank you.</p>");
            $(".response_button").click(function() {
                  location.href='../index.html';
            });
            $(".response_button").append("Log in");
                    break;
                case "czech":
            $(".response_text").append( "<p>Platba proběhla úspěšně. Pokračujte do aplikace. Děkujeme.</p>");
            $(".response_button").click(function() {
                  location.href='../index.html';
            });
            $(".response_button").append("Přihlášení");
                    break;
                default:
            $(".response_text").append( "<p>Payment was successful, please continue to login. Thank you.</p>");
            $(".response_button").click(function() {
                  location.href='../index.html';
            });
            $(".response_button").append("Log in");
                    break;
			}
            break;
        case "4": //Payment went wrong

            switch(Cookies.get('language')){
                case "slovak":
            $(".response_text").append( "<p>Platba neprebehla úspešne, skúste to ešte raz prosím.</p>");
            $(".response_button").click(function() {
                  location.href='../payment.html';
            });
            $(".response_button").append("Späť");
                    break; 
                case "english":
            $(".response_text").append( "<p>Payment was unsuccessful, try again please.</p>");
            $(".response_button").click(function() {
                  location.href='../payment.en.html';
            });
            $(".response_button").append("Back");
                    break; 
                case "english":
            $(".response_text").append( "<p>Platba neproběhla úspěšně, zkuste to ještě jednou prosím.</p>");
            $(".response_button").click(function() {
                  location.href='../payment.cz.html';
            });
            $(".response_button").append("Zpět");
                    break;
                default:
            $(".response_text").append( "<p>Payment was unsuccessful, try again please.</p>");
            $(".response_button").click(function() {
                  location.href='../payment.en.html';
            });
            $(".response_button").append("Back");
                    break; 

            break;
			}
			break;
        case "5":

            switch(Cookies.get('language')){
                case "slovak":
            $(".response_text").append( "<p>Email bol potvrdený. Ďakujem. Pokračujte do prihlásenia</p>");
            $(".response_button").click(function() {
                  location.href='../index.html';
            });
            $(".response_button").append("Prihlásenie");
                    break;
                case "english":
            $(".response_text").append( "<p>Your email account was confirmed, please continue to log in.</p>");
            $(".response_button").click(function() {
                  location.href='../index.html';
            });
            $(".response_button").append("Log in");
                    break;
                case "czech":
            $(".response_text").append( "<p>Email byl potvrzen. Pokračujte do přihlášení</p>");
            $(".response_button").click(function() {
                  location.href='../index.html';
            });
            $(".response_button").append("Přihlášení");
                    break;
                default:
            $(".response_text").append( "<p>Your email account was confirmed, please continue to log in.</p>");
            $(".response_button").click(function() {
                  location.href='../index.html';
            });
            $(".response_button").append("Log in");
                    break;
                  break;
			}
		break;
        default:
            $(".response_text").append( "<p>Internal error. Please go back to home page and try again. Thank you.</p>");
            $(".response_button").click(function() {
                  location.href='../manager.html';
            });
            $(".response_button").append("Home");

         break;
    	}
});
