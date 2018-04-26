<?php  

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if($_GET['q']) {
	echo json_encode(['yesy']);
}
print_r(json_encode(['yesy']));
echo 'hello';

// echo $_POST['q'];

// $apiKey = '932bc4e6e40774a53ef8e06a8b4b986d';

// $service_url = 'https://api.flickr.com/services/rest?per_page=20&viewerNSID=&method=flickr.photos.search&api_key='.apiKey'&format=json&nojsoncallback=1&tagmode=any&'.$_GET['q']

// $curl = curl_init($service_url);

// curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
// $curl_response = curl_exec($curl);
// if ($curl_response === false) {
//     $info = curl_getinfo($curl);
//     curl_close($curl);
//     die('error occured during curl exec. Additioanl info: ' . var_export($info));
// }
// curl_close($curl);
// $decoded = json_decode($curl_response);
// if (isset($decoded->response->status) && $decoded->response->status == 'ERROR') {
//     die('error occured: ' . $decoded->response->errormessage);
// }
// echo 'response ok!';
// var_export($decoded->response);
?>