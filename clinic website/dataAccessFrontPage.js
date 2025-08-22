// Data Access Tier - logic related to the data access tier

//constants
const dataAccessFrontPage = {
    KEYS: {
        BUSINESS_INFO: 'businessInfo',
        REVIEWS: 'reviews'
    },

//info about the business
    getBusinessInfo() {
        let info = this.getData(this.KEYS.BUSINESS_INFO);
        if (!info) {
            info = this.getDefaultBusinessInfo();
            this.setData(this.KEYS.BUSINESS_INFO, info);
        }
        return info;
    },

    getDefaultBusinessInfo() {
        return {
            location: 'Karmiel',
            workDays: 'Sunday-Friday: 10:00-17:00',
            contact: '0509007875',
            description: 'we offer Facial Treatments use High-quality skincare and eco-friendly prouducts'
        };
    },

//save the submeted review
    saveReview(review) {
            const reviews = this.getData(this.KEYS.REVIEWS) || [];
            reviews.push(review);
            return this.setData(this.KEYS.REVIEWS, reviews);  
    },

//get and set datat to localStorage
    getData(key) {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;

    },

    setData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    }
};