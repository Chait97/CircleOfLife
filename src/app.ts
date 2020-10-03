import TinyCell from "./models/TinyCell";
import Vector2D from "./models/Vector2D";
import AudioController from "./models/AudioChannel";
import World from "./models/World";
import Blob from "./models/Blob";
import Fluid from "./models/Fluid"
import { randomInt } from "./utils";
import "./tailwind.css";
import "./main.css";
import * as Tone from "tone";

let scenes: { (): World  }[] = []
let newOffset: number = 0;

let audioChannel = new AudioController();
let currentWorld: World;

document.querySelector('#scene')?.addEventListener('change', (event : any) => {
    let sceneId = Number(event.target.value) -1;
    let scene = scenes[sceneId]
    if(scene instanceof World)
        World.reset()
        currentWorld = scene();
        currentWorld.render()
});

document.querySelector('#timeFactor')?.addEventListener('change', (event: any) => {
    let newTime = Number(event.target.value)/25;
    currentWorld.setTime(newTime);
});

const startAudioCallback = async () => {
    await Tone.start()
    audioChannel.beat(2000);
}
document.querySelector('button')?.addEventListener('click', startAudioCallback);

// *************************************************************************************************
// Scene 0: Main
// *************************************************************************************************

scenes.push( () => {
    let world = new World(1);

    let nPoints = 80;
    let maxSize = 80;
    let minSize = 50;
    let maxSpeed = 10;


    for (let i = 0; i < nPoints; i += 1) {
        let cell = new TinyCell(
            (randomInt(maxSize - minSize) + minSize)*world.scale,
            world.center.clone().addRandom(world.canvas.height/2.5)
        );
        cell.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        cell.velocity = (new Vector2D).addRandom(maxSpeed);
        cell.acceleration = 10;
        cell.canvas = world.canvas;
        audioChannel.subscribe(cell);
        cell.init();
    }

    let blob = new Blob;
    blob.numPoints = 20;
    blob.radius = 300;
    world.addBlob(blob);

    return world;
})


// *************************************************************************************************
// Scene 1: Chaos 
// *************************************************************************************************

scenes.push( () => {
    let world = new World(2);

    let nPoints = 20;
    let maxSize = 60;
    let minSize = 10;
    let maxSpeed = 10;

    for (let i = 0; i < nPoints; i += 1) {
        let cell = new TinyCell(
            (randomInt(maxSize - minSize) + minSize)*world.scale,
            world.center.clone().addRandom(world.canvas.height/2.5), false
        );
        cell.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        cell.velocity = (new Vector2D).addRandom(maxSpeed);
        cell.acceleration = 0;
        cell.canvas = world.canvas;
        audioChannel.subscribe(cell);
        cell.init();
        const f = new Fluid;
        f.canvas = world.canvas;
        f.center = world.center.clone()
        world.addStatic(f)
    }

    world.postRender = (context) => {
        if (Math.random() < 0.85) return;
        let cell = new TinyCell(
            (randomInt(maxSize - minSize) + minSize) * world.scale,
            world.center.clone().addRandom(world.canvas.height/4), false
        );
        cell.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        cell.velocity = (new Vector2D).addRandom(maxSpeed);
        cell.acceleration = 0;
        cell.canvas = context.canvas;
        audioChannel.subscribe(cell);
        cell.init();
    }
    return world;
})


// *************************************************************************************************
// Scene 2: Offset Collision
// *************************************************************************************************

scenes.push( () => {
    let world = new World(3);

    let offset = 150;

    let cellA = new TinyCell(
        100*world.scale,
        world.center.clone().updateCoordinates(200, world.center.y + offset/2)
    );
    cellA.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellA.velocity = new Vector2D(20, 0)
    cellA.acceleration = 0;
    cellA.canvas = world.canvas;

    let cellB = new TinyCell(
        100*world.scale,
        world.center.clone().updateCoordinates(world.canvas.width-200,world.center.y - offset/2 )
    );
    cellB.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellB.velocity = new Vector2D(-20, 0)
    cellB.acceleration = 0;
    cellB.canvas = world.canvas;

    cellA.init();
    cellB.init();
    return world;
})

// *************************************************************************************************
// Scene 3: Random Scene
// *************************************************************************************************

scenes.push( () => {
    let world = new World(4);

    let offset = 1000;

    let cellA = new TinyCell(
        320*world.scale,
        world.center.clone()
    );
    cellA.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellA.velocity = new Vector2D(0,10)
    cellA.acceleration = 0;
    cellA.canvas = world.canvas;

    let cellB = new TinyCell(
        80*world.scale,
        world.center.clone().updateCoordinates(world.canvas.width-200,world.center.y - offset/2 )
    );
    cellB.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellB.velocity = new Vector2D(1, 0)
    cellB.acceleration = 0;
    cellB.canvas = world.canvas;
    audioChannel.subscribe(cellA);
    audioChannel.subscribe(cellB);
    cellA.init();
    cellB.init();
 
    return world;
})

// by default run Scene <scene-number> in the beginning
currentWorld = scenes[1]();
currentWorld.render();
