// var rpg = {} not sure i want to make game one whole object
var obi = {
    id: "obi", // used to point to specific div in html
    name: "Obi-Wan Kenobi",
    health: 120,
    counter: 8,
    img: "<img src ='assets/images/obi.jpg' width='200' height='200' alt='obiwan'>"
};

var qui = {
    id: "qui",
    name: "Qui-Gon Jinn",
    health: 100,
    attack: 5, //double check attack with the video
    counter: 5,
    img: "<img src ='assets/images/quigon.jpg' width='200' height='200' alt='quigon'>"
}

var sid = {
    id: "sid",
    name: "Darth Sidious",
    health: 150,
    counter: 20, //double check
    img: "<img src ='assets/images/sid.png' width='200' height='200' alt='sid'>"
}

var maul = {
    id: "maul",
    name: "Darth Maul",
    health: 180,
    counter: 25, //double check
    img: "<img src ='assets/images/maul.jpg' width='200' height='200' alt='maul'>"
}

var characters = [obi, qui, sid, maul];
var defEmpty = true;
var playerAttack = 10; // global attack for character chosen? It wasn't clear whether everyone should have their own scaling attack value.
var enemiesDefeated = false;
var lost = false;

var initialize = function () { // fills out divs in "choose character area". those divs will be appended to other places on the page instead of making new instances everywhere :)
    for (var i=0; i<characters.length;i++) {
        $("#"+ characters[i].id +"").find(".name").html("<p>"+characters[i].name+"</p>");
        $("#"+ characters[i].id +"").find(".img").html(characters[i].img);
        $("#"+ characters[i].id +"").find(".health").html("<p>"+characters[i].health+"</p>");
    }

    // empty out all containers on the page
    /* $(".yourChar").empty();
    $(".enemySelect").empty();
    $(".defender").empty();
    DO NOT EMPTY DIVS, empty literally removes them from the page */
}

var reset = function () {
    // reset default values
    obi.health = 120;
    qui.health = 100;
    sid.health = 150;
    maul.health = 180;
    defEmpty = true;
    playerAttack = 10;
    enemiesDefeated = false;
    lost = false;
}

initialize(); // this starts the game by displaying the playable characters at the top of the page, also used to reset game. 
$(".hideHere").hide(); // this is where defeated enemies go




// insert onclick functions here



// Character Select
$("#initial").on("click", ".img", function () {
    console.log($(this).parent().parent().attr("id")); // not so elegant, but I want to get the id of the column from the image that I am clicking on. Should also work for .name/ .health if need be but image clicking is easier for me.
    // x =  $(this).parent().parent().attr("id")
    if ($(this).parent().parent().attr("id") === "obi") {
        // append div to "yourChar" column.
        console.log("chose obi");
        $(".yourChar").append($("#obi"));
        $(".enemySelect").append($("#qui"));
        $(".enemySelect").append($("#sid"));
        $(".enemySelect").append($("#maul"));
        return; // need to end this after everything gets moved in each case
    } else if ($(this).parent().parent().attr("id") === "qui") {
        console.log("chose qui");
        $(".yourChar").append($("#qui"));
        $(".enemySelect").append($("#obi"));
        $(".enemySelect").append($("#sid"));
        $(".enemySelect").append($("#maul"));
        return;
    } else if ($(this).parent().parent().attr("id") === "sid") {
        console.log("chose sid");
        $(".yourChar").append($("#sid"));
        $(".enemySelect").append($("#obi"));
        $(".enemySelect").append($("#qui"));
        $(".enemySelect").append($("#maul"));
        return;
    } else if ($(this).parent().parent().attr("id") === "maul"); {
        console.log("chose maul");
        $(".yourChar").append($("#maul"));
        $(".enemySelect").append($("#obi"));
        $(".enemySelect").append($("#qui"));
        $(".enemySelect").append($("#sid"));
        return; // the last if statement always ran even when x !== "obi"
    }
});


