<?php
// api/orders.php
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? $_POST['action'] ?? '';

// GET Orders / Payment Requests / Subscriptions
if ($method === 'GET') {
    $role = $_GET['role'] ?? 'admin';
    $userId = $_GET['user_id'] ?? null;
    $status = $_GET['status'] ?? null;

    $sql = "SELECT o.*, u.name as user_name, u.email as user_email, u.phone as user_phone,
                   p.name as product_name, p.price as product_price, p.current_stock,
                   r.name as reseller_name, r.email as reseller_email
            FROM orders o
            JOIN users u ON o.user_id = u.id
            JOIN products p ON o.product_id = p.id
            LEFT JOIN users r ON o.reseller_id = r.id
            WHERE 1=1";
    $params = [];

    if ($role === 'user' && $userId) {
        $sql .= " AND o.user_id = ?";
        $params[] = $userId;
    } elseif ($role === 'reseller' && $userId) {
        $sql .= " AND o.reseller_id = ?";
        $params[] = $userId;
    }

    if ($status && $status !== 'all') {
        $sql .= " AND o.status = ?";
        $params[] = $status;
    }

    $sql .= " ORDER BY o.id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $orders = $stmt->fetchAll();

    sendJsonResponse(['success' => true, 'orders' => $orders]);
}

// CREATE ORDER (POST - Handles multipart/form-data for payment proof upload)
if ($method === 'POST' && ($action === 'create' || empty($action))) {
    $userId = intval($_POST['user_id'] ?? 4); // Default to demo user
    $productId = intval($_POST['product_id'] ?? 0);
    $resellerId = !empty($_POST['reseller_id']) ? intval($_POST['reseller_id']) : null;
    $amount = floatval($_POST['amount'] ?? 0);
    $paymentMethod = trim($_POST['payment_method'] ?? 'UPI (GPay)');
    $transactionId = trim($_POST['transaction_id'] ?? ('T' . time()));
    $remarks = trim($_POST['remarks'] ?? '');
    $billingCycle = trim($_POST['billing_cycle'] ?? 'Monthly');

    if (!$productId) {
        sendJsonResponse(['success' => false, 'message' => 'Product is required'], 400);
    }

    // Get product details if amount not passed
    $pStmt = $pdo->prepare("SELECT price FROM products WHERE id = ?");
    $pStmt->execute([$productId]);
    $prod = $pStmt->fetch();
    if (!$prod) {
        sendJsonResponse(['success' => false, 'message' => 'Invalid product'], 404);
    }

    if ($amount <= 0) {
        $amount = floatval($prod['price']);
    }

    // Handle File Upload (Supports All Images & PDFs)
    $paymentProofPath = 'uploads/proof_default.png';
    if (isset($_FILES['payment_proof']) && $_FILES['payment_proof']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/../uploads/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $ext = strtolower(pathinfo($_FILES['payment_proof']['name'], PATHINFO_EXTENSION));
        $allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'heic', 'tiff', 'pdf'];
        if (!in_array($ext, $allowedExts)) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid file format. Allowed formats: JPG, PNG, WEBP, GIF, PDF.'], 400);
        }

        $filename = 'proof_' . time() . '_' . rand(1000, 9999) . '.' . ($ext ?: 'jpg');
        $targetFile = $uploadDir . $filename;
        if (move_uploaded_file($_FILES['payment_proof']['tmp_name'], $targetFile)) {
            $paymentProofPath = 'uploads/' . $filename;
        }
    }


    // Check user's referred_by_reseller_id if resellerId is not provided
    if (!$resellerId) {
        $uStmt = $pdo->prepare("SELECT referred_by_reseller_id FROM users WHERE id = ?");
        $uStmt->execute([$userId]);
        $uRow = $uStmt->fetch();
        if ($uRow && !empty($uRow['referred_by_reseller_id'])) {
            $resellerId = intval($uRow['referred_by_reseller_id']);
        }
    }

    $orderCode = 'ORD' . rand(100, 999);
    $startDate = date('Y-m-d');
    $nextBillingDate = date('Y-m-d', strtotime('+1 month'));

    $stmt = $pdo->prepare("INSERT INTO orders 
        (order_code, user_id, product_id, reseller_id, amount, payment_method, transaction_id, payment_proof, status, billing_cycle, start_date, next_billing_date, remarks) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)");
    
    $stmt->execute([
        $orderCode, $userId, $productId, $resellerId, $amount, 
        $paymentMethod, $transactionId, $paymentProofPath, 
        $billingCycle, $startDate, $nextBillingDate, $remarks
    ]);

    $orderId = $pdo->lastInsertId();

    // Sync to payment_requests table
    try {
        $prStmt = $pdo->prepare("INSERT INTO payment_requests (order_id, user_id, product_id, amount, transaction_id, payment_proof, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')");
        $prStmt->execute([$orderId, $userId, $productId, $amount, $transactionId, $paymentProofPath]);
    } catch (Exception $e) {}

    // Log action
    $logStmt = $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description) VALUES (?, 'order_created', ?)");
    $logStmt->execute([$userId, "Created purchase request #$orderCode for product ID $productId (Amount: ₹$amount)"]);

    sendJsonResponse([
        'success' => true, 
        'message' => 'Payment details submitted successfully! Pending verification.',
        'order_id' => $orderId,
        'order_code' => $orderCode
    ]);
}

