import { add_hotel_list, createMapPrice } from "./firestoreAPI.js"

function save () {
    var name = document.getElementById("na").value
    var email = document.getElementById("email").value
    var phone = document.getElementById("Phonnumber").value

    var address = document.getElementById("Adrress").value.trim().split(" ")
    var facility = document.getElementById("Facility").value.trim().split(" ")
    var people = document.getElementById("people").value.trim().split(" ")
    var price = document.getElementById("price").value.trim().split(" ")
    var image = document.getElementById("image").value.trim().split(" ")

    var all = [name, email, phone, address, facility, people, price, image]
    console.log(all);
    if (check(all)) {
        console.log("add");
        add_hotel_list(name, address, people, createMapPrice(people,price), facility, [], image, 0, 0, JSON.parse(localStorage.getItem("user_detail")).id, email, phone)
    } else{
        console.log("please fill all info");
    }
}
window.save = save

function check (all) {
    var ret = true
    for (let i=0; i<=2; i++) {
        if (all[i].length == 0) return false;
    }
    for (let i=3; i<=6; i++) {
        if (all[i][0].length == 0) return false
    }
    if (all[7].length == 0) return false;
    return ret;
}