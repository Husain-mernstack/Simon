var buttonColor = ["red","blue","green","yellow"];
var gamePatern = [];
var userClickedPattern = [];
var started = false;
var level=0;
function nextSequence() {
    userClickedPattern = [];
    level++;
var number = Math.floor(Math.random()*4);
var randomChoosenColor = buttonColor[number];
gamePatern.push(randomChoosenColor);
$("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
playSound(randomChoosenColor);
$("h1").text("level " + level);
}
    $(".btn").click(handler);

    function handler(event){
        var userChoosenColor = event.target.id;
        userClickedPattern.push(userChoosenColor);
        playSound(userChoosenColor);
        animatePress(userChoosenColor);
        checkAnswer2(userClickedPattern.length-1);
      /*   if(checkAnswer()){
           setTimeout(function () {
                    nextSequence();
                  }, 1000);
        }
       else{
        $("h1").text("Game Over");
        level = 0;
        started = false;
       } */

    }

    function playSound(color){
        var sound = new Audio('sounds/' +color + '.mp3');
        sound.play();
    }
    
    function animatePress(color){
            $("#" + color).addClass("pressed");
        setTimeout(function() {
            $("#" + color).removeClass("pressed");
        }, 100);
    
}
$("body").keydown(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

   /*  function checkAnswer(){
        if(userClickedPattern===gamePatern){
            return true;
        }
        else{
            return false;
        }
    } */
    function checkAnswer2(currentLevel){
        if(gamePatern[currentLevel] === userClickedPattern[currentLevel]){
            console.log("Success");
            if(userClickedPattern.length === gamePatern.length){
                setTimeout(function () {
                    nextSequence();
                  }, 1000);
            }
        }
        else{
            console.log("Failure");
            playSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart")
            setTimeout(function () {
                $("body").removeClass("game-over");
              }, 200);
              startOver();
        }
    }

    function startOver(){
        level = 0;
        started = false;
        gamePatern = [];
    }
