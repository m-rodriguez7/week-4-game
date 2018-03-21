// var rpg = {} not sure i want to make game one whole object



var obi = {
    name: "Obi-Wan Kenobi",
    health: 120,
    attack: 8,
    img: "<img src ='assets/images/obi.jpg' width='200' height='200' alt='obiwan'>"
};

var quigon = {
    name: "Qui-Gon Jinn",
    health: 100,
    attack: 5, //double check attack with the video
    img: "<img src ='assets/images/quigon.jpg' width='200' height='200' alt='quigon'>"
}

var sid = {
    name: "Darth Sidious",
    health: 150,
    attack: 5, //double check
    img: "<img src ='assets/images/sid.png' width='200' height='200' alt='sid'>"
}

var maul = {
    name: "Darth Maul",
    health: 180,
    attack: 5, //double check
    img: "<img src ='assets/images/maul.jpg' width='200' height='200' alt='maul'>"
}

var characters = [obi, quigon, sid, maul];


var initialize = function () {
    var i = 0; // i start by using the empty div that is already in the html
    $("#initial").find(".name").html(characters[i].name);
    $("#initial").find(".img").html(characters[i].img);
    $("#initial").find(".health").html(characters[i].health);
    i++;
    while (i<characters.length) {
        var chardiv = $("#clone").clone();
        chardiv.find(".name").html(characters[i].name);
        chardiv.find(".img").html(characters[i].img);
        chardiv.find(".health").html(characters[i].health)
        $("#initial").append(chardiv);
        console.log("div appended?");
        i++;
    } 
}

initialize(); // this starts the game by displaying the playable characters at the top of the page





// insert onclick functions here
$(".img").on("click", function () {
    console.log(this.name);
    if (this.name === "Obi-Wan Kenobi") {
        console.log("click working");
    } else {
        console.log("click not working");
    }
})

























//$("#obiwan").html(obiWan.html);
//$("#quigon").html(quigon.html);
//$("#sid").html(sid.html);
//$("#maul").html(maul.html);



//<div class="work">
        //<img src="assets/images/technics-q-c-640-480-2.jpg" //alt="RPG Game">
//
//        <h3>RPG Game</h3>
//      </div>


//  $("#empty-div").html("<h1>Hello friends!</h1>");
// USE THIS SNIPPET TO ADD TO HTML BC FUK IT
// any content that was in that element is completely replaced by the new content

// use the following code to append new divs, add classes, etc
    //var newDiv = $("<div>");
    //newDiv.text("A pleasure to meet you!");
    //$("#empty-div").append(newDiv); same as appendchild
    //newDiv.attr("class", "fancy");
