// I'll just stick with the curriculum of TOP, when the time comes, I can do the things I want.... I must move at the moment...

let gridSize = 16;
let pixelArray = []; // row div's not inside this. But from the 2nd dimensional array's index, you can reach the row div from document
let i, k;

let container = document.querySelector('.container');

let pixelSize = getPixelSize();

function getPixelSize() {
	return container.offsetHeight / gridSize
}



let mouseDown = false;
// document.onmousedown = () => { mouseDown = true }
// document.onmouseup = () => { mouseDown = false }
document.body.onmousedown = () => { mouseDown = true }
document.body.onmouseup = () => { mouseDown = false }



let colorInput = document.querySelector('#color-input');
let gridSizeInput = document.querySelector('#grid-size-input');
let transparencyInput = document.querySelector('#transparency-input');

let bgColorInput = document.querySelector('.bg-color-input');
let gridBox = document.querySelector('.grid-box');


let colorTextOfGridBox = getComputedStyle(container).getPropertyValue('background-color');
// just hex colors affects, at least it was for this...
bgColorInput.value = rgbToHex(getComputedStyle(gridBox).getPropertyValue('background-color'));

// TODO row number not updated along with gridSize!!!

colorInput.addEventListener('change', updateColor);
transparencyInput.addEventListener('change', updateColor);
transparencyInput.value = 100;

bgColorInput.addEventListener('change', (event) => {
	gridBox.style.backgroundColor = event.target.value;
});

gridSizeInput.value = gridSize;
gridSizeInput.addEventListener('change', updateGridArea);


let currentColor = colorInput.value;



// I wasn't sure but if it'll be there until late half 21st century, then it would worth it https://www.reddit.com/r/ruby/comments/lywt2z/is_ruby_rails_still_worth_learning_in_2021_and_is/
// python has too many coder (users are spreadout, not depends on the programming language but popularity, relaibility etc...), the risk almost same for me... Just require me (as I have already should do it like) to believe and keep working...


// NOTE transparency for background is unnecessary I guess, cuz, if we create transparency for background, then the pages' background color will be the main background color and the pixel's color will be mixed of the container's backgrounud color and the div's color itself depending of both ones transparency... Well we can also create few layers etc like we done for settings background color/box-shadow etc... But just adding background color should be enough for this stage I believe...



let colorPalette = document.querySelector('.color-palette');
let sketchSettingsDiv = document.querySelector('.sketch-settings');
let backgroundSettingsDiv = document.querySelector('.background-settings');

const regexNumber = /([\.\d])+/g;
// hmm but for the colorInput, we didn't need getComputerStyle... But we're getting the value that set from the css...
let _colorPaletteTransitionDuration = getComputedStyle(colorPalette).getPropertyValue('transition-duration');
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
// -- str.match() will return the same result as RegExp.exec().
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
let colorPaletteTransitionDuration = parseInt(_colorPaletteTransitionDuration.match(regexNumber)[0]);
let preventWindow = document.querySelector(".prevent-window");


let changeColorSectionButton = document.querySelector('.change-settings-type button');

// // after click, when mouse was still on the button and not move, it wasn't triggering the :hover in the css. So I'm trying somethings like this...
// // when I searched for it, I found .focus(), then need to undo the .focus(), peoples were refering the .blur() with jquery, but looks like it's works normally in javasscript too
// // https://www.w3schools.com/jsref/met_html_blur.asp
// // (same for 'mouseover', 'mouseenter')
// changeColorSectionButton.addEventListener('mouseover', (event) => {
// 	event.target.focus()
// 	setTimeout(
// 		() => {
// 			event.target.blur();
// 		}
// 		, 1000
// 	);
// });
// -------- But I still can't get a result like I want, so not too much thing is changed, but at least can blur the focus after turning the colorPalette...


