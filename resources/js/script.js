// Selecting necessary DOM elements
const wrapper = document.getElementById("tiles");
const pageWrapper = document.getElementById("page-wrapper");
let columns = 0, rows = 0;
let toggled = false, toggledOpacity = false;

// Function to toggle the main animation
const toggle = () => {
    toggled = !toggled;
    pageWrapper.classList.toggle("toggled");
}

// Function to toggle the opacity of the description
const toggleOpacity = () => {
    toggledOpacity = !toggledOpacity;
    let des = document.getElementById('description');
    des.style.opacity = toggledOpacity ? "1" : "0";
}

// Handle individual tile click
const handleOnClick = index => {
    toggle();
    toggleOpacity();

    anime({
        targets: ".tile",
        opacity: toggled ? 0 : 1,
        delay: anime.stagger(50, {grid: [columns, rows], from: index})
    });
}

// Word animation setup
const words = ['Inspire', 'Educate', 'Elevate'].map(word => word.split(''));
let currentWordIndex = 0, currentLetterIndex = 0;

// Animate the change of letters
function animateLetterChange() {
    const description = document.getElementById('description');
    if (currentLetterIndex >= description.children.length) {
        currentWordIndex = (currentWordIndex < words.length - 1) ? currentWordIndex + 1 : 0;
        currentLetterIndex = 0;
        description.classList.remove('fading');
        setTimeout(animateLetterChange, 2000);
    } else {
        description.classList.add('fading');
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = words[currentWordIndex][currentLetterIndex];
        description.children[currentLetterIndex].replaceWith(span);
        currentLetterIndex++;
        setTimeout(animateLetterChange, 100);
    }
}

// Initialize the word animation on window load
window.onload = function () {
    const description = document.getElementById('description');
    description.innerHTML = words[currentWordIndex].map(letter => `<span>${letter}</span>`).join('');
    setTimeout(animateLetterChange, 2000);
    createGrid();  // Create the initial grid
};

// Function to create a single tile
const createTile = index => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.opacity = toggled ? 0 : 1;
    tile.onclick = e => handleOnClick(index);
    return tile;
}

// Function to create multiple tiles
const createTiles = quantity => {
    Array.from(Array(quantity)).forEach((_, index) => {
        wrapper.appendChild(createTile(index));
    });
}

// Function to create the grid of tiles
const createGrid = () => {
    wrapper.innerHTML = "";
    const size = pageWrapper.clientWidth > 800 ? 100 : 50;
    columns = Math.floor(pageWrapper.clientWidth / size);
    rows = Math.floor(pageWrapper.clientHeight / size);
    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);
    createTiles(columns * rows);
}

// Handle window resizing to adjust the grid
window.onresize = createGrid;

// Dynamic title animation
let direction = true;
let title = "🚀";
let name = 'FutureSpace';
let maxSpaces = 10;
let currentSpaces = 0;

setInterval(() => {
    let spaces = "_".repeat(currentSpaces);
    document.title = name + spaces + title;
    if (direction) {
        currentSpaces = (currentSpaces >= maxSpaces) ? (direction = false, maxSpaces) : currentSpaces + 1;
    } else {
        currentSpaces = (currentSpaces <= 0) ? (direction = true, 0) : currentSpaces - 1;
    }
}, 500);

document.addEventListener('mousemove', function (e) {
    const cursor = document.getElementById('customCursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const cards = document.querySelectorAll('.card');
let cursor = document.getElementById('customCursor');


cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Change cursor style or add effects when hovering over a card
        cursor.style.transform = 'scale(2)';
        cursor.style.backdropFilter = 'blur(5px)';
        cursor.style.opacity = '0.1';
    });

    card.addEventListener('mouseleave', () => {
        // Revert cursor style when not hovering over a card
        cursor.style.transform = 'scale(1)'; // Revert effect
        cursor.style.backdropFilter = 'blur(0px)'; // Revert effect
        cursor.style.opacity = '1'; // Revert effect
    });
});
