<?php

require_once '../auth/checkToken.php';

$data = json_decode(file_get_contents('php://input'), true);

$sql = "delete from Carts where userId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $userData->id);
$stmt->execute();

foreach($data as $product) {
    $sql = "INSERT INTO Carts (productId, userId, amount) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('iii', $product['product']['id'], $userData->id, $product['amount']);
    $stmt->execute();
}
