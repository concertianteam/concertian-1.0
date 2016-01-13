<?php
include('../brainTreePhp/lib/Braintree.php');
Braintree_Configuration::environment('sandbox');
Braintree_Configuration::merchantId('zn8d4c74dbnp5ntw');
Braintree_Configuration::publicKey('ttwrprnsj83thjjz');
Braintree_Configuration::privateKey('a818cb5f3164585f31f4f03066f308c8');
$result = Braintree_Subscription::cancel($_GET['subscription']);
?>