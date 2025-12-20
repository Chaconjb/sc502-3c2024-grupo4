<?php
header('Content-Type: application/json; charset=utf-8');
include 'conexion.php';

$asociacion = $_GET['asociacion'] ?? '';
$anio = $_GET['anio'] ?? '';

try {
    $sql = "SELECT rt.*, a.nombre_asociacion 
            FROM reportes_transparencia rt 
            JOIN asociaciones a ON rt.asociacion_id = a.asociacion_id 
            WHERE 1=1";
    
    $params = [];

    if (!empty($asociacion) && $asociacion !== '') {
        $sql .= " AND a.nombre_asociacion = :aso";
        $params[':aso'] = $asociacion;
    }

    if (!empty($anio) && $anio !== '') {
        $sql .= " AND rt.año = :anio";
        $params[':anio'] = (int)$anio;
    }

    $sql .= " ORDER BY rt.fecha_publicacion DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Si no hay resultados, devolver array vacío
    if (!$resultados) {
        $resultados = [];
    }

    echo json_encode($resultados);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => "Error de SQL: " . $e->getMessage()]);
}
?>