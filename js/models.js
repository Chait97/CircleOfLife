let canvas, ctx;
let render, init;
let blob;

class Blob {
  constructor() {
    this.points = [];
  }

  init() {
    for(let i = 0; i < this.numPoints; i++) {
      let point = new Point(this.divisional * ( i + 1 ), this);
      // point.acceleration = -1 + Math.random() * 2;
      this.push(point);
    }
  }

  render() {
    let canvas = this.canvas;
    let ctx = this.ctx;
    let position = this.position;
    let pointsArray = this.points;
    let radius = this.radius;
    let points = this.numPoints;
    let divisional = this.divisional;
    let center = this.center;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    pointsArray[0].solveWith(pointsArray[points-1], pointsArray[1]);

    let p0 = pointsArray[points-1].position;
    let p1 = pointsArray[0].position;
    let _p2 = p1;

    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.moveTo( (p0.x + p1.x) / 2, (p0.y + p1.y) / 2 );

    for(let i = 1; i < points; i++) {

      pointsArray[i].solveWith(pointsArray[i-1], pointsArray[i+1] || pointsArray[0]);

      let p2 = pointsArray[i].position;
      var xc = (p1.x + p2.x) / 2;
      var yc = (p1.y + p2.y) / 2;
      ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
      // ctx.lineTo(p2.x, p2.y);

      ctx.fillStyle = '#000000';
      // ctx.fillRect(p1.x-2.5, p1.y-2.5, 5, 5);

      p1 = p2;
    }

    var xc = (p1.x + _p2.x) / 2;
    var yc = (p1.y + _p2.y) / 2;
    ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
    // ctx.lineTo(_p2.x, _p2.y);

    // ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = '#000000';
    // ctx.stroke();

/*
    ctx.fillStyle = '#000000';
    if(this.mousePos) {
      let angle = Math.atan2(this.mousePos.y, this.mousePos.x) + Math.PI;
      ctx.fillRect(center.x + Math.cos(angle) * this.radius, center.y + Math.sin(angle) * this.radius, 5, 5);
    }
*/
    requestAnimationFrame(this.render.bind(this));
  }

  push(item) {
    if(item instanceof Point) {
      this.points.push(item);
    }
  }

  set color(value) {
    this._color = value;
  }
  get color() {
    return this._color || '#000000';
  }

  set canvas(value) {
    if(value instanceof HTMLElement && value.tagName.toLowerCase() === 'canvas') {
      this._canvas = canvas;
      this.ctx = this._canvas.getContext('2d');
    }
  }
  get canvas() {
    return this._canvas;
  }

  set numPoints(value) {
    if(value > 2) {
      this._points = value;
    }
  }
  get numPoints() {
    return this._points || 16;
  }

  set radius(value) {
    if(value > 0) {
      this._radius = value;
    }
  }
  get radius() {
    return this._radius || 100;
  }

  set position(value) {
    if(typeof value == 'object' && value.x && value.y) {
      this._position = value;
    }
  }
  get position() {
    return this._position || { x: 0.5, y: 0.5 };
  }

  get divisional() {
    return Math.PI * 2 / this.numPoints;
  }

  get center() {
    return { x: this.canvas.width * this.position.x, y: this.canvas.height * this.position.y };
  }

  set running(value) {
    this._running = value === true;
  }
  get running() {
    return this.running !== false;
  }
}

class Point {
  constructor(azimuth, parent) {
    this.parent = parent;
    this.azimuth = Math.PI - azimuth;
    this._components = {
      x: Math.cos(this.azimuth),
      y: Math.sin(this.azimuth)
    };

    this.acceleration = -0.3 + Math.random() * 1;
  }

  solveWith(leftPoint, rightPoint) {
    this.acceleration = (-0.3 * this.radialEffect + ( leftPoint.radialEffect - this.radialEffect ) + ( rightPoint.radialEffect - this.radialEffect )) * this.elasticity - this.speed * this.friction;
  }

  set acceleration(value) {
    if(typeof value == 'number') {
      this._acceleration = value;
      this.speed += this._acceleration * 2;
    }
  }
  get acceleration() {
    return this._acceleration || 0;
  }

  set speed(value) {
    if(typeof value == 'number') {
      this._speed = value;
      this.radialEffect += this._speed * 5;
    }
  }
  get speed() {
    return this._speed || 0;
  }

  set radialEffect(value) {
    if(typeof value == 'number') {
      this._radialEffect = value;
    }
  }
  get radialEffect() {
    return this._radialEffect || 0;
  }

  get position() {
    return {
      x: this.parent.center.x + this.components.x * (this.parent.radius + this.radialEffect),
      y: this.parent.center.y + this.components.y * (this.parent.radius + this.radialEffect)
    }
  }

  get components() {
    return this._components;
  }

  set elasticity(value) {
    if(typeof value === 'number') {
      this._elasticity = value;
    }
  }
  get elasticity() {
    return this._elasticity || 0.001;
  }
  set friction(value) {
    if(typeof value === 'number') {
      this._friction = value;
    }
  }
  get friction() {
    return this._friction || 0.01;
  }
}


/**
 * Defines a 2D position.
 */
class PointRect {
    constructor( x, y ) {
    	this.x = x || 0;
    	this.y = y || 0;
    };

    distanceTo( x, y ) {
    	var dx = x-this.x;
    	var dy = y-this.y;
    	return Math.sqrt(dx*dx + dy*dy);
    };

    clonePosition() {
    	return { x: this.x, y: this.y };
    };

    interpolate( x, y, amp ) {
    	this.x += ( x - this.x ) * amp;
    	this.y += ( y - this.y ) * amp;
    };
}

class Cell {
    constructor(size, position, colour) {
        this.size = size;
        this.position = position;
        this.colour = colour;
    };

    set canvas(value) {
        if(value instanceof HTMLElement && value.tagName.toLowerCase() === 'canvas') {
            this._canvas = canvas;
            this.ctx = this._canvas.getContext('2d');
        }
    }

    get canvas() {
        return this._canvas;
    }

    wander(amp){
        let change = new PointRect((-1 + 2 * Math.random())* amp, (-1 + 2 * Math.random())* amp)
        this.detectBounce(change)
        this.position.interpolate(this.position.x + change.x, this.position.y + change.y, 1);
    }

    detectBounce(change){
        let x = this.position.x
        let y = this.position.y
        let canvas = this.canvas

        if(x + change.x > canvas.width-this.size || x + change.x < this.size) {
            console.log("Bounce!");
            change.x = -change.x;
        }
        if(y + change.y > canvas.height-this.size || y + change.y < this.size) {
            console.log("Bounce!");
            change.y = -change.y;
        }
    }

    render() {
        let canvas = this.canvas;
        let ctx = this.ctx;

        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(Math.random() > 0.8)
            this.wander(1000);
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();
        requestAnimationFrame(this.render.bind(this));
    }

}
