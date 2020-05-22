/**
 * @author Chaitanya Bhagwat
 */

// The world dimensions
let world = {
	width: 2540,
	height: 1440,
};

world.center = new PointRect( world.width/2, world.height/2 );

function addEventListeners(mouseMove) {
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('pointermove', mouseMove);


	// for( var i = 0, len = sequencerInputElements.length; i < len; i++ ) {
	// 	sequencerInputElements[i].addEventListener( 'click', onSequencerInputElementClick, false );
	// }
}

function onWindowResize() {
	let offsetWidth = 10;
	let containerWidth = world.width + offsetWidth + 20;

	// Resize the canvas
	canvas.width = world.width;
	canvas.height = world.height;
}


/**
 *
 */
function initialize() {
	canvas = document.createElement('canvas');
	canvas.setAttribute('touch-action', 'none');

	document.body.appendChild(canvas);

	// Force an initial layout
	onWindowResize();

	let blob = new Blob;
	blob.numPoints = 20;
	blob.radius = 500;

	let oldMousePoint = { x: 0, y: 0};
	let hover = false;
	let mouseMove = function(e) {

		let pos = blob.center;
		let diff = { x: e.clientX - pos.x, y: e.clientY - pos.y };
		let dist = Math.sqrt((diff.x * diff.x) + (diff.y * diff.y));
		let angle = null;

		blob.mousePos = { x: pos.x - e.clientX, y: pos.y - e.clientY };

		if(dist < blob.radius && hover === false) {
			let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
			angle = Math.atan2(vector.y, vector.x);
			hover = true;
			// blob.color = '#77FF00';
		} else if(dist > blob.radius && hover === true){
			let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
			angle = Math.atan2(vector.y, vector.x);
			hover = false;
			blob.color = null;
		}

		if(typeof angle == 'number') {

			let nearestPoint = null;
			let distanceFromPoint = 100;

			blob.points.forEach((point)=> {
				if(Math.abs(angle - point.azimuth) < distanceFromPoint) {
					// console.log(point.azimuth, angle, distanceFromPoint);
					nearestPoint = point;
					distanceFromPoint = Math.abs(angle - point.azimuth);
				}

			});

			if(nearestPoint) {
				let strength = { x: oldMousePoint.x - e.clientX, y: oldMousePoint.y - e.clientY };
				strength = Math.sqrt((strength.x * strength.x) + (strength.y * strength.y)) * 10;
				if(strength > 100) strength = 100;
				nearestPoint.acceleration = strength / 100 * (hover ? -1 : 1);
			}
		}

		oldMousePoint.x = e.clientX;
		oldMousePoint.y = e.clientY;
	}

	addEventListeners(mouseMove);

	blob.canvas = canvas;
	blob.init();
	blob.render();


	cell = new Cell(100, new PointRect(200,1000), "#FFFFFF");
	cell.canvas = canvas;
	cell.render();
	cell = new Cell(50, new PointRect(200,1000), "#FF33DD");
	cell.canvas = canvas;
	cell.render();
	cell = new Cell(70, new PointRect(200,1000), "#9905DD");
	cell.canvas = canvas;
	cell.render();
	cell = new Cell(100, new PointRect(200,1000), "#FFFFFF");
	cell.canvas = canvas;
	cell.render();
	cell = new Cell(50, new PointRect(200,1000), "#FF33DD");
	cell.canvas = canvas;
	cell.render();
	cell = new Cell(70, new PointRect(200,1000), "#9905DD");
	cell.canvas = canvas;
	cell.render();
	cell = new Cell(100, new PointRect(200,1000), "#FFFFFF");
	cell.canvas = canvas;
	cell.render();
	cell = new Cell(50, new PointRect(200,1000), "#FF33DD");
	cell.canvas = canvas;
	cell.render();
	cell = new Cell(70, new PointRect(200,1000), "#9905DD");
	cell.canvas = canvas;
	cell.render();
}

initialize();
