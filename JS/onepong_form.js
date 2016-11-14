/*
This is a Pong-like game created to track userdata when being played.
The program prompts the users everytime they finish a trial/round and asks them to guess the
speed that the ball was moving. The collected data consists of the guessed speed,the
actual speed, paddle size, trial number and a participant number.
This version of Onepong sends the data in a dataform object that is then posted to
a google spreedsheet with the use of AJAX.

This program was created on a request by a client at Liverpool University
*/

//Dont be like me and use these many global variables
var WIDTH = 1200, HEIGHT = 800;
var layer1, layer2, ctx, ctx2, player, ball;
var UpArrow = 38, DownArrow = 40;
var trialNum = 0, blockNum = 0, counter = 0, guess = 0, newTrialState = false, stopTrial = true;
var ballSpeeds = [4, 5, 6, 9, 10, 11], bSpeedCount = [0,0,0,0,0,0];
var playerHeights = [100, 200, 300, 100, 200, 300];
var pause, key;
var pauseDiv = document.getElementById("pause");
var guessDiv = document.getElementById("guessDiv");
var formResults = new FormData();


//Player paddle, renders the paddle and moves it on input from UP and DOWN arrow keys
player = {
    x: null,
    y: null,
    speed: 10,
    width: 20,
    height: 0,

    //Updates the position of the object on each frame update if the UP/DOWN arrow keys are pressed
    update: function() {
        if (keystate[UpArrow]) this.y -= this.speed;
        if (keystate[DownArrow]) this.y += this.speed;

        //Prevents the object from moving outside of the canvas top and bottom borders
        if (this.y < 0) {
            this.y = 0;
        } else if (this.y > HEIGHT - this.height) {
            this.y = HEIGHT - this.height;
        }
    },
    //Draws the object on the ctx2 canvas
    draw: function() {
        ctx2.lineWidth = 3;
        ctx2.strokeRect(this.x, this.y, this.width + 2, this.height);
    }
};


//Ball object, renders the ball on the ctx2 canvas and moves it according to a set speed in pixels
ball = {
    x: null,
    y: null,
    radius: 15,
    speedX: 0,
    speedY: -0,

    update: function(){
        //Moves the ball by X and X speed for each frame update.
        this.x += this.speedX;
        this.y += this.speedY;

        //Collision detection for paddle/player
        if( this.x - this.radius < (player.x + player.width) &&
            this.x + this.radius > player.x &&
            this.y - this.radius < (player.y + player.height) &&
            this.y + this.radius > player.y ) {
                if (stopTrial) {
                    if(newTrialState === false) {
                        guessDiv.style.visibility = "visible";
                        pauseDiv.style.visibility = "visible";
                        newTrialState = true;
                    }
                }

        }

        //Collision detection for left wall
        if( this.x - this.radius < 0 ) {
            this.x = this.radius;
            this.speedX = -this.speedX;
        //Event for right wall
        } else if (this.x - this.radius > WIDTH) {
            if (stopTrial) {
                if(newTrialState === false) {
                    guessDiv.style.visibility = "visible";
                    pauseDiv.style.visibility = "visible";
                    newTrialState = true;
                }
            }
        }

        //Collision detection for top and bottom walls
        //Top wall
        if (this.y < 0 + this.radius) {
            this.y = this.radius;
            this.speedY = -this.speedY;
        //Bottom wall
        } else if (this.y > HEIGHT - this.radius) {
            this.y = HEIGHT - this.radius;
            this.speedY = -this.speedY;
        }

    },

    //Draws the object on the ctx2 canvas
    draw: function() {
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.radius, 2* Math.PI, false);
        ctx2.fill();
    }
};

function main() {
    //Creates canvas layer1/ctx1
    layer1 = document.getElementById("layer1");
    ctx1 = layer1.getContext('2d');

    //Creates canvas layer2/ctx2
    layer2 = document.getElementById("layer2");
    ctx2 = layer2.getContext('2d');

    //Event listenters for keypress
    keystate = {};
        document.addEventListener("keydown", function(evt) {
        keystate[evt.keyCode] = true;
    });
        document.addEventListener("keyup", function(evt) {
        delete keystate[evt.keyCode];
    });
    //Sets values for all canvas objects
    newTrial();
    ctx1.fillRect(player.x, player.y, player.width, HEIGHT);
    var loop = function() {
        updater();
        drawer();
        window.requestAnimationFrame(loop, layer2);
    };
    window.requestAnimationFrame(loop, layer2);
}

//Initiates a random speed for the ball, a random height for the player paddle.
function newTrial() {
    var randomSix = Math.floor((Math.random() * 6));
    player.x = WIDTH - (player.width + 250);
    player.y = (HEIGHT - player.height)/2;
    ball.x = ball.radius;
    ball.y = (HEIGHT - ball.radius)/2;
    while (true) {
        //Checks if the ballspeed have been used less than 3 times in this block.
        if (bSpeedCount[randomSix] < 6) {
            ball.speedX = ballSpeeds[randomSix];
            ball.speedY = -ballSpeeds[randomSix];
            player.height = playerHeights[bSpeedCount[randomSix]];
            ++bSpeedCount[randomSix];
            break;
        } else {
            randomSix = Math.floor((Math.random() * 6));
        }
    }
}

//Calls the update functions for each canvas object
function updater(){
    player.update();
    ball.update();
    counter++;
    //Calls the randomDirection function every 4th frame
    if (counter >= 4) {
        randomDirection();
        counter = 0;
    }
}

