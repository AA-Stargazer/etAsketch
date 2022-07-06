let gridSize = 16;
let pixelArray = []; // row div's not inside this. But from the 2nd dimensional array's index, you can reach the row div from document
let i, k;
let currentColor = 'red';

let container = document.querySelector('.container');

let pixelSize = getPixelSize();

function getPixelSize() {
	return container.offsetHeight / gridSize
}


let mouseDown = false;
document.onmousedown = () => { mouseDown = true }
document.onmouseup = () => { mouseDown = false }

let colorInput = document.querySelector('#colorInput');



// TODO row number not updated along with gridSize!!!

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color 
// gotta learn those 'this', and 'event', also 'event.target' looks useful too...
colorInput.addEventListener('change', updateColor);



// this supporting the browsers are a bit sensitive I guess. But, hope at least when I made my own color picker, can work in IE, because in Asia, explorer is looks pretty popular. And wouldn't want  my profile project to be looks weird/bad...



// ---------------------------------------------------------------------------------------------
//
// ------------------------------------------- FUNCTIONS ---------------------------------------


// ---------------------- GRID LOGIC -------------------
function containerCreate() {
	let tmpArray = []
	
	// starts from top left
	for (i = 0; i < gridSize; ++i)
	{
		for (k = 0; k < gridSize; ++k)
		{
			// TODO add eventlistener, to change the color by click etc...
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
			tmpPixel.addEventListener('click',
				() => {
					tmpPixel.style.backgroundColor = currentColor;
				}
			);


			tmpArray.push(tmpPixel);


		}
		pixelArray.push(tmpArray);
		tmpArray = [];
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

containerCreate();
console.log(pixelArray);
containerPlaceDivs();


// ---------------------- COLOR -----------------------
function updateColor() {
	currentColor = colorInput.value;
}











