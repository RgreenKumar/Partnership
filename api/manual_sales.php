<?php
// api/manual_sales.php
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT ms.*, u.name as customer_name, u.email as customer_email,
                         p.name as product_name, p.price as product_price,
                         r.name as reseller_name
                         FROM manual_sales ms
                         JOIN users u ON ms.customer_id = u.id
                         JOIN products p ON ms.product_id = p.id
                         LEFT JOIN users r ON ms.reseller_id = r.id
                         ORDER BY ms.id DESC");
    $sales = $stmt->fetchAll();
    sendJsonResponse(['success' => true, 'manual_sales' => $sales]);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    
    $adminId = intval($input['admin_id'] ?? $_SESSION['user_id'] ?? 1);
    $customerId = intval($input['customer_id'] ?? 0);
    $productId = intval($input['product_id'] ?? 0);
    $resellerId = !empty($input['reseller_id']) ? intval($input['reseller_id']) : null;
    $amount = floatval($input['amount'] ?? 0);
    $paymentMethod = trim($input['payment_method'] ?? 'Cash / Offline');
    $notes = trim($input['notes'] ?? 'Manual sale entry by Admin');

    if (!$customerId || !$productId || $amount <= 0) {
        sendJsonResponse(['success' => false, 'message' => 'Customer, Product, and Valid Amount are required'], 400);
    }

    try {
        $pdo->beginTransaction();

        // Insert into manual_sales
        $stmt = $pdo->prepare("INSERT INTO manual_sales (admin_id, customer_id, product_id, reseller_id, amount, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$adminId, $customerId, $productId, $resellerId, $amount, $paymentMethod, $notes]);
        $manualSaleId = $pdo->lastInsertId();

        // Create an approved Order record
        $orderCode = 'MS' . rand(100, 999);
        $oStmt = $pdo->prepare("INSERT INTO orders (order_code, user_id, product_id, reseller_id, amount, payment_method, status, start_date, remarks) VALUES (?, ?, ?, ?, ?, ?, 'approved', CURDATE(), ?)");
        $oStmt->execute([$orderCode, $customerId, $productId, $resellerId, $amount, $paymentMethod, $notes]);
        $orderId = $pdo->lastInsertId();

        // Insert into purchases
        $purStmt = $pdo->prepare("INSERT INTO purchases (order_id, user_id, product_id, reseller_id, amount, status) VALUES (?, ?, ?, ?, ?, 'Approved')");
        $purStmt->execute([$orderId, $customerId, $productId, $resellerId, $amount]);

        // Deduct stock & update product stats
        $pdo->prepare("UPDATE products SET current_stock = GREATEST(0, current_stock - 1), subscribers_count = subscribers_count + 1, revenue = revenue + ? WHERE id = ?")
            ->execute([$amount, $productId]);

        // Update customer total_spent
        $pdo->prepare("UPDATE users SET total_spent = total_spent + ? WHERE id = ?")
            ->execute([$amount, $customerId]);

        // Record reseller credit if resellerId exists
        if ($resellerId) {
            $rStmt = $pdo->prepare("SELECT total_items_sold, COALESCE(commission_rate, 10.00) as commission_rate FROM users WHERE id = ?");
            $rStmt->execute([$resellerId]);
            $reseller = $rStmt->fetch();
            $currentSold = intval($reseller['total_items_sold'] ?? 0);
            $commissionRate = floatval($reseller['commission_rate'] ?? 10.00);
            $commissionEarned = round(($amount * $commissionRate) / 100, 2);

            $pdo->prepare("UPDATE users SET total_items_sold = total_items_sold + 1 WHERE id = ?")->execute([$resellerId]);
            $pdo->prepare("INSERT INTO commissions (order_id, reseller_id, sale_amount, commission_amount, commission_rate, status) VALUES (?, ?, ?, ?, ?, 'paid')")
                ->execute([$orderId, $resellerId, $amount, $commissionEarned, $commissionRate]);
        }


        // Log Activity
        $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description) VALUES (?, 'manual_sale_created', ?)")
            ->execute([$adminId, "Created manual offline sale #$orderCode for customer ID $customerId, amount ₹$amount"]);

        $pdo->commit();

        sendJsonResponse([
            'success' => true,
            'message' => 'Manual offline sale recorded successfully!',
            'manual_sale_id' => $manualSaleId,
            'order_code' => $orderCode
        ]);
    } catch (Exception $e) {
        $pdo->rollBack();
        sendJsonResponse(['success' => false, 'message' => 'Failed to record manual sale: ' . $e->getMessage()], 500);
    }
}
