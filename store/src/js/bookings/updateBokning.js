"use strict";
const url = "https://api-store-backend-jwkj.onrender.com/api/bookings";

const token = localStorage.getItem('token');


// Funktion för att uppdatera en beniftliga menu
export async function updateBooking(event) {
    event.preventDefault();
    const form = document.getElementById('bookning_hantering');
    const data = new FormData(form);

    const id = data.get('_id');
    const name = data.get('name');
    const date = data.get('date');
    const time = data.get('time');
    const phone = data.get('tel');
    const email = data.get('email');
    const antal_people = data.get('Antal_people');
    const message = data.get('message');
    const takeout = data.get('takeout');

    const postData = {
        name: name,
        date: date,
        time: time,
        phone: phone,
        email: email,
        Antal_people: parseInt(antal_people),
        message: message,
        takeOut: takeout
    };

    let Isvalid = true;

    if (id === "") {
        document.getElementById('id_error_booking').innerHTML = "du har inte angett ID";
        Isvalid = false;
    } else {
        document.getElementById('id_error_booking').innerHTML = "";
    }
    if (name === "") {
        document.getElementById('name_error').innerHTML = "Du har inte angett namn";
        Isvalid = false;
    } else {
        document.getElementById('name_error').innerHTML = "";
    }
    if (date === "") {
        document.getElementById('date_error').innerHTML = "Du har inte angett datum";
        Isvalid = false;
    } else {
        document.getElementById('date_error').innerHTML = "";
    }
    if (time === "") {
        document.getElementById('time_error').innerHTML = "Du har inte angett tiden";
        Isvalid = false;
    } else {
        document.getElementById('time_error').innerHTML = "";
    }
    if (phone === "") {
        document.getElementById('tel_error').innerHTML = "Du har inte angett telefonnummer";
        Isvalid = false;
    } else {
        document.getElementById('tel_error').innerHTML = "";
    }
    if (email === "") {
        document.getElementById('email_error').innerHTML = "Du har inte angett e-postadress";
        Isvalid = false;
    } else {
        document.getElementById('email_error').innerHTML = "";
    } 
    if (!Isvalid) {
        return;
    }

    try {
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error(`ingen response! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);

        alert('bokning är uppdaterad..');
        return true;

    } catch (error) {
        console.error("Det gick inte att uppdatera data status:", error);
        return false;
    }
}


