// I'll just stick with the curriculum of TOP, when the time comes, I can do the things I want.... I must move at the moment...



// TODO add eraser
// TODO add button for sketch to act like mouse is always held down, so it can be like 'etch a sketch'
// NOTE no need to everything we see I think, we got decent enough of things, and gotta move on...
// NOTE don't add some opposite or crucial buttons on and on like eraser next to reset the grid...
// -- UPDATE TO THE NOTE: we don't have too much space and I believe the sketch-settings has enough settings in the front, maybe a button to open another div for some buttons for sketch settings, so we can carry some buttons to there... But this is later...



// -----------------------------------------------------------------------
let gridSize = 16;
let pixelArray = []; // row div's not inside this. But from the 2nd dimensional array's index, you can reach the row div from document
let i, k;
let eraserOn = false;
let sketchHoldDown = true;

let container = document.querySelector('.container');

let pixelSize = getPixelSize();

function getPixelSize() {
	return container.offsetHeight / gridSize
}



let mouseDown = false;
document.body.onmousedown = () => { mouseDown = true }
document.body.onmouseup = () => { mouseDown = false }



let colorInput = document.querySelector('#color-input');
let gridSizeInput = document.querySelector('#grid-size-input');
let gridSizeInputNumber = document.querySelector('#grid-size-input-number');
let transparencyInput = document.querySelector('#transparency-input');
let transparencyInputNumber = document.querySelector('#transparency-input-number');

let bgColorInput = document.querySelector('.bg-color-input');
let gridBox = document.querySelector('.grid-box');



let colorTextOfGridBox = getComputedStyle(container).getPropertyValue('background-color');
// just hex colors affects, at least it was for this...
bgColorInput.value = rgbToHex(getComputedStyle(gridBox).getPropertyValue('background-color'));

// TODO row number not updated along with gridSize!!!

colorInput.addEventListener('change', updateColor);
let currentColor = colorInput.value;

transparencyInput.value = 100;
transparencyInput.addEventListener('input', (event) => {
	updateColor();
	transparencyInputNumber.value = event.target.value;
});
transparencyInputNumber.addEventListener('input', () => {
	updateColor();
	transparencyInput.value = event.target.value;
});
transparencyInputNumber.value = 100;

bgColorInput.addEventListener('change', (event) => {
	gridBox.style.backgroundColor = event.target.value;
});


gridSizeInput.value = gridSize;
gridSizeInput.addEventListener('input', (event) => {
	updateGridArea();
	gridSizeInputNumber.value = event.target.value;
});
// I saw  input in https://codepen.io/tippingpointdev/pen/bGgLqLY, it's more responsive and changes concurrently. But for this particular gridSizeInput, for example you'll write 18 from scrath, with 'input', when you press 1, it will update to min value as I wrote the if statement. That's why this is 'change', so program can wait user to finish it's the input...
gridSizeInputNumber.addEventListener('change', ()=> {
	updateGridArea();
	gridSizeInput.value = event.target.value;
});
gridSizeInputNumber.value = gridSize;





let colorPalette = document.querySelector('.color-palette');
let sketchSettingsDiv = document.querySelector('.sketch-settings');
let backgroundSettingsDiv = document.querySelector('.background-settings');

const regexNumber = /([\.\d])+/g;
let _colorPaletteTransitionDuration = getComputedStyle(colorPalette).getPropertyValue('transition-duration');
let colorPaletteTransitionDuration = parseInt(_colorPaletteTransitionDuration.match(regexNumber)[0]);
let preventWindow = document.querySelector(".prevent-window");


let changeColorSectionButton = document.querySelector('.change-settings-type button');

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


// --------------------------------------------------------------------------------------------
let resetButton = document.querySelector("#reset-grid");
resetButton.addEventListener('click', () => {
	createDrawArea();	
});



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
				(event) => {

					if (sketchHoldDown)
					{
						if (eraserOn)
							tmpPixel.style.background = 'none';
						else
							tmpPixel.style.backgroundColor = currentColor;
					}
					else
					{
						if (mouseDown)
						{
							if (eraserOn)
								tmpPixel.style.background = 'none';
							else
								tmpPixel.style.backgroundColor = currentColor;
						}
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
	if (transparencyInputNumber.value > 100)
		transparencyInputNumber.value = 100;
	else if (transparencyInputNumber.value < 0)
		transparencyInputNumber.value = 0;

	let rgb = hexToRgb(colorInput.value);
	let rgb_with_transparency = rgb.slice(0, -1) + ', ' + transparencyInput.value / 100 + ')';
	console.log(rgb_with_transparency);
	// currentColor = colorInput.value;
	currentColor = rgb_with_transparency;
}


function updateGridArea() {
	console.log('asdf');
	if (gridSizeInputNumber.value < 16)
	{
		gridSizeInput.value = 16;
		gridSizeInputNumber.value = 16;
	}
	if (gridSizeInputNumber.value > 40)
	{
		gridSizeInput.value = 40;
		gridSizeInputNumber.value = 40;
	}
	updateColor();
	gridSize = gridSizeInput.value;;
	createDrawArea();
}


createDrawArea();


function hexToRgb(hex_color) {


	let hexRed = hex_color[1] + hex_color[2];
	let hexGreen = hex_color[3] + hex_color[4];
	let hexBlue = hex_color[5] + hex_color[6];


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


// works up to 255
function rgbToHex(rgb_color) {

	let numberRegex = /[\d\.]+/g;

	let rgbArray = rgb_color.match(numberRegex);
	
	let r = parseInt(rgbArray[0]);
	let g = parseInt(rgbArray[1]);
	let b = parseInt(rgbArray[2]);

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





