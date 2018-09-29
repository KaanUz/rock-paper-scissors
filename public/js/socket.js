var socket = io('http://localhost:9000');

let usrScore        = 0;
let aiScore         = 0;

var choices                 = document.getElementsByClassName('choice');
var res_p                   = document.querySelector('.res > p');
var usrScore_span           = document.getElementById("usr_score");
var aiScore_span            = document.getElementById("ai_score");
var aiChoice_div            = document.getElementsByClassName("ai-choice")[0];
var aiChoice_div_classList  = aiChoice_div.classList;
var aiChoice_img            = aiChoice_div.getElementsByTagName("img")[0];

socket.on('connect', function () {
    console.log('Socket Connection Established...')
    res_p.innerHTML = "Choose your weapon!";
});

for (let j = 0; j < choices.length; j++) {
    let choice = choices[j];
    choice.addEventListener('click', function() {
        socket.emit('user choice', 
            choice.getAttribute('value')
        );
    });
}

socket.on('game result', function(data) {
    var usrChoice_div_classList = document.getElementById(data.usrChoice).classList;

    res_p.innerHTML = data.msg;
    
    aiChoice_img.removeAttribute('style');
    aiChoice_img.setAttribute("src", "/public/images/" + data.aiChoice + ".png")

    if (data.res == null) {
        usrChoice_div_classList.add('gray-glow');
        aiChoice_div_classList.add('gray-glow');
        setTimeout( function() {
            usrChoice_div_classList.remove('gray-glow');
            aiChoice_div_classList.remove('gray-glow');
        }, 500); 
    } else if (data.res) {
        usrScore_span.innerHTML = ++usrScore;
        usrChoice_div_classList.add("green-glow");
        aiChoice_div_classList.add("red-glow");
        setTimeout( function() {
            usrChoice_div_classList.remove('green-glow');
            aiChoice_div_classList.remove('red-glow');
        }, 500); 
    } else {
        aiScore_span.innerHTML = ++aiScore;
        usrChoice_div_classList.add("red-glow");
        aiChoice_div_classList.add("green-glow");
        setTimeout( function() {
            usrChoice_div_classList.remove('red-glow');
            aiChoice_div_classList.remove('green-glow');
        }, 500);  
    }
    
});