function drawer(){
    //Draws the background on layer1 canvas
    ctx1.fillRect(0,0, WIDTH, HEIGHT);
    ctx1.save();
    ctx1.fillStyle = "#fff";
    //Draws white line
    ctx1.fillRect(WIDTH - (player.width + 250), 0, player.width, HEIGHT);
    //Clears the layer2 canvas
    ctx2.clearRect(0,0,WIDTH,HEIGHT);
    ctx2.save();
    ctx2.fillStyle = "#fff";

    player.draw();
    ball.draw();
    ctx1.restore();
    ctx2.restore();
}

//Function to make the ball movie in a random direction on the X and Y axis
function randomDirection() {
    var randomSeven = Math.floor((Math.random() * 6) + 2);
    var randomFiftyOne = Math.floor();
    var randomFiftyTwo = Math.floor();
    var randomFive = Math.random();

    // 50% chance that the ball is displaced on both Y and X axel.
    if (randomFiftyOne < 0.5) {
        ball.y = ball.y - 2;
    } else {
        ball.y = ball.y + 2;
    }
    if (randomFiftyTwo < 0.5) {
        ball.x = ball.x + randomSeven;
    } else {
        ball.x = ball.x - randomSeven;
    }

    // 5% chance that Y speed reverse
    if (randomFive < 0.05) {
        ball.speedY = -ball.speedY;
    }
}

//Event listerners for 1-6 and num 1-6 keys set in a switch
function activeButtons() {
    document.addEventListener("keydown", function(event) {
        // Gets what key was pressed as number
        key = event.keyCode || event.which;

        //If statement to prevent the eventlistener to call any functions
        if (newTrialState === true) {
            switch (key) {
                case 49:
                case 97:
                    guess = 4;
                    endTrial();
                    break;
                case 50:
                case 98:
                    guess = 5;
                    endTrial();
                    break;
                case 51:
                case 99:
                    guess = 6;
                    endTrial();
                    break;
                case 52:
                case 100:
                    guess = 8;
                    endTrial();
                    break;
                case 53:
                case 101:
                    guess = 10;
                    endTrial();
                    break;
                case 54:
                case 102:
                    guess = 11;
                    endTrial();
                    break;
            }
        }
        event.preventDefault();
    });
}

//Function for when a trial ends as well as when a block of trials ends.
function endTrial() {
    console.log("The trial is on " + trialNum);
    pauseDiv.style.visibility = "hidden";
    guessDiv.style.visibility = "hidden";
    setTrialValue(guess);
    ++trialNum;
    //36 trials per block
    if (trialNum >= 36) {
        trialNum = 0;
        ++blockNum;
        bSpeedCount = [0,0,0,0,0,0];
        console.log("The block is: " + blockNum);
        //4 blocks, starts from 0.
        if (blockNum > 3) {
            stopTrial = false;
            pauseDiv.style.visibility = "visible";
            guessDiv.style.visibility = "visible";
            guessDiv.innerHTML = "";
            var para = document.createElement("p");
            var textP = document.createTextNode("The test is over. Please wait 10 seconds before you refresh or close the site.");
            para.appendChild(textP);
            guessDiv.appendChild(para);
            //Submit function from google_sheets.js
            submit();
        }
    }
    newTrial();
    newTrialState = false;
}

//Sets values to dataform object, formResults with unique values for each trialnumber.
function setTrialValue (myGuess) {
    if (blockNum === 0) {
        dataFormer("TrialNumber" + trialNum + "A", trialNum);
        dataFormer("GuessedSpeed" + trialNum + "A", myGuess);
        dataFormer("BallSpeed" + trialNum + "A", ball.speedX);
        dataFormer("PaddleSize" + trialNum + "A", player.height);
    } else if (blockNum === 1) {
        dataFormer("TrialNumber" + trialNum + "B", trialNum);
        dataFormer("GuessedSpeed" + trialNum + "B", myGuess);
        dataFormer("BallSpeed" + trialNum + "B", ball.speedX);
        dataFormer("PaddleSize" + trialNum + "B", player.height);
    } else if (blockNum === 2) {
        dataFormer("TrialNumber" + trialNum + "C", trialNum);
        dataFormer("GuessedSpeed" + trialNum + "C", myGuess);
        dataFormer("BallSpeed" + trialNum + "C", ball.speedX);
        dataFormer("PaddleSize" + trialNum + "C", player.height);
    } else if (blockNum === 3) {
        dataFormer("TrialNumber" + trialNum + "D", trialNum);
        dataFormer("GuessedSpeed" + trialNum + "D", myGuess);
        dataFormer("BallSpeed" + trialNum + "D", ball.speedX);
        dataFormer("PaddleSize" + trialNum + "D", player.height);
    }
}

//Appends values to dataform object
function dataFormer(index, value) {
    formResults.append(index, value);
}

//Event listener for start button
document.getElementById("startBtn").addEventListener("click", function(){
    var parti = document.getElementById("participant").value;
    var sex = document.getElementById("sex").value;
    var age = document.getElementById("age").value;
    dataFormer("Participant", parti);
    dataFormer("Sex", sex);
    dataFormer("Age", age);
    activeButtons();
    document.getElementById("formDiv").style.display = "none";
    pauseDiv.style.visibility = "hidden";
main();
});
