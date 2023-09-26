<?php

require_once '../../vendor/autoload.php'; // Include the JWT library
require_once '../mysql-connection.php';

$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, 1);

$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    echo json_encode(['success' => false, 'message' => 'No token provided']);
    exit();
}

$authorization = explode(" ", $headers['Authorization']);
if ($authorization && count($authorization) > 1) {
    $token = $authorization[1];
} else {
    $token = null;
}

if (!$token) {
    echo json_encode(['success' => false, 'message' => 'No token provided']);
    exit();
}

try {
    $userData = Firebase\JWT\JWT::decode($token, new Firebase\JWT\Key($_ENV['SECRET'], 'HS256'));
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Invalid token']);
    exit();
}

