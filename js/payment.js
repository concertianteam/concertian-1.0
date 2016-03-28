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
                $('#appendOuter').empty();
                $('#appendOuter').append('.response_text');
                console.log(data);
              },
              error: function(data){
                $('#appendOuter').empty();
                $('#appendOuter').append('.response_text');
                console.log(data);
              }
            });
            event.preventDefault();
        });
			    
});