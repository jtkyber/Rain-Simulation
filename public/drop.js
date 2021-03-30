const canvas = document.querySelector('.canvas');

const drops = [];
let tempDrops = [];
const splatters = [];
let splatterId = 0;
let splatterSize;
let count = 0;
let dropId;
let dropSize;
const dropScaler = 1;
const dropsPerFrame = 1;

const setDropSize = () => {
    const randNum = Math.random() * 1092;

    if (randNum < 2) dropSize = dropScaler + (Math.random() * (8 - 7) + 7);
    else if (randNum < 12) dropSize = dropScaler + (Math.random() * (7 - 6) + 6);
    else if (randNum < 39) dropSize = dropScaler + (Math.random() * (6 - 5) + 5);
    else if (randNum < 120) dropSize = dropScaler + (Math.random() * (5 - 4) + 4);
    else if (randNum < 363) dropSize = dropScaler + (Math.random() * (4 - 3) + 3);
    else dropSize = dropScaler + (Math.random() * (3 - 1) + 1);
}

export const update = () => {
    let counter = 0;
    while (counter < dropsPerFrame) {
        setDropSize();
        dropId = 'drop' + count;
        drops.push({
            y: Math.random() * -20,
            id: dropId,
            size: dropSize,
            speed: dropSize / 30,
            stopLocation: (canvas.getBoundingClientRect().bottom - 480) + (dropSize * 60)
        })
        tempDrops.push(drops[drops.length - 1]);

        count += 1;
        counter += 1;
    }

    for (let drop of drops) {
            drop.y += (drop.speed * drop.y / 4) + 8;
        }

}

export const draw = () => {
    const canvasLeft = 20;
    const canvasRight = (document.body.getBoundingClientRect().right - canvas.getBoundingClientRect().left) - (document.body.getBoundingClientRect().right - canvas.getBoundingClientRect().right);
    for (let drop of tempDrops) {
        const newDrop = document.createElement('div');
        newDrop.style.left = (Math.random() * ((canvasRight - 10) - canvasLeft) + canvasLeft) + 'px';
        newDrop.style.top = drop.y + 'px';
        newDrop.classList.add('droplet');
        newDrop.id = drop.id;
        // newDrop.style.backgroundColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        newDrop.style.width = drop.size + 'px';
        newDrop.style.height = drop.size + 'px';
        canvas.append(newDrop);
    }

    tempDrops = [];

    for (let i = 0; i < drops.length; i++) {
        const d = document.getElementById(drops[i].id);
        if (d.getBoundingClientRect().top > (drops[i].stopLocation)) {
            const splatter = document.createElement('div');
            splatter.classList.add('splatterEffect');
            splatter.style.top = drops[i].stopLocation + 'px';
            splatter.style.left = d.style.left;
            splatter.id = 'splat' + splatterId;
            splatter.style.width = (drops[i].size) * 1.8 + 'px';
            splatter.style.height = (drops[i].size / 4) * 1.8 + '2px';
            splatters.push(splatter.id);
            canvas.append(splatter);
            d.remove();
            drops.splice(i, 1);
            splatterId += 1;
        } else d.style.top = drops[i].y + 'px';
    }

    for (let i = 0; i < splatters.length; i++) {
        const splat = document.getElementById(splatters[i]);
        const animationEnd = splat.addEventListener('animationend', function() {
            splatters.splice(i, 1);
            splat.remove();
        });
    }
}
