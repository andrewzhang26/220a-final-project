// Map notes to audio files
const noteSounds = {
    'C': 'sounds/C.wav',
    'C#': 'sounds/Csharp.wav',
    'D': 'sounds/D.wav',
    'D#': 'sounds/Dsharp.wav',
    'E': 'sounds/E.wav',
    'F': 'sounds/F.wav',
    'F#': 'sounds/Fsharp.wav',
    'G': 'sounds/G.wav',
    'G#': 'sounds/Gsharp.wav',
    'A': 'sounds/A.wav',
    'A#': 'sounds/Asharp.wav',
    'B': 'sounds/B.wav',
    'C2': 'sounds/C2.wav',
    'C#2': 'sounds/Csharp2.wav',
    'D2': 'sounds/D2.wav',
    'D#2': 'sounds/Dsharp2.wav',
    'E2': 'sounds/E2.wav',
    'F2': 'sounds/F2.wav',
};

const sprNoteSounds = {
    'C': 'spr-model-sounds/C.wav',
    'C#': 'spr-model-sounds/Csharp.wav',
    'D': 'spr-model-sounds/D.wav',
    'D#': 'spr-model-sounds/Dsharp.wav',
    'E': 'spr-model-sounds/E.wav',
    'F': 'spr-model-sounds/F.wav',
    'F#': 'spr-model-sounds/Fsharp.wav',
    'G': 'spr-model-sounds/G.wav',
    'G#': 'spr-model-sounds/Gsharp.wav',
    'A': 'spr-model-sounds/A.wav',
    'A#': 'spr-model-sounds/Asharp.wav',
    'B': 'spr-model-sounds/B.wav',
    'C2': 'spr-model-sounds/C2.wav',
    'C#2': 'spr-model-sounds/Csharp2.wav',
    'D2': 'spr-model-sounds/D2.wav',
    'D#2': 'spr-model-sounds/Dsharp2.wav',
    'E2': 'spr-model-sounds/E2.wav',
    'F2': 'spr-model-sounds/F2.wav',
};

const buttons = document.querySelectorAll('#button-container button');
const output = document.getElementById('selected-value');
let outputOption = 0;
var sounds = noteSounds;  

function setActiveButton(button) {
    // Remove 'active' class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add 'active' class to the clicked button
    button.classList.add('active');

    // Set the variable to the button's value
    outputOption = button.getAttribute('data-value'); 
}

// Set a default active button on load
window.addEventListener('DOMContentLoaded', () => {
    const defaultButton = buttons[0]; // Set the first button as default
    setActiveButton(defaultButton); // Initialize the active state
    });

buttons.forEach(button => {
  button.addEventListener('click', () => {
    setActiveButton(button); 

    if (outputOption == "0") {
        sounds = noteSounds;
    } else {
        sounds = sprNoteSounds; 
    }
  });
});

// Add click event to keys
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const note = key.dataset.note;
        playNote(note);
    });
});

function playNote(note) {
    const audio = new Audio(sounds[note]);
    if (outputOption == "1") {
        audio.volume = 0.3; 
    }
    audio.play();
}


