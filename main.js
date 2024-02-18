const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speakBtn = document.querySelector('.startButton');
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

const questions = [
    "What is the capital of France?",
    "How many continents are there in the world?",
    "Which planet is known as the 'Red Planet'?",
    "What is the capital city of Australia?",
    "What is the approximate value of the mathematical constant e to 10 decimal places?"
];

document.querySelector(".questionText").textContent = questions[0];

recognition.onresult = function(event) {
    console.log(event);
    const transcript = event.results[0][0].transcript;
    document.querySelector(".recognizedText").textContent = "Recognized text: " + transcript;
    speakBtn.disabled = false;
}

speakBtn.addEventListener('click', () => {
    console.log("Start listening");
    recognition.start();
    speakBtn.disabled = true;
});
