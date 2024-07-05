const quizContainer = document.querySelector('.quiz-questions');
const submitBtn = document.querySelector('.submit-btn');
const restartBtn = document.querySelector('.restart-btn');
const quizResults = document.querySelector('.quiz-results');
const totalQuestionsElem = document.querySelector('.total-questions');
const attemptedQuestionsElem = document.querySelector('.attempted-questions');
const correctAnswersElem = document.querySelector('.correct-answers');
const incorrectAnswersElem = document.querySelector('.incorrect-answers');
const marksElem = document.querySelector('.marks');
const timeTakenElem = document.querySelector('.time-taken');

let currentQuestionIndex = 0;
const totalQuestions = quizContainer.querySelectorAll('.question').length;
let attemptedQuestions = 0;
let correctAnswers = 0;
const quizDuration = 300; 
let timerInterval;

function startQuiz() {
    quizContainer.style.display = 'block';
    submitBtn.style.display = 'block';
    restartBtn.style.display = 'none';
    quizResults.style.display = 'none';
    currentQuestionIndex = 0;
    attemptedQuestions = 0;
    correctAnswers = 0;
    showQuestion(currentQuestionIndex);
    startTimer();
}

function showQuestion(index) {
    const questions = quizContainer.querySelectorAll('.question');
    questions.forEach((question, idx) => {
        question.style.display = idx === index ? 'block' : 'none';
    });
}

submitBtn.addEventListener('click', function() {
    const correctAnswersList = ['a', 'a', 'a', 'a', 'a'];
    const selectedOption = quizContainer.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    if (selectedOption) {
        attemptedQuestions++;
        const userAnswer = selectedOption.value;
        const correctAnswer = correctAnswersList[currentQuestionIndex];

        if (userAnswer === correctAnswer) {
            correctAnswers++;
        }
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            endQuiz();
        }
    }
});

function endQuiz() {
    quizContainer.style.display = 'none';
    submitBtn.style.display = 'none';
    restartBtn.style.display = 'block';
    quizResults.style.display = 'block';
    clearInterval(timerInterval);
    displayResults();
}

function displayResults() {
    totalQuestionsElem.textContent = totalQuestions;
    attemptedQuestionsElem.textContent = attemptedQuestions;
    correctAnswersElem.textContent = correctAnswers;
    incorrectAnswersElem.textContent = attemptedQuestions - correctAnswers;
    marksElem.textContent = `${(correctAnswers / totalQuestions * 100).toFixed(2)}%`;
    const totalTimeTaken = Math.floor((Date.now() - timeStart) / 1000);
    timeTakenElem.textContent = formatTime(totalTimeTaken);
}

restartBtn.addEventListener('click', function() {
    startQuiz();
});

function startTimer() {
    timeStart = Date.now();
    let timer = quizDuration;
    updateTimer(timer);

    timerInterval = setInterval(function() {
        timer--;
        updateTimer(timer);

        if (timer <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function updateTimer(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
    document.querySelector('.timer').textContent = formattedTime;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}

startQuiz();
