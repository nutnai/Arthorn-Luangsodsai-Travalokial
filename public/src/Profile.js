import { signout } from "./auth.js";

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