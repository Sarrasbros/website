<?php
<<<<<<< HEAD
// Establish a connection to the database
$dsn = "mysql:host=132.148.214.231;dbname=Order";
=======
$dsn = "mysql:host=198.12.245.248;dbname=Order";
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

try {
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}

<<<<<<< HEAD
// Check if the OrderID is provided in the request
if (isset($_GET['orderID'])) {
    $orderID = $_GET['orderID'];

    // Prepare and execute the SQL query to delete the order
    $sql = "DELETE FROM Order_info WHERE OrderID = :orderID";
    $stmt = $pdo->prepare($sql);

    // Bind parameters
    $stmt->bindParam(':orderID', $orderID, PDO::PARAM_INT);
=======
// Check if the OrderNumber is provided in the request
if (isset($_GET['OrderNumber']) && $_GET['OrderNumber']) {
    $OrderNumber = $_GET['OrderNumber'];

    // Prepare and execute the SQL query to delete the order
    $sql = "DELETE FROM Order_info WHERE OrderNumber = :OrderNumber";
    $stmt = $pdo->prepare($sql);

    // Bind parameters
    $stmt->bindParam(':OrderNumber', $OrderNumber, PDO::PARAM_INT);
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9

    // Execute the statement
    try {
        $stmt->execute();
        echo "Order deleted successfully";
    } catch (PDOException $e) {
        echo "Error deleting order: " . $e->getMessage();
    }
} else {
<<<<<<< HEAD
    echo "OrderID not provided";
=======
    echo "OrderNumber not provided";
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
}
?>
