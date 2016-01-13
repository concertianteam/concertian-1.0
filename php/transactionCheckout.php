<?php
include('../brainTreePhp/lib/Braintree.php');
$nonceFromTheClient = $_POST['payment_method_nonce'];
Braintree_Configuration::environment('sandbox');
Braintree_Configuration::merchantId('zn8d4c74dbnp5ntw');
Braintree_Configuration::publicKey('ttwrprnsj83thjjz');
Braintree_Configuration::privateKey('a818cb5f3164585f31f4f03066f308c8');

$customer = Braintree_Customer::create(array(
    "firstName" => $_POST["first_name"],
    "lastName" => $_POST["last_name"],
    "company" => $_POST["company"],
    "paymentMethodNonce" => $nonceFromTheClient
));

if ($customer->success) {
    $subscription = Braintree_Subscription::create([
        'paymentMethodToken' => $customer->customer->paymentMethods[0]->token,
        'planId' => 'qtzg'
    ]);
    //echo $subscription->subscription->id;

    $opts = [
        CURLOPT_URL => 'https://api.concertian.com/agents/auth/subscription',
        CURLOPT_HTTPHEADER => [
            'Authorization: ' . $_COOKIE["apiKey"] // autorizacne API
        ],
        CURLOPT_POST => TRUE, // pojde o POST
        CURLOPT_POSTFIELDS => [
            'subscriptionId' => $subscription->subscription->id // tu su POST polia
        ],
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_SSL_VERIFYPEER => FALSE,
        CURLOPT_SSL_VERIFYHOST => FALSE,
        CURLOPT_CONNECTTIMEOUT => 25,
        CURLOPT_TIMEOUT => 3600,
        CURLOPT_HEADER => TRUE,
        CURLOPT_VERBOSE => TRUE
    ];

    $curl = curl_init();
    curl_setopt_array($curl, $opts);
    curl_exec($curl);

    setcookie('successfull', 3, time() + (86400 * 30), "/");
    header('Location: ../response.html');
} else {
    setcookie('successfull', 4, time() + (86400 * 30), "/");
    header('Location: ../response.html');
}