// Data Access Layer - Handles data storage operations

const STORAGE_KEY = 'userRegistration';

//this fun saves user data into local storage layer acccording to key 
function saveUserData(userData) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        return true;
    } catch (error) {
        console.error('Error saving user data:', error);
        return false;
    }
}

//this fun gets user data from local storage
function getUserData() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
}

//this fun delets user data from local storage
function clearUserData() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing user data:', error);
        return false;
    }
}