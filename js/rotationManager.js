import * as pivotManager from './pivotManager.js';
import * as objectManager from './objectManager.js';
import * as sceneManager from './sceneManager.js';

var rotationObj, rotationAxis, rotationAxisChar;
var rotationSpeed = 6;
var prevDrag = new THREE.Vector2();
var moveHorizontal = false, moveVertical = false;

export function rotateObject(obj, draggedVector)
{
    // if we arent moving in a direction yet
    if(!moveHorizontal && !moveVertical)
    {
        if(Math.abs(draggedVector.x) > 0.05)
        {
            rotationObj = pivotManager.getFrontPivot();
            pivotManager.changeParent(objectManager.getCube(), rotationObj, "Front");
            moveHorizontal = true;
        }
        else if(Math.abs(draggedVector.y) > 0.05)
        {
            rotationObj = pivotManager.getRightPivot();
            pivotManager.changeParent(objectManager.getCube(), rotationObj, "Right");
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
        pivotManager.deactivateSide(objectManager.getCube(), rotationObj);
    }
    else if(rotationAxisChar === 'y')
    {
        rotationObj.rotation.y = degrees * Math.PI / 180;
        pivotManager.deactivateSide(objectManager.getCube(), rotationObj);
    }
    else if(rotationAxisChar === 'z')
    {
        rotationObj.rotation.z = degrees * Math.PI / 180;
        pivotManager.deactivateSide(objectManager.getCube(), rotationObj);
    }

    moveHorizontal = false;
    moveVertical = false;

}

function rotateVertical(obj, draggedVector)
{
    rotateFrontVertical(obj, draggedVector);

}
function rotateHorizonal(obj, draggedVector)
{
    rotateFrontHorizontal(obj, draggedVector);

}

function rotateFrontVertical(obj, draggedVector)
{
    rotationAxis = obj.rotation.x;
    rotationAxisChar = 'x';

    var distance = draggedVector.y - prevDrag.y;

    obj.rotation.x += distance * rotationSpeed;
}

function rotateFrontHorizontal(obj, draggedVector)
{
    rotationAxis = obj.rotation.z;
    rotationAxisChar = 'z';

    var distance = draggedVector.x - prevDrag.x;

    obj.rotation.z += distance * rotationSpeed;
}