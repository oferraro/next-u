<?php

require_once '../../vendor/autoload.php'; // Include autoloader (once)

$getEnvFile = dirname(__FILE__) . '/../getEnv.php';
require_once $getEnvFile;

// Create a connection
$conn = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME']);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
