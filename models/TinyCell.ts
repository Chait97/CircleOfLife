import SimObject, { renderable } from "./SimObject";
import Vector2D from "./Vector2D";
import { AudioVisual } from "./AudioChannel";
import { dot, subtract, multiply, divide, norm} from "mathjs";

export default class TinyCell extends SimObject implements AudioVisual, renderable {
    colour: string = "blue";
    acceleration!: number;

    constructor(size: number, position: Vector2D) {
        super(size, position)
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
        let change = new Vector2D(this.velocity.x, this.velocity.y)
        this.detectBounce(change)
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

            let u1dot = dot(subtract(Av, Bv), subtract(Ar, Br));
            let u2dot = dot(subtract(Bv, Av), subtract(Br, Ar));

            let n = norm(subtract(Ar, Br), 2) ** 2;

            let u1m = 2 * that.mass / m_AB
            let u2m = 2 * this.mass / m_AB

            let u1 = subtract(Av, multiply(u1m, (divide(multiply(subtract(Ar, Br), u1dot), n))));
            let u2 = subtract(Bv, multiply(u2m, (divide(multiply(subtract(Br, Ar), u2dot), n))))

            if (isNaN(this.position.x) || isNaN(this.position.y))
                console.log("Nans at ->> onCollide()");

            this.velocity.updateCoordinates(u1[0], u1[1]);
            console.log("onCollide()", u1[0], "and ", u1[1]);
            that.velocity.updateCoordinates(u2[0], u2[1]);
            console.log("onCollide()", u2[0], "and ", u2[1])

            super.onCollide(that);
        }
    }

    detectBounce(change: Vector2D){
        if(isNaN(this.position.x) || isNaN(this.position.y))
            console.log("Nans at ->> detectBounce()");
        let x = this.position.x;
        let y = this.position.y;
        let canvas = this.canvas;

        if(x + change.x > canvas.width-this.size || x + change.x < this.size) {
            change.x = -change.x;
            this.velocity.reverseX()
        }
        if(y + change.y > canvas.height-this.size || y + change.y < this.size) {
            change.y = -change.y;
            this.velocity.reverseY();
        }
    }

    render() {
        let ctx = this.ctx;
        if(isNaN(this.position.x) || isNaN(this.position.y))
            console.log("Nans at ->> render()");

        this.wander();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = this.isColliding? "red" :  this.colour;
        ctx.fill();
        ctx.closePath();
    }

}
