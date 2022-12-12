import {get_hotel_list_by_id} from "/public/src/firestoreAPI.js"

async function showDetail () {
    var href = window.location.href
    var idHotel = href.slice(href.indexOf("?")+1,href.length)
    await get_hotel_list_by_id(idHotel).then((result) => {
        console.log(result);
        document.getElementById("hotel").innerHTML = result["name"];

        
            













    })




}
showDetail()
