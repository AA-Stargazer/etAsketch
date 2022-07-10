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


// TODO row number not updated along with gridSize!!!

colorInput.addEventListener('change', updateColor);

gridSizeInput.value = gridSize;
gridSizeInput.addEventListener('change', updateGridArea);

let currentColor = colorInput.value;



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


			// TODO if you can, or could be done... 
			// https://www.geeksforgeeks.org/event-delegation-in-javascript/
			// https://javascript.info/event-delegation
			// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation
			// I was thinking something like,  take the relative mouse location etc and affect to the particular element which the mouse on.... but event-delegation looks pretty good and better than what I could do with that relative-mouse location (also could be slow too...)



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
	currentColor = colorInput.value;
}

function updateGridArea() {
	gridSize = gridSizeInput.value;
	createDrawArea();
}


createDrawArea();






