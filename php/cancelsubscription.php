<?php
include('../brainTreePhp/lib/Braintree.php');
Braintree_Configuration::environment('production');
Braintree_Configuration::merchantId('hfxvx6r3f8q9t29h');
Braintree_Configuration::publicKey('b5vnvncpffqjyy7s');
Braintree_Configuration::privateKey('f1a60679f1338ed27a3626b375229f2b');
$result = Braintree_Subscription::cancel($_GET['subscription']);
?>