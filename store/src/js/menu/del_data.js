"use strict";


// Funktion för att radera em menu 
const url = "https://api-store-backend-jwkj.onrender.com/api/menu";

const token = localStorage.getItem('token');

export async function deleteData(event) {
    event.preventDefault();

    const id = document.getElementById('id').value.trim();

    if (id === "") {
        document.getElementById('id_error').innerHTML = "du har inte angett ID";
        return;
    } else {
        document.getElementById('id_error').innerHTML = "";
    }

    try {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`ingen response! Status: ${response.status}`);
        }
        alert('Meny är raderad..');

    } catch (error) {
        console.error("Det gick inte att radera data status:", error);
    }
}
