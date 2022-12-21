import * as pivotManager from './pivotManager.js';
import * as objectManager from './objectManager.js';
import * as sceneManager from './sceneManager.js';

var rotationObj, currentRotation, rotationAxis;
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
            rotationObj = pivotManager.getLeftPivot();
            pivotManager.changeParent(objectManager.getCube(), rotationObj, "Left");
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
    var degrees = currentRotation * 180 / Math.PI;
    // round to nearest 90 degree
    degrees = Math.round(degrees / 90) * 90;

    var radians = degrees * Math.PI / 180;

    var newRotation = new THREE.Vector3();
    newRotation.set(rotationAxis.x * radians,
        rotationAxis.y * radians,
        rotationAxis.z * radians);

    rotationObj.rotation.set(newRotation.x,
        newRotation.y,newRotation.z);

    rotationObj.updateMatrixWorld(true);

    pivotManager.deactivateSide(objectManager.getCube(), rotationObj);
    

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
    currentRotation = obj.rotation.x;
    rotationAxis = new THREE.Vector3(1,0,0);

    var distance = draggedVector.y - prevDrag.y;

    obj.rotation.x += distance * rotationSpeed;
}

function rotateFrontHorizontal(obj, draggedVector)
{
    currentRotation = obj.rotation.z;
    rotationAxis = new THREE.Vector3(0,0,1);

    var distance = draggedVector.x - prevDrag.x;

    obj.rotation.z += distance * rotationSpeed;
}