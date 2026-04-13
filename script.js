const canvas = await Canvas(200, 200, { alpha: true });
document.getElementById('script-holder').appendChild(canvas);
noStroke();

world.timeScale = 1;

let wall1 = new Sprite(0, 100, 200, 10, STATIC);
wall1.color = '#010081';
let wall2 = new Sprite(-100, 0, 10, 200, STATIC);
wall2.color = '#010081';
let wall3 = new Sprite(100, 0, 10, 200, STATIC);
wall3.color = '#010081';
let wall4 = new Sprite(0, -100, 200, 10, STATIC);
wall4.color = '#010081';


for (let i = 0; i < 25; i++) {
    let block = new Sprite(-10 + Math.random() * 20, -10 + Math.random() * 20, 25, 25, DYNAMIC);
}

q5.update = function () {
  clear();
  if (pointer.presses()) {
    world.explodeAt(pointer, 100);
  }
};