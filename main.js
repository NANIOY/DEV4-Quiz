const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speakBtn = document.querySelector('.button__start');
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris"]
    },
    {
        question: "How many continents are there in the world?",
        answers: ["7", "seven"]
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: ["Mars"]
    },
    {
        question: "What is the capital city of Australia?",
        answers: ["Canberra"]
    },
    {
        question: "In quantum mechanics, what is the name of the phenomenon where particles are connected over large distances, suggesting instantaneous communication?",
        answers: ["quantum entanglement"]
    }
];

let currentQuestionIndex = 0;

document.querySelector(".questionText").textContent = questions[currentQuestionIndex].question;

// recognition event
recognition.onresult = function(event) {
    console.log(event);
    const transcript = event.results[0][0].transcript.trim(); // get first result and remove any whitespace
    const answer = transcript.charAt(0) + transcript.slice(1); // process answer
    const possibleAnswers = questions[currentQuestionIndex].answers; // get possible answers
    let isCorrect = false; 
    
    document.querySelector(".recognizedText").textContent = "Your answer is: " + transcript; // display recognized text
    
    // check if the answer is correct
    for (let i = 0; i < possibleAnswers.length; i++) {
        if (answer === possibleAnswers[i]) {
            isCorrect = true;
            break;
        }
    }
    
    // display the correct or wrong light
    if (isCorrect) {
        document.querySelector(".light__correct__default").classList.add("light__correct__active");
        document.querySelector(".light__wrong__default").classList.remove("light__wrong__active");

        setTimeout(() => {
            goToNextQuestion();
        }, 500);
    } else {
        document.querySelector(".light__correct__default").classList.remove("light__correct__active");
        document.querySelector(".light__wrong__default").classList.add("light__wrong__active");
    }
    
    speakBtn.disabled = false;
}

// start button
speakBtn.addEventListener('click', () => {
    console.log("Start listening");
    recognition.start();
    speakBtn.disabled = true;
});

// next question
function goToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        // display next question and update progress bar
        document.querySelector(".questionText").textContent = questions[currentQuestionIndex].question;
        document.querySelector(".progressBar").value = currentQuestionIndex + 1;

        // reset lights and recognized text
        document.querySelector(".light__correct__default").classList.remove("light__correct__active");
        document.querySelector(".light__wrong__default").classList.remove("light__wrong__active");
        document.querySelector(".recognizedText").textContent = "Your answer is:";
    } else {
        document.querySelector(".container").innerHTML = "<h1>Quiz Completed!</h1>";
    }
}

const synth = window.speechSynthesis;

document.querySelector(".button__speech").addEventListener("click", () => {
    let currentQuestion = questions[currentQuestionIndex].question;
    let utterance = new SpeechSynthesisUtterance(currentQuestion);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;
    synth.speak(utterance);
    console.log("Spoken question:", currentQuestion);
});
