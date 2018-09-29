function getAiChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

module.exports = {
    exec : function(usrChoice) {
        const aiChoice = getAiChoice()
        var data = {
            usrChoice: usrChoice,
            aiChoice: aiChoice,
            res  : null,
            msg  : null
        }

        if (usrChoice == aiChoice) {
            data.res = null;
            data.msg = `It's a tie!`;
        }
        else if (usrChoice == "rock" && aiChoice == "scissors" ||
            usrChoice == "paper" && aiChoice == "rock" ||
            usrChoice == "scissors" && aiChoice == "paper") 
        {
            data.res = true;
            data.msg = `${usrChoice}  beats  ${aiChoice}. You Win!`;
        }
        else {
            data.res = false;
            data.msg = `${aiChoice}  beats  ${usrChoice}. You Lost!`;
        }
        return data;
    }
}