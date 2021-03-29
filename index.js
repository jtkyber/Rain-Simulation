import { update as updateDrop, draw as drawDrop } from './drop.js';

const droplet = document.querySelector('.droplet');
const canvas = document.querySelector('.canvas');
let end = false;

let lastRenderTime = 0;
const DROP_SPEED = 144;
function main(currentTime) {
    if (end) return;
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / DROP_SPEED) return;
    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateDrop();
}

function draw() {
    drawDrop();
}

const terminate = (event) => {
    if (event.keyCode === 13) {
        end = true;
    }
}

document.addEventListener('keydown', terminate)
