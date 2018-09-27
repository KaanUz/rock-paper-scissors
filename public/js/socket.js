let usrScore        = 0;
let aiScore         = 0;
var socket = io('http://localhost:9000');

socket.on('connect', function () {
    $('#message').empty();
    $('#message').append($('<p>').text("Choose your weapon!"));
});

var choices = document.getElementsByClassName('choice');
for (let j = 0; j < choices.length; j++) {
    let choice = choices[j];
    choice.addEventListener('click', function() {
        socket.emit('user choice', 
            choice.getAttribute('value')
        );
    });
}

socket.on('game result', function(data) {
    $('#message').empty();
    $('#message').append($('<p>').text(data.msg));
        
    aiChoice_img = $('#ai_choice > img')
    aiChoice_img.removeAttr('style');
    $('#ai_choice > img').attr("src", "public/images/" + data.aiChoice + ".png")

    if (data.res == null) {
        $(`#${data.usrChoice}`).addClass('gray-glow');
        $(`#ai_choice`).addClass('gray-glow');
        setTimeout( function() {
            $(`#${data.usrChoice}`).removeClass('gray-glow');
            $(`#ai_choice`).removeClass('gray-glow');
        }, 500); 
    } else if (data.res) {
        $(`#usr_score`).html(++usrScore);
        $(`#${data.usrChoice}`).addClass('green-glow');
        $(`#ai_choice`).addClass('red-glow');
        setTimeout( function() {
            $(`#${data.usrChoice}`).removeClass('green-glow');
            $(`#ai_choice`).removeClass('red-glow');
        }, 500); 
    } else {
        $(`#ai_score`).html(++aiScore);
        $(`#${data.usrChoice}`).addClass('red-glow');
        $(`#ai_choice`).addClass('green-glow');
        setTimeout( function() {
            $(`#${data.usrChoice}`).removeClass('red-glow');
            $(`#ai_choice`).removeClass('green-glow');
        }, 500); 
    }
    
});