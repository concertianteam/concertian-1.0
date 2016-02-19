<?php
include('../brainTreePhp/lib/Braintree.php');
$nonceFromTheClient = $_POST['payment_method_nonce'];
Braintree_Configuration::environment('production');
Braintree_Configuration::merchantId('hfxvx6r3f8q9t29h');
Braintree_Configuration::publicKey('b5vnvncpffqjyy7s');
Braintree_Configuration::privateKey('f1a60679f1338ed27a3626b375229f2b');
$result = Braintree_Transaction::sale([
  'amount' => $_GET['price'], //set ammount of transaction, maybe by GET paramter of brainTree FORM
  'paymentMethodNonce' => $nonceFromTheClient //value of $_POST from brainTree server
]);

if($result){
    echo '{}'; //return some JSON after success payment
}
else{
    echo ''; // return empty string, ajax go to error, because wait json
}
?>



