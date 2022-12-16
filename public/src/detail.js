import { get_hotel_list_by_id, get_user, add_contract } from "./firestoreAPI.js"

async function showDetail() {
    var href = window.location.href
    var input = href.slice(href.indexOf("?") + 1, href.length).split("&")
    var idHotel = input[0]
    load()
    document.getElementById("addNumberHere").value = input[1];
    document.getElementById("patitin").value = input[2];
    await get_hotel_list_by_id(idHotel).then((result) => {
        document.getElementById("hotel").innerHTML = result["name"];
        var rooprek = document.getElementById("rooprek");
        var roopyai = document.getElementById("roopyai");
        var url = "https://storage.googleapis.com/travalokail-55abf.appspot.com/ht" +'/'+ result.image[0];
        roopyai.innerHTML = "<img class='roopyai'src='"+url+ "'; onclick=\"window.open('"+url+"')\">";
        result.image.forEach(image => {
            var url = "https://storage.googleapis.com/travalokail-55abf.appspot.com/ht" +'/'+ image;
            var newImage = "<img class='rooprek'src='"+url+"'; onclick=\"changeroopyai('"+url+"')\">" ;
            rooprek.innerHTML += newImage;
        });
        for (var i = 0; i < result["address"].length; i++) {
            document.getElementById("address").innerHTML += " ";
            document.getElementById("address").innerHTML += result["address"][i];
        }
        for (var i = 0; i < result["facility"].length; i++) {
            document.getElementById("facility1").innerHTML += " ";
            document.getElementById("facility1").innerHTML += result["facility"][i];
        }
        get_user(result.id_landlord).then((result) => {
            document.getElementById("landlord").innerHTML += result.name;
        })
        var list = document.getElementById("number_of_customer");
        for (let i = 0; i < result["number_of_customer"].length; i++) {
            var numPeople = result["number_of_customer"][i];
            var li = document.createElement("tr");
            li.innerHTML = "<td>" + numPeople + "</td><td>" + result["price"][numPeople] + "</td>";
            list.appendChild(li);
        }
        document.getElementById("phone").innerHTML += result["phone"];
        document.getElementById("email").innerHTML += result["email"];

    })
}
showDetail()

async function load() {
    var href = window.location.href
    var idHotel = href.slice(href.indexOf("?") + 1, href.length).split("&")[0]
    var addHere = document.getElementById("addNumberHere");
    var price = new Object();

    await get_hotel_list_by_id(idHotel).then((result) => {
        for (let i = 0; i < result.number_of_customer.length; i++) {
            var newNode = document.createElement("option")
            newNode.value = result.number_of_customer[i]
            newNode.innerHTML = result.number_of_customer[i]
            addHere.appendChild(newNode);
            price[result.number_of_customer[i]] = result.price[result.number_of_customer[i]]
        }
        localStorage.setItem("priceHotel",JSON.stringify(price));
    })
}

async function clickBook(button) {
    button.value = "loading";
    button.disabled = true;
    var href = window.location.href
    var idHotel = href.slice(href.indexOf("?") + 1, href.length).split("&")[0]
    var id_landlord;
    var price = JSON.parse(localStorage.getItem("priceHotel"))
    var night = document.getElementById("number_of_night").value
    var number_of_customer = document.getElementById("addNumberHere").value
    price = price[number_of_customer]*night;
    var date = document.getElementById("patitin").value
    await get_hotel_list_by_id(idHotel).then((result) => { id_landlord = result.id_landlord})
    console.log(number_of_customer);
    localStorage.setItem("contract", "no");
    await add_contract(JSON.parse(localStorage.getItem("user_detail")).id, id_landlord, idHotel, number_of_customer, price, night, date).then((result) => {
        localStorage.setItem("id_contract",result.id)
    });
    (async () => {
        while (localStorage.getItem("contract").includes("no")) {
            console.log("wait...");
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        localStorage.setItem("contract", "no")
        document.getElementById('reserveall').style.display = 'none'
        document.getElementById('booked').style.display = ''
        button.value = "confirm";
        button.disabled = false;
    })();
}
window.clickBook = clickBook;

function changeroopyai(url) {
    document.getElementById("roopyai").firstChild.src = url;
}
window.changeroopyai = changeroopyai

function changeValueBook() {
    var price = JSON.parse(localStorage.getItem("priceHotel"))
    var night = document.getElementById("number_of_night").value
    var people = document.getElementById("addNumberHere").value
    document.getElementById("textall4").innerHTML = "price : "+price[people]*night+" baht"
}
window.changeValueBook = changeValueBook

function clickContract() {
    window.location.href = "../web/contract.html?"+localStorage.getItem("id_contract")
}
window.clickContract = clickContract;