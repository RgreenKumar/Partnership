<?php
// api/customers.php
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT u.id, u.name, u.email, u.phone, u.company_name, u.total_spent, u.status, u.created_at,
                         COUNT(o.id) as total_subscriptions,
                         GROUP_CONCAT(DISTINCT p.name SEPARATOR ', ') as products_subscribed
                         FROM users u
                         LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'approved'
                         LEFT JOIN products p ON o.product_id = p.id
                         WHERE u.role = 'user'
                         GROUP BY u.id
                         ORDER BY u.id DESC");
    $customers = $stmt->fetchAll();

    sendJsonResponse(['success' => true, 'customers' => $customers]);
}
