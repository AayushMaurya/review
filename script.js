document.addEventListener('DOMContentLoaded', () => {
    const state = {
        missionRating: 5,
        highlights: [],
        cookingRating: 5,
        bhakriReview: "",
        missedThings: [],
        submittedAt: ""
    };

    const screens = document.querySelectorAll('.screen');
    const nextBtns = document.querySelectorAll('.next-btn');
    const startBtn = document.getElementById('start-btn');
    const submitBtn = document.getElementById('submit-btn');
    const internalNotesBtn = document.getElementById('internal-notes-btn');
    const notesContinueBtn = document.getElementById('notes-continue-btn');
    const closeBtn = document.getElementById('close-btn');

    // Navigation Helper
    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
            if (screen.id === screenId) {
                screen.classList.add('active');
            }
        });
        window.scrollTo(0, 0);
    }

    // Start Button
    startBtn.addEventListener('click', () => showScreen('q1-screen'));

    // Next Buttons (Generic)
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextId = btn.getAttribute('data-next');
            showScreen(nextId);
        });
    });

    // Sliders
    const missionRatingSlider = document.getElementById('missionRating');
    const missionRatingVal = document.getElementById('q1-val');
    missionRatingSlider.addEventListener('input', (e) => {
        state.missionRating = parseInt(e.target.value);
        missionRatingVal.textContent = state.missionRating;
    });

    const cookingRatingSlider = document.getElementById('cookingRating');
    const cookingRatingVal = document.getElementById('q3-val');
    cookingRatingSlider.addEventListener('input', (e) => {
        state.cookingRating = parseInt(e.target.value);
        cookingRatingVal.textContent = state.cookingRating;
    });

    // Cards Selection Logic
    function setupCards(containerId, isMulti, stateKey) {
        const container = document.getElementById(containerId);
        const cards = container.querySelectorAll('.card');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const value = card.getAttribute('data-value');

                if (isMulti) {
                    if (card.classList.contains('selected')) {
                        card.classList.remove('selected');
                        state[stateKey] = state[stateKey].filter(v => v !== value);
                    } else {
                        card.classList.add('selected');
                        state[stateKey].push(value);
                    }
                } else {
                    cards.forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    state[stateKey] = value;
                }
            });
        });
    }

    setupCards('highlights-options', true, 'highlights');
    setupCards('bhakri-options', false, 'bhakriReview');
    setupCards('missed-options', true, 'missedThings');

    // Submit Action
    const API_URL = "https://script.google.com/macros/s/AKfycbzWSaPCep4xeHYJ_yyf3L8J_ZO_8rlXju1eGEx6XZE5Yo6nCwI3u8mU5bqEeSalgIHC/exec";

    submitBtn.addEventListener('click', async () => {
        state.submittedAt = new Date().toISOString();
        showScreen('analysis-screen');
        
        // Start Analysis Sequence
        runAnalysisSequence();

        // API POST
        const payload = {
            missionRating: state.missionRating,
            highlights: state.highlights.join(", "),
            cookingRating: state.cookingRating,
            bhakriReview: state.bhakriReview,
            missedThings: state.missedThings.join(", "),
            userAgent: navigator.userAgent,
            pageVersion: "1.0",
            submittedAt: state.submittedAt
        };

        try {
            await fetch(API_URL, {
                method: 'POST',
                mode: 'no-cors', // Added to handle CORS with Google Apps Script
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.error('Fetch Error:', error);
        }
        // Requirement: Never block report generation because of API failure
    });

    // Analysis Loading Sequence
    const analysisMessages = [
        "Analyzing report...",
        "Reviewing cooking scores...",
        "Evaluating bhakri quality...",
        "Cross-checking random moments...",
        "Investigating missing coffee...",
        "Consulting experts...",
        "(There are no experts.)",
        "Generating final report..."
    ];

    function runAnalysisSequence() {
        const textEl = document.getElementById('analysis-text');
        let index = 0;

        const interval = setInterval(() => {
            index++;
            if (index < analysisMessages.length) {
                textEl.textContent = analysisMessages[index];
            } else {
                clearInterval(interval);
                finalizeReport();
            }
        }, 1500); // Exactly 1.5s as per requirements
    }

    function finalizeReport() {
        // Update report values
        document.getElementById('report-bhakri').textContent = state.bhakriReview || "Completed";
        const coffeeMissing = state.missedThings.includes("Coffee");
        document.getElementById('report-coffee').textContent = coffeeMissing ? "Missing" : "Found (Surprisingly)";
        
        showScreen('report-screen');
    }

    // Internal Notes Flow
    const internalNotes = [
        "The missing coffee issue remains unresolved.",
        "Let's have it next time then.",
        "I finished 1st season of The Office."
    ];
    let currentNoteIndex = 0;

    internalNotesBtn.addEventListener('click', () => {
        currentNoteIndex = 0;
        updateNote();
        showScreen('notes-screen');
    });

    notesContinueBtn.addEventListener('click', () => {
        currentNoteIndex++;
        if (currentNoteIndex < internalNotes.length) {
            updateNote();
        } else {
            showScreen('final-screen');
        }
    });

    function updateNote() {
        const noteTextEl = document.getElementById('note-text');
        noteTextEl.style.opacity = 0;
        setTimeout(() => {
            noteTextEl.textContent = internalNotes[currentNoteIndex];
            noteTextEl.style.opacity = 1;
        }, 300);
    }

    closeBtn.addEventListener('click', () => {
        // Just reset or show final message
        alert("Report filed. Closing window.");
        window.location.reload();
    });
});
