
var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
$(document).keypress(function (event) {
    if (event.key =="s") {
        nextSequence();
        level = 0;
    } else if (event.key =="g" || event.key =="r" || event.key =="y" || event.key =="b" ){
            var pressedColorName = $("." + event.key).attr("id");
            colorName = pressedColorName;
            userClickedPattern.push(colorName);
            playSound(colorName);
            animatePress(colorName);
            checkAnswer(userClickedPattern.length - 1);

    }else{
        console.log("wrong");
    }
    });
$(".btn").click(function () {
    var colorName = $(this).attr("id")
    userClickedPattern.push(colorName);
    playSound(colorName);
    animatePress(colorName);
    checkAnswer(userClickedPattern.length - 1);
})
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);
        gamePattern = [];
        level = 0;
        $("#level-title").text("Game Over!!\nPress \"S\" to Continue");

    }
}

function nextSequence() {

    userClickedPattern = [];
    
    level = level + 1;

    $("#level-title").text("Lever " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChoosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChoosenColor)

    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);
}

function playSound(key) {

    var sound = new Audio("src/sounds/" + key + ".mp3")
    $(this).attr("id")
    sound.play();

}
function animatePress(key) {
    $("#" + key).addClass("pressed");
    setTimeout(function () {
        $("#" + key).removeClass("pressed");
    }, 100)
}