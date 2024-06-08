"use strict";

const url = "https://api-store-backend-jwkj.onrender.com/api/review";


// Funktion för att hämta data från API och visa den på webbplatsen
async function fetchFeedback() {
    const loadingData = document.getElementById("showDataLoading");
    loadingData.style.display = "block";
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
        console.log('Data reserverad:', data);
        visaFeedback(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        loadingData.style.display = "none";
    }
}

//  Funktion för att visa data i public sida
export function visaFeedback(rows) {
    const boxReview = document.getElementById("box_feedBack");
    boxReview.innerHTML = "";
    const newestReview = rows.slice(-6);
    newestReview.forEach(element => {
        
        const timeStamp = new Date(element.created);
        const formatDate = `${timeStamp.getFullYear()}-${(timeStamp.getMonth() + 1).toString().padStart(2, "0")}-${timeStamp.getDate().toString().padStart(2, "0")}`;
        const formattime = `${timeStamp.getHours().toString().padStart(2, "0")}:${(timeStamp.getMinutes() + 1).toString().padStart(2, "0")}-${timeStamp.getSeconds().toString().padStart(2, "0")}`;
        const imgUrl = `https://dummyimage.com/300.png/09f/fff&text=${element.name}`;
        const itemHTML = `
        <div class="Rekommendation-box">
            <div class="customer-detail">
                <div class="customer-photo">
                    <img src="${imgUrl}" alt="bild saknas" />
                    <p class="customer-name">${element.name}</p>
                </div>
            </div>
            
            <p class="Rekommendation-text">
            ${element.feedback}
            </p>
            <p class="timestamp">${formatDate} ${formattime}</p>
        </div>
        `;
        if (boxReview){
            boxReview.innerHTML += itemHTML;
            
        }
    });

}


fetchFeedback();
