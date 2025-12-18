<?php
// php/registro_donante.php
header('Content-Type: application/json; charset=utf-8');
include 'conexion.php';

// Leer el JSON crudo del cuerpo de la petición
$json = file_get_contents('php://input');
$data = json_decode($json, true);

try {
    if (!$data) throw new Exception("No se recibieron datos.");

    // Encriptar la contraseña antes de guardar
    $passwordHash = password_hash($data['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO USUARIOS (email, nombre_completo, telefono, provincia, tipo_usuario, password_hash) 
            VALUES (:email, :nombre, :tel, :prov, 'Donante', :pass)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':email'  => $data['email'],
        ':nombre' => $data['nombre'],
        ':tel'    => $data['telefono'],
        ':prov'   => $data['provincia'],
        ':pass'   => $passwordHash
    ]);

    // Responder al fetch del JS
    echo json_encode(['success' => true]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>