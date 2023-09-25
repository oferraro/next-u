<?php

require_once '../mysql-connection.php';


$sql = "SELECT * FROM Products";
$stmt = $conn->prepare($sql);
$stmt->execute();

$result = $stmt->get_result();

$allProducts = [];

while ($products = $result->fetch_assoc()) {
    $allProducts[] = $products;
}

echo json_encode($allProducts);
