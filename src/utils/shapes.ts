import { PolySynth } from "tone"
import Vector2D from "../models/Vector2D"

const makeBezier = function(ctx, x, y, side, yaw, pitch) {
    let shape = pitch * side 
    let frac = yaw 

    let [a1, b1] = [x + side/2, y - side/2]
    let [a2, b2] = [x + side/2, y + side/2]
    let [a3, b3] = [x - side/2, y + side/2]
    let [a4, b4] = [x -side/2, y-side/2]
    
    let calcYaw = (a,b) => {
        return [a + (b-a)/frac, b - (b-a)/frac]
    }
    let calcPitch = (a,b, s) => {
        return [(a+b)/2 - s, (a+b)/2 - s]
    }
    
    let upper = (a1,b1, a2, b2) => {
        const y = calcYaw(a1,a2)
        const p = calcPitch(b1,b2, shape)
        return [y[0], p[0] , y[1], p[1], a2,b2]
    }
    
    let right = (a1,b1, a2, b2) => {
        const y = calcYaw(b1,b2)
        const p = calcPitch(a1,a2, -shape)
        return [p[0], y[0] , p[1], y[1], a2,b2]
    }
    
    let lower = (a1,b1, a2, b2) => {
        const y = calcYaw(a1,a2)
        const p = calcPitch(b1,b2, -shape)
        return [y[0], p[1] , y[1], p[0], a2,b2]
    }
    
    let left = (a1,b1, a2, b2) => {
        const y = calcYaw(b1,b2)
        const p = calcPitch(a1,a2, shape)
        return [p[1], y[0] , p[0], y[1], a2,b2]
    }

    ctx.beginPath();
    ctx.moveTo(a4, b4);
    ctx.bezierCurveTo(...upper(a4,b4, a1,b1));
    ctx.bezierCurveTo(...right(a1,b1, a2, b2));
    ctx.bezierCurveTo(...lower(a2,b2, a3, b3));
    ctx.bezierCurveTo(...left(a3,b3, a4, b4));
}

export default makeBezier;

export class bezierCell {
    points: Vector2D[]
    controls: Vector2D[]
    counterpoints: Vector2D[]
    center: Vector2D
    radius: number
    n: number

    makePoint(r,angle): Vector2D {
        let p = new Vector2D(r * Math.cos(angle), r * Math.sin(angle))
        return p
    }

    constructor(x: number, y: number, size: number, n:number) {
        this.center = new Vector2D(x, y);
        this.radius = size;
        this.n = n;
        this.makeShape(size)
        this.calculateCounterPoints();
    }

    makeShape(size, pitch = 3, yaw = 1) {
        [this.points, this.controls, this.counterpoints] = [new Array<Vector2D>(),new Array<Vector2D>(),new Array<Vector2D>()];
        for (let i=0; i < this.n; i++) {
            let angle = 2*Math.PI/this.n
            this.points.push(this.makePoint(yaw * size, i * angle ));
            this.controls.push(this.makePoint(1 * size, i * angle + angle / pitch));
        }
    }

    calculateCounterPoints() {
        for (let i = 0; i < this.n; i++){
            this.counterpoints.push(this.points[i].clone().scale(2).add(this.controls[i].clone().reverse()));
        }
    }

    plot(ctx, pts) {
        for (let i = 0; i < pts.length; i+=2) {
            ctx.fillRect(pts[i],pts[i+1],5,5);
        }
    }

    draw(ctx: any, time: number, pos: Vector2D, size) {
        let f1 = Math.sin(time / 400);
        let f2 = Math.sin(time/ 100);
        this.makeShape(size, 3 + f2, 1 + 0.1 * f1);
        this.calculateCounterPoints()

        ctx.beginPath();
        ctx.moveTo(...(this.points[this.n-1].clone().add(pos).xy()))
        ctx.bezierCurveTo(...(this.controls[this.n - 1].clone().add(pos).xy()), ...(this.counterpoints[0].clone().add(pos).xy()), ...(this.points[0].clone().add(pos).xy()));
        for (let i = 1; i < this.n; i++) {
            ctx.bezierCurveTo(...(this.controls[i - 1].clone().add(pos).xy()), ...(this.counterpoints[i].clone().add(pos).xy()), ...(this.points[i].clone().add(pos).xy()));

            // ******* to plot the points controlling thwee bezier *********
            // this.plot(ctx, [...(this.counterpoints[this.n - 1].clone().add(pos).xy()), ...(this.controls[0].clone().add(pos).xy()), ...(this.points[0].clone().add(pos).xy())]);
            // this.plot(ctx, [...(this.points[this.n-1].clone().add(pos).xy())]);
            // this.plot(ctx, [...(this.counterpoints[i - 1].clone().add(pos).xy()), ...(this.controls[i].clone().add(pos).xy()), ...(this.points[i].clone().add(pos).xy())])
            // *************************************************************
        }
    }

}