import Vector2D from "./Vector2D";
import { renderable } from "./SimObject";

export default class Fluid implements renderable{
    ctx: any;
    globalTime: number = 1;
    _canvas;
    scale;
    center: Vector2D

    resize(factor: number) {
        this.scale *= factor;
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
    
    render(time: number) {
        let ctx = this.ctx;
        ctx.beginPath();
        let y = (n) => {return Math.sin(time/n)}
        ctx.fillRect(this.center.x + 300 * y(100) , this.center.y + (time/200) % 500 , 5, 5);
        ctx.fillRect(this.center.x + 400 * y(200) , this.center.y + (time/100) % 520 , 5, 5);
        ctx.fillRect(this.center.x + 200 * y(250) , this.center.y + (time/100) % 400 , 5, 5);
        ctx.fillRect(this.center.x + 300 * y(300) , this.center.y + (time/100) % 300 , 5, 5);
        ctx.fillRect(this.center.x + 400 * y(400) , this.center.y + (time/100) % 140 , 5, 5);
        ctx.fillRect(this.center.x + 300 * y(100) , this.center.y - (time/200) % 500 , 5, 5);
        ctx.fillRect(this.center.x + 400 * y(200) , this.center.y - (time/100) % 520 , 5, 5);
        ctx.fillRect(this.center.x + 200 * y(250) , this.center.y - (time/100) % 400 , 5, 5);
        ctx.fillRect(this.center.x + 300 * y(300) , this.center.y - (time/100) % 300 , 5, 5);
        ctx.fillRect(this.center.x + 400 * y(400) , this.center.y - (time/100) % 140 , 5, 5);
        ctx.fill();
        ctx.closePath();
    }

}
