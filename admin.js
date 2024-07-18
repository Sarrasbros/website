<<<<<<< HEAD
=======
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
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
$(document).ready(function () {

    var responseOld = '';

// Function to fetch orders and update the order list
<<<<<<< HEAD
    function fetchOrders() {
        window.fetchOrders = fetchOrders;
        $.ajax({
            type: 'GET',
            url: 'fetch_orders.php',
            success: function (response) {
                if (!arraysAreEqual(response, responseOld)) {
                    // Play the notification sound
                    playNotificationSound();
                    console.log('AJAX success', response);
                    // Call the updateOrderList function with the received orders
                    updateOrderList(reponse);
                    responseOld = response;  // Update responseOld with the current response


                }
            },
            error: function (error) {
                console.error('AJAX error', error);
            }
        });
    }
    setInterval(fetchOrders,10000);
// Function to check if two arrays are equal
    function arraysAreEqual(arr1, arr2) {
=======
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
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
        if (arr1.length !== arr2.length) {
            return false;
        }

        for (var i = 0; i < arr1.length; i++) {
<<<<<<< HEAD
            if (arr1[i].OrderID !== arr2[i].OrderID || arr1[i].payStat !== arr2[i].payStat) {
                return false;
            }
        }

        return true;
    }

// Function to play the notification sound
    function playNotificationSound() {
        var audioElement = document.getElementById('notificationSound');

        try {
            audioElement.play();
        } catch (error) {
            console.error('Error playing audio:', error.message);
        }
    }

    document.getElementById('playButton').addEventListener('click', playNotificationSound);



// Function to fetch orders by ID
    console.log('we here');
// updateorderfor kitchen the php has instructions to update the payment status to paid at kitchen if we provide porder id
    function updateOrderForkitchen(orderID) {
        $.ajax({
            type: 'GET',
            url: 'fetch_orders.php',
            data: {
                orderID: orderID
            },
            success: function (response) {
                console.log('AJAX success by id', response);
                // Call the updateOrderList function with the received orders
                updateOrderList(response);
            },
            error: function (error) {
                console.error('AJAX error', error);
            }
        });
    }

    $(document).on('click', '.collapsible1', function () {
        var content = $(this).next();
        var button = $(this);
=======
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
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
        if (content.css('display') === 'none') {
            content.css('display', 'block');
        } else {
            content.css('display', 'none');
        }
<<<<<<< HEAD

        $(this).toggleClass('active');
    });



    // Function to update the order list
    function updateOrderList(orders) {

        $('#orders').empty();

        // Iterate through each order in the response
        orders.forEach(function (order) {
            // Construct a string containing all the details
            var orderDetails =
                '<form id="orderForm_' + order.OrderID + '">' +
                '    Name: <input class="input" type="text" id="fullName_' + order.OrderID + '" value="' + order.FullName + '"><br>' +
                '    Time: <input class="input" type="text" id="pickUpTime_' + order.OrderID + '" value="' + order.PickUpTime + '"><br>' +
                '    Phone: <input class="input" type="text" id="phoneNumber_' + order.OrderID + '" value="' + order.PhoneNumber + '"><br>' +
                '    Bread: <input class="input" type="text" id="breadType_' + order.OrderID + '" value="' + order.BreadType + '"><br>' +
                '    Bread Size: <input class="input" type="text" id="breadSize_' + order.OrderID + '" value="' + order.BreadSize + '"><br>' +
                '    Meat: <input class="input" type="text" id="meat_' + order.OrderID + '" value="' + order.Meat + '"><br>' +
                '    Cheese: <input class="input" type="text" id="cheese_' + order.OrderID + '" value="' + order.Cheese + '"><br>' +
                '    Sauces: <input class="input" type="text" id="sauces_' + order.OrderID + '" value="' + order.Sauces + '"><br>' +
                '    Toppings: <input class="input" type="text" id="toppings_' + order.OrderID + '" value="' + order.Toppings + '"><br>' +
                '    Extras: <input class="input" type="text" id="extras_' + order.OrderID + '" value="' + order.Extras + '"><br>' +
                '    Total: <input class="input" type="text" id="total_' + order.OrderID + '" value="' + order.Total + '"><br>' +
                '    Order number: ' + order.OrderID + '<br>' +
                '    Order Status: ' + order.payStat + '<br>' +
                '    <button value="' + order.OrderID + '" class="updateOrderButton">Update Order</button>' +
                '    <button value="' + order.OrderID + '" id="sendToKitchenButton_' + order.OrderID + '">Send to Kitchen</button>' +
                '    <button value="' + order.OrderID + '" id="orderPickedUpButton_' + order.OrderID + '">Order Picked UP</button>' +
                '    <button value="' + order.OrderID + '" class="deleteOrderButton">Delete Order</button>' +
                '</form>';


// Append the details as a list item with a button make it green if it is already marked as paid
            if (order.payStat == 'unpaid') {
                $('#orders').append('<button type="button" class="collapsible1" style=" margin-top:10px; background-color:red; display:flex;"> Full name:' + order.FullName + ' ' + order.PickUpTime + ' ' + order.OrderID + '</button>' +
                    '<li style="background-color:red; display:none;">NEW!<br>' + orderDetails + '</li>');
            } else if (order.payStat == 'paid, at kitchen') {
                $('#orders').append('<button type="button" class="collapsible1" style=" margin-top:10px; background-color:green; display:flex;">  Full name:' + order.FullName + ' ' + order.PickUpTime + ' ' + order.OrderID + '</button>' +
                    '<li style="background-color:green; display:none;">At Kitchen! <br>' + orderDetails + '</li>');
            } else if (order.payStat == 'Done') {
                $('#orders').append('<button type="button" class="collapsible1" style=" margin-top:10px; background-color:blue; display:flex;">  Full name:' + order.FullName + ' ' + order.PickUpTime + ' ' + order.OrderID + '</button>' +
                    '<li style="background-color:blue; display:none;">Done!<br>' + orderDetails + '</li>');
            } else if (order.payStat == 'Picked Up') {
                $('#orders').append('<button type="button" class="collapsible1" style=" margin-top:10px; background-color:black; display:flex;">  Full name:' + order.FullName + ' ' + order.PickUpTime + ' ' + order.OrderID + '</button>' +
                    '<li style="background-color:black; display:none;">Picked UP!<br>' + orderDetails + '</li>');
            }
        });
    }

// Add event listeners for the new buttons
    $(document).on('click', '[id^="sendToKitchenButton_"]', function () {
        var orderID = $(this).val();
        // Update the kitchen display
        updateOrderForkitchen(orderID);
// already delt with
        // Change the background color of the clicked button to green
        $(this).css('background-color', 'green');

        // Change the background color of the corresponding list item to green
        var listItem = $(this).next('li');
        listItem.css('background-color', 'green');

        // Also change the background color of the collapsible button if needed
        listItem.prev('.collapsible1').css('background-color', 'green');
    });


// Event listener for the "Delete Order" button
    $(document).on('click', '.deleteOrderButton', function () {
        var orderID = $(this).val();

        // Ask for confirmation before deleting the order
        if (confirm('Are you sure you want to delete this order?')) {
            // Create a function and PHP script to delete the order
            deleteOrder(orderID);
        }


        // Refresh the order list
        fetchOrders();
    });


// Function to delete the order by making an AJAX request
    function deleteOrder(orderID) {
        // Make an AJAX request to delete the order by ID
        $.ajax({
            type: 'GET',
            url: 'delete_order.php',
            data: {
                orderID: orderID
            },
            success: function (response) {
                console.log('Order deleted successfully');
            },
            error: function (error) {
                console.error('AJAX error', error);
            }
        });
    }







});
=======
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
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
