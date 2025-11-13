// --- Step 1: PIN Verification ---
function verifyPin() {
    const pinInput = document.getElementById('pin').value;
    const correctPin = '078123';

    if (pinInput === correctPin) {
        // Hide the current step and show the next one
        document.getElementById('pin-step').classList.remove('active');
        document.getElementById('password-step').classList.add('active');
    } else {
        alert('Incorrect PIN. Please try again.');
    }
}

// --- Step 2: Password Verification ---
function verifyPassword() {
    const passwordInput = document.getElementById('password').value;
    const correctPassword = 'classicboy0781';

    if (passwordInput === correctPassword) {
        // Hide the current step and show the next one
        document.getElementById('password-step').classList.remove('active');
        document.getElementById('puzzle-step').classList.add('active');

        // Add the "trick" event listener to the puzzle area
        const puzzleArea = document.getElementById('puzzle-container');
        puzzleArea.addEventListener('click', revealSubmitButton);
    } else {
        alert('Incorrect Password. Please try again.');
    }
}

// --- Step 3: Puzzle Logic ---
function revealSubmitButton() {
    const submitButton = document.getElementById('hidden-submit');
    const instruction = document.getElementById('puzzle-instruction');

    // Reveal the button and update the text
    submitButton.style.display = 'block';
    instruction.textContent = 'Button revealed! Click Submit to continue.';
    
    // Optional: Remove the event listener so it only triggers once
    document.getElementById('puzzle-container').removeEventListener('click', revealSubmitButton);
}

// ... (keep the verifyPin, verifyPassword, and revealSubmitButton functions as they are) ...

// --- Final Login Submission ---
function finalLogin() {
    // Instead of an alert, we now redirect to a server route
    // that will create the user's session.
    window.location.href = '/login_success';
}