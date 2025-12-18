<?php
// php/login.php
header('Content-Type: application/json; charset=utf-8');
include 'conexion.php';
session_start(); // Inicia la sesión para recordar al usuario

$json = file_get_contents('php://input');
$data = json_decode($json, true);

try {
    if (!$data) throw new Exception("Datos no recibidos.");

    $email = $data['email'];
    $password = $data['password'];

    // Buscamos al usuario por email
    $sql = "SELECT usuario_id, nombre_completo, password_hash, tipo_usuario FROM USUARIOS WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verificamos si existe el usuario y si la contraseña coincide
    if ($user && password_verify($password, $user['password_hash'])) {
        
        // Guardamos datos en la Sesión de PHP
        $_SESSION['user_id'] = $user['usuario_id'];
        $_SESSION['user_name'] = $user['nombre_completo'];
        $_SESSION['user_type'] = $user['tipo_usuario'];

        echo json_encode([
            'success' => true, 
            'message' => '¡Bienvenido!',
            'user_type' => $user['tipo_usuario']
        ]);
    } else {
        throw new Exception("Correo o contraseña incorrectos.");
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>