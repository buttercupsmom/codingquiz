// Global Variables
const startBtn = document.getElementById("start");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const timerElement = document.getElementById("timer");
const highScoreDiv = document.getElementById("high-scores");
const questions = [
  {
    title: "When is Buttercup's Birthday?",
    answers: ["March 5th", "April 8th", "April 20th"],
    correct: "March 5th",
  },
  {
    title: "What city was Buttercup adopted in?",
    answers: ["Nashville", "Chicago", "Virginia Beach"],
    correct: "Virginia Beach",
  },
  {
    title: "What is Buttercup's favorite toy?",
    answers: ["Green Dog", "Raccoon", "Big Rope"],
    correct: "Green Dog",
  },
  {
    title: "Who is Buttercup's Best Friend?",
    answers: ["Smokey", "Annika", "Lacy"],
    correct: "Annika",
  },
  {
    title: "What is Buttercup's favorite treat?",
    answers: ["Apple Pie", "Cheese", "Peanut Butter"],
    correct: "Cheese",
  },
];

let qIndex = 0;
let timerCount = 30;
let isWin = false;

// Functions
function startGame() {
  // timerCount = timerCount;
  answersDiv.textContent = " ";
  // Show first question with answers
  questionDiv.innerHTML = questions[qIndex].title;
  // Loop through answers
  questions[qIndex].answers.forEach((answer) => {
    // Create element button, add attributes value and text, add click event, and append button to the answers div
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer;
    answerBtn.setAttribute("value", answer);
    answerBtn.onclick = answerClick;
    answersDiv.appendChild(answerBtn);
  });
}

function answerClick() {
  // Determine the answer the user chose.
  let clickedAnswer = this.value;
  // Verify if the answer is correct
  if (clickedAnswer === questions[qIndex].correct) {
    // Let User know they got the answer right or wrong
    alert("You are correct!!");
    // Move to the next question or end the game.
    qIndex++;
  }
  if (questions.length > qIndex) {
    startGame();
  } else {
    endGame();
  }
}

// End Quiz
function endGame() {
  isWin = true;
  setsHighScore();
}

// Start Timer
function startTimer() {
  console.log("startTimer");
  startGame();
  timer = setInterval(function () {
    if (isWin === true) {
      clearInterval(timer);
    }
    console.log(timerCount);
    timerCount--;
    timerElement.textContent = timerCount;

    // Test if time has run out
    if (timerCount <= 0) {
      clearInterval(timer);
      alert("You Lost, get to know Buttercup a little better! 🐶");
    }
  }, 1000);
}

// Save High Score/
function setsHighScore() {
  // Saves High Score to Local Storage
  const highScores =
    JSON.parse(window.localStorage.getItem("high-scores")) || [];
  if (isWin === true) {
    let initials = prompt("Enter your initials.");
    const userScore = timerCount;
    const theScore = {
      initials: initials,
      score: userScore,
    };
    console.log(userScore);
    highScores.push(theScore);
    window.localStorage.setItem("high-scores", JSON.stringify(highScores));
  }
  highScoreDiv.innerHTML = "";
  highScores.forEach((score) => {
    highScoreDiv.innerHTML += `${score.initials}: ${score.score} <br>`;
  });
}

// Start Quiz
startBtn.addEventListener("click", startTimer);
