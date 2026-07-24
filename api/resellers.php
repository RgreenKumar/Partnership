<?php
// api/resellers.php
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT u.id, u.name, u.email, u.phone, u.company_name, u.upi_id, u.referral_code, COALESCE(u.commission_rate, 10.00) as commission_rate, u.total_items_sold, u.status, u.created_at,
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
    $action = $_GET['action'] ?? $input['action'] ?? '';

    if ($action === 'delete') {
        $id = intval($input['id'] ?? $_GET['id'] ?? 0);
        if (!$id) {
            sendJsonResponse(['success' => false, 'message' => 'Reseller ID required'], 400);
        }
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ? AND role = 'reseller'");
        $stmt->execute([$id]);
        sendJsonResponse(['success' => true, 'message' => 'Reseller removed successfully']);
    }
    
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $company_name = trim($input['company_name'] ?? '');
    $upi_id = trim($input['upi_id'] ?? '');
    $referral_code = strtoupper(trim($input['referral_code'] ?? ''));
    $commission_rate = floatval($input['commission_rate'] ?? 10.00);

    if (empty($name) || empty($email)) {
        sendJsonResponse(['success' => false, 'message' => 'Name and Email are required'], 400);
    }

    if (empty($referral_code)) {
        $refCountStmt = $pdo->query("SELECT COUNT(*) FROM users WHERE role = 'reseller'");
        $count = $refCountStmt->fetchColumn() + 1;
        $referral_code = 'REF' . str_pad($count, 3, '0', STR_PAD_LEFT);
    }

    if ($commission_rate <= 0) {
        $commission_rate = 10.00;
    }

    $password = trim($input['password'] ?? '');
    if (empty($password)) {
        $password = 'password123';
    }
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role, phone, company_name, upi_id, referral_code, commission_rate, status) VALUES (?, ?, ?, 'reseller', ?, ?, ?, ?, ?, 1)");
        $stmt->execute([$name, $email, $passwordHash, $phone, $company_name, $upi_id, $referral_code, $commission_rate]);


        sendJsonResponse([
            'success' => true, 
            'message' => "Reseller added successfully with Referral Code $referral_code ($commission_rate% commission)!", 
            'reseller_id' => $pdo->lastInsertId(),
            'referral_code' => $referral_code,
            'commission_rate' => $commission_rate
        ]);
    } catch (PDOException $e) {
        sendJsonResponse(['success' => false, 'message' => 'Email or Referral Code already exists'], 400);
    }
}


if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if (!$id) {
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $id = intval($input['id'] ?? 0);
    }
    if (!$id) {
        sendJsonResponse(['success' => false, 'message' => 'Reseller ID required'], 400);
    }
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ? AND role = 'reseller'");
    $stmt->execute([$id]);
    sendJsonResponse(['success' => true, 'message' => 'Reseller removed successfully']);
}


