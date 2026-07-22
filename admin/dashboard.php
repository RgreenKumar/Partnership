<?php

require '../includes/auth.php';
require '../config/db.php';

$productCount =
$pdo->query("SELECT COUNT(*) FROM products")
    ->fetchColumn();

$userCount =
$pdo->query("SELECT COUNT(*) FROM users")
    ->fetchColumn();

include '../includes/header.php';
?>

<div class="container-fluid">

    <div class="row">

        <div class="col-md-2 p-0">
            <?php include '../includes/sidebar.php'; ?>
        </div>

        <div class="col-md-10 p-4">

            <h2>Admin Dashboard</h2>

            <div class="row mt-4">

                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            Products
                            <h3><?= $productCount ?></h3>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            Users
                            <h3><?= $userCount ?></h3>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>

</div>

<?php include '../includes/footer.php'; ?>