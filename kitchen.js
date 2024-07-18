// Function to fetch orders and update the kitchen display
function addtokitchen() {
    $.ajax({
        type: 'GET',
<<<<<<< HEAD
        url: 'PHP/fetch_toKitchen.php',
        success: function (response) {
            console.log('AJAX success kitchen', response);
            // Call the updateOrderList function with the received orders
=======
        url: 'fetch_toKitchen.php',
        success: function (response) {
            console.log('AJAX success kitchen', response);
            // Call the updateOrderList1 function with the received orders
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
            updateOrderList1(response);
        },
        error: function (error) {
            console.error('AJAX error', error);
        }
    });
}

// Function to update the kitchen display with fetched orders
function updateOrderList1(orders) {
<<<<<<< HEAD
    // Assuming you have a function to update the kitchen display with orders
    // Modify this function according to your actual implementation
=======
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
    var kitchenDisplay = $('#kitchen-orders');

    // Clear existing orders
    kitchenDisplay.empty();

    // Loop through the fetched orders and append them to the display
    orders.forEach(function (order) {
        var orderItem = $('<li>').html(
<<<<<<< HEAD
            'Name: ' + order.FullName + '<br>' +
            ' - Time: ' + order.PickUpTime + '<br>' +
            ' - Phone: ' + order.PhoneNumber + '<br>' +
            ' - Bread: ' + order.BreadType + '<br>' +
            ' - Bread Size: ' + order.BreadSize + '<br>' +
            ' - Meat: ' + order.Meat + '<br>' +
            ' - Cheese: ' + order.Cheese + '<br>' +
            ' - Sauces: ' + order.Sauces + '<br>' +
            ' - Toppings: ' + order.Toppings + '<br>' +
            ' - Extras: ' + order.Extras + '<br>' +
            'Order number:' + order.OrderID + '<br>' +
            'Order Status: ' + order.payStat +'<br>' +
            '<button value="' + order.OrderID + '" id="sendAsDone" onclick="sendDone(' + order.OrderID + ')">Order is done</button>'
=======
            'Name: ' + order.fullName + '<br>' +
            ' - Time: ' + order.time + '<br>' +
            ' - Phone: ' + order.phone + '<br>' +
            ' - Bread: ' + order.breadPreview + '<br>' +
            ' - Bread Size: ' + order.breadSizePreview + '<br>' +
            ' - Meat: ' + order.meatPreview + '<br>' +
            ' - Cheese: ' + order.cheesePreview + '<br>' +
            ' - Sauces: ' + order.saucesPreview + '<br>' +
            ' - Toppings: ' + order.toppingsPreview + '<br>' +
            ' - Extras: ' + order.extrasPreviews + '<br>' +
            'Order number:' + order.OrderNumber + '<br>' +
            'Order Status: ' + order.Paystat +'<br>' +
            '<button value="' + order.OrderNumber + '" id="sendAsDone" onclick="sendDone(' + order.OrderNumber + ', \'Done\')">Order is done</button>'

>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
        );
        kitchenDisplay.append(orderItem);
    });
}

// Function to handle sending done status
<<<<<<< HEAD
function sendDone(orderID) {
=======
function sendDone(orderID, payStat) {
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
    if (!orderID) {
        console.error('Error: orderID is not provided');
        return;
    }

    $.ajax({
<<<<<<< HEAD
        type: 'GET',
        url: 'PHP/fetch_toKitchen.php',
        data: {
            orderID: orderID
        },
        dataType: 'text',  // or 'html' depending on the expected response type
=======
        type: 'POST',
        url: 'update_Order.php',
        data: {
            orderID: orderID,
            payStat: payStat // Pass PayStat parameter
        },
        dataType: 'text',
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
        success: function (response) {
            console.log('AJAX success', response);
            // Handle the response appropriately
        },
        error: function (xhr, status, error) {
            console.error('AJAX error', status, error);
<<<<<<< HEAD
        }
    });
    addtokitchen();
}
setInterval(addtokitchen,10000);
=======
        },
        complete: function () {
            // Fetch orders after updating or if PayStat is not provided
            if (!arguments[1]) {
                addtokitchen();
            }
        }
    });
}


setInterval(addtokitchen, 10000);

>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
// Call the function to fetch and display orders when the document is ready
$(document).ready(function () {
    addtokitchen();
    // You can add more functionality or event listeners as needed
});
