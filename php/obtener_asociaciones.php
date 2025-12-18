<?php
header('Content-Type: application/json');
require_once 'conexion.php';

try {
    // búsqueda (si existen)
    $nombre = isset($_GET['nombre']) ? '%' . $_GET['nombre'] . '%' : '%';
    $provincia = isset($_GET['provincia']) ? '%' . $_GET['provincia'] . '%' : '%';
    // Filtramos por estado Aprobada
    $sql = "SELECT asociacion_id, nombre_asociacion, mision, ubicacion, logo_url 
            FROM ASOCIACIONES 
            WHERE nombre_asociacion LIKE :nombre 
            AND ubicacion LIKE :provincia 
            AND estado_aprobacion = 'Aprobada'";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':provincia', $provincia);
    $stmt->execute();

    // resultados
    $asociaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // datos en JSON
    echo json_encode($asociaciones);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al obtener asociaciones: ' . $e->getMessage()]);
}
?>
