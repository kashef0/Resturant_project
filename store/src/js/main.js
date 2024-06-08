"use strict";

import { visaDataAdmin } from '/src/js/showdataAdmin';
import { addData } from '/src/js/menu/add_data';
import { deleteData } from "/src/js/menu/del_data";
import { updateData } from "/src/js/menu/update_data";
import { toggleNav } from './navmenu.js';
import { logOut_code } from './login_reg/logOut.js';
import { getAdmin } from "/src/js/login_reg/getAdmin";
import { regist_code } from "/src/js/login_reg/register";
import { visaBooking } from './bookings/visaBooking.js';
import { deleteBooking } from "./bookings/delBokning.js";
import { updateBooking } from "./bookings/updateBokning.js";

document.addEventListener('DOMContentLoaded', async function() {
    document.getElementById('add_data').addEventListener('submit', async function(event) {
        event.preventDefault();
        const isValid = await addData(event);
        if (isValid) {
            location.reload();
        }
    });

    document.getElementById('update_data').addEventListener('click', async function(event) {
        event.preventDefault();
        const isValid = await updateData(event);
        if (isValid) {
            location.reload();
        }
    });

    document.getElementById('delete_data').addEventListener('click', async function(event) {
        event.preventDefault();
        const isValid = await deleteData(event);
        if (isValid) {
            location.reload();
        }
    });
    
    document.getElementById('update_booking').addEventListener('click', async function(event) {
        event.preventDefault();
        const isValid = await updateBooking(event);
        if (isValid) {
            location.reload();
        }
    });

    document.getElementById('delete_booking').addEventListener('click', async function(event) {
        event.preventDefault();
        const isValid = await deleteBooking(event);
        if (isValid) {
            location.reload();
        }
    });
    visaDataAdmin();
    visaBooking();
});

getAdmin();
regist_code();
logOut_code();
toggleNav();
