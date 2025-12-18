<?php
// php/conexion.php
$host = 'localhost';
$dbname = 'connectapet'; // Asegúrate que en phpMyAdmin se llame así
$username = 'root';      // Usuario por defecto de XAMPP
$password = '';          // En XAMPP suele estar vacío. Si tú le pusiste pass, escríbelo.

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Configuramos para que nos avise si hay errores
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Si falla, enviamos el error en formato JSON para que el JS lo entienda
    die(json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]));
}
?>