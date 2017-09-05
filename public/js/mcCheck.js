const request = require('request-promise');

const remote = require('electron').remote;

function init() {
    document.getElementById("min-btn").addEventListener("click", function (e) {
        const window = remote.getCurrentWindow();
        window.minimize();
    });

    document.getElementById("close-btn").addEventListener("click", function (e) {
        const window = remote.getCurrentWindow();
        window.close();
    });
}

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        init();
    }
};
$("#check").click(function (e) {
    let arrayOfLines = $('#userlist').val().split('\n');
    $.each(arrayOfLines, function (index, user) {
        let options = {
            url: 'https://api.mojang.com/users/profiles/minecraft/' + user,
            method: 'GET',
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
            }
        };

        request(options)
            .then(function(response){
                let body = response.body;
                if (response.statusCode === 204) {
                    addToTable(user, false)
                } else if (response.statusCode === 200 && !$("#onlyInValid").is(':checked')) {
                    addToTable(body.name, true)
                }
            })
            .catch(function(err){
                console.log("An error happened: %s", err)
            })
    });
});

$("#clear").click(function(e){
    clear();
});

function addToTable(user, paid) {
    if (paid === false) {
        $("#resultsBody").append("<tr><td>" + user + "</td><td style='color: red;'>False</td>");
    } else {
        $("#resultsBody").append("<tr><td>" + user + "</td><td style='color: green;'>True</td>");
    }

}

function clear(){
    $("#resultsBody").empty();
}