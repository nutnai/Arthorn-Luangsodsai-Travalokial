    function clickSearch() {
        var where = document.getElementById("w").value;
        var people = document.getElementById("people").value;
        window.location.href='/public/web/search.html?'+where+"&"+people;
    }