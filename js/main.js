var page = 0;
var all = 0;
var byCity = 1;
var byClub = 2;
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
var slovak = {
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
    calendarTitle:"Môj program",
    deleteEventiconText:"Vymazať",
    createEventName:"Názov podujatia",
    createEventDate:"Dátum",
    createEventTime:"Čas",
    createEventDetails:"Popis podujatia",
    createEventEntry:"Vstupné ( € )",
    createEventNotes:"Moje poznámky",
    createEventEmail:"Email",
    createEventPhone:"Telefón",
    status:"Stav",
    status_1:"Dokončené",
    status_2:"Nedokončené",
    visible:"Viditeľné pre verejnosť",
    visible_1:"Áno",
    visible_2:"Nie",
    //propagation.html
    propagationTitle:"Propagácia koncertov",
    legendDate:"DÁTUM",
    legendTime:"ČAS",
    legendPhoto:"OBRÁZOK",
    legendName:"NÁZOV",
    legendDetail:"POPIS",
    legendEntry:"VSTUPNÉ",
    legendAudience:"PRÍDU",
    noConcertsResult:"Žiadne koncerty!",
    propagationText:"Propagovať koncerty jednoducho na facebook",
    propagationTextButton:"PROPAGOVAŤ",
    //market.html
    marketTitle:"Predaj vstupeniek",
    lidate:"DÁTUM",
    litime:"ČAS",
    lieventName:"NÁZOV PODUJATIA",
    lientry:"CENA",
    lisold:"PREDANÉ",
    lireservation:"REZERVÁCIE",
    begin:"ZAČAŤ",
    update:"UPRAVIŤ POČET",
    startSelling:"SPUSTIŤ PREDAJ",
	notSoldany:"Nula predaných",
    soldText:"Do tohto momentu ste predali lístky spolu za",
    availableText:"POČET",
    formTitle:"VYPLŇTE FORMULÁR A PREDÁVAJTE LÍSTKY",
    placeOrderSubmit: "VYTVORIŤ ID PREDÁVAJÚCEHO",
    createID: "Pre spustenie predaja vstupeniek je nutné najprv vytvoriť ID predávajúceho",
    icdph:"IČ DPH",
    vatid:"IČO",
    placeOrderCompanyName:"NÁZOV SPOLOČNOSTI",
    placeOrderAddress:"ADRESA",
    placeOrderAccountNumber:"ČÍSLO ÚČTU",
    placeOrderNumber:"POČET LÍSTKOV",
    placeOrderUnitprice:"JEDNOTKOVÁ CENA",
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
    calendarTitle:"My program",
    deleteEventiconText:"Delete",
    createEventName:"Event name",
    createEventDate:"Date",
    createEventTime:"Time",
    createEventDetails:"Details",
    createEventEntry:"Entry price",
    createEventNotes:"Your notes",
    createEventEmail:"Email contact",
    createEventPhone:"Phone contact",
    status:"State",
    status_1:"Finished",
    status_2:"Open",
    visible:"Visible to public",
    visible_1:"Yes",
    visible_2:"No",
    //propagation.html
    propagationTitle:"Concerts propagation",
    legendDate:"DATE",
    legendTime:"TIME",
    legendPhoto:"PHOTO",
    legendName:"NAME",
    legendDetail:"DETAIL",
    legendEntry:"ENTRY",
    legendAudience:"COMING",
    noConcertsResult:"No concerts result!",
    propagationText:"Promote concerts on facebook",
    propagationTextButton:"PROMOTE",
    //market.html
    marketTitle:"Ticket market",
    lidate:"DATE",
    litime:"TIME",
    lieventName:"EVENT NAME",
    lientry:"ENTRY PRICE",
    lisold:"SOLD",
    lireservation:"RESERVATIONS",
    begin:"BEGIN",
    update:"UPDATE QUANTITY",
    startSelling:"START SELLING",
	notSoldany:"Any sold",
    soldText:"Until know, you have earned",
    availableText:"QUANTITY",
    formTitle:"Start selling your tickets",
    placeOrderSubmit:"CREATE MERCHANT ID",
    createID: "To start selling tickets is necessary to creat ID of merchant",
    icdph:"VAT NUMBER",
    vatid:"VAT NUMBER",
    placeOrderCompanyName:"COMPANY NAME",
    placeOrderAddress:"ADDRESS",
    placeOrderAccountNumber:"ACCOUNT NUMBER",
    placeOrderNumber:"NUMBER OF TICKETS",
    placeOrderUnitprice:"UNIT PRICE",
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
    day:"DEN",
    night:"NOC",
    header1:"Nová úroveň organizování koncertů",
    header2:"Z pohodlí vašeho pc nebo tabletu",
    //welcome.html
    statistics:"Mějte pod kontrolou své okolí<br><strong>Jednoduše a snadno analyzujte nejlepší termín pro koncert, nebo si nechte poradit naším concertian, který Vám vždy poradí co nejlepší datum a čas na koncert.</strong>",
    mycalendar:"Zahoďte svou excelovskou tabulku<br><strong>Jednoduše vytvářejte koncerty a upravujte. Poznámky a potřebné informace se ukládají při vytváření koncertu a pokud chcete událost zveřejnit, prostě změňte jeho status.</strong>",
    propagation:"Propagujte vytvořené koncerty<br><strong>1.Mějte v momentě svůj koncertní program na svém fan page<br>2. Sledujte odezvu prostřednictvím našeho počítadla návštěvnosti<br>3. Nenechte věci náhodě a reagujte na poptávku!</strong></span>",
    settings:"Prodej lístků online<br><strong>Zadejte množství a jednotkovou cenu lístku a my se postaráme o zbytek a to </strong>bez nároku na provizi.",
    placeholderCity:"město",
    //mycalendar.html
    calendarTitle:"Můj program",
    deleteEventiconText:"Vymazat",
    createEventName:"Název akce",
    createEventDate:"Datum",
    createEventTime:"Čas",
    createEventDetails:"Podrobnosti",
    createEventEntry:"Vstupní",
    createEventNotes:"Vaše poznamky",
    createEventEmail:"Kontaktní email",
    createEventPhone:"Telefon",
    status:"Stav",
    status_1:"Dokončeno",
    status_2:"Nedokončeně",
    visible:"Viditelné pro veřejnost",
    visible_1:"Áno",
    visible_2:"Ne",
    //propagation.html
    propagationTitle:"Propagace koncertů",
    legendDate:"DATUM",
    legendTime:"ČAS",
    legendPhoto:"OBRÁZEK",
    legendName:"NÁZEV",
    legendDetail:"POPIS",
    legendEntry:"VSTUPNÍ",
    legendAudience:"PŘIJDOU",
    noConcertsResult:"Žádne koncerty nenalezeny!",
    propagationText:"Propagovat koncerty jednoduše na facebook",
    propagationTextButton:"PROPAGOVAT",
    //market.html
    marketTitle:"Prodej vstupenek.",
    lidate:"DATUM",
    litime:"ČAS",
    lieventName:"NÁZEV AKCE",
    lientry:"CENA",
    lisold:"PRODÁNO",
    lireservation:"REZERVACE",
    begin:"ZAČÍT",
    update:"UPRAVIT POČET",
    startSelling:"SPUSTIT PRODEJ",
	notSoldany:"Nula prodaných",
    soldText:"Do tohoto momentu jste prodali lístky spolu za",
    availableText:"POČET",
    formTitle:"VYPLŇTE FORMULÁŘ A PRODÁVEJTE LÍSTKY",
    placeOrderSubmit: "VYTVOŘIT ID PRODÁVAJÍCÍHO",
    createID: "Pro spuštění prodeje vstupenek je nutné nejprve vytvořit ID prodávajícího",
    icdph:"IČ DPH",
    vatid:"IČO",
    placeOrderCompanyName:"NÁZEV SPOLEČNOSTI",
    placeOrderAddress:"ADRESA",
    placeOrderAccountNumber:"ČÍSLO ÚČTU",
    placeOrderNumber:"POČET VSTUPENEK",
    placeOrderUnitprice:"JEDNOTKOVÁ CENA",
    //manageaccount.html
    text2:"Jméno",
    text3:"Příjmení",
    text4:"Obchodní jméno",
    text5:"Zaplatit 19€",
    unsubscribeText:"Kliknutím na přerušit odběr, již nebude možné více využívat balíček concertian LITE. Přerušit odběr je možné v jakémkoli okamžiku bez ohledu na to jestli jste s námi měsíc, dva nebo 6 měsíců. Samozřejmě je třeba zvážit dopad na pokles návštěvnosti ve vašem klubu, jelikož po zrušení odběru nebude moci následující měsíc již přistupovat do aplikace.",
    unsubscribeTextButton:"ZRUŠIT ODBĚR"
};

