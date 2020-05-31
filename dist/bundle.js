/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_TinyCell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/TinyCell */ "./models/TinyCell.ts");
/* harmony import */ var _models_Point2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/Point2D */ "./models/Point2D.ts");
/* harmony import */ var _models_World__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/World */ "./models/World.ts");
/* harmony import */ var _models_Blob__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/Blob */ "./models/Blob.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./utils.ts");





let scenes = [];
document.querySelector('#scene').addEventListener('change', event => {
    let sceneId = Number(event.target.value) - 1;
    let scene = scenes[sceneId];
    if (scene instanceof Function)
        scene();
});
// *************************************************************************************************
// Scene 1: Main
// *************************************************************************************************
scenes.push(() => {
    let world = new _models_World__WEBPACK_IMPORTED_MODULE_2__["default"](1);
    // let audioChannel = new AudioController();
    let nPoints = 10;
    let maxSize = 80;
    let minSize = 50;
    let maxSpeed = 50;
    for (let i = 0; i < nPoints; i += 1) {
        let cell = new _models_TinyCell__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_utils__WEBPACK_IMPORTED_MODULE_4__["randomInt"])(maxSize - minSize) + minSize, world.center.clone().addRandom(world.dimension.y / 2.5));
        cell.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        cell.velocity = (new _models_Point2D__WEBPACK_IMPORTED_MODULE_1__["default"]).addRandom(maxSpeed);
        cell.acceleration = 0;
        cell.canvas = world.canvas;
        // audioChannel.subscribe(cell);
    }
    let blob = new _models_Blob__WEBPACK_IMPORTED_MODULE_3__["default"];
    blob.numPoints = 20;
    blob.radius = 300;
    world.addBlob(blob);
    world.render();
    // const startAudioCallback = async () => {
    //     // await Tone.start()
    //     console.log('audio is ready')
    //     audioChannel.beat(2000);
    // }
    // document.querySelector('button').addEventListener('click', startAudioCallback);
});
// *************************************************************************************************
// Scene 2: Head On Collision
// *************************************************************************************************
scenes.push(() => {
    let world = new _models_World__WEBPACK_IMPORTED_MODULE_2__["default"](2);
    let cellA = new _models_TinyCell__WEBPACK_IMPORTED_MODULE_0__["default"](100, world.center.clone().updateCoordinates(200, undefined));
    cellA.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellA.velocity = new _models_Point2D__WEBPACK_IMPORTED_MODULE_1__["default"](20, 0);
    cellA.acceleration = 0;
    cellA.canvas = world.canvas;
    let cellB = new _models_TinyCell__WEBPACK_IMPORTED_MODULE_0__["default"](100, world.center.clone().updateCoordinates(world.dimension.x - 200, undefined));
    cellB.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellB.velocity = new _models_Point2D__WEBPACK_IMPORTED_MODULE_1__["default"](-20, 0);
    cellB.acceleration = 0;
    cellB.canvas = world.canvas;
    world.render();
});
// *************************************************************************************************
// Scene 3: Offset Collision
// *************************************************************************************************
scenes.push(() => {
    let world = new _models_World__WEBPACK_IMPORTED_MODULE_2__["default"](2);
    let offset = 150;
    let cellA = new _models_TinyCell__WEBPACK_IMPORTED_MODULE_0__["default"](100, world.center.clone().updateCoordinates(200, world.center.y + offset / 2));
    cellA.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellA.velocity = new _models_Point2D__WEBPACK_IMPORTED_MODULE_1__["default"](20, 0);
    cellA.acceleration = 0;
    cellA.canvas = world.canvas;
    let cellB = new _models_TinyCell__WEBPACK_IMPORTED_MODULE_0__["default"](100, world.center.clone().updateCoordinates(world.dimension.x - 200, world.center.y - offset / 2));
    cellB.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cellB.velocity = new _models_Point2D__WEBPACK_IMPORTED_MODULE_1__["default"](-20, 0);
    cellB.acceleration = 0;
    cellB.canvas = world.canvas;
    world.render();
});
// by default run Scene 0: Main in the beginning
scenes[0]();


/***/ }),

/***/ "./models/Blob.ts":
/*!************************!*\
  !*** ./models/Blob.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Blob; });
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ "./models/Point.ts");

class Blob {
    constructor() {
        this.points = [];
    }
    init() {
        for (let i = 0; i < this.numPoints; i++) {
            let point = new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](this.divisional * (i + 1), this);
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
        pointsArray[0].solveWith(pointsArray[points - 1], pointsArray[1]);
        let p0 = pointsArray[points - 1].position;
        let p1 = pointsArray[0].position;
        let _p2 = p1;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
        for (let i = 1; i < points; i++) {
            pointsArray[i].solveWith(pointsArray[i - 1], pointsArray[i + 1] || pointsArray[0]);
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
    }
    push(item) {
        if (item instanceof _Point__WEBPACK_IMPORTED_MODULE_0__["default"]) {
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
        if (value instanceof HTMLElement && value.tagName.toLowerCase() === 'canvas') {
            this._canvas = value;
            this.ctx = this._canvas.getContext('2d');
        }
    }
    get canvas() {
        return this._canvas;
    }
    set numPoints(value) {
        if (value > 2) {
            this._points = value;
        }
    }
    get numPoints() {
        return this._points || 16;
    }
    set radius(value) {
        if (value > 0) {
            this._radius = value;
        }
    }
    get radius() {
        return this._radius || 100;
    }
    set position(value) {
        if (typeof value == 'object' && value.x && value.y) {
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


/***/ }),

/***/ "./models/Point.ts":
/*!*************************!*\
  !*** ./models/Point.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Point; });
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
        this.acceleration = (-0.3 * this.radialEffect + (leftPoint.radialEffect - this.radialEffect) + (rightPoint.radialEffect - this.radialEffect)) * this.elasticity - this.speed * this.friction;
    }
    set acceleration(value) {
        if (typeof value == 'number') {
            this._acceleration = value;
            this.speed += this._acceleration * 2;
        }
    }
    get acceleration() {
        return this._acceleration || 0;
    }
    set speed(value) {
        if (typeof value == 'number') {
            this._speed = value;
            this.radialEffect += this._speed * 5;
        }
    }
    get speed() {
        return this._speed || 0;
    }
    set radialEffect(value) {
        if (typeof value == 'number') {
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
        };
    }
    get components() {
        return this._components;
    }
    set elasticity(value) {
        if (typeof value === 'number') {
            this._elasticity = value;
        }
    }
    get elasticity() {
        return this._elasticity || 0.001;
    }
    set friction(value) {
        if (typeof value === 'number') {
            this._friction = value;
        }
    }
    get friction() {
        return this._friction || 0.01;
    }
}


/***/ }),

/***/ "./models/Point2D.ts":
/*!***************************!*\
  !*** ./models/Point2D.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Point2D; });
/**
 * Defines a 2D position.
 */
class Point2D {
    constructor(x = 0, y = 0) {
        this.y = 0;
        this.x = 0;
        this.x = x;
        this.y = y;
        this._magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
        this._direction = new Unit(x, y);
        // console.log(this, x, y)
    }
    ;
    get magnitude() {
        return this._magnitude;
    }
    set magnitude(m) {
        this.scale(m / this.magnitude);
    }
    get direction() {
        return this._direction;
    }
    set direction(d) {
        if (d instanceof Unit) {
            this._direction = d;
        }
    }
    updateMagnitude() {
        this._magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    }
    updateDirection() {
        this._direction.update(this.x, this.y);
    }
    distanceTo(c) {
        if (isNaN(this.x) || isNaN(this.y))
            console.log("Nans at ->> distanceTo()");
        if (c) {
            var dx = c.x - this.x;
            var dy = c.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
        else
            // distance to (0, 0)
            return this._magnitude;
    }
    ;
    clone() {
        return new Point2D(this.x, this.y);
    }
    ;
    interpolate(x, y, amp) {
        this.x += (x - this.x) * amp;
        this.y += (y - this.y) * amp;
        this.updateMagnitude();
        this.updateDirection();
        if (isNaN(this.x) || isNaN(this.y))
            console.log("Nans at ->> interpolate()");
        return this;
    }
    ;
    addRandom(amp) {
        this.x += amp * (-1 + 2 * Math.random());
        this.y += amp * (-1 + 2 * Math.random());
        this.updateMagnitude();
        this.updateDirection();
        return this;
    }
    ;
    add(point) {
        this.x += point.x;
        this.y += point.y;
        this.updateMagnitude();
        this.updateDirection();
        return this;
    }
    ;
    reverse() {
        this.x = -this.x;
        this.y = -this.y;
        this.updateDirection();
        return this;
    }
    reverseY() {
        this.y = -this.y;
        this.updateDirection();
        return this;
    }
    reverseX() {
        this.x = -this.x;
        this.updateDirection();
        return this;
    }
    scale(amp) {
        this.x *= amp;
        this.y *= amp;
        this._magnitude *= amp;
        return this;
    }
    addRandomDirection(amp) {
        if (amp === 0)
            return this;
        let mag = this.magnitude;
        this.addRandom(amp);
        this.magnitude = mag;
        return this;
    }
    updateCoordinates(x, y) {
        if (x)
            this.x = x;
        if (y)
            this.y = y;
        this.updateDirection();
        this.updateMagnitude();
        return this;
    }
    updatePoint(c) {
        if (c instanceof Point2D) {
            this.x = c.x;
            this.y = c.y;
            this.direction = c.direction;
            this.magnitude = c.magnitude;
        }
        return this;
    }
    round(f) {
        this.x = f(this.x);
        this.y = f(this.y);
        this.updateDirection();
        this.updateMagnitude();
        return this;
    }
}
class Unit {
    constructor(x = 0, y = 0) {
        this.update(x, y);
    }
    update(x, y) {
        if (x === 0 && y === 0) {
            this.x = 0;
            this.y = 0;
        }
        else {
            let factor = Math.sqrt(x * x + y * y);
            this.x = x / factor;
            this.y = y / factor;
        }
    }
    from(c) {
        this.update(c.x, c.y);
        return this;
    }
}


/***/ }),

