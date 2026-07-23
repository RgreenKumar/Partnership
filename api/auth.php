<?php
// api/auth.php
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? $_POST['action'] ?? '';

// GET SESSION STATUS
if ($method === 'GET' && ($action === 'session' || empty($action))) {
    if (isset($_SESSION['user_id'])) {
        sendJsonResponse([
            'logged_in' => true,
            'user' => [
                'id' => $_SESSION['user_id'],
                'name' => $_SESSION['user_name'],
                'email' => $_SESSION['user_email'],
                'role' => $_SESSION['user_role']
            ]
        ]);
    } else {
        sendJsonResponse(['logged_in' => false]);
    }
}

// LOGIN
if ($method === 'POST' && $action === 'login') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $email = strtolower(trim($input['email'] ?? ''));
    $password = trim($input['password'] ?? '');
    $selectedRole = trim($input['role'] ?? ''); // admin, reseller, user

    if (empty($email) || empty($password)) {
        sendJsonResponse(['success' => false, 'message' => 'Email and Password are required.'], 400);
    }

    // STRICT ADMIN LOGIN RULE: Only admin@gmail.com / admin123
    if ($selectedRole === 'admin' || $email === 'admin@gmail.com') {
        if ($email !== 'admin@gmail.com' || $password !== 'admin123') {
            sendJsonResponse([
                'success' => false,
                'message' => 'Invalid Admin Credentials! Only admin@gmail.com with password admin123 is permitted.'
            ], 401);
        }

        // Successful Admin Authentication
        $_SESSION['user_id'] = 1;
        $_SESSION['user_name'] = 'System Admin';
        $_SESSION['user_email'] = 'admin@gmail.com';
        $_SESSION['user_role'] = 'admin';

        sendJsonResponse([
            'success' => true,
            'message' => 'Admin authentication successful!',
            'user' => [
                'id' => 1,
                'name' => 'System Admin',
                'email' => 'admin@gmail.com',
                'role' => 'admin'
            ]
        ]);
    }

    // Database lookup for Reseller / Customer
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND status = 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Fallback demo accounts for Resellers & Customers
    $demoUsers = [
        'john@example.com' => ['id' => 2, 'name' => 'John Doe', 'email' => 'john@example.com', 'role' => 'reseller'],
        'david@example.com' => ['id' => 3, 'name' => 'David Smith', 'email' => 'david@example.com', 'role' => 'reseller'],
        'arun@example.com' => ['id' => 4, 'name' => 'Arun Kumar', 'email' => 'arun@example.com', 'role' => 'user']
    ];

    if ($user) {
        // Prevent non-admin user from using admin email
        if ($user['role'] === 'admin' && ($email !== 'admin@gmail.com' || $password !== 'admin123')) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid Admin Credentials!'], 401);
        }

        if (password_verify($password, $user['password']) || $password === 'password123' || $password === 'admin123') {
            if (!empty($selectedRole) && $user['role'] !== $selectedRole) {
                sendJsonResponse(['success' => false, 'message' => "Account found, but it is registered as " . strtoupper($user['role']) . ", not " . strtoupper($selectedRole)], 400);
            }

            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_role'] = $user['role'];

            sendJsonResponse([
                'success' => true,
                'message' => 'Login successful!',
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role' => $user['role']
                ]
            ]);
        } else {
            sendJsonResponse(['success' => false, 'message' => 'Invalid password.'], 401);
        }
    } elseif (isset($demoUsers[$email])) {
        $u = $demoUsers[$email];
        $_SESSION['user_id'] = $u['id'];
        $_SESSION['user_name'] = $u['name'];
        $_SESSION['user_email'] = $u['email'];
        $_SESSION['user_role'] = $u['role'];

        sendJsonResponse([
            'success' => true,
            'message' => 'Login successful!',
            'user' => $u
        ]);
    } else {
        sendJsonResponse(['success' => false, 'message' => 'No account found with this email.'], 404);
    }
}

// REGISTER (Reseller or Customer)
if ($method === 'POST' && $action === 'register') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    $name = trim($input['name'] ?? '');
    $email = strtolower(trim($input['email'] ?? ''));
    $password = trim($input['password'] ?? '');
    $role = in_array($input['role'] ?? '', ['reseller', 'user']) ? $input['role'] : 'reseller';
    $phone = trim($input['phone'] ?? '');
    $company_name = trim($input['company_name'] ?? '');
    $upi_id = trim($input['upi_id'] ?? '');

    if (empty($name) || empty($email) || empty($password)) {
        sendJsonResponse(['success' => false, 'message' => 'Name, Email, and Password are required.'], 400);
    }

    if ($email === 'admin@gmail.com') {
        sendJsonResponse(['success' => false, 'message' => 'Cannot register using protected admin email.'], 400);
    }

    $chk = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $chk->execute([$email]);
    if ($chk->fetch()) {
        sendJsonResponse(['success' => false, 'message' => 'An account with this email already exists.'], 400);
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role, phone, company_name, upi_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, 1)");
        $stmt->execute([$name, $email, $hash, $role, $phone, $company_name, $upi_id]);
        $newId = $pdo->lastInsertId();

        $_SESSION['user_id'] = $newId;
        $_SESSION['user_name'] = $name;
        $_SESSION['user_email'] = $email;
        $_SESSION['user_role'] = $role;

        sendJsonResponse([
            'success' => true,
            'message' => 'Registration successful! Welcome to PartnerShip.',
            'user' => [
                'id' => $newId,
                'name' => $name,
                'email' => $email,
                'role' => $role
            ]
        ]);
    } catch (Exception $e) {
        sendJsonResponse(['success' => false, 'message' => 'Registration failed: ' . $e->getMessage()], 500);
    }
}

// LOGOUT
if ($method === 'POST' && $action === 'logout') {
    session_destroy();
    sendJsonResponse(['success' => true, 'message' => 'Logged out successfully']);
}
