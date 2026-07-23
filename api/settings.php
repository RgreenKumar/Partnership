<?php
// api/settings.php
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $settings = getSystemSettings($pdo);
    sendJsonResponse(['success' => true, 'settings' => $settings]);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    
    foreach ($input as $key => $val) {
        $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
        $stmt->execute([$key, strval($val)]);
    }

    sendJsonResponse(['success' => true, 'message' => 'Settings saved successfully!']);
}
