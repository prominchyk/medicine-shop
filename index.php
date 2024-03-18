<?php
include 'db.php';
    if(!empty($_POST)) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $address = $_POST['address'];
        $order = json_decode($_POST['order']);
        $date = date('Y-m-d');
        
        $query = "INSERT INTO users (name, email, phone, address) VALUES ('$name', '$email', '$phone', '$address')";
        $res = mysqli_query($link, $query);
        $id = mysqli_insert_id($link);

        foreach($order as $obj) {
            $arr = objectToarray($obj);
            $query2 = "INSERT INTO orders (shopName, medName, price, count, user_id, date) VALUES ('$arr[shopName]', '$arr[medName]', '$arr[medPrice]', '$arr[count]', '$id', '$date')";
            $res2 = mysqli_query($link, $query2);
        }

        if(!$res and !$res2 and MODE === 'dev') {
            die(mysqli_error($link));
        } 
        if($res and $res2) {
            //header('Location: http://medicin-shop-server/');
            echo "Your order #$id has been successfully sent.<br><br>";
            echo '<a href="file:///C:/projects/medicin-shop/index.html">⬅ Back to shop</a>';
        }
    }

    function objectToarray($data)
   {
       $array = (array)$data;
       foreach($array as $key => $field){
           if(is_object($field))$field = $this->objectToarray($field);
       }
       return $array;
   }
?>