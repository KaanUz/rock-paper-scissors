let         usrScore        = 0;
let         aiScore         = 0;
let         usrsLastChoice;
let         resOfLastGame;

const   usrScore_span           = document.getElementById("usr_score");
const   aiScore_span            = document.getElementById("ai_score");
const   scoreBoard_div          = document.querySelector(".score-board");
const   res_p                   = document.querySelector(".res > p");
const   rock_div                = document.getElementById("rock");
const   paper_div               = document.getElementById("paper");
const   scissors_div            = document.getElementById("scissors");
const   aiChoice_div            = document.getElementById("ai_choice");
const   aiChoice_div_classList  = aiChoice_div.classList;
var     aiChoice_img            = aiChoice_div.getElementsByTagName("img")[0];

function getAiChoice(res, choice) {
    const choices = ['rock', 'paper', 'scissors'];
    
    if (choice == null || res == 'tie'){
        const randomNumber = Math.floor(Math.random() * 3);
        return choices[randomNumber]
    }
    if (res == 'win') {
        switch (choice) {
            case "rock":
                return choices[1];
            case "paper":
                return choices[2];
            case "scissors":
                return choices[0];
        }
    } else {
        return choice;
    }
}
    

function game(usrChoice) {
    const aiChoice = getAiChoice(resOfLastGame, usrsLastChoice);
    aiChoice_img.setAttribute("src", "images/" + aiChoice + ".png")
    aiChoice_img.removeAttribute('style');
    if (usrChoice == aiChoice) {
        tie(usrChoice);
        resOfLastGame = 'tie'
    } else if ( usrChoice == "rock" && aiChoice == "scissors"   ||
                usrChoice == "paper" && aiChoice == "rock"      ||
                usrChoice == "scissors" && aiChoice == "paper"  ) {
        win(usrChoice, aiChoice);
        resOfLastGame = 'win'
    } else {
        loose(usrChoice, aiChoice);
        resOfLastGame = 'loss'
    }
    usrsLastChoice = usrChoice;
}

function win(usrChoice, aiChoice) {
    const usrChoice_div_classList   = document.getElementById(usrChoice).classList;

    usrScore_span.innerHTML = ++usrScore;
    res_p.innerHTML = `${usrChoice}  beats  ${aiChoice}. You win!`;

    usrChoice_div_classList.add("win");
    aiChoice_div_classList.add("loose");
    setTimeout( function() {
        usrChoice_div_classList.remove('win');
        aiChoice_div_classList.remove('loose');
    }, 500);
}

function loose(usrChoice, aiChoice) {
    const usrChoice_div_classList   = document.getElementById(usrChoice).classList;

    aiScore_span.innerHTML = ++aiScore;
    res_p.innerHTML = `${aiChoice}  beats  ${usrChoice}. You Lost!`;
   
    usrChoice_div_classList.add("loose");
    aiChoice_div_classList.add("win");
    setTimeout( function() {
        usrChoice_div_classList.remove('loose');
        aiChoice_div_classList.remove('win');
    }, 500); 
}

function tie(usrChoice) {
    const usrChoice_div_classList   = document.getElementById(usrChoice).classList;

    res_p.innerHTML = `It's a tie!`;

    usrChoice_div_classList.add("tie");
    aiChoice_div_classList.add("tie");
    setTimeout( function() {
        usrChoice_div_classList.remove('tie');
        aiChoice_div_classList.remove('tie');
    }, 500); 
}

function main() {
    rock_div.addEventListener('click', function() {
        game("rock");
    })
    
    paper_div.addEventListener('click', function() {
        game("paper");
    })
    
    scissors_div.addEventListener('click', function() {
        game("scissors");
    })
}

main();