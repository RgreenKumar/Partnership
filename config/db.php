<?php
// config/db.php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$host = '127.0.0.1';
$db   = 'partnership';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // Auto-migrate schema updates for existing database instances
    try {
        $cols = $pdo->query("SHOW COLUMNS FROM users")->fetchAll(PDO::FETCH_COLUMN);
        if (!in_array('address', $cols)) {
            $pdo->exec("ALTER TABLE users ADD COLUMN address TEXT NULL AFTER phone");
        }
        if (!in_array('referral_code', $cols)) {
            $pdo->exec("ALTER TABLE users ADD COLUMN referral_code VARCHAR(50) UNIQUE NULL AFTER upi_id");
        }
        if (!in_array('commission_rate', $cols)) {
            $pdo->exec("ALTER TABLE users ADD COLUMN commission_rate DECIMAL(5,2) DEFAULT 10.00 AFTER referral_code");
        }
        if (!in_array('referred_by_reseller_id', $cols)) {
            $pdo->exec("ALTER TABLE users ADD COLUMN referred_by_reseller_id INT NULL AFTER commission_rate");
        }

    } catch (Exception $ex) {}

} catch (\PDOException $e) {
    // If database connection fails, send JSON error or throw
    if (strpos($_SERVER['REQUEST_URI'] ?? '', '/api/') !== false) {
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Database connection failed: ' . $e->getMessage()
        ]);
        exit;
    } else {
        die("Database connection error: " . $e->getMessage());
    }
}


function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function getSystemSettings($pdo) {
    try {
        $stmt = $pdo->query("SELECT setting_key, setting_value FROM settings");
        $rows = $stmt->fetchAll();
        $settings = [];
        foreach ($rows as $row) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }
        return $settings;
    } catch (Exception $e) {
        return [];
    }
}