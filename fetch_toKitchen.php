<?php
<<<<<<< HEAD
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = "mysql:host=132.148.214.231;dbname=Order";
=======
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection details
$dsn = "mysql:host=198.12.245.248;dbname=Order";
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

try {
<<<<<<< HEAD
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if an order ID is provided in the request
 
$stmt = $pdo->prepare("SELECT * FROM Order_info WHERE paystat = 'paid, at kitchen'");
$stmt->execute();
$order = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Output the result as JSON
header('Content-Type: application/json');
echo json_encode($order);

} catch (PDOException $e) {
    // Log the error to a file
    error_log("Error in fetch_orders.php: " . $e->getMessage(), 3);
=======
    // Establish a connection to the database
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (isset($_GET['orderID']) && isset($_GET['PayStat'])) {
        // Update PayStat to 'Done' if provided
        $orderID = $_GET['orderID'];
        $payStat = $_GET['PayStat'];

        $stmt = $pdo->prepare("UPDATE Order_info SET PayStat = :payStat WHERE OrderID = :orderID");
        $stmt->execute(['payStat' => $payStat, 'orderID' => $orderID]);

        // Fetch and output the updated order information
        $stmt = $pdo->prepare("SELECT * FROM Order_info WHERE OrderID = :orderID");
        $stmt->execute(['orderID' => $orderID]);
        $updatedOrder = $stmt->fetch(PDO::FETCH_ASSOC);

        // Output the updated order as JSON
        header('Content-Type: application/json');
        echo json_encode($updatedOrder);
    } else {
        // Fetch orders that are marked as 'paid, at kitchen'
        $stmt = $pdo->prepare("SELECT * FROM Order_info WHERE PayStat = 'paid, at kitchen'");
        $stmt->execute();
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Output the result as JSON
        header('Content-Type: application/json');
        echo json_encode($orders);
    }
} catch (PDOException $e) {
    // Log the error to a file
    error_log("Error in fetchtokitchen.php: " . $e->getMessage(), 3);
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9

    // Return an error response
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Internal Server Error']);
}
?>
