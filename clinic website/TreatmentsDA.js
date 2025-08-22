function saveTreatmentSelection(treatment) {
    try {
        // Save the treatment selection to localStorage
        localStorage.setItem('selectedTreatment', treatment);
        return true; // Return true on successful save
    } catch (error) {
        // Log an error message if saving to localStorage fails
        console.error('Error saving treatment:', error);
        return false; // Return false to indicate failure
    }
}
