// --------1--------
let saved = localStorage.getItem("favorite");

if (saved !== null) {
    document.getElementById("favorite").value = saved;
    document.getElementById("result").textContent = "Твій вибір: " + saved;
}

function saveFavorite() {
    let favorite = document.getElementById("favorite").value;

    if (favorite.trim() === "") {
        document.getElementById("result").textContent = "Введіть назву!";
        return;
    }

    localStorage.setItem("favorite", favorite);

    document.getElementById("result").textContent = "Твій вибір: " + favorite;
}

// ------2---
let energy = localStorage.getItem("energy");

if (energy === null) {
    energy = 100;
} else {
    energy = Number(energy);
}

document.getElementById("energy").textContent = "Енергія: " + energy;

function spendEnergy() {
    if (energy >= 10) {
        energy = energy - 10;

        localStorage.setItem("energy", energy);

        document.getElementById("energy").textContent =
            "Енергія: " + energy;

        document.getElementById("message").textContent =
            "Ви витратили 10 енергії!";
    } else {
        document.getElementById("message").textContent =
            "Недостатньо енергії!";
    }
}

function restoreEnergy() {
    energy = 100;

    localStorage.setItem("energy", energy);

    document.getElementById("energy").textContent =
        "Енергія: " + energy;

    document.getElementById("message").textContent =
        "Енергію відновлено!";
}

// -----------3---------
let player = JSON.parse(localStorage.getItem("player")) || {
    coins: 50,
    skin: "Звичайний"
};

localStorage.setItem("player", JSON.stringify(player));

updateShop();

function updateShop() {
    document.getElementById("coins").textContent =
        " Монети: " + player.coins;

    document.getElementById("skin").textContent =
        "Скін: " + player.skin;
}

function buySkin() {
    if (player.skin === "Золотий") {
        document.getElementById("shopMessage").textContent =
            "Ви вже купили цей скін!";
    } else if (player.coins >= 30) {
        player.coins = player.coins - 30;
        player.skin = "Золотий";

        localStorage.setItem("player", JSON.stringify(player));

        updateShop();

        document.getElementById("shopMessage").textContent =
            " Ви купили Золотий скін!";
    } else {
        document.getElementById("shopMessage").textContent =
            "Недостатньо монет!";
    }
}
// ------4------
let secretWord = "космос";

let wrongWords = JSON.parse(localStorage.getItem("wrongWords")) || [];

let wordForm = document.getElementById("wordForm");
let wordInput = document.getElementById("wordInput");
let wordMessage = document.getElementById("wordMessage");
let wrongList = document.getElementById("wrongList");

showWrong();

wordForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let word = wordInput.value.trim().toLowerCase();

    if (word === secretWord) {
        wordMessage.textContent = " Правильно! Ви вгадали слово!";
    } else {
        wrongWords.push(word);

        localStorage.setItem("wrongWords", JSON.stringify(wrongWords));

        wordMessage.textContent = " Неправильне слово!";
        showWrong();
    }

    wordInput.value = "";
});

function showWrong() {
    wrongList.innerHTML = "";

    for (let word of wrongWords) {
        let li = document.createElement("li");
        li.textContent = word;
        wrongList.appendChild(li);
    }
}

function clearWrong() {
    wrongWords = [];

    localStorage.removeItem("wrongWords");

    showWrong();

    wordMessage.textContent = "Список очищено!";
}


// --------5--------
let max5 = 100;
let levelName5 = "normal";
let number5 = Math.floor(Math.random() * max5) + 1;
let attempts5 = 0;
let finished5 = false;

let record5 = localStorage.getItem("best5_" + levelName5);

showRecord5();

function setLevel5(max, name) {
    max5 = max;
    levelName5 = name;

    document.getElementById("level5").textContent =
        name.toUpperCase() + ": 1–" + max5;

    document.getElementById("guess5").max = max5;
    document.getElementById("guess5").placeholder = "1–" + max5;

    record5 = localStorage.getItem("best5_" + levelName5);

    showRecord5();
    newGame5();
}

function showRecord5() {
    if (record5 === null) {
        document.getElementById("record5").textContent =
            "🏆 Рекорд: ще немає";
    } else {
        document.getElementById("record5").textContent =
            "🏆 Рекорд: " + record5;
    }
}

function checkGuess5() {
    let input = document.getElementById("guess5");
    let guess = Number(input.value);
    let message = document.getElementById("message5");

    if (finished5) {
        message.textContent = "Почніть нову гру!";
        return;
    }

    if (input.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 || guess > max5) {
        message.textContent = "Введіть число від 1 до " + max5 + "!";
        return;
    }

    attempts5++;

    document.getElementById("attempts5").textContent =
        "Спроб: " + attempts5;

    if (guess < number5) {
        message.textContent = "📈 Загадане число більше!";
    } else if (guess > number5) {
        message.textContent = "📉 Загадане число менше!";
    } else {
        finished5 = true;

        if (record5 === null || attempts5 < Number(record5)) {
            record5 = attempts5;

            localStorage.setItem("best5_" + levelName5, record5);

            showRecord5();

            message.textContent =
                "🏆 Новий рекорд: " + attempts5 + " спроб!";
        } else {
            message.textContent =
                "🎉 Ви вгадали за " + attempts5 + " спроб!";
        }
    }
}

function newGame5() {
    number5 = Math.floor(Math.random() * max5) + 1;
    attempts5 = 0;
    finished5 = false;

    document.getElementById("attempts5").textContent = "Спроб: 0";
    document.getElementById("guess5").value = "";

    document.getElementById("message5").textContent =
        "Введіть число і натисніть «Перевірити»";
}

function resetRecord5() {
    localStorage.removeItem("best5_" + levelName5);
    record5 = null;
    showRecord5();
}