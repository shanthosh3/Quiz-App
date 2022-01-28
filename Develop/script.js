let startBtn = document.getElementById("start-btn");
let instructions = document.getElementById('instructions');
let title = document.getElementById('title');
let questionBox = document.getElementById("question-area");
let questionEl = document.getElementById("question");
let choiceContatiner = document.getElementById('choices');
let timeLeft = 60;
let timer = document.getElementById("timer");
let time;
let submit = document.getElementById('submit');
let highScoreContainer = document.getElementById('highScoreContainer')
let highScoresList = document.getElementById('highScore')
let restartBtn = document.getElementById('restart-btn')
let questionBankIndex = 0;
let questionBank = [
    {
        question: "who is the president of USA now?",
        choices: [
            "Donald Trump",
            "Joe Biden",
            "Mahinda Rajapaksha",
            "George Bush"
        ],
        answer: "Joe Biden"
    },
    {
        question: "Who painted Monalisa?",
        choices: [
            "picasso",
            "Leonardo da Vinci",
            "Dwayne Jhonson",
            "Shanthosh"
        ],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What kind are frogs?",
        choices: [
            "Mammals",
            "Birds",
            "Amphibians",
            "Plants"
        ],
        answer: "Amphibians"
    },
    {
        question: "what is JavaScript?",
        choices: [
            "Programming Language",
            "Scripting Language",
            "Hyper Text Markup Language",
            "Machine Language"
        ],
        answer: "Scripting Language"
    },
    {
        question: "What does CSS stand for?",
        choices: [
            "Clear Style Script",
            "Clever Style Sheet",
            "Cascading Style Script",
            "Cascading Style Sheet"
        ],
        answer: "Cascading Style Sheet"
    },
]

//starting the game when clicking the start btn
let startGame = function () {
    timer.textContent = timeLeft
    startBtn.classList.add("hide");
    instructions.classList.add('hide');
    title.classList.add('hide')
    questionBox.classList.remove("hide");
    makeQuestion();
    timer.classList.remove("hide");
    time = setInterval(updateTimer, 1000);
};

//creating the questions and aswers
let makeQuestion = function () {
    var currentQuestion = questionBank[questionBankIndex];
    questionEl.innerHTML = currentQuestion.question;
    choiceContatiner.innerHTML = '';
    currentQuestion.choices.forEach(function (choice) {
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'choice btn');
        choiceBtn.setAttribute('value', choice);
        choiceBtn.textContent = choice;
        choiceBtn.onclick = answerCheck;
        choiceContatiner.appendChild(choiceBtn);
    })
}

// checking the asnswers and changing your time accordingly 
let answerCheck = function () {
    if (this.value !== questionBank[questionBankIndex].answer) {
        timeLeft -= 5
        if (timeLeft < 0) {
            time = 0
        }
        timer.textContent = timeLeft
    }
    questionBankIndex++
    if (questionBankIndex === questionBank.length) {
        endGame()
    } else {
        makeQuestion()
    }
    // console.log("Clicked by User");
};

//ending the timer and questions and displaying scores and and restart btn
function endGame() {
    clearInterval(time);
    questionBox.classList.add('hide');
    var endScreen = document.getElementById('endScreen');
    endScreen.classList.remove('hide');
    var score = document.getElementById('finalScore');
    score.textContent = timeLeft;
    timer.innerHTML = "The End"
    highScoresScreen();
    highScoreContainer.classList.remove('hide');
    restartBtn.classList.remove('hide');
};

// saving the scores based on the timer
function saveScore() {
    var initials = document.getElementById('initials').value;
    var highScores = JSON.parse(localStorage.getItem('scores')) || [];
    console.log(highScores);
    var yourScore = {
        initials: initials,
        score: timeLeft
    };
    highScores.push(yourScore);
    localStorage.setItem("scores", JSON.stringify(highScores));
}

//displaying high scores at the end
var highScoresScreen = function () {
    var highScores = JSON.parse(localStorage.getItem('scores')) || [];
    console.log(highScores);

    for (let i = 0; i < highScores.length; i++) {
        var scoreLi = document.createElement('li');
        scoreLi.setAttribute('class', 'score');
        scoreLi.innerHTML = JSON.stringify(highScores[i]);
        highScoresList.appendChild(scoreLi);
    };

};

//restart btn to restart the game
var restart = function () {
    location.reload()
};

//timer going down
function updateTimer() {
    // console.log(timeLeft);
    timeLeft--;
    timer.textContent = timeLeft;
    //  console.log(timeLeft);
    if (timeLeft <= 0) {
        endGame();
    }
};

startBtn.addEventListener("click", startGame);
submit.addEventListener('click', saveScore);
restartBtn.addEventListener("click", restart);