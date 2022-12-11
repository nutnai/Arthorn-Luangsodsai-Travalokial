import {get_hotel_list} from "/public/src/firestoreAPI.js"

function clickSearch() {
    var where = document.getElementById("w").value;
    var people = document.getElementById("people").value;
    window.location.href='/public/web/search.html?'+where+"&"+people;
}
window.clickSearch = clickSearch;
function getDBHotel () {
    var input = window.location.href.slice(window.location.href.indexOf("?")+1,window.location.href.length).split("&")
    var address = decodeURIComponent(input[0].replace(/\+/g," "));
    console.log(address);
    get_hotel_list(address,"",input[1]).then((result)=>{
        console.log(result);
        for(let i=0; i<result.length;i++ ){
            document.getElementById("name").innerHTML = result["address"];

        }



    })
    
    // document.getElementById("name").innerHTML = name;




}
getDBHotel();




