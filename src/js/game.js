
var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
console.log($(document).width());
if ($(document).width() > 980) {
    startButttonClicked();
    keyBoardClicked();
    buttonClick();
} else {
    $("#level-title").hide();
    startButttonClicked();
    keyBoardClicked();
    buttonClick();
}
function keyBoardClicked() {
    $(document).keypress(function (event) {
        if (event.key == "s") {
            setTimeout(() => {
                gamePattern = [];
                nextSequence()
            }, 900);
            level = 0;
        } else if (event.key == "1" || event.key == "2" || event.key == "3" || event.key == "4") {
            var pressedColorName = $("." + event.key).attr("id");
            colorName = pressedColorName;
            userClickedPattern.push(colorName);
            playSound(colorName);
            animatePress(colorName);
            checkAnswer(userClickedPattern.length - 1);

        } else {
            console.log("wrong");
        }
    });
}
function startButttonClicked() {
    $(".start-btn").on("click", function () {
        console.log("clicked");
        setTimeout(() => {
            $("#level-title").show();
            gamePattern = [];
            nextSequence()
        }, 900);
        level = 0
    })
}
function buttonClick() {
    $(".btn").click(function () {
        var colorName = $(this).attr("id")
        userClickedPattern.push(colorName);
        playSound(colorName);
        animatePress(colorName);
        checkAnswer(userClickedPattern.length - 1);
    });
}
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
        $("#level-title").text("Game Over!!\nPress \"S\" to Restart");
        if ($(document).width() > 980) {
            $(".start-btn").html("click to restart game");
            $(".start-btn").show();

        }else{
            $("h1").hide();
            $(".start-btn").html("click to restart game");
            $(".start-btn").show();
        }
    }
}
function nextSequence() {

    $(".start-btn").hide();

    userClickedPattern = [];

    level = level + 1;

    $("#level-title").text("Level " + level);

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