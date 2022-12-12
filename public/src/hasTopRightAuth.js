

async function load() {
    if (localStorage.getItem("isAuth") && localStorage.getItem("user_detail")) {
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