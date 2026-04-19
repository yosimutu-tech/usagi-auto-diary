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

// 🎰 ガチャ（キャラ変化つき）
function gacha() {
  if (coin < 100) {
    log("コインが足りない！");
    return;
  }

  coin -= 100;
  updateUI();

  const logEl = document.getElementById("log");
  const character = document.querySelector(".character");

  // ガチャ中
  logEl.textContent = "🎰 ガチャ中…";
  logEl.style.color = "#ff69b4";
  logEl.style.fontSize = "18px";

  setTimeout(() => {
    const rand = Math.random();
    let result = "";

    if (rand < 0.6) {
      result = "🍪 おやつ！(+20体力)";
      energy += 20;
      character.textContent = "🐰";
    } else if (rand < 0.9) {
      result = "💰 コイン！(+200)";
      coin += 200;
      character.textContent = "🐰✨";
    } else {
      result = "👑 超レア！！ +500コイン";
      coin += 500;
      character.textContent = "🐰🔥✨";
    }

    logEl.textContent = "🐰 " + result;
    logEl.style.color = "#ff1493";
    logEl.style.fontSize = "20px";

    updateUI();
    saveGame();

    // 元に戻す
    setTimeout(() => {
      logEl.style.color = "#333";
      logEl.style.fontSize = "16px";
    }, 1500);

  }, 1000);
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
