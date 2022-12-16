function clickSearch() {
    var where = document.getElementById("w").value;
    var people = document.getElementById("people").value;
    var date = document.getElementById("patitin").value;
    if (people == "") people = "1"
    if (date == ""){
        const dateNow = new Date();
        date = dateNow.getUTCFullYear()+"-"+(dateNow.getUTCMonth()+1)+"-"+dateNow.getUTCDate();
    }
    if (where != "") window.location.href = './web/search.html?' + where + "&" + people+"&"+date;
}