/***/ "./models/SimObject.ts":
/*!*****************************!*\
  !*** ./models/SimObject.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let SimObject = /** @class */ (() => {
    class SimObject {
        constructor(size, position, boundingRadius) {
            this.size = size;
            this.position = position;
            console.log(this.position, position);
            if (boundingRadius) {
                this.boundingRadius = boundingRadius;
            }
            else
                this.boundingRadius = size;
            this.simObjId = SimObject.register(this);
            this.isColliding = false;
            this.mass = this.size * this.size;
            console.log(this.position, position);
        }
        static reset() {
            this.simObjMap.clear();
            this.simObjMap = new Map();
            this.simObjIdMax = 0;
            this.distanceMap.clear();
            this.distanceMap = new Map();
        }
        ;
        set velocity(v) {
            this._velocity = v;
            this.speed = v.magnitude;
        }
        get velocity() {
            return this._velocity;
        }
        static register(c) {
            this.simObjMap.set(this.simObjIdMax, c);
            this.simObjIdMax += 1;
            return this.simObjIdMax - 1;
        }
        static computeDistances() {
            // this compuptation occurs after every update before painting the screen
            let simObjIds = [...this.simObjMap.keys()];
            // track the ids of the simObjs which are in a colliding state for this update
            let collisions = new Set();
            // A and B represent a pair of SimObjects
            // A.simObjId == simObjIds[simObj_i]
            for (let simObj_i = 0; simObj_i < simObjIds.length; simObj_i += 1) {
                let a = this.simObjMap.get(simObjIds[simObj_i]);
                // if A has already collided with something in this frame, don't
                // check for any other collisions
                if (collisions.has(a.simObjId)) {
                    continue;
                }
                let distancesToA;
                if (this.distanceMap.has(simObj_i))
                    distancesToA = this.distanceMap.get(simObj_i);
                else
                    distancesToA = new Map();
                // if A isn't already in a collided state,
                // check with every other simObj [B]
                for (let simObj_j = simObj_i + 1; simObj_j < simObjIds.length; simObj_j += 1) {
                    let b = this.simObjMap.get(simObjIds[simObj_j]);
                    let dist = (a.position).distanceTo(b.position);
                    // if distance is less than size then the cells are INSIDE or overlapping
                    if (dist < a.size + b.size) {
                        let overlap = 1 - dist / (a.size + b.size);
                        // a.position.interpolate()
                    }
                    // if distance is less than size + threshold extra margin
                    if (dist <= a.boundingRadius + b.boundingRadius) {
                        a.onCollide(b);
                        collisions.add(a.simObjId);
                        collisions.add(b.simObjId);
                        // since A has collided with B, we don't care what else it's
                        // colliding with in this update
                        distancesToA.set(simObj_j, -1);
                        break;
                    }
                    // if A and B haven't collided then they have some distance > 0
                    if (simObj_i === undefined || simObj_j === undefined || dist === undefined)
                        console.log(this.distanceMap, simObj_i, simObj_j, dist);
                    distancesToA.set(simObj_j, dist);
                }
                // if no collision has occurred between A and all other possible simObjs,
                // it means it has not collided in this update;
                if (!collisions.has(a.simObjId)) {
                    a.offCollide();
                }
                this.distanceMap.set(simObj_i, distancesToA);
            }
        }
        onCollide(that) {
            this.isColliding = true;
            that.isColliding = true;
            // console.log(this.simObjId, " is Colliding!")
        }
        offCollide() {
            this.isColliding = false;
        }
        set canvas(value) {
            if (value instanceof HTMLElement && value.tagName.toLowerCase() === 'canvas') {
                this._canvas = value;
                this.ctx = this._canvas.getContext('2d');
            }
        }
        get canvas() {
            return this._canvas;
        }
    }
    SimObject.simObjIdMax = 0;
    SimObject.simObjMap = new Map();
    SimObject.distanceMap = new Map();
    return SimObject;
})();
/* harmony default export */ __webpack_exports__["default"] = (SimObject);


/***/ }),

/***/ "./models/TinyCell.ts":
/*!****************************!*\
  !*** ./models/TinyCell.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TinyCell; });
/* harmony import */ var _SimObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SimObject */ "./models/SimObject.ts");
/* harmony import */ var _Point2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Point2D */ "./models/Point2D.ts");


class TinyCell extends _SimObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(size, position) {
        super(size, position);
        this.colour = "blue";
    }
    beatResponse() {
        let originalSize = this.size;
        let myVar = setInterval(() => this.size *= 0.95, 20);
        setTimeout(() => {
            clearTimeout(myVar);
            this.size = originalSize;
        }, 200);
    }
    wander() {
        let change = new _Point2D__WEBPACK_IMPORTED_MODULE_1__["default"](this.velocity.x, this.velocity.y);
        this.detectBounce(change);
        this.position.interpolate(this.position.x + change.x, this.position.y + change.y, 1);
        this.velocity.addRandomDirection(this.acceleration);
    }
    onCollide(that) {
        // IMPORTANT! : Make sure this function is commutative
        // i.e. running a.onCollide(b) should produce the same result as b.onCollide(a)
        if (!this.isColliding && !that.isColliding) { // make sure the cells weren't already in a colliding state prevously
            let m_AB = this.mass + that.mass;
            let v = [
                { Ai: this.velocity.x, Bi: that.velocity.x, Af: 0, Bf: 0 },
                { Ai: this.velocity.y, Bi: that.velocity.y, Af: 0, Bf: 0 } // y velocities of A and B
            ];
            for (let v_ of v) {
                v_.Af = v_.Ai * (this.mass - that.mass) / m_AB
                    + 2 * v_.Bi * that.mass / m_AB;
                v_.Bf = v_.Bi * (that.mass - that.mass) / m_AB
                    + 2 * v_.Ai * this.mass / m_AB;
            }
            if (isNaN(this.position.x) || isNaN(this.position.y))
                console.log("Nans at ->> onCollide()");
            this.velocity.updateCoordinates(v[0].Af, v[1].Af);
            that.velocity.updateCoordinates(v[0].Bf, v[1].Bf);
            super.onCollide(that);
        }
    }
    detectBounce(change) {
        if (isNaN(this.position.x) || isNaN(this.position.y))
            console.log("Nans at ->> detectBounce()");
        let x = this.position.x;
        let y = this.position.y;
        let canvas = this.canvas;
        if (x + change.x > canvas.width - this.size || x + change.x < this.size) {
            change.x = -change.x;
            this.velocity.reverseX();
        }
        if (y + change.y > canvas.height - this.size || y + change.y < this.size) {
            change.y = -change.y;
            this.velocity.reverseY();
        }
    }
    render() {
        let ctx = this.ctx;
        if (isNaN(this.position.x) || isNaN(this.position.y))
            console.log("Nans at ->> render()");
        this.wander();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.isColliding ? "red" : this.colour;
        ctx.fill();
        ctx.closePath();
    }
}


/***/ }),

/***/ "./models/World.ts":
/*!*************************!*\
  !*** ./models/World.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Point2D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point2D */ "./models/Point2D.ts");
/* harmony import */ var _SimObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SimObject */ "./models/SimObject.ts");


/**
 * @author Chaitanya Bhagwat
 */
let World = /** @class */ (() => {
    class World {
        constructor(id) {
            this.isActive = false;
            this.worldId = id;
            this.dimension = new _Point2D__WEBPACK_IMPORTED_MODULE_0__["default"](window.innerWidth, window.innerHeight);
            this.center = new _Point2D__WEBPACK_IMPORTED_MODULE_0__["default"]();
            this.staticAssests = [];
            World.WorldMap.set(id, this);
            this.initCanvas();
        }
        initCanvas() {
            World.reset();
            this.canvas = document.createElement('canvas');
            this.canvas.setAttribute('touch-action', 'none');
            document.body.appendChild(this.canvas);
            // Force an initial layout
            this.onWindowResize();
        }
        addEventListeners(mouseMove) {
            window.addEventListener('resize', this.onWindowResize, false);
            window.addEventListener('pointermove', mouseMove);
        }
        ;
        onWindowResize() {
            // The world dimensions
            let x = window.innerWidth;
            let y = window.innerHeight;
            this.dimension.updateCoordinates(x, y);
            this.center.updateCoordinates(x / 2, y / 2).round(Math.floor);
            // Resize the canvas
            this.canvas.width = x;
            this.canvas.height = y;
        }
        ;
        addBlob(blob) {
            this.staticAssests.push(blob);
            let oldMousePoint = { x: 0, y: 0 };
            let hover = false;
            let mouseMove = function (e) {
                let pos = blob.center;
                let diff = { x: e.clientX - pos.x, y: e.clientY - pos.y };
                let dist = Math.sqrt((diff.x * diff.x) + (diff.y * diff.y));
                let angle = null;
                blob.mousePos = { x: pos.x - e.clientX, y: pos.y - e.clientY };
                if (dist < blob.radius && hover === false) {
                    let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
                    angle = Math.atan2(vector.y, vector.x);
                    hover = true;
                    // blob.color = '#77FF00';
                }
                else if (dist > blob.radius && hover === true) {
                    let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
                    angle = Math.atan2(vector.y, vector.x);
                    hover = false;
                    blob.color = null;
                }
                if (typeof angle == 'number') {
                    let nearestPoint_1 = null;
                    let distanceFromPoint_1 = 100;
                    blob.points.forEach(function (point) {
                        if (Math.abs(angle - point.azimuth) < distanceFromPoint_1) {
                            // console.log(point.azimuth, angle, distanceFromPoint);
                            nearestPoint_1 = point;
                            distanceFromPoint_1 = Math.abs(angle - point.azimuth);
                        }
                    });
                    if (nearestPoint_1) {
                        let strengthVector = new _Point2D__WEBPACK_IMPORTED_MODULE_0__["default"](oldMousePoint.x - e.clientX, oldMousePoint.y - e.clientY);
                        let strength = strengthVector.distanceTo() * 10;
                        if (strength > 100)
                            strength = 100;
                        nearestPoint_1.acceleration = strength / 100 * (hover ? -1 : 1);
                    }
                }
                oldMousePoint.x = e.clientX;
                oldMousePoint.y = e.clientY;
            };
            this.addEventListeners(mouseMove);
            blob.canvas = this.canvas;
            blob.init();
        }
        ;
        static reset() {
            _SimObject__WEBPACK_IMPORTED_MODULE_1__["default"].reset();
            let canvas = document.querySelector("canvas");
            if (canvas)
                canvas.remove();
            this.WorldMap.forEach(world => world.isActive = false);
        }
        ;
        render() {
            this.isActive = true;
            let ctx = this.canvas.getContext('2d');
            if (ctx) {
                let renderFrame = () => {
                    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    for (let st of this.staticAssests) {
                        st.render();
                    }
                    for (let [c_Id, cell] of _SimObject__WEBPACK_IMPORTED_MODULE_1__["default"].simObjMap) {
                        cell.render();
                    }
                    _SimObject__WEBPACK_IMPORTED_MODULE_1__["default"].computeDistances();
                    if (this.isActive)
                        requestAnimationFrame(renderFrame);
                };
                renderFrame();
            }
        }
        ;
    }
    World.WorldMap = new Map();
    return World;
})();
/* harmony default export */ __webpack_exports__["default"] = (World);


