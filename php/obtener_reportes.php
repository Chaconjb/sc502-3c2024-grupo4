<?php
header('Content-Type: application/json');
require_once 'conexion.php';

try {
    // Validar ID de la asociación
    if (!isset($_GET['asociacion_id'])) {
        echo json_encode(['error' => 'ID de asociación no proporcionado']);
        exit;
    }

    $asociacion_id = $_GET['asociacion_id'];
    $anio = isset($_GET['anio']) ? $_GET['anio'] : date('Y');

    // Esta consulta busca campañas o reportes 
    $sql = "SELECT r.titulo, r.descripcion, r.monto_recaudado, r.monto_utilizado, 
                   r.fecha_publicacion, r.detalles_uso
            FROM REPORTES_TRANSPARENCIA r
            WHERE r.asociacion_id = :asoc_id 
            AND EXTRACT(YEAR FROM r.fecha_publicacion) = :anio
            ORDER BY r.fecha_publicacion DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':asoc_id', $asociacion_id);
    $stmt->bindParam(':anio', $anio);
    $stmt->execute();

    $reportes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Si no hay reportes, devolvemos un array vacío
    echo json_encode($reportes);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al cargar reportes: ' . $e->getMessage()]);
}
?>
