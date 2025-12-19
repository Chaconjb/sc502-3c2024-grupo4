<?php
header('Content-Type: application/json; charset=utf-8');
include 'conexion.php';

$asociacion = $_GET['asociacion'] ?? '';
$anio = $_GET['anio'] ?? '';

try {
    $sql = "SELECT r.*, a.nombre_asociacion 
            FROM reportes_transparencia r 
            JOIN asociaciones a ON r.asociacion_id = a.asociacion_id 
            WHERE 1=1";
    
    $params = [];

    if (!empty($asociacion) && $asociacion !== 'Todas') {
        $sql .= " AND a.nombre_asociacion = :aso";
        $params[':aso'] = $asociacion;
    }

    if (!empty($anio) && $anio !== 'Todos') {
        $sql .= " AND r.año = :anio";
        $params[':anio'] = $anio;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    ob_clean(); 
    echo json_encode($resultados);

} catch (PDOException $e) {
    echo json_encode(['error' => "Error de SQL: " . $e->getMessage()]);
}
?>