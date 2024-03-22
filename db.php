<?php

define('MODE', 'dev');

$host = 'localhost';
$user = 'root';
$pass = '';
$name = 'medicinedb';

$link = mysqli_connect($host, $user, $pass, $name);
mysqli_query($link, "SET NAMES 'utf-8'");




?>