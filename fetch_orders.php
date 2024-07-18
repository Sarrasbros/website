<?php
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
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

try {
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

    // Return an error response
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Internal Server Error']);
}
?>
