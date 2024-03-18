<?php
include 'db.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
$query = "SELECT assortment.name, assortment.price, assortment.picture, shops.name as shop
             FROM assortment
             LEFT JOIN shops ON shops.id = assortment.shop_id";
    $res = mysqli_query($link, $query);
    if(!$res and MODE === 'dev') {
        die(mysqli_error($link));
    }
    for($data = []; $row = mysqli_fetch_assoc($res); $data[] = $row);
    print_r(json_encode($data));
?>