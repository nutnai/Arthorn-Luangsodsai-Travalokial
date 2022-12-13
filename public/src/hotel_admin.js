import { signout, permission, getauth } from "./auth.js";
import {get_user} from "./firestoreAPI.js";

function signOut() {
    signout();
    (async() => {
        while(localStorage.getItem("isAuth") && localStorage.getItem("user_detail")) {
            console.log("wait...");
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        window.location.href = "/public/index.html"    
    })();
}

window.signOut = signOut;

async function  load() {
    
    // await permission("hotel_admin").then((result) => {
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

        document.getElementById("na").value = result.name;

        if (result.email) document.getElementById("email").value = result.email;
        if (result.phone) document.getElementById("Phonnumber").value = result.phone;
        if (result.address) document.getElementById("Address").value = result.address;
    })

}
load()