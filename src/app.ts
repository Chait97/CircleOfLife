import TinyCell from "./models/TinyCell";
import Vector2D from "./models/Vector2D";
import AudioController from "./models/AudioChannel";
import World from "./models/World";
import Blob from "./models/Blob";
import { randomInt } from "./utils";
import "./tailwind.css";

let scenes: { (): void; (): void; }[] = []
let newOffset: number = 0;

document.querySelector('#scene')?.addEventListener('change', (event : any) => {
    let sceneId = Number(event.target.value) -1;
    let scene = scenes[sceneId]
    if(scene instanceof Function)
        scene()
});

document.querySelector('#offsetValue')?.addEventListener('change', (event: any) => {
    newOffset = Number(event.target.value);
    scenes[3]()
});

// *************************************************************************************************
// Scene 1: Main
// *************************************************************************************************

scenes.push( () => {
    let world = new World(1);

    let audioChannel = new AudioController();

    let nPoints = 20;
    let maxSize = 80;
    let minSize = 50;
    let maxSpeed = 10;


    for (let i = 0; i < nPoints; i += 1) {
        let cell = new TinyCell(
            randomInt(maxSize - minSize) + minSize,
            world.center.clone().addRandom(world.dimension.y/2.5)
        );
        cell.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        cell.velocity = (new Vector2D).addRandom(maxSpeed);
        cell.acceleration = 10;
        cell.canvas = world.canvas;
        audioChannel.subscribe(cell);
    }

    let blob = new Blob;
    blob.numPoints = 20;
    blob.radius = 300;
    world.addBlob(blob);
    world.render();

    const startAudioCallback = async () => {
        // await Tone.start()
        console.log('audio is ready')
        audioChannel.beat(2000);
    }
    document.querySelector('button')?.addEventListener('click', startAudioCallback);
})


// *************************************************************************************************
// Scene 2: Head On Collision
// *************************************************************************************************

scenes.push( () => {
    let world = new World(2);

    let cellA = new TinyCell(
        100,
        world.center.clone().updateCoordinates(200, undefined)
    );
    cellA.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellA.velocity = new Vector2D(20, 0)
    cellA.acceleration = 0;
    cellA.canvas = world.canvas;

    let cellB = new TinyCell(
        100,
        world.center.clone().updateCoordinates(world.dimension.x-200, undefined)
    );
    cellB.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellB.velocity = new Vector2D(-20, 0)
    cellB.acceleration = 0;
    cellB.canvas = world.canvas;

    world.render();
})


// *************************************************************************************************
// Scene 3: Offset Collision
// *************************************************************************************************

scenes.push( () => {
    let world = new World(3);

    let offset = 150;

    let cellA = new TinyCell(
        100,
        world.center.clone().updateCoordinates(200, world.center.y + offset/2)
    );
    cellA.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellA.velocity = new Vector2D(20, 0)
    cellA.acceleration = 0;
    cellA.canvas = world.canvas;

    let cellB = new TinyCell(
        100,
        world.center.clone().updateCoordinates(world.dimension.x-200,world.center.y - offset/2 )
    );
    cellB.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellB.velocity = new Vector2D(-20, 0)
    cellB.acceleration = 0;
    cellB.canvas = world.canvas;

    world.render();
})

// *************************************************************************************************
// Scene 4: Random Scene
// *************************************************************************************************

scenes.push( () => {
    let world = new World(4);

    let offset = newOffset;

    let cellA = new TinyCell(
        200,
        world.center.clone().updateCoordinates(200, world.center.y + offset/2)
    );
    cellA.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellA.velocity = new Vector2D(2,0)
    cellA.acceleration = 0;
    cellA.canvas = world.canvas;

    let cellB = new TinyCell(
        100,
        world.center.clone().updateCoordinates(world.dimension.x-200,world.center.y - offset/2 )
    );
    cellB.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellB.velocity = new Vector2D(-2, 0)
    cellB.acceleration = 0;
    cellB.canvas = world.canvas;

    world.render();
})

// by default run Scene 0: Main in the beginning
scenes[0]();
