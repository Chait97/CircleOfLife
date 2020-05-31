import SimObject, { renderable } from "./SimObject";
import Point2D from "./Point2D";
import { AudioVisual } from "./AudioChannel";

export default class TinyCell extends SimObject implements AudioVisual, renderable{
    colour: string = "blue";
    acceleration!: number;

    constructor(size: number, position: Point2D) {
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
        let change = new Point2D(this.velocity.x, this.velocity.y)
        this.detectBounce(change)
        this.position.interpolate(this.position.x + change.x, this.position.y + change.y, 1);
        this.velocity.addRandomDirection(this.acceleration);
    }

    onCollide(that:SimObject):void{

        // IMPORTANT! : Make sure this function is commutative
        // i.e. running a.onCollide(b) should produce the same result as b.onCollide(a)
        if(!this.isColliding && !that.isColliding){     // make sure the cells weren't already in a colliding state prevously
            let m_AB = this.mass + that.mass

            let v = [
                {Ai: this.velocity.x, Bi: that.velocity.x, Af: 0, Bf: 0},   // x velocities of A and B
                {Ai: this.velocity.y, Bi: that.velocity.y, Af: 0, Bf: 0}    // y velocities of A and B
            ]

            for (let v_ of v){
                v_.Af = v_.Ai * (this.mass - that.mass) / m_AB
                + 2 * v_.Bi * that.mass / m_AB
                v_.Bf = v_.Bi * (that.mass - that.mass)  / m_AB
                + 2 * v_.Ai * this.mass / m_AB
            }

            if(isNaN(this.position.x) || isNaN(this.position.y))
                console.log("Nans at ->> onCollide()");

            this.velocity.updateCoordinates(v[0].Af, v[1].Af)
            that.velocity.updateCoordinates(v[0].Bf, v[1].Bf)

            super.onCollide(that);
        }
    }

    detectBounce(change: Point2D){
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
