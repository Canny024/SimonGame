let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// GAME FUNCTIONS

// To play sound
function playSound(name) {
    let audio = new Audio(name + ".mp3");
    audio.play();
}

// To restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

//   To add animation to the active button
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//   To generate random color and change the heading and level
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//   To check the answer by user
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press RESTART button");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $(".restart").text("RESTART");
        startOver();
    }
}


// EVENT TO START THE GAME
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
$(".restart").click(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(".restart").text("GAME STARTED");
    }
});

// GAME ENGINE - MAIN EVENT 

$(".btn").click(function () {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});