/***/ }),

/***/ "./utils.ts":
/*!******************!*\
  !*** ./utils.ts ***!
  \******************/
/*! exports provided: randomInt, Region */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomInt", function() { return randomInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Region", function() { return Region; });
/**
 *
 */
function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
var Capabilities = {
    isOnline: function () {
        return navigator.onLine;
    },
    isTouchDevice: function () {
        return navigator.userAgent.match(/(iphone|ipad|ipod|android)/gi);
    },
    suportsLocalStorage: function () {
        return ('localStorage' in window) && window['localStorage'] !== null;
    }
};
/**
 * Defines of a rectangular region.
 */
class Region {
    constructor() {
        this.left = 999999;
        this.top = 999999;
        this.right = 0;
        this.bottom = 0;
    }
    reset() {
        this.left = 999999;
        this.top = 999999;
        this.right = 0;
        this.bottom = 0;
    }
    inflate(x, y) {
        this.left = Math.min(this.left, x);
        this.top = Math.min(this.top, y);
        this.right = Math.max(this.right, x);
        this.bottom = Math.max(this.bottom, y);
    }
    expand(x, y) {
        this.left -= x;
        this.top -= y;
        this.right += x;
        this.bottom += y;
    }
    ;
    contains(x, y) {
        return x > this.left && x < this.right && y > this.top && y < this.bottom;
    }
    ;
    size() {
        return ((this.right - this.left) + (this.bottom - this.top)) / 2;
    }
    ;
    center() {
        return new Point(this.left + (this.right - this.left) / 2, this.top + (this.bottom - this.top) / 2);
    }
    ;
    toRectangle() {
        return { x: this.left, y: this.top, width: this.right - this.left, height: this.bottom - this.top };
    }
    ;
}
// // shim layer with setTimeout fallback from http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// export const requestAnimFrame = function(window){
//   return  window.requestAnimationFrame       ||
//           window.webkitRequestAnimationFrame ||
//           window.mozRequestAnimationFrame    ||
//           window.oRequestAnimationFrame      ||
//           window.msRequestAnimationFrame     ||
//           function(/* function */ callback, /* DOMElement */ element){
//             window.setTimeout(callback, 1000 / 60);
//           };
// };


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL21vZGVscy9CbG9iLnRzIiwid2VicGFjazovLy8uL21vZGVscy9Qb2ludC50cyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvUG9pbnQyRC50cyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvU2ltT2JqZWN0LnRzIiwid2VicGFjazovLy8uL21vZGVscy9UaW55Q2VsbC50cyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvV29ybGQudHMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUM7QUFDRjtBQUVKO0FBQ0Y7QUFDRztBQUdwQyxJQUFJLE1BQU0sR0FBOEIsRUFBRTtBQUUxQyxR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QUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBQztJQUN2RyxDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVc7UUFDVixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckcsQ0FBQztJQUFBLENBQUM7Q0FDTDtBQUlELG1IQUFtSDtBQUNuSCxvREFBb0Q7QUFDcEQsa0RBQWtEO0FBQ2xELGtEQUFrRDtBQUNsRCxrREFBa0Q7QUFDbEQsa0RBQWtEO0FBQ2xELGtEQUFrRDtBQUNsRCx5RUFBeUU7QUFDekUsc0RBQXNEO0FBQ3RELGVBQWU7QUFDZixLQUFLIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwLnRzXCIpO1xuIiwiaW1wb3J0IFRpbnlDZWxsIGZyb20gXCIuL21vZGVscy9UaW55Q2VsbFwiO1xuaW1wb3J0IFBvaW50MkQgZnJvbSBcIi4vbW9kZWxzL1BvaW50MkRcIjtcbmltcG9ydCBBdWRpb0NvbnRyb2xsZXIgZnJvbSBcIi4vbW9kZWxzL0F1ZGlvQ2hhbm5lbFwiO1xuaW1wb3J0IFdvcmxkIGZyb20gXCIuL21vZGVscy9Xb3JsZFwiO1xuaW1wb3J0IEJsb2IgZnJvbSBcIi4vbW9kZWxzL0Jsb2JcIjtcbmltcG9ydCB7IHJhbmRvbUludCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cblxubGV0IHNjZW5lczogeyAoKTogdm9pZDsgKCk6IHZvaWQ7IH1bXSA9IFtdXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY2VuZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICBsZXQgc2NlbmVJZCA9IE51bWJlcihldmVudC50YXJnZXQudmFsdWUpIC0xO1xuICAgIGxldCBzY2VuZSA9IHNjZW5lc1tzY2VuZUlkXVxuICAgIGlmKHNjZW5lIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHNjZW5lKClcbn0pO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyBTY2VuZSAxOiBNYWluXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbnNjZW5lcy5wdXNoKCAoKSA9PiB7XG4gICAgbGV0IHdvcmxkID0gbmV3IFdvcmxkKDEpO1xuXG4gICAgLy8gbGV0IGF1ZGlvQ2hhbm5lbCA9IG5ldyBBdWRpb0NvbnRyb2xsZXIoKTtcblxuICAgIGxldCBuUG9pbnRzID0gMTA7XG4gICAgbGV0IG1heFNpemUgPSA4MDtcbiAgICBsZXQgbWluU2l6ZSA9IDUwO1xuICAgIGxldCBtYXhTcGVlZCA9IDUwO1xuXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5Qb2ludHM7IGkgKz0gMSkge1xuICAgICAgICBsZXQgY2VsbCA9IG5ldyBUaW55Q2VsbChcbiAgICAgICAgICAgIHJhbmRvbUludChtYXhTaXplIC0gbWluU2l6ZSkgKyBtaW5TaXplLFxuICAgICAgICAgICAgd29ybGQuY2VudGVyLmNsb25lKCkuYWRkUmFuZG9tKHdvcmxkLmRpbWVuc2lvbi55LzIuNSlcbiAgICAgICAgKTtcbiAgICAgICAgY2VsbC5jb2xvdXIgPSAnaHNsKCcgKyAzNjAgKiBNYXRoLnJhbmRvbSgpICsgJywgNTAlLCA1MCUpJztcbiAgICAgICAgY2VsbC52ZWxvY2l0eSA9IChuZXcgUG9pbnQyRCkuYWRkUmFuZG9tKG1heFNwZWVkKTtcbiAgICAgICAgY2VsbC5hY2NlbGVyYXRpb24gPSAwO1xuICAgICAgICBjZWxsLmNhbnZhcyA9IHdvcmxkLmNhbnZhcztcbiAgICAgICAgLy8gYXVkaW9DaGFubmVsLnN1YnNjcmliZShjZWxsKTtcbiAgICB9XG5cbiAgICBsZXQgYmxvYiA9IG5ldyBCbG9iO1xuICAgIGJsb2IubnVtUG9pbnRzID0gMjA7XG4gICAgYmxvYi5yYWRpdXMgPSAzMDA7XG4gICAgd29ybGQuYWRkQmxvYihibG9iKTtcbiAgICB3b3JsZC5yZW5kZXIoKTtcblxuICAgIC8vIGNvbnN0IHN0YXJ0QXVkaW9DYWxsYmFjayA9IGFzeW5jICgpID0+IHtcbiAgICAvLyAgICAgLy8gYXdhaXQgVG9uZS5zdGFydCgpXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdhdWRpbyBpcyByZWFkeScpXG4gICAgLy8gICAgIGF1ZGlvQ2hhbm5lbC5iZWF0KDIwMDApO1xuICAgIC8vIH1cbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0QXVkaW9DYWxsYmFjayk7XG59KVxuXG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIFNjZW5lIDI6IEhlYWQgT24gQ29sbGlzaW9uXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbnNjZW5lcy5wdXNoKCAoKSA9PiB7XG4gICAgbGV0IHdvcmxkID0gbmV3IFdvcmxkKDIpO1xuXG4gICAgbGV0IGNlbGxBID0gbmV3IFRpbnlDZWxsKFxuICAgICAgICAxMDAsXG4gICAgICAgIHdvcmxkLmNlbnRlci5jbG9uZSgpLnVwZGF0ZUNvb3JkaW5hdGVzKDIwMCwgdW5kZWZpbmVkKVxuICAgICk7XG4gICAgY2VsbEEuY29sb3VyID0gJ2hzbCgnICsgMzYwICogTWF0aC5yYW5kb20oKSArICcsIDUwJSwgNTAlKSc7XG4gICAgY2VsbEEudmVsb2NpdHkgPSBuZXcgUG9pbnQyRCgyMCwgMClcbiAgICBjZWxsQS5hY2NlbGVyYXRpb24gPSAwO1xuICAgIGNlbGxBLmNhbnZhcyA9IHdvcmxkLmNhbnZhcztcblxuICAgIGxldCBjZWxsQiA9IG5ldyBUaW55Q2VsbChcbiAgICAgICAgMTAwLFxuICAgICAgICB3b3JsZC5jZW50ZXIuY2xvbmUoKS51cGRhdGVDb29yZGluYXRlcyh3b3JsZC5kaW1lbnNpb24ueC0yMDAsIHVuZGVmaW5lZClcbiAgICApO1xuICAgIGNlbGxCLmNvbG91ciA9ICdoc2woJyArIDM2MCAqIE1hdGgucmFuZG9tKCkgKyAnLCA1MCUsIDUwJSknO1xuICAgIGNlbGxCLnZlbG9jaXR5ID0gbmV3IFBvaW50MkQoLTIwLCAwKVxuICAgIGNlbGxCLmFjY2VsZXJhdGlvbiA9IDA7XG4gICAgY2VsbEIuY2FudmFzID0gd29ybGQuY2FudmFzO1xuXG4gICAgd29ybGQucmVuZGVyKCk7XG59KVxuXG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIFNjZW5lIDM6IE9mZnNldCBDb2xsaXNpb25cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuc2NlbmVzLnB1c2goICgpID0+IHtcbiAgICBsZXQgd29ybGQgPSBuZXcgV29ybGQoMik7XG5cbiAgICBsZXQgb2Zmc2V0ID0gMTUwO1xuXG4gICAgbGV0IGNlbGxBID0gbmV3IFRpbnlDZWxsKFxuICAgICAgICAxMDAsXG4gICAgICAgIHdvcmxkLmNlbnRlci5jbG9uZSgpLnVwZGF0ZUNvb3JkaW5hdGVzKDIwMCwgd29ybGQuY2VudGVyLnkgKyBvZmZzZXQvMilcbiAgICApO1xuICAgIGNlbGxBLmNvbG91ciA9ICdoc2woJyArIDM2MCAqIE1hdGgucmFuZG9tKCkgKyAnLCA1MCUsIDUwJSknO1xuICAgIGNlbGxBLnZlbG9jaXR5ID0gbmV3IFBvaW50MkQoMjAsIDApXG4gICAgY2VsbEEuYWNjZWxlcmF0aW9uID0gMDtcbiAgICBjZWxsQS5jYW52YXMgPSB3b3JsZC5jYW52YXM7XG5cbiAgICBsZXQgY2VsbEIgPSBuZXcgVGlueUNlbGwoXG4gICAgICAgIDEwMCxcbiAgICAgICAgd29ybGQuY2VudGVyLmNsb25lKCkudXBkYXRlQ29vcmRpbmF0ZXMod29ybGQuZGltZW5zaW9uLngtMjAwLHdvcmxkLmNlbnRlci55IC0gb2Zmc2V0LzIgKVxuICAgICk7XG4gICAgY2VsbEIuY29sb3VyID0gJ2hzbCgnICsgMzYwICogTWF0aC5yYW5kb20oKSArICcsIDUwJSwgNTAlKSc7XG4gICAgY2VsbEIudmVsb2NpdHkgPSBuZXcgUG9pbnQyRCgtMjAsIDApXG4gICAgY2VsbEIuYWNjZWxlcmF0aW9uID0gMDtcbiAgICBjZWxsQi5jYW52YXMgPSB3b3JsZC5jYW52YXM7XG5cbiAgICB3b3JsZC5yZW5kZXIoKTtcbn0pXG5cbi8vIGJ5IGRlZmF1bHQgcnVuIFNjZW5lIDA6IE1haW4gaW4gdGhlIGJlZ2lubmluZ1xuc2NlbmVzWzBdKCk7XG4iLCJpbXBvcnQgUG9pbnQgZnJvbSBcIi4vUG9pbnRcIjtcbmltcG9ydCB7IHJlbmRlcmFibGUgfSBmcm9tIFwiLi9TaW1PYmplY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvYiBpbXBsZW1lbnRzIHJlbmRlcmFibGUge1xuICAgIHBvaW50czogYW55W107XG4gICAgcHJpdmF0ZSBfY29sb3I6IGFueTtcbiAgICBwcml2YXRlIF9jYW52YXM6IGFueTtcbiAgICBjdHg6IGFueTtcbiAgICBwcml2YXRlIF9wb2ludHM6IGFueTtcbiAgICBwcml2YXRlIF9yYWRpdXM6IGFueTtcbiAgICBwcml2YXRlIF9wb3NpdGlvbjogYW55O1xuICAgIHByaXZhdGUgX3J1bm5pbmc6IGJvb2xlYW47XG4gICAgbW91c2VQb3M6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IH07XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wb2ludHMgPSBbXTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtUG9pbnRzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwb2ludCA9IG5ldyBQb2ludCh0aGlzLmRpdmlzaW9uYWwgKiAoaSArIDEpLCB0aGlzKTtcbiAgICAgICAgICAgIC8vIHBvaW50LmFjY2VsZXJhdGlvbiA9IC0xICsgTWF0aC5yYW5kb20oKSAqIDI7XG4gICAgICAgICAgICB0aGlzLnB1c2gocG9pbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5jYW52YXM7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eDtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcbiAgICAgICAgbGV0IHBvaW50c0FycmF5ID0gdGhpcy5wb2ludHM7XG4gICAgICAgIGxldCByYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgbGV0IHBvaW50cyA9IHRoaXMubnVtUG9pbnRzO1xuICAgICAgICBsZXQgZGl2aXNpb25hbCA9IHRoaXMuZGl2aXNpb25hbDtcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMuY2VudGVyO1xuXG4gICAgICAgIHBvaW50c0FycmF5WzBdLnNvbHZlV2l0aChwb2ludHNBcnJheVtwb2ludHMgLSAxXSwgcG9pbnRzQXJyYXlbMV0pO1xuXG4gICAgICAgIGxldCBwMCA9IHBvaW50c0FycmF5W3BvaW50cyAtIDFdLnBvc2l0aW9uO1xuICAgICAgICBsZXQgcDEgPSBwb2ludHNBcnJheVswXS5wb3NpdGlvbjtcbiAgICAgICAgbGV0IF9wMiA9IHAxO1xuXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhjZW50ZXIueCwgY2VudGVyLnkpO1xuICAgICAgICBjdHgubW92ZVRvKChwMC54ICsgcDEueCkgLyAyLCAocDAueSArIHAxLnkpIC8gMik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludHM7IGkrKykge1xuXG4gICAgICAgICAgICBwb2ludHNBcnJheVtpXS5zb2x2ZVdpdGgocG9pbnRzQXJyYXlbaSAtIDFdLCBwb2ludHNBcnJheVtpICsgMV0gfHwgcG9pbnRzQXJyYXlbMF0pO1xuXG4gICAgICAgICAgICBsZXQgcDIgPSBwb2ludHNBcnJheVtpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgIHZhciB4YyA9IChwMS54ICsgcDIueCkgLyAyO1xuICAgICAgICAgICAgdmFyIHljID0gKHAxLnkgKyBwMi55KSAvIDI7XG4gICAgICAgICAgICBjdHgucXVhZHJhdGljQ3VydmVUbyhwMS54LCBwMS55LCB4YywgeWMpO1xuICAgICAgICAgICAgLy8gY3R4LmxpbmVUbyhwMi54LCBwMi55KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwMDAwJztcbiAgICAgICAgICAgIC8vIGN0eC5maWxsUmVjdChwMS54LTIuNSwgcDEueS0yLjUsIDUsIDUpO1xuXG4gICAgICAgICAgICBwMSA9IHAyO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHhjID0gKHAxLnggKyBfcDIueCkgLyAyO1xuICAgICAgICB2YXIgeWMgPSAocDEueSArIF9wMi55KSAvIDI7XG4gICAgICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHAxLngsIHAxLnksIHhjLCB5Yyk7XG4gICAgICAgIC8vIGN0eC5saW5lVG8oX3AyLngsIF9wMi55KTtcblxuICAgICAgICAvLyBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgfVxuXG4gICAgcHVzaChpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgUG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgY29sb3IodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGNvbG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3IgfHwgJyMwMDAwMDAnO1xuICAgIH1cblxuICAgIHNldCBjYW52YXModmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgdmFsdWUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnY2FudmFzJykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmN0eCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBjYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gICAgfVxuXG4gICAgc2V0IG51bVBvaW50cyh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPiAyKSB7XG4gICAgICAgICAgICB0aGlzLl9wb2ludHMgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgbnVtUG9pbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzIHx8IDE2O1xuICAgIH1cblxuICAgIHNldCByYWRpdXModmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHJhZGl1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1cyB8fCAxMDA7XG4gICAgfVxuXG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcgJiYgdmFsdWUueCAmJiB2YWx1ZS55KSB7XG4gICAgICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBwb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uIHx8IHsgeDogMC41LCB5OiAwLjUgfTtcbiAgICB9XG5cbiAgICBnZXQgZGl2aXNpb25hbCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguUEkgKiAyIC8gdGhpcy5udW1Qb2ludHM7XG4gICAgfVxuXG4gICAgZ2V0IGNlbnRlcigpIHtcbiAgICAgICAgcmV0dXJuIHsgeDogdGhpcy5jYW52YXMud2lkdGggKiB0aGlzLnBvc2l0aW9uLngsIHk6IHRoaXMuY2FudmFzLmhlaWdodCAqIHRoaXMucG9zaXRpb24ueSB9O1xuICAgIH1cblxuICAgIHNldCBydW5uaW5nKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3J1bm5pbmcgPSB2YWx1ZSA9PT0gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0IHJ1bm5pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bm5pbmcgIT09IGZhbHNlO1xuICAgIH1cbn1cbiIsIiBleHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludCB7XG4gIHBhcmVudDogYW55O1xuICAgIGF6aW11dGg6IG51bWJlcjtcbiAgICBfY29tcG9uZW50czogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgfTtcbiAgICBfYWNjZWxlcmF0aW9uOiBudW1iZXI7XG4gICAgX3NwZWVkOiBudW1iZXI7XG4gICAgX3JhZGlhbEVmZmVjdDogbnVtYmVyO1xuICAgIF9lbGFzdGljaXR5OiBudW1iZXI7XG4gICAgX2ZyaWN0aW9uOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoYXppbXV0aCwgcGFyZW50KSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5hemltdXRoID0gTWF0aC5QSSAtIGF6aW11dGg7XG4gICAgdGhpcy5fY29tcG9uZW50cyA9IHtcbiAgICAgIHg6IE1hdGguY29zKHRoaXMuYXppbXV0aCksXG4gICAgICB5OiBNYXRoLnNpbih0aGlzLmF6aW11dGgpXG4gICAgfTtcblxuICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gLTAuMyArIE1hdGgucmFuZG9tKCkgKiAxO1xuICB9XG5cbiAgc29sdmVXaXRoKGxlZnRQb2ludCwgcmlnaHRQb2ludCkge1xuICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gKC0wLjMgKiB0aGlzLnJhZGlhbEVmZmVjdCArICggbGVmdFBvaW50LnJhZGlhbEVmZmVjdCAtIHRoaXMucmFkaWFsRWZmZWN0ICkgKyAoIHJpZ2h0UG9pbnQucmFkaWFsRWZmZWN0IC0gdGhpcy5yYWRpYWxFZmZlY3QgKSkgKiB0aGlzLmVsYXN0aWNpdHkgLSB0aGlzLnNwZWVkICogdGhpcy5mcmljdGlvbjtcbiAgfVxuXG4gIHNldCBhY2NlbGVyYXRpb24odmFsdWUpIHtcbiAgICBpZih0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX2FjY2VsZXJhdGlvbiA9IHZhbHVlO1xuICAgICAgdGhpcy5zcGVlZCArPSB0aGlzLl9hY2NlbGVyYXRpb24gKiAyO1xuICAgIH1cbiAgfVxuICBnZXQgYWNjZWxlcmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9hY2NlbGVyYXRpb24gfHwgMDtcbiAgfVxuXG4gIHNldCBzcGVlZCh2YWx1ZSkge1xuICAgIGlmKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fc3BlZWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMucmFkaWFsRWZmZWN0ICs9IHRoaXMuX3NwZWVkICogNTtcbiAgICB9XG4gIH1cbiAgZ2V0IHNwZWVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zcGVlZCB8fCAwO1xuICB9XG5cbiAgc2V0IHJhZGlhbEVmZmVjdCh2YWx1ZSkge1xuICAgIGlmKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fcmFkaWFsRWZmZWN0ID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIGdldCByYWRpYWxFZmZlY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JhZGlhbEVmZmVjdCB8fCAwO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLnBhcmVudC5jZW50ZXIueCArIHRoaXMuY29tcG9uZW50cy54ICogKHRoaXMucGFyZW50LnJhZGl1cyArIHRoaXMucmFkaWFsRWZmZWN0KSxcbiAgICAgIHk6IHRoaXMucGFyZW50LmNlbnRlci55ICsgdGhpcy5jb21wb25lbnRzLnkgKiAodGhpcy5wYXJlbnQucmFkaXVzICsgdGhpcy5yYWRpYWxFZmZlY3QpXG4gICAgfVxuICB9XG5cbiAgZ2V0IGNvbXBvbmVudHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHM7XG4gIH1cblxuICBzZXQgZWxhc3RpY2l0eSh2YWx1ZSkge1xuICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX2VsYXN0aWNpdHkgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgZ2V0IGVsYXN0aWNpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsYXN0aWNpdHkgfHwgMC4wMDE7XG4gIH1cbiAgc2V0IGZyaWN0aW9uKHZhbHVlKSB7XG4gICAgaWYodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fZnJpY3Rpb24gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgZ2V0IGZyaWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9mcmljdGlvbiB8fCAwLjAxO1xuICB9XG59XG4iLCIvKipcbiAqIERlZmluZXMgYSAyRCBwb3NpdGlvbi5cbiAqL1xuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50MkQge1xuICAgIF9kaXJlY3Rpb246IFVuaXQ7XG4gICAgX21hZ25pdHVkZTogbnVtYmVyO1xuICAgIHk6IG51bWJlciA9IDA7XG4gICAgeDogbnVtYmVyID0gMDtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCAsIHkgPSAwICkge1xuICAgIFx0dGhpcy54ID0geDtcbiAgICBcdHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuX21hZ25pdHVkZSA9IE1hdGguc3FydCh0aGlzLngqdGhpcy54ICsgdGhpcy55KnRoaXMueSk7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IG5ldyBVbml0KHgseSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMsIHgsIHkpXG4gICAgfTtcblxuICAgIGdldCBtYWduaXR1ZGUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hZ25pdHVkZTtcbiAgICB9XG5cbiAgICBzZXQgbWFnbml0dWRlKG0pe1xuICAgICAgICB0aGlzLnNjYWxlKG0vdGhpcy5tYWduaXR1ZGUpXG4gICAgfVxuXG4gICAgZ2V0IGRpcmVjdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICAgIH1cbiAgICBzZXQgZGlyZWN0aW9uKGQpe1xuICAgICAgICBpZihkIGluc3RhbmNlb2YgVW5pdCl7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlTWFnbml0dWRlKCl7XG4gICAgICAgIHRoaXMuX21hZ25pdHVkZSA9IE1hdGguc3FydCh0aGlzLngqdGhpcy54ICsgdGhpcy55KnRoaXMueSk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlyZWN0aW9uKCl7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbi51cGRhdGUodGhpcy54LHRoaXMueSlcbiAgICB9XG5cbiAgICBkaXN0YW5jZVRvKCBjPzpQb2ludDJEKSB7XG4gICAgICAgIGlmKGlzTmFOKHRoaXMueCkgfHwgaXNOYU4odGhpcy55KSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTmFucyBhdCAtPj4gZGlzdGFuY2VUbygpXCIpO1xuICAgICAgICBpZihjKXtcbiAgICAgICAgICAgIHZhciBkeCA9IGMueC10aGlzLng7XG4gICAgICAgICAgICB2YXIgZHkgPSBjLnktdGhpcy55O1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCpkeCArIGR5KmR5KTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgIC8vIGRpc3RhbmNlIHRvICgwLCAwKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hZ25pdHVkZTtcbiAgICB9O1xuXG4gICAgY2xvbmUoKSB7XG4gICAgXHRyZXR1cm4gbmV3IFBvaW50MkQodGhpcy54LCB0aGlzLnkpO1xuICAgIH07XG5cbiAgICBpbnRlcnBvbGF0ZSggeDpudW1iZXIsIHk6bnVtYmVyLCBhbXA6bnVtYmVyICkge1xuICAgIFx0dGhpcy54ICs9ICggeCAtIHRoaXMueCApICogYW1wO1xuICAgIFx0dGhpcy55ICs9ICggeSAtIHRoaXMueSApICogYW1wO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hZ25pdHVkZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpcmVjdGlvbigpO1xuICAgICAgICBpZihpc05hTih0aGlzLngpIHx8IGlzTmFOKHRoaXMueSkpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5hbnMgYXQgLT4+IGludGVycG9sYXRlKClcIik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBhZGRSYW5kb20oYW1wOm51bWJlcil7XG4gICAgICAgIHRoaXMueCArPSBhbXAgKiAoLTEgKyAyKk1hdGgucmFuZG9tKCkpO1xuICAgICAgICB0aGlzLnkgKz0gYW1wICogKC0xICsgMipNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYWduaXR1ZGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXJlY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIGFkZChwb2ludDpQb2ludDJEKXtcbiAgICAgICAgdGhpcy54ICs9IHBvaW50Lng7XG4gICAgICAgIHRoaXMueSArPSBwb2ludC55O1xuICAgICAgICB0aGlzLnVwZGF0ZU1hZ25pdHVkZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpcmVjdGlvbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgcmV2ZXJzZSgpe1xuICAgICAgICB0aGlzLnggPSAtdGhpcy54O1xuICAgICAgICB0aGlzLnkgPSAtIHRoaXMueTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXJlY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV2ZXJzZVkoKXtcbiAgICAgICAgdGhpcy55ID0gLSB0aGlzLnk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldmVyc2VYKCl7XG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNjYWxlKGFtcCl7XG4gICAgICAgIHRoaXMueCAqPSBhbXA7XG4gICAgICAgIHRoaXMueSAqPSBhbXA7XG4gICAgICAgIHRoaXMuX21hZ25pdHVkZSAqPSBhbXA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFkZFJhbmRvbURpcmVjdGlvbihhbXA6bnVtYmVyKXtcbiAgICAgICAgaWYoYW1wID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgbGV0IG1hZyA9IHRoaXMubWFnbml0dWRlO1xuICAgICAgICB0aGlzLmFkZFJhbmRvbShhbXApO1xuICAgICAgICB0aGlzLm1hZ25pdHVkZSA9IG1hZztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29vcmRpbmF0ZXMoeDogbnVtYmVyIHwgdW5kZWZpbmVkLCB5PzogbnVtYmVyIHwgdW5kZWZpbmVkKXtcbiAgICAgICAgaWYoeClcbiAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIGlmKHkpXG4gICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnVwZGF0ZURpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hZ25pdHVkZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdXBkYXRlUG9pbnQoIGMgKXtcbiAgICAgICAgaWYgKGMgaW5zdGFuY2VvZiBQb2ludDJEKXtcbiAgICAgICAgICAgIHRoaXMueCA9IGMueDtcbiAgICAgICAgICAgIHRoaXMueSA9IGMueTtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gYy5kaXJlY3Rpb247XG4gICAgICAgICAgICB0aGlzLm1hZ25pdHVkZSA9IGMubWFnbml0dWRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByb3VuZChmOiAoYXJnMDogbnVtYmVyKSA9PiBudW1iZXIpe1xuICAgICAgICB0aGlzLnggPSBmKHRoaXMueCk7XG4gICAgICAgIHRoaXMueSA9IGYodGhpcy55KTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYWduaXR1ZGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5jbGFzcyBVbml0IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHk6IG51bWJlciA9IDApe1xuICAgICAgICB0aGlzLnVwZGF0ZSh4LHkpXG4gICAgfVxuXG4gICAgdXBkYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKXtcbiAgICAgICAgaWYoeD09PTAgJiYgeSA9PT0gMCl7XG4gICAgICAgICAgICB0aGlzLnggPSAwXG4gICAgICAgICAgICB0aGlzLnkgPSAwXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgZmFjdG9yID0gTWF0aC5zcXJ0KHgqeCArIHkqeSlcbiAgICAgICAgICAgIHRoaXMueCA9IHgvZmFjdG9yO1xuICAgICAgICAgICAgdGhpcy55ID0geS9mYWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZyb20oYzpQb2ludDJEKXtcbiAgICAgICAgdGhpcy51cGRhdGUoYy54LCBjLnkpXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBQb2ludDJEIGZyb20gXCIuL1BvaW50MkRcIjtcblxuZXhwb3J0IGludGVyZmFjZSByZW5kZXJhYmxle1xuICAgIHJlbmRlcjogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltT2JqZWN0e1xuICAgIHN0YXRpYyBzaW1PYmpJZE1heCA9IDA7XG4gICAgc3RhdGljIHNpbU9iak1hcCA9IG5ldyBNYXAoKTtcbiAgICBzdGF0aWMgZGlzdGFuY2VNYXAgPSBuZXcgTWFwKCk7XG4gICAgc2l6ZTogbnVtYmVyO1xuICAgIHBvc2l0aW9uOiBQb2ludDJEO1xuICAgIGJvdW5kaW5nUmFkaXVzOiBudW1iZXI7XG4gICAgc2ltT2JqSWQ6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgX3ZlbG9jaXR5OiBQb2ludDJEO1xuICAgIHByb3RlY3RlZCBzcGVlZDogbnVtYmVyXG4gICAgaXNDb2xsaWRpbmc6IGJvb2xlYW47XG4gICAgcHJvdGVjdGVkIF9jYW52YXMhOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBjdHg6IGFueTtcbiAgICBtYXNzOiBudW1iZXI7XG5cbiAgICBzdGF0aWMgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuc2ltT2JqTWFwLmNsZWFyKClcbiAgICAgICAgdGhpcy5zaW1PYmpNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuc2ltT2JqSWRNYXggPSAwO1xuICAgICAgICB0aGlzLmRpc3RhbmNlTWFwLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuZGlzdGFuY2VNYXAgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3Ioc2l6ZTpudW1iZXIsIHBvc2l0aW9uOlBvaW50MkQsIGJvdW5kaW5nUmFkaXVzPzpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBvc2l0aW9uLCBwb3NpdGlvbilcbiAgICAgICAgaWYoYm91bmRpbmdSYWRpdXMpe1xuICAgICAgICAgICAgdGhpcy5ib3VuZGluZ1JhZGl1cyA9IGJvdW5kaW5nUmFkaXVzO1xuICAgICAgICB9IGVsc2UgdGhpcy5ib3VuZGluZ1JhZGl1cyA9IHNpemU7XG4gICAgICAgIHRoaXMuc2ltT2JqSWQgPSBTaW1PYmplY3QucmVnaXN0ZXIodGhpcyk7XG4gICAgICAgIHRoaXMuaXNDb2xsaWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tYXNzID0gdGhpcy5zaXplKnRoaXMuc2l6ZVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBvc2l0aW9uLCBwb3NpdGlvbilcbiAgICB9O1xuXG4gICAgc2V0IHZlbG9jaXR5KHYpe1xuICAgICAgICB0aGlzLl92ZWxvY2l0eSA9IHY7XG4gICAgICAgIHRoaXMuc3BlZWQgPSB2Lm1hZ25pdHVkZTtcbiAgICB9XG5cbiAgICBnZXQgdmVsb2NpdHkoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlbG9jaXR5O1xuICAgIH1cblxuICAgIHN0YXRpYyByZWdpc3RlcihjOlNpbU9iamVjdCl7XG4gICAgICAgIHRoaXMuc2ltT2JqTWFwLnNldCh0aGlzLnNpbU9iaklkTWF4LCBjKTtcbiAgICAgICAgdGhpcy5zaW1PYmpJZE1heCArPSAxO1xuICAgICAgICByZXR1cm4gdGhpcy5zaW1PYmpJZE1heCAtIDE7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbXB1dGVEaXN0YW5jZXMoKXtcbiAgICAgICAgLy8gdGhpcyBjb21wdXB0YXRpb24gb2NjdXJzIGFmdGVyIGV2ZXJ5IHVwZGF0ZSBiZWZvcmUgcGFpbnRpbmcgdGhlIHNjcmVlblxuICAgICAgICBsZXQgc2ltT2JqSWRzID0gWy4uLnRoaXMuc2ltT2JqTWFwLmtleXMoKV07XG5cbiAgICAgICAgLy8gdHJhY2sgdGhlIGlkcyBvZiB0aGUgc2ltT2JqcyB3aGljaCBhcmUgaW4gYSBjb2xsaWRpbmcgc3RhdGUgZm9yIHRoaXMgdXBkYXRlXG4gICAgICAgIGxldCBjb2xsaXNpb25zID0gbmV3IFNldCgpO1xuXG4gICAgICAgIC8vIEEgYW5kIEIgcmVwcmVzZW50IGEgcGFpciBvZiBTaW1PYmplY3RzXG4gICAgICAgIC8vIEEuc2ltT2JqSWQgPT0gc2ltT2JqSWRzW3NpbU9ial9pXVxuICAgICAgICBmb3IgKGxldCBzaW1PYmpfaSA9IDA7IHNpbU9ial9pIDwgc2ltT2JqSWRzLmxlbmd0aDsgc2ltT2JqX2kgKz0gMSl7XG5cbiAgICAgICAgICAgIGxldCBhID0gdGhpcy5zaW1PYmpNYXAuZ2V0KHNpbU9iaklkc1tzaW1PYmpfaV0pO1xuXG4gICAgICAgICAgICAvLyBpZiBBIGhhcyBhbHJlYWR5IGNvbGxpZGVkIHdpdGggc29tZXRoaW5nIGluIHRoaXMgZnJhbWUsIGRvbid0XG4gICAgICAgICAgICAvLyBjaGVjayBmb3IgYW55IG90aGVyIGNvbGxpc2lvbnNcbiAgICAgICAgICAgIGlmIChjb2xsaXNpb25zLmhhcyhhLnNpbU9iaklkKSl7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBkaXN0YW5jZXNUb0E6TWFwPG51bWJlcixudW1iZXI+O1xuICAgICAgICAgICAgaWYodGhpcy5kaXN0YW5jZU1hcC5oYXMoc2ltT2JqX2kpKVxuICAgICAgICAgICAgICAgIGRpc3RhbmNlc1RvQSA9IHRoaXMuZGlzdGFuY2VNYXAuZ2V0KHNpbU9ial9pKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRpc3RhbmNlc1RvQSA9IG5ldyBNYXAoKVxuXG4gICAgICAgICAgICAvLyBpZiBBIGlzbid0IGFscmVhZHkgaW4gYSBjb2xsaWRlZCBzdGF0ZSxcbiAgICAgICAgICAgIC8vIGNoZWNrIHdpdGggZXZlcnkgb3RoZXIgc2ltT2JqIFtCXVxuICAgICAgICAgICAgZm9yIChsZXQgc2ltT2JqX2ogPSBzaW1PYmpfaSArIDE7IHNpbU9ial9qIDwgc2ltT2JqSWRzLmxlbmd0aDsgc2ltT2JqX2ogKz0gMSl7XG4gICAgICAgICAgICAgICAgbGV0IGIgPSB0aGlzLnNpbU9iak1hcC5nZXQoc2ltT2JqSWRzW3NpbU9ial9qXSk7XG4gICAgICAgICAgICAgICAgbGV0IGRpc3QgPSAoYS5wb3NpdGlvbikuZGlzdGFuY2VUbyhiLnBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGRpc3RhbmNlIGlzIGxlc3MgdGhhbiBzaXplIHRoZW4gdGhlIGNlbGxzIGFyZSBJTlNJREUgb3Igb3ZlcmxhcHBpbmdcbiAgICAgICAgICAgICAgICBpZihkaXN0IDwgYS5zaXplICsgYi5zaXplKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG92ZXJsYXAgPSAxIC0gIGRpc3QgLyAoYS5zaXplICsgYi5zaXplKVxuICAgICAgICAgICAgICAgICAgICAvLyBhLnBvc2l0aW9uLmludGVycG9sYXRlKClcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiBkaXN0YW5jZSBpcyBsZXNzIHRoYW4gc2l6ZSArIHRocmVzaG9sZCBleHRyYSBtYXJnaW5cbiAgICAgICAgICAgICAgICBpZihkaXN0IDw9IGEuYm91bmRpbmdSYWRpdXMgKyBiLmJvdW5kaW5nUmFkaXVzKXtcbiAgICAgICAgICAgICAgICAgICAgYS5vbkNvbGxpZGUoYik7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMuYWRkKGEuc2ltT2JqSWQpO1xuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zLmFkZChiLnNpbU9iaklkKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2luY2UgQSBoYXMgY29sbGlkZWQgd2l0aCBCLCB3ZSBkb24ndCBjYXJlIHdoYXQgZWxzZSBpdCdzXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxpZGluZyB3aXRoIGluIHRoaXMgdXBkYXRlXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlc1RvQS5zZXQoc2ltT2JqX2osIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGlmIEEgYW5kIEIgaGF2ZW4ndCBjb2xsaWRlZCB0aGVuIHRoZXkgaGF2ZSBzb21lIGRpc3RhbmNlID4gMFxuICAgICAgICAgICAgICAgIGlmKHNpbU9ial9pID09PSB1bmRlZmluZWQgfHwgIHNpbU9ial9qID09PSB1bmRlZmluZWQgfHwgIGRpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kaXN0YW5jZU1hcCwgc2ltT2JqX2ksIHNpbU9ial9qLCBkaXN0KVxuICAgICAgICAgICAgICAgIGRpc3RhbmNlc1RvQS5zZXQoc2ltT2JqX2osIGRpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgbm8gY29sbGlzaW9uIGhhcyBvY2N1cnJlZCBiZXR3ZWVuIEEgYW5kIGFsbCBvdGhlciBwb3NzaWJsZSBzaW1PYmpzLFxuICAgICAgICAgICAgLy8gaXQgbWVhbnMgaXQgaGFzIG5vdCBjb2xsaWRlZCBpbiB0aGlzIHVwZGF0ZTtcbiAgICAgICAgICAgIGlmICghY29sbGlzaW9ucy5oYXMoYS5zaW1PYmpJZCkpe1xuICAgICAgICAgICAgICAgIGEub2ZmQ29sbGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRpc3RhbmNlTWFwLnNldChzaW1PYmpfaSwgZGlzdGFuY2VzVG9BKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29sbGlkZSh0aGF0OlNpbU9iamVjdCk6dm9pZHtcbiAgICAgICAgdGhpcy5pc0NvbGxpZGluZyA9IHRydWU7XG4gICAgICAgIHRoYXQuaXNDb2xsaWRpbmcgPSB0cnVlXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2ltT2JqSWQsIFwiIGlzIENvbGxpZGluZyFcIilcbiAgICB9XG5cbiAgICBvZmZDb2xsaWRlKCk6dm9pZHtcbiAgICAgICAgdGhpcy5pc0NvbGxpZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNldCBjYW52YXModmFsdWUpIHtcbiAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiB2YWx1ZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdjYW52YXMnKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xuICAgIH1cbn1cbiIsImltcG9ydCBTaW1PYmplY3QsIHsgcmVuZGVyYWJsZSB9IGZyb20gXCIuL1NpbU9iamVjdFwiO1xuaW1wb3J0IFBvaW50MkQgZnJvbSBcIi4vUG9pbnQyRFwiO1xuaW1wb3J0IHsgQXVkaW9WaXN1YWwgfSBmcm9tIFwiLi9BdWRpb0NoYW5uZWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlueUNlbGwgZXh0ZW5kcyBTaW1PYmplY3QgaW1wbGVtZW50cyBBdWRpb1Zpc3VhbCwgcmVuZGVyYWJsZXtcbiAgICBjb2xvdXI6IHN0cmluZyA9IFwiYmx1ZVwiO1xuICAgIGFjY2VsZXJhdGlvbiE6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlciwgcG9zaXRpb246IFBvaW50MkQpIHtcbiAgICAgICAgc3VwZXIoc2l6ZSwgcG9zaXRpb24pXG4gICAgfVxuXG4gICAgYmVhdFJlc3BvbnNlKCl7XG4gICAgICAgIGxldCBvcmlnaW5hbFNpemUgPSB0aGlzLnNpemVcbiAgICAgICAgbGV0IG15VmFyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5zaXplICo9IDAuOTUsIDIwKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQobXlWYXIpXG4gICAgICAgICAgICB0aGlzLnNpemUgPSBvcmlnaW5hbFNpemVcbiAgICAgICAgfSwgMjAwKTtcbiAgICB9XG5cbiAgICB3YW5kZXIoKXtcbiAgICAgICAgbGV0IGNoYW5nZSA9IG5ldyBQb2ludDJEKHRoaXMudmVsb2NpdHkueCwgdGhpcy52ZWxvY2l0eS55KVxuICAgICAgICB0aGlzLmRldGVjdEJvdW5jZShjaGFuZ2UpXG4gICAgICAgIHRoaXMucG9zaXRpb24uaW50ZXJwb2xhdGUodGhpcy5wb3NpdGlvbi54ICsgY2hhbmdlLngsIHRoaXMucG9zaXRpb24ueSArIGNoYW5nZS55LCAxKTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eS5hZGRSYW5kb21EaXJlY3Rpb24odGhpcy5hY2NlbGVyYXRpb24pO1xuICAgIH1cblxuICAgIG9uQ29sbGlkZSh0aGF0OlNpbU9iamVjdCk6dm9pZHtcblxuICAgICAgICAvLyBJTVBPUlRBTlQhIDogTWFrZSBzdXJlIHRoaXMgZnVuY3Rpb24gaXMgY29tbXV0YXRpdmVcbiAgICAgICAgLy8gaS5lLiBydW5uaW5nIGEub25Db2xsaWRlKGIpIHNob3VsZCBwcm9kdWNlIHRoZSBzYW1lIHJlc3VsdCBhcyBiLm9uQ29sbGlkZShhKVxuICAgICAgICBpZighdGhpcy5pc0NvbGxpZGluZyAmJiAhdGhhdC5pc0NvbGxpZGluZyl7ICAgICAvLyBtYWtlIHN1cmUgdGhlIGNlbGxzIHdlcmVuJ3QgYWxyZWFkeSBpbiBhIGNvbGxpZGluZyBzdGF0ZSBwcmV2b3VzbHlcbiAgICAgICAgICAgIGxldCBtX0FCID0gdGhpcy5tYXNzICsgdGhhdC5tYXNzXG5cbiAgICAgICAgICAgIGxldCB2ID0gW1xuICAgICAgICAgICAgICAgIHtBaTogdGhpcy52ZWxvY2l0eS54LCBCaTogdGhhdC52ZWxvY2l0eS54LCBBZjogMCwgQmY6IDB9LCAgIC8vIHggdmVsb2NpdGllcyBvZiBBIGFuZCBCXG4gICAgICAgICAgICAgICAge0FpOiB0aGlzLnZlbG9jaXR5LnksIEJpOiB0aGF0LnZlbG9jaXR5LnksIEFmOiAwLCBCZjogMH0gICAgLy8geSB2ZWxvY2l0aWVzIG9mIEEgYW5kIEJcbiAgICAgICAgICAgIF1cblxuICAgICAgICAgICAgZm9yIChsZXQgdl8gb2Ygdil7XG4gICAgICAgICAgICAgICAgdl8uQWYgPSB2Xy5BaSAqICh0aGlzLm1hc3MgLSB0aGF0Lm1hc3MpIC8gbV9BQlxuICAgICAgICAgICAgICAgICsgMiAqIHZfLkJpICogdGhhdC5tYXNzIC8gbV9BQlxuICAgICAgICAgICAgICAgIHZfLkJmID0gdl8uQmkgKiAodGhhdC5tYXNzIC0gdGhhdC5tYXNzKSAgLyBtX0FCXG4gICAgICAgICAgICAgICAgKyAyICogdl8uQWkgKiB0aGlzLm1hc3MgLyBtX0FCXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGlzTmFOKHRoaXMucG9zaXRpb24ueCkgfHwgaXNOYU4odGhpcy5wb3NpdGlvbi55KSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5hbnMgYXQgLT4+IG9uQ29sbGlkZSgpXCIpO1xuXG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnVwZGF0ZUNvb3JkaW5hdGVzKHZbMF0uQWYsIHZbMV0uQWYpXG4gICAgICAgICAgICB0aGF0LnZlbG9jaXR5LnVwZGF0ZUNvb3JkaW5hdGVzKHZbMF0uQmYsIHZbMV0uQmYpXG5cbiAgICAgICAgICAgIHN1cGVyLm9uQ29sbGlkZSh0aGF0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRldGVjdEJvdW5jZShjaGFuZ2U6IFBvaW50MkQpe1xuICAgICAgICBpZihpc05hTih0aGlzLnBvc2l0aW9uLngpIHx8IGlzTmFOKHRoaXMucG9zaXRpb24ueSkpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5hbnMgYXQgLT4+IGRldGVjdEJvdW5jZSgpXCIpO1xuICAgICAgICBsZXQgeCA9IHRoaXMucG9zaXRpb24ueDtcbiAgICAgICAgbGV0IHkgPSB0aGlzLnBvc2l0aW9uLnk7XG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLmNhbnZhcztcblxuICAgICAgICBpZih4ICsgY2hhbmdlLnggPiBjYW52YXMud2lkdGgtdGhpcy5zaXplIHx8IHggKyBjaGFuZ2UueCA8IHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgY2hhbmdlLnggPSAtY2hhbmdlLng7XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnJldmVyc2VYKClcbiAgICAgICAgfVxuICAgICAgICBpZih5ICsgY2hhbmdlLnkgPiBjYW52YXMuaGVpZ2h0LXRoaXMuc2l6ZSB8fCB5ICsgY2hhbmdlLnkgPCB0aGlzLnNpemUpIHtcbiAgICAgICAgICAgIGNoYW5nZS55ID0gLWNoYW5nZS55O1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS5yZXZlcnNlWSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XG4gICAgICAgIGlmKGlzTmFOKHRoaXMucG9zaXRpb24ueCkgfHwgaXNOYU4odGhpcy5wb3NpdGlvbi55KSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTmFucyBhdCAtPj4gcmVuZGVyKClcIik7XG5cbiAgICAgICAgdGhpcy53YW5kZXIoKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnNpemUsIDAsIE1hdGguUEkqMik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmlzQ29sbGlkaW5nPyBcInJlZFwiIDogIHRoaXMuY29sb3VyO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgUG9pbnQyRCBmcm9tIFwiLi9Qb2ludDJEXCI7XG5pbXBvcnQgU2ltT2JqZWN0LCB7IHJlbmRlcmFibGUgfSBmcm9tIFwiLi9TaW1PYmplY3RcIjtcbmltcG9ydCBCbG9iIGZyb20gXCIuL0Jsb2JcIjtcbi8vIGltcG9ydCBcIi4vbW9kZWxzL1BvaW50XCI7XG5pbXBvcnQgVGlueUNlbGwgZnJvbSBcIi4vVGlueUNlbGxcIjtcbmltcG9ydCAqIGFzIFRvbmUgZnJvbSBcInRvbmVcIjtcbmltcG9ydCBBdWRpb0NvbnRyb2xsZXIgZnJvbSBcIi4vQXVkaW9DaGFubmVsXCI7XG5cblxuLyoqXG4gKiBAYXV0aG9yIENoYWl0YW55YSBCaGFnd2F0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGQge1xuICAgIGNhbnZhcyE6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGRpbWVuc2lvbjogUG9pbnQyRDtcbiAgICBjZW50ZXI6IFBvaW50MkQ7XG4gICAgc3RhdGljQXNzZXN0czogcmVuZGVyYWJsZVtdO1xuICAgIGlzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gICAgc3RhdGljIFdvcmxkTWFwID0gbmV3IE1hcCgpO1xuICAgIHdvcmxkSWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy53b3JsZElkID0gaWQ7XG4gICAgICAgIHRoaXMuZGltZW5zaW9uID0gbmV3IFBvaW50MkQod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIHRoaXMuY2VudGVyID0gbmV3IFBvaW50MkQoKTtcbiAgICAgICAgdGhpcy5zdGF0aWNBc3Nlc3RzID0gW107XG4gICAgICAgIFdvcmxkLldvcmxkTWFwLnNldChpZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuaW5pdENhbnZhcygpO1xuICAgIH1cblxuICAgIGluaXRDYW52YXMoKXtcbiAgICAgICAgV29ybGQucmVzZXQoKTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCd0b3VjaC1hY3Rpb24nLCAnbm9uZScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcbiAgICAgICAgLy8gRm9yY2UgYW4gaW5pdGlhbCBsYXlvdXRcbiAgICAgICAgdGhpcy5vbldpbmRvd1Jlc2l6ZSgpO1xuICAgIH1cblxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKG1vdXNlTW92ZTogeyAoZTogYW55KTogdm9pZDsgKHRoaXM6IFdpbmRvdywgZXY6IFBvaW50ZXJFdmVudCk6IGFueTsgfSkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vbldpbmRvd1Jlc2l6ZSwgZmFsc2UpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBtb3VzZU1vdmUpO1xuICAgIH07XG5cbiAgICBvbldpbmRvd1Jlc2l6ZSgpIHtcbiAgICAgICAgLy8gVGhlIHdvcmxkIGRpbWVuc2lvbnNcbiAgICAgICAgbGV0IHggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgbGV0IHkgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHRoaXMuZGltZW5zaW9uLnVwZGF0ZUNvb3JkaW5hdGVzKHgsIHkpO1xuICAgICAgICB0aGlzLmNlbnRlci51cGRhdGVDb29yZGluYXRlcyh4IC8gMiwgeSAvIDIpLnJvdW5kKE1hdGguZmxvb3IpO1xuICAgICAgICAvLyBSZXNpemUgdGhlIGNhbnZhc1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHk7XG4gICAgfTtcblxuICAgIGFkZEJsb2IoYmxvYjogQmxvYikge1xuICAgICAgICB0aGlzLnN0YXRpY0Fzc2VzdHMucHVzaChibG9iKTtcbiAgICAgICAgbGV0IG9sZE1vdXNlUG9pbnQgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgbGV0IGhvdmVyID0gZmFsc2U7XG4gICAgICAgIGxldCBtb3VzZU1vdmUgPSBmdW5jdGlvbihlOiB7IGNsaWVudFg6IG51bWJlcjsgY2xpZW50WTogbnVtYmVyOyB9KSB7XG4gICAgICAgICAgICBsZXQgcG9zID0gYmxvYi5jZW50ZXI7XG4gICAgICAgICAgICBsZXQgZGlmZiA9IHsgeDogZS5jbGllbnRYIC0gcG9zLngsIHk6IGUuY2xpZW50WSAtIHBvcy55IH07XG4gICAgICAgICAgICBsZXQgZGlzdCA9IE1hdGguc3FydCgoZGlmZi54ICogZGlmZi54KSArIChkaWZmLnkgKiBkaWZmLnkpKTtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IG51bGw7XG4gICAgICAgICAgICBibG9iLm1vdXNlUG9zID0geyB4OiBwb3MueCAtIGUuY2xpZW50WCwgeTogcG9zLnkgLSBlLmNsaWVudFkgfTtcbiAgICAgICAgICAgIGlmIChkaXN0IDwgYmxvYi5yYWRpdXMgJiYgaG92ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZlY3RvciA9IHsgeDogZS5jbGllbnRYIC0gcG9zLngsIHk6IGUuY2xpZW50WSAtIHBvcy55IH07XG4gICAgICAgICAgICAgICAgYW5nbGUgPSBNYXRoLmF0YW4yKHZlY3Rvci55LCB2ZWN0b3IueCk7XG4gICAgICAgICAgICAgICAgaG92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIGJsb2IuY29sb3IgPSAnIzc3RkYwMCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaXN0ID4gYmxvYi5yYWRpdXMgJiYgaG92ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmVjdG9yID0geyB4OiBlLmNsaWVudFggLSBwb3MueCwgeTogZS5jbGllbnRZIC0gcG9zLnkgfTtcbiAgICAgICAgICAgICAgICBhbmdsZSA9IE1hdGguYXRhbjIodmVjdG9yLnksIHZlY3Rvci54KTtcbiAgICAgICAgICAgICAgICBob3ZlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJsb2IuY29sb3IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhbmdsZSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGxldCBuZWFyZXN0UG9pbnRfMSA9IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlRnJvbVBvaW50XzEgPSAxMDA7XG4gICAgICAgICAgICAgICAgYmxvYi5wb2ludHMuZm9yRWFjaChmdW5jdGlvbihwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoYW5nbGUgLSBwb2ludC5hemltdXRoKSA8IGRpc3RhbmNlRnJvbVBvaW50XzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBvaW50LmF6aW11dGgsIGFuZ2xlLCBkaXN0YW5jZUZyb21Qb2ludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0UG9pbnRfMSA9IHBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VGcm9tUG9pbnRfMSA9IE1hdGguYWJzKGFuZ2xlIC0gcG9pbnQuYXppbXV0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAobmVhcmVzdFBvaW50XzEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0cmVuZ3RoVmVjdG9yID0gbmV3IFBvaW50MkQob2xkTW91c2VQb2ludC54IC0gZS5jbGllbnRYLG9sZE1vdXNlUG9pbnQueSAtIGUuY2xpZW50WSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHJlbmd0aCA9IHN0cmVuZ3RoVmVjdG9yLmRpc3RhbmNlVG8oKSAqIDEwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZW5ndGggPiAxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlbmd0aCA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgbmVhcmVzdFBvaW50XzEuYWNjZWxlcmF0aW9uID0gc3RyZW5ndGggLyAxMDAgKiAoaG92ZXIgPyAtMSA6IDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9sZE1vdXNlUG9pbnQueCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgIG9sZE1vdXNlUG9pbnQueSA9IGUuY2xpZW50WTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycyhtb3VzZU1vdmUpO1xuICAgICAgICBibG9iLmNhbnZhcyA9IHRoaXMuY2FudmFzO1xuICAgICAgICBibG9iLmluaXQoKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIHJlc2V0KCl7XG4gICAgICAgIFNpbU9iamVjdC5yZXNldCgpXG4gICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpXG4gICAgICAgIGlmKGNhbnZhcylcbiAgICAgICAgICAgIGNhbnZhcy5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5Xb3JsZE1hcC5mb3JFYWNoKHdvcmxkID0+IHdvcmxkLmlzQWN0aXZlID0gZmFsc2UpXG4gICAgfTtcblxuICAgIHJlbmRlcigpe1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmKGN0eCl7XG4gICAgICAgICAgICBsZXQgcmVuZGVyRnJhbWUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzdCBvZiB0aGlzLnN0YXRpY0Fzc2VzdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc3QucmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvcihsZXQgW2NfSWQsIGNlbGxdIG9mIFNpbU9iamVjdC5zaW1PYmpNYXApe1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnJlbmRlcigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFNpbU9iamVjdC5jb21wdXRlRGlzdGFuY2VzKCk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0FjdGl2ZSlcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyRnJhbWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlbmRlckZyYW1lKCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiLyoqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tSW50KG1heCkge1xuICBcdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xufVxuXG52YXIgQ2FwYWJpbGl0aWVzID0ge1xuXHRpc09ubGluZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIG5hdmlnYXRvci5vbkxpbmU7XG5cdH0sXG5cblx0aXNUb3VjaERldmljZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goIC8oaXBob25lfGlwYWR8aXBvZHxhbmRyb2lkKS9naSApO1xuXHR9LFxuXG5cdHN1cG9ydHNMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoJ2xvY2FsU3RvcmFnZScgaW4gd2luZG93KSAmJiB3aW5kb3dbJ2xvY2FsU3RvcmFnZSddICE9PSBudWxsO1xuXHR9XG59O1xuXG4vKipcbiAqIERlZmluZXMgb2YgYSByZWN0YW5ndWxhciByZWdpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWdpb257XG4gICAgY29uc3RydWN0b3IoKXtcblx0dGhpcy5sZWZ0ID0gOTk5OTk5O1xuXHR0aGlzLnRvcCA9IDk5OTk5OTtcblx0dGhpcy5yaWdodCA9IDA7XG5cdHRoaXMuYm90dG9tID0gMDtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICBcdHRoaXMubGVmdCA9IDk5OTk5OTtcbiAgICBcdHRoaXMudG9wID0gOTk5OTk5O1xuICAgIFx0dGhpcy5yaWdodCA9IDA7XG4gICAgXHR0aGlzLmJvdHRvbSA9IDA7XG4gICAgfVxuXG4gICAgaW5mbGF0ZSggeCwgeSApIHtcbiAgICBcdHRoaXMubGVmdCA9IE1hdGgubWluKHRoaXMubGVmdCwgeCk7XG4gICAgXHR0aGlzLnRvcCA9IE1hdGgubWluKHRoaXMudG9wLCB5KTtcbiAgICBcdHRoaXMucmlnaHQgPSBNYXRoLm1heCh0aGlzLnJpZ2h0LCB4KTtcbiAgICBcdHRoaXMuYm90dG9tID0gTWF0aC5tYXgodGhpcy5ib3R0b20sIHkpO1xuICAgIH1cblxuICAgIGV4cGFuZCggeCwgeSApIHtcbiAgICBcdHRoaXMubGVmdCAtPSB4O1xuICAgIFx0dGhpcy50b3AgLT0geTtcbiAgICBcdHRoaXMucmlnaHQgKz0geDtcbiAgICBcdHRoaXMuYm90dG9tICs9IHk7XG4gICAgfTtcblxuICAgIGNvbnRhaW5zKCB4LCB5ICkge1xuICAgIFx0cmV0dXJuIHggPiB0aGlzLmxlZnQgJiYgeCA8IHRoaXMucmlnaHQgJiYgeSA+IHRoaXMudG9wICYmIHkgPCB0aGlzLmJvdHRvbTtcbiAgICB9O1xuXG4gICAgc2l6ZSgpIHtcbiAgICBcdHJldHVybiAoICggdGhpcy5yaWdodCAtIHRoaXMubGVmdCApICsgKCB0aGlzLmJvdHRvbSAtIHRoaXMudG9wICkgKSAvIDI7XG4gICAgfTtcblxuICAgIGNlbnRlcigpIHtcbiAgICBcdHJldHVybiBuZXcgUG9pbnQoIHRoaXMubGVmdCArICh0aGlzLnJpZ2h0IC0gdGhpcy5sZWZ0KSAvIDIsIHRoaXMudG9wICsgKHRoaXMuYm90dG9tIC0gdGhpcy50b3ApIC8gMiApO1xuICAgIH07XG5cbiAgICB0b1JlY3RhbmdsZSgpIHtcbiAgICBcdHJldHVybiB7IHg6IHRoaXMubGVmdCwgeTogdGhpcy50b3AsIHdpZHRoOiB0aGlzLnJpZ2h0IC0gdGhpcy5sZWZ0LCBoZWlnaHQ6IHRoaXMuYm90dG9tIC0gdGhpcy50b3AgfTtcbiAgICB9O1xufVxuXG5cblxuLy8gLy8gc2hpbSBsYXllciB3aXRoIHNldFRpbWVvdXQgZmFsbGJhY2sgZnJvbSBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xuLy8gZXhwb3J0IGNvbnN0IHJlcXVlc3RBbmltRnJhbWUgPSBmdW5jdGlvbih3aW5kb3cpe1xuLy8gICByZXR1cm4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcbi8vICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4vLyAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuLy8gICAgICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcbi8vICAgICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4vLyAgICAgICAgICAgZnVuY3Rpb24oLyogZnVuY3Rpb24gKi8gY2FsbGJhY2ssIC8qIERPTUVsZW1lbnQgKi8gZWxlbWVudCl7XG4vLyAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbi8vICAgICAgICAgICB9O1xuLy8gfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=