import SimObject from "./SimObject";
import Point2D from "./Point2D";

export default class TinyCell extends SimObject{
    colour: any;
    acceleration: any;
    private _velocity: any;
    speed: any;
    choice: string;
    constructor(size: number, position: Point2D) {
        super(size, position)
        let txt = ["BOOM!", "POW!", "BANG!", "AAAARGHH!", "YAY!", "ZOINK!"]
        this.choice = txt[Math.floor(Math.random() * txt.length)];
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

    onCollide(){
        if(!this.isColliding){     // make sure cell wasn't already in a colliding state prevously
            this._velocity.reverse();
            this.isColliding = true;
            this._velocity.scale(3);
        }
    }

    offCollide(){
        if(this.isColliding){        // make sure it wasn't colliding before
            this._velocity.scale(1/3);
            this.isColliding = false;
        }
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
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();

        if(this.isColliding){
            ctx.font = "25px Monospace";
            ctx.fillStyle = "#AAAAAA";
            ctx.textAlign = "center";
            ctx.fillText(this.choice, this.position.x, this.position.y);
        }
    }

}
