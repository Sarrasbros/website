$(document).ready(function () {


    // Event listener for the update order button
     $(document).on('submit', 'form', function (event) {
        event.preventDefault();  // Prevent the default form submission

        var orderID = $(this).find('button.updateOrderButton').val();

        // Ask for confirmation before changing the order information
        //if (confirm('Are you sure you want to update this order?')) {
            // Call the function to update order information
            updateOrder(orderID);

            // Refresh the order list
            fetchOrders();
        
    });
      $(document).on('click', '[id^="orderPickedUpButton_"]', function () {
        var orderID = $(this).val();
        // Update the kitchen display
             updateOrderPickedUp(orderID, 'Picked Up');
        // Change the background color of the clicked button to black
        $(this).css('background-color', 'black');

        // Change the background color of the corresponding list item to black
        var listItem = $(this).next('li');
        listItem.css('background-color', 'black');

        // Also change the background color of the collapsible button if needed
        listItem.prev('.collapsible1').css('background-color', 'green');
    });
    $(document).on('click', '[id^="sendToKitchenButton_"]', function () {
        var orderID = $(this).val();
        // Update the kitchen display
             updateOrderPickedUp(orderID, 'paid, at kitchen');
        // Change the background color of the clicked button to green
        $(this).css('background-color', 'green');

        // Change the background color of the corresponding list item to green
        var listItem = $(this).next('li');
        listItem.css('background-color', 'green');

        // Also change the background color of the collapsible button if needed
        listItem.prev('.collapsible1').css('background-color', 'green');
    });


});
  
function updateOrderPickedUp(orderID, text) {
    $.ajax({
        type: 'POST',
        url: 'update_Order.php',
        data: {
            orderID: orderID,
            payStat: text
        },
        dataType: 'json',
        success: function (response) {
            console.log('Update success', response);
            // Handle the response appropriately, e.g., show a success message
        },
        error: function (xhr, status, error) {
            console.error('Update error', status, error);
            // Handle errors, e.g., show an error message to the user
        }
    });
}

function updateOrder(orderID) {
    // Extracting the extras value from the formatted string
    var extrasValue = $('#extras_' + orderID).val().replace('Extras:', '').trim();

    $.ajax({
        type: 'POST',
        url: 'update_Order.php',
        data: {
            orderID: orderID,
            fullName: $('#fullName_' + orderID).val(),
            pickUpTime: $('#pickUpTime_' + orderID).val(),
            phoneNumber: $('#phoneNumber_' + orderID).val(),
            breadPreview: $('#breadType_' + orderID).val(),
            breadSizePreview: $('#breadSize_' + orderID).val(),
            meatPreview: $('#meat_' + orderID).val(),
            cheesePreview: $('#cheese_' + orderID).val(),
            saucesPreview: $('#sauces_' + orderID).val(),
            toppingsPreview: $('#toppings_' + orderID).val(),
            extrasPreviews: extrasValue,
            total: $('#total_' + orderID).val()
        },
        dataType: 'json',
        success: function (response) {
            console.log('Update success', response);
            // Handle the response appropriately, e.g., show a success message
        },
        error: function (xhr, status, error) {
            console.error('Update error', status, error);
            // Handle errors, e.g., show an error message to the user
        }
    });
}
