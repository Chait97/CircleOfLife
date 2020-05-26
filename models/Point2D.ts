/**
 * Defines a 2D position.
 */
 export default class Point2D {
    _direction: Unit;
    _magnitude: number;
    y: number;
    x: number;
    constructor(x =0 , y = 0 ) {
    	this.x = x;
    	this.y = y;
        this._magnitude = Math.sqrt(this.x*this.x + this.y*this.y);
        this._direction = new Unit(x,y);
    };

    get magnitude(){
        return this._magnitude;
    }

    set magnitude(m){
        this.scale(m/this.magnitude)
    }

    get direction(){
        return this._direction;
    }
    set direction(d){
        if(d instanceof Unit){
            this._direction = d;
        }
    }

    updateMagnitude(){
        this._magnitude = Math.sqrt(this.x*this.x + this.y*this.y);
    }

    updateDirection(){
        this._direction.update(this.x,this.y)
    }

    distanceTo( c?:Point2D) {
        if(c){
            var dx = c.x-this.x;
            var dy = c.y-this.y;
            return Math.sqrt(dx*dx + dy*dy);
        } else
            return Math.sqrt(this.x*this.x + this.y*this.y);
    };

    clone() {
    	return new Point2D(this.x, this.y);
    };

    interpolate( x:number, y:number, amp:number ) {
    	this.x += ( x - this.x ) * amp;
    	this.y += ( y - this.y ) * amp;
        this.updateMagnitude();
        this.updateDirection();
        return this;
    };

    addRandom(amp:number){
        this.x += amp * (-1 + 2*Math.random());
        this.y += amp * (-1 + 2*Math.random());
        this.updateMagnitude();
        this.updateDirection();
        return this;
    };

    add(point:Point2D){
        this.x += point.x;
        this.y += point.y;
        this.updateMagnitude();
        this.updateDirection();
        return this;
    };

    reverse(){
        this.x = -this.x;
        this.y = - this.y;
        this.updateDirection();
        return this;
    }

    reverseY(){
        this.y = - this.y;
        this.updateDirection();
        return this;
    }

    reverseX(){
        this.x = -this.x;
        this.updateDirection();
        return this;
    }

    scale(amp){
        this.x *= amp;
        this.y *= amp;
        this._magnitude *= amp;
        return this;
    }

    addRandomDirection(amp){
        let mag = this.magnitude;
        this.addRandom(amp);
        this.magnitude = mag;
        return this;
    }

    updateCoordinates(x, y){
        this.x = x;
        this.y = y;
        this.updateDirection();
        this.updateMagnitude();
        return this;
    }
    updatePoint( c ){
        if (c instanceof Point2D){
            this.x = c.x;
            this.y = c.y;
            this.direction = c.direction;
            this.magnitude = c.magnitude;
        }
        return this;
    }
    round(f: (arg0: number) => number){
        this.x = f(this.x);
        this.y = f(this.y);
        this.updateDirection();
        this.updateMagnitude();
        return this;
    }
}

class Unit {
    x: number;
    y: number;
    constructor(x: number, y: number){
        this.update(x,y)
    }
    update(x: number, y: number){
        let factor = Math.sqrt(x*x + y*y)
        this.x = x/factor;
        this.y = y/factor;
    }
    from(c){
        this.update(c.x, c.y)
        return this;
    }
}
