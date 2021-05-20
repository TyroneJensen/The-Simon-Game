var buttonColours = ["red", "blue", "green", "yellow"]; //button color array

var gamePattern = []; //array to store random game button pattern
var userClickedPattern = []; // array to store user button pattern

var started = false;
var level = 0;

//start game on key press
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//on click function to add user selection to array and initiate sounds, animations, game logic
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

//game logic function trigger on each user click
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

//game logic function
function nextSequence() {
  userClickedPattern = []; //reset user pattern
  level++; //increment level
  $("#level-title").text("Level " + level); //display current game level

  var randomNumber = Math.floor(Math.random() * 4); //select random number
  var randomChosenColour = buttonColours[randomNumber]; //use random number as index to select button color from array
  gamePattern.push(randomChosenColour); // add color to game pattern array

  //animation and sound to show game color selection
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

//play sound function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//button animation function
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//function to restart game (resets game settings to default/empty)
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
