import {get_hotel_list} from "/public/src/firestoreAPI.js"

function getDBHotel () {
    // var input = window.location.href.slice(window.location.href.indexOf("?")+1,window.location.href.length).split("&")
    // console.log(input);
    // var str = decodeURIComponent(escape(input[0]));
    // console.log(str);
    // get_hotel_list(input[0],"",input[1])

    // let name = input[0];
    // let guest = input[1];
    get_hotel_list("nut","","2").then((result)=>{
        console.log(result);
        for(let i=0; i<result.length;i++ ){
            document.getElementById("name").innerHTML = result["address"];

        }



    })
    
    // document.getElementById("name").innerHTML = name;




}
getDBHotel();




