<?php
// api/products.php
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$id]);
        $product = $stmt->fetch();
        if ($product) {
            $product['low_stock'] = ($product['current_stock'] <= 5);
            sendJsonResponse(['success' => true, 'product' => $product]);
        } else {
            sendJsonResponse(['success' => false, 'message' => 'Product not found'], 404);
        }
    } else {
        $stmt = $pdo->query("SELECT * FROM products ORDER BY id DESC");
        $products = $stmt->fetchAll();
        foreach ($products as &$p) {
            $p['low_stock'] = ($p['current_stock'] <= 5);
        }
        sendJsonResponse(['success' => true, 'products' => $products]);
    }
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    
    $name = trim($input['name'] ?? '');
    $category = trim($input['category'] ?? 'Business Software');
    $description = trim($input['description'] ?? '');
    $price = floatval($input['price'] ?? 0);
    $cost_price = floatval($input['cost_price'] ?? 0);
    $current_stock = intval($input['current_stock'] ?? 10);
    $status = $input['status'] ?? 'active';

    if (empty($name) || $price <= 0) {
        sendJsonResponse(['success' => false, 'message' => 'Product name and valid price are required'], 400);
    }

    $stmt = $pdo->prepare("INSERT INTO products (name, category, description, cost_price, price, current_stock, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$name, $category, $description, $cost_price, $price, $current_stock, $status]);

    sendJsonResponse(['success' => true, 'message' => 'Product created successfully', 'product_id' => $pdo->lastInsertId()]);
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? null;

    if (!$id) {
        sendJsonResponse(['success' => false, 'message' => 'Product ID is required'], 400);
    }

    $stmt = $pdo->prepare("UPDATE products SET name=?, category=?, description=?, price=?, cost_price=?, current_stock=?, status=? WHERE id=?");
    $stmt->execute([
        $input['name'],
        $input['category'] ?? 'Business Software',
        $input['description'] ?? '',
        floatval($input['price']),
        floatval($input['cost_price'] ?? 0),
        intval($input['current_stock'] ?? 10),
        $input['status'] ?? 'active',
        $id
    ]);

    sendJsonResponse(['success' => true, 'message' => 'Product updated successfully']);
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        sendJsonResponse(['success' => false, 'message' => 'Product ID required'], 400);
    }
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);
    sendJsonResponse(['success' => true, 'message' => 'Product deleted successfully']);
}
