/**
 *
 */
export function randomInt(max) {
  	return Math.floor(Math.random() * Math.floor(max));
}

var Capabilities = {
	isOnline: function() {
		return navigator.onLine;
	},

	isTouchDevice: function() {
		return navigator.userAgent.match( /(iphone|ipad|ipod|android)/gi );
	},

	suportsLocalStorage: function() {
		return ('localStorage' in window) && window['localStorage'] !== null;
	}
};

/**
 * Defines of a rectangular region.
 */
export class Region{
    constructor(){
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

    inflate( x, y ) {
    	this.left = Math.min(this.left, x);
    	this.top = Math.min(this.top, y);
    	this.right = Math.max(this.right, x);
    	this.bottom = Math.max(this.bottom, y);
    }

    expand( x, y ) {
    	this.left -= x;
    	this.top -= y;
    	this.right += x;
    	this.bottom += y;
    };

    contains( x, y ) {
    	return x > this.left && x < this.right && y > this.top && y < this.bottom;
    };

    size() {
    	return ( ( this.right - this.left ) + ( this.bottom - this.top ) ) / 2;
    };

    center() {
    	return new Point( this.left + (this.right - this.left) / 2, this.top + (this.bottom - this.top) / 2 );
    };

    toRectangle() {
    	return { x: this.left, y: this.top, width: this.right - this.left, height: this.bottom - this.top };
    };
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