changeColorSectionButton.addEventListener("click", turnPalette);
function turnPalette() {
	let colorPaletteTitle = document.querySelector('.color-palette-title');

	timeToSleep = ((colorPaletteTransitionDuration / 2) * 1000) + 300;

	if (colorPaletteTitle.innerText == "Sketch Settings")
	{
		colorPalette.style.transform = 'perspective(20cm) rotateY(90deg)';
		preventWindow.style.zIndex = '1000';
		setTimeout(
			() => {
				sketchSettingsDiv.style.display = 'none';
				backgroundSettingsDiv.style.display = 'flex';
				colorPalette.style.transform = 'perspective(20cm) rotateY(180deg)';

				colorPaletteTitle.innerText = " BG Settings ";
				colorPaletteTitle.style.transform = "rotateY(180deg)";
				backgroundSettingsDiv.style.transform = "rotateY(180deg)";
				changeColorSectionButton.style.transform = "rotateY(180deg)";

				changeColorSectionButton.innerText = 'Open Sketch Settings';

				changeColorSectionButton.blur()
			}
			, timeToSleep
		);
		setTimeout(
			() => {
				preventWindow.style.zIndex = '-1000';
			}
			, colorPaletteTransitionDuration + 400
		);

	}
	// ok, for such a situation, we shouldn't include leading and trailing spaces...
	else if (colorPaletteTitle.innerText == "BG Settings")
	{
		colorPalette.style.transform = 'perspective(20cm) rotateY(90deg)';
		preventWindow.style.zIndex = '1000';
		setTimeout(
			() => {
				sketchSettingsDiv.style.display = 'flex';
				backgroundSettingsDiv.style.display = 'none';
				colorPalette.style.transform = 'perspective(20cm) rotateY(0deg)';

				colorPaletteTitle.innerText = " Sketch Settings ";
				colorPaletteTitle.style.transform = "rotateY(0deg)";
				backgroundSettingsDiv.style.transform = "rotateY(0deg)";
				changeColorSectionButton.style.transform = "rotateY(0deg)";

				changeColorSectionButton.innerText = 'Open BG Settings';

				changeColorSectionButton.blur()

			}
			, timeToSleep
		);
		setTimeout(
			() => {
				preventWindow.style.zIndex = '-1000';
			}
			, colorPaletteTransitionDuration + 400
		);

	}

}



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


// hmm, I wrote a whole logic, but still can use some ready-to-use functions in javascript I guess, like so:
// -- https://css-tricks.com/converting-color-spaces-in-javascript/#aa-rgb-to-hex  (also tried this but didn't work as I expected
// -- https://stackoverflow.com/a/57805
// but we also have parseInt
	// pff, toString(), parseInt() etc not works. toString just works up to 16 I believe... So I gotta write this too, not too much thing changed...
// works up to 255
function rgbToHex(rgb_color) {

	let numberRegex = /[\d\.]+/g;

	let rgbArray = rgb_color.match(numberRegex);
	
	let r = parseInt(rgbArray[0]);
	let g = parseInt(rgbArray[1]);
	let b = parseInt(rgbArray[2]);

	// pff, toString(), parseInt() etc not works as I expected. toString just works up to 16 I believe... So I gotta write this too, not too much thing changed...
	

	function decimalToHex(number) {
			
		function numToCharNum(num) {
			switch(num) {
				case 10:
					return 'a';
					break;
				case 11:
					return 'b';
					break;
				case 12:
					return 'c';
					break;
				case 13:
					return 'd';
					break;
				case 14:
					return 'e';
					break;
				case 15:
					return 'f';
					break;
				default:
					return `${num}`;
			}	
		}
		if (number > 16) {
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
			division = Math.floor(number / 16);
			left = `${numToCharNum(division)}`;
			right = `${numToCharNum(number - division * 16)}`;
			return left + right;
		}
		else
		{
			return '0' + `${numToCharNum(number)}`;
		}
	}
	
	r = decimalToHex(r);
	g = decimalToHex(g);
	b = decimalToHex(b);


  return "#" + r + g + b;
}





