import Vector2D from "./Vector2D";
import { renderable } from "./SimObject";

export default class SimCell implements renderable{
    size: number;
    position: Vector2D;
    protected _velocity: Vector2D;
    protected speed: number
    protected _canvas!: HTMLCanvasElement;
    ctx: any;
    mass: number;
    globalTime: number = 1;

    constructor(size:number, position:Vector2D, isBouncing: boolean = true, boundingRadius?:number ) {
        this.size = size;
        this.position = position;
        this.mass = this.size*this.size
    };

    resize(factor: number) {
        this.size *= factor;
    }

    set velocity(v){
        this._velocity = v;
        this.speed = v.magnitude;
    }

    get velocity(){
        return this._velocity;
    }

    set canvas(value) {
        if(value instanceof HTMLElement && value.tagName.toLowerCase() === 'canvas') {
            this._canvas = value;
            this.ctx = this._canvas.getContext('2d');
        }
    }

    get canvas() {
        return this._canvas;
    }

    wanderOffEdge(change: Vector2D){
        let x = this.position.x;
        let y = this.position.y;
        let canvas = this.canvas;

        // equations to detect going off screen
        if ((x + change.x > canvas.width + this.size || x + change.x <  - this.size) 
            || (y + change.y > canvas.height-this.size || y + change.y < - this.size)) {
                SimCell.kill()
        }
    }

    static kill() {

    }

    wander(){
        let change = new Vector2D(this.globalTime * this.velocity.x, this.globalTime * this.velocity.y)
        this.wanderOffEdge(change)
        this.position.interpolate(this.position.x + change.x, this.position.y + change.y, 1);
    }

    
    render(time: number) {
        let ctx = this.ctx;
        this.wander();
        ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
        // makeBezier(ctx, this.position.x, this.position.y, this.size*1.5, ...this.getShapeFactors());
        ctx.fill();
        ctx.closePath();
    }

}
