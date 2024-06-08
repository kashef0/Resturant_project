

const logOut = document.getElementById('logoutBtn');
logOut.addEventListener('click', logOut_code);
import { showProtectedContent } from "../protected";

export function logOut_code(event) {
    console.log('test Logout button clicked');
    // rensa token from lokal storage
    localStorage.removeItem('token');
    showProtectedContent();
    
    window.location.href = "/login.html";
};
