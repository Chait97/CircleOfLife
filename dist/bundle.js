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
/* harmony import */ var _models_Point2D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/Point2D */ "./models/Point2D.ts");
/* harmony import */ var _models_SimObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/SimObject */ "./models/SimObject.ts");
/* harmony import */ var _models_Blob__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/Blob */ "./models/Blob.ts");
/* harmony import */ var _models_TinyCell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/TinyCell */ "./models/TinyCell.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./utils.ts");



// import "./models/Point";


/**
 * @author Chaitanya Bhagwat
 */
class World {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('touch-action', 'none');
        document.body.appendChild(this.canvas);
        this.dimension = new _models_Point2D__WEBPACK_IMPORTED_MODULE_0__["default"](window.innerWidth, window.innerHeight);
        this.center = new _models_Point2D__WEBPACK_IMPORTED_MODULE_0__["default"]();
        // Force an initial layout
        this.onWindowResize();
        this.staticAssests = [];
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
                    let strengthVector = new _models_Point2D__WEBPACK_IMPORTED_MODULE_0__["default"](oldMousePoint.x - e.clientX, oldMousePoint.y - e.clientY);
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
    render() {
        let ctx = this.canvas.getContext('2d');
        let renderFrame = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let st of this.staticAssests) {
                st.render();
            }
            for (let [c_Id, cell] of _models_SimObject__WEBPACK_IMPORTED_MODULE_1__["default"].simObjMap) {
                cell.render();
            }
            _models_SimObject__WEBPACK_IMPORTED_MODULE_1__["default"].computeDistances();
            requestAnimationFrame(renderFrame);
        };
        renderFrame();
    }
    ;
}
let world = new World;
let nPoints = 50;
for (let i = 0; i < nPoints; i += 1) {
    let cell = new _models_TinyCell__WEBPACK_IMPORTED_MODULE_3__["default"](Object(_utils__WEBPACK_IMPORTED_MODULE_4__["randomInt"])(50) + 10, world.center.clone().addRandom(300));
    cell.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cell.velocity = (new _models_Point2D__WEBPACK_IMPORTED_MODULE_0__["default"]).addRandom(2);
    cell.acceleration = 0.5;
    cell.canvas = world.canvas;
}
let blob = new _models_Blob__WEBPACK_IMPORTED_MODULE_2__["default"];
blob.numPoints = 20;
blob.radius = 300;
world.addBlob(blob);
world.render();


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
        this.x = x;
        this.y = y;
        this._magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
        this._direction = new Unit(x, y);
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
        if (c) {
            var dx = c.x - this.x;
            var dy = c.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
        else
            return Math.sqrt(this.x * this.x + this.y * this.y);
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
        let mag = this.magnitude;
        this.addRandom(amp);
        this.magnitude = mag;
        return this;
    }
    updateCoordinates(x, y) {
        this.x = x;
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
    constructor(x, y) {
        this.update(x, y);
    }
    update(x, y) {
        let factor = Math.sqrt(x * x + y * y);
        this.x = x / factor;
        this.y = y / factor;
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
            if (boundingRadius) {
                this.boundingRadius = boundingRadius;
            }
            else
                this.boundingRadius = size;
            this.simObjId = SimObject.register(this);
            this.isColliding = false;
        }
        ;
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
                    // if distance is less than size + threshold extra margin
                    if (dist <= a.boundingRadius + b.boundingRadius) {
                        a.onCollide();
                        b.onCollide();
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
        onCollide() {
            this.isColliding = true;
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
        let txt = ["BOOM!", "POW!", "BANG!", "AAAARGHH!", "YAY!", "ZOINK!"];
        this.choice = txt[Math.floor(Math.random() * txt.length)];
    }
    ;
    set velocity(v) {
        this._velocity = v;
        this.speed = v.magnitude;
    }
    get velocity() {
        return this._velocity;
    }
    wander() {
        let change = new _Point2D__WEBPACK_IMPORTED_MODULE_1__["default"](this.velocity.x, this.velocity.y);
        this.detectBounce(change);
        this.position.interpolate(this.position.x + change.x, this.position.y + change.y, 1);
        this.velocity.addRandomDirection(this.acceleration);
    }
    onCollide() {
        if (!this.isColliding) { // make sure cell wasn't already in a colliding state prevously
            this._velocity.reverse();
            this.isColliding = true;
            this._velocity.scale(3);
        }
    }
    offCollide() {
        if (this.isColliding) { // make sure it wasn't colliding before
            this._velocity.scale(1 / 3);
            this.isColliding = false;
        }
    }
    detectBounce(change) {
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
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.wander();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();
        if (this.isColliding) {
            ctx.font = "25px Monospace";
            ctx.fillStyle = "#AAAAAA";
            ctx.textAlign = "center";
            ctx.fillText(this.choice, this.position.x, this.position.y);
        }
    }
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL21vZGVscy9CbG9iLnRzIiwid2VicGFjazovLy8uL21vZGVscy9Qb2ludC50cyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvUG9pbnQyRC50cyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvU2ltT2JqZWN0LnRzIiwid2VicGFjazovLy8uL21vZGVscy9UaW55Q2VsbC50cyIsIndlYnBhY2s6Ly8vLi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1QztBQUNJO0FBQ1Y7QUFDakMsMkJBQTJCO0FBQ2M7QUFDTDtBQUVwQzs7R0FFRztBQUVILE1BQU0sS0FBSztJQUtQO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHVEQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHVEQUFPLEVBQUUsQ0FBQztRQUM1QiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxTQUFxRTtRQUNuRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQUEsQ0FBQztJQUNGLGNBQWM7UUFDVix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUMxQixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RCxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQUEsQ0FBQztJQUNGLE9BQU8sQ0FBQyxJQUFVO1FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNuQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxTQUFTLEdBQUcsVUFBUyxDQUFDO1lBQ3RCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMxRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDL0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFO2dCQUN2QyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUM1RCxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDYiwwQkFBMEI7YUFDN0I7aUJBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUMzQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUM1RCxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzthQUNyQjtZQUNELElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUFFO2dCQUMxQixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLElBQUksbUJBQW1CLEdBQUcsR0FBRyxDQUFDO2dCQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFTLEtBQUs7b0JBQzlCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLG1CQUFtQixFQUFFO3dCQUN2RCx3REFBd0Q7d0JBQ3hELGNBQWMsR0FBRyxLQUFLLENBQUM7d0JBQ3ZCLG1CQUFtQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDekQ7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxjQUFjLEVBQUU7b0JBQ2hCLElBQUksY0FBYyxHQUFHLElBQUksdURBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzFGLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUM7b0JBQ2hELElBQUksUUFBUSxHQUFHLEdBQUc7d0JBQ2QsUUFBUSxHQUFHLEdBQUcsQ0FBQztvQkFDbkIsY0FBYyxDQUFDLFlBQVksR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ25FO2FBQ0o7WUFDRCxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDNUIsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ2hDLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFBQSxDQUFDO0lBRUYsTUFBTTtRQUNGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksV0FBVyxHQUFHLEdBQUcsRUFBRTtZQUNuQixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxLQUFLLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQy9CLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO1lBQ0QsS0FBSSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLHlEQUFTLENBQUMsU0FBUyxFQUFDO2dCQUMxQyxJQUFJLENBQUMsTUFBTSxFQUFFO2FBQ3BCO1lBQ0sseURBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzdCLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztRQUNGLFdBQVcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFBQSxDQUFDO0NBQ0w7QUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQztBQUV0QixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQ2pDLElBQUksSUFBSSxHQUFHLElBQUksd0RBQVEsQ0FBQyx3REFBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsYUFBYSxDQUFDO0lBQzNELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLHVEQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7SUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0NBQzlCO0FBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxvREFBSSxDQUFDO0FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDekhmO0FBQUE7QUFBQTtBQUE0QjtBQUViLE1BQU0sSUFBSTtJQVdyQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJO1FBQ0EsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBSSxLQUFLLEdBQUcsSUFBSSw4Q0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdkQsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzdCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzVCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDakMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV6QixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEUsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDMUMsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFakQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUU3QixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuRixJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ2pDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLDBCQUEwQjtZQUUxQixHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMxQiwwQ0FBMEM7WUFFMUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUNYO1FBRUQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekMsNEJBQTRCO1FBRTVCLG1CQUFtQjtRQUNuQixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0IsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsR0FBRyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFJO1FBQ0wsSUFBSSxJQUFJLFlBQVksOENBQUssRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFLO1FBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLEtBQUs7UUFDWixJQUFJLEtBQUssWUFBWSxXQUFXLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLEVBQUU7WUFDMUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7SUFDRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksU0FBUyxDQUFDLEtBQUs7UUFDZixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDWCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFDRCxJQUFJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFLO1FBQ1osSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBQ0QsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBSztRQUNkLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFDRCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQy9GLENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLO1FBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDO0lBQ2xDLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ3hJQTtBQUFBO0FBQWUsTUFBTSxLQUFLO0lBVXpCLFlBQVksT0FBTyxFQUFFLE1BQU07UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHO1lBQ2pCLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDekIsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUMxQixDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVU7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBRSxTQUFTLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUUsR0FBRyxDQUFFLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbk0sQ0FBQztJQUVELElBQUksWUFBWSxDQUFDLEtBQUs7UUFDcEIsSUFBRyxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7SUFDRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFLO1FBQ2IsSUFBRyxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFlBQVksQ0FBQyxLQUFLO1FBQ3BCLElBQUcsT0FBTyxLQUFLLElBQUksUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUNELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU87WUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN0RixDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUN2RjtJQUNILENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksVUFBVSxDQUFDLEtBQUs7UUFDbEIsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBQ0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSztRQUNoQixJQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUN4QjtJQUNILENBQUM7SUFDRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO0lBQ2hDLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7OztBQ2pGRDtBQUFBO0FBQUE7O0dBRUc7QUFDYSxNQUFNLE9BQU87SUFLekIsWUFBWSxDQUFDLEdBQUUsQ0FBQyxFQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDUixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFBQSxDQUFDO0lBRUYsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFNBQVMsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFJLFNBQVMsQ0FBQyxDQUFDO1FBQ1gsSUFBRyxDQUFDLFlBQVksSUFBSSxFQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxVQUFVLENBQUUsQ0FBVTtRQUNsQixJQUFHLENBQUMsRUFBQztZQUNELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25DOztZQUNHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUFBLENBQUM7SUFFRixLQUFLO1FBQ0osT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBRSxDQUFRLEVBQUUsQ0FBUSxFQUFFLEdBQVU7UUFDMUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFFLEdBQUcsR0FBRyxDQUFDO1FBQy9CLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBRSxHQUFHLEdBQUcsQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFBQSxDQUFDO0lBRUYsU0FBUyxDQUFDLEdBQVU7UUFDaEIsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQUEsQ0FBQztJQUVGLEdBQUcsQ0FBQyxLQUFhO1FBQ2IsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFBQSxDQUFDO0lBRUYsT0FBTztRQUNILElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUc7UUFDTCxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNkLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO1FBQ2QsSUFBSSxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELGtCQUFrQixDQUFDLEdBQUc7UUFDbEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsV0FBVyxDQUFFLENBQUM7UUFDVixJQUFJLENBQUMsWUFBWSxPQUFPLEVBQUM7WUFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztTQUNoQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxLQUFLLENBQUMsQ0FBMkI7UUFDN0IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQUVELE1BQU0sSUFBSTtJQUdOLFlBQVksQ0FBUyxFQUFFLENBQVM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxNQUFNLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDdkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsTUFBTSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFDLE1BQU0sQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNwSkE7QUFBQTtJQUFBLE1BQXFCLFNBQVM7UUFZM0IsWUFBWSxJQUFXLEVBQUUsUUFBZ0IsRUFBRSxjQUFzQjtZQUM3RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFHLGNBQWMsRUFBQztnQkFDZCxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQzthQUN4Qzs7Z0JBQU0sSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUM7UUFBQSxDQUFDO1FBR0YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFXO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsTUFBTSxDQUFDLGdCQUFnQjtZQUNuQix5RUFBeUU7WUFFekUsSUFBSSxTQUFTLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUUzQyw4RUFBOEU7WUFDOUUsSUFBSSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUUzQix5Q0FBeUM7WUFDekMsb0NBQW9DO1lBQ3BDLEtBQUssSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsSUFBSSxDQUFDLEVBQUM7Z0JBRTlELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUVoRCxnRUFBZ0U7Z0JBQ2hFLGlDQUFpQztnQkFDakMsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQztvQkFDM0IsU0FBUztpQkFDWjtnQkFFRCxJQUFJLFlBQStCLENBQUM7Z0JBQ3BDLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO29CQUM3QixZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDOztvQkFFN0MsWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFO2dCQUU1QiwwQ0FBMEM7Z0JBQzFDLG9DQUFvQztnQkFDcEMsS0FBSyxJQUFJLFFBQVEsR0FBRyxRQUFRLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsSUFBSSxDQUFDLEVBQUM7b0JBQ3pFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNoRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUUvQyx5REFBeUQ7b0JBQ3pELElBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBQzt3QkFDM0MsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUNkLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDZCxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDM0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQzNCLDREQUE0RDt3QkFDNUQsZ0NBQWdDO3dCQUNoQyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixNQUFNO3FCQUNUO29CQUNELCtEQUErRDtvQkFDL0QsSUFBRyxRQUFRLEtBQUssU0FBUyxJQUFLLFFBQVEsS0FBSyxTQUFTLElBQUssSUFBSSxLQUFLLFNBQVM7d0JBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQztvQkFDM0QsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3BDO2dCQUNELHlFQUF5RTtnQkFDekUsK0NBQStDO2dCQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUM7b0JBQzVCLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDbEI7Z0JBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQ2hEO1FBQ0wsQ0FBQztRQUVELFNBQVM7WUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QiwrQ0FBK0M7UUFDbkQsQ0FBQztRQUVELFVBQVU7WUFDTixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDO1FBRUQsSUFBSSxNQUFNLENBQUMsS0FBSztZQUNaLElBQUcsS0FBSyxZQUFZLFdBQVcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVEsRUFBRTtnQkFDekUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxNQUFNO1lBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7O0lBeEdNLHFCQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLG1CQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUN0QixxQkFBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUF1R25DLGdCQUFDO0tBQUE7QUExR3FCLHdFQUFTOzs7Ozs7Ozs7Ozs7O0FDRi9CO0FBQUE7QUFBQTtBQUFBO0FBQW9DO0FBQ0o7QUFFakIsTUFBTSxRQUFTLFNBQVEsa0RBQVM7SUFNM0MsWUFBWSxJQUFZLEVBQUUsUUFBaUI7UUFDdkMsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7UUFDckIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztRQUNuRSxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQUEsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLENBQUM7UUFDVixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksTUFBTSxHQUFHLElBQUksZ0RBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxFQUFNLCtEQUErRDtZQUN0RixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUMsRUFBUyx1Q0FBdUM7WUFDaEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxNQUFlO1FBQ3hCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFekIsSUFBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNsRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtTQUMzQjtRQUNELElBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbkUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUVuQixvREFBb0Q7UUFDcEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWhCLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBQztZQUNoQixHQUFHLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDO1lBQzVCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzFCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztDQUVKOzs7Ozs7Ozs7Ozs7O0FDaEZEO0FBQUE7QUFBQTtBQUFBOztHQUVHO0FBQ0ksU0FBUyxTQUFTLENBQUMsR0FBRztJQUMxQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRUQsSUFBSSxZQUFZLEdBQUc7SUFDbEIsUUFBUSxFQUFFO1FBQ1QsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxhQUFhLEVBQUU7UUFDZCxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFFLDhCQUE4QixDQUFFLENBQUM7SUFDcEUsQ0FBQztJQUVELG1CQUFtQixFQUFFO1FBQ3BCLE9BQU8sQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUksQ0FBQztJQUN0RSxDQUFDO0NBQ0QsQ0FBQztBQUVGOztHQUVHO0FBQ0ksTUFBTSxNQUFNO0lBQ2Y7UUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELEtBQUs7UUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxPQUFPLENBQUUsQ0FBQyxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsTUFBTSxDQUFFLENBQUMsRUFBRSxDQUFDO1FBQ1gsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFBQSxDQUFDO0lBRUYsUUFBUSxDQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMzRSxDQUFDO0lBQUEsQ0FBQztJQUVGLElBQUk7UUFDSCxPQUFPLENBQUUsQ0FBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUUsR0FBRyxDQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFBQSxDQUFDO0lBRUYsTUFBTTtRQUNMLE9BQU8sSUFBSSxLQUFLLENBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUM7SUFDdkcsQ0FBQztJQUFBLENBQUM7SUFFRixXQUFXO1FBQ1YsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3JHLENBQUM7SUFBQSxDQUFDO0NBQ0w7QUFJRCxtSEFBbUg7QUFDbkgsb0RBQW9EO0FBQ3BELGtEQUFrRDtBQUNsRCxrREFBa0Q7QUFDbEQsa0RBQWtEO0FBQ2xELGtEQUFrRDtBQUNsRCxrREFBa0Q7QUFDbEQseUVBQXlFO0FBQ3pFLHNEQUFzRDtBQUN0RCxlQUFlO0FBQ2YsS0FBSyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwcC50c1wiKTtcbiIsImltcG9ydCBQb2ludDJEIGZyb20gXCIuL21vZGVscy9Qb2ludDJEXCI7XG5pbXBvcnQgU2ltT2JqZWN0IGZyb20gXCIuL21vZGVscy9TaW1PYmplY3RcIjtcbmltcG9ydCBCbG9iIGZyb20gXCIuL21vZGVscy9CbG9iXCI7XG4vLyBpbXBvcnQgXCIuL21vZGVscy9Qb2ludFwiO1xuaW1wb3J0IFRpbnlDZWxsIGZyb20gXCIuL21vZGVscy9UaW55Q2VsbFwiO1xuaW1wb3J0IHsgcmFuZG9tSW50IH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG4gKiBAYXV0aG9yIENoYWl0YW55YSBCaGFnd2F0XG4gKi9cblxuY2xhc3MgV29ybGQge1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgZGltZW5zaW9uOiBQb2ludDJEO1xuICAgIGNlbnRlcjogUG9pbnQyRDtcbiAgICBzdGF0aWNBc3Nlc3RzOiBPYmplY3RbXTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCd0b3VjaC1hY3Rpb24nLCAnbm9uZScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcbiAgICAgICAgdGhpcy5kaW1lbnNpb24gPSBuZXcgUG9pbnQyRCh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBuZXcgUG9pbnQyRCgpO1xuICAgICAgICAvLyBGb3JjZSBhbiBpbml0aWFsIGxheW91dFxuICAgICAgICB0aGlzLm9uV2luZG93UmVzaXplKCk7XG4gICAgICAgIHRoaXMuc3RhdGljQXNzZXN0cyA9IFtdO1xuICAgIH1cblxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKG1vdXNlTW92ZTogeyAoZTogYW55KTogdm9pZDsgKHRoaXM6IFdpbmRvdywgZXY6IFBvaW50ZXJFdmVudCk6IGFueTsgfSkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vbldpbmRvd1Jlc2l6ZSwgZmFsc2UpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBtb3VzZU1vdmUpO1xuICAgIH07XG4gICAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIC8vIFRoZSB3b3JsZCBkaW1lbnNpb25zXG4gICAgICAgIGxldCB4ID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGxldCB5ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICB0aGlzLmRpbWVuc2lvbi51cGRhdGVDb29yZGluYXRlcyh4LCB5KTtcbiAgICAgICAgdGhpcy5jZW50ZXIudXBkYXRlQ29vcmRpbmF0ZXMoeCAvIDIsIHkgLyAyKS5yb3VuZChNYXRoLmZsb29yKTtcbiAgICAgICAgLy8gUmVzaXplIHRoZSBjYW52YXNcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB4O1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB5O1xuICAgIH07XG4gICAgYWRkQmxvYihibG9iOiBCbG9iKSB7XG4gICAgICAgIHRoaXMuc3RhdGljQXNzZXN0cy5wdXNoKGJsb2IpO1xuICAgICAgICBsZXQgb2xkTW91c2VQb2ludCA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICBsZXQgaG92ZXIgPSBmYWxzZTtcbiAgICAgICAgbGV0IG1vdXNlTW92ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSBibG9iLmNlbnRlcjtcbiAgICAgICAgICAgIGxldCBkaWZmID0geyB4OiBlLmNsaWVudFggLSBwb3MueCwgeTogZS5jbGllbnRZIC0gcG9zLnkgfTtcbiAgICAgICAgICAgIGxldCBkaXN0ID0gTWF0aC5zcXJ0KChkaWZmLnggKiBkaWZmLngpICsgKGRpZmYueSAqIGRpZmYueSkpO1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gbnVsbDtcbiAgICAgICAgICAgIGJsb2IubW91c2VQb3MgPSB7IHg6IHBvcy54IC0gZS5jbGllbnRYLCB5OiBwb3MueSAtIGUuY2xpZW50WSB9O1xuICAgICAgICAgICAgaWYgKGRpc3QgPCBibG9iLnJhZGl1cyAmJiBob3ZlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmVjdG9yID0geyB4OiBlLmNsaWVudFggLSBwb3MueCwgeTogZS5jbGllbnRZIC0gcG9zLnkgfTtcbiAgICAgICAgICAgICAgICBhbmdsZSA9IE1hdGguYXRhbjIodmVjdG9yLnksIHZlY3Rvci54KTtcbiAgICAgICAgICAgICAgICBob3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gYmxvYi5jb2xvciA9ICcjNzdGRjAwJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpc3QgPiBibG9iLnJhZGl1cyAmJiBob3ZlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGxldCB2ZWN0b3IgPSB7IHg6IGUuY2xpZW50WCAtIHBvcy54LCB5OiBlLmNsaWVudFkgLSBwb3MueSB9O1xuICAgICAgICAgICAgICAgIGFuZ2xlID0gTWF0aC5hdGFuMih2ZWN0b3IueSwgdmVjdG9yLngpO1xuICAgICAgICAgICAgICAgIGhvdmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYmxvYi5jb2xvciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFuZ2xlID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5lYXJlc3RQb2ludF8xID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2VGcm9tUG9pbnRfMSA9IDEwMDtcbiAgICAgICAgICAgICAgICBibG9iLnBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhhbmdsZSAtIHBvaW50LmF6aW11dGgpIDwgZGlzdGFuY2VGcm9tUG9pbnRfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocG9pbnQuYXppbXV0aCwgYW5nbGUsIGRpc3RhbmNlRnJvbVBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3RQb2ludF8xID0gcG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZUZyb21Qb2ludF8xID0gTWF0aC5hYnMoYW5nbGUgLSBwb2ludC5hemltdXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChuZWFyZXN0UG9pbnRfMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyZW5ndGhWZWN0b3IgPSBuZXcgUG9pbnQyRChvbGRNb3VzZVBvaW50LnggLSBlLmNsaWVudFgsb2xkTW91c2VQb2ludC55IC0gZS5jbGllbnRZKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0cmVuZ3RoID0gc3RyZW5ndGhWZWN0b3IuZGlzdGFuY2VUbygpICogMTA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJlbmd0aCA+IDEwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVuZ3RoID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICBuZWFyZXN0UG9pbnRfMS5hY2NlbGVyYXRpb24gPSBzdHJlbmd0aCAvIDEwMCAqIChob3ZlciA/IC0xIDogMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2xkTW91c2VQb2ludC54ID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgb2xkTW91c2VQb2ludC55ID0gZS5jbGllbnRZO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKG1vdXNlTW92ZSk7XG4gICAgICAgIGJsb2IuY2FudmFzID0gdGhpcy5jYW52YXM7XG4gICAgICAgIGJsb2IuaW5pdCgpO1xuICAgIH07XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGxldCByZW5kZXJGcmFtZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICBmb3IgKGxldCBzdCBvZiB0aGlzLnN0YXRpY0Fzc2VzdHMpIHtcbiAgICAgICAgICAgICAgICBzdC5yZW5kZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcihsZXQgW2NfSWQsIGNlbGxdIG9mIFNpbU9iamVjdC5zaW1PYmpNYXApe1xuXHQgICAgICAgICAgICAgY2VsbC5yZW5kZXIoKVxuXHRcdCAgICB9XG4gICAgICAgICAgICBTaW1PYmplY3QuY29tcHV0ZURpc3RhbmNlcygpO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlckZyYW1lKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVuZGVyRnJhbWUoKTtcbiAgICB9O1xufVxuXG5sZXQgd29ybGQgPSBuZXcgV29ybGQ7XG5cbmxldCBuUG9pbnRzID0gNTA7XG5mb3IgKGxldCBpID0gMDsgaSA8IG5Qb2ludHM7IGkgKz0gMSkge1xuICAgIGxldCBjZWxsID0gbmV3IFRpbnlDZWxsKHJhbmRvbUludCg1MCkgKyAxMCwgd29ybGQuY2VudGVyLmNsb25lKCkuYWRkUmFuZG9tKDMwMCkpO1xuICAgIGNlbGwuY29sb3VyID0gJ2hzbCgnICsgMzYwICogTWF0aC5yYW5kb20oKSArICcsIDUwJSwgNTAlKSc7XG4gICAgY2VsbC52ZWxvY2l0eSA9IChuZXcgUG9pbnQyRCkuYWRkUmFuZG9tKDIpO1xuICAgIGNlbGwuYWNjZWxlcmF0aW9uID0gMC41O1xuICAgIGNlbGwuY2FudmFzID0gd29ybGQuY2FudmFzO1xufVxuXG5sZXQgYmxvYiA9IG5ldyBCbG9iO1xuYmxvYi5udW1Qb2ludHMgPSAyMDtcbmJsb2IucmFkaXVzID0gMzAwO1xud29ybGQuYWRkQmxvYihibG9iKTtcbndvcmxkLnJlbmRlcigpO1xuIiwiaW1wb3J0IFBvaW50IGZyb20gXCIuL1BvaW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsb2Ige1xuICAgIHBvaW50czogYW55W107XG4gICAgcHJpdmF0ZSBfY29sb3I6IGFueTtcbiAgICBwcml2YXRlIF9jYW52YXM6IGFueTtcbiAgICBjdHg6IGFueTtcbiAgICBwcml2YXRlIF9wb2ludHM6IGFueTtcbiAgICBwcml2YXRlIF9yYWRpdXM6IGFueTtcbiAgICBwcml2YXRlIF9wb3NpdGlvbjogYW55O1xuICAgIHByaXZhdGUgX3J1bm5pbmc6IGJvb2xlYW47XG4gICAgbW91c2VQb3M6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IH07XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wb2ludHMgPSBbXTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtUG9pbnRzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwb2ludCA9IG5ldyBQb2ludCh0aGlzLmRpdmlzaW9uYWwgKiAoaSArIDEpLCB0aGlzKTtcbiAgICAgICAgICAgIC8vIHBvaW50LmFjY2VsZXJhdGlvbiA9IC0xICsgTWF0aC5yYW5kb20oKSAqIDI7XG4gICAgICAgICAgICB0aGlzLnB1c2gocG9pbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5jYW52YXM7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eDtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcbiAgICAgICAgbGV0IHBvaW50c0FycmF5ID0gdGhpcy5wb2ludHM7XG4gICAgICAgIGxldCByYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgICAgbGV0IHBvaW50cyA9IHRoaXMubnVtUG9pbnRzO1xuICAgICAgICBsZXQgZGl2aXNpb25hbCA9IHRoaXMuZGl2aXNpb25hbDtcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMuY2VudGVyO1xuXG4gICAgICAgIHBvaW50c0FycmF5WzBdLnNvbHZlV2l0aChwb2ludHNBcnJheVtwb2ludHMgLSAxXSwgcG9pbnRzQXJyYXlbMV0pO1xuXG4gICAgICAgIGxldCBwMCA9IHBvaW50c0FycmF5W3BvaW50cyAtIDFdLnBvc2l0aW9uO1xuICAgICAgICBsZXQgcDEgPSBwb2ludHNBcnJheVswXS5wb3NpdGlvbjtcbiAgICAgICAgbGV0IF9wMiA9IHAxO1xuXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhjZW50ZXIueCwgY2VudGVyLnkpO1xuICAgICAgICBjdHgubW92ZVRvKChwMC54ICsgcDEueCkgLyAyLCAocDAueSArIHAxLnkpIC8gMik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludHM7IGkrKykge1xuXG4gICAgICAgICAgICBwb2ludHNBcnJheVtpXS5zb2x2ZVdpdGgocG9pbnRzQXJyYXlbaSAtIDFdLCBwb2ludHNBcnJheVtpICsgMV0gfHwgcG9pbnRzQXJyYXlbMF0pO1xuXG4gICAgICAgICAgICBsZXQgcDIgPSBwb2ludHNBcnJheVtpXS5wb3NpdGlvbjtcbiAgICAgICAgICAgIHZhciB4YyA9IChwMS54ICsgcDIueCkgLyAyO1xuICAgICAgICAgICAgdmFyIHljID0gKHAxLnkgKyBwMi55KSAvIDI7XG4gICAgICAgICAgICBjdHgucXVhZHJhdGljQ3VydmVUbyhwMS54LCBwMS55LCB4YywgeWMpO1xuICAgICAgICAgICAgLy8gY3R4LmxpbmVUbyhwMi54LCBwMi55KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwMDAwJztcbiAgICAgICAgICAgIC8vIGN0eC5maWxsUmVjdChwMS54LTIuNSwgcDEueS0yLjUsIDUsIDUpO1xuXG4gICAgICAgICAgICBwMSA9IHAyO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHhjID0gKHAxLnggKyBfcDIueCkgLyAyO1xuICAgICAgICB2YXIgeWMgPSAocDEueSArIF9wMi55KSAvIDI7XG4gICAgICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHAxLngsIHAxLnksIHhjLCB5Yyk7XG4gICAgICAgIC8vIGN0eC5saW5lVG8oX3AyLngsIF9wMi55KTtcblxuICAgICAgICAvLyBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgfVxuXG4gICAgcHVzaChpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgUG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgY29sb3IodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGNvbG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3IgfHwgJyMwMDAwMDAnO1xuICAgIH1cblxuICAgIHNldCBjYW52YXModmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgdmFsdWUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnY2FudmFzJykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmN0eCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBjYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gICAgfVxuXG4gICAgc2V0IG51bVBvaW50cyh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPiAyKSB7XG4gICAgICAgICAgICB0aGlzLl9wb2ludHMgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgbnVtUG9pbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzIHx8IDE2O1xuICAgIH1cblxuICAgIHNldCByYWRpdXModmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHJhZGl1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1cyB8fCAxMDA7XG4gICAgfVxuXG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcgJiYgdmFsdWUueCAmJiB2YWx1ZS55KSB7XG4gICAgICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBwb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uIHx8IHsgeDogMC41LCB5OiAwLjUgfTtcbiAgICB9XG5cbiAgICBnZXQgZGl2aXNpb25hbCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguUEkgKiAyIC8gdGhpcy5udW1Qb2ludHM7XG4gICAgfVxuXG4gICAgZ2V0IGNlbnRlcigpIHtcbiAgICAgICAgcmV0dXJuIHsgeDogdGhpcy5jYW52YXMud2lkdGggKiB0aGlzLnBvc2l0aW9uLngsIHk6IHRoaXMuY2FudmFzLmhlaWdodCAqIHRoaXMucG9zaXRpb24ueSB9O1xuICAgIH1cblxuICAgIHNldCBydW5uaW5nKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3J1bm5pbmcgPSB2YWx1ZSA9PT0gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0IHJ1bm5pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bm5pbmcgIT09IGZhbHNlO1xuICAgIH1cbn1cbiIsIiBleHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludCB7XG4gIHBhcmVudDogYW55O1xuICAgIGF6aW11dGg6IG51bWJlcjtcbiAgICBfY29tcG9uZW50czogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgfTtcbiAgICBfYWNjZWxlcmF0aW9uOiBudW1iZXI7XG4gICAgX3NwZWVkOiBudW1iZXI7XG4gICAgX3JhZGlhbEVmZmVjdDogbnVtYmVyO1xuICAgIF9lbGFzdGljaXR5OiBudW1iZXI7XG4gICAgX2ZyaWN0aW9uOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoYXppbXV0aCwgcGFyZW50KSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5hemltdXRoID0gTWF0aC5QSSAtIGF6aW11dGg7XG4gICAgdGhpcy5fY29tcG9uZW50cyA9IHtcbiAgICAgIHg6IE1hdGguY29zKHRoaXMuYXppbXV0aCksXG4gICAgICB5OiBNYXRoLnNpbih0aGlzLmF6aW11dGgpXG4gICAgfTtcblxuICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gLTAuMyArIE1hdGgucmFuZG9tKCkgKiAxO1xuICB9XG5cbiAgc29sdmVXaXRoKGxlZnRQb2ludCwgcmlnaHRQb2ludCkge1xuICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gKC0wLjMgKiB0aGlzLnJhZGlhbEVmZmVjdCArICggbGVmdFBvaW50LnJhZGlhbEVmZmVjdCAtIHRoaXMucmFkaWFsRWZmZWN0ICkgKyAoIHJpZ2h0UG9pbnQucmFkaWFsRWZmZWN0IC0gdGhpcy5yYWRpYWxFZmZlY3QgKSkgKiB0aGlzLmVsYXN0aWNpdHkgLSB0aGlzLnNwZWVkICogdGhpcy5mcmljdGlvbjtcbiAgfVxuXG4gIHNldCBhY2NlbGVyYXRpb24odmFsdWUpIHtcbiAgICBpZih0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX2FjY2VsZXJhdGlvbiA9IHZhbHVlO1xuICAgICAgdGhpcy5zcGVlZCArPSB0aGlzLl9hY2NlbGVyYXRpb24gKiAyO1xuICAgIH1cbiAgfVxuICBnZXQgYWNjZWxlcmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9hY2NlbGVyYXRpb24gfHwgMDtcbiAgfVxuXG4gIHNldCBzcGVlZCh2YWx1ZSkge1xuICAgIGlmKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fc3BlZWQgPSB2YWx1ZTtcbiAgICAgIHRoaXMucmFkaWFsRWZmZWN0ICs9IHRoaXMuX3NwZWVkICogNTtcbiAgICB9XG4gIH1cbiAgZ2V0IHNwZWVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zcGVlZCB8fCAwO1xuICB9XG5cbiAgc2V0IHJhZGlhbEVmZmVjdCh2YWx1ZSkge1xuICAgIGlmKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fcmFkaWFsRWZmZWN0ID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIGdldCByYWRpYWxFZmZlY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JhZGlhbEVmZmVjdCB8fCAwO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLnBhcmVudC5jZW50ZXIueCArIHRoaXMuY29tcG9uZW50cy54ICogKHRoaXMucGFyZW50LnJhZGl1cyArIHRoaXMucmFkaWFsRWZmZWN0KSxcbiAgICAgIHk6IHRoaXMucGFyZW50LmNlbnRlci55ICsgdGhpcy5jb21wb25lbnRzLnkgKiAodGhpcy5wYXJlbnQucmFkaXVzICsgdGhpcy5yYWRpYWxFZmZlY3QpXG4gICAgfVxuICB9XG5cbiAgZ2V0IGNvbXBvbmVudHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHM7XG4gIH1cblxuICBzZXQgZWxhc3RpY2l0eSh2YWx1ZSkge1xuICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX2VsYXN0aWNpdHkgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgZ2V0IGVsYXN0aWNpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsYXN0aWNpdHkgfHwgMC4wMDE7XG4gIH1cbiAgc2V0IGZyaWN0aW9uKHZhbHVlKSB7XG4gICAgaWYodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fZnJpY3Rpb24gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgZ2V0IGZyaWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9mcmljdGlvbiB8fCAwLjAxO1xuICB9XG59XG4iLCIvKipcbiAqIERlZmluZXMgYSAyRCBwb3NpdGlvbi5cbiAqL1xuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50MkQge1xuICAgIF9kaXJlY3Rpb246IFVuaXQ7XG4gICAgX21hZ25pdHVkZTogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB4OiBudW1iZXI7XG4gICAgY29uc3RydWN0b3IoeCA9MCAsIHkgPSAwICkge1xuICAgIFx0dGhpcy54ID0geDtcbiAgICBcdHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuX21hZ25pdHVkZSA9IE1hdGguc3FydCh0aGlzLngqdGhpcy54ICsgdGhpcy55KnRoaXMueSk7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IG5ldyBVbml0KHgseSk7XG4gICAgfTtcblxuICAgIGdldCBtYWduaXR1ZGUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hZ25pdHVkZTtcbiAgICB9XG5cbiAgICBzZXQgbWFnbml0dWRlKG0pe1xuICAgICAgICB0aGlzLnNjYWxlKG0vdGhpcy5tYWduaXR1ZGUpXG4gICAgfVxuXG4gICAgZ2V0IGRpcmVjdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICAgIH1cbiAgICBzZXQgZGlyZWN0aW9uKGQpe1xuICAgICAgICBpZihkIGluc3RhbmNlb2YgVW5pdCl7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlTWFnbml0dWRlKCl7XG4gICAgICAgIHRoaXMuX21hZ25pdHVkZSA9IE1hdGguc3FydCh0aGlzLngqdGhpcy54ICsgdGhpcy55KnRoaXMueSk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlyZWN0aW9uKCl7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbi51cGRhdGUodGhpcy54LHRoaXMueSlcbiAgICB9XG5cbiAgICBkaXN0YW5jZVRvKCBjPzpQb2ludDJEKSB7XG4gICAgICAgIGlmKGMpe1xuICAgICAgICAgICAgdmFyIGR4ID0gYy54LXRoaXMueDtcbiAgICAgICAgICAgIHZhciBkeSA9IGMueS10aGlzLnk7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4KmR4ICsgZHkqZHkpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54KnRoaXMueCArIHRoaXMueSp0aGlzLnkpO1xuICAgIH07XG5cbiAgICBjbG9uZSgpIHtcbiAgICBcdHJldHVybiBuZXcgUG9pbnQyRCh0aGlzLngsIHRoaXMueSk7XG4gICAgfTtcblxuICAgIGludGVycG9sYXRlKCB4Om51bWJlciwgeTpudW1iZXIsIGFtcDpudW1iZXIgKSB7XG4gICAgXHR0aGlzLnggKz0gKCB4IC0gdGhpcy54ICkgKiBhbXA7XG4gICAgXHR0aGlzLnkgKz0gKCB5IC0gdGhpcy55ICkgKiBhbXA7XG4gICAgICAgIHRoaXMudXBkYXRlTWFnbml0dWRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBhZGRSYW5kb20oYW1wOm51bWJlcil7XG4gICAgICAgIHRoaXMueCArPSBhbXAgKiAoLTEgKyAyKk1hdGgucmFuZG9tKCkpO1xuICAgICAgICB0aGlzLnkgKz0gYW1wICogKC0xICsgMipNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYWduaXR1ZGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXJlY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIGFkZChwb2ludDpQb2ludDJEKXtcbiAgICAgICAgdGhpcy54ICs9IHBvaW50Lng7XG4gICAgICAgIHRoaXMueSArPSBwb2ludC55O1xuICAgICAgICB0aGlzLnVwZGF0ZU1hZ25pdHVkZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpcmVjdGlvbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgcmV2ZXJzZSgpe1xuICAgICAgICB0aGlzLnggPSAtdGhpcy54O1xuICAgICAgICB0aGlzLnkgPSAtIHRoaXMueTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXJlY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV2ZXJzZVkoKXtcbiAgICAgICAgdGhpcy55ID0gLSB0aGlzLnk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldmVyc2VYKCl7XG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNjYWxlKGFtcCl7XG4gICAgICAgIHRoaXMueCAqPSBhbXA7XG4gICAgICAgIHRoaXMueSAqPSBhbXA7XG4gICAgICAgIHRoaXMuX21hZ25pdHVkZSAqPSBhbXA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFkZFJhbmRvbURpcmVjdGlvbihhbXApe1xuICAgICAgICBsZXQgbWFnID0gdGhpcy5tYWduaXR1ZGU7XG4gICAgICAgIHRoaXMuYWRkUmFuZG9tKGFtcCk7XG4gICAgICAgIHRoaXMubWFnbml0dWRlID0gbWFnO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB1cGRhdGVDb29yZGluYXRlcyh4LCB5KXtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYWduaXR1ZGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHVwZGF0ZVBvaW50KCBjICl7XG4gICAgICAgIGlmIChjIGluc3RhbmNlb2YgUG9pbnQyRCl7XG4gICAgICAgICAgICB0aGlzLnggPSBjLng7XG4gICAgICAgICAgICB0aGlzLnkgPSBjLnk7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGMuZGlyZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5tYWduaXR1ZGUgPSBjLm1hZ25pdHVkZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcm91bmQoZjogKGFyZzA6IG51bWJlcikgPT4gbnVtYmVyKXtcbiAgICAgICAgdGhpcy54ID0gZih0aGlzLngpO1xuICAgICAgICB0aGlzLnkgPSBmKHRoaXMueSk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFnbml0dWRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuY2xhc3MgVW5pdCB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcil7XG4gICAgICAgIHRoaXMudXBkYXRlKHgseSlcbiAgICB9XG4gICAgdXBkYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKXtcbiAgICAgICAgbGV0IGZhY3RvciA9IE1hdGguc3FydCh4KnggKyB5KnkpXG4gICAgICAgIHRoaXMueCA9IHgvZmFjdG9yO1xuICAgICAgICB0aGlzLnkgPSB5L2ZhY3RvcjtcbiAgICB9XG4gICAgZnJvbShjKXtcbiAgICAgICAgdGhpcy51cGRhdGUoYy54LCBjLnkpXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBQb2ludDJEIGZyb20gXCIuL1BvaW50MkRcIjtcblxuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbU9iamVjdCB7XG4gICAgc3RhdGljIHNpbU9iaklkTWF4ID0gMDtcbiAgICBzdGF0aWMgc2ltT2JqTWFwID0gbmV3IE1hcCgpO1xuICAgIHN0YXRpYyBkaXN0YW5jZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBzaXplOiBudW1iZXI7XG4gICAgcG9zaXRpb246IFBvaW50MkQ7XG4gICAgYm91bmRpbmdSYWRpdXM6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgc2ltT2JqSWQ6IG51bWJlcjtcbiAgICBpc0NvbGxpZGluZzogYm9vbGVhbjtcbiAgICBwcm90ZWN0ZWQgX2NhbnZhcyE6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGN0eDogYW55O1xuXG4gICAgY29uc3RydWN0b3Ioc2l6ZTpudW1iZXIsIHBvc2l0aW9uOlBvaW50MkQsIGJvdW5kaW5nUmFkaXVzPzpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICBpZihib3VuZGluZ1JhZGl1cyl7XG4gICAgICAgICAgICB0aGlzLmJvdW5kaW5nUmFkaXVzID0gYm91bmRpbmdSYWRpdXM7XG4gICAgICAgIH0gZWxzZSB0aGlzLmJvdW5kaW5nUmFkaXVzID0gc2l6ZTtcbiAgICAgICAgdGhpcy5zaW1PYmpJZCA9IFNpbU9iamVjdC5yZWdpc3Rlcih0aGlzKTtcbiAgICAgICAgdGhpcy5pc0NvbGxpZGluZyA9IGZhbHNlO1xuICAgIH07XG5cblxuICAgIHN0YXRpYyByZWdpc3RlcihjOlNpbU9iamVjdCl7XG4gICAgICAgIHRoaXMuc2ltT2JqTWFwLnNldCh0aGlzLnNpbU9iaklkTWF4LCBjKTtcbiAgICAgICAgdGhpcy5zaW1PYmpJZE1heCArPSAxO1xuICAgICAgICByZXR1cm4gdGhpcy5zaW1PYmpJZE1heCAtIDE7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbXB1dGVEaXN0YW5jZXMoKXtcbiAgICAgICAgLy8gdGhpcyBjb21wdXB0YXRpb24gb2NjdXJzIGFmdGVyIGV2ZXJ5IHVwZGF0ZSBiZWZvcmUgcGFpbnRpbmcgdGhlIHNjcmVlblxuXG4gICAgICAgIGxldCBzaW1PYmpJZHMgPSBbLi4udGhpcy5zaW1PYmpNYXAua2V5cygpXTtcblxuICAgICAgICAvLyB0cmFjayB0aGUgaWRzIG9mIHRoZSBzaW1PYmpzIHdoaWNoIGFyZSBpbiBhIGNvbGxpZGluZyBzdGF0ZSBmb3IgdGhpcyB1cGRhdGVcbiAgICAgICAgbGV0IGNvbGxpc2lvbnMgPSBuZXcgU2V0KCk7XG5cbiAgICAgICAgLy8gQSBhbmQgQiByZXByZXNlbnQgYSBwYWlyIG9mIFNpbU9iamVjdHNcbiAgICAgICAgLy8gQS5zaW1PYmpJZCA9PSBzaW1PYmpJZHNbc2ltT2JqX2ldXG4gICAgICAgIGZvciAobGV0IHNpbU9ial9pID0gMDsgc2ltT2JqX2kgPCBzaW1PYmpJZHMubGVuZ3RoOyBzaW1PYmpfaSArPSAxKXtcblxuICAgICAgICAgICAgbGV0IGEgPSB0aGlzLnNpbU9iak1hcC5nZXQoc2ltT2JqSWRzW3NpbU9ial9pXSk7XG5cbiAgICAgICAgICAgIC8vIGlmIEEgaGFzIGFscmVhZHkgY29sbGlkZWQgd2l0aCBzb21ldGhpbmcgaW4gdGhpcyBmcmFtZSwgZG9uJ3RcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciBhbnkgb3RoZXIgY29sbGlzaW9uc1xuICAgICAgICAgICAgaWYgKGNvbGxpc2lvbnMuaGFzKGEuc2ltT2JqSWQpKXtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlc1RvQTpNYXA8bnVtYmVyLG51bWJlcj47XG4gICAgICAgICAgICBpZih0aGlzLmRpc3RhbmNlTWFwLmhhcyhzaW1PYmpfaSkpXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VzVG9BID0gdGhpcy5kaXN0YW5jZU1hcC5nZXQoc2ltT2JqX2kpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VzVG9BID0gbmV3IE1hcCgpXG5cbiAgICAgICAgICAgIC8vIGlmIEEgaXNuJ3QgYWxyZWFkeSBpbiBhIGNvbGxpZGVkIHN0YXRlLFxuICAgICAgICAgICAgLy8gY2hlY2sgd2l0aCBldmVyeSBvdGhlciBzaW1PYmogW0JdXG4gICAgICAgICAgICBmb3IgKGxldCBzaW1PYmpfaiA9IHNpbU9ial9pICsgMTsgc2ltT2JqX2ogPCBzaW1PYmpJZHMubGVuZ3RoOyBzaW1PYmpfaiArPSAxKXtcbiAgICAgICAgICAgICAgICBsZXQgYiA9IHRoaXMuc2ltT2JqTWFwLmdldChzaW1PYmpJZHNbc2ltT2JqX2pdKTtcbiAgICAgICAgICAgICAgICBsZXQgZGlzdCA9IChhLnBvc2l0aW9uKS5kaXN0YW5jZVRvKGIucG9zaXRpb24pO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgZGlzdGFuY2UgaXMgbGVzcyB0aGFuIHNpemUgKyB0aHJlc2hvbGQgZXh0cmEgbWFyZ2luXG4gICAgICAgICAgICAgICAgaWYoZGlzdCA8PSBhLmJvdW5kaW5nUmFkaXVzICsgYi5ib3VuZGluZ1JhZGl1cyl7XG4gICAgICAgICAgICAgICAgICAgIGEub25Db2xsaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGIub25Db2xsaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMuYWRkKGEuc2ltT2JqSWQpO1xuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zLmFkZChiLnNpbU9iaklkKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2luY2UgQSBoYXMgY29sbGlkZWQgd2l0aCBCLCB3ZSBkb24ndCBjYXJlIHdoYXQgZWxzZSBpdCdzXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxpZGluZyB3aXRoIGluIHRoaXMgdXBkYXRlXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlc1RvQS5zZXQoc2ltT2JqX2osIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGlmIEEgYW5kIEIgaGF2ZW4ndCBjb2xsaWRlZCB0aGVuIHRoZXkgaGF2ZSBzb21lIGRpc3RhbmNlID4gMFxuICAgICAgICAgICAgICAgIGlmKHNpbU9ial9pID09PSB1bmRlZmluZWQgfHwgIHNpbU9ial9qID09PSB1bmRlZmluZWQgfHwgIGRpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kaXN0YW5jZU1hcCwgc2ltT2JqX2ksIHNpbU9ial9qLCBkaXN0KVxuICAgICAgICAgICAgICAgIGRpc3RhbmNlc1RvQS5zZXQoc2ltT2JqX2osIGRpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgbm8gY29sbGlzaW9uIGhhcyBvY2N1cnJlZCBiZXR3ZWVuIEEgYW5kIGFsbCBvdGhlciBwb3NzaWJsZSBzaW1PYmpzLFxuICAgICAgICAgICAgLy8gaXQgbWVhbnMgaXQgaGFzIG5vdCBjb2xsaWRlZCBpbiB0aGlzIHVwZGF0ZTtcbiAgICAgICAgICAgIGlmICghY29sbGlzaW9ucy5oYXMoYS5zaW1PYmpJZCkpe1xuICAgICAgICAgICAgICAgIGEub2ZmQ29sbGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRpc3RhbmNlTWFwLnNldChzaW1PYmpfaSwgZGlzdGFuY2VzVG9BKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29sbGlkZSgpe1xuICAgICAgICB0aGlzLmlzQ29sbGlkaW5nID0gdHJ1ZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zaW1PYmpJZCwgXCIgaXMgQ29sbGlkaW5nIVwiKVxuICAgIH1cblxuICAgIG9mZkNvbGxpZGUoKXtcbiAgICAgICAgdGhpcy5pc0NvbGxpZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNldCBjYW52YXModmFsdWUpIHtcbiAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiB2YWx1ZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdjYW52YXMnKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xuICAgIH1cbn1cbiIsImltcG9ydCBTaW1PYmplY3QgZnJvbSBcIi4vU2ltT2JqZWN0XCI7XG5pbXBvcnQgUG9pbnQyRCBmcm9tIFwiLi9Qb2ludDJEXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbnlDZWxsIGV4dGVuZHMgU2ltT2JqZWN0e1xuICAgIGNvbG91cjogYW55O1xuICAgIGFjY2VsZXJhdGlvbjogYW55O1xuICAgIHByaXZhdGUgX3ZlbG9jaXR5OiBhbnk7XG4gICAgc3BlZWQ6IGFueTtcbiAgICBjaG9pY2U6IHN0cmluZztcbiAgICBjb25zdHJ1Y3RvcihzaXplOiBudW1iZXIsIHBvc2l0aW9uOiBQb2ludDJEKSB7XG4gICAgICAgIHN1cGVyKHNpemUsIHBvc2l0aW9uKVxuICAgICAgICBsZXQgdHh0ID0gW1wiQk9PTSFcIiwgXCJQT1chXCIsIFwiQkFORyFcIiwgXCJBQUFBUkdISCFcIiwgXCJZQVkhXCIsIFwiWk9JTkshXCJdXG4gICAgICAgIHRoaXMuY2hvaWNlID0gdHh0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHR4dC5sZW5ndGgpXTtcbiAgICB9O1xuXG4gICAgc2V0IHZlbG9jaXR5KHYpe1xuICAgICAgICB0aGlzLl92ZWxvY2l0eSA9IHY7XG4gICAgICAgIHRoaXMuc3BlZWQgPSB2Lm1hZ25pdHVkZTtcbiAgICB9XG5cbiAgICBnZXQgdmVsb2NpdHkoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlbG9jaXR5O1xuICAgIH1cblxuICAgIHdhbmRlcigpe1xuICAgICAgICBsZXQgY2hhbmdlID0gbmV3IFBvaW50MkQodGhpcy52ZWxvY2l0eS54LCB0aGlzLnZlbG9jaXR5LnkpXG4gICAgICAgIHRoaXMuZGV0ZWN0Qm91bmNlKGNoYW5nZSlcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5pbnRlcnBvbGF0ZSh0aGlzLnBvc2l0aW9uLnggKyBjaGFuZ2UueCwgdGhpcy5wb3NpdGlvbi55ICsgY2hhbmdlLnksIDEpO1xuICAgICAgICB0aGlzLnZlbG9jaXR5LmFkZFJhbmRvbURpcmVjdGlvbih0aGlzLmFjY2VsZXJhdGlvbik7XG4gICAgfVxuXG4gICAgb25Db2xsaWRlKCl7XG4gICAgICAgIGlmKCF0aGlzLmlzQ29sbGlkaW5nKXsgICAgIC8vIG1ha2Ugc3VyZSBjZWxsIHdhc24ndCBhbHJlYWR5IGluIGEgY29sbGlkaW5nIHN0YXRlIHByZXZvdXNseVxuICAgICAgICAgICAgdGhpcy5fdmVsb2NpdHkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgdGhpcy5pc0NvbGxpZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl92ZWxvY2l0eS5zY2FsZSgzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9mZkNvbGxpZGUoKXtcbiAgICAgICAgaWYodGhpcy5pc0NvbGxpZGluZyl7ICAgICAgICAvLyBtYWtlIHN1cmUgaXQgd2Fzbid0IGNvbGxpZGluZyBiZWZvcmVcbiAgICAgICAgICAgIHRoaXMuX3ZlbG9jaXR5LnNjYWxlKDEvMyk7XG4gICAgICAgICAgICB0aGlzLmlzQ29sbGlkaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXRlY3RCb3VuY2UoY2hhbmdlOiBQb2ludDJEKXtcbiAgICAgICAgbGV0IHggPSB0aGlzLnBvc2l0aW9uLng7XG4gICAgICAgIGxldCB5ID0gdGhpcy5wb3NpdGlvbi55O1xuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5jYW52YXM7XG5cbiAgICAgICAgaWYoeCArIGNoYW5nZS54ID4gY2FudmFzLndpZHRoLXRoaXMuc2l6ZSB8fCB4ICsgY2hhbmdlLnggPCB0aGlzLnNpemUpIHtcbiAgICAgICAgICAgIGNoYW5nZS54ID0gLWNoYW5nZS54O1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS5yZXZlcnNlWCgpXG4gICAgICAgIH1cbiAgICAgICAgaWYoeSArIGNoYW5nZS55ID4gY2FudmFzLmhlaWdodC10aGlzLnNpemUgfHwgeSArIGNoYW5nZS55IDwgdGhpcy5zaXplKSB7XG4gICAgICAgICAgICBjaGFuZ2UueSA9IC1jaGFuZ2UueTtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkucmV2ZXJzZVkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4O1xuXG4gICAgICAgIC8vIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy53YW5kZXIoKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnNpemUsIDAsIE1hdGguUEkqMik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG91cjtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgIGlmKHRoaXMuaXNDb2xsaWRpbmcpe1xuICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjI1cHggTW9ub3NwYWNlXCI7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjQUFBQUFBXCI7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmNob2ljZSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCIvKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21JbnQobWF4KSB7XG4gIFx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4KSk7XG59XG5cbnZhciBDYXBhYmlsaXRpZXMgPSB7XG5cdGlzT25saW5lOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gbmF2aWdhdG9yLm9uTGluZTtcblx0fSxcblxuXHRpc1RvdWNoRGV2aWNlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCggLyhpcGhvbmV8aXBhZHxpcG9kfGFuZHJvaWQpL2dpICk7XG5cdH0sXG5cblx0c3Vwb3J0c0xvY2FsU3RvcmFnZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICgnbG9jYWxTdG9yYWdlJyBpbiB3aW5kb3cpICYmIHdpbmRvd1snbG9jYWxTdG9yYWdlJ10gIT09IG51bGw7XG5cdH1cbn07XG5cbi8qKlxuICogRGVmaW5lcyBvZiBhIHJlY3Rhbmd1bGFyIHJlZ2lvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZ2lvbntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHR0aGlzLmxlZnQgPSA5OTk5OTk7XG5cdHRoaXMudG9wID0gOTk5OTk5O1xuXHR0aGlzLnJpZ2h0ID0gMDtcblx0dGhpcy5ib3R0b20gPSAwO1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgIFx0dGhpcy5sZWZ0ID0gOTk5OTk5O1xuICAgIFx0dGhpcy50b3AgPSA5OTk5OTk7XG4gICAgXHR0aGlzLnJpZ2h0ID0gMDtcbiAgICBcdHRoaXMuYm90dG9tID0gMDtcbiAgICB9XG5cbiAgICBpbmZsYXRlKCB4LCB5ICkge1xuICAgIFx0dGhpcy5sZWZ0ID0gTWF0aC5taW4odGhpcy5sZWZ0LCB4KTtcbiAgICBcdHRoaXMudG9wID0gTWF0aC5taW4odGhpcy50b3AsIHkpO1xuICAgIFx0dGhpcy5yaWdodCA9IE1hdGgubWF4KHRoaXMucmlnaHQsIHgpO1xuICAgIFx0dGhpcy5ib3R0b20gPSBNYXRoLm1heCh0aGlzLmJvdHRvbSwgeSk7XG4gICAgfVxuXG4gICAgZXhwYW5kKCB4LCB5ICkge1xuICAgIFx0dGhpcy5sZWZ0IC09IHg7XG4gICAgXHR0aGlzLnRvcCAtPSB5O1xuICAgIFx0dGhpcy5yaWdodCArPSB4O1xuICAgIFx0dGhpcy5ib3R0b20gKz0geTtcbiAgICB9O1xuXG4gICAgY29udGFpbnMoIHgsIHkgKSB7XG4gICAgXHRyZXR1cm4geCA+IHRoaXMubGVmdCAmJiB4IDwgdGhpcy5yaWdodCAmJiB5ID4gdGhpcy50b3AgJiYgeSA8IHRoaXMuYm90dG9tO1xuICAgIH07XG5cbiAgICBzaXplKCkge1xuICAgIFx0cmV0dXJuICggKCB0aGlzLnJpZ2h0IC0gdGhpcy5sZWZ0ICkgKyAoIHRoaXMuYm90dG9tIC0gdGhpcy50b3AgKSApIC8gMjtcbiAgICB9O1xuXG4gICAgY2VudGVyKCkge1xuICAgIFx0cmV0dXJuIG5ldyBQb2ludCggdGhpcy5sZWZ0ICsgKHRoaXMucmlnaHQgLSB0aGlzLmxlZnQpIC8gMiwgdGhpcy50b3AgKyAodGhpcy5ib3R0b20gLSB0aGlzLnRvcCkgLyAyICk7XG4gICAgfTtcblxuICAgIHRvUmVjdGFuZ2xlKCkge1xuICAgIFx0cmV0dXJuIHsgeDogdGhpcy5sZWZ0LCB5OiB0aGlzLnRvcCwgd2lkdGg6IHRoaXMucmlnaHQgLSB0aGlzLmxlZnQsIGhlaWdodDogdGhpcy5ib3R0b20gLSB0aGlzLnRvcCB9O1xuICAgIH07XG59XG5cblxuXG4vLyAvLyBzaGltIGxheWVyIHdpdGggc2V0VGltZW91dCBmYWxsYmFjayBmcm9tIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4vLyBleHBvcnQgY29uc3QgcmVxdWVzdEFuaW1GcmFtZSA9IGZ1bmN0aW9uKHdpbmRvdyl7XG4vLyAgIHJldHVybiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuLy8gICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbi8vICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4vLyAgICAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuLy8gICAgICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcbi8vICAgICAgICAgICBmdW5jdGlvbigvKiBmdW5jdGlvbiAqLyBjYWxsYmFjaywgLyogRE9NRWxlbWVudCAqLyBlbGVtZW50KXtcbi8vICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuLy8gICAgICAgICAgIH07XG4vLyB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==