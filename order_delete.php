<?php
$dsn = "mysql:host=198.12.245.248;dbname=Order";
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

try {
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}

// Check if the OrderNumber is provided in the request
if (isset($_GET['OrderNumber']) && $_GET['OrderNumber']) {
    $OrderNumber = $_GET['OrderNumber'];

    // Prepare and execute the SQL query to delete the order
    $sql = "DELETE FROM Order_info WHERE OrderNumber = :OrderNumber";
    $stmt = $pdo->prepare($sql);

    // Bind parameters
    $stmt->bindParam(':OrderNumber', $OrderNumber, PDO::PARAM_INT);

    // Execute the statement
    try {
        $stmt->execute();
        echo "Order deleted successfully";
    } catch (PDOException $e) {
        echo "Error deleting order: " . $e->getMessage();
    }
} else {
    echo "OrderNumber not provided";
}
?>
