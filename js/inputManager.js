var mouseUp = true, mouse = new THREE.Vector2();
var clickPosition = new THREE.Vector2();
var draggedVector = new THREE.Vector2();

export function getMousePosition(event, canvas)
{
    mouse.x = ( event.offsetX / canvas.clientWidth) * 2 - 1;
    mouse.y = - ( event.offsetY / canvas.clientHeight) * 2 + 1;

    return mouse;
}

// figure out which corner of the screen was clicked
export function getCornerClicked(mouse)
{
    if(mouse.x < 0)
    {
        if(mouse.y > 0)
        {
            //top left
            return 0;
        }
        else
        {
            // bottom left
            return 2;
        }
    }
    else
    {
        if(mouse.y > 0)
        {
            //top right
            return 1;
        }
        else
        {
            // bottom right
            return 3;
        }
    }
}

export function screenToCameraSpace(mouse, cameraIndex)
{
    var newMouse = new THREE.Vector2();

//NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin

    // clicked on the left side of the screen
    if(cameraIndex == 0 || cameraIndex == 2)
    {
        newMouse.x = (((mouse.x + 1) * (2)) / (1)) - 1;
    }
    // clicked on the right side
    else
    {
        newMouse.x = mouse.x * 2 - 1;
    }

    // clicked on the top part of the screen
    if(cameraIndex == 0 || cameraIndex == 1)
    {
        newMouse.y = mouse.y * 2 - 1;
    }
    // clicked on the bottom part
    else
    {
        newMouse.y = (((mouse.y + 1) * (2)) / (1)) - 1;
    }

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