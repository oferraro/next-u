<?php

define('DB_NAME', 'mydatabase');
define('DB_HOST', 'de31d9623059'); // Container name of MySQL instance
define('DB_USER', 'root');
define('DB_PASSWORD', 'mysecretpassword');

// Create a connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
