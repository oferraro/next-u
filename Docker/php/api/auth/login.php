<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once '../../vendor/autoload.php'; // Include the JWT library
require_once '../mysql-connection.php';
require_once '../helpers.php';


// Your user validation logic here
$jsonData = file_get_contents('php://input');
// Decode the JSON data into a PHP associative array
$data = json_decode($jsonData, true);
// Check if decoding was successful

function safeQueryUser($conn, $username, $password) {
    $sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $username, $password); // ss = string, string
    $stmt->execute();

    $result = $stmt->get_result(); // get the mysqli result
    return $result->fetch_assoc();
}

function unsafeQueryUser($conn, $username, $password) {
    $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($query);
    $rowCount = $result->num_rows;

    if ($result && $rowCount > 0) {
        return $result->fetch_assoc();
    } else {
        return false;
    }
}

$username = $data['username'];
$password = $data['password'];

$user = safeQueryUser($conn, $username, $password);

// $user = safeQueryUser($conn, $username, $password);

if ($user) {
    unset($user['password']);

    // Create a payload for the JWT
    $payload = snakeToCamelKeys($user);
    $algorithm = 'HS256';

    // Generate the JWT
    $token = Firebase\JWT\JWT::encode($payload, 'your_secret_key', $algorithm);

    /**
     * ' or 1=1 or '
     */

    // Send the token back to the client
    echo json_encode(array("success" => true, "token" => $token));
} else {
    http_response_code(401); // Unauthorized
    echo json_encode(array("success" => false, "message" => "Invalid credentials"));
}
