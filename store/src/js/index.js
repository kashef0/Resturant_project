import { addBooking } from "./bookings/addBooking";
import { visaData } from "./menu/visa_data.js";
import { visaFeedback } from "./reviews/visa_review.js";
import { toggleNav } from './navmenu.js';

document.addEventListener('DOMContentLoaded', () => {
    visaFeedback();
    addBooking();
    visaData();
    toggleNav();
});
