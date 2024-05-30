"use strict";


const url = "https://api-store-backend-jwkj.onrender.com/api/review";

// Funktion för att lägga till en ny data 
export async function addFeedback(event) {
    event.preventDefault();
    const name = document.getElementById('choose').value.trim();
    const feedback = document.getElementById('customer_review').value.trim();

    const postData = {
        name: name,
        feedback: feedback
    };
    
    if (name.length == 0) {
        alert("Du måste ange ditt namn");
        return;
    }

    let hasErrors = false;


    if (!hasErrors) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error(`ingen response! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);

            // Visa framgångsmeddelande eller utför andra åtgärder vid framgång
            alert('Din feedback har lagts till..');
            
            // Rensa formuläret efter framgångsrik inlämning
            document.getElementById('feedBack_form').reset();

            setTimeout(() => {
                location.reload();
            }, 2000);
        
        } catch (error) {
            console.error("Det gick inte att lägga till data status:", error);
        }
    }
}


const feedbackForm = document.getElementById('feedBack_form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', addFeedback);
    }