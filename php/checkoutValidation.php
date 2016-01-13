<?php
include('../brainTreePhp/lib/Braintree.php');
if (isset($_GET['subscription'])){
	$subscription = $_GET['subscription'];
} else {
	//echo 'Missing subscription ID!';
    echo "0";
	die;
}
Braintree_Configuration::environment('sandbox');
Braintree_Configuration::merchantId('zn8d4c74dbnp5ntw');
Braintree_Configuration::publicKey('ttwrprnsj83thjjz');
Braintree_Configuration::privateKey('a818cb5f3164585f31f4f03066f308c8');

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
