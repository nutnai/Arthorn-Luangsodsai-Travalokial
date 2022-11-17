// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
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
const db = getFirestore(app);

//! Config //////////////////////////////////////////////////////////

async function getUsers(db) {
    try {
        const citiesCol = collection(db, 'account');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        cityList.forEach(element => {
            console.log(element);
        });
    } catch (e) {
        console.error(e);
    }
}
getUsers(db);