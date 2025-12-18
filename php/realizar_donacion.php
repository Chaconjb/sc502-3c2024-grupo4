<?php
include 'conexion.php';

try {
    // 1. Recibimos los datos del formulario
    $monto = $_POST['amount'];
    $nombre = $_POST['fullName'];
    $email = $_POST['email'];
    $metodo = $_POST['paymentMethod'];
    $tipo = ($_POST['donationType'] == 'campania') ? 'Unica' : 'Recurrente';

    // 2. Insertamos o buscamos al usuario (Para simplificar, insertamos directo)
    // Nota: Asegúrate que tu tabla USUARIOS tenga estas columnas exactas
    $stmt = $pdo->prepare("INSERT IGNORE INTO USUARIOS (email, nombre_completo, tipo_usuario, password_hash) 
                           VALUES (?, ?, 'Donante', 'no_pass')");
    $stmt->execute([$email, $nombre]);
    
    // Obtenemos el ID del usuario
    $usuario_id = $pdo->lastInsertId();
    if($usuario_id == 0){ // Si ya existía el email
        $stmt = $pdo->prepare("SELECT usuario_id FROM USUARIOS WHERE email = ?");
        $stmt->execute([$email]);
        $usuario_id = $stmt->fetchColumn();
    }

    // 3. Insertamos la donación (Usaremos asociacion_id = 1 para la prueba)
    $sql = "INSERT INTO DONACIONES (usuario_id, asociacion_id, monto, tipo_donacion, metodo_pago) 
            VALUES (?, 1, ?, ?, ?)";
    $stmtDon = $pdo->prepare($sql);
    $stmtDon->execute([$usuario_id, $monto, $tipo, $metodo]);

    echo json_encode(['status' => 'success', 'message' => '¡Donación guardada con éxito!']);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>