const wrapper = document.getElementById("tiles");

let columns = 0,
    rows = 0,
    toggled = false,
    toggledOpacity = false;

const toggle = () => {
  toggled = !toggled;

  document.body.classList.toggle("toggled");
}

const toggleOpacity = () =>{
  toggledOpacity = !toggledOpacity;
  if(toggledOpacity){
    let des = document.getElementById('description')
    des.style.opacity = "1"; 
  }else{
    let des = document.getElementById('description');
    des.style.opacity = "0" ;
  }
}

const handleOnClick = index => {
  toggle();
  toggleOpacity();
  
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

const words = ['Inspire', 'Educate', 'Elevate'].map(word => word.split(''));
let currentWordIndex = 0;
let currentLetterIndex = 0;

function animateLetterChange() {
  const description = document.getElementById('description');
  if (currentLetterIndex >= description.children.length) {
    if (currentWordIndex < words.length - 1) {
      currentWordIndex++;
    } else {
      currentWordIndex = 0;
    }
    currentLetterIndex = 0;
    description.classList.remove('fading'); // Remove the 'fading' class
    setTimeout(animateLetterChange, 2000); // Wait for 2 seconds before starting the animation for the next word
  } else {
    description.classList.add('fading'); // Add the 'fading' class
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = words[currentWordIndex][currentLetterIndex];
    description.children[currentLetterIndex].replaceWith(span);
    currentLetterIndex++;
    setTimeout(animateLetterChange, 100); // Continue the animation for the current word
  }
}

window.onload = function() {
  const description = document.getElementById('description');
  description.innerHTML = words[currentWordIndex].map(letter => `<span>${letter}</span>`).join('');
  setTimeout(animateLetterChange, 2000); // Start the animation for the first word after 2 seconds
};

const createTile = index => {
  const tile = document.createElement("div");
  
  tile.classList.add("tile");
  
  tile.style.opacity = toggled ? 0 : 1;
  
  tile.onclick = e => handleOnClick(index);
  
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = document.body.clientWidth > 800 ? 100 : 50;
  
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);
  
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  createTiles(columns * rows);
}

createGrid();

let direction = true;
let title = "🚀";
let name = 'FutureSpace';
let maxSpaces = 10;
let currentSpaces = 0;

setInterval(() => {
  let spaces = "_".repeat(currentSpaces);
  document.title = name+ spaces + title;

  if (direction) {
    currentSpaces++;
    if (currentSpaces >= maxSpaces) {
      direction = false;
    }
  } else {
    currentSpaces--;
    if (currentSpaces <= 0) {
      direction = true;
    }
  }
}, 500);

window.onresize = () => createGrid();