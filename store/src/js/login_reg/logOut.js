

const logOut = document.getElementById('logoutBtn');
logOut.addEventListener('click', logOut_code);

export function logOut_code(event) {
    event.preventDefault();
    console.log('Logout button clicked');
    // rensa token from lokal storage
    localStorage.removeItem('token');
    
    window.location.href = "/login.html";
};
