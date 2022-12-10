// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';
// import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';

// web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDxO7oivFNLewkGDGYRNXoCuykawK00SHU",
//   authDomain: "travalokail-55abf.firebaseapp.com",
//   projectId: "travalokail-55abf",
//   storageBucket: "travalokail-55abf.appspot.com",
//   messagingSenderId: "798421668052",
//   appId: "1:798421668052:web:0ad6b5ca6239d2a7d4ab41",
//   measurementId: "G-GNG1NY8VK2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// const db = getFirestore(app);


// //! Config ////////////////////////////////////////////////////////////
// const user = auth.currentUser;
// if (user) {
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


import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, setPersistence, inMemoryPersistence } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

function signin() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("welcome back, " + user.displayName);
      localStorage.setItem("username",user.displayName);
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

function signout() {
  const auth = getAuth();
  const username = localStorage.getItem("username");
  localStorage.removeItem("username");
  signOut(auth).then(() => {
    if (username != null) {
      console.log("see you later, " + username);
    } else {
      console.log("please sign in");
    }
  }).catch((error) => {
    // An error happened.
  });
}
window.signout = signout;

function getauth() {
  const username = localStorage.getItem("username");
  if (username == null) {
    console.log("please sign in");
  } else {
    console.log("I am "+username);
  }
  
}
window.getauth = getauth;