    // Function to play the notification sound
    function playNotificationSound() {
        var audioElement = document.getElementById('notificationSound');
        if (audioElement) {
            try {
                audioElement.play();
            } catch (error) {
                console.error('Error playing audio:', error.message);
            }
        }
    }
$(document).ready(function () {

    var responseOld = '';

// Function to fetch orders and update the order list
const evtSource = new EventSource("fetch_orders.php");
    var responseOld = '';
evtSource.onmessage = function(event) {
    // Check if the data is JSON or a message
    if (event.data.startsWith('[')) {
        // Parse the JSON data received from the server (orders)
        const orders = JSON.parse(event.data);
        // Update the order list with the new data
        if (!arraysAreEqual(orders, responseOld)) {
            playNotificationSound()
                    // Call the updateOrderList function with the received orders
                updateOrderList(orders);
                    responseOld = orders;  // Update responseOld with the current response


                }

    } else {
        console.log("Received data: " + event.data); // Log the received message
    }
};
evtSource.onerror = function(event) {
    console.error('EventSource error', event);
};
   function arraysAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }

        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i].OrderNumber !== arr2[i].OrderNumber) {
                return false;
                
                
            }
        }
        return true;
    }
    

function updateOrderList(orders) {
    $('#orders').empty();
    orders.forEach(function (order) {
          
        var orderDetails =+ constructOrderDetails(order);
          console.log(orderDetails);
        $('#orders').append(orderDetails);
    });
}


    // Function to update the order list
function constructOrderDetails(order) {

        

  
            // Construct a string containing all the details
var orderDetails =
    '<form id="orderForm_' + order.OrderNumber + '">' +
    '    Name: <input class="input" type="text" id="fullName_' + order.OrderNumber + '" value="' + order.fullName + '"><br>' +
    '    Time: <input class="input" type="text" id="pickUpTime_' + order.OrderNumber + '" value="' + order.time + '"><br>' +
    '    Phone: <input class="input" type="text" id="phoneNumber_' + order.OrderNumber + '" value="' + order.phone + '"><br>' +
    '    Bread: <input class="input" type="text" id="breadType_' + order.OrderNumber + '" value="' + order.breadPreview + '"><br>' +
    '    Bread Size: <input class="input" type="text" id="breadSize_' + order.OrderNumber + '" value="' + order.breadSizePreview + '"><br>' +
    '    Meat: <input class="input" type="text" id="meat_' + order.OrderNumber + '" value="' + order.meatPreview + '"><br>' +
    '    Cheese: <input class="input" type="text" id="cheese_' + order.OrderNumber + '" value="' + order.cheesePreview + '"><br>' +
    '    Sauces: <input class="input" type="text" id="sauces_' + order.OrderNumber + '" value="' + order.saucesPreview + '"><br>' +
    '    Toppings: <input class="input" type="text" id="toppings_' + order.OrderNumber + '" value="' + order.toppingsPreview + '"><br>' +
    '    Extras: <input class="input" type="text" id="extras_' + order.OrderNumber + '" value="' + order.extrasPreviews + '"><br>' +
    '    Total: <input class="input" type="text" id="total_' + order.OrderNumber + '" value="' + order.total + '"><br>' +
    '    Order number: ' + order.OrderNumber + '<br>' +
    '    Order Status: ' + order.Paystat + '<br>' +
    '    <button value="' + order.OrderNumber + '" class="updateOrderButton">Update Order</button>' +
    '    <button value="' + order.OrderNumber + '" id="sendToKitchenButton_' + order.OrderNumber + '">Send to Kitchen</button>' +
    '    <button value="' + order.OrderNumber + '" id="orderPickedUpButton_' + order.OrderNumber + '">Order Picked UP</button>' +
    '    <button value="' + order.OrderNumber + '" class="deleteOrderButton">Delete Order</button>' +
    '</form>';



// Append the details as a list item with a button make it green if it is already marked as paid
if (order.Paystat == 'unpaid') {
    $('#orders').append('<button type="button" class="collapsible1" style="margin-top:10px; background-color:red; display:flex;"> Full name:' + order.fullName + ' ' + order.time + ' ' + order.OrderNumber + '</button>' +
        '<li style="background-color:red; display:none;">NEW!<br>' + orderDetails + '</li>');
        
} else if (order.Paystat == 'paid, at kitchen') {
    $('#orders').append('<button type="button" class="collapsible1" style="margin-top:10px; background-color:green; display:flex;">  Full name:' + order.fullName + ' ' + order.time + ' ' + order.OrderNumber + '</button>' +
        '<li style="background-color:green; display:none;">At Kitchen! <br>' + orderDetails + '</li>');
        
} else if (order.Paystat == 'Done') {
    $('#orders').append('<button type="button" class="collapsible1" style="margin-top:10px; background-color:blue; display:flex;">  Full name:' + order.fullName + ' ' + order.time + ' ' + order.OrderNumber + '</button>' +
        '<li style="background-color:blue; display:none;">Done!<br>' + orderDetails + '</li>');
        
} else if (order.Paystat == 'Picked Up') {
    $('#orders').append('<button type="button" class="collapsible1" style="margin-top:10px; background-color:black; display:flex;">  Full name:' + order.fullName + ' ' + order.time + ' ' + order.OrderNumber + '</button>' +
        '<li style="background-color:black; display:none;">Picked UP!<br>' + orderDetails + '</li>');
}

        

    return orderDetails;
    }



    // Event listener for collapsible buttons
    $(document).on('click', '.collapsible1', function () {
        var content = $(this).next();
        if (content.css('display') === 'none') {
            content.css('display', 'block');
        } else {
            content.css('display', 'none');
        }
        $(this).toggleClass('active');
    });

    // Event listener for "Delete Order" buttons
    $(document).on('click', '.deleteOrderButton', function () {
        var orderID = $(this).val();
        if (confirm('Are you sure you want to delete this order?')) {
            deleteOrder(orderID);
        }
    });

    // Function to delete an order
    function deleteOrder(orderID) {
        $.ajax({
            type: 'GET',
            url: 'order_delete.php',
            data: { OrderNumber: orderID },
            success: function (response) {
                console.log('Order deleted successfully');
                // Refresh the order list after deletion
                fetchOrders();
            },
            error: function (error) {
                console.error('AJAX error', error);
                // Display an error message to the user
                alert('An error occurred while deleting the order. Please try again later.');
            }
        });
    }
});