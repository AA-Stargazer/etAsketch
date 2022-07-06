// I'll use ready-to-use collor pick library etc. Other wise it'll take a lot of time to me. Also even w3schools using the normal html input-color for custom colors. (Or without using any library (or how ever it's called in js), llike w3schools, we determine some colors and if the user wants, he can use the html-input. hmmmm. But library would be an experience for me. Also if I can have it inside my local repository, why not to use?
// I wonder if I can make a colorpicker (the ones ilke that you slide your mouse etc...). I mean, we'll just take the mouse location etc (gotta have a some research for this...) inside the box, update the box value, and update the color image inside other box, put a ball in it, also let it slide with the mouse and update the vaules with that. I mean, this would be a great experience and understanding for me, but what it would take me to do?
// for our colorpicker, we can have some ideas from the webpage I found when I searched for the libraries etc, https://code.tutsplus.com/articles/best-free-and-open-source-javascript-color-pickers--cms-37729


// Man, I'm not sure I should do this. I want it but after drag and drop, we still have something to do with rgb, hex things to update along with drag, despite providing some fixed colors. I should leave this to later, but also I don't know if I'll do this later if I don't do it now.
// I'll prepare some documentation, I mean, list of links. (no using I or You for the to future is better I guess...) When come back, will work on custom color palette... Like this, will be both turning back and refreshing my knowledge etc a little bit, and will be at where I should be, (in the later-middle of the back-end of TOP probably.)
// Another thing is, I think it's ok to have some tutorials like I'll link. Because otherwise we'd have to read the whole documentation, and this is not something I can do until some point in my proffesional life as I need to produce things. But step by step, as the time passes, I get along with the most part of the documentation...

// Good documentation for later makes the things easier for later...

// as a start (these are at least for starting to understanding the events a little bit...)
// Draging: 1 - https://www.w3schools.com/howto/howto_js_draggable.asp					(regular one as always. gg)
// 			2 - https://www.kirupa.com/html5/drag.htm									(really good one I've encountered yet)  (but might need some adjustments. Try to click-hold, drag the cursor out of the container, and then release the button outside of the container, and move the cursor inside the container again... Probablly adding  some mouseup events directly to the body might make this a bit better.)
// 			3 - https://interactjs.io/ 													(this got some interesting stuffs)
// 			4 - https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/	(different perspective)
// 			5 - https://devdojo.com/tnylea/how-to-drag-an-element-using-javascript 		(meh, but not bad...)

// Definitely as always, firstly try to find things on your own. And then went to the main documentations ilke in MDN. But would suggest firstly look at first 2 link above. 
// Also sometimes, might not be able to find some links as we did, so having some links here is another pros...
// Also can take a picture of the page in the webarchive. (or you can download, even more guarantee)... If there isn't something like suing and deleting the page from the waybackmachine (weebarchive), then it's awesome. It even has browser extensions to make things easier, But better to just go inside the webarchive website and save in there!! . Would love to donate, but this is later as I start to earn more and live on my own...
// https://medium.com/wednesday-genius/how-to-remove-your-website-from-the-internet-archive-2020-c4d89c147546 	(hope some useful things won't wiped out)

// Draging, parts from documentation:
// 		    1 - https://developer.mozilla.org/en-US/docs/Web/Events      (Firstly, you can find the events here, touchend/touchstart/touchmove/mousedown/mouseup/mousemove (which inside kirupa.com...), and these is a section 'event index' -> gestures/touch/mouse/pointer/Drag'n'drop, Wheel          ...)
// Well, when you interract with the 1st one...
// 			2 - https://www.w3schools.com/jsref/event_preventdefault.asp
// 			3 - https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate3d

//  I also saw some video-tutorials etc. Readig things is better. Video is last option after reaaly some time passed and stuck at some things...

// -----------------------------------------------------------------------------------------------------------------------
// will use ready-to-use for now..., or just htmls input-color



// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
// https://stackoverflow.com/questions/34784762/input-type-color-not-working-in-ie-11   but runing js in the explorer also ai bit ...


let gridSize = 16;
let pixelArray = []; // row div's not inside this. But from the 2nd dimensional array's index, you can reach the row div from document
let i, k;
let currentColor;

let container = document.querySelector('.container');

let pixelSize = getPixelSize();

function getPixelSize() {
	return container.offsetHeight / gridSize
}


// maybe we could do it without the Array. But anyway, this is also a bit more guarantee... (But also more ram consuming...)
// also could use wrap as we'll use flex...but this is good... 
//
//NOTE:
// flex-grow has no effect on this element since it’s not a flex item.
// Try adding display:flex or display:inline-flex to the element’s parent
// gotta add things to the row divs...  ( in the containerPlaceDivs, we're creating the row divs there)
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
			// // despite this height and width not added, we can create a class (or directly use class 'pixel') and just add it, except the ones that needed to be adjusted like height etc...
			// Will adjust the height and width from the row-div and adjust the height to 100%; width still be...
			tmpPixel.style.height = `100%`;
			// console.log(container.offsetHeight)
			tmpPixel.style.width = `${pixelSize}px`;
			// tmpPixel.style.flexGrow = '1';
			// tmpPixel.style.display = 'flex';
			// tmpPixel.style.backgroundColor = 'red';
			tmpArray.push(tmpPixel);
		}
		pixelArray.push(tmpArray);
		tmpArray = [];
	}
}


// actually could do inside the containerCreate... anyway, a bit better to understand...
function containerPlaceDivs() {
	for (i = 0; i < gridSize; ++i)
	{
		let rowDiv = document.createElement('div');
		rowDiv.classList.add("row-pixel");
		rowDiv.style.height = `${pixelSize}px`;
		container.appendChild(rowDiv);
		let lastCreatedRow = document.querySelector(`.container > div:nth-of-type(${i + 1})`);   
		// could use this, but anyway... https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector
		for (k = 0; k < gridSize; ++k)
		{
			// console.log(i);
			lastCreatedRow.appendChild(pixelArray[i][k]);
		}
	}
}


function containerClean() {
	let childrenElements = container.children;
	for (i = 0; i < childrenElements.length; ++i)
	{
		container.removeChild(childrenElements[i]);
	}
	pixelArray = [];
}

containerCreate();
console.log(pixelArray);
// setTimeout(
// 	() => {
// 		containerPlaceDivs();
// 	}
// 	,1000
// );
containerPlaceDivs();

