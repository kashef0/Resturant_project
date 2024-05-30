"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const navHeader = document.getElementById("navHeader");
    const menuButton = document.getElementById("menuButton");
    // const navLinks = document.querySelectorAll(".nav-link");

    let isNavActive = false;

    // Funktion för att aktivera toggla nav
    function toggleNav() {
        isNavActive = !isNavActive;
        if (isNavActive) {
            navHeader.classList.add("active");
        } else {
            navHeader.classList.remove("active");
        }
    }

    // Lägg till event listener för menyknappen
    menuButton.addEventListener("click", toggleNav);

    navHeader.forEach(link => {
        link.addEventListener("click", (event) => {
            event.target.classList.add("current");
        });
    });
});

export {toggleNav};