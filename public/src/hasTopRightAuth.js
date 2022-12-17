import {getauth, permission, authed} from "./auth.js"

async function load() {
    if (authed()) {
        var user = JSON.parse(localStorage.getItem("user_detail"))
        console.log("I'm in!");
        if (document.getElementById("auth0") != null){
            document.getElementById("auth0").style.display = "none"
            document.getElementById("auth1").style.display = ""
            var img = document.createElement("img");
            var image = user.image
            if (!user.image.includes("https")) {
                image = "https://storage.googleapis.com/travalokail-55abf.appspot.com/pf/" + image
            }
            img.src = image
            img.style.width = "100%"
            img.style.height = "100%"
            img.style.borderRadius = "100%"
            document.getElementById("roob").appendChild(img)
            document.getElementById("username").innerHTML = user.name
        }
    } else {
        console.log("Please sign in!")
        if (document.getElementById("auth0") != null) {
            document.getElementById("auth0").style.display = ""
            document.getElementById("auth1").style.display = "none"
        }
    }
}
load()

async function clickProfile() {
    console.log("click profile!");
    var config = "";
    if (!window.location.href.includes("web"))config = "/web"
    permission("clickProfile").then((result) => {
        if (result == 0) {
            window.location.href = "."+config+"/Profile.html";
        } else if (result == 1) {
            window.location.href = "."+config+"/hotel admin.html";
        } else if (result == 2) {
            window.location.href = "."+config+"/dashboard.html";
        } else {
            window.location.href = "."+config+"/signin.html"
        }
    })
    
}
window.clickProfile = clickProfile