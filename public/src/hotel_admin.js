import { signout, permission, getauth } from "./auth.js";
import {get_user, set_user } from "./firestoreAPI.js";

function signOut() {
    signout();
    (async() => {
        while(localStorage.getItem("isAuth") && localStorage.getItem("user_detail")) {
            console.log("wait...");
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        window.location.href = "../index.html"    
    })();
}

window.signOut = signOut;

async function  load() {
    
    // await permission("hotel_admin").then((result) => {
    //     console.log(result);
    //     if (result!=true) window.location.href = "../web/signin.html";
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

        var nameType = document.getElementById("na");
        var emailType = document.getElementById("email");
        var phoneType = document.getElementById("Phonnumber");
        var addressType = document.getElementById("Adrress");

        nameType.value = result.name;
        emailType.value = result.email ? result.email : "";
        phoneType.value = result.phone ? result.phone : "";
        addressType.value = result.address ? result.address : "";
        nameType.readOnly = true;
        emailType.readOnly = true;
        phoneType.readOnly = true;
        addressType.readOnly = true;
    })

}
load()

async function clickEdit(option) {
    var editBut = document.getElementById("but1");
    var saveBut = document.getElementById("but2");
    var cancelBut = document.getElementById("but3");
    var nameType = document.getElementById("na");
    var emailType = document.getElementById("email");
    var phoneType = document.getElementById("Phonnumber");
    var addressType = document.getElementById("Adrress");
    var id_user = JSON.parse(localStorage.getItem("user_detail"))["id"];

    switch (option) {
        case "edit":
            editBut.style.display = "none"
            saveBut.style.display = "";
            cancelBut.style.display = "";
            nameType.readOnly = false;
            emailType.readOnly = false;
            phoneType.readOnly = false;
            addressType.readOnly = false;
            break;
        case "save":
            editBut.style.display = ""
            saveBut.style.display = "none";
            cancelBut.style.display = "none";
            await set_user(id_user, nameType.value, emailType.value, phoneType.value, addressType.value);
            var storage = JSON.parse(localStorage.getItem("user_detail"))
            storage.name = nameType.value;
            localStorage.setItem("user_detail",JSON.stringify(storage))
            load()
            break;
        case "cancel":
            editBut.style.display = ""
            saveBut.style.display = "none";
            cancelBut.style.display = "none";
            load();
            break;
        default:
            break;
    }
}
window.clickEdit = clickEdit