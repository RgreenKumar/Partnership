<?php
// api/commissions.php
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $resellerId = $_GET['reseller_id'] ?? null;

    $sql = "SELECT c.*, o.order_code, p.name as product_name, r.name as reseller_name, u.name as customer_name
            FROM commissions c
            JOIN orders o ON c.order_id = o.id
            JOIN products p ON o.product_id = p.id
            JOIN users r ON c.reseller_id = r.id
            JOIN users u ON o.user_id = u.id";
    $params = [];

    if ($resellerId) {
        $sql .= " WHERE c.reseller_id = ?";
        $params[] = $resellerId;
    }

    $sql .= " ORDER BY c.id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $commissions = $stmt->fetchAll();

    // Calculate totals
    $totalsStmt = $pdo->query("SELECT 
        COALESCE(SUM(commission_amount), 0) as total_commission,
        COALESCE(SUM(CASE WHEN status = 'paid' THEN commission_amount ELSE 0 END), 0) as paid_commission,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN commission_amount ELSE 0 END), 0) as pending_commission
        FROM commissions");
    $totals = $totalsStmt->fetch();

    sendJsonResponse(['success' => true, 'commissions' => $commissions, 'totals' => $totals]);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $id = intval($input['id'] ?? 0);
    $status = $input['status'] ?? 'paid';

    if (!$id) {
        sendJsonResponse(['success' => false, 'message' => 'Commission ID required'], 400);
    }

    $stmt = $pdo->prepare("UPDATE commissions SET status = ? WHERE id = ?");
    $stmt->execute([$status, $id]);

    sendJsonResponse(['success' => true, 'message' => "Commission status updated to $status"]);
}
