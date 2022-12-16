import { signout, permission, getauth } from "./auth.js";
import { get_user, get_contract, get_contract_list, get_hotel_list_by_id } from "./firestoreAPI.js";

async function load() {

    // await permission("profile").then((result) => {
    //     console.log(result);
    //     if (result!=true) window.location.href = "/public/web/signin.html";
    // })

    const user = JSON.parse(localStorage.getItem("user_detail"))
    get_user(user.id).then((result) => {
        var img = document.createElement("img");
        var image = result.image
        if (!result.image.includes("https")) {
            image = "https://storage.googleapis.com/travalokail-55abf.appspot.com/pf/" + image
        }
        img.src = image
        img.style.width = "100%"
        img.style.height = "100%"
        img.style.borderRadius = "100%"
        document.getElementById("mid").appendChild(img)

        get_contract_list(JSON.parse(localStorage.getItem("user_detail")).id, null).then((result) => {
            console.log(result);
            var parentNode = document.getElementById("yellowbox")
            result.forEach(data => {
                get_hotel_list_by_id(data.id_hotel).then((ht) => {
                    if (ht !== undefined) {
                        var node = "<div id='whitebox' onclick=\"seeContract('"+data.id+"')\"><div id='inform'>"
                        node += "<p>"+ht.name+"</p>";
                        node += "<p>"+data.number_of_customer+" person(s) / "+data.price+" baht / "+data.night+" night"+"</p>";
                        node += "<p>"+data.date+"</p>";
                        node += "</div></div>"
                        parentNode.innerHTML += node
                    }
                });
            });
        })


    })

}
load()

function seeContract(id) {
    window.location.href = "./contract.html?"+id;
}
window.seeContract = seeContract;