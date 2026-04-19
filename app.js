let coin = 0;
let energy = 100;

function updateUI() {
  document.getElementById("coin").textContent = coin;
  document.getElementById("energy").textContent = energy;
}

function deliver() {
  if (energy <= 0) {
    log("つかれて寝ちゃった…");
    return;
  }
  coin += 50;
  energy -= 10;

  log("配達したよ！");
  updateUI();
  saveGame();
}

function rest() {
  energy += 20;
  if (energy > 100) energy = 100;

  log("休んだよ");
  updateUI();
  saveGame();
}

function openCode() {
  document.getElementById("codeArea").classList.toggle("hidden");
}

function log(message) {
  document.getElementById("log").textContent = "🐰 " + message;
}

// 保存
function saveGame() {
  localStorage.setItem("coin", coin);
  localStorage.setItem("energy", energy);
}

// 読み込み
function loadGame() {
  const savedCoin = localStorage.getItem("coin");
  const savedEnergy = localStorage.getItem("energy");

  if (savedCoin !== null) coin = parseInt(savedCoin);
  if (savedEnergy !== null) energy = parseInt(savedEnergy);

  updateUI();
}

// 初期化
loadGame();
