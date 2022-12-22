import * as pivotManager from './pivotManager.js';
import * as objectManager from './objectManager.js';

var rotationObj, currentRotation, rotationAxis;
var rotationSpeed = 6;
var prevDrag = new THREE.Vector2();
var shouldMove = false;
var mouseMoveAxis = new THREE.Vector2();

export function rotateObject(obj, draggedVector)
{
    // if we arent moving in a direction yet
    if(!shouldMove)
    {
        if(Math.abs(draggedVector.x) > 0.05)
        {
            rotationObj = pivotManager.getFrontPivot();
            pivotManager.changeParent(objectManager.getCube(), rotationObj, "Front");
                    
            rotationAxis = new THREE.Vector3(0,0,1);
            mouseMoveAxis = new THREE.Vector2(1,0);
            shouldMove = true;
        }
        else if(Math.abs(draggedVector.y) > 0.05)
        {
            rotationObj = pivotManager.getLeftPivot();
            pivotManager.changeParent(objectManager.getCube(), rotationObj, "Left");
            
            rotationAxis = new THREE.Vector3(1,0,0);
            mouseMoveAxis = new THREE.Vector2(0,1);
            shouldMove = true;
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

        var newRotation = new THREE.Vector3();
        newRotation.set(rotationAxis.x * radians,
            rotationAxis.y * radians,
            rotationAxis.z * radians);

        rotationObj.rotation.set(newRotation.x,
            newRotation.y,newRotation.z);

        rotationObj.updateMatrixWorld(true);

        pivotManager.deactivateSide(objectManager.getCube(), rotationObj);
    

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