import * as cube from './cube.js';
import * as pivotManager from './pivotManager.js';
import * as rotationManager from './rotationManager.js';

var cubeObj;
export function createCube(scene)
{
    cubeObj = cube.createCube(scene);

    pivotManager.createPivots(scene);

}

export function getCube()
{
    return cubeObj;
}

export function rotateObject(obj, draggedVector, rightPivot)
{
    rotationManager.rotateObject(obj, draggedVector, rightPivot);
}

export function stopRotating()
{
    rotationManager.stopRotating();
}