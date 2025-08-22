// Function to save a booking to local storage
function saveBooking(booking) {
    try {
        // Retrieve existing bookings
        const bookings = getBookings();

        // Add the new booking to the list
        bookings.push(booking);

        // Save the updated bookings array to local storage
        localStorage.setItem('bookings', JSON.stringify(bookings));
        return true; // Indicate success
    } catch (error) {
        // Log an error if saving fails
        console.error('Error saving booking:', error);
        return false; // Indicate failure
    }
}

// Function to delete a booking based on time and day
function deleteBooking(time, day) {
    try {
        // Retrieve existing bookings
        const bookings = getBookings();

        // Filter out the booking that matches the given time and day
        const updatedBookings = bookings.filter(booking => 
            booking.time !== time || booking.day !== day
        );

        // Save the updated bookings array back to local storage
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        return true; // Indicate success
    } catch (error) {
        // Log an error if deleting fails
        console.error('Error deleting booking:', error);
        return false; // Indicate failure
    }
}

// Function to load existing bookings and update the UI
function loadExistingBookings() {
    // Retrieve all bookings from local storage
    const bookings = getBookings();

    // Iterate over each booking
    bookings.forEach(booking => {
        // Select all table cells
        const cells = document.querySelectorAll("td");

        // Match cells based on the booking time and day, and update their appearance
        cells.forEach(cell => {
            if (cell.textContent === booking.time && 
                cell.parentElement.firstElementChild.textContent === booking.day) {
                cell.style.backgroundColor = "lavender"; // Indicate booked status
                cell.dataset.booked = "true"; // Update the cell's data attribute
            }
        });
    });
}

// Function to retrieve all bookings from local storage
function getBookings() {
    // Get the 'bookings' item from local storage
    const stored = localStorage.getItem('bookings');

    // Parse and return the stored bookings, or return an empty array if none exist
    return stored ? JSON.parse(stored) : [];
}
