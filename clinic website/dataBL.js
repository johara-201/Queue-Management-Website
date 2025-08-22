// Business Logic Layer


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const phoneInput = document.getElementById('phone');
    const usernameError = document.getElementById('usernameError');
    const phoneError = document.getElementById('phoneError');


// Validation functions

    function validateUsername(username) {
        // Username validation: 3-16 characters, alphanumeric and underscores
        const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
        return usernameRegex.test(username);
    }

    function validatePhoneNumber(phone) {
        // Phone number validation: 10 digits, starting with 05
        const phoneRegex = /^05\d{8}$/;
        return phoneRegex.test(phone);
    }

  // Live validation for username
    usernameInput.addEventListener('input', () => {
        const username = usernameInput.value.trim();
        if (username && !validateUsername(username)) {
            usernameError.textContent = 'Username must be 3-16 characters long, using only letters, numbers, and underscores.';
        } else {
            usernameError.textContent = '';
        }
    });

 // Live validation for phone
    phoneInput.addEventListener('input', () => {
        const phone = phoneInput.value.trim();
        if (phone && !validatePhoneNumber(phone)) {
            phoneError.textContent = 'Phone number must be 10 digits long and start with 05.';
        } else {
            phoneError.textContent = '';
        }
    });

// Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const phone = phoneInput.value.trim();
        
        let isValid = true;

        // Validate username
        if (!validateUsername(username)) {
            usernameError.textContent = 'Username must be 3-16 characters long, using only letters, numbers, and underscores.';
            isValid = false;
        } else {
            usernameError.textContent = '';
        }

        // Validate phone number
        if (!validatePhoneNumber(phone)) {
            phoneError.textContent = 'Phone number must be 10 digits long and start with 05.';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }

        // If validation passes, save data and proceed
        if (isValid) {
            const userData = {
                username: username,
                phone: phone
            };

            // Send data to data access layer
            if (saveUserData(userData)) {
                window.location.href = `treatments.html?username=${encodeURIComponent(username)}&phone=${encodeURIComponent(phone)}`;
            }
        }
    });
});