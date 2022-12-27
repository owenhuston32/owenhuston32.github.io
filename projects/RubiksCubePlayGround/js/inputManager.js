var mouseUp = true, mouse = new THREE.Vector2();
var clickPosition = new THREE.Vector2();
var draggedVector = new THREE.Vector2();

export function getMousePosition(event, canvas)
{
    mouse.x = ( event.offsetX / canvas.clientWidth) * 2 - 1;
    mouse.y = - ( event.offsetY / canvas.clientHeight) * 2 + 1;

    return mouse;
}

export function screenToCameraSpace(mouse, cameraIndex)
{
    var newMouse = new THREE.Vector2();

//NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin

    const newMax = 1, newMin = -1;
    var oldMax, oldMin;

    // left side of the screen
    if(cameraIndex == 0 || cameraIndex == 2)
    {
        oldMax = 0;
        oldMin = -1;
    }
    else
    {
        oldMax = 1;
        oldMin = 0;
    }

    newMouse.x = (((mouse.x - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;

    // top side of the screen
    if(cameraIndex == 0 || cameraIndex == 1)
    {
        oldMax = 1;
        oldMin = 0;
    }
    else
    {
        oldMax = 0;
        oldMin = -1;
    }

    newMouse.y = (((mouse.y - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;

    return newMouse;

}

export function onMouseDown(event, canvas)
{
    mouseUp = false;
    event.preventDefault();

    mouse = getMousePosition(event, canvas);

    clickPosition.x = mouse.x;
    clickPosition.y = mouse.y;

    return mouse;
}

export function onMouseMove(event, canvas)
{
    if (mouseUp) { return; }
    
    mouse = getMousePosition(event, canvas);

    draggedVector.x = mouse.x - clickPosition.x;
    draggedVector.y = mouse.y - clickPosition.y;

    return draggedVector;
}

export function onMouseUp()
{
    mouseUp = true;
}