import * as pivotManager from './pivotManager.js';
import * as objectManager from './objectManager.js';

var rotationObj, currentRotation, rotationAxis;
var rotationSpeed = 6;
var prevDrag = new THREE.Vector2();
var shouldMove = false;
var mouseMoveAxis = new THREE.Vector2();
var currPressedObj;

export function rotateObject(pressedObj, draggedVector)
{
    // if we arent moving in a direction yet
    if(!shouldMove)
    {
        currPressedObj = pressedObj;
        var xDist = Math.abs(draggedVector.x);
        var yDist = Math.abs(draggedVector.y);
        if(xDist > 0.05 || yDist > 0.05)
        {
            if(xDist > yDist)
            {
                mouseMoveAxis = new THREE.Vector2(1,0);
            }
            else
            {
                mouseMoveAxis = new THREE.Vector2(0,1);
            }
            rotationObj = pivotManager.getPivotFromMouseMove(pressedObj, mouseMoveAxis);
            
            if(rotationObj != null)
            {
                rotationAxis = pivotManager.getRotationAxis(pressedObj, rotationObj.name);
                pivotManager.changeParent(objectManager.getCube(), rotationObj, rotationObj.name);
                shouldMove = true;
            }
        }
    }
    else if(shouldMove)
    {
        setRotation(rotationObj, draggedVector);
    }

    prevDrag.x = draggedVector.x;
    prevDrag.y = draggedVector.y;
}

export function stopRotating()
{

    if(shouldMove)
    {
        var rotationDistance = 
            rotationAxis.x * currentRotation.x
            + rotationAxis.y * currentRotation.y
            + rotationAxis.z * currentRotation.z;
    

        // rads to degrees = rad * 180 / PI
        var degrees = rotationDistance * 180 / Math.PI;
        // round to nearest 90 degree
        degrees = Math.round(degrees / 90) * 90;

        var radians = degrees * Math.PI / 180;

        rotationObj.rotation.set(rotationAxis.x * radians,
            rotationAxis.y * radians,
            rotationAxis.z * radians);

        rotationObj.updateMatrixWorld(true);

        pivotManager.deactivateSide(objectManager.getCube(), rotationObj, radians, currPressedObj);
    
        shouldMove = false;
    }

}

function setRotation(obj, draggedVector)
{
    currentRotation = obj.rotation;

    var draggedMouseDistance = 
        ((draggedVector.x - prevDrag.x) * mouseMoveAxis.x 
        + (draggedVector.y - prevDrag.y) * mouseMoveAxis.y);

    
    obj.rotation.set(
        currentRotation.x + (draggedMouseDistance * rotationSpeed * rotationAxis.x),
        currentRotation.y + (draggedMouseDistance * rotationSpeed * rotationAxis.y),
        currentRotation.z + (draggedMouseDistance * rotationSpeed * rotationAxis.z)
    );

}