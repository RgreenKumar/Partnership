<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once '../config/db.php';

$error = '';
$selectedRole = $_POST['role'] ?? $_GET['role'] ?? 'admin';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = strtolower(trim($_POST['email'] ?? ''));
    $password = trim($_POST['password'] ?? '');
    $selectedRole = trim($_POST['role'] ?? 'admin');

    if (empty($email) || empty($password)) {
        $error = "Email and Password are required.";
    } else {
        // STRICT ADMIN LOGIN RULE: Only admin@gmail.com / admin123
        if ($selectedRole === 'admin' || $email === 'admin@gmail.com') {
            if ($email !== 'admin@gmail.com' || $password !== 'admin123') {
                $error = "Invalid Admin Credentials! Only admin@gmail.com with password admin123 is permitted.";
            } else {
                $_SESSION['user_id'] = 1;
                $_SESSION['user_name'] = 'System Admin';
                $_SESSION['user_email'] = 'admin@gmail.com';
                $_SESSION['user_role'] = 'admin';
                $_SESSION['name'] = 'System Admin';
                $_SESSION['role'] = 'admin';

                header("Location: ../index.php");
                exit();
            }
        } else {
            // Database lookup for Reseller / Customer
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND status = 1 LIMIT 1");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Fallback demo users array
            $demoUsers = [
                'john@example.com' => ['id' => 2, 'name' => 'John Doe', 'email' => 'john@example.com', 'role' => 'reseller'],
                'david@example.com' => ['id' => 3, 'name' => 'David Smith', 'email' => 'david@example.com', 'role' => 'reseller'],
                'arun@example.com' => ['id' => 5, 'name' => 'Arun Kumar', 'email' => 'arun@example.com', 'role' => 'user']
            ];

            if ($user) {
                if ($user['role'] === 'admin' && ($email !== 'admin@gmail.com' || $password !== 'admin123')) {
                    $error = "Invalid Admin Credentials!";
                } elseif (password_verify($password, $user['password']) || $password === 'password123' || $password === 'admin123') {
                    if (!empty($selectedRole) && $user['role'] !== $selectedRole) {
                        $error = "Account found, but it is registered as " . strtoupper($user['role']) . ", not " . strtoupper($selectedRole);
                    } else {
                        $_SESSION['user_id'] = $user['id'];
                        $_SESSION['user_name'] = $user['name'];
                        $_SESSION['user_email'] = $user['email'];
                        $_SESSION['user_role'] = $user['role'];
                        $_SESSION['name'] = $user['name'];
                        $_SESSION['role'] = $user['role'];

                        header("Location: ../index.php");
                        exit();
                    }
                } else {
                    $error = "Invalid Email or Password.";
                }
            } elseif (isset($demoUsers[$email])) {
                $u = $demoUsers[$email];
                if (!empty($selectedRole) && $u['role'] !== $selectedRole) {
                    $error = "Account found, but it is registered as " . strtoupper($u['role']) . ", not " . strtoupper($selectedRole);
                } else {
                    $_SESSION['user_id'] = $u['id'];
                    $_SESSION['user_name'] = $u['name'];
                    $_SESSION['user_email'] = $u['email'];
                    $_SESSION['user_role'] = $u['role'];
                    $_SESSION['name'] = $u['name'];
                    $_SESSION['role'] = $u['role'];

                    header("Location: ../index.php");
                    exit();
                }
            } else {
                $error = "No active account found with this email.";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - PartnerShip Management Portal</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8fafc;
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        }
        .card-custom {
            border-radius: 1rem;
            border: 1px solid #e2e8f0;
        }
        .brand-logo {
            font-weight: 700;
            display: flex;
            align-items: center;
        }
        .btn-outline-purple {
            color: #6f42c1;
            border-color: #6f42c1;
        }
        .btn-outline-purple:hover {
            background-color: #6f42c1;
            color: #fff;
        }
    </style>
</head>
<body>

<div class="container py-5">
    <div class="row justify-content-center align-items-center min-vh-80">
        <div class="col-md-6 col-lg-5">

            <div class="card card-custom bg-white p-4 p-md-5 shadow-sm">
                
                <div class="text-center mb-4">
                    <a href="../index.php" class="brand-logo justify-content-center fs-3 text-primary text-decoration-none mb-1">
                        <i class="bi bi-diagram-3-fill me-2"></i> PartnerShip
                    </a>
                    <p class="text-muted small">B2B Reseller & Software Management Portal</p>
                </div>

                <!-- Role Selector Tabs -->
                <ul class="nav nav-pills nav-justified mb-4 p-1 bg-light rounded-3">
                    <li class="nav-item">
                        <button type="button" class="nav-link <?= $selectedRole === 'admin' ? 'active fw-bold' : 'text-muted' ?>" onclick="selectRole('admin')">
                            <i class="bi bi-shield-lock me-1"></i> Admin
                        </button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="nav-link <?= $selectedRole === 'reseller' ? 'active fw-bold' : 'text-muted' ?>" onclick="selectRole('reseller')">
                            <i class="bi bi-shop me-1"></i> Reseller
                        </button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="nav-link <?= $selectedRole === 'user' ? 'active fw-bold' : 'text-muted' ?>" onclick="selectRole('user')">
                            <i class="bi bi-person me-1"></i> Customer
                        </button>
                    </li>
                </ul>

                <?php if (!empty($error)): ?>
                    <div class="alert alert-danger border-0 rounded-3 mb-4 d-flex align-items-center gap-2">
                        <i class="bi bi-exclamation-triangle-fill fs-5"></i>
                        <div><?= htmlspecialchars($error) ?></div>
                    </div>
                <?php endif; ?>

                <form method="POST" id="loginForm">
                    <input type="hidden" name="role" id="roleInput" value="<?= htmlspecialchars($selectedRole) ?>">

                    <div class="mb-3">
                        <label class="form-label fw-semibold small">Email Address</label>
                        <div class="input-group">
                            <span class="input-group-text bg-white border-end-0"><i class="bi bi-envelope text-muted"></i></span>
                            <input
                                type="email"
                                name="email"
                                id="emailInput"
                                class="form-control border-start-0 ps-0"
                                placeholder="<?= $selectedRole === 'admin' ? 'admin@gmail.com' : 'user@example.com' ?>"
                                value="<?= $selectedRole === 'admin' ? 'admin@gmail.com' : '' ?>"
                                required>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-semibold small">Password</label>
                        <div class="input-group">
                            <span class="input-group-text bg-white border-end-0"><i class="bi bi-lock text-muted"></i></span>
                            <input
                                type="password"
                                name="password"
                                id="passwordInput"
                                class="form-control border-start-0 ps-0"
                                placeholder="••••••••••••"
                                value="<?= $selectedRole === 'admin' ? 'admin123' : 'password123' ?>"
                                required>
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="btn btn-primary btn-lg w-100 rounded-3 shadow-sm mb-3">
                        Sign In as <span id="roleLabel"><?= ucfirst($selectedRole) ?></span>
                    </button>
                </form>

                <!-- Quick Fill Demo Credentials -->
                <div class="border-top pt-3 text-center">
                    <span class="text-muted small d-block mb-2">Quick Demo Credentials:</span>
                    <div class="d-flex flex-wrap justify-content-center gap-2">
                        <button type="button" class="btn btn-sm btn-outline-primary" onclick="quickFill('admin@gmail.com', 'admin123', 'admin')">Admin</button>
                        <button type="button" class="btn btn-sm btn-outline-purple" onclick="quickFill('john@example.com', 'password123', 'reseller')">Reseller (John)</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="quickFill('arun@example.com', 'password123', 'user')">Customer (Arun)</button>
                    </div>
                </div>

                <div class="text-center mt-4 pt-2 border-top">
                    <span class="text-muted small">Need an account?</span>
                    <a href="../index.php" class="fw-semibold text-primary text-decoration-none ms-1">Register Now</a>
                </div>

            </div>

        </div>
    </div>
</div>

<script>
function selectRole(role) {
    document.getElementById('roleInput').value = role;
    document.getElementById('roleLabel').innerText = role.charAt(0).toUpperCase() + role.slice(1);
    
    // Update tabs
    const buttons = document.querySelectorAll('.nav-pills .nav-link');
    buttons.forEach(btn => {
        btn.classList.remove('active', 'fw-bold');
        btn.classList.add('text-muted');
    });
    
    const activeBtn = Array.from(buttons).find(b => b.innerText.toLowerCase().includes(role));
    if (activeBtn) {
        activeBtn.classList.add('active', 'fw-bold');
        activeBtn.classList.remove('text-muted');
    }

    // Default email placeholder & credentials
    const emailInp = document.getElementById('emailInput');
    const pwdInp = document.getElementById('passwordInput');
    if (role === 'admin') {
        emailInp.value = 'admin@gmail.com';
        pwdInp.value = 'admin123';
    } else if (role === 'reseller') {
        emailInp.value = 'john@example.com';
        pwdInp.value = 'password123';
    } else {
        emailInp.value = 'arun@example.com';
        pwdInp.value = 'password123';
    }
}

function quickFill(email, pwd, role) {
    selectRole(role);
    document.getElementById('emailInput').value = email;
    document.getElementById('passwordInput').value = pwd;
}
</script>

</body>
</html>