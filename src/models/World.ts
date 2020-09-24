import Vector2D from "./Vector2D";
import SimObject, { renderable } from "./SimObject";
import Blob from "./Blob";
// import "./models/Point";
import TinyCell from "./TinyCell";
import * as Tone from "tone";
import AudioController from "./AudioChannel";


/**
 * @author Chaitanya Bhagwat
 */

export default class World {
    canvas!: HTMLCanvasElement;
    dimension: Vector2D;
    center: Vector2D;
    staticAssests: renderable[];
    isActive: boolean = false;
    static WorldMap = new Map();
    worldId: number;

    constructor(id: number) {
        this.worldId = id;
        this.dimension = new Vector2D(window.innerWidth, window.innerHeight);
        this.center = new Vector2D();
        this.staticAssests = [];
        World.WorldMap.set(id, this);
        this.initCanvas();
    }

    initCanvas(){
        World.reset();
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('touch-action', 'none');
        document.body.appendChild(this.canvas);
        // Force an initial layout
        this.onWindowResize();
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
        let mouseMove = function(e: { clientX: number; clientY: number; }) {
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
                    let strengthVector = new Vector2D(oldMousePoint.x - e.clientX,oldMousePoint.y - e.clientY);
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

    static reset(){
        SimObject.reset()
        let canvas = document.querySelector("canvas")
        if(canvas)
            canvas.remove();
        this.WorldMap.forEach(world => world.isActive = false)
    };

    render(){
        this.isActive = true;
        let ctx = this.canvas.getContext('2d');
        if(ctx){
            let renderFrame = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                for (let st of this.staticAssests) {
                    st.render();
                }
                for(let [c_Id, cell] of SimObject.simObjMap){
                    cell.render()
                }
                SimObject.computeDistances();
                if(this.isActive)
                requestAnimationFrame(renderFrame);
            };
            renderFrame();
        }
    };
}
