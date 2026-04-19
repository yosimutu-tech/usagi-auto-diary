let coin = 0;
let energy = 100;
let level = 1;
let power = 1; // ★追加（ガチャ強化）

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

  coin += 50 * power; // ★強化
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

// 🎰 ガチャ（強化版）
function gacha() {
  if (coin < 100) {
    log("コインが足りないよ…");
    return;
  }

  coin -= 100;

  const rand = Math.random();
  let result = "";

  if (rand < 0.6) {
    result = "🐰ノーマル";
  } else if (rand < 0.9) {
    result = "🐰✨レア！パワー+1";
    power += 1;
  } else {
    result = "👑🐰超レア！！パワー+3";
    power += 3;
  }

  log("ガチャ結果：" + result);
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
  localStorage.setItem("power", power); // ★追加
}

// 読み込み
function loadGame() {
  const savedCoin = localStorage.getItem("coin");
  const savedEnergy = localStorage.getItem("energy");
  const savedPower = localStorage.getItem("power");

  if (savedCoin !== null) coin = parseInt(savedCoin);
  if (savedEnergy !== null) energy = parseInt(savedEnergy);
  if (savedPower !== null) power = parseInt(savedPower);

  updateUI();
}

// 初期化
loadGame();

// 🔥 放置収益（強化版）
setInterval(() => {
  coin += level * power * 5; // ★ここ重要
  updateUI();
  saveGame();
}, 3000);
