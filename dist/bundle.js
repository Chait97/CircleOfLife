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
        this.dimension = new _models_Point2D__WEBPACK_IMPORTED_MODULE_0__["default"];
        this.center = new _models_Point2D__WEBPACK_IMPORTED_MODULE_0__["default"];
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
let nPoints = 100;
for (let i = 0; i < nPoints; i += 1) {
    let cell = new _models_TinyCell__WEBPACK_IMPORTED_MODULE_3__["default"](Object(_utils__WEBPACK_IMPORTED_MODULE_4__["randomInt"])(30) + 10, world.center.clone().addRandom(200));
    cell.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    cell.velocity = (new _models_Point2D__WEBPACK_IMPORTED_MODULE_0__["default"]).addRandom(10);
    cell.acceleration = 1;
    cell.canvas = world.canvas;
}
let blob = new _models_Blob__WEBPACK_IMPORTED_MODULE_2__["default"];
blob.numPoints = 20;
blob.radius = 500;
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
                        this.distanceMap.set([simObj_i, simObj_j], -1);
                        // since A has collided with B, we don't care what else it's
                        // colliding with in this update
                        break;
                    }
                    // if A and B haven't collided then they have some distance > 0
                    if (simObj_i === undefined || simObj_j === undefined || dist === undefined)
                        console.log(this.distanceMap, simObj_i, simObj_j, dist);
                    this.distanceMap.set([simObj_i, simObj_j], dist);
                }
                // if no collision has occurred between A and all other possible simObjs,
                // it means it has not collided in this update;
                if (!collisions.has(a.simObjId)) {
                    a.offCollide();
                }
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
        ctx.fillStyle = this.isColliding ? '#aa6060' : this.colour;
        ctx.fill();
        ctx.closePath();
        ctx.font = "30px Monospace";
        ctx.fillStyle = "#AAAAAA";
        ctx.textAlign = "center";
        ctx.fillText(this.simObjId, this.position.x, this.position.y);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL21vZGVscy9CbG9iLnRzIiwid2VicGFjazovLy8uL21vZGVscy9Qb2ludC50cyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvUG9pbnQyRC50cyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvU2ltT2JqZWN0LnRzIiwid2VicGFjazovLy8uL21vZGVscy9UaW55Q2VsbC50cyIsIndlYnBhY2s6Ly8vLi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1QztBQUNJO0FBQ1Y7QUFDakMsMkJBQTJCO0FBQ2M7QUFDTDtBQUVwQzs7R0FFRztBQUVILE1BQU0sS0FBSztJQUtQO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHVEQUFPLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHVEQUFPLENBQUM7UUFDMUIsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsU0FBcUU7UUFDbkYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUFBLENBQUM7SUFDRixjQUFjO1FBQ1YsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDMUIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUQsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUFBLENBQUM7SUFDRixPQUFPLENBQUMsSUFBVTtRQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDbkMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLElBQUksU0FBUyxHQUFHLFVBQVMsQ0FBQztZQUN0QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3RCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDMUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQy9ELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxLQUFLLEtBQUssRUFBRTtnQkFDdkMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDNUQsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2IsMEJBQTBCO2FBQzdCO2lCQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDM0MsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDNUQsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDckI7WUFDRCxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFBRTtnQkFDMUIsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLO29CQUM5QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxtQkFBbUIsRUFBRTt3QkFDdkQsd0RBQXdEO3dCQUN4RCxjQUFjLEdBQUcsS0FBSyxDQUFDO3dCQUN2QixtQkFBbUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ3pEO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksY0FBYyxFQUFFO29CQUNoQixJQUFJLGNBQWMsR0FBRyxJQUFJLHVEQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMxRixJQUFJLFFBQVEsR0FBRyxjQUFjLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDO29CQUNoRCxJQUFJLFFBQVEsR0FBRyxHQUFHO3dCQUNkLFFBQVEsR0FBRyxHQUFHLENBQUM7b0JBQ25CLGNBQWMsQ0FBQyxZQUFZLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNuRTthQUNKO1lBQ0QsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzVCLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBQUEsQ0FBQztJQUVGLE1BQU07UUFDRixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLFdBQVcsR0FBRyxHQUFHLEVBQUU7WUFDbkIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0QsS0FBSyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUMvQixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjtZQUNELEtBQUksSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSx5REFBUyxDQUFDLFNBQVMsRUFBQztnQkFDMUMsSUFBSSxDQUFDLE1BQU0sRUFBRTthQUNwQjtZQUNLLHlEQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM3QixxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUM7UUFDRixXQUFXLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBQUEsQ0FBQztDQUNMO0FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUM7QUFFdEIsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUNqQyxJQUFJLElBQUksR0FBRyxJQUFJLHdEQUFRLENBQUMsd0RBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLGFBQWEsQ0FBQztJQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSx1REFBTyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztDQUM5QjtBQUVELElBQUksSUFBSSxHQUFHLElBQUksb0RBQUksQ0FBQztBQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3pIZjtBQUFBO0FBQUE7QUFBNEI7QUFFYixNQUFNLElBQUk7SUFXckI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSTtRQUNBLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksOENBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZELCtDQUErQztZQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbkIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM1QixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2pDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFekIsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxFLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQzFDLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWpELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFFN0IsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkYsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNqQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6QywwQkFBMEI7WUFFMUIsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDMUIsMENBQTBDO1lBRTFDLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLDRCQUE0QjtRQUU1QixtQkFBbUI7UUFDbkIsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBSTtRQUNMLElBQUksSUFBSSxZQUFZLDhDQUFLLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBSztRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFLO1FBQ1osSUFBSSxLQUFLLFlBQVksV0FBVyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO1lBQzFFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBQ0QsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBQ0QsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsS0FBSztRQUNaLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUNELElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLEtBQUs7UUFDZCxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBQ0QsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvRixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsS0FBSztRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxLQUFLLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQztJQUNsQyxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUN4SUE7QUFBQTtBQUFlLE1BQU0sS0FBSztJQVV6QixZQUFZLE9BQU8sRUFBRSxNQUFNO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNqQixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3pCLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDMUIsQ0FBQztRQUVGLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsU0FBUyxDQUFDLFNBQVMsRUFBRSxVQUFVO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUUsU0FBUyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFFLEdBQUcsQ0FBRSxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25NLENBQUM7SUFFRCxJQUFJLFlBQVksQ0FBQyxLQUFLO1FBQ3BCLElBQUcsT0FBTyxLQUFLLElBQUksUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDO0lBQ0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBSztRQUNiLElBQUcsT0FBTyxLQUFLLElBQUksUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxZQUFZLENBQUMsS0FBSztRQUNwQixJQUFHLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUM1QjtJQUNILENBQUM7SUFDRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPO1lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDdEYsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDdkY7SUFDSCxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFVBQVUsQ0FBQyxLQUFLO1FBQ2xCLElBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUNELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUM7SUFDbkMsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQUs7UUFDaEIsSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBQ0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQztJQUNoQyxDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7QUNqRkQ7QUFBQTtBQUFBOztHQUVHO0FBQ2EsTUFBTSxPQUFPO0lBS3pCLFlBQVksQ0FBQyxHQUFFLENBQUMsRUFBRyxDQUFDLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQUEsQ0FBQztJQUVGLElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxTQUFTLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBSSxTQUFTLENBQUMsQ0FBQztRQUNYLElBQUcsQ0FBQyxZQUFZLElBQUksRUFBQztZQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsVUFBVSxDQUFFLENBQVU7UUFDbEIsSUFBRyxDQUFDLEVBQUM7WUFDRCxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFHLEVBQUUsR0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuQzs7WUFDRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFBQSxDQUFDO0lBRUYsS0FBSztRQUNKLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUFBLENBQUM7SUFFRixXQUFXLENBQUUsQ0FBUSxFQUFFLENBQVEsRUFBRSxHQUFVO1FBQzFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBRSxHQUFHLEdBQUcsQ0FBQztRQUMvQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUUsR0FBRyxHQUFHLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQUEsQ0FBQztJQUVGLFNBQVMsQ0FBQyxHQUFVO1FBQ2hCLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUFBLENBQUM7SUFFRixHQUFHLENBQUMsS0FBYTtRQUNiLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQUEsQ0FBQztJQUVGLE9BQU87UUFDSCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHO1FBQ0wsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDZCxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNkLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxHQUFHO1FBQ2xCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELFdBQVcsQ0FBRSxDQUFDO1FBQ1YsSUFBSSxDQUFDLFlBQVksT0FBTyxFQUFDO1lBQ3JCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7U0FDaEM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsS0FBSyxDQUFDLENBQTJCO1FBQzdCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFFRCxNQUFNLElBQUk7SUFHTixZQUFZLENBQVMsRUFBRSxDQUFTO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0QsTUFBTSxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3ZCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFDLE1BQU0sQ0FBQztRQUNsQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBQyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDcEpBO0FBQUE7SUFBQSxNQUFxQixTQUFTO1FBWTNCLFlBQVksSUFBVyxFQUFFLFFBQWdCLEVBQUUsY0FBc0I7WUFDN0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsSUFBRyxjQUFjLEVBQUM7Z0JBQ2QsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7YUFDeEM7O2dCQUFNLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDO1FBQUEsQ0FBQztRQUdGLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBVztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELE1BQU0sQ0FBQyxnQkFBZ0I7WUFDbkIseUVBQXlFO1lBRXpFLElBQUksU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFFM0MsOEVBQThFO1lBQzlFLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7WUFFM0IseUNBQXlDO1lBQ3pDLG9DQUFvQztZQUNwQyxLQUFLLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLElBQUksQ0FBQyxFQUFDO2dCQUU5RCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFFaEQsZ0VBQWdFO2dCQUNoRSxpQ0FBaUM7Z0JBQ2pDLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUM7b0JBQzNCLFNBQVM7aUJBQ1o7Z0JBRUQsMENBQTBDO2dCQUMxQyxvQ0FBb0M7Z0JBQ3BDLEtBQUssSUFBSSxRQUFRLEdBQUcsUUFBUSxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLElBQUksQ0FBQyxFQUFDO29CQUN6RSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFL0MseURBQXlEO29CQUN6RCxJQUFHLElBQUksSUFBSSxDQUFDLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxjQUFjLEVBQUM7d0JBQzNDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDZCxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ2QsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQzNCLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQyw0REFBNEQ7d0JBQzVELGdDQUFnQzt3QkFDaEMsTUFBTTtxQkFDVDtvQkFDRCwrREFBK0Q7b0JBQy9ELElBQUcsUUFBUSxLQUFLLFNBQVMsSUFBSyxRQUFRLEtBQUssU0FBUyxJQUFLLElBQUksS0FBSyxTQUFTO3dCQUN2RSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxJQUFJLENBQUM7b0JBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQztpQkFDbkQ7Z0JBQ0QseUVBQXlFO2dCQUN6RSwrQ0FBK0M7Z0JBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQztvQkFDNUIsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO2lCQUNsQjthQUNKO1FBQ0wsQ0FBQztRQUVELFNBQVM7WUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QiwrQ0FBK0M7UUFDbkQsQ0FBQztRQUVELFVBQVU7WUFDTixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDO1FBRUQsSUFBSSxNQUFNLENBQUMsS0FBSztZQUNaLElBQUcsS0FBSyxZQUFZLFdBQVcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVEsRUFBRTtnQkFDekUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxNQUFNO1lBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7O0lBaEdNLHFCQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLG1CQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUN0QixxQkFBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUErRm5DLGdCQUFDO0tBQUE7QUFsR3FCLHdFQUFTOzs7Ozs7Ozs7Ozs7O0FDRi9CO0FBQUE7QUFBQTtBQUFBO0FBQW9DO0FBQ0o7QUFFakIsTUFBTSxRQUFTLFNBQVEsa0RBQVM7SUFLM0MsWUFBWSxJQUFZLEVBQUUsUUFBaUI7UUFDdkMsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUFBLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLE1BQU0sR0FBRyxJQUFJLGdEQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxZQUFZLENBQUMsTUFBZTtRQUN4QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXpCLElBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbEUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7U0FDM0I7UUFDRCxJQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ25FLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFbkIsb0RBQW9EO1FBQ3BELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFDLFVBQVMsRUFBQyxLQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZELEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVoQixHQUFHLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDO1FBQzVCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7OztBQzVERDtBQUFBO0FBQUE7QUFBQTs7R0FFRztBQUNJLFNBQVMsU0FBUyxDQUFDLEdBQUc7SUFDMUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQUVELElBQUksWUFBWSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNULE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsYUFBYSxFQUFFO1FBQ2QsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBRSw4QkFBOEIsQ0FBRSxDQUFDO0lBQ3BFLENBQUM7SUFFRCxtQkFBbUIsRUFBRTtRQUNwQixPQUFPLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDdEUsQ0FBQztDQUNELENBQUM7QUFFRjs7R0FFRztBQUNJLE1BQU0sTUFBTTtJQUNmO1FBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxLQUFLO1FBQ0osSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsT0FBTyxDQUFFLENBQUMsRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELE1BQU0sQ0FBRSxDQUFDLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBQUEsQ0FBQztJQUVGLFFBQVEsQ0FBRSxDQUFDLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDM0UsQ0FBQztJQUFBLENBQUM7SUFFRixJQUFJO1FBQ0gsT0FBTyxDQUFFLENBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFFLEdBQUcsQ0FBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQUEsQ0FBQztJQUVGLE1BQU07UUFDTCxPQUFPLElBQUksS0FBSyxDQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDO0lBQ3ZHLENBQUM7SUFBQSxDQUFDO0lBRUYsV0FBVztRQUNWLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyRyxDQUFDO0lBQUEsQ0FBQztDQUNMO0FBSUQsbUhBQW1IO0FBQ25ILG9EQUFvRDtBQUNwRCxrREFBa0Q7QUFDbEQsa0RBQWtEO0FBQ2xELGtEQUFrRDtBQUNsRCxrREFBa0Q7QUFDbEQsa0RBQWtEO0FBQ2xELHlFQUF5RTtBQUN6RSxzREFBc0Q7QUFDdEQsZUFBZTtBQUNmLEtBQUsiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hcHAudHNcIik7XG4iLCJpbXBvcnQgUG9pbnQyRCBmcm9tIFwiLi9tb2RlbHMvUG9pbnQyRFwiO1xuaW1wb3J0IFNpbU9iamVjdCBmcm9tIFwiLi9tb2RlbHMvU2ltT2JqZWN0XCI7XG5pbXBvcnQgQmxvYiBmcm9tIFwiLi9tb2RlbHMvQmxvYlwiO1xuLy8gaW1wb3J0IFwiLi9tb2RlbHMvUG9pbnRcIjtcbmltcG9ydCBUaW55Q2VsbCBmcm9tIFwiLi9tb2RlbHMvVGlueUNlbGxcIjtcbmltcG9ydCB7IHJhbmRvbUludCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbi8qKlxuICogQGF1dGhvciBDaGFpdGFueWEgQmhhZ3dhdFxuICovXG5cbmNsYXNzIFdvcmxkIHtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGRpbWVuc2lvbjogUG9pbnQyRDtcbiAgICBjZW50ZXI6IFBvaW50MkQ7XG4gICAgc3RhdGljQXNzZXN0czogT2JqZWN0W107XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZSgndG91Y2gtYWN0aW9uJywgJ25vbmUnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgIHRoaXMuZGltZW5zaW9uID0gbmV3IFBvaW50MkQ7XG4gICAgICAgIHRoaXMuY2VudGVyID0gbmV3IFBvaW50MkQ7XG4gICAgICAgIC8vIEZvcmNlIGFuIGluaXRpYWwgbGF5b3V0XG4gICAgICAgIHRoaXMub25XaW5kb3dSZXNpemUoKTtcbiAgICAgICAgdGhpcy5zdGF0aWNBc3Nlc3RzID0gW107XG4gICAgfVxuXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMobW91c2VNb3ZlOiB7IChlOiBhbnkpOiB2b2lkOyAodGhpczogV2luZG93LCBldjogUG9pbnRlckV2ZW50KTogYW55OyB9KSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uV2luZG93UmVzaXplLCBmYWxzZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG1vdXNlTW92ZSk7XG4gICAgfTtcbiAgICBvbldpbmRvd1Jlc2l6ZSgpIHtcbiAgICAgICAgLy8gVGhlIHdvcmxkIGRpbWVuc2lvbnNcbiAgICAgICAgbGV0IHggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgbGV0IHkgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHRoaXMuZGltZW5zaW9uLnVwZGF0ZUNvb3JkaW5hdGVzKHgsIHkpO1xuICAgICAgICB0aGlzLmNlbnRlci51cGRhdGVDb29yZGluYXRlcyh4IC8gMiwgeSAvIDIpLnJvdW5kKE1hdGguZmxvb3IpO1xuICAgICAgICAvLyBSZXNpemUgdGhlIGNhbnZhc1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHk7XG4gICAgfTtcbiAgICBhZGRCbG9iKGJsb2I6IEJsb2IpIHtcbiAgICAgICAgdGhpcy5zdGF0aWNBc3Nlc3RzLnB1c2goYmxvYik7XG4gICAgICAgIGxldCBvbGRNb3VzZVBvaW50ID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgIGxldCBob3ZlciA9IGZhbHNlO1xuICAgICAgICBsZXQgbW91c2VNb3ZlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgbGV0IHBvcyA9IGJsb2IuY2VudGVyO1xuICAgICAgICAgICAgbGV0IGRpZmYgPSB7IHg6IGUuY2xpZW50WCAtIHBvcy54LCB5OiBlLmNsaWVudFkgLSBwb3MueSB9O1xuICAgICAgICAgICAgbGV0IGRpc3QgPSBNYXRoLnNxcnQoKGRpZmYueCAqIGRpZmYueCkgKyAoZGlmZi55ICogZGlmZi55KSk7XG4gICAgICAgICAgICBsZXQgYW5nbGUgPSBudWxsO1xuICAgICAgICAgICAgYmxvYi5tb3VzZVBvcyA9IHsgeDogcG9zLnggLSBlLmNsaWVudFgsIHk6IHBvcy55IC0gZS5jbGllbnRZIH07XG4gICAgICAgICAgICBpZiAoZGlzdCA8IGJsb2IucmFkaXVzICYmIGhvdmVyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGxldCB2ZWN0b3IgPSB7IHg6IGUuY2xpZW50WCAtIHBvcy54LCB5OiBlLmNsaWVudFkgLSBwb3MueSB9O1xuICAgICAgICAgICAgICAgIGFuZ2xlID0gTWF0aC5hdGFuMih2ZWN0b3IueSwgdmVjdG9yLngpO1xuICAgICAgICAgICAgICAgIGhvdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBibG9iLmNvbG9yID0gJyM3N0ZGMDAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlzdCA+IGJsb2IucmFkaXVzICYmIGhvdmVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZlY3RvciA9IHsgeDogZS5jbGllbnRYIC0gcG9zLngsIHk6IGUuY2xpZW50WSAtIHBvcy55IH07XG4gICAgICAgICAgICAgICAgYW5nbGUgPSBNYXRoLmF0YW4yKHZlY3Rvci55LCB2ZWN0b3IueCk7XG4gICAgICAgICAgICAgICAgaG92ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBibG9iLmNvbG9yID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYW5nbGUgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmVhcmVzdFBvaW50XzEgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZUZyb21Qb2ludF8xID0gMTAwO1xuICAgICAgICAgICAgICAgIGJsb2IucG9pbnRzLmZvckVhY2goZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGFuZ2xlIC0gcG9pbnQuYXppbXV0aCkgPCBkaXN0YW5jZUZyb21Qb2ludF8xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwb2ludC5hemltdXRoLCBhbmdsZSwgZGlzdGFuY2VGcm9tUG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdFBvaW50XzEgPSBwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlRnJvbVBvaW50XzEgPSBNYXRoLmFicyhhbmdsZSAtIHBvaW50LmF6aW11dGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKG5lYXJlc3RQb2ludF8xKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHJlbmd0aFZlY3RvciA9IG5ldyBQb2ludDJEKG9sZE1vdXNlUG9pbnQueCAtIGUuY2xpZW50WCxvbGRNb3VzZVBvaW50LnkgLSBlLmNsaWVudFkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyZW5ndGggPSBzdHJlbmd0aFZlY3Rvci5kaXN0YW5jZVRvKCkgKiAxMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmVuZ3RoID4gMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyZW5ndGggPSAxMDA7XG4gICAgICAgICAgICAgICAgICAgIG5lYXJlc3RQb2ludF8xLmFjY2VsZXJhdGlvbiA9IHN0cmVuZ3RoIC8gMTAwICogKGhvdmVyID8gLTEgOiAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbGRNb3VzZVBvaW50LnggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICBvbGRNb3VzZVBvaW50LnkgPSBlLmNsaWVudFk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMobW91c2VNb3ZlKTtcbiAgICAgICAgYmxvYi5jYW52YXMgPSB0aGlzLmNhbnZhcztcbiAgICAgICAgYmxvYi5pbml0KCk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpe1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgbGV0IHJlbmRlckZyYW1lID0gKCkgPT4ge1xuICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIGZvciAobGV0IHN0IG9mIHRoaXMuc3RhdGljQXNzZXN0cykge1xuICAgICAgICAgICAgICAgIHN0LnJlbmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yKGxldCBbY19JZCwgY2VsbF0gb2YgU2ltT2JqZWN0LnNpbU9iak1hcCl7XG5cdCAgICAgICAgICAgICBjZWxsLnJlbmRlcigpXG5cdFx0ICAgIH1cbiAgICAgICAgICAgIFNpbU9iamVjdC5jb21wdXRlRGlzdGFuY2VzKCk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyRnJhbWUpO1xuICAgICAgICB9O1xuICAgICAgICByZW5kZXJGcmFtZSgpO1xuICAgIH07XG59XG5cbmxldCB3b3JsZCA9IG5ldyBXb3JsZDtcblxubGV0IG5Qb2ludHMgPSAxMDA7XG5mb3IgKGxldCBpID0gMDsgaSA8IG5Qb2ludHM7IGkgKz0gMSkge1xuICAgIGxldCBjZWxsID0gbmV3IFRpbnlDZWxsKHJhbmRvbUludCgzMCkgKyAxMCwgd29ybGQuY2VudGVyLmNsb25lKCkuYWRkUmFuZG9tKDIwMCkpO1xuICAgIGNlbGwuY29sb3VyID0gJ2hzbCgnICsgMzYwICogTWF0aC5yYW5kb20oKSArICcsIDUwJSwgNTAlKSc7XG4gICAgY2VsbC52ZWxvY2l0eSA9IChuZXcgUG9pbnQyRCkuYWRkUmFuZG9tKDEwKTtcbiAgICBjZWxsLmFjY2VsZXJhdGlvbiA9IDE7XG4gICAgY2VsbC5jYW52YXMgPSB3b3JsZC5jYW52YXM7XG59XG5cbmxldCBibG9iID0gbmV3IEJsb2I7XG5ibG9iLm51bVBvaW50cyA9IDIwO1xuYmxvYi5yYWRpdXMgPSA1MDA7XG53b3JsZC5hZGRCbG9iKGJsb2IpO1xud29ybGQucmVuZGVyKCk7XG4iLCJpbXBvcnQgUG9pbnQgZnJvbSBcIi4vUG9pbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvYiB7XG4gICAgcG9pbnRzOiBhbnlbXTtcbiAgICBwcml2YXRlIF9jb2xvcjogYW55O1xuICAgIHByaXZhdGUgX2NhbnZhczogYW55O1xuICAgIGN0eDogYW55O1xuICAgIHByaXZhdGUgX3BvaW50czogYW55O1xuICAgIHByaXZhdGUgX3JhZGl1czogYW55O1xuICAgIHByaXZhdGUgX3Bvc2l0aW9uOiBhbnk7XG4gICAgcHJpdmF0ZSBfcnVubmluZzogYm9vbGVhbjtcbiAgICBtb3VzZVBvczogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgfTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBvaW50cyA9IFtdO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Qb2ludHM7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBvaW50ID0gbmV3IFBvaW50KHRoaXMuZGl2aXNpb25hbCAqIChpICsgMSksIHRoaXMpO1xuICAgICAgICAgICAgLy8gcG9pbnQuYWNjZWxlcmF0aW9uID0gLTEgKyBNYXRoLnJhbmRvbSgpICogMjtcbiAgICAgICAgICAgIHRoaXMucHVzaChwb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLmNhbnZhcztcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4O1xuICAgICAgICBsZXQgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xuICAgICAgICBsZXQgcG9pbnRzQXJyYXkgPSB0aGlzLnBvaW50cztcbiAgICAgICAgbGV0IHJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgICAgICBsZXQgcG9pbnRzID0gdGhpcy5udW1Qb2ludHM7XG4gICAgICAgIGxldCBkaXZpc2lvbmFsID0gdGhpcy5kaXZpc2lvbmFsO1xuICAgICAgICBsZXQgY2VudGVyID0gdGhpcy5jZW50ZXI7XG5cbiAgICAgICAgcG9pbnRzQXJyYXlbMF0uc29sdmVXaXRoKHBvaW50c0FycmF5W3BvaW50cyAtIDFdLCBwb2ludHNBcnJheVsxXSk7XG5cbiAgICAgICAgbGV0IHAwID0gcG9pbnRzQXJyYXlbcG9pbnRzIC0gMV0ucG9zaXRpb247XG4gICAgICAgIGxldCBwMSA9IHBvaW50c0FycmF5WzBdLnBvc2l0aW9uO1xuICAgICAgICBsZXQgX3AyID0gcDE7XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKGNlbnRlci54LCBjZW50ZXIueSk7XG4gICAgICAgIGN0eC5tb3ZlVG8oKHAwLnggKyBwMS54KSAvIDIsIChwMC55ICsgcDEueSkgLyAyKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50czsgaSsrKSB7XG5cbiAgICAgICAgICAgIHBvaW50c0FycmF5W2ldLnNvbHZlV2l0aChwb2ludHNBcnJheVtpIC0gMV0sIHBvaW50c0FycmF5W2kgKyAxXSB8fCBwb2ludHNBcnJheVswXSk7XG5cbiAgICAgICAgICAgIGxldCBwMiA9IHBvaW50c0FycmF5W2ldLnBvc2l0aW9uO1xuICAgICAgICAgICAgdmFyIHhjID0gKHAxLnggKyBwMi54KSAvIDI7XG4gICAgICAgICAgICB2YXIgeWMgPSAocDEueSArIHAyLnkpIC8gMjtcbiAgICAgICAgICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHAxLngsIHAxLnksIHhjLCB5Yyk7XG4gICAgICAgICAgICAvLyBjdHgubGluZVRvKHAyLngsIHAyLnkpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgICAgICAgLy8gY3R4LmZpbGxSZWN0KHAxLngtMi41LCBwMS55LTIuNSwgNSwgNSk7XG5cbiAgICAgICAgICAgIHAxID0gcDI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeGMgPSAocDEueCArIF9wMi54KSAvIDI7XG4gICAgICAgIHZhciB5YyA9IChwMS55ICsgX3AyLnkpIC8gMjtcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8ocDEueCwgcDEueSwgeGMsIHljKTtcbiAgICAgICAgLy8gY3R4LmxpbmVUbyhfcDIueCwgX3AyLnkpO1xuXG4gICAgICAgIC8vIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgICB9XG5cbiAgICBwdXNoKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBQb2ludCkge1xuICAgICAgICAgICAgdGhpcy5wb2ludHMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCBjb2xvcih2YWx1ZSkge1xuICAgICAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgY29sb3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvciB8fCAnIzAwMDAwMCc7XG4gICAgfVxuXG4gICAgc2V0IGNhbnZhcyh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiB2YWx1ZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdjYW52YXMnKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGNhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG5cbiAgICBzZXQgbnVtUG9pbnRzKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA+IDIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BvaW50cyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBudW1Qb2ludHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHMgfHwgMTY7XG4gICAgfVxuXG4gICAgc2V0IHJhZGl1cyh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgcmFkaXVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmFkaXVzIHx8IDEwMDtcbiAgICB9XG5cbiAgICBzZXQgcG9zaXRpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyAmJiB2YWx1ZS54ICYmIHZhbHVlLnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHBvc2l0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb24gfHwgeyB4OiAwLjUsIHk6IDAuNSB9O1xuICAgIH1cblxuICAgIGdldCBkaXZpc2lvbmFsKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5QSSAqIDIgLyB0aGlzLm51bVBvaW50cztcbiAgICB9XG5cbiAgICBnZXQgY2VudGVyKCkge1xuICAgICAgICByZXR1cm4geyB4OiB0aGlzLmNhbnZhcy53aWR0aCAqIHRoaXMucG9zaXRpb24ueCwgeTogdGhpcy5jYW52YXMuaGVpZ2h0ICogdGhpcy5wb3NpdGlvbi55IH07XG4gICAgfVxuXG4gICAgc2V0IHJ1bm5pbmcodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcnVubmluZyA9IHZhbHVlID09PSB0cnVlO1xuICAgIH1cbiAgICBnZXQgcnVubmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVubmluZyAhPT0gZmFsc2U7XG4gICAgfVxufVxuIiwiIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50IHtcbiAgcGFyZW50OiBhbnk7XG4gICAgYXppbXV0aDogbnVtYmVyO1xuICAgIF9jb21wb25lbnRzOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyOyB9O1xuICAgIF9hY2NlbGVyYXRpb246IG51bWJlcjtcbiAgICBfc3BlZWQ6IG51bWJlcjtcbiAgICBfcmFkaWFsRWZmZWN0OiBudW1iZXI7XG4gICAgX2VsYXN0aWNpdHk6IG51bWJlcjtcbiAgICBfZnJpY3Rpb246IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihhemltdXRoLCBwYXJlbnQpIHtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLmF6aW11dGggPSBNYXRoLlBJIC0gYXppbXV0aDtcbiAgICB0aGlzLl9jb21wb25lbnRzID0ge1xuICAgICAgeDogTWF0aC5jb3ModGhpcy5hemltdXRoKSxcbiAgICAgIHk6IE1hdGguc2luKHRoaXMuYXppbXV0aClcbiAgICB9O1xuXG4gICAgdGhpcy5hY2NlbGVyYXRpb24gPSAtMC4zICsgTWF0aC5yYW5kb20oKSAqIDE7XG4gIH1cblxuICBzb2x2ZVdpdGgobGVmdFBvaW50LCByaWdodFBvaW50KSB7XG4gICAgdGhpcy5hY2NlbGVyYXRpb24gPSAoLTAuMyAqIHRoaXMucmFkaWFsRWZmZWN0ICsgKCBsZWZ0UG9pbnQucmFkaWFsRWZmZWN0IC0gdGhpcy5yYWRpYWxFZmZlY3QgKSArICggcmlnaHRQb2ludC5yYWRpYWxFZmZlY3QgLSB0aGlzLnJhZGlhbEVmZmVjdCApKSAqIHRoaXMuZWxhc3RpY2l0eSAtIHRoaXMuc3BlZWQgKiB0aGlzLmZyaWN0aW9uO1xuICB9XG5cbiAgc2V0IGFjY2VsZXJhdGlvbih2YWx1ZSkge1xuICAgIGlmKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fYWNjZWxlcmF0aW9uID0gdmFsdWU7XG4gICAgICB0aGlzLnNwZWVkICs9IHRoaXMuX2FjY2VsZXJhdGlvbiAqIDI7XG4gICAgfVxuICB9XG4gIGdldCBhY2NlbGVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjY2VsZXJhdGlvbiB8fCAwO1xuICB9XG5cbiAgc2V0IHNwZWVkKHZhbHVlKSB7XG4gICAgaWYodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl9zcGVlZCA9IHZhbHVlO1xuICAgICAgdGhpcy5yYWRpYWxFZmZlY3QgKz0gdGhpcy5fc3BlZWQgKiA1O1xuICAgIH1cbiAgfVxuICBnZXQgc3BlZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NwZWVkIHx8IDA7XG4gIH1cblxuICBzZXQgcmFkaWFsRWZmZWN0KHZhbHVlKSB7XG4gICAgaWYodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl9yYWRpYWxFZmZlY3QgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgZ2V0IHJhZGlhbEVmZmVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmFkaWFsRWZmZWN0IHx8IDA7XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMucGFyZW50LmNlbnRlci54ICsgdGhpcy5jb21wb25lbnRzLnggKiAodGhpcy5wYXJlbnQucmFkaXVzICsgdGhpcy5yYWRpYWxFZmZlY3QpLFxuICAgICAgeTogdGhpcy5wYXJlbnQuY2VudGVyLnkgKyB0aGlzLmNvbXBvbmVudHMueSAqICh0aGlzLnBhcmVudC5yYWRpdXMgKyB0aGlzLnJhZGlhbEVmZmVjdClcbiAgICB9XG4gIH1cblxuICBnZXQgY29tcG9uZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50cztcbiAgfVxuXG4gIHNldCBlbGFzdGljaXR5KHZhbHVlKSB7XG4gICAgaWYodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fZWxhc3RpY2l0eSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICBnZXQgZWxhc3RpY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWxhc3RpY2l0eSB8fCAwLjAwMTtcbiAgfVxuICBzZXQgZnJpY3Rpb24odmFsdWUpIHtcbiAgICBpZih0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl9mcmljdGlvbiA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICBnZXQgZnJpY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZyaWN0aW9uIHx8IDAuMDE7XG4gIH1cbn1cbiIsIi8qKlxuICogRGVmaW5lcyBhIDJEIHBvc2l0aW9uLlxuICovXG4gZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnQyRCB7XG4gICAgX2RpcmVjdGlvbjogVW5pdDtcbiAgICBfbWFnbml0dWRlOiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHg6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3Rvcih4ID0wICwgeSA9IDAgKSB7XG4gICAgXHR0aGlzLnggPSB4O1xuICAgIFx0dGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5fbWFnbml0dWRlID0gTWF0aC5zcXJ0KHRoaXMueCp0aGlzLnggKyB0aGlzLnkqdGhpcy55KTtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gbmV3IFVuaXQoeCx5KTtcbiAgICB9O1xuXG4gICAgZ2V0IG1hZ25pdHVkZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFnbml0dWRlO1xuICAgIH1cblxuICAgIHNldCBtYWduaXR1ZGUobSl7XG4gICAgICAgIHRoaXMuc2NhbGUobS90aGlzLm1hZ25pdHVkZSlcbiAgICB9XG5cbiAgICBnZXQgZGlyZWN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuICAgIHNldCBkaXJlY3Rpb24oZCl7XG4gICAgICAgIGlmKGQgaW5zdGFuY2VvZiBVbml0KXtcbiAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVNYWduaXR1ZGUoKXtcbiAgICAgICAgdGhpcy5fbWFnbml0dWRlID0gTWF0aC5zcXJ0KHRoaXMueCp0aGlzLnggKyB0aGlzLnkqdGhpcy55KTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaXJlY3Rpb24oKXtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uLnVwZGF0ZSh0aGlzLngsdGhpcy55KVxuICAgIH1cblxuICAgIGRpc3RhbmNlVG8oIGM/OlBvaW50MkQpIHtcbiAgICAgICAgaWYoYyl7XG4gICAgICAgICAgICB2YXIgZHggPSBjLngtdGhpcy54O1xuICAgICAgICAgICAgdmFyIGR5ID0gYy55LXRoaXMueTtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHgqZHggKyBkeSpkeSk7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLngqdGhpcy54ICsgdGhpcy55KnRoaXMueSk7XG4gICAgfTtcblxuICAgIGNsb25lKCkge1xuICAgIFx0cmV0dXJuIG5ldyBQb2ludDJEKHRoaXMueCwgdGhpcy55KTtcbiAgICB9O1xuXG4gICAgaW50ZXJwb2xhdGUoIHg6bnVtYmVyLCB5Om51bWJlciwgYW1wOm51bWJlciApIHtcbiAgICBcdHRoaXMueCArPSAoIHggLSB0aGlzLnggKSAqIGFtcDtcbiAgICBcdHRoaXMueSArPSAoIHkgLSB0aGlzLnkgKSAqIGFtcDtcbiAgICAgICAgdGhpcy51cGRhdGVNYWduaXR1ZGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXJlY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIGFkZFJhbmRvbShhbXA6bnVtYmVyKXtcbiAgICAgICAgdGhpcy54ICs9IGFtcCAqICgtMSArIDIqTWF0aC5yYW5kb20oKSk7XG4gICAgICAgIHRoaXMueSArPSBhbXAgKiAoLTEgKyAyKk1hdGgucmFuZG9tKCkpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hZ25pdHVkZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpcmVjdGlvbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgYWRkKHBvaW50OlBvaW50MkQpe1xuICAgICAgICB0aGlzLnggKz0gcG9pbnQueDtcbiAgICAgICAgdGhpcy55ICs9IHBvaW50Lnk7XG4gICAgICAgIHRoaXMudXBkYXRlTWFnbml0dWRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICByZXZlcnNlKCl7XG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XG4gICAgICAgIHRoaXMueSA9IC0gdGhpcy55O1xuICAgICAgICB0aGlzLnVwZGF0ZURpcmVjdGlvbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXZlcnNlWSgpe1xuICAgICAgICB0aGlzLnkgPSAtIHRoaXMueTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXJlY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV2ZXJzZVgoKXtcbiAgICAgICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICAgICAgdGhpcy51cGRhdGVEaXJlY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2NhbGUoYW1wKXtcbiAgICAgICAgdGhpcy54ICo9IGFtcDtcbiAgICAgICAgdGhpcy55ICo9IGFtcDtcbiAgICAgICAgdGhpcy5fbWFnbml0dWRlICo9IGFtcDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYWRkUmFuZG9tRGlyZWN0aW9uKGFtcCl7XG4gICAgICAgIGxldCBtYWcgPSB0aGlzLm1hZ25pdHVkZTtcbiAgICAgICAgdGhpcy5hZGRSYW5kb20oYW1wKTtcbiAgICAgICAgdGhpcy5tYWduaXR1ZGUgPSBtYWc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvb3JkaW5hdGVzKHgsIHkpe1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnVwZGF0ZURpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hZ25pdHVkZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdXBkYXRlUG9pbnQoIGMgKXtcbiAgICAgICAgaWYgKGMgaW5zdGFuY2VvZiBQb2ludDJEKXtcbiAgICAgICAgICAgIHRoaXMueCA9IGMueDtcbiAgICAgICAgICAgIHRoaXMueSA9IGMueTtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gYy5kaXJlY3Rpb247XG4gICAgICAgICAgICB0aGlzLm1hZ25pdHVkZSA9IGMubWFnbml0dWRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByb3VuZChmOiAoYXJnMDogbnVtYmVyKSA9PiBudW1iZXIpe1xuICAgICAgICB0aGlzLnggPSBmKHRoaXMueCk7XG4gICAgICAgIHRoaXMueSA9IGYodGhpcy55KTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYWduaXR1ZGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5jbGFzcyBVbml0IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKXtcbiAgICAgICAgdGhpcy51cGRhdGUoeCx5KVxuICAgIH1cbiAgICB1cGRhdGUoeDogbnVtYmVyLCB5OiBudW1iZXIpe1xuICAgICAgICBsZXQgZmFjdG9yID0gTWF0aC5zcXJ0KHgqeCArIHkqeSlcbiAgICAgICAgdGhpcy54ID0geC9mYWN0b3I7XG4gICAgICAgIHRoaXMueSA9IHkvZmFjdG9yO1xuICAgIH1cbiAgICBmcm9tKGMpe1xuICAgICAgICB0aGlzLnVwZGF0ZShjLngsIGMueSlcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IFBvaW50MkQgZnJvbSBcIi4vUG9pbnQyRFwiO1xuXG4gZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltT2JqZWN0IHtcbiAgICBzdGF0aWMgc2ltT2JqSWRNYXggPSAwO1xuICAgIHN0YXRpYyBzaW1PYmpNYXAgPSBuZXcgTWFwKCk7XG4gICAgc3RhdGljIGRpc3RhbmNlTWFwID0gbmV3IE1hcCgpO1xuICAgIHNpemU6IG51bWJlcjtcbiAgICBwb3NpdGlvbjogUG9pbnQyRDtcbiAgICBib3VuZGluZ1JhZGl1czogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBzaW1PYmpJZDogbnVtYmVyO1xuICAgIGlzQ29sbGlkaW5nOiBib29sZWFuO1xuICAgIHByb3RlY3RlZCBfY2FudmFzITogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY3R4OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihzaXplOm51bWJlciwgcG9zaXRpb246UG9pbnQyRCwgYm91bmRpbmdSYWRpdXM/Om51bWJlcikge1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIGlmKGJvdW5kaW5nUmFkaXVzKXtcbiAgICAgICAgICAgIHRoaXMuYm91bmRpbmdSYWRpdXMgPSBib3VuZGluZ1JhZGl1cztcbiAgICAgICAgfSBlbHNlIHRoaXMuYm91bmRpbmdSYWRpdXMgPSBzaXplO1xuICAgICAgICB0aGlzLnNpbU9iaklkID0gU2ltT2JqZWN0LnJlZ2lzdGVyKHRoaXMpO1xuICAgICAgICB0aGlzLmlzQ29sbGlkaW5nID0gZmFsc2U7XG4gICAgfTtcblxuXG4gICAgc3RhdGljIHJlZ2lzdGVyKGM6U2ltT2JqZWN0KXtcbiAgICAgICAgdGhpcy5zaW1PYmpNYXAuc2V0KHRoaXMuc2ltT2JqSWRNYXgsIGMpO1xuICAgICAgICB0aGlzLnNpbU9iaklkTWF4ICs9IDE7XG4gICAgICAgIHJldHVybiB0aGlzLnNpbU9iaklkTWF4IC0gMTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29tcHV0ZURpc3RhbmNlcygpe1xuICAgICAgICAvLyB0aGlzIGNvbXB1cHRhdGlvbiBvY2N1cnMgYWZ0ZXIgZXZlcnkgdXBkYXRlIGJlZm9yZSBwYWludGluZyB0aGUgc2NyZWVuXG5cbiAgICAgICAgbGV0IHNpbU9iaklkcyA9IFsuLi50aGlzLnNpbU9iak1hcC5rZXlzKCldO1xuXG4gICAgICAgIC8vIHRyYWNrIHRoZSBpZHMgb2YgdGhlIHNpbU9ianMgd2hpY2ggYXJlIGluIGEgY29sbGlkaW5nIHN0YXRlIGZvciB0aGlzIHVwZGF0ZVxuICAgICAgICBsZXQgY29sbGlzaW9ucyA9IG5ldyBTZXQoKTtcblxuICAgICAgICAvLyBBIGFuZCBCIHJlcHJlc2VudCBhIHBhaXIgb2YgU2ltT2JqZWN0c1xuICAgICAgICAvLyBBLnNpbU9iaklkID09IHNpbU9iaklkc1tzaW1PYmpfaV1cbiAgICAgICAgZm9yIChsZXQgc2ltT2JqX2kgPSAwOyBzaW1PYmpfaSA8IHNpbU9iaklkcy5sZW5ndGg7IHNpbU9ial9pICs9IDEpe1xuXG4gICAgICAgICAgICBsZXQgYSA9IHRoaXMuc2ltT2JqTWFwLmdldChzaW1PYmpJZHNbc2ltT2JqX2ldKTtcblxuICAgICAgICAgICAgLy8gaWYgQSBoYXMgYWxyZWFkeSBjb2xsaWRlZCB3aXRoIHNvbWV0aGluZyBpbiB0aGlzIGZyYW1lLCBkb24ndFxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGFueSBvdGhlciBjb2xsaXNpb25zXG4gICAgICAgICAgICBpZiAoY29sbGlzaW9ucy5oYXMoYS5zaW1PYmpJZCkpe1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBBIGlzbid0IGFscmVhZHkgaW4gYSBjb2xsaWRlZCBzdGF0ZSxcbiAgICAgICAgICAgIC8vIGNoZWNrIHdpdGggZXZlcnkgb3RoZXIgc2ltT2JqIFtCXVxuICAgICAgICAgICAgZm9yIChsZXQgc2ltT2JqX2ogPSBzaW1PYmpfaSArIDE7IHNpbU9ial9qIDwgc2ltT2JqSWRzLmxlbmd0aDsgc2ltT2JqX2ogKz0gMSl7XG4gICAgICAgICAgICAgICAgbGV0IGIgPSB0aGlzLnNpbU9iak1hcC5nZXQoc2ltT2JqSWRzW3NpbU9ial9qXSk7XG4gICAgICAgICAgICAgICAgbGV0IGRpc3QgPSAoYS5wb3NpdGlvbikuZGlzdGFuY2VUbyhiLnBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGRpc3RhbmNlIGlzIGxlc3MgdGhhbiBzaXplICsgdGhyZXNob2xkIGV4dHJhIG1hcmdpblxuICAgICAgICAgICAgICAgIGlmKGRpc3QgPD0gYS5ib3VuZGluZ1JhZGl1cyArIGIuYm91bmRpbmdSYWRpdXMpe1xuICAgICAgICAgICAgICAgICAgICBhLm9uQ29sbGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICBiLm9uQ29sbGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zLmFkZChhLnNpbU9iaklkKTtcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5hZGQoYi5zaW1PYmpJZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzdGFuY2VNYXAuc2V0KFtzaW1PYmpfaSwgc2ltT2JqX2pdLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIEEgaGFzIGNvbGxpZGVkIHdpdGggQiwgd2UgZG9uJ3QgY2FyZSB3aGF0IGVsc2UgaXQnc1xuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsaWRpbmcgd2l0aCBpbiB0aGlzIHVwZGF0ZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgQSBhbmQgQiBoYXZlbid0IGNvbGxpZGVkIHRoZW4gdGhleSBoYXZlIHNvbWUgZGlzdGFuY2UgPiAwXG4gICAgICAgICAgICAgICAgaWYoc2ltT2JqX2kgPT09IHVuZGVmaW5lZCB8fCAgc2ltT2JqX2ogPT09IHVuZGVmaW5lZCB8fCAgZGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRpc3RhbmNlTWFwLHNpbU9ial9pLHNpbU9ial9qLGRpc3QpXG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0YW5jZU1hcC5zZXQoW3NpbU9ial9pLCBzaW1PYmpfal0sIGRpc3QpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBubyBjb2xsaXNpb24gaGFzIG9jY3VycmVkIGJldHdlZW4gQSBhbmQgYWxsIG90aGVyIHBvc3NpYmxlIHNpbU9ianMsXG4gICAgICAgICAgICAvLyBpdCBtZWFucyBpdCBoYXMgbm90IGNvbGxpZGVkIGluIHRoaXMgdXBkYXRlO1xuICAgICAgICAgICAgaWYgKCFjb2xsaXNpb25zLmhhcyhhLnNpbU9iaklkKSl7XG4gICAgICAgICAgICAgICAgYS5vZmZDb2xsaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbGxpZGUoKXtcbiAgICAgICAgdGhpcy5pc0NvbGxpZGluZyA9IHRydWU7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2ltT2JqSWQsIFwiIGlzIENvbGxpZGluZyFcIilcbiAgICB9XG5cbiAgICBvZmZDb2xsaWRlKCl7XG4gICAgICAgIHRoaXMuaXNDb2xsaWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZXQgY2FudmFzKHZhbHVlKSB7XG4gICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgdmFsdWUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnY2FudmFzJykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmN0eCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGNhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG59XG4iLCJpbXBvcnQgU2ltT2JqZWN0IGZyb20gXCIuL1NpbU9iamVjdFwiO1xuaW1wb3J0IFBvaW50MkQgZnJvbSBcIi4vUG9pbnQyRFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW55Q2VsbCBleHRlbmRzIFNpbU9iamVjdHtcbiAgICBjb2xvdXI6IGFueTtcbiAgICBhY2NlbGVyYXRpb246IGFueTtcbiAgICBwcml2YXRlIF92ZWxvY2l0eTogYW55O1xuICAgIHNwZWVkOiBhbnk7XG4gICAgY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyLCBwb3NpdGlvbjogUG9pbnQyRCkge1xuICAgICAgICBzdXBlcihzaXplLCBwb3NpdGlvbilcbiAgICB9O1xuXG4gICAgc2V0IHZlbG9jaXR5KHYpe1xuICAgICAgICB0aGlzLl92ZWxvY2l0eSA9IHY7XG4gICAgICAgIHRoaXMuc3BlZWQgPSB2Lm1hZ25pdHVkZTtcbiAgICB9XG5cbiAgICBnZXQgdmVsb2NpdHkoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlbG9jaXR5O1xuICAgIH1cblxuICAgIHdhbmRlcigpe1xuICAgICAgICBsZXQgY2hhbmdlID0gbmV3IFBvaW50MkQodGhpcy52ZWxvY2l0eS54LCB0aGlzLnZlbG9jaXR5LnkpXG4gICAgICAgIHRoaXMuZGV0ZWN0Qm91bmNlKGNoYW5nZSlcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5pbnRlcnBvbGF0ZSh0aGlzLnBvc2l0aW9uLnggKyBjaGFuZ2UueCwgdGhpcy5wb3NpdGlvbi55ICsgY2hhbmdlLnksIDEpO1xuICAgICAgICB0aGlzLnZlbG9jaXR5LmFkZFJhbmRvbURpcmVjdGlvbih0aGlzLmFjY2VsZXJhdGlvbik7XG4gICAgfVxuXG4gICAgZGV0ZWN0Qm91bmNlKGNoYW5nZTogUG9pbnQyRCl7XG4gICAgICAgIGxldCB4ID0gdGhpcy5wb3NpdGlvbi54O1xuICAgICAgICBsZXQgeSA9IHRoaXMucG9zaXRpb24ueTtcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuY2FudmFzO1xuXG4gICAgICAgIGlmKHggKyBjaGFuZ2UueCA+IGNhbnZhcy53aWR0aC10aGlzLnNpemUgfHwgeCArIGNoYW5nZS54IDwgdGhpcy5zaXplKSB7XG4gICAgICAgICAgICBjaGFuZ2UueCA9IC1jaGFuZ2UueDtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkucmV2ZXJzZVgoKVxuICAgICAgICB9XG4gICAgICAgIGlmKHkgKyBjaGFuZ2UueSA+IGNhbnZhcy5oZWlnaHQtdGhpcy5zaXplIHx8IHkgKyBjaGFuZ2UueSA8IHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgY2hhbmdlLnkgPSAtY2hhbmdlLnk7XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnJldmVyc2VZKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eDtcblxuICAgICAgICAvLyBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMud2FuZGVyKCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5zaXplLCAwLCBNYXRoLlBJKjIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5pc0NvbGxpZGluZz8nI2FhNjA2MCc6dGhpcy5jb2xvdXI7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgICAgICBjdHguZm9udCA9IFwiMzBweCBNb25vc3BhY2VcIjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0FBQUFBQVwiO1xuICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuc2ltT2JqSWQsIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICB9XG5cbn1cbiIsIi8qKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUludChtYXgpIHtcbiAgXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcihtYXgpKTtcbn1cblxudmFyIENhcGFiaWxpdGllcyA9IHtcblx0aXNPbmxpbmU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBuYXZpZ2F0b3Iub25MaW5lO1xuXHR9LFxuXG5cdGlzVG91Y2hEZXZpY2U6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKCAvKGlwaG9uZXxpcGFkfGlwb2R8YW5kcm9pZCkvZ2kgKTtcblx0fSxcblxuXHRzdXBvcnRzTG9jYWxTdG9yYWdlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gKCdsb2NhbFN0b3JhZ2UnIGluIHdpbmRvdykgJiYgd2luZG93Wydsb2NhbFN0b3JhZ2UnXSAhPT0gbnVsbDtcblx0fVxufTtcblxuLyoqXG4gKiBEZWZpbmVzIG9mIGEgcmVjdGFuZ3VsYXIgcmVnaW9uLlxuICovXG5leHBvcnQgY2xhc3MgUmVnaW9ue1xuICAgIGNvbnN0cnVjdG9yKCl7XG5cdHRoaXMubGVmdCA9IDk5OTk5OTtcblx0dGhpcy50b3AgPSA5OTk5OTk7XG5cdHRoaXMucmlnaHQgPSAwO1xuXHR0aGlzLmJvdHRvbSA9IDA7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgXHR0aGlzLmxlZnQgPSA5OTk5OTk7XG4gICAgXHR0aGlzLnRvcCA9IDk5OTk5OTtcbiAgICBcdHRoaXMucmlnaHQgPSAwO1xuICAgIFx0dGhpcy5ib3R0b20gPSAwO1xuICAgIH1cblxuICAgIGluZmxhdGUoIHgsIHkgKSB7XG4gICAgXHR0aGlzLmxlZnQgPSBNYXRoLm1pbih0aGlzLmxlZnQsIHgpO1xuICAgIFx0dGhpcy50b3AgPSBNYXRoLm1pbih0aGlzLnRvcCwgeSk7XG4gICAgXHR0aGlzLnJpZ2h0ID0gTWF0aC5tYXgodGhpcy5yaWdodCwgeCk7XG4gICAgXHR0aGlzLmJvdHRvbSA9IE1hdGgubWF4KHRoaXMuYm90dG9tLCB5KTtcbiAgICB9XG5cbiAgICBleHBhbmQoIHgsIHkgKSB7XG4gICAgXHR0aGlzLmxlZnQgLT0geDtcbiAgICBcdHRoaXMudG9wIC09IHk7XG4gICAgXHR0aGlzLnJpZ2h0ICs9IHg7XG4gICAgXHR0aGlzLmJvdHRvbSArPSB5O1xuICAgIH07XG5cbiAgICBjb250YWlucyggeCwgeSApIHtcbiAgICBcdHJldHVybiB4ID4gdGhpcy5sZWZ0ICYmIHggPCB0aGlzLnJpZ2h0ICYmIHkgPiB0aGlzLnRvcCAmJiB5IDwgdGhpcy5ib3R0b207XG4gICAgfTtcblxuICAgIHNpemUoKSB7XG4gICAgXHRyZXR1cm4gKCAoIHRoaXMucmlnaHQgLSB0aGlzLmxlZnQgKSArICggdGhpcy5ib3R0b20gLSB0aGlzLnRvcCApICkgLyAyO1xuICAgIH07XG5cbiAgICBjZW50ZXIoKSB7XG4gICAgXHRyZXR1cm4gbmV3IFBvaW50KCB0aGlzLmxlZnQgKyAodGhpcy5yaWdodCAtIHRoaXMubGVmdCkgLyAyLCB0aGlzLnRvcCArICh0aGlzLmJvdHRvbSAtIHRoaXMudG9wKSAvIDIgKTtcbiAgICB9O1xuXG4gICAgdG9SZWN0YW5nbGUoKSB7XG4gICAgXHRyZXR1cm4geyB4OiB0aGlzLmxlZnQsIHk6IHRoaXMudG9wLCB3aWR0aDogdGhpcy5yaWdodCAtIHRoaXMubGVmdCwgaGVpZ2h0OiB0aGlzLmJvdHRvbSAtIHRoaXMudG9wIH07XG4gICAgfTtcbn1cblxuXG5cbi8vIC8vIHNoaW0gbGF5ZXIgd2l0aCBzZXRUaW1lb3V0IGZhbGxiYWNrIGZyb20gaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbi8vIGV4cG9ydCBjb25zdCByZXF1ZXN0QW5pbUZyYW1lID0gZnVuY3Rpb24od2luZG93KXtcbi8vICAgcmV0dXJuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG4vLyAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuLy8gICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbi8vICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG4vLyAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuLy8gICAgICAgICAgIGZ1bmN0aW9uKC8qIGZ1bmN0aW9uICovIGNhbGxiYWNrLCAvKiBET01FbGVtZW50ICovIGVsZW1lbnQpe1xuLy8gICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4vLyAgICAgICAgICAgfTtcbi8vIH07XG4iXSwic291cmNlUm9vdCI6IiJ9