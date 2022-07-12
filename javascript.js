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

// as I saw here while to search for running python in js https://stackoverflow.com/a/13175665
// Now I'm learning something called AJAX (finally, I can scrape the websites better I guess :D)
// https://www.w3schools.com/js/js_ajax_intro.asp
// -- // AJAX is a developer's dream, because you can:
// -- // 
// -- //     Read data from a web server - after the page has loaded
// -- //     Update a web page without reloading the page
// -- //     Send data to a web server - in the background

// I wasn't sure but if it'll be there until late half 21st century, then it would worth it https://www.reddit.com/r/ruby/comments/lywt2z/is_ruby_rails_still_worth_learning_in_2021_and_is/
// python has too many coder (users are spreadout, not depends on the programming language but popularity, relaibility etc...), the risk almost same for me... Just require me (as I have already should do it like) to believe and keep working...


// Ajax links I'm going through in order (up to some point)
// https://www.w3schools.com/js/js_ajax_intro.asp
// https://www.w3schools.com/js/js_ajax_http.asp
// - // The keystone of AJAX is the XMLHttpRequest object.
// - //     Create an XMLHttpRequest object
// - //     Define a callback function
// - //     Open the XMLHttpRequest object
// - //     Send a Request to a server
// -- // For security reasons, modern browsers do not allow access across domains.
// -- // XMLHttpRequest Object Methods
// -- // XMLHttpRequest Object Properties 
// -- // ...
// https://www.rubyguides.com/2019/03/rails-ajax/ (this is maybe later to me...)
// https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started (finally, I can understand the onready, .open, .ready )
// -- // hmm, this readState, we can do loading pages etc with if statements and global values (for asynchronous, you know, like keepiing the images for example in rock-paper-scissors)  inside the file..







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





// ---------------------------------------------------------------------------------------------
//
// ------------------------------------------- AJAX --------------------------------------------

let ajaxButton = document.querySelector('#ajax-try');

ajaxButton.addEventListener('click', ajaxy);

// 2022-07-12
// when I clicked to the button, error in the console: "" Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at file:///home/arc_dust/theodinproject/etAsketch/array_to_image.py. (Reason: CORS request not http). (Learn More). ""
// In the '(Learn More)'   (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp), It directly got section for local file    https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp:
// -- // Loading a local file
// -- // 
// -- // Local files from the same directory and subdirectories were historically treated as being from the same origin. This meant that a file and all its resources could be loaded from a local directory or subdirectory during testing, without triggering a CORS error.
// -- // 
// -- // Unfortunately this had security implications, as noted in this advisory: CVE-2019-11730. Many browsers, including Firefox and Chrome, now treat all local files as having opaque origins (by default). As a result, loading a local file with included local resources will now result in CORS errors.
// -- // 
// -- // Developers who need to perform local testing should now set up a local server. As all files are served from the same scheme and domain (localhost) they all have the same origin, and do not trigger cross-origin errors.
// -- // 
// -- // Note: This change is in line with the URL specification, which leaves the origin behavior for files to the implementation, but recommends that file origins are treated as opaque if in doubt.






function ajaxy() {
	if (window.XMLHttpRequest)
		httpRequest = new XMLHttpRequest();
	else if (window.ActiveXObject)
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	
	httpRequest.onreadstatechange = function() {
	}

	httpRequest.open('GET', './array_to_image.py', true);
	httpRequest.send()


	if (httpRequest.readyState == XMLHttpRequest.DONE) {
	
		console.log(httpRequest.readyState)
		if (httpRequest.status == 200) {
			// perfect
			console.log(httpRequest.responseText);
		}
		else {
			// whoopsie, there was a problem...
		}
		
	}
	else {
		// Not yet
	}

}