// APPROVE ORDER (STRICT MySQL ACID TRANSACTION)
if ($method === 'POST' && $action === 'approve') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $orderId = intval($input['order_id'] ?? 0);
    $adminId = intval($input['admin_id'] ?? 1);
    $requestedQty = intval($input['quantity'] ?? 1);

    if (!$orderId) {
        sendJsonResponse(['success' => false, 'message' => 'Order ID is required'], 400);
    }

    try {
        // 1. BEGIN TRANSACTION
        $pdo->beginTransaction();

        // Fetch Order details
        $stmt = $pdo->prepare("SELECT o.*, p.current_stock, p.subscribers_count, p.revenue, p.name as product_name
                               FROM orders o 
                               JOIN products p ON o.product_id = p.id 
                               WHERE o.id = ? FOR UPDATE");
        $stmt->execute([$orderId]);
        $order = $stmt->fetch();

        if (!$order) {
            $pdo->rollBack();
            sendJsonResponse(['success' => false, 'message' => 'Order not found'], 404);
        }

        if ($order['status'] === 'approved') {
            $pdo->rollBack();
            sendJsonResponse(['success' => false, 'message' => 'Order is already approved'], 400);
        }

        // 2. VERIFY STOCK
        if ($order['current_stock'] < $requestedQty) {
            $pdo->rollBack();
            sendJsonResponse([
                'success' => false, 
                'message' => "Insufficient stock! Current stock is {$order['current_stock']}, but requested quantity is {$requestedQty}."
            ], 400);
        }

        // 3. UPDATE ORDER STATUS
        $startDate = date('Y-m-d');
        $nextBillingDate = date('Y-m-d', strtotime('+1 month'));

        $updateOrder = $pdo->prepare("UPDATE orders SET status = 'approved', start_date = ?, next_billing_date = ? WHERE id = ?");
        $updateOrder->execute([$startDate, $nextBillingDate, $orderId]);

        // Sync payment_requests table
        $pdo->prepare("UPDATE payment_requests SET status = 'approved' WHERE order_id = ?")->execute([$orderId]);

        // Insert into purchases table
        $purStmt = $pdo->prepare("INSERT INTO purchases (order_id, user_id, product_id, reseller_id, amount, status) VALUES (?, ?, ?, ?, ?, 'Approved')");
        $purStmt->execute([$orderId, $order['user_id'], $order['product_id'], $order['reseller_id'], $order['amount']]);

        // 4. DEDUCT STOCK & UPDATE PRODUCT REVENUE/SUBSCRIBERS
        $newStock = $order['current_stock'] - $requestedQty;
        $newSubs = $order['subscribers_count'] + 1;
        $newRev = floatval($order['revenue']) + floatval($order['amount']);

        $updateProduct = $pdo->prepare("UPDATE products SET current_stock = ?, subscribers_count = ?, revenue = ? WHERE id = ?");
        $updateProduct->execute([$newStock, $newSubs, $newRev, $order['product_id']]);

        // 5. CALCULATE COMMISSION & UPDATE RESELLER
        $commissionEarned = 0.00;
        if (!empty($order['reseller_id'])) {
            $resellerId = intval($order['reseller_id']);

            // Fetch reseller's current items sold and commission_rate
            $rStmt = $pdo->prepare("SELECT total_items_sold, COALESCE(commission_rate, 10.00) as commission_rate FROM users WHERE id = ? FOR UPDATE");
            $rStmt->execute([$resellerId]);
            $reseller = $rStmt->fetch();

            $currentSold = intval($reseller['total_items_sold'] ?? 0);
            $commissionRate = floatval($reseller['commission_rate'] ?? 10.00);
            $commissionEarned = round(($order['amount'] * $commissionRate) / 100, 2);


            // Update order's commission_earned
            $pdo->prepare("UPDATE orders SET commission_earned = ? WHERE id = ?")
                ->execute([$commissionEarned, $orderId]);

            // Update reseller's total_items_sold
            $newSold = $currentSold + $requestedQty;
            $pdo->prepare("UPDATE users SET total_items_sold = ? WHERE id = ?")
                ->execute([$newSold, $resellerId]);

            // Insert into commissions table
            $cStmt = $pdo->prepare("INSERT INTO commissions (order_id, reseller_id, sale_amount, commission_amount, commission_rate, status) VALUES (?, ?, ?, ?, ?, 'paid')");
            $cStmt->execute([$orderId, $resellerId, $order['amount'], $commissionEarned, $commissionRate]);
        }

        // Update user total_spent
        $pdo->prepare("UPDATE users SET total_spent = total_spent + ? WHERE id = ?")
            ->execute([$order['amount'], $order['user_id']]);

        // 6. INSERT ACTIVITY LOG RECORD
        $logStmt = $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description) VALUES (?, 'order_approved', ?)");
        $logStmt->execute([
            $adminId, 
            "Approved order #{$order['order_code']} for {$order['product_name']}. Deducted {$requestedQty} stock (Remaining: {$newStock}). Commission: ₹{$commissionEarned}."
        ]);

        // 7. COMMIT TRANSACTION
        $pdo->commit();

        sendJsonResponse([
            'success' => true,
            'message' => 'Payment approved successfully! Purchase activated.',
            'order_id' => $orderId,
            'remaining_stock' => $newStock,
            'commission_earned' => $commissionEarned
        ]);

    } catch (Exception $e) {
        $pdo->rollBack();
        sendJsonResponse([
            'success' => false,
            'message' => 'Transaction failed during order approval: ' . $e->getMessage()
        ], 500);
    }
}

// REJECT ORDER
if ($method === 'POST' && $action === 'reject') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $orderId = intval($input['order_id'] ?? 0);
    $adminId = intval($input['admin_id'] ?? 1);
    $reason = trim($input['rejection_reason'] ?? 'Payment proof could not be verified.');

    if (!$orderId) {
        sendJsonResponse(['success' => false, 'message' => 'Order ID is required'], 400);
    }

    $stmt = $pdo->prepare("UPDATE orders SET status = 'rejected', rejection_reason = ? WHERE id = ?");
    $stmt->execute([$reason, $orderId]);

    // Sync payment_requests table
    try {
        $pdo->prepare("UPDATE payment_requests SET status = 'rejected', rejection_reason = ? WHERE order_id = ?")->execute([$reason, $orderId]);
    } catch (Exception $e) {}

    // Log Activity
    $logStmt = $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, description) VALUES (?, 'order_rejected', ?)");
    $logStmt->execute([$adminId, "Rejected order #$orderId. Reason: $reason"]);

    sendJsonResponse([
        'success' => true,
        'message' => 'Payment request has been rejected.',
        'order_id' => $orderId
    ]);
}

