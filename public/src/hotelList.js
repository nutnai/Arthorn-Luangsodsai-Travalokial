import { signout, permission, getauth } from "./auth.js";
import { get_user, get_hotel_list_by_landlord} from "./firestoreAPI.js";

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
        var mid = document.getElementById("mid");
        mid.innerHTML = "";
        mid.append(img);
        var parentNode = document.getElementById("yellowbox")
        get_hotel_list_by_landlord(JSON.parse(localStorage.getItem("user_detail"))["id"]).then((result) => {
            result.forEach(ht => {
                if (ht !== undefined) { 
                    var node = "<div id='whitebox' onclick=\"editHotel('"+ht.id+"')\"><div id='inform'>"
                    node += "<p>"+ht.name+"</p>";
                    var address = ""
                    ht.address.forEach(ad => {
                        address += ad+" "
                    });
                    node += "<p style=\"font-size:22px\">"+address+"</p>";
                    node += "</div></div>"
                    parentNode.innerHTML += node
                }
            });
        })
    })

}
load()

function editHotel(id) {
    window.location.href = "./hotel edit.html?"+id;
}
window.editHotel = editHotel;