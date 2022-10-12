// select all elements
const start = document.getElementById("start");
const gameQuiz = document.getElementById("gameQuiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const optionA = document.getElementById("A");
const optionB = document.getElementById("B");
const optionC = document.getElementById("C");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreData");
const saveMenu = document.getElementById("saveMenu");
const highScore = document.getElementById("highScores");


// questions
let questions = [
    {
        question : "Which franchise is considered to be the creator of the First Person Shooter genre? ",
        imgSrc : "img/moh.jpg",
        optionA : "DOOM",
        optionB : "Call Of Duty",
        optionC : "Battlefield",
        correct : "A"
    },{
        question : "Which of the following games has grossed the most amount of sales.",
        imgSrc : "img/wow.jpeg",
         optionA : "Wii Sports",
         optionB : "Minecraft",
         optionC : "Grand Theft Auto V",
        correct : "B"
    },{
        question : "Donkey Kong was originally based on what/who?",
        imgSrc : "img/rs.png",
        optionA : "Robotics",
        optionB : "Godzilla",
        optionC : "Popeye",
        correct : "C"
    }
];

// create variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; 
let TIMER;
let score = 0;
score = (100 * score/questions.length);
// rendering question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    optionA.innerHTML = q. optionA;
    optionB.innerHTML = q. optionB;
    optionC.innerHTML = q. optionC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    highScore.style.display = "none";
    renderQuestion();
    gameQuiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        count++
    }else{
        count = 0;
        // change  color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // ends quiz then shows score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // wrong color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is incorrect
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    saveMenu.style.display = "block";
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/zard.png" :
              (scorePerCent >= 60) ? "img/millie.png" :
              (scorePerCent >= 40) ? "img/mander.png" :
              (scorePerCent >= 20) ? "img/mander.png" :
              "img/kirb.png";
 
    scoreDiv.innerHTML = "<img src="+ img +" style='width:200px;height:200px'>";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    

}
const username = document.querySelector('#username');
const saveInput = document.querySelector('#saveInput');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveInput.disabled = !username.value
})

var saveHighScore = e => {
    // e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
};
saveInput.addEventListener('click', saveHighScore)