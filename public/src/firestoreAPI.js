// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, query, collection, getDocs, doc, setDoc, addDoc, where, getDoc, updateDoc} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';

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

//! Config //////////////////////////////////////////////////////////////////////////////////////////////////////////get

//เลือกโรงแรมตอนผู้ใช้ค้นหา                                  !
export async function get_hotel_list(address, time, number_of_customer) {
    const q = query(collection(db,"hotel_list"), where('address', 'array-contains', address));
    const querySnapshot = await getDocs(q);
    var ret = []
    querySnapshot.forEach((doc) => {
        var data = doc.data();
        data["id"] = doc.id;
        ret.push(data);
        // console.log(doc.id, " => ", doc.data());
    });
    return ret;
}
// console.log(get_hotel_list("หัวลำโพง"));

//ดูข้อมูลคอมเมนต์ตอนแสดงรายละเอียดโรงแรม
export async function get_review (id_review) {
    const q = query(collection(db, "review_list"));
    const querySnapshot = await getDoc(doc(db, "review_list", id_review));
    return querySnapshot.data()
}
// get_review("Z15fDv3tWZevZhSrUG0p").then((result)=>{console.log(result);})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////add
function createMapPrice (number_of_customer, price){
    var ret = new Object();
    for (var i=0; i<number_of_customer.length; i++) {
        ret[number_of_customer[i]]=price[i];
    }
    return ret;
}
async function getStarFromReview (id_review) {
    const reviewSnapshot = await getDoc(doc(db, "review_list", id_review));
    return reviewSnapshot.data().star;
}
async function calculateStar (id_hotel, comment_list) {
    const hotelSnapshot = await getDoc(doc(db, "hotel_list", id_hotel));
    var sumStar = 0
    comment_list.forEach(review => {
        sumStar += review.star;
    });
    sumStar /= comment_list.length;
    sumStar = sumStar.toFixed(2);
    await updateDoc(doc(db, "hotel_list", id_hotel), {star : sumStar});
}
async function addReview(id_review, id_hotel) {
    const hotelSnapshot = await getDoc(doc(db, "hotel_list", id_hotel));
    const reviewlSnapshot = await getDoc(doc(db, "review_list", id_review));
    var comment_list = hotelSnapshot.data().review
    comment_list.push({id:id_review, star:reviewlSnapshot.data().star})
    await updateDoc(doc(db, "hotel_list", id_hotel), {review : comment_list});
    calculateStar(id_hotel, comment_list)
}
////////////////////////////////////////config
//hotel
async function add_hotel_list(name, address, number_of_customer, price, facility, review, image, piority, star, id_landlord) {
    await addDoc(collection(db, "hotel_list"), {
        name : name,
        address : address,
        number_of_customer : number_of_customer,
        price : price,
        facility : facility,
        review : review,
        image : image,
        piority : piority,
        star : star,
        id_landlord : id_landlord
    });
}
async function thotel () {
    var name = "ไอเฮา";
    var address = ["หัวลำโพง","กรุงเทพ"];
    var number_of_customer = [1,2,4];
    var price = [600,700,1200];
    var facility = ["เตียง", "ทีวี", "ตู้เย็น", "แอร์"];
    var review = [await add_review("zqF2ASPu6tISEcg7dkyC",5.0,"ดีคับ")];
    var image = ["ht_1", "ht_2", "ht_3"];
    var piority = 0;
    var star = 5;
    var id_landlord = "Aiu7zv5DXjBFfWHfE1co";
    add_hotel_list(name, address, number_of_customer, createMapPrice(number_of_customer,price), facility, review, image, piority, star, id_landlord);
    //
}
window.thotel = thotel;

//review
async function add_review (id_user_review, star, comment, id_hotel) {
    var ret;
    await addDoc(collection(db, "review_list"), {
        id_user_review : id_user_review,
        star : star,
        comment : comment
    }).then((doc) => {
        addReview(doc.id, id_hotel);
        ret = doc.id
    });
    return ret;
}
async function treview () {
    var id_user_review = "zqF2ASPu6tISEcg7dkyC";
    var star = 4.69;
    var comment = "มีแบบ15นาทีมั้ยครับ";
    add_review(id_user_review, star, comment, "cen38MZ8YL0GSxk37Kq5")
}
window.treview = treview;
//user
async function add_user(type, name, id_img) {
    await addDoc(collection(db, "user"), {
        type : type,
        name : name,
        id_img : id_img,
    });
}
function tuser () {
    var type = 1;
    var name = "ดิวคับ";
    var id_img = "pf_deww.jpg";
    add_user(type, name, id_img);
}
window.tuser = tuser;

//

function tt () {
    addReview("3jfEFge1VGFnWFFBbfHs", "kL4RXrXy3gSdfUxzNv2a")
}
window.tt = tt;

////////////////////////////////////////////////////////////////////////////////////////////////set

