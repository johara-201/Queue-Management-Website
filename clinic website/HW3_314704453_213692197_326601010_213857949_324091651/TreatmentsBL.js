//This script handles the logic for booking a treatment when clicking the book appointment button.
document.addEventListener("DOMContentLoaded", function () {
    const bookButtons = document.querySelectorAll(".book-treatment-btn");

    // Add click event listener to all booking buttons
    bookButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedTreatment = this.getAttribute("data-treatment");

            // Save the selected treatment and redirect
            if (saveTreatmentSelection(selectedTreatment)) {
                window.location.href = `Schedule.html?treatment=${encodeURIComponent(selectedTreatment)}`;
            } else {
                console.error("Failed to save treatment selection!");
            }
        });
    });
});
