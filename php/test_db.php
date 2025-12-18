<?php
// php/test_db.php
include 'conexion.php';

try {
    // Intentamos hacer una consulta simple a la tabla USUARIOS
    $stmt = $pdo->query("SELECT COUNT(*) FROM USUARIOS");
    $total = $stmt->fetchColumn();
    
    echo "<h1>¡Conexión Exitosa!</h1>";
    echo "<p>Se encontraron $total usuarios en la base de datos.</p>";
} catch (PDOException $e) {
    echo "<h1>Error de Conexión</h1>";
    echo "<p>El servidor respondió: " . $e->getMessage() . "</p>";
}
?>