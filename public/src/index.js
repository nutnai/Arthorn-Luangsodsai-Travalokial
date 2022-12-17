import { set_type_user } from "./firestoreAPI.js";

function clickSearch() {
    var where = document.getElementById("w").value;
    var people = document.getElementById("people").value;
    var date = document.getElementById("patitin").value;
    if (people == "") people = "1"
    if (date == "") {
        const dateNow = new Date();
        date = dateNow.getUTCFullYear() + "-" + (dateNow.getUTCMonth() + 1) + "-" + dateNow.getUTCDate();
    }
    if (where != "") window.location.href = './web/search.html?' + where + "&" + people + "&" + date;
}
window.clickSearch = clickSearch

function admin(option) {
    switch (option) {
        case 0:
            set_type_user(JSON.parse(localStorage.getItem("user_detail")).id,0).then(()=>{console.log("set to guest");})
            break;
        case 1:
            set_type_user(JSON.parse(localStorage.getItem("user_detail")).id,1).then(()=>{console.log("set to landlord");})
            break
        default:
            console.log("input parameter to set type (0 for guest, 1 for landlord) \nexample: admin(1)");
            break;
    }
}
window.admin = admin

