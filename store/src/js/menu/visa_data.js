
const url = "https://api-store-backend-jwkj.onrender.com/api/menu";

import { toggleNav } from '../navmenu.js';

// Funktion för att hämta data från API och visa den på webbplatsen
async function fetchDataShow() {
    const dataLoading = document.getElementById("checkData");
    dataLoading.style.display = "block";
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
        visaData(data);
        visaDataAdmin(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        dataLoading.style.display = "none";
    }
}

//  Funktion för att visa data i public sida
export function visaData(rows) {
    const pizza = document.getElementById("pizza");
    const pasta = document.getElementById("pasta");
    const starters = document.getElementById("starters");

    let IsPizza = false;
    let IsPasta = false;
    let IsStarters = false;

    rows.forEach(element => {
        const itemHTML = `
        <div class="food-menu-item">
            <div class="food-description">
                <h2 class="food-title">${element.title}</h2>
                <p class="text"> kategori: ${element.category}</p>
                <p class="text"> Innehållet: ${element.descrip}</p>
                <p class="food-price text">Pris: ${element.price} Kr</p>
            </div>
        </div>
        `;

        if (element.category.toLowerCase() === "pizza"){
            pizza.innerHTML += itemHTML;
            IsPizza = true;
        } else if (element.category.toLowerCase() === "pasta") {
            pasta.innerHTML += itemHTML;
            IsPasta = true;
        } else if (element.category.toLowerCase() === "förrätter") {
            starters.innerHTML += itemHTML;
            IsStarters = true;
        }
    });
    if (!IsPizza) {
        const pizza_error = document.getElementById("pizza_error");
        if (pizza_error) {
            pizza_error.innerHTML = "Inga pizzor menyer tillgängliga för tillfället...";
        } else {
            console.error('ingen pizza error hittades...');
        }
    }
    if (!IsPasta) {
        const pasta_error = document.getElementById("pasta_error");
        if (pasta_error) {
            pasta_error.innerHTML = "Inga pasta menyer tillgängliga för tillfället...";
        } else {
            console.error('ingen pasta error hittades...');
        }
    }
    if (!IsStarters) {
        const starters_error = document.getElementById("starters_error");
        if (starters_error) {
            starters_error.innerHTML = "Inga förätter menyer tillgängliga för tillfället...";
        } else {
            console.error('ingen förätter error hittades...');
        }
    }

}



fetchDataShow();



toggleNav();