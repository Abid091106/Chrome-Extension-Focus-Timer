let time = 1500; // 25 minutes
let interval = null;

const timerDisplay = document.getElementById("timer");

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2,"0")}`;
}

document.getElementById("start").onclick = () => {
  if (interval) return;
  interval = setInterval(() => {
    time--;
    updateDisplay();
    if (time <= 0) {
      clearInterval(interval);
      alert("Time's up!");
    }
  }, 1000);
};

document.getElementById("pause").onclick = () => {
  clearInterval(interval);
  interval = null;
};

const siteInput = document.getElementById("siteInput");
const siteList = document.getElementById("siteList");

function loadSites() {
  chrome.storage.sync.get(["blocked"], (data) => {
    const sites = data.blocked || [];
    siteList.innerHTML = "";
    sites.forEach(site => {
      const li = document.createElement("li");
      li.textContent = site;
      siteList.appendChild(li);
    });
  });
}

document.getElementById("addSite").onclick = () => {
  const site = siteInput.value.trim();
  if (!site) return;
  chrome.storage.sync.get(["blocked"], (data) => {
    const sites = data.blocked || [];
    if (!sites.includes(site)) {
      sites.push(site);
      chrome.storage.sync.set({ blocked: sites }, loadSites);
    }
  });
};

loadSites();
updateDisplay();