//Document READY FUNCTION
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
			window.location = 'login.html';
    	}
		else{
		  var apiKey = Cookies.get('apiKey');
		  var name = Cookies.get('name');
		  var urlPhoto = Cookies.get('urlPhoto');
		  var idAccount = Cookies.get('idAccount');
		  var idVenue = Cookies.get('idVenue');
          var language = Cookies.get('language');
            
            // Load cookie Elements
            $('#idVenue').val(idVenue);
            $('#apiKey').val(apiKey);
            if(urlPhoto != null){
            $('.venue_logo').html('<img class="logo" src="' + urlPhoto + '">');
            }
            else{
            $('.venue_logo').html('<img class="logo" src="img/default_avatar.png">');
            }
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
            $( "#contentPanel" ).load("statistics.html", null, function(){
                $("#resultsList").perfectScrollbar();
                //submit search form
                $('#search').attr('action', 'javascript:void(0);');
                $("#search").submit(function(event){
                   selectLoad = byCity;
                   event.stopPropagation(); 
                   loadConcertByCity(monthNumber);
                });
                loadAllConcert(02);
                $("#backButton").on('click', function(){
                   selectLoad = all;
                   loadAllConcert(02); 
                });
            });
            $("#contentPanel").remove(".spinner");
        });
            
    //Go to My Calendar
    $("#mycalendar").on('click', function(){
        $("#contentPanel").empty();
        addspinner();
        $("#contentPanel").load("mycalendar.html", null, function() {
            initCalendar();
            renderEdit();
            $(".heading_venueName").append(window.language["calendarTitle"]);
            if(urlPhoto != null){
            $(".heading_venuePhoto").attr('src', ''+urlPhoto+'');
            }
            else{
                $(".heading_venuePhoto").attr('src', 'img/default_avatar.png');
            }
            $("#contentPanel").remove(".spinner"); 
        });
        setLanguage();
    });   
            
    //Go to Propagation
    $("#propagation").on('click', function(){
        $("#contentPanel").empty();
        addspinner();
        $("#contentPanel").load("propagation.html", null, function(){
            var clickedClubId = Cookies.get('idVenue');
            $("#propagationElements").perfectScrollbar();
            loadConcertForManagerPropagation();
            setLanguage();
            if(urlPhoto != null){
            $(".heading_venuePhoto").attr('src', ''+urlPhoto+'');
            }
            else{
                $(".heading_venuePhoto").attr('src', 'img/default_avatar.png');
            }
            $("#contentPanel").remove(".spinner");
          });
    });
        
    //Go to ticket market
    $("#marketPlace").on('click', function(){
        $("#contentPanel").empty();
        addspinner();
        $("#contentPanel").load("market.html", null, function(){
            $("#placeOrder").perfectScrollbar();
            $(".ticketsResultList").perfectScrollbar();
            setLanguage();
            verifyMerchant();
            if(urlPhoto != null){
            $(".heading_venuePhoto").attr('src', ''+urlPhoto+'');
            }
            else{
                $(".heading_venuePhoto").attr('src', 'img/default_avatar.png');
            }
            //Form handler
            $("#placeOrder").submit(function(event){
                event.preventDefault();
                createNewMerchant();
            });
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
    //market.html
    $(".heading_venueName3").html(language["marketTitle"]);
    $(".lidate").text(language["lidate"]);
    $(".litime").text(language["litime"]);
    $(".lieventName").text(language["lieventName"]);
    $(".lientry").text(language["lientry"]);
    $(".lisold").text(language["lisold"]);
    $(".lireservation").text(language["lireservation"]);
    $(".liavailable").text(language["availableText"]);
    $(".soldText").text(language["soldText"]);
    $("#placeOrderSubmit").attr("placeholder", language["placeOrderSubmit"]);
    $("#icdph").text(language["icdph"]);
    $("#vatid").text(language["vatid"]);
    $("#placeOrderCompanyName").text(language["placeOrderCompanyName"]);
    $("#placeOrderAddress").text(language["placeOrderAddress"]);
    $("#placeOrderAccountNumber").text(language["placeOrderAccountNumber"]);
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
    selectLoad = all;
    clearStatistics();
    $("#monthSelectorList").children(".selectedMonth").removeClass();
	$("#monthSelectorList").find("li:nth-child("+ (month - 1) +")").addClass("selectedMonth");
	$.ajax({ 'url' : 'https://api.concertian.com/agents/events/month/' + month,
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
function loadConcertByCity(monthNumber){
    var city = $('input[name=cityName]').val();
    selectLoad = byCity;
    clearStatistics();
    $("#monthSelectorList").children(".selectedMonth").removeClass();
	$("#monthSelectorList").find("li:nth-child(" + (monthNumber-1) + ")").addClass("selectedMonth");
    	$.ajax({ 'url' : 'https://api.concertian.com/agents/events/city/month/'+ monthNumber,
		  'method' : 'POST',
		  'data' : { 
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
function loadConcertForClub(monthNumber){
    selectLoad = byClub;
    var clickedClubId = $("input[name=venueID]").val();
    clearStatistics();
    $("#monthSelectorList").children(".selectedMonth").removeClass();
	$("#monthSelectorList").find("li:nth-child(" + monthNumber + ")").addClass("selectedMonth");
	$.ajax({ 'url' : 'https://api.concertian.com/agents/events/venue/month/'+monthNumber,
		  'method' : 'POST',
		  'data' : { 
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
//Load concerts for manager - propagation.html
function loadConcertForManagerPropagation(){
    $.ajax({ 'url' : 'https://api.concertian.com/agents/events',
		  'method' : 'GET',
          'beforeSend': function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
                    request.withCredentials = true;
                },
		  'contentType' : "application/x-www-form-urlencoded",
		  'success' : function (json){
            addPropagationElements(json);
          },
          'error': function(error){
            console.log('Error. ' + error);
            $(".spinner").remove();
		  },
        });
}
            
//Load concerts for manager - market.html
function loadConcertForManager(){
    $.ajax({ 'url' : 'https://api.concertian.com/agents/events',
		  'method' : 'GET',
          'beforeSend': function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
                    request.withCredentials = true;
                },
		  'contentType' : "application/x-www-form-urlencoded",
		  'success' : function (json){
            
			var length = results.length;
            sum = 0;
            for(var i = 0; i < json.events.length; i++){
                var value = json.events[i];
            if(value.tickets != null){
                sum += value.tickets.earned;
                var quantity = value.tickets.available;
            }
                results[length + i] = value;
                var arr = value.stringDate.split('-');
			    var element = 
            '<span class="ticketResult">'+
                    '<span class="date">'+arr[2]+' '+arr[1]+'<br>'+arr[0]+'</span>'+
                    '<span class="time">'+value.time+'</span>'+
                    '<span class="concertName">'+value.name+'</span>'+
                    '<span class="entryPrice">'+value.entry+'</span>'+
                    '<input type="hidden" id="idEvent" name="idEvent" value="'+ value.idEvent +'">'+
                    '<span class="ticketsavailable">'+(value.tickets == null ? '0' : quantity)+'</span>'+
                    '<span class="sold" data-event="'+value.idEvent+'">'+(value.tickets == null ? '<span class="beginSellingButton">'+language.begin+'<span class="length">' + (length + i) + '</span></span>' : value.tickets.sold)+'</span>'+
					'<span class="reservation"></span>'+
			'</span>'+
			'<span id="eom'+value.idEvent+'" class="email_overview_menu"></span>'+
			'</span>';
					$(".ticketsResultList").append(element);
			}
				$(".ticketResult").each(function(){
					var idEvent = $(this).find("#idEvent").val();
					boughtTickets(idEvent);
				});
		  
		  //Sold tickets email customer overview
			$(".sold").click(function() {
			  $("#eom"+$(this).data("event")).slideToggle();
        		return false;
			});
			  
          //Ticekts sold sum 
		  $(".soldNumber").empty();
		  $(".soldNumber").append(sum + '€');

          // Handler for strat ticket sell button
          $(".beginSellingButton").on('click', function(){
              $("#placeOrderTicketSubmit").show();
              $("#updateorderSubmit").hide();
              var price = results[$(this).find(".length").text()].entry;
              var idEvent = results[$(this).find(".length").text()].idEvent;
              $("input[name=priceofTicket]").val(price);
              $("#eventSelect option").each(function(){
                if($(this).val()==idEvent){
                    $(this).attr("selected","selected");    
                }
              });
              $("#placeOrderTicketSubmit").on('click', function(){
                    submitsellTickets();
              });
          });
          //Reservation handler
              $(".reservation").one('click', function(){
                 createReservation(); 
              });
          },
		  'error': function(error){
			console.log('Error. ' + error);
			$(".spinner").remove();
		  },
	});
}
//Clear container statistics.html
function clearStatistics(){
    var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        $("#monthSelectorList").empty();
        var date = new Date();
        var month = date.getMonth() + 1;
        //Handler for month click
        switch(selectLoad){
            case all:
        for(var i = month; i <= monthName.length; i++){
            $("#monthSelectorList").append('<li><a onclick="loadAllConcert(' + (i < 10 ? '0' + i : i) + ')" >' + monthName[i-1] + '</a></li>');
        }

        if(month > 1){
            for(var i = 1; i < month; i++){
                $("#monthSelectorList").append('<li><a onclick="loadAllConcert(' + (i < 10 ? '0' + i : i) + ')">' + monthName[i-1] + '</a></li>');
            }
        }
            break;
            case byCity:
        for(var i = month; i <= monthName.length; i++){
            $("#monthSelectorList").append('<li><a onclick="loadConcertByCity(' + (i < 10 ? '0' + i : i) + ')" >' + monthName[i-1] + '</a></li>');
        }

        if(month > 1){
            for(var i = 1; i < month; i++){
                $("#monthSelectorList").append('<li><a onclick="loadConcertByCity(' + (i < 10 ? '0' + i : i) + ')">' + monthName[i-1] + '</a></li>');
            }
        }
        chartData = new Array();
            break;
            case byClub:
        for(var i = month; i <= monthName.length; i++){
            $("#monthSelectorList").append('<li><a onclick="loadConcertForClub(' + (i < 10 ? '0' + i : i) + ')" >' + monthName[i-1] + '</a></li>');
        }

        if(month > 1){
            for(var i = 1; i < month; i++){
                $("#monthSelectorList").append('<li><a onclick="loadConcertForClub(' + (i < 10 ? '0' + i : i) + ')">' + monthName[i-1] + '</a></li>');
            }
        }
        chartData = new Array();
        }

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
}
//Create imgUrl
function createimgUrl(imgUrl, eventId){
    $.ajax({ 'url' : 'https://api.concertian.com/agents/events/'+eventId+'/image',
		  'method' : 'PUT',
          beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
                    request.withCredentials = true;
                },
		  'data' : { 
					 'imgurl' : imgUrl
				   },
		  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
			  $("#propagation").trigger( "click" );
		},
		'error': function(error){
			console.log('Error. ' + error);
			$(".spinner").remove();
		}
	});
}
//Upload imgUrl
function uploadIMG(eventId){
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = window.location.hostname === 'blueimp.github.io' ?
                '//jquery-file-upload.appspot.com/' : 'https://api.concertian.com/UploadHandler/',
    uploadButton = $('<button/>')
        .addClass('btn btn-primary')
        .prop('disabled', true)
        .text('Minútku')
        .on('click', function () {
            var $this = $(this),
                data = $this.data();
            $this
                .off('click')
                .text('Nahrávam')
                .on('click', function () {
                    $this.remove();
                    data.abort();
                });
            data.submit().always(function () {
                $this.remove();
            });
        });
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        autoUpload: false,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 999000,
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        data.context = $('<div/>').appendTo('#files');
        $.each(data.files, function (index, file) {
            var node = $('<p/>')
                    .append($('<span/>').text(file.name));
            if (!index) {
                node
                    .append('<br>')
                    .append(uploadButton.clone(true).data(data));
            }
            node.appendTo(data.context);
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Nahrať')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
        $.each(data.result.files, function (index, file) {
            if (file.url) {
                var link = $('<a>')
                    .attr('target', '_blank')
                    .prop('href', file.url);
                $(data.context.children()[index])
                    .wrap(link);
                var imgUrl = file.url;
					createimgUrl(imgUrl, eventId);
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
            var error = $('<span class="text-danger"/>').text('Nenahrané');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
};

//Verify Merchant
function verifyMerchant(){
    $.ajax({ 'url' : 'https://api.concertian.com/tickets/merchant',
		  'method' : 'GET',
          beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
                    request.withCredentials = true;
                },
		  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
			  if(json.success != false){
                  appendTicketForm();
                  loadConcertForManager();
              }
              else{
                $(".ticketLegend").css('opacity', '0.2');
                $(".ticketSoldOverview").css('opacity', '0.2');
                $(".ticketsResultList").append('<span class="createMerchantId">'+language.createID+'</span>');
              }
		  },
		  'error': function(error){
			console.log('Error. ' + error);
			$(".spinner").remove();
		  }
	});
}
//Create new merchant
function createNewMerchant(){
    var formData = {
            'taxID'         : $('input[name=taxID]').val(),
            'vatID'         : $('input[name=vatID]').val(),
            'companyName'   : $('input[name=companyName]').val(),
            'address'       : $('textarea[name=address]').val(),
            'bankAccount'   : $('input[name=bankAccount]').val(),
    };
     $.ajax({ 'url' : 'https://api.concertian.com/tickets/merchant',
		  'method' : 'POST',
          'beforeSend': function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
                    request.withCredentials = true;
                },
		  'data' : formData,
		  'contentType' : "application/x-www-form-urlencoded",
		  'success' : function (json){
                        appendTicketForm();
                    },
          'error': function(error){
                console.log('Error. ' + error);
                $(".spinner").remove();
                    },
        });
}

//Ticket form
function appendTicketForm(){
    $(".ticketLegend").css('opacity', '1');
    $(".ticketSoldOverview").css('opacity', '1');
    $(".ticketsResultList").empty();
      $(".ticketForm").empty();
      var element = 
'<span class="formTitle">'+language["formTitle"]+'</span>'+
'<form id="sellTickets">'+
'<label class="custom_input_label" for="eventSelect">'+
    '<select name="eventSelect" id="eventSelect"></select>'+
'</label>'+  
'<label class="custom_input_label" for="company">'+
    '<span class="fieldName" id="placeOrderNumber">'+language["placeOrderNumber"]+'</span>'+
    '<input type="text" id="numberofTickets" name="numberofTickets" class="margin_bottom" required />'+
'</label>'+
'<input type="hidden" id="priceofTicket" name="priceofTicket" class="margin_bottom" val=""/>'+
'<input type="submit" id="placeOrderTicketSubmit" value="'+language.startSelling+'">'+
'<input type="submit" id="updateorderSubmit" value="'+language.update+'">'+
'</form>';
      $(".ticketForm").append(element);
      $("#placeOrderTicketSubmit").hide();
      $("#updateorderSubmit").show();
      $("#updateorderSubmit").on('click', function(){
         submitUpdatesellTickets(); 
      });
          //Load select with data
          $.ajax({ 'url' : 'https://api.concertian.com/agents/events',
		  'method' : 'GET',
          'beforeSend': function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
                    request.withCredentials = true;
                },
		  'contentType' : "application/x-www-form-urlencoded",
		  'success' : function (json){
                      //append select
                	  
    results = [];
                	  
    for(var i = 0; i < json.events.length; i++){
	    var value = json.events[i];
	    var element = '<option value="'+value.idEvent+'">'+value.name+'</option>';
	    $("#eventSelect").append(element);
    }
                    },
                    'error': function(error){
                        console.log('Error. ' + error);
                        $(".spinner").remove();
                    }
            });
}
// Handler for ticket form
function submitsellTickets(){
    $("#sellTickets").submit(function(event){
        event.preventDefault();
        var apiKey = Cookies.get('apiKey');
        var formData = {
    'idEvent'          : $('select[name=eventSelect]').val(),
    'availableTickets' : $('input[name=numberofTickets]').val(),
    'price'            : $('input[name=priceofTicket]').val(),
        }
        console.log(formData);
        $.ajax({ 'url' : 'https://api.concertian.com/tickets/',
		  'method' : 'POST',
		  'data' : formData,
	  	  beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
                    request.withCredentials = true;
                },
		  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
			  $("#marketPlace").trigger( "click" );
	  	},
	  	'error': function(error){
	  		console.log('Error. ' + error);
	  	}
    });
    });   
}
// Handler for ticket form
function submitUpdatesellTickets(){
    $("#sellTickets").submit(function(event){
        event.preventDefault();
        var apiKey = Cookies.get('apiKey');
        var formData = {
    'idEvent'          : $('select[name=eventSelect]').val(),
    'availableTickets' : $('input[name=numberofTickets]').val(),
        }
        $.ajax({ 'url' : 'https://api.concertian.com/tickets/',
		  'method' : 'PUT',
		  'data' : formData,
	  	  beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", apiKey);
                    request.withCredentials = true;
                },
		  contentType : "application/x-www-form-urlencoded",
		  'success' : function (json){
			  $("#marketPlace").trigger( "click" );
	  	},
	  	'error': function(error){
	  		console.log('Error. ' + error);
	  	}
    });
    });   
}
// Show bought tickets
function boughtTickets(idEvent){
$.ajax({ 
	  'url' : 'https://api.concertian.com/tickets/bought/'+idEvent+'',
	  'method' : 'GET',
	  'beforeSend': function (request)
			{
				request.setRequestHeader("Authorization", apiKey);
				request.withCredentials = true;
			},
	  'contentType' : "application/x-www-form-urlencoded",
	  'success' : function (json){
		  if(json.success != true){
			$("#eom"+idEvent).append('<span class="resultEmail">'+language["notSoldany"]+'</span>');
		  }
		  else{
			for(var i = 0; i < json.emails.length; i++){
				var value = json.emails[i];
				var element = '<span class="resultEmail">'+ value.email+'</span>';
				$("#eom"+idEvent).append(element);
			}
		  }
	  },
	  'error': function(error){
		console.log('Error. ' + error);
		$(".spinner").remove();
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
        var arr = value.stringDate.split('-');
	
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
		page = 0;
		selectClubId = results[$(this).find(".eventPhototext").text()].venueId; 
        $("input[name=venueID]").val(selectClubId);
        var monthNumber = 02;
		loadConcertForClub(monthNumber);
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
    	var value = json.events[i];
        results[length + i] = value;
        var arr = value.stringDate.split('-');
        var element = 
            '<span class="propagationElement">'+
                '<ul>'+
                    '<li id="eventShareButton">'+
        '<span class="eventShareButtonText">'+ (length + i) +'</span>'+
                    '</li>'+
                    '<li class="eventDate">'+arr[2]+' '+arr[1]+'<br>'+arr[0]+'</li>'+
                    '<li class="eventTime">'+ value.time +'</li>'+
                    '<li class="propagationeventPhoto">'+(value.imgUrl === "" ? '<span class="uploadimgUrlButton"><span class="upload_icon">'+(length + i)+'</span></span>' : '<img class="propagationeventPhotoImg" src="'+ value.imgUrl +'">')+'</li>'+
                    '<li class="eventName">'+ value.name +'</li>'+
                    '<li class="eventDetail">'+ value.detail +'</li>'+
                    '<li class="eventEntry">'+ value.entry +'</li>'+
                    '<li class="eventAudience">'+value.views+'</li>'+
                '</ul>'+
            '</span>'+
            '<span class="spacer"></span>';
        
        $("#propagationElements").append(element);
    }
    //Upload popup handler
    $(".uploadimgUrlButton").on('click', function(){
        $("#popup").empty();
        var eventId = results[$(this).find(".upload_icon").text()].idEvent;
        $("#contentPanel").append('<span id="popup"></span>');
        $("#popup").load("basic-plus.html", null, function() {
            $("#files").perfectScrollbar();
            uploadIMG(eventId);
            $("#closeButton").on('click', function(){
            $("#propagation").trigger( "click" );                 
        });
        });
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
        $("#eventAudience").hide();
    });
}

var mapValue = ["a"];
var entry = "";
var sc;
// Create reservations
function createReservation(){
    $.getScript( "js/jquery.seat-charts.js", function(){
        $("#contentPanel").append('<span id="reservationPopup"></span>');
        sc = $('#reservationPopup').seatCharts({
			map: mapValue,
			seats: {
				a: {
					price   : entry,
					classes : 'front-seat' //your custom CSS class
				}
			}, 
		});
		//Handlers
		$("#addrow").on('click', function(){
			mapValue.push("a");
			 console.log(mapValue);
			 
			 $.getScript( "js/jquery.seat-charts.js", function(){
        $("#contentPanel").empty();
				 $("#contentPanel").append('<span id="reservationPopup"></span>');
        sc = $('#reservationPopup').seatCharts({
        map: mapValue
        ,
        seats: {
            a: {
                price   : entry,
                classes : 'front-seat' //your custom CSS class
            }
        }, 
    });
	});
			 console.log($(this).children().text());
	 });
		
	});
}
