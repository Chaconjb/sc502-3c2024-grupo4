<?php
include 'conexion.php';

try {
    $monto = $_POST['amount'];
    $nombre = $_POST['fullName'];
    $email = $_POST['email'];
    $metodo = $_POST['paymentMethod'];
    $tipo = ($_POST['donationType'] == 'campania') ? 'Unica' : 'Recurrente';
    $stmt = $pdo->prepare("INSERT IGNORE INTO USUARIOS (email, nombre_completo, tipo_usuario, password_hash) 
                           VALUES (?, ?, 'Donante', 'no_pass')");
    $stmt->execute([$email, $nombre]);
    
    $usuario_id = $pdo->lastInsertId();
    if($usuario_id == 0){ 
        $stmt = $pdo->prepare("SELECT usuario_id FROM USUARIOS WHERE email = ?");
        $stmt->execute([$email]);
        $usuario_id = $stmt->fetchColumn();
    }

    $sql = "INSERT INTO DONACIONES (usuario_id, asociacion_id, monto, tipo_donacion, metodo_pago) 
            VALUES (?, 1, ?, ?, ?)";
    $stmtDon = $pdo->prepare($sql);
    $stmtDon->execute([$usuario_id, $monto, $tipo, $metodo]);

    echo json_encode(['status' => 'success', 'message' => '¡Donación guardada con éxito!']);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>