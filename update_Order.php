<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: *");

error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = "mysql:host=198.12.245.248;dbname=Order";
$dbusername = "Faisalffpp";
$dbuserpassword = "Giglios1967@";

try {
    $pdo = new PDO($dsn, $dbusername, $dbuserpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if an order ID is provided in the request
    if (isset($_POST['orderID']) && $_POST['orderID']) {
        $orderID = $_POST['orderID'];

        // Update Full Name
        $stmt = $pdo->prepare("UPDATE Order_info SET fullName = :fullName WHERE OrderNumber = :orderID");
        $stmt->execute(['fullName' => $_POST['fullName'], 'orderID' => $orderID]);

        // Update PickUpTime
        $stmt = $pdo->prepare("UPDATE Order_info SET time = :pickUpTime WHERE OrderNumber = :orderID");
        $stmt->execute(['pickUpTime' => $_POST['pickUpTime'], 'orderID' => $orderID]);

        // Update Phone Number
        $stmt = $pdo->prepare("UPDATE Order_info SET phone = :phoneNumber WHERE OrderNumber = :orderID");
        $stmt->execute(['phoneNumber' => $_POST['phoneNumber'], 'orderID' => $orderID]);

        // Update Bread Type
        $stmt = $pdo->prepare("UPDATE Order_info SET breadPreview = :breadPreview WHERE OrderNumber = :orderID");
        $stmt->execute(['breadPreview' => $_POST['breadPreview'], 'orderID' => $orderID]);

        // Update Bread Size
        $stmt = $pdo->prepare("UPDATE Order_info SET breadSizePreview = :breadSizePreview WHERE OrderNumber = :orderID");
        $stmt->execute(['breadSizePreview' => $_POST['breadSizePreview'], 'orderID' => $orderID]);

        // Update Meat
        $stmt = $pdo->prepare("UPDATE Order_info SET meatPreview = :meatPreview WHERE OrderNumber = :orderID");
        $stmt->execute(['meatPreview' => $_POST['meatPreview'], 'orderID' => $orderID]);

        // Update Cheese
        $stmt = $pdo->prepare("UPDATE Order_info SET cheesePreview = :cheesePreview WHERE OrderNumber = :orderID");
        $stmt->execute(['cheesePreview' => $_POST['cheesePreview'], 'orderID' => $orderID]);

        // Update Sauces
        $stmt = $pdo->prepare("UPDATE Order_info SET saucesPreview = :saucesPreview WHERE OrderNumber = :orderID");
        $stmt->execute(['saucesPreview' => $_POST['saucesPreview'], 'orderID' => $orderID]);

        // Update Toppings
        $stmt = $pdo->prepare("UPDATE Order_info SET toppingsPreview = :toppingsPreview WHERE OrderNumber = :orderID");
        $stmt->execute(['toppingsPreview' => $_POST['toppingsPreview'], 'orderID' => $orderID]);

        // Update Extras
        $stmt = $pdo->prepare("UPDATE Order_info SET extrasPreviews = :extrasPreviews WHERE OrderNumber = :orderID");
        $stmt->execute(['extrasPreviews' => $_POST['extrasPreviews'], 'orderID' => $orderID]);

        // Update Payment Status
        if (isset($_POST['payStat']) && $_POST['payStat']) {
            $stmt = $pdo->prepare("UPDATE Order_info SET Paystat = :payStat WHERE OrderNumber = :orderID");
            $stmt->execute(['payStat' => $_POST['payStat'], 'orderID' => $orderID]);
        }

        // Fetch and output the updated order information
        $stmt = $pdo->prepare("SELECT * FROM Order_info WHERE OrderNumber = :orderID");
        $stmt->execute(['orderID' => $orderID]);
        $updatedOrder = $stmt->fetch(PDO::FETCH_ASSOC);

        // Output the result as JSON
        header('Content-Type: application/json');
        echo json_encode($updatedOrder);
    } else {
        // Return an error response if order ID is not provided
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Order ID not provided']);
    }
} catch (PDOException $e) {
    // Log the error to a file or output it
    echo "Connection failed: " . $e->getMessage();
}
?>
