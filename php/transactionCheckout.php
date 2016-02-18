<?php
include('../brainTreePhp/lib/Braintree.php');
$nonceFromTheClient = $_POST['payment_method_nonce'];
Braintree_Configuration::environment('production');
Braintree_Configuration::merchantId('hfxvx6r3f8q9t29h');
Braintree_Configuration::publicKey('b5vnvncpffqjyy7s');
Braintree_Configuration::privateKey('f1a60679f1338ed27a3626b375229f2b');

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