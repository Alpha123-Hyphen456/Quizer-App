
const questions = [
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        correctAnswer: "Oxygen"
    },
    {
        question: "How many continents are there in the world?",
        options:  ["5", "6", "7", "8"],
        correctAnswer: "7"
    },
    {
        question: "What is the currency of Japan?",
        options:  ["Yuan", "Won", "Yen", "Rupee"],
        correctAnswer: "Yen"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options:  ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
        correctAnswer:  "William Shakespeare"
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "NaCl"],
        correctAnswer: "H2O"
    }
];


let currentQuestionIndex = 0; 
let score = 0; 
let selectedAnswer = null; 


const questionTextElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const questionSection = document.getElementById('question-section');
const scoreSection = document.getElementById('score-section');
const finalScoreElement = document.getElementById('final-score');
const totalQuestionsElement = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-button');



 
function loadQuestion() {
    
    selectedAnswer = null;
    answerButtonsElement.innerHTML = ''; 
    nextButton.classList.add('hidden'); 

    const currentQuestion = questions[currentQuestionIndex];
    
    questionTextElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        
        button.classList.add(
            'answer-button', 'bg-blue-50', 'text-blue-800', 'font-medium', 'py-3', 'px-4',
            'rounded-lg', 'border', 'border-blue-200', 'hover:bg-blue-100', 'focus:outline-none',
            'focus:ring-2', 'focus:ring-blue-500', 'focus:ring-opacity-50', 'transition-all',
            'duration-200', 'ease-in-out', 'text-left', 'block' 
        );
        button.dataset.option = option; 
        button.addEventListener('click', selectAnswer); 
        answerButtonsElement.appendChild(button);
    });
}

/**
 * H
 * @param {Event} event - The click event object.
 */
function selectAnswer(event) {
    
    const previouslySelected = document.querySelector('.answer-button.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected', 'border-blue-500', 'bg-blue-100');
    }

    
    const clickedButton = event.target;
    clickedButton.classList.add('selected', 'border-blue-500', 'bg-blue-100');
    selectedAnswer = clickedButton.dataset.option; 
    nextButton.classList.remove('hidden'); 
}


function nextQuestion() {
    if (selectedAnswer === null) {
        
        console.log("Please select an answer before proceeding.");
        return; 
    }

    const currentQuestion = questions[currentQuestionIndex];

    
    const buttons = answerButtonsElement.querySelectorAll('.answer-button');
    buttons.forEach(button => {
        button.disabled = true; 
        if (button.dataset.option === currentQuestion.correctAnswer) {
            button.classList.add('correct'); 
        }
        if (button.dataset.option === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
            button.classList.add('wrong'); 
        }
    });

    
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++; 
    }

    
    setTimeout(() => {
        currentQuestionIndex++; 

        if (currentQuestionIndex < questions.length) {
            loadQuestion(); 
        } else {
            showScore(); 
        }
    }, 1000); 
}


function showScore() {
    questionSection.classList.add('hidden'); 
    scoreSection.classList.remove('hidden'); 
    finalScoreElement.textContent = score; 
    totalQuestionsElement.textContent = questions.length; 
}


function restartQuiz() {
    currentQuestionIndex = 0; 
    score = 0; 
    selectedAnswer = null; 
    scoreSection.classList.add('hidden'); 
    questionSection.classList.remove('hidden'); 
    loadQuestion(); 
}


document.addEventListener('DOMContentLoaded', () => {
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);
    loadQuestion(); 
});
