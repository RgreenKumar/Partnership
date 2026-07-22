<?php

require '../../includes/auth.php';
require '../../config/db.php';

$products =
$pdo->query("SELECT * FROM products")
    ->fetchAll();

include '../../includes/header.php';
?>

<div class="container">

    <h2 class="mt-4">Products</h2>

    <table class="table table-bordered">

        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
        </tr>

        <?php foreach($products as $product): ?>

        <tr>
            <td><?= $product['id'] ?></td>
            <td><?= $product['name'] ?></td>
            <td><?= $product['price'] ?></td>
        </tr>

        <?php endforeach; ?>

    </table>

</div>

<?php include '../../includes/footer.php'; ?>