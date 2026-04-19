let coin = 0;
let energy = 100;
let level = 1;

// レベル計算
function updateLevel() {
  level = Math.floor(coin / 500) + 1;
}

// 🐰 キャラ進化
function updateCharacter() {
  let char = "🐰";

  if (level >= 5) char = "👑🐰";
  else if (level >= 3) char = "🐰✨";
  else if (level >= 2) char = "🐰💨";

  document.getElementById("character").textContent = char;
}

// 画面更新
function updateUI() {
  updateLevel();
  updateCharacter();

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

// コード表示
function openCode() {
  document.getElementById("codeArea").classList.toggle("hidden");
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

// 🔥 放置収益
setInterval(() => {
  coin += level * 5;
  updateUI();
  saveGame();
}, 3000);
// 🎰 ガチャ
function gacha() {
  if (coin < 100) {
    log("コインが足りないよ…");
    return;
  }

  coin -= 100;

  const rand = Math.random();

  let result = "";
  let bonus = 0;

  if (rand < 0.6) {
    result = "🐰ノーマル";
    bonus = 0;
  } else if (rand < 0.9) {
    result = "🐰✨レア！";
    bonus = 50;
  } else {
    result = "👑🐰超レア！！";
    bonus = 200;
  }

  coin += bonus;

  log("ガチャ結果：" + result + " +" + bonus + "コイン");
  updateUI();
  saveGame();
}
