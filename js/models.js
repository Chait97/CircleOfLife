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

    distanceTo( c ) {
        var dx = c.x-this.x;
    	var dy = c.y-this.y;
    	return Math.sqrt(dx*dx + dy*dy);
    };

    clonePosition() {
    	return new PointRect(this.x, this.y);
    };

    interpolate( x, y, amp ) {
    	this.x += ( x - this.x ) * amp;
    	this.y += ( y - this.y ) * amp;
    };
    addRandom(amp){
        this.x += amp * (-1 + 2*Math.random());
        this.y += amp * (-1 + 2*Math.random());
        return this;
    };
    add(point){
        this.x += point.x;
        this.y += point.y;
    };
    reverse(){
        this.x = -this.x;
        this.y = - this.y;
    }
    reverseY(){
        this.y = - this.y;
    }
    reverseX(){
        this.x = -this.x;
    }
    scale(amp){
        this.x *= amp;
        this.y *= amp;
    }
}

class Cell {
    static cellIdMax = 0;
    static cellMap = new Map();
    static distanceMap = new Map();

    static register(c){
        this.cellMap.set(this.cellIdMax, c);
        this.cellIdMax += 1;
        return this.cellIdMax - 1;
    }

    static computeDistances(){
        // this compuptation occurs after every update before painting the screen

        let cellIds = [...this.cellMap.keys()];

        // track the ids of the cells which are in a colliding state for this update
        let collisions = new Set();

        // A and B represent a pair of Cells
        // A.cellId == cellIds[cell_i]
        for (let cell_i = 0; cell_i < cellIds.length; cell_i += 1){

            let a = this.cellMap.get(cellIds[cell_i]);

            // if A has already collided with something in this frame, don't
            // check for any other collisions
            if (collisions.has(a.cellId)){
                continue;
            }

            // if A isn't already in a collided state,
            // check with every other cell [B]
            for (let cell_j = cell_i + 1; cell_j < cellIds.length; cell_j += 1){
                let b = this.cellMap.get(cellIds[cell_j]);
                let dist = (a.position).distanceTo(b.position);

                // if distance is less than size + threshold extra margin
                if(dist <= a.size + b.size + a.bound + b.bound){
                    a.onCollide();
                    b.onCollide();
                    collisions.add(a.cellId);
                    collisions.add(b.cellId);
                    this.distanceMap.set([cell_i, cell_j], -1);
                    // since A has collided with B, we don't care what else it's
                    // colliding with in this update
                    break;
                }
                // if A and B haven't collided then they have some distance > 0
                this.distanceMap.set([cell_i, cell_j], dist)
            }
            // if no collision has occurred between A and all other possible cells,
            // it means it has not collided in this update;
            if (!collisions.has(a.cellId)){
                a.offCollide();
            }
        }
    }


    constructor(size, position, boundingRadius) {
        this.size = size;
        this.position = position;
        this.boundingRadius = boundingRadius;
        this.cellId = Cell.register(this);
        this.bound = 1;
        this.isColliding = false;
    };

    onCollide(){
        this.isColliding = true;
        // console.log(this.cellId, " is Colliding!")
    }

    offCollide(){
        this.isColliding = false;
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
}

class TinyCell extends Cell{
    constructor(size, position) {
        super(size, position)
    };

    wander(amp){
        let change = new PointRect(this.velocity.x, this.velocity.y)
        this.detectBounce(change)
        this.position.interpolate(this.position.x + change.x, this.position.y + change.y, 1);
        this.velocity.addRandom(this.acceleration).scale(0.99);
    }


    detectBounce(change){
        let x = this.position.x
        let y = this.position.y
        let canvas = this.canvas

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
        let canvas = this.canvas;
        let ctx = this.ctx;

        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.wander(1000);
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = this.isColliding?'#aa6060':this.colour;
        ctx.fill();
        ctx.closePath();

        ctx.font = "30px Monospace";
        ctx.fillStyle = "#AAAAAA";
        ctx.textAlign = "center";
        ctx.fillText(this.cellId, this.position.x, this.position.y);
    }

}
