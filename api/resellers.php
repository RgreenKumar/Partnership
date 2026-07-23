<?php
// api/resellers.php
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT u.id, u.name, u.email, u.phone, u.company_name, u.upi_id, u.total_items_sold, u.status, u.created_at,
                         COUNT(DISTINCT o.user_id) as total_customers,
                         COALESCE(SUM(c.sale_amount), 0) as total_sales,
                         COALESCE(SUM(c.commission_amount), 0) as commission_earned
                         FROM users u
                         LEFT JOIN orders o ON u.id = o.reseller_id
                         LEFT JOIN commissions c ON u.id = c.reseller_id
                         WHERE u.role = 'reseller'
                         GROUP BY u.id
                         ORDER BY u.id DESC");
    $resellers = $stmt->fetchAll();

    sendJsonResponse(['success' => true, 'resellers' => $resellers]);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $company_name = trim($input['company_name'] ?? '');
    $upi_id = trim($input['upi_id'] ?? '');

    if (empty($name) || empty($email)) {
        sendJsonResponse(['success' => false, 'message' => 'Name and Email are required'], 400);
    }

    $passwordHash = password_hash('password123', PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role, phone, company_name, upi_id, status) VALUES (?, ?, ?, 'reseller', ?, ?, ?, 1)");
        $stmt->execute([$name, $email, $passwordHash, $phone, $company_name, $upi_id]);

        sendJsonResponse(['success' => true, 'message' => 'Reseller added successfully!', 'reseller_id' => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        sendJsonResponse(['success' => false, 'message' => 'Email already exists or invalid data'], 400);
    }
}
