// Business Logic Tier - logic related to the presentation tier


//load Initial Data
const businessLogicFrontPage = {
    init() {
        this.loadInitialData();
		//for buttons
		this.setupEventListeners();
    },

//for login button and review button
    setupEventListeners() {
        const loginButton = document.getElementById('loginButton');
        const reviewButton = document.getElementById('reviewButton');

        if (loginButton) {
            loginButton.addEventListener('click', () => {
                this.navigateToLogin();
            });
        }

        if (reviewButton) {
            reviewButton.addEventListener('click', () => {
                this.handleReviewSubmission();
            });
        }
    },
	
    loadInitialData() {
        const businessInfo = dataAccessFrontPage.getBusinessInfo();
        this.updateUIWithBusinessInfo(businessInfo);
    },

    updateUIWithBusinessInfo(info) {
        document.getElementById('location').textContent = info.location;
        document.getElementById('workDays').textContent = info.workDays;
        document.getElementById('contact').textContent = info.contact;
        document.getElementById('description').textContent = info.description;
    },

//go to data website
    navigateToLogin() {
        window.location.href = 'data.html';
    },

//check review submeted and sent alert according to the case
    handleReviewSubmission() {
        const textarea = document.getElementById('reviewTextarea');
        const review = textarea.value.trim();
        
        if (this.validateReview(review)) {
            const reviewData = {
                text: review,
				date: new Date().toISOString()
            };
            
            if (dataAccessFrontPage.saveReview(reviewData)) {
                alert('Thank you for your review!');
                textarea.value = '';
            } else {
                alert('Error saving review. Please try again.');
            }
        } else {
            alert('Please write a review (max 3 lines) before sending.');
        }
    },

//check if review validate
    validateReview(review) {
        return review.length > 0 && review.split('\n').length <= 3;
    }
};

//when the website is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        businessLogicFrontPage.init();
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});


