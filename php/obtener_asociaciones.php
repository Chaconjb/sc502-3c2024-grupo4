<?php
header('Content-Type: application/json; charset=utf-8');
include 'conexion.php';

$nombre = $_GET['nombre'] ?? '';
$provincia = $_GET['provincia'] ?? '';

try {
    $sql = "SELECT * FROM asociaciones WHERE 1=1";
    $params = [];

    if (!empty($nombre)) {
        $sql .= " AND nombre_asociacion LIKE :nombre";
        $params[':nombre'] = "%$nombre%"; 
    }

    if (!empty($provincia) && $provincia !== 'Todas') {
        $sql .= " AND provincia = :provincia";
        $params[':provincia'] = $provincia;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($resultados);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>