<?php
// php/registro_asociacion.php
header('Content-Type: application/json; charset=utf-8');
include 'conexion.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

try {
    if (!$data) throw new Exception("Datos no recibidos.");

    $passwordHash = password_hash($data['password'], PASSWORD_BCRYPT);

    // Nota: Aquí insertamos en la tabla ASOCIACIONES según tu estructura
    $sql = "INSERT INTO ASOCIACIONES (nombre_asociacion, email, telefono, provincia, mision, estado_aprobacion) 
            VALUES (:nombre, :email, :tel, :prov, :desc, 'Pendiente')";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nombre' => $data['nombre_asociacion'],
        ':email'  => $data['email'],
        ':tel'    => $data['telefono'],
        ':prov'   => $data['provincia'],
        ':desc'   => $data['descripcion']
    ]);

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>