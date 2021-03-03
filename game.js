var buttons = ["green", "red", "yellow", "blue"];
var userClicked = [];
var sequence = [];

var level = 0;
$(document).keydown(function() {
  if (level === 0) {
    nextSequence();
  }

});


function nextSequence() {
  userClicked = [];
  level++;
  levelChange(level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttons[randomNumber];
  sequence.push(randomColor);
  animatePress(randomColor);
  playSound(randomColor);
}

$(".btn").on('click', function() {
var current=$(this).attr("id");
  userClicked.push(current);
  playSound(current);
  animatePress(current);
  evaluate(userClicked.length - 1);
});


function evaluate(currentLevel) {
  if (userClicked[currentLevel] !== sequence[currentLevel]) {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    restart();
    return false;
  } else if (currentLevel === sequence.length - 1) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}



function restart() {
  level = 0;
  sequence = [];
  $("h1").text("Game Over, Press Any Key to Restart");
}


function levelChange(level) {
  $("h1").text("Level " + level);

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(abc) {
  var audio = new Audio("sounds/" + abc + ".mp3");
  audio.play();
}
