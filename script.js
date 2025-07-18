const questions = [
    { question: "What is the capital of France?", answers: [{ text: "Paris", correct: true }, { text: "London", correct: false }, { text: "Berlin", correct: false }, { text: "Madrid", correct: false }] },
    { question: "What is the capital of Germany?", answers: [{ text: "Berlin", correct: true }, { text: "London", correct: false }, { text: "Madrid", correct: false }, { text: "Paris", correct: false }] },
    { question: "What is the capital of Italy?", answers: [{ text: "Rome", correct: true }, { text: "London", correct: false }, { text: "Madrid", correct: false }, { text: "Paris", correct: false }] },
    { question: "What is the capital of Spain?", answers: [{ text: "Madrid", correct: true }, { text: "London", correct: false }, { text: "Rome", correct: false }, { text: "Paris", correct: false }] },
    { question: "What is the capital of India?", answers: [{ text: "New Delhi", correct: true }, { text: "London", correct: false }, { text: "Rome", correct: false }, { text: "Paris", correct: false }] },
    { question: "What is the capital of Japan?", answers: [{ text: "Tokyo", correct: true }, { text: "London", correct: false }, { text: "Rome", correct: false }, { text: "Paris", correct: false }] }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const ratingSection = document.getElementById("rating-section");
const ratingButtons = document.getElementsByClassName("rate-btn");
const thankYouMsg = document.getElementById("thank-you-msg");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    ratingSection.style.display = "none";
    thankYouMsg.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    ratingSection.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Rating button click event
Array.from(ratingButtons).forEach(button => {
    button.addEventListener("click", () => {
        thankYouMsg.style.display = "block";
        setTimeout(() => {
            thankYouMsg.style.display = "none";
        }, 3000);
    });
});

startQuiz();
