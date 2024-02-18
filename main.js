const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speakBtn = document.querySelector('.startButton');
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

const questions = [
    {
        question: "What is the capital of France?",
        answer: "Paris"
    },
    {
        question: "How many continents are there in the world?",
        answer: "Seven"
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answer: "Mars"
    },
    {
        question: "What is the capital city of Australia?",
        answer: "Canberra"
    },
    {
        question: "What is the approximate value of the mathematical constant e to 10 decimal places?",
        answer: "2.718281828"
    }
];

let currentQuestionIndex = 0;

document.querySelector(".questionText").textContent = questions[currentQuestionIndex].question;

recognition.onresult = function(event) {
    console.log(event);
    const transcript = event.results[0][0].transcript.trim();
    const answer = transcript.charAt(0) + transcript.slice(1);
    const correctAnswer = questions[currentQuestionIndex].answer;
    
    document.querySelector(".recognizedText").textContent = "Your answer is: " + transcript;
    
    if (answer === correctAnswer) {
        document.querySelector(".light__correct__default").classList.add("light__correct__active");
        document.querySelector(".light__wrong__default").classList.remove("light__wrong__active");
    } else {
        document.querySelector(".light__correct__default").classList.remove("light__correct__active");
        document.querySelector(".light__wrong__default").classList.add("light__wrong__active");
    }
    
    speakBtn.disabled = false;
}

speakBtn.addEventListener('click', () => {
    console.log("Start listening");
    recognition.start();
    speakBtn.disabled = true;
});
