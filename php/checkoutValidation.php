<?php
include('../brainTreePhp/lib/Braintree.php');
if (isset($_GET['subscription'])){
	$subscription = $_GET['subscription'];
} else {
	//echo 'Missing subscription ID!';
    echo "0";
	die;
}
Braintree_Configuration::environment('production');
Braintree_Configuration::merchantId('hfxvx6r3f8q9t29h');
Braintree_Configuration::publicKey('b5vnvncpffqjyy7s');
Braintree_Configuration::privateKey('f1a60679f1338ed27a3626b375229f2b');

try {
	$subscription = Braintree_Subscription::find($subscription);	
} catch (Braintree_Exception_NotFound $e){
	//header('Location: ../response.html');
    echo "0";
	die;
}
if($subscription -> status == Braintree_Subscription::ACTIVE){
	//header('Location: ../app.html');
    echo "1";
} else {
	//header('Location: ../response.html');
    echo "0";
}
