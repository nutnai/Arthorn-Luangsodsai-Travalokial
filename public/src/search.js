import { get_hotel_list } from "/public/src/firestoreAPI.js";

function clickSearch() {
  var where = document.getElementById("w").value;
  var people = document.getElementById("people").value;
  window.location.href = "/public/web/search.html?" + where + "&" + people;
}
window.clickSearch = clickSearch;
function getDBHotel() {
  var input = window.location.href
    .slice(window.location.href.indexOf("?") + 1, window.location.href.length)
    .split("&");
  var address = decodeURIComponent(input[0].replace(/\+/g, " "));
  var number_of_customer = input[1];
  get_hotel_list(address, "", input[1]).then((result) => {
    console.log(result);

    for (let i = 0; i < result.length; i++) {
      //   document.getElementById("lowname").innerHTML = address;
      //   console.log(result[i]["number_of_customer"]);
      //   document.getElementById("lowname").innerHTML = number_of_customer;

      var block = document.getElementById("block");
      var addBlock = document.getElementById("addBlock");
      var newBlock = block.cloneNode();
      newBlock.style.top = ((i + 1) * 254).toString() + "px";
      newBlock.style.display = "";

      var idHotel = document.getElementById("idHotel");
      var newIdHotel = idHotel.cloneNode();
      newIdHotel.innerHTML = result[i]["id"];
      newBlock.appendChild(newIdHotel);

      var roop = document.getElementById("roop");
      var newRoop = roop.cloneNode();
      newRoop.style.top = (18).toString() + "px";
      newBlock.appendChild(newRoop);

      var name = document.getElementById("name");
      var newName = name.cloneNode();
      newName.style.top = (2).toString() + "px";
      newBlock.appendChild(newName);
      newName.innerHTML = result[i]["name"];

      var lownameAddress = document.getElementById("lowname");
      var newLownameAddress = lownameAddress.cloneNode();
      newLownameAddress.style.top = (60).toString() + "px";
      newBlock.appendChild(newLownameAddress);
      newLownameAddress.innerHTML = "Location : "+address;

      var lownamePrice = document.getElementById("lowname");
      var newLownamePrice = lownamePrice.cloneNode();
      newLownamePrice.style.top = (20).toString() + "px";
      newLownamePrice.style.left = (180).toString() + "px";
      newLownamePrice.style.width = (180).toString() + "px";
      newLownamePrice.style.height = (25).toString() + "px";
      newLownamePrice.style.fontSize = (25).toString() + "px";
      newLownameAddress.appendChild(newLownamePrice);
      newLownamePrice.innerHTML = "Price  :  " + result[i]["price"][number_of_customer];

      var lownamekonPak = document.getElementById("lowname");
      var newLownamekonPak = lownamekonPak.cloneNode();
      newLownamekonPak.style.top = (67).toString() + "px";
      newLownamekonPak.style.width = (100).toString() + "px";
      newLownamekonPak.style.height = (15).toString() + "px";
      newLownamekonPak.style.left = (5).toString() + "px";
      newLownameAddress.appendChild(newLownamekonPak);
      newLownamekonPak.innerHTML = "Visitor : "+number_of_customer;
      addBlock.appendChild(newBlock);
    }
  });

  // document.getElementById("name").innerHTML = name;
}
getDBHotel();
//result[i]["price"]["number_of_customer"];
function selectHotel (node) {
  window.location.href = 'detail.html?'+node.children.item(0).innerHTML
}
window.selectHotel = selectHotel;