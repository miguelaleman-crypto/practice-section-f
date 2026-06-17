const quizData = [
    { sentence: "It's _______ tonight. Bring your sweater.", answer: "cold" },
    { sentence: "The sun rises in the _______ and sets in the west.", answer: "east" },
    { sentence: "Please turn off the _______ before you go to sleep.", answer: "light" },
    { sentence: "She was so _______ that she drank two whole bottles of water.", answer: "thirsty" },
    { sentence: "An elephant is a very _______ animal, while a mouse is small.", answer: "big" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 25;
let userAnswers = [];

const screenInstructions = document.getElementById('screen-instructions');
const screenQuiz = document.getElementById('screen-quiz');
const screenResults = document.getElementById('screen-results');

const btnStart = document.getElementById('btn-start');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

const questionCounter = document.getElementById('question-counter');
const sentenceText = document.getElementById('sentence-text');
const answerInput = document.getElementById('answer-input');
const timerCount = document.getElementById('timer-count');

const finalScore = document.getElementById('final-score');
const summaryList = document.getElementById('summary-list');

btnStart.addEventListener('click', () => {
    screenInstructions.classList.add('hidden');
    screenQuiz.classList.remove('hidden');
    loadQuestion();
});

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 25;
    timerCount.textContent = timeLeft;
    answerInput.value = "";
    answerInput.focus();

    questionCounter.textContent = `${currentQuestionIndex + 1} / ${quizData.length}`;
    sentenceText.textContent = quizData[currentQuestionIndex].sentence;

    timer = setInterval(() => {
        timeLeft--;
        timerCount.textContent = timeLeft;
        if (timeLeft <= 0) {
            handleNextQuestion();
        }
    }, 1000);
}

function handleNextQuestion() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = quizData[currentQuestionIndex].answer.toLowerCase();
    
    userAnswers.push({
        sentence: quizData[currentQuestionIndex].sentence,
        userAns: userAnswer || "[No answer]",
        correctAns: correctAnswer,
        isCorrect: userAnswer === correctAnswer
    });

    if (userAnswer === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

btnNext.addEventListener('click', handleNextQuestion);

answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleNextQuestion();
    }
});

function showResults() {
    clearInterval(timer);
    screenQuiz.classList.add('hidden');
    screenResults.classList.remove('hidden');

    finalScore.textContent = `Your Score: ${score} / ${quizData.length}`;
    summaryList.innerHTML = "";

    userAnswers.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('summary-item', item.isCorrect ? 'correct' : 'incorrect');
        div.innerHTML = `
            <p><strong>Sentence:</strong> ${item.sentence}</p>
            <p><strong>Your Answer:</strong> <span style="color:${item.isCorrect ? 'green':'red'}">${item.userAns}</span> 
            ${!item.isCorrect ? ` | <strong>Correct:</strong> ${item.correctAns}` : ''}</p>
        `;
        summaryList.appendChild(div);
    });
}

btnRestart.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    screenResults.classList.add('hidden');
    screenInstructions.classList.remove('hidden');
});