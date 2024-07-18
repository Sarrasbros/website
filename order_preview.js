<<<<<<< HEAD
function getParameterByName(url) {
    // get the link decode everything to human readable string and then removing everything but order number 
    url = decodeURIComponent(url);
    url = url.replace('["', '');
    url = url.replace('"]', '');
    url = url.replace(/http:\/\/giglios.ca\/order_submitted.html\?/g, '');
    return url;
}

// Get the orderId from the query parameters
var orderId = getParameterByName(window.location.href);

//
// Update the content of the order details
function updateOrderDetails(orderData) {
    // Assuming there is an HTML element with the class 'order-details' to display the data
    var orderDetailsElement = document.querySelector('.order-details');

    // Example: Update the content of the 'order-details' element
    orderDetailsElement.innerHTML =
    '<h3>  - Name: ' + orderData.FullName + '</h3> <br>' +
         '<h3>  - Time: ' + orderData.PickUpTime + '</h3> <br>' +
        ' - Phone: ' + orderData.PhoneNumber + '<br>' +
        ' - Bread: ' + orderData.BreadType + '<br>' +
        ' - Bread Size: ' + orderData.BreadSize + '<br>' +
        ' - Meat: ' + orderData.Meat + '<br>' +
        ' - Cheese: ' + orderData.Cheese + '<br>' +
        ' - Sauces: ' + orderData.Sauces + '<br>' +
        ' - Toppings: ' + orderData.Toppings + '<br>' +
        ' - Extras: ' + orderData.Extras + '<br>' +
         '<h3>  - Total: ' + orderData.Total + '</h3> <br>'+
         '<h3> Order number:' + orderData.OrderID + '</h3> <br>';


}


// Fetch order details by ID
function fetchOrderDetails(orderID) {
    $.ajax({
        type: 'GET',
        url: 'preview-order.php',
        data: {
            orderID: orderID
        },
        success: function (response) {
            console.log('AJAX success by id', response);
            // Call the updateOrderDetails function with the received order details
            updateOrderDetails(response);
        },
        error: function (error) {
            console.error('AJAX error', error);
        }
    });
}

// Call the fetchOrderDetails function with the orderId
fetchOrderDetails(orderId);
=======
    // Function to extract query parameters from URL
    function getParameterByName(name, url) {
        url = decodeURIComponent(url);
        var regex = new RegExp('[?&]' + name + '=([^&#]*)');
        var results = regex.exec(url);
        if (results == null) {
            return '';
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, ' '));
        }
    }

    // Get the orderId from the query parameters
    var orderId = getParameterByName('orderId', window.location.href);

    // Function to update order details in the HTML
    function updateOrderDetails(orderData) {
        var orderDetailsElement = document.querySelector('.order-details');
        // Example: Update the content of the 'order-details' element
        orderDetailsElement.innerHTML =
            '<h3>Name: ' + orderData.fullName + '</h3>' +
            '<h3>Time: ' + orderData.time + '</h3>' +
            'Phone: ' + orderData.phone + '<br>' +
            'Bread: ' + orderData.breadPreview + '<br>' +
            'Bread Size: ' + orderData.breadSizePreview + '<br>' +
            'Meat: ' + orderData.meatPreview + '<br>' +
            'Cheese: ' + orderData.cheesePreview + '<br>' +
            'Sauces: ' + orderData.saucesPreview + '<br>' +
            'Toppings: ' + orderData.toppingsPreview + '<br>' +
            'Extras: ' + orderData.extrasPreviews + '<br>' +
            '<h3>Total: ' + orderData.total + '</h3>' +
            '<h3>Order number: ' + orderData.OrderNumber + '</h3>';
    }

    // Function to fetch order details by ID from the server
    function fetchOrderDetails(orderID) {
        $.ajax({
            type: 'GET',
            url: 'preview-order.php', // Update this URL to your server endpoint
            data: {
                orderID: orderID
            },
            success: function (response) {
                console.log('AJAX success by id', response);
                // Update UI with received order details
                updateOrderDetails(response);
                // Execute server-side script with orderData
                executeApp(response);
            },
            error: function (error) {
                console.error('AJAX error', error);
            }
        });
    }

    // Function to execute server-side script with orderData
    function executeApp(orderData) {
      fetch('http://ec2-18-222-47-15.us-east-2.compute.amazonaws.com:8080/send_sms', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
          })
          .then(response => response.text())
          .then(data => {
            alert('Message sent: ' + data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }

    // Extract orderId from URL and fetch order details
    fetchOrderDetails(orderId);
>>>>>>> dcb1de19a57b04e2d4822d0d1ce06dc4115f3af9
