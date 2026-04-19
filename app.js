let coin = 0;
let energy = 100;
let level = 1;

// レベル計算
function updateLevel() {
  level = Math.floor(coin / 500) + 1;
}

// 画面更新
function updateUI() {
  updateLevel();

  document.getElementById("coin").textContent = coin;
  document.getElementById("energy").textContent = energy;
  document.getElementById("level").textContent = level;
}

// 配達
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

// 休む
function rest() {
  energy += 20;
  if (energy > 100) energy = 100;

  log("休んだよ");
  updateUI();
  saveGame();
}

// メッセージ
function log(message) {
  document.getElementById("log").textContent = "🐰 " + message;
}

// 保存
function saveGame() {
  localStorage.setItem("coin", coin);
  localStorage.setItem("energy", energy);
  localStorage.setItem("level", level);
}

// 読み込み
function loadGame() {
  const savedCoin = localStorage.getItem("coin");
  const savedEnergy = localStorage.getItem("energy");
  const savedLevel = localStorage.getItem("level");

  if (savedCoin !== null) coin = parseInt(savedCoin);
  if (savedEnergy !== null) energy = parseInt(savedEnergy);
  if (savedLevel !== null) level = parseInt(savedLevel);

  updateUI();
}

// 初期化
loadGame();

// test
