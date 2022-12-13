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


async function clickReserve () {
    

}
window.clickReserve = clickReserve

async function load() {
    var href = window.location.href
    var idHotel = href.slice(href.indexOf("?")+1,href.length)
    var addHere = document.getElementById("addNumberHere");
    
    await get_hotel_list_by_id(idHotel).then((result) => {
        result.number_of_customer.forEach(element => {
            var newNode = document.createElement("span")
            newNode.innerHTML = element
            newNode.style.position = "absolute"
            addHere.appendChild(newNode)
        });
        
    })
}
load()