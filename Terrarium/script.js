// Looping through all the
for(i = 1; i < 15; i++) {
    dragElement(document.getElementById('plant' + i));
    document.getElementById('plant' + i).ondblclick = bringToFront;
}

//Example of a closure:
function dragElement(terrariumElement) {
    //Setting 4 positions for the screen positioning
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    terrariumElement.onpointerdown = pointerDrag; // Setting the element when clicked to pointerDrag 
    
    // Acts as a pointer on the display for where the element is being dragged to
    function pointerDrag(e) {
        e.preventDefault();
        console.log(e);
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointermove = elementDrag;//Calls the inner function to actually move the individually dragged elements
        document.onpointerup = stopElementDrag;//Calls the inner function to stop the element from dragging after the mouse has stopped being pressed down 
    }
    // Moves trhe elements by changing their style based on its new positioning
    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        console.log(pos1, pos2, pos3, pos4);
        terrariumElement.style.top = terrariumElement.offsetTop - pos2 + 'px';
        terrariumElement.style.left = terrariumElement.offsetLeft - pos1 + 'px';
    }
    // Setting the pointer values to null to prevent memory leaks
    function stopElementDrag(e) {
        document.onpointerup = null;
        document.onpointermove = null;
    }
}

// Double clicking an element to bring it forward
function bringToFront() {
    // Gets the max zIndex value from the elements in the plant class and compares it to the current element's zIndex
    let maxZIndex = Math.max(...Array.from(document.querySelectorAll('.plant'), el => parseFloat(getComputedStyle(el).zIndex) || 0));
    if(maxZIndex > this.style.zIndex){ // If th zIndex is smaller than the max bring it to the front by setting its value to the max + 1;
        this.style.zIndex = maxZIndex + 1;
    }  
}
