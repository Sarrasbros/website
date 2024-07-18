<?php
<<<<<<< HEAD
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: *");

error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = "mysql:host=132.148.214.231;dbname=Order";
=======
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set the timezone to Canada/Toronto
date_default_timezone_set("Canada/Toronto");

// Set appropriate headers for SSE
header('Content-Type: text/event-stream');
header('Cache-Control: no-store');
header('Connection: keep-alive');

$dsn = "mysql:host=198.12.245.248;dbname=Order";
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

try {
<<<<<<< HEAD
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $tableName = 'Order_info';

    // Fetch all orders, ordered by OrderId in descending order
    $stmt = $pdo->prepare("SELECT * FROM $tableName ORDER BY OrderId DESC");
    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output orders as JSON
    header('Content-Type: application/json');
    echo json_encode($orders);

    if (isset($_GET['orderID']) && $_GET['orderID']) {
        // Update the payment status
        $stmt1 = $pdo->prepare("UPDATE `$tableName` SET payStat='paid, at kitchen' WHERE OrderId = :orderID");
        $stmt1->execute(['orderID' => $_GET['orderID']]);

        // Fetch and output the updated order information
        $stmt2 = $pdo->prepare("SELECT * FROM $tableName WHERE OrderId = :orderID");
        $stmt2->execute(['orderID' => $_GET['orderID']]);
        $updatedOrder = $stmt2->fetch(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($updatedOrder);
    }
} catch (PDOException $e) {
    // Log the error to a file
    error_log("Error in fetch_orders.php: " . $e->getMessage(), 3, "/path/to/error.log");
=======
    // Establish a connection to the database
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare the SQL statement outside the loop
    $stmt = $pdo->prepare("SELECT * FROM Order_info ORDER BY OrderNumber DESC");

    while (true) {
        // Execute the SQL statement inside the loop to get updated data
        $stmt->execute();
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Send data as SSE
        echo "data: " . json_encode($orders) . "\n\n";

        // Flush the output buffer to send data immediately
        ob_flush();
        flush();

        // Break the loop if the client aborted the connection (closed the page)
        if (connection_aborted()) {
            break;
        }

        // Wait for a short interval before checking again
        sleep(5); // Adjust the interval as needed
    }
} catch (PDOException $e) {
    // Log the error to a file
    error_log("Error in fetch_orders.php: " . $e->getMessage());
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9

    // Return an error response
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Internal Server Error']);
}
?>
