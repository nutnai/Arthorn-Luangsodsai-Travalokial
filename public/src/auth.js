// // Import the functions you need from the SDKs you need

import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, setPersistence, inMemoryPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import { get_user, add_user } from "./firestoreAPI.js";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxO7oivFNLewkGDGYRNXoCuykawK00SHU",
  authDomain: "travalokail-55abf.firebaseapp.com",
  projectId: "travalokail-55abf",
  storageBucket: "travalokail-55abf.appspot.com",
  messagingSenderId: "798421668052",
  appId: "1:798421668052:web:0ad6b5ca6239d2a7d4ab41",
  measurementId: "G-GNG1NY8VK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);


//! Config ////////////////////////////////////////////////////////////
// async function usera(){
//   return await auth.currentUser
// }
// if (usera()) {
//     console.log("welcome back!");
// } else {
//     console.log("please sign in");
// }

// async function usernameIsExits() {
//     var username = document.getElementById("username");
//     var password = document.getElementById("password");
//     const dbUsers = await getDocs(collection(db, "account"));
//     var exits = false;
//     if (String(username.value) != "" && String(password.value) != "") {
//         dbUsers.forEach(element => {
//             if (String(element.data().hashUsername) == String(username.value) &&
//                 String(element.data().hashPassword) == String(password.value)) {
//                 location.href = "../web/account.html";
//                 exits = true;
//                 return user.getIdToken().then(idToken => {
//                     // Session login endpoint is queried and the session cookie is set.
//                     // CSRF protection should be taken into account.
//                     // ...
//                     const csrfToken = getCookie('csrfToken')
//                     return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
//                 });
//                 return;
//             }
//         });
//         if (!exits) {
//             console.log("Not exits!");
//             document.getElementById("isExitsText").hidden = false;
//         }
//     }
//     // userSignIn(username.value, password.value);

// }
// //make function to global (use by other file)
// window.usernameIsExits = usernameIsExits;
// //! function //////////////////////////////////////////////////////////

// //! sign up
// function userRegister (username, password) {
//     createUserWithEmailAndPassword(auth, username, password)
//     .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//     });
// }


// //! sign in
// function userSignIn (username, password) {
//     signInWithEmailAndPassword(auth, username, password)
//     .then((userCredential) => {
//         // Signed in 
//         return user.getIdToken().then(idToken => {
//             // Session login endpoint is queried and the session cookie is set.
//             // CSRF protection should be taken into account.
//             // ...
//             const csrfToken = getCookie('csrfToken')
//             return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
//           });

//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//     });
// }

// //! sign out
// function userSignOut () {
//     signOut(auth).then(() => {
//         // Sign-out successful.
//       }).catch((error) => {
//         // An error happened.
//       });
// }
// //! on state change
// function stateChange (user) {
//     onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });
// }



export function signin() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      get_user(result.user.uid).then((user) => {
        if (user !== undefined) {
          console.log("welcome back, " + user.name);
          localStorage.setItem("isAuth", "yes");
          localStorage.setItem("user_detail",JSON.stringify({id:user.id, name:user.name, image:user.image}))
        } else {
          console.log("First time? welcome, "+result.user.displayName);
          add_user(result.user.uid, 0, result.user.displayName, result.user.photoURL)
          localStorage.setItem("isAuth", "yes");
          localStorage.setItem("user_detail",JSON.stringify({id:result.user.uid, name:result.user.displayName, image:result.user.photoURL}))
        }
      })
    }).catch((error) => {
    });
}
window.signin = signin;

async function tryToGetAuth() {
  var auth = await getAuth();
  return auth;
}

export function signout() {
  if (!localStorage.getItem("isAuth")) {
    console.log("please sign in");
  } else {
    tryToGetAuth().then((auth) => {
      signOut(auth).then(() => {
        console.log("see you later");
        localStorage.removeItem("isAuth");
        localStorage.removeItem("user_detail");
      }).catch((error) => {

      });
    });
  }
}
window.signout = signout;

export function getauth() {
  console.log(getAuth());
  if (!localStorage.getItem("isAuth") || !localStorage.getItem("user_detail")) {
    console.log("please sign in");
  } else {
    tryToGetAuth().then((auth) => {
      console.log("I am " + auth.currentUser.displayName);
    });
  }

}
window.getauth = getauth;