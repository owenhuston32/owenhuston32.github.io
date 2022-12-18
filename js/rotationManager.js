var rotationObj, rotationAxis, rotationAxisChar;
var rotationSpeed = 6;
var prevDrag = new THREE.Vector2();
var moveHorizontal = false, moveVertical = false;
var rightPivot;


export function initializePivots(newRightPivot)
{
    rightPivot = newRightPivot;
}

export function rotateObject(obj, draggedVector)
{
    // if we arent moving in a direction yet
    if(!moveHorizontal && !moveVertical)
    {
        if(Math.abs(draggedVector.x) > 0.05)
        {
            rotationObj = obj.parent;
            moveHorizontal = true;
        }
        else if(Math.abs(draggedVector.y) > 0.05)
        {
            rotationObj = rightPivot;
            moveVertical = true;
        }
    }
    else if(moveVertical)
    {
        rotateVertical(rotationObj, draggedVector);
    }
    else
    {
        rotateHorizonal(rotationObj, draggedVector);
    }

    prevDrag.x = draggedVector.x;
    prevDrag.y = draggedVector.y;
}

export function stopRotating()
{

    // rads to degrees = rad * 180 / PI
    var degrees = rotationAxis * 180 / Math.PI;

    // round to nearest 90 degree
    degrees = Math.round(degrees / 90) * 90;

    if(rotationAxisChar === 'x')
    {
        rotationObj.rotation.x = degrees * Math.PI / 180;
    }
    else if(rotationAxisChar === 'y')
    {
        rotationObj.rotation.y = degrees * Math.PI / 180;
    }
    else if(rotationAxisChar === 'z')
    {
        rotationObj.rotation.z = degrees * Math.PI / 180;
    }

    moveHorizontal = false;
    moveVertical = false;

}

function rotateVertical(obj, draggedVector)
{
    //if(obj.name === "FrontParent")
    //{
        rotateFrontVertical(obj, draggedVector);
    //}

}
function rotateHorizonal(obj, draggedVector)
{
    if(obj.name === "FrontParent")
    {
        rotateFrontHorizontal(obj, draggedVector);
    }
}

function rotateFrontVertical(obj, draggedVector)
{
    rotationAxis = obj.rotation.x;
    rotationAxisChar = 'x';

    var distance = draggedVector.y - prevDrag.y;
    console.log("drag: " + draggedVector.y 
    + "prev" + prevDrag.y);

    obj.rotation.x += distance * rotationSpeed;
}

function rotateFrontHorizontal(obj, draggedVector)
{
    rotationAxis = obj.rotation.z;
    rotationAxisChar = 'z';
    if(draggedVector.x - prevDrag.x > 0)
    {
        obj.rotation.z -= rotationSpeed;
    }
    else
    {
        obj.rotation.z += rotationSpeed;
    }
}