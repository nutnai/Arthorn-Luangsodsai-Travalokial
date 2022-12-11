import get_hotel_list from "/pub"

function getDBHotel () {
    var input = window.location.href.slice(window.location.href.indexOf("?")+1,window.location.href.length).split("&")
    console.log(input);
    var str = decodeURIComponent(escape(input[0]));
    console.log(str);
    get_hotel_list(input[0],"",input[1])
}
getDBHotel();