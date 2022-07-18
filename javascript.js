// I'll just stick with the curriculum of TOP, when the time comes, I can do the things I want.... I must move at the moment...


// he finished hilariously xD: https://stackoverflow.com/a/52129332   (but I was there for my python httpserver giving 304, anyway, got the reason why it's throwen... could have been look a tthe http codes though....)
// -- // A server should send a 304 Not Modified reply if the client sent a conditional request, like one having an If-Modified-Since header. This makes sense if the client already has a cached version of the page, and wants to avoid downloading the content if he already has the newest version of it.
// -- // 
// -- // In this case, the website seems to send a 304 to certain kinds of clients, as it seems: ones where the User-Agent seems to indicate automation (which is true, in your case).
// -- // 
// -- // The server should instead send a 4xx error code, probably a 403 Forbidden, but likely uses a 304 in order to throw bot writers off the right track and make them come to StackOverflow.
// instead of local-host:8000, http://0.0.0.0:8000/



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







// I wasn't sure but if it'll be there until late half 21st century, then it would worth it https://www.reddit.com/r/ruby/comments/lywt2z/is_ruby_rails_still_worth_learning_in_2021_and_is/
// python has too many coder (users are spreadout, not depends on the programming language but popularity, relaibility etc...), the risk almost same for me... Just require me (as I have already should do it like) to believe and keep working...


// NOTE transparency for background is unnecessary I guess, cuz, if we create transparency for background, then the pages' background color will be the main background color and the pixel's color will be mixed of the container's backgrounud color and the div's color itself depending of both ones transparency... Well we can also create few layers etc like we done for settings background color/box-shadow etc... But just adding background color should be enough for this stage I believe...





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

