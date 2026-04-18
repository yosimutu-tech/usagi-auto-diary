let coin = 0;
let energy = 100;

function updateUI() {
  document.getElementById("coin").textContent = coin;
  document.getElementById("energy").textContent = energy;
}

function deliver(amount = 1) {
  for (let i = 0; i < amount; i++) {
    if (energy <= 0) {
      log("🐰 つかれて寝ちゃった…");
      return;
    }
    coin += 50;
    energy -= 10;
  }
  log("📦 配達したよ！");
  updateUI();
}

function rest() {
  energy += 20;
  if (energy > 100) energy = 100;
  log("💤 休んだよ");
  updateUI();
}

function openCode() {
  document.getElementById("codeArea").classList.toggle("hidden");
}

/* ▼ここが超重要：Python風に変換する */
function runCode() {
  let code = document.getElementById("codeInput").value;

  try {
    // Python風 → JS変換
    code = code
      .replace(/for\s+\w+\s+in\s+range\((\d+)\):/g, "for(let i=0;i<$1;i++){")
      .replace(/\n/g, ";")
      .replace(/:/g, "{") + "}";

    eval(code);

    log("✨ うまくできたよ！");
  } catch (e) {
    log("🐰 ちょっとむずかしかったみたい…");
  }

  updateUI();
}

function log(message) {
  document.getElementById("log").textContent = message;
}

updateUI();