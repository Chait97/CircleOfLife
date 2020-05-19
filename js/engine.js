/**
 * @author Chaitanya Bhagwat
 */

// The world dimensions
let world = {
	width: 600,
	height: 500,
	center: new Point( 300, 250 )
};

// Mouse input tracking
let mouse = {
	// The current position
	x: 0,
	y: 0,

	// The position previous to the current
	previousX: 0,
	previousY: 0,

	// The velocity, based on the difference between
	// the current and next positions
	velocityX: 0,
	velocityY: 0,

	// Flags if the mouse is currently pressed down
	down: false,

	// When dragging the action is defined by the first nodes
	// reaction (activate/deactivate)
	action: null,

	// A list of node ID's for which action should not be
	// taken until the next time the mouse is pressed down
	exclude: []

};


/**
 *
 */
function initialize() {
	// Run selectors and cache element references
	canvas = document.querySelector( 'canvas' );

	if ( canvas && canvas.getContext ) {
		context = canvas.getContext('2d');
		context.globalCompositeOperation = 'lighter';

		addEventListeners();

		// Force an initial layout
		onWindowResize();

		setup();
		load();
		update();
	}
	else {
		alert( 'Doesn\'t seem like your browser supports the HTML5 canvas element :(' );
	}

}

function addEventListeners() {
	resetButton.addEventListener('click', onResetButtonClicked, false);
	saveButton.addEventListener('click', onSaveButtonClicked, false);
	sequencerAddButton.addEventListener('click', onSequencerAddButtonClick, false);

	canvas.addEventListener('mousedown', onCanvasMouseDown, false);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);
	canvas.addEventListener('touchstart', onCanvasTouchStart, false);
	canvas.addEventListener('touchmove', onCanvasTouchMove, false);
	canvas.addEventListener('touchend', onCanvasTouchEnd, false);
	window.addEventListener('resize', onWindowResize, false);

	for( var i = 0, len = sequencerInputElements.length; i < len; i++ ) {
		sequencerInputElements[i].addEventListener( 'click', onSequencerInputElementClick, false );
	}
}

function onWindowResize() {
	var containerWidth = world.width + sidebar.offsetWidth + 20;

	// Resize the container
	container.style.width = containerWidth + 'px';
	container.style.height = world.height + 'px';
	container.style.left = ( window.innerWidth - world.width ) / 2 + 'px';
	container.style.top = ( window.innerHeight - world.height ) / 2 + 'px';

	// Resize the canvas
	canvas.width = world.width;
	canvas.height = world.height;
}
