// holy cow, in here https://www.favicon.cc/ you can create animation(gif) from the drawen sketches, and you can see the ones that made... I'll definitely create a database, I also decided on postgres instead of mysql after sqlite...


let gridSize = 16;
let pixelArray = []; // row div's not inside this. But from the 2nd dimensional array's index, you can reach the row div from document
let i, k;

let container = document.querySelector('.container');


let pixelSize = getPixelSize();

function getPixelSize() {
	return container.offsetHeight / gridSize
}


let mouseDown = false;
document.onmousedown = () => { mouseDown = true }
document.onmouseup = () => { mouseDown = false }

let colorInput = document.querySelector('#color-input');
let gridSizeInput = document.querySelector('#grid-size-input');
let transparencyInput = document.querySelector('#transparency-input');


// TODO row number not updated along with gridSize!!!

colorInput.addEventListener('change', updateColor);
transparencyInput.addEventListener('change', updateColor);
transparencyInput.value = 100;

gridSizeInput.value = gridSize;
gridSizeInput.addEventListener('change', updateGridArea);

let currentColor = colorInput.value;


// TODO add radio button etc to the top right corner of color. So user can choose background color etc. And depending on the radio button, color and transparency affects to the background or the drawer. (we might hide transparency div for background option...
// or just create another color input (background no need transparency,  also as will create option to have the background or not both in save part and color part...)
// wait, I thought this for transparent colors looks different depending on the background color. But while downloading user might not want the background color. So when you created the save option, also add radio button for include the background color or not. Therefore also add second radio buttons for include background color or not...
// NOTE, IMPORTANT NOTE, do these after completing the main page if you want to do ....
// UPDATE, I'll take care of the design and what buttonn should be added etc..... 
//
// TODO might add eraser...
// TODO add favicon option to set everything egiible to create a favicon...

// UPDATE: might need to use alpha value between 0-255 instead of 0-1, for python PIL
// NOTE: I waas gonna use C or so, but I couldn't find a solution like I want, so I turned to the python....
// but I encountered some cool sites like: https://www.usna.edu/Users/cs/nchamber/courses/si204/s18/lab/l08/lab.html
// NOTE: for using databases with javascript https://www.quora.com/Should-I-use-JavaScript-to-query-MySQL-database-on-my-website-or-should-I-use-PHP-Python-Ruby
// -- // from Estevan Seneca:
// -- // If you are referring to browser based Javascript, you do not want to have it pass SQL statements directly to the server. This presents a major liability since you’re exposing your data store to a host of input validation risks. Any client side user would be able to modify the in browser request and feed it directly to your server.
// -- // 
// -- // If you’re referring to your stack, go with what is already available. If your existing infrastructure uses Python/Django then SQLAlchemy or a similar ORM my work for you. PHP has an excellent set of database bindings for a majority of databases as well.
// -- // 
// -- // If you’re starting from scratch then I’d suggest what ever would integrate into your ecosystem the best. Look at what you know, what you (or your company) already runs and make your decision that would allow for the easiest integration and testing.
// -- // 
// -- // If we knew a little bit more about the circumstance in which you are operating in, a better advisement could be given.
// so using database etc is risky with javascript like using innerHTML from the user-input... now ruby etc makes sense to be honest.... actually I can do something like, if the sql code is equal to what we want... But then again, we would have to be doing this with another .js file... Anyway, I didn't need in this stage for such a thing, I guess (I hope still won't have risk, but will use the files... -_-), But I thought wouldn't be bad to use some sql, db etc...
// another opinion on using sql with javascript: https://stackoverflow.com/a/49237650
// Still though, I'll firstly complete the javascript back-end path first. I don't need some database thing for a while. And can start to do some things/applications with node.js




// ---------------------------------------------------------------------------------------------
//
// ------------------------------------------- FUNCTIONS ---------------------------------------


// ---------------------- GRID LOGIC -------------------
function containerCreate() {
	
	// starts from top left
	for (i = 0; i < gridSize; ++i)
	{
		let tmpArray = []
		for (k = 0; k < gridSize; ++k)
		{
			let tmpPixel = document.createElement('div');
			tmpPixel.classList.add("pixel");
			tmpPixel.style.height = `100%`;
			tmpPixel.style.width = `${pixelSize}px`;

			// this works while sliding the cursor through the container...
			tmpPixel.addEventListener('mouseenter',
				() => {
					if (mouseDown)
					{
						// this.style.backgroundColor = currentColor;
						tmpPixel.style.backgroundColor = currentColor;
					}
				}
			);

			// this works for single clicks
			tmpPixel.addEventListener('mousedown',
				() => {
					tmpPixel.style.backgroundColor = currentColor;
				}
			);

			tmpArray.push(tmpPixel);
		}
		pixelArray.push(tmpArray);
	}
}


function containerPlaceDivs() {
	for (i = 0; i < gridSize; ++i)
	{
		let rowDiv = document.createElement('div');
		rowDiv.classList.add("row-pixel");
		rowDiv.style.height = `${pixelSize}px`;
		container.appendChild(rowDiv);
		let lastCreatedRow = document.querySelector(`.container > div:nth-of-type(${i + 1})`);   
		for (k = 0; k < gridSize; ++k)
		{
			lastCreatedRow.appendChild(pixelArray[i][k]);
		}
	}
}


function containerClean() {
	pixelArray = [];
	container.innerHTML == '';
	while (container.firstChild)
		container.removeChild(container.lastChild);
}

function createDrawArea() {
	pixelSize = getPixelSize();

	containerClean();
	containerCreate();
	console.log();
	containerPlaceDivs();
}

// ---------------------- COLOR/COLOUR ----------------
function updateColor() {
	let rgb = hexToRgb(colorInput.value);
	let rgb_with_transparency = rgb.slice(0, -1) + ', ' + transparencyInput.value / 100 + ')';
	console.log(rgb_with_transparency);
	// currentColor = colorInput.value;
	currentColor = rgb_with_transparency;
}

function updateGridArea() {
	console.log('asdf');
	if (gridSizeInput.value < 16)
		gridSizeInput.value = 16;
	if (gridSizeInput.value > 40)
		gridSizeInput.value = 40;
	updateColor();
	gridSize = gridSizeInput.value;;
	createDrawArea();
}


createDrawArea();


// when I searched for str to int mdn... parseInt() can convert the hex to decimal ...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
function hexToRgb(hex_color) {

	// console.log(typeof hex_color);

	let hexRed = hex_color[1] + hex_color[2];
	let hexGreen = hex_color[3] + hex_color[4];
	let hexBlue = hex_color[5] + hex_color[6];

	// console.log(hexRed, hexGreen, hexBlue);

	function hexToDecimal(number) {
		
		function charToNum(num) {
			switch(num) {
				case 'a':
					return 10;
					break;
				case 'b':
					return 11;
					break;
				case 'c':
					return 12;
					break;
				case 'd':
					return 13;
					break;
				case 'e':
					return 14;
					break;
				case 'f':
					return 15;
					break;
				default:
					return parseInt(num);
			}	
		}
		return (16 * charToNum(number[0]))  + charToNum(number[1]);
	}

	rgb = `rgb(${hexToDecimal(hexRed)}, ${hexToDecimal(hexGreen)}, ${hexToDecimal(hexBlue)})`;
	return rgb;
}


function floatTo255(number) {
	return (number * 255).toFixed();
}


