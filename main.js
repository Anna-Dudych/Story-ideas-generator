const starts = ["Покажи", "Зніми", "Зроби", "Поділись"];
const topics = ["свій день", "свій ранок", "своє навчання", "улюблену музику"];
const endings = ["з музикою 🎵", "з опитуванням 📊", "креативно ✨", "з питанням 🤔"];

const moods = {
  happy: ["весело", "з посмішкою 😄"],
  chill: ["спокійно", "атмосферно 🌙"],
  active: ["енергійно 💥", "динамічно"]
};

const types = {
  video: ["у форматі відео 🎥"],
  photo: ["у форматі фото 📸"],
  interactive: ["з інтерактивом 📊"]
};

let history = JSON.parse(localStorage.getItem("history")) || [];
let saved = JSON.parse(localStorage.getItem("saved")) || [];

function buildIdea() {
  const start = rand(starts);
  const topic = rand(topics);
  const ending = rand(endings);

  const mood = document.getElementById("mood").value;
  const type = document.getElementById("type").value;

  let extra = "";

  if (mood !== "any") extra += " " + rand(moods[mood]);
  if (type !== "any") extra += " " + rand(types[type]);

  return `${start} ${topic} ${ending}${extra}`;
}

function generateMultiple() {
  const container = document.getElementById("ideasContainer");
  container.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const idea = buildIdea();

    const card = document.createElement("div");
    card.className = "idea-card";

    const text = document.createElement("div");
    text.className = "idea-text";
    text.innerText = idea;

    const actions = document.createElement("div");
    actions.className = "idea-actions";

    const saveBtn = document.createElement("button");
    saveBtn.innerText = "❤️";
    saveBtn.onclick = () => saveIdea(idea);

    const copyBtn = document.createElement("button");
    copyBtn.innerText = "📋";
    copyBtn.onclick = () => navigator.clipboard.writeText(idea);

    const regenBtn = document.createElement("button");
    regenBtn.innerText = "🔄";
    regenBtn.onclick = () => {
      text.innerText = buildIdea();
    };

    actions.appendChild(saveBtn);
    actions.appendChild(copyBtn);
    actions.appendChild(regenBtn);

    card.appendChild(text);
    card.appendChild(actions);

    container.appendChild(card);

    addToHistory(idea);
  }

  renderHistory();
}

function addToHistory(idea) {
  history.unshift(idea);
  history = history.slice(0, 10);
  localStorage.setItem("history", JSON.stringify(history));
}

function renderHistory() {
  const list = document.getElementById("historyList");
  if (!list) return;

  list.innerHTML = "";
  history.forEach(i => {
    const li = document.createElement("li");
    li.innerText = i;
    list.appendChild(li);
  });
}

function saveIdea(idea) {
  if (!saved.includes(idea)) {
    saved.push(idea);
    localStorage.setItem("saved", JSON.stringify(saved));
    renderSaved();
  }
}

function renderSaved() {
  const list = document.getElementById("savedList");
  if (!list) return;

  list.innerHTML = "";

  saved.forEach((idea, index) => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.innerText = idea;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = () => {
      saved.splice(index, 1);
      localStorage.setItem("saved", JSON.stringify(saved));
      renderSaved();
    };

    li.appendChild(text);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

window.onload = () => {
  renderHistory();
  renderSaved();
};

function clearHistory() {
  history = [];
  localStorage.removeItem("history");
  renderHistory();
}

function clearSaved() {
  saved = [];
  localStorage.removeItem("saved");
  renderSaved();
}