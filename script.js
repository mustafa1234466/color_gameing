let currentUser = localStorage.getItem("cg_user");
let balance = parseInt(localStorage.getItem("cg_wallet")) || 1000;
let currentBet = null;
let timeLeft = 30;
let periodNumber = 2026082101;

window.onload = function() {
    if (currentUser) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("game-container").style.display = "block";
        document.getElementById("display-user").innerText = currentUser;
        document.getElementById("wallet-balance").innerText = balance;
        startTimer();
    }
};

function loginUser() {
    let name = document.getElementById("username").value.trim();
    if (name === "") { alert("Please enter a username!"); return; }
    localStorage.setItem("cg_user", name);
    localStorage.setItem("cg_wallet", balance);
    location.reload();
}

function startTimer() {
    setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if (timeLeft <= 0) { timeLeft = 30; generateResult(); }
    }, 1000);
}

function openBetModal(option) {
    currentBet = option;
    document.getElementById("selected-option").innerText = option;
    document.getElementById("bet-modal").style.display = "flex";
}

function closeModal() { document.getElementById("bet-modal").style.display = "none"; }

function confirmBet() {
    let amount = parseInt(document.getElementById("bet-amount").value);
    if (isNaN(amount) || amount <= 0) { alert("Enter a valid amount!"); return; }
    if (amount > balance) { alert("Insufficient wallet balance!"); return; }
    balance -= amount;
    updateWallet();
    closeModal();
    alert(`Successfully bet ₹${amount} on ${currentBet}!`);
}

function updateWallet() {
    document.getElementById("wallet-balance").innerText = balance;
    localStorage.setItem("cg_wallet", balance);
}

function generateResult() {
    let winningNum = Math.floor(Math.random() * 10);
    let winningColor = winningNum === 0 || winningNum === 5 ? "Violet" : (winningNum % 2 === 0 ? "Red" : "Green");
    let tableBody = document.getElementById("history-body");
    tableBody.innerHTML = `<tr><td>${periodNumber}</td><td>${winningNum}</td><td style="font-weight:bold;">${winningColor}</td></tr>` + tableBody.innerHTML;
    periodNumber++;
    document.getElementById("period-id").innerText = periodNumber;
}
