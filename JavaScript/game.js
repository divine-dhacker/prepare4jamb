 // Sample word for the game
const wordToSpell = "CODE"; // You can change this to any word you want to test

// Function to start the game (triggered by clicking the mic icon)
function startGame() {
  // Use Speech Synthesis to speak the word aloud
  const msg = new SpeechSynthesisUtterance(`Spell the word: ${wordToSpell}`);
  window.speechSynthesis.speak(msg);

  // Set up the game by placing the letters in the right positions
  let letters = wordToSpell.split("");
  
  // Reset the game before starting
  resetGame();
  
  // Show the letters in their respective spots
  letters.forEach((letter, index) => {
    const letterBox = document.getElementById(`letter${index + 1}`);
    letterBox.setAttribute("data-letter", letter); // Store the correct letter
  });

  // Enable the Submit button
  document.getElementById("submitBtn").disabled = false;
}

// Function to reset the game
function resetGame() {
  const letterContainers = document.querySelectorAll(".letter");
  letterContainers.forEach(container => {
    container.textContent = '';  // Clear any letter from the container
  });

  // Enable all letter buttons for the next round
  const letterButtons = document.querySelectorAll(".letter-button");
  letterButtons.forEach(button => {
    button.disabled = false;
    button.style.backgroundColor = '#444';  // Reset button color
  });

  // Reset the result text (no longer necessary since we're using voice)
  // const resultText = document.getElementById("resultText");
  // resultText.textContent = '';
}

// Function to handle clicking on the letter buttons
function handleLetterClick(button) {
  const clickedLetter = button.textContent; // Get the letter from the button
  const emptySlots = document.querySelectorAll(".letter:not(:empty)"); // Find empty letter containers
  
  if (emptySlots.length < wordToSpell.length) {
    for (let i = 0; i < wordToSpell.length; i++) {
      const letterContainer = document.getElementById(`letter${i + 1}`);
      
      if (!letterContainer.textContent) {
        letterContainer.textContent = clickedLetter;
        button.disabled = true;  // Disable the button once used
        button.style.backgroundColor = '#ddd';  // Change the button color

        break; // Break after adding the letter
      }
    }
  }
}

// Function to check if the word is correctly spelled
function checkWord() {
  const letterContainers = document.querySelectorAll(".letter");
  const wordArray = Array.from(wordToSpell);

  let correct = true;

  letterContainers.forEach((container, index) => {
    if (container.textContent !== wordArray[index]) {
      correct = false;  // If any letter is wrong, set correct to false
    }
  });

  // Speak the result using Speech Synthesis after clicking submit
  const resultMsg = new SpeechSynthesisUtterance(correct ? 'Congratulations! You spelled the word correctly!' : 'Oops! Try again!');
  resultMsg.pitch = 1;  // Adjust pitch if needed
  resultMsg.rate = 1;  // Adjust rate if needed
  window.speechSynthesis.speak(resultMsg);  // Speak the message
}

// Function to handle the Submit button
function submitWord() {
  checkWord(); // Check if the word is correct after submitting
}

// Function to handle the Try Again button
function tryAgain() {
  resetGame(); // Reset the game for another attempt
}

// Add event listeners for the letter buttons
document.querySelectorAll(".letter-button").forEach(button => {
  button.addEventListener("click", () => handleLetterClick(button));
});

// Add event listener to the mic icon to start the game
document.querySelector(".mic-icon").addEventListener("click", startGame);

// Add event listener to the Submit button
document.getElementById("submitBtn").addEventListener("click", submitWord);

// Add event listener to the Try Again button
document.getElementById("tryAgainBtn").addEventListener("click", tryAgain);