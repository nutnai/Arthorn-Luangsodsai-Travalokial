// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, query, collection, getDocs, doc, setDoc, addDoc } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';

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
const db = getFirestore(app);

//! Config //////////////////////////////////////////////////////////

//เลือกโรงแรมตอนผู้ใช้ค้นหา                                  !
async function get_hotel_list() {
    const q = query(collection(db,"hotel_list"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}
// get_hotel_list();

function createMapPrice (number_of_customer, price){
    var ret = new Object();
    for (var i=0; i<number_of_customer.length; i++) {
        ret[number_of_customer[i]]=price[i];
    }
    return ret;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////add
//hotel
async function add_hotel_list(name, address, number_of_customer, price) {
    await addDoc(collection(db, "hotel_list"), {
        name : name,
        address : address,
        number_of_customer : number_of_customer,
        price : price
    });
}
function thotel () {
    var name = "nut";
    var address = ["home","where"];
    var number_of_customer = [2,3,4];
    var price = [200,300,400];
    add_hotel_list(name, address, number_of_customer, createMapPrice(number_of_customer,price));
}
window.thotel = thotel;

//user
async function add_user(type, name, id_img, balance) {
    await addDoc(collection(db, "user"), {
        type : type,
        name : name,
        id_img : id_img,
        balance : balance
    });
}
function tuser () {
    var type = 0;
    var name = "netty";
    var id_img = "";
    var balance = 0;
    add_user(type, name, id_img, balance);
}
window.tuser = tuser;

//


