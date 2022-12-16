import { get_contract, get_hotel_list_by_id, get_user, delete_contract } from "./firestoreAPI.js";
import { getauth } from "./auth.js";

async function load () {
    var href = window.location.href
    var id_contract = href.slice(href.indexOf("?")+1,href.length)
    get_contract (id_contract).then((result) => {
        var textList = document.getElementsByClassName("info");
        if (result !== undefined) {
            textList[0].innerHTML = id_contract;
        get_hotel_list_by_id(result.id_hotel).then((ht) => {
            textList[1].innerHTML = ht.name;
        })
        get_user(result.id_user).then((user) => {
            textList[2].innerHTML = user.name;
        })
        textList[3].innerHTML = result.number_of_customer + " person(s)";
        textList[4].innerHTML = result.night + " night";
        textList[5].innerHTML = result.date;
        textList[6].innerHTML = result.price + " baht";
        }
        var auth = getauth();
        if (auth) {
            if (auth.currentUser.uid==result.id_user || auth.currentUser.uid==result.id_landload) {
                document.getElementById("delete").style.display = "";
            }
        }
    })
}
load()

async function clickDelete () {
    var href = window.location.href
    var id_contract = href.slice(href.indexOf("?")+1,href.length)
    await delete_contract(id_contract).then((result) => {
        window.history.back()
    })
}
window.clickDelete = clickDelete;