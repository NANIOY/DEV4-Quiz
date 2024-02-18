const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speakBtn = document.querySelector('#startButton');
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

const questions = [
    "First question?",
    "Second question?",
    "Third question?"
];

recognition.onresult = function(event) {
    console.log(event);
    const transcript = event.results[0][0].transcript;
    document.querySelector("#recognizedText").innerHTML = transcript;
    speakBtn.disabled = false;
}

speakBtn.addEventListener('click', () => {
    console.log("Start listening");
    recognition.start();
    speakBtn.disabled = true;
});

