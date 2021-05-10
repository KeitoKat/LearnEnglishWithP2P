console.log("app")

const questionNum = document.querySelector('.question-num');
const questionText = document.querySelector('.question-text');
const optionsContainer = document.querySelector('.options-container');
const answersIndicatorsCheck = document.querySelector('.answers-indicator');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');

let questionCounter = 0;
let currentQuestion;
let availQuestions = [];
let availOptions = [];
let correctAnswers = 0;
let attempt = 0;

//AVAILABLE QUESTIONS LEFT TO BE ANSWERED
function setAvailQuestions(){
    const totalQuestions = quiz.length;
    for(let i=0; i<totalQuestions; i++){
        availQuestions.push(quiz[i])
    }
}

function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over")
        quizOver();
    }else{
        getNewQuestion();
    }
}

//FETCH UNANSWERED QUESTIONS
function getNewQuestion(){
    // QUESTION INDEX
    questionNum.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    // GENERATE RANDOM QUESTIONS
    const questionIndex = availQuestions[Math.floor(Math.random() * availQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML =  currentQuestion.q;

    // MATCH THE AVAILABLE QUESTION WITH ITS INDEX, THEN REMOVE IT FROM OUR AVAIL ARRAY
    const index1 = availQuestions.indexOf(questionIndex);
    availQuestions.splice(index1,  1);

    // DEFINE OPTIONS LENGTH
    const optionLen = currentQuestion.options.length;
    // CHECK AVAILABLE OPTIONS
    for(let i=0; i<optionLen; i++){
        availOptions.push(i)
    };

    // RESET SELECTED OPTION FROM PREVIOUS QUESTION
    optionsContainer.innerHTML = "";

    // ANIMATION DELAY
    let animationDelay = 0.2

    // DISPLAY OPTIONS AT RAND0M
    for(let i=0; i<optionLen; i++){
        const optionIndex = availOptions[Math.floor(Math.random() * availOptions.length)];
        const index2 = availOptions.indexOf(optionIndex);
        availOptions.splice(index2, 1);
        
        const option = document.createElement("div")
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionsContainer.appendChild(option);
        option.setAttribute("onClick", "getResult(this)");
}
    // COUNTING QUESTION
    questionCounter++
}

// GET OPTION CLICKED BY USER
function getResult(selected){
    // CONVERT ID IN STRING TO NUMBER   
    const id = parseInt(selected.id);
    if (id === currentQuestion.answer){
        // ADD NEW CLASS, CHANGE OPTION BOX TO GREEN WHEN CORRECT
        selected.classList.add("correct");
        // UPDATE INDICATOR
        updateIndicator("correct");
        // UPDATE DATA - correct answers
        correctAnswers++;
    }else{
        // CHANGE OPTION BOX TO RED WHEN WRONG & SHOW CORRECT OPTION
        selected.classList.add("wrong");
        
        const optionLen = optionsContainer.children.length;
        for (let i=0 ; i<optionLen; i++){
            if(parseInt(optionsContainer.children[i].id) === currentQuestion.answer){
                optionsContainer.children[i].classList.add("correct");
            };
        }

        // UPDATE INDICATOR
        updateIndicator("wrong");
    }
    // DISALLOW FURTHER CLICKS
    stopUser();
    // UPDATE DATA - attempts made
    attempt++;
}

function stopUser(){
    const optionLen = optionsContainer.children.length
    for (let i=0; i<optionLen; i++){
        optionsContainer.children[i].classList.add("option-selected");
    }
}

function answersIndicators(){
    answersIndicatorsCheck.innerHTML = '';
    const totalQuestions = quiz.length;
    for(let i=0; i<totalQuestions; i++){
        const indicator = document.createElement("div");
        answersIndicatorsCheck.appendChild(indicator);
    }
}

function updateIndicator(mark){
    answersIndicatorsCheck.children[questionCounter-1].classList.add(mark)
}

function quizOver(){
    //HIDE QUIZ-BOX
    quizBox.classList.add("hide");

    //SHOW RESULT-BOX
    resultBox.classList.remove("hide");

    quizResult();
}

//DISPLAY QUIZ RESULTS
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

// !!!
//RESET PREVIOUS QUIZ DATA
function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}


//USER WANTS TO RETRY
function tryAgain(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function startQuiz() {
    setAvailQuestions();
    getNewQuestion();
    answersIndicators();
}

//FETCH DATA
window.onload = function() {
    setAvailQuestions();
    getNewQuestion();
    answersIndicators();
}
