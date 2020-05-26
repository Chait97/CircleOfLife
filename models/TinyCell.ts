import SimObject from "./SimObject";
import Point2D from "./Point2D";

export default class TinyCell extends SimObject{
    colour: any;
    acceleration: any;
    private _velocity: any;
    speed: any;
    constructor(size: number, position: Point2D) {
        super(size, position)
    };

    set velocity(v){
        this._velocity = v;
        this.speed = v.magnitude;
    }

    get velocity(){
        return this._velocity;
    }

    wander(){
        let change = new Point2D(this.velocity.x, this.velocity.y)
        this.detectBounce(change)
        this.position.interpolate(this.position.x + change.x, this.position.y + change.y, 1);
        this.velocity.addRandomDirection(this.acceleration);
    }

    detectBounce(change: Point2D){
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

        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.wander();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = this.isColliding?'#aa6060':this.colour;
        ctx.fill();
        ctx.closePath();

        ctx.font = "30px Monospace";
        ctx.fillStyle = "#AAAAAA";
        ctx.textAlign = "center";
        ctx.fillText(this.simObjId, this.position.x, this.position.y);
    }

}
