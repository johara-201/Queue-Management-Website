// Initialize global variables to track booking and deleting modes
let bookingEnabled = false;
let deletingEnabled = false;
let selectedTreatment = '';

// Add an event listener for DOM content loaded
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the selected treatment from the URL parameters
    selectedTreatment = getSelectedTreatment();

    // Redirect to treatments page if no treatment is selected
    if (!selectedTreatment) {
        alert("No treatment selected. Please select a treatment first.");
        window.location.href = "treatments.html";
        return;
    }

    // Initialize the page setup
    initializePage();
});

// Function to get the selected treatment from the query parameters in the URL
function getSelectedTreatment() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('treatment'); // Returns the 'treatment' query parameter value
}

// Function to initialize the page
function initializePage() {
    // Select all table cells and add the `data-booked` attribute if it doesn't exist
    const cells = document.querySelectorAll("td");
    cells.forEach(cell => {
        if (!cell.hasAttribute("data-booked")) {
            cell.dataset.booked = "false"; // Default value for unbooked slots
        }
    });

    // Add event listeners for the booking and deleting checkboxes
    const bookingCheckbox = document.getElementById("confirmation");
    const deleteCheckbox = document.getElementById("delete-confirmation");

    if (bookingCheckbox) {
        bookingCheckbox.addEventListener("change", toggleBooking);
    }

    if (deleteCheckbox) {
        deleteCheckbox.addEventListener("change", toggleDeleting);
    }

    // Load existing bookings from storage (if any)
    loadExistingBookings();
}

// Function to enable or disable booking mode
function toggleBooking() {
    bookingEnabled = !bookingEnabled; // Toggle the booking mode

    if (bookingEnabled) {
        alert(`Booking is now enabled for ${selectedTreatment}. Select a time slot.`);
        document.getElementById("delete-confirmation").checked = false; // Disable deleting mode
        deletingEnabled = false;
    } else {
        alert("Booking is disabled.");
    }
}

// Function to enable or disable deleting mode
function toggleDeleting() {
    deletingEnabled = !deletingEnabled; // Toggle the deleting mode

    if (deletingEnabled) {
        alert("Deleting mode enabled. Select a booking to remove.");
        document.getElementById("confirmation").checked = false; // Disable booking mode
        bookingEnabled = false;
    } else {
        alert("Deleting mode disabled.");
    }
}

// Function to handle cell color change and interaction
function changeColor(cell) {
    if (bookingEnabled) {
        handleBooking(cell); // Handle booking when in booking mode
    } else if (deletingEnabled) {
        handleDeleting(cell); // Handle deleting when in deleting mode
    } else {
        alert("Please enable booking or deleting first."); // Prompt user if no mode is enabled
    }
}

// Function to handle booking logic
function handleBooking(cell) {
    if (cell.dataset.booked === "true") { // Check if the cell is already booked
        alert("This time slot is already booked.");
        return;
    }

    // Create a booking object with the necessary details
    const booking = {
        time: cell.textContent,
        day: cell.parentElement.firstElementChild.textContent,
        treatment: selectedTreatment
    };

    // Save the booking and update the cell's appearance
    if (saveBooking(booking)) {
        cell.style.backgroundColor = "lavender"; // Indicate booked status visually
        cell.dataset.booked = "true";
        alert("Appointment booked successfully!");
    }
}

// Function to handle deleting logic
function handleDeleting(cell) {
    if (cell.dataset.booked !== "true") { // Check if the cell is booked
        alert("No booking to delete here.");
        return;
    }

    // Delete the booking and update the cell's appearance
    if (deleteBooking(cell.textContent, cell.parentElement.firstElementChild.textContent)) {
        cell.style.backgroundColor = ""; // Reset cell's appearance
        cell.dataset.booked = "false";
        alert("Booking deleted successfully!");
    }
}
