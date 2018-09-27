module.exports = {
    getAiChoice : function() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomNumber = Math.floor(Math.random() * 3);
        return choices[randomNumber];
    },
    exec : function(usrChoice, aiChoice) {
        var res;
        if (usrChoice == aiChoice) {
            res = null;
        }
        else if (usrChoice == "rock" && aiChoice == "scissors" ||
            usrChoice == "paper" && aiChoice == "rock" ||
            usrChoice == "scissors" && aiChoice == "paper") {
            res = true;
        }
        else {
            res = false;
        }
        return res;
    }
}