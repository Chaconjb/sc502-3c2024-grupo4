<?php
require_once 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(['error' => 'Faltan datos']);
    exit;
}

$username = $data['username'];
$password = $data['password'];

// Buscar el usuario en la base de datos
$stmt = $pdo->prepare('SELECT * FROM USUARIOS WHERE email = :username');
$stmt->bindParam(':username', $username);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// En producción, usar password_verify()
if ($user && $user['password_hash'] === $password) { // Cambiar por password_verify()
    echo json_encode([
        'success' => true,
        'user_id' => $user['usuario_id'],
        'user_type' => $user['tipo_usuario'],
        'user_name' => $user['nombre_completo']
    ]);
} else {
    echo json_encode(['error' => 'Credenciales incorrectas']);
}
?>