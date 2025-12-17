<?php
header('Content-Type: application/json; charset=utf-8');

$host = 'localhost';
$dbname = 'CONNECTAPET';
$username = 'root'; 
$password = '32764702dP'; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
    exit;
}
?>