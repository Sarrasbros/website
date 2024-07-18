// Function to generate pickup time options
function generatePickupTimes() {
    var select = document.getElementById("time");
    select.innerHTML = ''; // Clear previous options
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();

    // Set the start and end hours based on the current day
    var startHour, endHour;
    if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) { // Monday to Friday
        startHour = 9;
        endHour = 22;
    } else { // Saturday and Sunday
        startHour = 9;
        endHour = 21;
    }

    // Check if the current time is within business hours
    if (currentHour >= startHour && currentHour < endHour) {
        // Calculate the next available pickup time
        var nextPickupTime = new Date(currentDate);
        nextPickupTime.setMinutes(15 * Math.ceil(currentMinute / 15)); // Round up to the nearest 15 minutes
        if (nextPickupTime.getHours() < startHour || nextPickupTime.getHours() >= endHour) {
            nextPickupTime.setHours(startHour);
            nextPickupTime.setMinutes(0);
        }

        // Add options to the select element
        while (nextPickupTime.getHours() < endHour) {
            var option = document.createElement("option");
            option.text = nextPickupTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            option.value = nextPickupTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
            select.add(option);

            // Increment the next pickup time by 15 minutes
            nextPickupTime.setMinutes(nextPickupTime.getMinutes() + 15);
        }
    } else {
        // Display business hours since the store is closed
        var closedMessage = document.createElement("option");
        closedMessage.text = "Closed. Our hours are Monday to Friday, 9am to 10pm, and Saturday to Sunday, 9am to 9pm";
        closedMessage.disabled = true;
        select.add(closedMessage);
    }
} 



function submitOrder() {
    // Collect form data
    var fullName = document.getElementById("fullName").value;
    var time = document.getElementById("time").value;
    var phone = document.getElementById("phone").value;
    var breadSizePreview = document.getElementById("breadSizePreview1").innerText;
    var breadPreview = document.getElementById("breadPreview1").innerText;
    var meatPreview = document.getElementById("meatPreview1").innerText;
    var cheesePreview = document.getElementById("CheesePreview1").innerText;
    var saucesPreview = document.getElementById("saucesPreview1").innerText;
    var toppingsPreview = document.getElementById("toppingsPreview1").innerText;
    var extrasPreviews = document.getElementById("ExtrasPreviews1").innerText;
    var total = document.getElementById("total").innerText;

    // Check if any of the required fields are empty
    if (fullName === "" || phone === ""||time ==="") {
        alert("Please fill out all required fields. (Required info is followed By *)");
        return; // Prevent submission if any field is empty
    }
    // Check if no options for meat, cheese, bread type, bread size, sauces, and toppings are selected
    if (meatPreview === "" && cheesePreview === "" && breadPreview === "" && breadSizePreview === "" && saucesPreview === "" && toppingsPreview === "") {
        alert("Please select at least one option for meat, cheese, bread type, bread size, sauces, or toppings.");
        return; // Prevent submission if no options are selected
    }

    // Create JSON object
    var formData = {
        fullName: fullName,
        time: time,
        phone: phone,
        breadSizePreview: breadSizePreview,
        breadPreview: breadPreview,
        meatPreview: meatPreview,
        cheesePreview: cheesePreview,
        saucesPreview: saucesPreview,
        toppingsPreview: toppingsPreview,
        extrasPreviews: extrasPreviews,
        total: total,
        Paystat : 'unpaid',
    };

    // Send data to order.php using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "order.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log("Response from server:", xhr.responseText); // Log the response
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log("Order submitted successfully. ID: " + response[0]);
             // Redirect to orderpreview.html with order ID as parameter
                window.location.href = "order_submitted.html?orderId=" + response[0];
        } else {
            console.error("Error submitting order: " + xhr.statusText);
        }
    }
};
    xhr.send(JSON.stringify(formData));
}



