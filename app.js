let word = document.getElementById("word");
text = document.getElementById("text");
results = document.getElementById("score");
allTimes = document.getElementById("time");
final = document.getElementById("game-over");
resetBtn = document.getElementById("set-btn");
option = document.getElementById("sets");
res = document.getElementById("form");
hard = document.getElementById("level");

let words = [
  "js",
  "command",
  "motion",
  "car",
  "laptop",
  "mobile",
  "mother",
  "world",
  "screen",
  "mouse",
  "pen",
  "rubber",
  "man",
  "women",
  "wire",
  "house",
  "apple",
  "god",
  "light",
  "name",
  "come",
  "leg",
];

let timeInterval = setInterval(timeTack, 1000);

let allWord,
  total = 0,
  time = 6,
  level =
    localStorage.getItem("level") !== null
      ? localStorage.getItem("level")
      : "medium";

function character() {
  return words[Math.floor(Math.random() * words.length)];
}

function totalScore() {
  total++;
  results.innerText = total;
}

function wordsPower() {
  allWord = character();
  word.innerText = allWord;
}

function timeTack() {
  time--;
  allTimes.innerText = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
    endGame();
  }
}

function endGame() {
  final.innerHTML = `
  <h1>Time Over</h1>
  <p>Final score is ${total}</p>
  <button onclick="history.go(0)" id="set-btn">Play Again</button>
  `;
  final.style.display = "flex";
}

resetBtn.addEventListener("click", () => {
  option.classList.toggle("hide");
});

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === allWord) {
    e.target.value = "";
    wordsPower();
    totalScore();
    if (level === "hard") {
      time += 2;
    } else if (level === "medium") {
      time += 3;
    } else time += 5;
    timeTack();
  }
});

hard.value = level;
wordsPower();
text.focus();

res.addEventListener("change", (e) => {
  level = e.target.value;
  localStorage.setItem("level", level);
});
