"use strict";
import { showProtectedContent } from '../protected.js';
import { logOut_code } from './logOut.js';
import { validateForm } from '../valdite_input.js';
import { toggleNav } from '../navmenu.js';

const API_URL = "https://api-store-backend-jwkj.onrender.com/api/users";
const LOGIN_URL = `${API_URL}/login`;
const login_site = document.getElementById('loginForm');
login_site.addEventListener('submit', login_code);
export async function login_code(event) {
    event.preventDefault();
    console.log("test login")
    const username = document.getElementById('username').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            alert("fel lösenord eller användarnamn");
            throw new Error('Login failed');
        }
        const data = await response.json();
        console.log(response.ok);
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        showProtectedContent();
        

    } catch (error) {

        console.error('Error during login:', error.message);
    }

};


const inputIds = ['username', 'login-password'];
validateForm('loginForm', inputIds);

// window.addEventListener('load', showProtectedContent);
document.getElementById('logoutBtn').addEventListener('click', () => {
    console.log("logout");
    logOut_code();
    
});

toggleNav();
validateForm();