$(document).ready(function () {
// Call the function to generate pickup time options
generatePickupTimes();
    function updateSubPreview() {
        var selectedSub = $('input[name="sub"]:checked').attr('id');
        $('#PreSet').text(selectedSub);

        // Check if the selected sub is "Signature" and handle accordingly
        if (selectedSub === "Signature") {
            $('.check[name="meat"]').prop('checked', false); // unCheck all meat checkboxes
            $('.check[name="cheese"]').prop('checked', false);
            // Mark the "Prosciutto" and "Ricotta" checkboxes as checked
            $('#prosciutto').prop('checked', true);
            $('#ricotta').prop('checked', true);
        }
         else  if (selectedSub === "BlazinBoiler") {
            $('.check[name="meat"]').prop('checked', false); // unCheck all meat checkboxes
            $('.check[name="cheese"]').prop('checked', false);
                $('#HotMortadella').prop('checked', true);
                $('#hotCapicollo').prop('checked', true);
                $('#hotGenoaSalami').prop('checked', true);
                $('#sizzlingHotHavarti').prop('checked', true);
            }
        else if (selectedSub === "Italian"){
            $('.check[name="meat"]').prop('checked', false); // unCheck all meat checkboxes
            $('.check[name="cheese"]').prop('checked', false);
            $('#MildMortadella').prop('checked', true);
            $('#mildCapicollo').prop('checked', true);
            $('#genoaSalami').prop('checked', true);
            $('#plainHavarti').prop('checked', true);
        }
        else if (selectedSub === "SpicyItalian"){
            $('.check[name="meat"]').prop('checked', false); // unCheck all meat checkboxes
            $('.check[name="cheese"]').prop('checked', false);
            $('#HotMortadella').prop('checked', true);
            $('#hotCapicollo').prop('checked', true);
            $('#hotGenoaSalami').prop('checked', true);
            $('#plainHavarti').prop('checked', true);
        }
    }

    // Event listener for changes in the selected sub
    $('input[name="sub"]').change(function() {
        // Update the preview when the selected sub changes
        updateSubPreview();
    });

    // Call the updateSubPreview function initially to set the initial state
    updateSubPreview();



    $(document).on('click', '.collapsible1, .collapsible-bottom, .collapsible-top, .collapsible', function () {
        var content = $(this).next();
        var button = $(this);
        if (content.css('display') === 'none') {
            content.css('display', 'flex');
        } else {
            content.css('display', 'none');
        }
    
        $(this).toggleClass('active');
    });

    // Function to update the preview spans for meat, cheese, sauces, toppings, and extras
    function updatePreview() {
        // Update bread type preview
        var selectedBreadType = $('input[name="breadType"]:checked').next().find('h6').text();
        $('#breadPreview').text(selectedBreadType);
        $('#breadPreview1').text(selectedBreadType);

        // Update bread size preview
        var selectedBreadSize = $('input[name="breadSize"]:checked').next().find('h6').text();
        $('#breadSizePreview').text(selectedBreadSize);
        $('#breadSizePreview1').text(selectedBreadSize);

        // Update total
        var total = 0;
        // Iterate over all checked checkboxes
        $('input[name="breadSize"]:checked').each(function() {
            updateTotal();
        });
    }
    function updateTotal() {
        var total = 0;
        var breadSize = 0 ;

        $('input[name="breadSize"]:checked').each(function() {
            // Add the price of the checked checkbox to the total
            total += parseFloat($(this).val());
            breadSize += parseFloat($(this).val());
        });

        var extraPrice = 0;
        if (breadSize == "9.5") {
            extraPrice = 0.5;
        } else if (breadSize == "17") {
            extraPrice = 1;
        }

        $('input[name="Extras"]:checked').each(function() {
            // Add the price of the checked checkbox to the total
            total += parseFloat($(this).val())*extraPrice;
        });

        // Display the total
        $('#total').text('$' + total.toFixed(2)); // Display total with two decimal places
    }

    // Event listener for changes in the checkboxes
    $('input[type="checkbox"]').change(function() {
        // Update the total when a checkbox changes
        updateTotal();
        var totalCheckedMeatCheese = $('input[name="meat"]:checked').length + $('input[name="cheese"]:checked').length;
        var totalCheckedSauces = $('input[name="sauces"]:checked').length;
        if (totalCheckedMeatCheese > 4 || totalCheckedSauces > 2) {
            // Prevent the checkbox from being checked
            $(this).prop('checked', false);
            var errorMessage = "";
            if (totalCheckedMeatCheese > 4) {
                errorMessage += 'You can only select up to 4 meats and cheeses combined.\n';
            }
            if (totalCheckedSauces > 2) {
                errorMessage += 'You can only select up to 2 sauces.\n';
            }
            alert(errorMessage);
        }
    
    });
    // Event listener for changes in the checkboxes for bread type and size
    $('input[type="radio"], input[type="checkbox"]').change(function() {
        // Update the previews when a radio button or checkbox changes
        updatePreview();

        // Update meat preview
        var selectedMeat = [];
        $('input[name="meat"]:checked').each(function() {
            selectedMeat.push($(this).next().find('h6').text());
        });
        $('#meatPreview').text(selectedMeat.join(', '));
        $('#meatPreview1').text(selectedMeat.join(', '));

        // Update cheese preview
        var selectedCheese = [];
        $('input[name="cheese"]:checked').each(function() {
            selectedCheese.push($(this).next().find('h6').text());
        });
        $('#CheesePreview').text(selectedCheese.join(', '));
        $('#CheesePreview1').text(selectedCheese.join(', '));

        // Update sauces preview
        var selectedSauces = [];
        $('input[name="sauces"]:checked').each(function() {
            selectedSauces.push($(this).next().find('h6').text());
        });
        $('#saucesPreview1').text(selectedSauces.join(', '));
        $('#saucesPreview').text(selectedSauces.join(', '));
        // Update toppings preview
        var selectedToppings = [];
        $('input[name="toppings"]:checked').each(function() {
            selectedToppings.push($(this).next().find('h6').text());
        });
        $('#toppingsPreview').text(selectedToppings.join(', '));
        $('#toppingsPreview1').text(selectedToppings.join(', '));

        // Update extras preview
        var selectedExtras = [];
        $('input[name="Extras"]:checked').each(function() {
            selectedExtras.push($(this).next().find('h6').text());
        });
        $('#ExtrasPreviews').text(selectedExtras.join(', '));
        $('#ExtrasPreviews1').text(selectedExtras.join(', '));
    });

});
