
// array of colors on game
var buttonColors = ["red", "blue", "green", "yellow"];

// empty gamePattern array 
var gamePattern = [];

// empty user click array
var userClickedPattern =[];

// starting as game not started
var started = false;

// level starts at 0;
var level = 0;

// start sequence for the first keypress only
$(document).keypress(function(){
   if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
   }
});

// find which button the user clicked and pushing it to the user clicked array and playing the sound
$('.btn').click(function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    //playing sound that corelates to user chosen color
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // calling check answer and passing last chosen color
    checkAnswer(userClickedPattern.length - 1);
});

// Checking user click to see if it is correct
function checkAnswer(currentLevel){
    
        // checking if the pattern is right
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            console.log("success");

            //checking if they are done entering pattern
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence()
                  }, 1000);
            }

        } else {
            //play wrong sound
            var audio = new Audio('sounds/wrong.mp3');
            audio.play();

            //add wrong effects and text
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);

            $("#level-title").text("Game Over, Press Any Key to Restart");

            startOver();
        }
        
    }

// creating a function that chooses next random color and matches animation and sound
function nextSequence() {

    //resetting the user array for a new round
    userClickedPattern = [];

    //increase level each sequence
    level++;
    $("#level-title").text("Level " + level);

    //getting a random number 0-3
    var randomNumber = Math.floor(Math.random() * 4);

    //matching the random color to the random number
    var randomChosenColor = buttonColors[randomNumber];

    //pushing that new random color into the game pattern
    gamePattern.push(randomChosenColor);

    // creating the animation based on random color
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // play sound which coorelates to random color
    playSound(randomChosenColor);
};

// function to play soud
function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
};

//function to add css when button pressed plus adding a delay and removing the css
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

//start game over
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}