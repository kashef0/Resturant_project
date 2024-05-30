"use strict";
const url = "https://api-store-backend-jwkj.onrender.com/api/menu";
// Funktion för att fetcha data från API och visa det på webbplatsen
async function fetchDataShow() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        visaDataAdmin(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



// Funktion för att visa data i admin sida
export function visaDataAdmin(rows) {
    const pizza2 = document.getElementById("pizza");
    const pasta2 = document.getElementById("pasta");
    const starters2 = document.getElementById("starters");

    let IsPizza = false;
    let IsPasta = false;
    let IsStarters = false;
    
    rows.forEach(element => {
        const itemHTML = `
        <div class="food-menu-item">
            <div class="food-description">
                <p class="food-title" style="color:tomato">Menu id: ${element._id}</p>
                <p class="food-title text">${element.title}</p>
                <p class="text"> kategori: ${element.category}</p>
                <p class="text"> Innehållet: ${element.descrip}</p>
                <p class="food-price text">Pris: ${element.price} Kr</p>
            </div>
        </div>
        `;

        if (element.category.toLowerCase() === "pizza"){
            pizza2.innerHTML += itemHTML;
            IsPizza = true;
        } else if (element.category.toLowerCase() === "pasta") {
            pasta2.innerHTML += itemHTML;
            IsPasta = true;
        } else if (element.category.toLowerCase() === "förrätter") {
            starters2.innerHTML += itemHTML;
            IsStarters = true;
        }
    });
    if (!IsPizza) {
        const pizza_error = document.getElementById("pizza_error");
        if (pizza_error) {
            pizza_error.innerHTML = "Inga pizzor menyer finns...";
        } else {
            console.error('ingen pizza error hittades...');
        }
    }
    if (!IsPasta) {
        const pasta_error = document.getElementById("pasta_error");
        if (pasta_error) {
            pasta_error.innerHTML = "Inga pastor menyer finns...";
        } else {
            console.error('ingen pastor error hittades...');
        }
    }
    if (!IsStarters) {
        const starters_error = document.getElementById("starters_error");
        if (starters_error) {
            starters_error.innerHTML = "Inga förätter menyer finns...";
        } else {
            console.error('ingen förätter error hittades...');
        }
    }
}



fetchDataShow();