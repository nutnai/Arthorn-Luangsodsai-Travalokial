// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0xpA5BpyMiRuUkPJUYSiYFIDF_WPCX4Q",
    authDomain: "travalokail.firebaseapp.com",
    projectId: "travalokail",
    storageBucket: "travalokail.appspot.com",
    messagingSenderId: "562392420774",
    appId: "1:562392420774:web:5403a53630fe7c09f83f67",
    measurementId: "G-6YNTWFPT4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);


//! Config ////////////////////////////////////////////////////////////
const user = auth.currentUser;
if (user) {
    console.log("welcome back!");
} else {
    console.log("please sign in");
}

async function usernameIsExits() {
    console.log("hi");
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    // const dbUsers = await getDocs(collection(db, "account"));
    // var exits = false;
    // if (String(username.value) != "" && String(password.value) != "") {
    //     dbUsers.forEach(element => {
    //         if (String(element.data().hashUsername) == String(username.value) &&
    //             String(element.data().hashPassword) == String(password.value)) {
    //             location.href = "../web/account.html";
    //             exits = true;
    //             return;
    //         }
    //     });
    //     if (!exits) {
    //         console.log("Not exits!");
    //         document.getElementById("isExitsText").hidden = false;
    //     }
    // }
    userSignIn(username.value, password.value);
    
}
//make function to global (use by other file)
window.usernameIsExits = usernameIsExits;
//! function //////////////////////////////////////////////////////////

//! sign up
function userRegister (username, password) {
    createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}


//! sign in
function userSignIn (username, password) {
    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
        // Signed in 
        return user.getIdToken().then(idToken => {
            // Session login endpoint is queried and the session cookie is set.
            // CSRF protection should be taken into account.
            // ...
            const csrfToken = getCookie('csrfToken')
            return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
          });
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

//! sign out
function userSignOut () {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}
//! on state change
function stateChange (user) {
    onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

  
