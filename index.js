// PEXESO

// EVENT LISTENERS ****************************************************************************************************************

// Game Buttons

const startGameBtn = document.getElementById("start_game");
const newGameBtn = document.getElementById("new_game");
const exitGameBtn = document.getElementById("exit_game");

startGameBtn.addEventListener("click", startGame);
newGameBtn.addEventListener("click", startNewGame);
exitGameBtn.addEventListener("click", exitGame);

// Individual Cards (16x)

for (let i = 0; i < document.querySelectorAll(".image").length; i++) {
  document.querySelectorAll(".image")[i].addEventListener("click", function () {
    showCard(i);
  });
}

// VARIABLES **********************************************************************************************************************

let newGame = [];
let cardArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let randomNumberMultiplier = 16;
let cardClickedCounter = 0;
let cardClickedLog = [];

// GAME FUNCTIONS *****************************************************************************************************************

// FIRST - Start Game

function startGame() {
  for (let i = 0; i < document.querySelectorAll(".image").length; i++) {
    // Variables
    let output = [];
    let randomNumber = Math.floor(Math.random() * randomNumberMultiplier);
    // Logic
    output.push(`img/img${cardArray[randomNumber]}.jpg`, true);
    cardArray.splice(randomNumber, 1);
    randomNumberMultiplier--;
    newGame.push(output);
  }
  startGameBtn.disabled = true;
}

// SECOND - Show Card

function showCard(cardClickedIndex) {
  // Condition for clicking the hiden card only
  if (newGame[cardClickedIndex][1] === true) {
    const cardClicked = document.querySelectorAll(".image")[cardClickedIndex];
    cardClicked.setAttribute("src", newGame[cardClickedIndex][0]);
    cardClickedLog.push(cardClickedIndex);
    newGame[cardClickedIndex][1] = false;
    cardClickedCounter++;

    // Condition for third card when no match was found
    if (cardClickedCounter % 3 === 0) {
      // Last card
      document
        .querySelectorAll(".image")
        [cardClickedLog[cardClickedLog.length - 2]].setAttribute(
          "src",
          "img/default.jpg"
        );
      // Penultimate card
      document
        .querySelectorAll(".image")
        [cardClickedLog[cardClickedLog.length - 3]].setAttribute(
          "src",
          "img/default.jpg"
        );

      newGame[cardClickedLog[cardClickedLog.length - 2]][1] = true;
      newGame[cardClickedLog[cardClickedLog.length - 3]][1] = true;

      cardClickedCounter = 1;
    }

    // Condition for evaluating the match
    if (cardClickedCounter % 2 === 0) {
      evaluateMatch();
    }
  }
}

// THIRD Evaluate Match

function evaluateMatch() {
  if (
    newGame[cardClickedLog[cardClickedLog.length - 2]][0] ===
    newGame[cardClickedLog[cardClickedLog.length - 1]][0]
  ) {
    // Adding fade-out animation
    document
      .querySelectorAll(".image")
      [cardClickedLog[cardClickedLog.length - 2]].classList.add("animation_1");
    document
      .querySelectorAll(".image")
      [cardClickedLog[cardClickedLog.length - 1]].classList.add("animation_1");

    // disabling card buttons
    for (let i = 0; i < document.querySelectorAll(".image").length; i++) {
      newGame[i][1] = false;
    }

    // Setting the invisible class after setTimeout
    setTimeout(function () {
      document
        .querySelectorAll(".image")
        [cardClickedLog[cardClickedLog.length - 2]].classList.add("card_hide");
      document
        .querySelectorAll(".image")
        [cardClickedLog[cardClickedLog.length - 1]].classList.add("card_hide");

      // enabling card buttons
      for (let i = 0; i < document.querySelectorAll(".image").length; i++) {
        newGame[i][1] = true;
      }
    }, 2000);

    cardClickedCounter = 0;
  }
}

// ADDITIONAL FUNCTIONS *****************************************************************************************************************

function exitGame() {
  window.close();
}

function startNewGame() {
  // Arrays Restart
  // Variables
  newGame = [];
  cardArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  randomNumberMultiplier = 16;
  cardClickedCounter = 0;
  cardClickedLog = [];

  // Setting Cards to Defaulf
  for (let i = 0; i < document.querySelectorAll(".image").length; i++) {
    document
      .querySelectorAll(".image")
      [i].setAttribute("src", "img/default.jpg");

    // Remove Classes
    document.querySelectorAll(".image")[i].classList.remove("card_hide");
    document.querySelectorAll(".image")[i].classList.remove("animation_1");
  }
  startGame();
}