// Enemy Select
$(".enemySelect").on("click", ".img", function () {
    x =  $(this).parent().parent().attr("id")
    if (!defEmpty) {
        return;
    } else if (x === "obi") { // need to check whether the spot is empty, maybe add a function to "put back" an enemy? coule be problematic/too much
        $(".defender").append($("#obi"));
        defEmpty = false;
        return;
    } else if (x === "qui") {
        $(".defender").append($("#qui"));
        defEmpty = false;
        return;
    } else if (x === "sid") {
        $(".defender").append($("#sid"));
        defEmpty = false;
        return;
    } else if (x === "maul") {
        $(".defender").append($("#maul"))
        defEmpty = false;
        return;
    }
    
});

$("#attack").on("click", function() {
    // check if defender has an enemy *CHECK*
        // if not, update DOM to tell user they need to pick one *CHECK*
    // if defender has an enemy, and its health is above 0, use characters current attack, the global variable, and decrease the enemy hp. *CHECK*
    // add 8 to the global attack variable. CHECK*
    // then, use "counterattck" property from the defender to decrease the player hp. *CHECK*
    // UPDATE DOM WITH NEW HP VALUES *CHECK*
    // UPDATE DOM WITH LINES STATING THE ACTIONS *CHECK*
    // if user hp falls to zero or below, update DOM with game over message, AND RESTART button (define restart button above or below using initialize) *CHECK*
    // if defender hp falls to zero or below: empty the div, set defEmpty to false. *CHECK*
    enemy = $(".defender").children().attr("id"); // use to refer to DOM id's ONLY
    player = $(".yourChar").children().attr("id");
    // used to find out who is in the defender div, and use their attributes
    console.log(player);
    console.log(enemy);
    if (defEmpty) { // is there a defender?
        $(".battle").html("<p>There is no defender. Choose next enemy before atacking. If the game is over, click Restart.</p>");
        return;
    } else if (lost) {
        return; // so you can't keep attacking after losing
    } else if (eval(enemy).health > 0) { // check enemy health
        console.log("eval works");
        eval(enemy).health = eval(enemy).health - playerAttack; // player attacks
        // update enemy health in DOM
        $(".defender").find(".health").html("<p>"+eval(enemy).health+"</p>");
        if (eval(enemy).health <= 0) { // check if enemy is defeated
            // increase playerAttack by 8
            playerAttack += 8;
            // empty defender div
            console.log("enemy defeated");
            $(".battle").html("<p>You have defeated the enemy! Click the next one to continue the fight.</p>");
            $("#"+enemy+"").appendTo($(".hideHere"));
            defEmpty = true; // the defender div is now empty
            if ($(".enemySelect").text().length === 0) {
                console.log("is empty");
                $(".battle").html("<p>You win! Click Restart to play again.</p>");
                $(".restart").html("<button type='button' class='btn btn-danger' id ='restart'>Restart?</button>")
                lost = true; // just to stop anything from happening with the attack button
                return;
            } else {
                console.log("is not empty");
            }
        } else { 
        eval(player).health = eval(player).health - eval(enemy).counter; // enemy attacks
        // update player health in DOM
        $(".yourChar").find(".health").html("<p>"+eval(player).health+"</p>");
        // update battle message in DOM
        if (eval(player).health <= 0) { // check player health MOVE THIS
            console.log("player lost");
            $(".battle").html("<p>You lost! Click Restart to try again</p>");
            $(".restart").html("<button type='button' class='btn btn-danger' id ='restart'>Restart?</button>")
            lost = true;
            return;
        }
        $(".battle").html(
            "<p>You attacked "+eval(enemy).name+" for "+playerAttack+" damage</p><p>"+eval(enemy).name+" attacked you for "+eval(enemy).counter+" damage.</p>"
        );
        // increase playerAttack by 10
        playerAttack += 10;
        }        
    }    
});

// restart game button
$(".restart").on("click", function(){
    // needs a function to find all the divs first, THEN move them back to their locations
    // find them all by id or class and move them back to their original locations (#initialize)
    // probably dont want to use the initialize function
    $("#initial").append($("#obi"));
    $("#initial").append($("#qui"));
    $("#initial").append($("#sid"));
    $("#initial").append($("#maul"));
    reset(); // puts divs back in place
    initialize(); // updates DOM with original values
    $(".battle").empty();
    $(".restart").empty();
});