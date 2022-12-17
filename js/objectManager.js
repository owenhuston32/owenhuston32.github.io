import Cube from './CubePiece.js'; 

var cube, rotationObj, rotationAxis, rotationAxisChar;
var rotationSpeed = 0.1;
var prevDrag = new THREE.Vector2();
var moveHorizontal = false, moveVertical = false;
var CubeObj;

export function createCube(scene)
{
    CubeObj = new Cube(scene);
}

export function getCube()
{
    return cube;
}


export function rotateObject(obj, draggedVector)
{

    // if we arent moving in a direction yet
    if(!moveHorizontal && !moveVertical)
    {
        if(Math.abs(draggedVector.x) > 0.05)
        {
            rotationObj = obj;
            moveHorizontal = true;
        }
        else if(Math.abs(draggedVector.y) > 0.05)
        {
            rotationObj = obj;
            moveVertical = true;
        }
    }
    else if(moveVertical)
    {
        rotateVertical(obj, draggedVector);
    }
    else
    {
        rotateHorizonal(obj, draggedVector);
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
    if(obj.name === "Front")
    {
        rotateFrontVertical(obj, draggedVector);
    }

}
function rotateHorizonal(obj, draggedVector)
{
    if(obj.name === "Front")
    {
        rotateFrontHorizontal(obj, draggedVector);
    }
}

function rotateFrontVertical(obj, draggedVector)
{
    rotationAxis = obj.rotation.x;
    rotationAxisChar = 'x';
    if(draggedVector.y - prevDrag.y > 0)
    {
        obj.rotation.x -= rotationSpeed;
    }
    else
    {
        obj.rotation.x += rotationSpeed;
    }
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