import SimObject, { renderable } from "./SimObject";
import Vector2D from "./Vector2D";
import { AudioVisual } from "./AudioChannel";
import { dot, subtract, multiply, divide, norm} from "mathjs";

export default class TinyCell extends SimObject implements AudioVisual, renderable {
    colour: string = "blue";
    acceleration!: number;
    edgeAction: (arg0: Vector2D) => void;

    constructor(size: number, position: Vector2D, isBouncing?: boolean) {
        super(size, position, isBouncing)
        this.edgeAction = isBouncing ? this.detectBounce : this.wanderOffEdge;
    }

    beatResponse(){
        let originalSize = this.size
        let myVar = setInterval(() => this.size *= 0.95, 20);
        setTimeout(() => {
            clearTimeout(myVar)
            this.size = originalSize
        }, 200);
    }

    wander(){
        let change = new Vector2D(this.globalTime * this.velocity.x, this.globalTime * this.velocity.y)
        this.edgeAction(change)
        this.position.interpolate(this.position.x + change.x, this.position.y + change.y, 1);
        this.velocity.addRandomDirection(this.acceleration);
    }

    onCollide(that:SimObject):void{

        // IMPORTANT! : Make sure this function is commutative
        // i.e. running a.onCollide(b) should produce the same result as b.onCollide(a)
        if(!this.isColliding && !that.isColliding){     // make sure the cells weren't already in a colliding state prevously
            let m_AB = this.mass + that.mass;
            let Av = [this.velocity.x, this.velocity.y];
            let Bv = [that.velocity.x, that.velocity.y];

            let Ar = [this.position.x, this.position.y];
            let Br = [that.position.x, that.position.y];

            // @ts-ignore
            let u1dot = dot(subtract(Av, Bv), subtract(Ar, Br));
            // @ts-ignore
            let u2dot = dot(subtract(Bv, Av), subtract(Br, Ar));

            // @ts-ignore
            let n = norm(subtract(Ar, Br), 2) ** 2;

            let u1m = 2 * that.mass / m_AB
            let u2m = 2 * this.mass / m_AB

            let u1 = subtract(Av, multiply(u1m, (divide(multiply(subtract(Ar, Br), u1dot), n))));
            let u2 = subtract(Bv, multiply(u2m, (divide(multiply(subtract(Br, Ar), u2dot), n))))

            if (isNaN(this.position.x) || isNaN(this.position.y))
                console.log("Nans at ->> onCollide()");

            this.velocity.updateCoordinates(u1[0], u1[1]);
            that.velocity.updateCoordinates(u2[0], u2[1]);
            super.onCollide(that);
        }
    }

    detectBounce(change: Vector2D){
        let x = this.position.x;
        let y = this.position.y;
        let canvas = this.canvas;
        let bounceMargin = 5;

        // bouncing bounceMargin pixels early can resolve some objects getting stuck on the edges
        if(x + change.x > canvas.width-this.size - bounceMargin || x + change.x < this.size + bounceMargin) {
            change.x = -change.x;
            this.velocity.reverseX()
        }
        if(y + change.y > canvas.height-this.size - bounceMargin || y + change.y < this.size + bounceMargin) {
            change.y = -change.y;
            this.velocity.reverseY();
        }
    }

    wanderOffEdge(change: Vector2D){
        let x = this.position.x;
        let y = this.position.y;
        let canvas = this.canvas;

        // equations to detect going off screen
        if ((x + change.x > canvas.width + this.size || x + change.x <  - this.size) 
            || (y + change.y > canvas.height-this.size || y + change.y < - this.size)) {
                SimObject.kill(this);
        }
    }


    render() {
        let ctx = this.ctx;
        if(isNaN(this.position.x) || isNaN(this.position.y))
            console.log("Nans at ->> render()");

        this.wander();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();
    }

}
