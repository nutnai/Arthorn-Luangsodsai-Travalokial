import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, setPersistence, inMemoryPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// // Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';

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



function signin() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("welcome back, " + user.displayName);
      localStorage.setItem("isAuth", "yes");
      console.log(auth);
    }).catch((error) => {
    });

  // setPersistence(auth, inMemoryPersistence)
  //   .then(() => {
  //     return signInWithPopup(auth, provider).then((result) => {
  //       const user = result.user;
  //       console.log("welcome back, " + user.displayName);
  //     });
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });
}
window.signin = signin;

async function tryToGetAuth() {
  var auth = await getAuth();
  return auth;
}

function signout() {
  if (!localStorage.getItem("isAuth")) {
    console.log("please sign in");
  } else {
    tryToGetAuth().then((auth) => {
      signOut(auth).then(() => {
        console.log("see you later");
        localStorage.removeItem("isAuth");
      }).catch((error) => {

      });
    });
  }
}
window.signout = signout;

export function getauth() {
  console.log(getAuth());
  if (!localStorage.getItem("isAuth")) {
    console.log("please sign in");
    return false;
  } else {
    tryToGetAuth().then((auth) => {
      console.log("I am " + auth.currentUser.displayName);
      return true;
    });
  }

}
window.getauth = getauth;

var dict = {name:'nutnai', age:19};
console.log(dict);
var str = JSON.stringify(dict);
window.localStorage.setItem("dict",str)
console.log(str);
var newDic = JSON.parse(window.localStorage.getItem("dict"))
console.log(newDic);
console.log(newDic["name"]);