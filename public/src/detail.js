import {get_hotel_list_by_id, get_user} from "/public/src/firestoreAPI.js"

async function showDetail () {
    var href = window.location.href
    var idHotel = href.slice(href.indexOf("?")+1,href.length)
    await get_hotel_list_by_id(idHotel).then((result) => {
        console.log(result);
        console.log(result["facility"][0]);
        document.getElementById("hotel").innerHTML = result["name"];

        document.getElementById("picyaii").src = "https://storage.googleapis.com/travalokail-55abf.appspot.com/ht/"+result.image[0]
        document.getElementById("piceic1").src = "https://storage.googleapis.com/travalokail-55abf.appspot.com/ht/"+result.image[1]
        document.getElementById("piceic2").src = "https://storage.googleapis.com/travalokail-55abf.appspot.com/ht/"+result.image[2]


        for(var i=0; i<result["facility"].length;i++){
            console.log(result["facility"][i]);
            document.getElementById("facility1").innerHTML += " ";
            document.getElementById("facility1").innerHTML += result["facility"][i];
            
        }
        get_user(result.id_landlord).then((result) => {
            document.getElementById("landlord").innerHTML = result.name;
        })
        

        for(var i=0; i<result["address"].length;i++){
            console.log(result["address"][i]);
            document.getElementById("address").innerHTML += " ";
            document.getElementById("address").innerHTML += result["address"][i];
            
        }

        var peopleList = [];
        for(let i=0; i<result["number_of_customer"].length;i++){
            console.log(result["number_of_customer"][i]);
            peopleList[i] = result["number_of_customer"][i];
        }
        
        var list = document.getElementById("number_of_customer");
  
        peopleList.forEach((i) => {
        var li = document.createElement("ol");
        li.innerText = i;
        list.appendChild(li);
      });

      var priceList = [];
      for(let i=0; i<result["number_of_customer"].length;i++){
          console.log(result["price"][number_of_customer]);
          priceList[i] = result["price"][i];
      }
      
      var list1 = document.getElementById("price1");

      priceList.forEach((i) => {
      var li1 = document.createElement("ol");
      li1.innerText = i;
      list1.appendChild(li1);
    });

    for(var i=0; i<1;i++){
        console.log(result["phone"]);
        document.getElementById("phone").innerHTML += " ";
        document.getElementById("phone").innerHTML += result["phone"];
        
    }
    for(var i=0; i<1;i++){
        console.log(result["email"]);
        document.getElementById("email").innerHTML += " ";
        document.getElementById("email").innerHTML += result["email"];
        
    }








    })}





showDetail()


async function clickReserve () {
    

}
window.clickReserve = clickReserve

async function load() {
    var href = window.location.href
    var idHotel = href.slice(href.indexOf("?")+1,href.length)
    var addHere = document.getElementById("addNumberHere");
    
    await get_hotel_list_by_id(idHotel).then((result) => {
        result.number_of_customer.forEach(element => {
            var newNode = document.createElement("span")
            newNode.innerHTML = element
            newNode.style.position = "absolute"
            addHere.appendChild(newNode)
        });
        
    })
}
load()