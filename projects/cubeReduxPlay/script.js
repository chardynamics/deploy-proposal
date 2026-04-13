//new Q5();

var stage = 2;
var pulse = {
	var: 200,
	rate: 5,
}

var fade = {
	intro: 255,
	out: 0
}

var cube;

var center = {
    x: 125,
    y: 125
};

/*
f = false background
j = jump pad
l = lava
1 = first teleport
2 = second teleport
w = done
*/
var levels = [
    [
    "-                    -",
    "-                    -",
    "-                    -",
    "-           1     w  -",
    "--  2       -        -",
    "-   -                -",
    "-                    -",
    "-                    -",
    "-                    -",
    "-    w     w     w  j-",
    "- --eeeeeeeeeeeeeee---",
    "- --------------------",
    "-                    -",
    "-                    -",
    "-j                   -",
    "---lwwwlwwwlwwwlwww- -",
    "-------------------- -",
    "-                    -",
    "-p                  j-",
    "----------------------"],
    [
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "                      ",
    "----------------------"],
];
function setup() {
	createCanvas(250, 250);
	var canvas = document.querySelector("canvas");
	document.getElementById("script-holder").appendChild(canvas);
	noStroke();

  world.gravity.y = 50;
  allSprites.autoDraw = false;
  allSprites.autoUpdate = false;
  world.autoStep = false;
  spriteInit();
}

var floorTiles, waterTiles, enemiesTiles, lavaTiles, teleport1Tiles, teleport2Tiles, trampolineTiles, startTiles, winTiles;
function spriteInit() {
  floorTiles = new Group();
  floorTiles.color = 'black';
  floorTiles.w = 10;
  floorTiles.h = 10;
  floorTiles.drag = 0;
  floorTiles.tile = '-';
  floorTiles.collider = "static";

  waterTiles = new Group();
  waterTiles.color = color(0, pulse.var, 255, 180);
  waterTiles.w = 10;
  waterTiles.h = 10;
  waterTiles.drag = 1;
  waterTiles.tile = 'w';
  waterTiles.collider = "static";

  enemiesTiles = new Group();
  enemiesTiles.w = 10;
  enemiesTiles.h = 10;
  enemiesTiles.drag = 1;
  enemiesTiles.tile = 'e';
  enemiesTiles.collider = "static";
  enemiesTiles.color = color(0, 0, 0, 0);

  lavaTiles = new Group();
  lavaTiles.w = 10;
  lavaTiles.h = 10;
  lavaTiles.drag = 1;
  lavaTiles.tile = 'l';
  lavaTiles.collider = "static";
  lavaTiles.color = 'orange';

  teleport1Tiles = new Group();
  teleport1Tiles.w = 10;
  teleport1Tiles.h = 10;
  teleport1Tiles.drag = 1;
  teleport1Tiles.tile = '1';
  teleport1Tiles.collider = "static";
  teleport1Tiles.color = 'yellow';

  teleport2Tiles = new Group();
  teleport2Tiles.w = 10;
  teleport2Tiles.h = 10;
  teleport2Tiles.drag = 1;
  teleport2Tiles.tile = '2';
  teleport2Tiles.collider = "static";
  teleport2Tiles.color = 'yellow';

  trampolineTiles = new Group();
  trampolineTiles.w = 10;
  trampolineTiles.h = 10;
  trampolineTiles.layer = 1;
  trampolineTiles.drag = 1;
  trampolineTiles.tile = 'j';
  trampolineTiles.collider = "static";
  trampolineTiles.color = 'yellow';

  startTiles = new Group();
  startTiles.w = 10;
  startTiles.h = 10;
  startTiles.drag = 1;
  startTiles.tile = 'p';
  startTiles.collider = "static";
  startTiles.color = color(0, 0, 0, 0);

  winTiles = new Group();
	winTiles.w = 10;
	winTiles.h = 10;
  winTiles.drag = 2;
	winTiles.tile = 'f';

  cube = new Sprite(30, 195);
  cube.w = 7;
  cube.h = 7;
  cube.layer = 100;
  cube.rotationLock = true;
  cube.friction = 1;
  cube.drag = 1;
	cube.draw = () => {
		rect(0, 0, cube.w, cube.h, 2);
	}

  cube.overlaps(waterTiles);
  cube.overlaps(trampolineTiles);
  cube.overlaps(startTiles);

  //Jump collision detector implemented from
  //https://openprocessing.org/sketch/1869796
  groundSensor = new Sprite(cube.x, cube.y, 10, 10, 'n');
  groundSensor.visible = false;
	//groundSensor.mass = 0.01;

    let j = new GlueJoint(cube, groundSensor);
	j.visible = false;

    tutorialGroup = new Tiles(
        levels[0],
        center.x - (levels[0][0].length * floorTiles.w)/2, center.y - (levels[0][levels[0].length-1].length * floorTiles.h)/2,
        floorTiles.w, floorTiles.h,
    );
}

function pulseMath() {
	pulse.var -= pulse.rate;
	if(pulse.var<125){pulse.rate = -1;}
	if(pulse.var>225){pulse.rate = 1;}
}

function menu() {
    background(255);
    if (groundSensor.overlapping(floorTiles) || groundSensor.overlapping(waterTiles) || groundSensor.overlapping(trampolineTiles) || groundSensor.overlapping(enemiesTiles) || groundSensor.overlapping(teleport1Tiles) || groundSensor.overlapping(teleport2Tiles) || groundSensor.overlapping(startTiles)) {
        if (kb.pressing("w")) { 
            cube.vel.y = -5;
            /*
            cube.bearing = -90;
            cube.applyForce(1000);
            */
        }
    }

    if (cube.collides(lavaTiles)) {
        cube.x = 30;
        cube.y = 195;
    }
    if (kb.pressing("a")) {
        cube.vel.x = -6;
        /*
        cube.bearing = 180;
		cube.applyForce(132.5);
        */
    }
    if (kb.pressing("d")) {
        cube.vel.x = 6;
        /*
        cube.bearing = 0;
		cube.applyForce(132.5);
        */
    }

    if (groundSensor.overlapping(waterTiles)) {
        cube.drag = 1;
    } else {
        cube.drag = 0;
    }

    if (cube.overlapping(trampolineTiles)) {
        cube.vel.y = -10;
    }
    allSprites.update();
    allSprites.draw();
    world.step();
}

function debug() {
	fill(255, 0, 0);
	textSize(25);
	text(mouseX, mouseX + 40, mouseY + 5)
	text(mouseY, mouseX + 40, mouseY + 35)
}

function update() {
  pulseMath();
	menu();
}