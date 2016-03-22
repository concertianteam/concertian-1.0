$(document).ready(function(){
    
	        
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
			    
});