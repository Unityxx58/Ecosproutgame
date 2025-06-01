const gardenSize = 15; // 5x3 grid
let coins = parseInt(localStorage.getItem('coins')) || 50;

const garden = [];
// Each plot: { seed: null or seedType, growth: 0-3 }

const seeds = {
  carrot: {
    cost: 10,
    growTime: 5, // seconds per stage
    sellPrice: 15,
    img: 'https://i.imgur.com/e8kqgN0.png'
  },
  tomato: {
    cost: 15,
    growTime: 7,
    sellPrice: 25,
    img: 'https://i.imgur.com/qR6d5wS.png'
  }
};

const maxGrowth = 3;

const coinsSpan = document.getElementById('coins');
const gardenDiv = document.getElementById('garden');

function updateCoins() {
  coinsSpan.textContent = coins;
  localStorage.setItem('coins', coins);
}

function initGarden() {
  for (let i = 0; i < gardenSize; i++) {
    garden[i] = { seed: null, growth: 0, plantedAt: 0 };
  }
}

function renderGarden() {
  gardenDiv.innerHTML = '';
  for (let i = 0; i < gardenSize; i++) {
    const plot = document.createElement('div');
    plot.className = 'plot';
    if (!garden[i].seed) {
      plot.classList.add('empty');
    }
    plot.dataset.index = i;
    plot.onclick = () => plantSeed(i);
    
    if (garden[i].seed) {
      const plant = document.createElement('div');
      plant.className = 'plant';
      const seedType = garden[i].seed;
      plant.style.backgroundImage = `url(${seeds[seedType].img})`;
      const scale = 0.5 + (garden[i].growth / maxGrowth) * 0.5;
      plant.style.transform = `scale(${scale})`;
      plot.appendChild(plant);
    }
    gardenDiv.appendChild(plot);
  }
}

function buySeed(seedType) {
  if (coins >= seeds[seedType].cost) {
    coins -= seeds[seedType].cost;
    updateCoins();
    alert(`You bought a ${seedType} seed! Now plant it.`);
  } else {
    alert('Not enough coins!');
  }
}

function plantSeed(index) {
  if (!garden[index].seed) {
    // Need to check if player has seed in inventory (simplified: let’s allow planting right after buying for now)
    // To improve: add seed inventory system.
    
    const seedType = prompt("Which seed do you want to plant? Type 'carrot' or 'tomato'");
    if (!seedType || !seeds[seedType]) return alert('Invalid seed type.');
    
    if (coins >= seeds[seedType].cost) {
      coins -= seeds[seedType].cost;
      updateCoins();
      garden[index].seed = seedType;
      garden[index].growth = 0;
      garden[index].plantedAt = Date.now();
      renderGarden();
    } else {
      alert('Not enough coins to plant this seed!');
    }
  } else {
    alert('Plot already has a plant!');
  }
}

function growPlants() {
  const now = Date.now();
  let updated = false;
  for (let i = 0; i < gardenSize; i++) {
    if (garden[i].seed && garden[i].growth < maxGrowth) {
      const seedType = garden[i].seed;
      const elapsed = (now - garden[i].plantedAt) / 1000;
      const stage = Math.floor(elapsed / seeds[seedType].growTime);
      if (stage > garden[i].growth && stage <= maxGrowth) {
        garden[i].growth = stage;
        updated = true;
      }
    }
  }
  if (updated) renderGarden();
}

function sellPlants() {
  let earned = 0;
  for (let i = 0; i < gardenSize; i++) {
    if (garden[i].seed && garden[i].growth >= maxGrowth) {
      earned += seeds[garden[i].seed].sellPrice;
      garden[i] = { seed: null, growth: 0, plantedAt: 0 };
    }
  }
  if (earned > 0) {
    coins += earned;
    updateCoins();
    alert(`You sold your harvest for ${earned} coins!`);
    renderGarden();
  } else {
    alert('No fully grown plants to sell!');
  }
}

function saveGame() {
  localStorage.setItem('coins', coins);
  localStorage.setItem('garden', JSON.stringify(garden));
}

function loadGame() {
  const savedGarden = JSON.parse(localStorage.getItem('garden'));
  if (savedGarden) {
    for(let i=0; i<gardenSize; i++){
      garden[i] = savedGarden[i];
    }
  }
}

function gameLoop() {
  growPlants();
  saveGame();
  setTimeout(gameLoop, 1000);
}

updateCoins();
initGarden();
loadGame();
renderGarden();
gameLoop();
