/**
 * Filename: sophisticated_code.js
 * 
 * Description:
 * This code is a sophisticated example showcasing various concepts and features of JavaScript. 
 * It demonstrates object-oriented programming, closures, asynchronous operations, and dynamic DOM manipulation.
 * The code creates a dynamic quiz application with multiple-choice questions and displays the results at the end.
 */

// Utility function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// QuizApp object
const QuizApp = (() => {
    // Private variables
    const questions = [
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Tokyo'],
            correctAnswer: 'Paris'
        },
        // Add more questions here
    ];
    
    let currentQuestion = 0;
    let score = 0;

    // Private functions
    const createQuestionElement = () => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <h2>${questions[currentQuestion].question}</h2>
            <ul>
                ${questions[currentQuestion].options.map((option, index) => `
                    <li onclick="QuizApp.submitAnswer(${index})">${option}</li>
                `).join('')}
            </ul>
        `;
        return questionElement;
    };

    const updateScoreElement = () => {
        const scoreElement = document.getElementById('score');
        scoreElement.innerText = `Score: ${score}/${currentQuestion}`;
    };

    const showResultPage = () => {
        const resultPageElement = document.getElementById('result-page');
        resultPageElement.innerHTML = `
            <h2>Quiz complete!</h2>
            <p>Your final score is: ${score}/${questions.length}</p>
            <button onclick="QuizApp.restartQuiz()">Restart Quiz</button>
        `;
        resultPageElement.style.display = 'block';
    };

    // Public methods
    return {
        startQuiz: () => {
            const quizElement = document.getElementById('quiz');
            const nextQuestionButton = document.getElementById('next-question');

            nextQuestionButton.addEventListener('click', () => {
                currentQuestion++;

                if (currentQuestion >= questions.length) {
                    quizElement.innerHTML = '';
                    showResultPage();
                } else {
                    quizElement.innerHTML = '';
                    quizElement.appendChild(createQuestionElement());
                    updateScoreElement();
                }
            });

            quizElement.appendChild(createQuestionElement());
        },

        submitAnswer: (selectedOptionIndex) => {
            if (questions[currentQuestion].options[selectedOptionIndex] === questions[currentQuestion].correctAnswer) {
                score++;
            }
            document.getElementById('next-question').disabled = false;
            
            const optionsElements = document.querySelectorAll('.question li');
            optionsElements.forEach((optionElement) => {
                optionElement.style.pointerEvents = 'none';

                if (optionElement.innerText === questions[currentQuestion].correctAnswer) {
                    optionElement.classList.add('correct');
                } else if (optionElement.innerText === questions[currentQuestion].options[selectedOptionIndex]) {
                    optionElement.classList.add('incorrect');
                }
            });
        },

        restartQuiz: () => {
            const resultPageElement = document.getElementById('result-page');
            resultPageElement.style.display = 'none';
            currentQuestion = 0;
            score = 0;
            QuizApp.startQuiz();
        }
    }
})();

// Start the quiz
document.addEventListener('DOMContentLoaded', () => {
    QuizApp.startQuiz();
});

// Add CSS styles for the quiz
const styleElement = document.createElement('style');
styleElement.innerHTML = `
    /* Add your custom CSS styles here */
    .question {
        margin-bottom: 20px;
    }

    .correct {
        color: green;
    }

    .incorrect {
        color: red;
    }
`;
document.head.appendChild(styleElement);