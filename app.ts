import Point2D from "./models/Point2D";
import SimObject from "./models/SimObject";
import Blob from "./models/Blob";
// import "./models/Point";
import TinyCell from "./models/TinyCell";
import { randomInt } from "./utils";

/**
 * @author Chaitanya Bhagwat
 */

class World {
    canvas: HTMLCanvasElement;
    dimension: Point2D;
    center: Point2D;
    staticAssests: Object[];
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('touch-action', 'none');
        document.body.appendChild(this.canvas);
        this.dimension = new Point2D;
        this.center = new Point2D;
        // Force an initial layout
        this.onWindowResize();
        this.staticAssests = [];
    }

    addEventListeners(mouseMove: { (e: any): void; (this: Window, ev: PointerEvent): any; }) {
        window.addEventListener('resize', this.onWindowResize, false);
        window.addEventListener('pointermove', mouseMove);
    };
    onWindowResize() {
        // The world dimensions
        let x = window.innerWidth;
        let y = window.innerHeight;
        this.dimension.updateCoordinates(x, y);
        this.center.updateCoordinates(x / 2, y / 2).round(Math.floor);
        // Resize the canvas
        this.canvas.width = x;
        this.canvas.height = y;
    };
    addBlob(blob: Blob) {
        this.staticAssests.push(blob);
        let oldMousePoint = { x: 0, y: 0 };
        let hover = false;
        let mouseMove = function(e) {
            let pos = blob.center;
            let diff = { x: e.clientX - pos.x, y: e.clientY - pos.y };
            let dist = Math.sqrt((diff.x * diff.x) + (diff.y * diff.y));
            let angle = null;
            blob.mousePos = { x: pos.x - e.clientX, y: pos.y - e.clientY };
            if (dist < blob.radius && hover === false) {
                let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
                angle = Math.atan2(vector.y, vector.x);
                hover = true;
                // blob.color = '#77FF00';
            }
            else if (dist > blob.radius && hover === true) {
                let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
                angle = Math.atan2(vector.y, vector.x);
                hover = false;
                blob.color = null;
            }
            if (typeof angle == 'number') {
                let nearestPoint_1 = null;
                let distanceFromPoint_1 = 100;
                blob.points.forEach(function(point) {
                    if (Math.abs(angle - point.azimuth) < distanceFromPoint_1) {
                        // console.log(point.azimuth, angle, distanceFromPoint);
                        nearestPoint_1 = point;
                        distanceFromPoint_1 = Math.abs(angle - point.azimuth);
                    }
                });
                if (nearestPoint_1) {
                    let strengthVector = new Point2D(oldMousePoint.x - e.clientX,oldMousePoint.y - e.clientY);
                    let strength = strengthVector.distanceTo() * 10;
                    if (strength > 100)
                        strength = 100;
                    nearestPoint_1.acceleration = strength / 100 * (hover ? -1 : 1);
                }
            }
            oldMousePoint.x = e.clientX;
            oldMousePoint.y = e.clientY;
        };
        this.addEventListeners(mouseMove);
        blob.canvas = this.canvas;
        blob.init();
    };

    render(){
        let ctx = this.canvas.getContext('2d');
        let renderFrame = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let st of this.staticAssests) {
                st.render();
            }
            for(let [c_Id, cell] of SimObject.simObjMap){
	             cell.render()
		    }
            SimObject.computeDistances();
            requestAnimationFrame(renderFrame);
        };
        renderFrame();
    };
}

let world = new World;

let nPoints = 100;
for (let i = 0; i < nPoints; i += 1) {
    let cell = new TinyCell(randomInt(30) + 10, world.center.clone().addRandom(200));
    cell.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cell.velocity = (new Point2D).addRandom(10);
    cell.acceleration = 1;
    cell.canvas = world.canvas;
}

let blob = new Blob;
blob.numPoints = 20;
blob.radius = 500;
world.addBlob(blob);
world.render();
