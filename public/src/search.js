import { get_hotel_list } from "/public/src/firestoreAPI.js"

function getDBHotel() {
    var input = window.location.href.slice(window.location.href.indexOf("?") + 1, window.location.href.length).split("&")
    console.log(input);
    var str = decodeURIComponent(input[0].replace(/\+/g,  " "));
    console.log(str);
}
getDBHotel();