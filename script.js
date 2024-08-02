let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const finalResult = document.querySelector(".finalResult");
const lowOrHi = document.querySelector(".lowOrHi");
const finalMessage = document.querySelector(".finalMessage");
const finalIcon = document.querySelector(".finalIcon");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

function checkGuess(event) {
  event.preventDefault();
  const userGuess = Number(guessField.value);
  const handleClearLastResult = () => {
    lastResult.textContent = "";
    lastResult.style.backgroundColor = "white";
  };

  if (guessCount === 1) {
    guesses.textContent = "Previous guesses:";
  }
  guesses.textContent = `${guesses.textContent} ${userGuess}`;

  if (userGuess === randomNumber) {
    $("#myModal").modal({
      backdrop: "static",
      keyboard: false,
      show: true,
    });
    $("#myModal").modal("show");
    handleClearLastResult();
    finalIcon.src = "https://cdn.lordicon.com/xjronrda.json";
    finalIcon.style.width = "150px";
    finalIcon.style.height = "150px";
    finalResult.textContent = "You've won!";
    finalResult.style.color = "green";
    finalMessage.textContent =
      "Congratulations, you've guessed the correct number!";
    lowOrHi.textContent = "";
    setGameOver();
  } else if (guessCount === 10) {
    $("#myModal").modal("show");
    handleClearLastResult();
    finalIcon.src = "";
    finalIcon.style.width = 0;
    finalIcon.style.height = 0;
    finalResult.textContent = "GAME OVER";
    finalMessage.textContent = `The correct number was ${randomNumber}. Better luck next time!`;
    lowOrHi.textContent = "";
    setGameOver();
  } else {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Last guess was too low!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high!";
    }
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  // resetButton = document.createElement("button");
  // resetButton.textContent = "Start new game";
  // document.body.append(resetButton);
  // resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll(".resultParas p");
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }

  // resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();
  lastResult.style.backgroundColor = "white";
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
