import { add_hotel_list, createMapPrice, get_hotel_list_by_id , set_hotel, delete_hotel} from "./firestoreAPI.js"

function save() {
    var whiteBox = document.getElementById("whitebox").childNodes;
    var name = whiteBox[3].value
    var email = whiteBox[9].value
    var phone = whiteBox[15].value
    var address = whiteBox[21].value.trim().split(" ")
    var facility = whiteBox[27].value.trim().split(" ")
    var people = []
    var price = []
    var zo = document.getElementById("ratePriceZone");
    people.push(zo.childNodes[1].childNodes[1].value);
    price.push(zo.childNodes[1].childNodes[5].value);
    for (let i = 3; i < zo.childNodes.length; i++) {
        people.push(zo.childNodes[i].childNodes[0].value);
        price.push(zo.childNodes[i].childNodes[4].value);
    }

    var image = ["default.jpg"]

    var all = [name, email, phone, address, facility, people, price, image]
    console.log(all);
    if (check(all)) {
        if (window.location.href.indexOf("?") == -1) {
            console.log("add");
            add_hotel_list(name, address, people, createMapPrice(people, price), facility, [], image, 0, 0, JSON.parse(localStorage.getItem("user_detail")).id, email, phone)
        } else {
            var href = window.location.href;
            var id_hotel = href.slice(href.indexOf("?") + 1, href.length)
            set_hotel(id_hotel, name, address, people, price, facility, image, email, phone);
        }

    } else {
        console.log("please fill all info");
    }
}
window.save = save

function check(all) {
    var ret = true
    for (let i = 0; i <= 2; i++) {
        if (all[i].length == 0) return false;
    }
    for (let i = 3; i <= 6; i++) {
        if (all[i][0].length == 0) return false
    }
    if (all[7].length == 0) return false;
    return ret;
}

function zone(zone, option) {

    if (zone == "ratePriceZone") {
        var addZone = document.getElementById("ratePriceZone");
        if (option == "add") {
            var newBlock = "<div><input type=\"number\" class=\"ratePriceZone\" value=\"-\" style=\"width: 50px;\">\
            <p class=\"ratePriceZoneText1\">person(s)</p>\
            <input type=\"number\" class=\"ratePriceZone\" value=\"-\">\
            <p class=\"ratePriceZoneText2\">baht</p></div>"
            addZone.innerHTML += newBlock
        } else if (option == "remove") {
            var list = addZone.childNodes;
            if (list.length) addZone.removeChild(list[list.length - 1])
        }
    }
}
window.zone = zone

function load() {
    var href = window.location.href;
    if (href.indexOf("?") == -1) return;
    var id_hotel = href.slice(href.indexOf("?") + 1, href.length)
    get_hotel_list_by_id(id_hotel).then((ht) => {
        var whiteBox = document.getElementById("whitebox").childNodes;
        whiteBox[3].value = ht.name
        whiteBox[9].value = ht.email
        whiteBox[15].value = ht.phone
        var address = ""
        ht.address.forEach(ad => {
            address += ad + " "
        });
        whiteBox[21].value = address
        var facility = ""
        ht.facility.forEach(fac => {
            facility += fac + " "
        });
        whiteBox[27].value = facility

        var zo = document.getElementById("ratePriceZone");
        var number_of_customer = ht.number_of_customer
        var price = ht.price
        for (let i = 1; i < number_of_customer.length; i++) zone("ratePriceZone", "add")
        zo.childNodes[1].childNodes[1].value = number_of_customer[0]
        zo.childNodes[1].childNodes[5].value = price[number_of_customer[0]]
        for (let i = 1; i < number_of_customer.length; i++) {
            zo.childNodes[i + 2].childNodes[0].value = number_of_customer[i];
            zo.childNodes[i + 2].childNodes[4].value = price[number_of_customer[i]];
        }
        var auth = getauth();
        if (auth) {
            if (auth.currentUser.uid == ht.id_landlord) {
                document.getElementById("delete").style.display = "";
            }
        }
    })
}
load()

async function clickDelete () {
    var href = window.location.href
    var id_contract = href.slice(href.indexOf("?")+1,href.length)
    await delete_hotel(id_contract).then((result) => {
        window.history.back()
    })
}
window.clickDelete = clickDelete;