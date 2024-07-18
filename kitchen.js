// Function to fetch orders and update the kitchen display
function addtokitchen() {
    $.ajax({
        type: 'GET',
        url: 'fetch_toKitchen.php',
        success: function (response) {
            console.log('AJAX success kitchen', response);
            // Call the updateOrderList1 function with the received orders
            updateOrderList1(response);
        },
        error: function (error) {
            console.error('AJAX error', error);
        }
    });
}

// Function to update the kitchen display with fetched orders
function updateOrderList1(orders) {
    var kitchenDisplay = $('#kitchen-orders');

    // Clear existing orders
    kitchenDisplay.empty();

    // Loop through the fetched orders and append them to the display
    orders.forEach(function (order) {
        var orderItem = $('<li>').html(
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

        );
        kitchenDisplay.append(orderItem);
    });
}

// Function to handle sending done status
function sendDone(orderID, payStat) {
    if (!orderID) {
        console.error('Error: orderID is not provided');
        return;
    }

    $.ajax({
        type: 'POST',
        url: 'update_Order.php',
        data: {
            orderID: orderID,
            payStat: payStat // Pass PayStat parameter
        },
        dataType: 'text',
        success: function (response) {
            console.log('AJAX success', response);
            // Handle the response appropriately
        },
        error: function (xhr, status, error) {
            console.error('AJAX error', status, error);
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

// Call the function to fetch and display orders when the document is ready
$(document).ready(function () {
    addtokitchen();
    // You can add more functionality or event listeners as needed
});
