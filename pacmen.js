var pos = 0;
const pacArray = [
    ['images-pacman1.png', 'Ghost2.png'],
    ['images-pacman3.png', 'images-pacman4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen
const ghosts = []; // This array holds all the ghosts

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(10); // {x:?, y:?}
    let position = setToRandom(200);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = 'PacMan1.png';
    newimg.width = 100;
    newimg.style.left = position.x;
    newimg.style.top = position.y;
    //
    // set position here 
    //

    // add new Child image to game
    game.appendChild( newimg );
    // return details in an object
    return {
        position,
        velocity,
        newimg
    }
}

// Factory to make a ghost at a random position with random velocity
function makeGhosts() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(10); // {x:?, y:?}
    let position = setToRandom(200);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = 'Ghost2.png';
    newimg.width = 100;
    newimg.style.left = position.x;
    newimg.style.top = position.y;
    //
    // add new Child image to game
    game.appendChild(newimg);
    // return details in an object
    return {
        position,
        velocity,
        newimg
    }
}

function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
    })

ghosts.forEach((item) => {
    checkCollisions(item)
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
})
setTimeout(update, 20);
}

function checkCollisions(item) {
    //
    // detect collision with all walls and make pacman bounce
    //
    if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0) item.velocity.x = -item.velocity.x;
    if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}

function makeGhost() {
    ghosts.push(makeGhosts());
}

if (typeof module !== 'undefined') {
    module.exports = { checkCollisions, update, pacMen };
}
