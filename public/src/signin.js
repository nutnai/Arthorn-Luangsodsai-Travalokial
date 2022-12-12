import { signin } from "./auth.js";

function signIn() {
    signin();
    (async() => {
        while(!localStorage.getItem("isAuth") || !localStorage.getItem("user_detail")) {
            console.log("wait...");
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        window.location.href = "/public/index.html"    
    })();
}

window.signIn = signIn;