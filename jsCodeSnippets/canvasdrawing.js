$(document).ready(function() {

	var images = [];
	names = [],
	canvas = $("#myCanvas"),
	cxt = canvas.get(0).getContext("2d"),	
	canvasWidth = 0,
	canvasHeight = 0,
	fontSize = 0,
	size = 0,

	initialize();	
	var onResizeDebounced = _.debounce(onResize, 200);
	$(window).resize(onResizeDebounced);	 

	function initialize() {
		onResize();
	};

	function onResize() {
		clearCanvas();
		calculateDimensions();
    	createCanvas();
		placeHexagon(images);
	 	placeText(names);
	};

	function clearCanvas () {
		cxt.save();
		cxt.clearRect(0, 0, canvas.width, canvas.height);
		cxt.restore();
		images.length = 0;
		names.length = 0;
	};

	function calculateDimensions () {
		windowWidth = Math.ceil($(window).width());
    	canvasWidth = ($(window).width() * .57);
    	if (windowWidth > 1200) {size = 92;}
    	if ($(window).width() < 500) { 
			size = 50;
		}
		else {
			size = (canvasWidth * .20125) * .5714
		}
    	canvasHeight = ($(".canvas-images li").length/2) * (size * 1.79);
	};

	function createCanvas () {
		cxt.restore();
		cxt.moveTo(0,0);
		canvas.attr('width', canvasWidth);
		canvas.attr('height', canvasHeight);
		$(".canvas-images li").each(function(index) {
	 		images.push($(this).attr('data'));
	 		names.push($(this).html());
	 	});
	};

	function createHexagon(x,y,imgSource) {
		Xcenter = size * 1.27;
		Ycenter = size * .42
	    var numberOfSides = 6,
	    img = new Image();
	    img.src = imgSource;
	    img.onload = function () {
		    var pattern = cxt.createPattern(img, "no-repeat");
		    cxt.save();
		    cxt.translate(x,y);
		    cxt.rotate(0.53);   
		 
		    cxt.beginPath();
		    cxt.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          
		     
		    for (var i = 1; i <= numberOfSides;i += 1) {
		        cxt.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
		    }
		    cxt.lineWidth = 1;
		    cxt.restore();
		    cxt.save();
		    cxt.translate(x,y);
		    cxt.strokeStyle = "#FFF";
		    cxt.stroke();
		    cxt.fillStyle = pattern;
		    cxt.scale((1/92)*size,(1/92)*size);
		    cxt.fill();
		    cxt.restore();
		};
	};

	function placeHexagon (images) { 
		for (var i = 0; i < images.length; i++){
				createHexagon((.294 * canvasWidth) + (size * .011) * (219*(i%2) - 86*(i%4/2)), (size * 1.65217)*Math.floor(i/2), images[i]);
		}
	};

	function newText (textSource, x, y, align) {
		var fontSize = Math.ceil(canvasWidth * .025);
		console.log(fontSize);
		var normal = "serif";
		cxt.font = "normal " + fontSize + "px DIN Next W02 Regular";
		cxt.textAlign = align;
		cxt.fillStyle = "#FFF";
		cxt.fillText(textSource, x, y);
	};

	function placeText (names, x, y){ 
		for (var i = 0; i < names.length; i++){
			var align = "left";
			if (i%2 === 0 ) {
				align = "right";
			}
			newText(names[i], (.275 * canvasWidth) + (size * .011) * (410*(i%2) - 85*(i%4/2)), (size * 1.09) + (size * 1.65217) *Math.floor(i/2), align);
		}
	}
});	
