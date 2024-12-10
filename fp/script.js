// Map notes to audio files
const noteSounds = {
    'C': 'sounds/C.mp3',
    'C#': 'sounds/Csharp.mp3',
    'D': 'sounds/D.mp3',
    'D#': 'sounds/Dsharp.mp3',
    'E': 'sounds/E.mp3',
    'F': 'sounds/F.mp3',
    'F#': 'sounds/Fsharp.mp3',
    'G': 'sounds/G.mp3',
    'G#': 'sounds/Gsharp.mp3',
    'A': 'sounds/A.wav',
    'A#': 'sounds/Asharp.mp3',
    'B': 'sounds/B.mp3',
    'C2': 'sounds/C2.mp3',
    'C#2': 'sounds/Csharp2.mp3',
    'D2': 'sounds/D2.mp3',
    'D#2': 'sounds/Dsharp2.mp3',
    'E2': 'sounds/E2.mp3',
    'F2': 'sounds/F2.mp3',
};

// Add click event to keys
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const note = key.dataset.note;
        playNote(note);
    });
});

function playNote(note) {
    const audio = new Audio(noteSounds[note]);
    audio.play();
}
