<?php

session_start();
require '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = trim($_POST['email']);
    $password = $_POST['password'];

    $stmt = $pdo->prepare(
        "SELECT * FROM users WHERE email = ? LIMIT 1"
    );

    $stmt->execute([$email]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['name'] = $user['name'];

        switch ($user['role']) {

            case 'admin':
                header("Location: ../admin/dashboard.php");
                break;

            case 'reseller':
                header("Location: ../reseller/dashboard.php");
                break;

            default:
                header("Location: ../user/dashboard.php");
                break;
        }

        exit();
    }

    $error = "Invalid Email or Password";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login - Partnership</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">

    <div class="row justify-content-center">

        <div class="col-md-4">

            <div class="card shadow">

                <div class="card-body">

                    <h3 class="text-center mb-4">Partnership Login</h3>

                    <?php if(isset($error)): ?>
                        <div class="alert alert-danger">
                            <?= $error ?>
                        </div>
                    <?php endif; ?>

                    <form method="POST">

                        <input
                            type="email"
                            name="email"
                            class="form-control mb-3"
                            placeholder="Email"
                            required>

                        <input
                            type="password"
                            name="password"
                            class="form-control mb-3"
                            placeholder="Password"
                            required>

                        <button
                            type="submit"
                            class="btn btn-primary w-100">
                            Login
                        </button>

                    </form>

                </div>

            </div>

        </div>

    </div>

</div>

</body>
</html>