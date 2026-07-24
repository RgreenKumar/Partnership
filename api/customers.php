<?php
// api/customers.php
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT u.id, u.name, u.email, u.phone, u.address, u.company_name, u.total_spent, u.status, u.created_at, u.referred_by_reseller_id,
                         r.name as reseller_name, r.referral_code as reseller_code,
                         COUNT(o.id) as total_subscriptions,
                         GROUP_CONCAT(DISTINCT p.name SEPARATOR ', ') as products_subscribed
                         FROM users u
                         LEFT JOIN users r ON u.referred_by_reseller_id = r.id
                         LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'approved'
                         LEFT JOIN products p ON o.product_id = p.id
                         WHERE u.role = 'user'
                         GROUP BY u.id
                         ORDER BY u.id DESC");
    $customers = $stmt->fetchAll();

    sendJsonResponse(['success' => true, 'customers' => $customers]);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $action = $_GET['action'] ?? $input['action'] ?? '';

    if ($action === 'delete') {
        $id = intval($input['id'] ?? $_GET['id'] ?? 0);
        if (!$id) {
            sendJsonResponse(['success' => false, 'message' => 'Customer ID required'], 400);
        }
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ? AND role = 'user'");
        $stmt->execute([$id]);
        sendJsonResponse(['success' => true, 'message' => 'Customer removed successfully']);
    }
}

if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if (!$id) {
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $id = intval($input['id'] ?? 0);
    }
    if (!$id) {
        sendJsonResponse(['success' => false, 'message' => 'Customer ID required'], 400);
    }
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ? AND role = 'user'");
    $stmt->execute([$id]);
    sendJsonResponse(['success' => true, 'message' => 'Customer removed successfully']);
}
