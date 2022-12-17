import * as cube from './cube.js';
import * as rotationManager from './rotationManager.js';

export function createCube(scene)
{
    cube.createCube(scene);
}

export function getCube()
{
    return cube;
}


export function rotateObject(obj, draggedVector)
{
    rotationManager.rotateObject(obj, draggedVector);
}

export function stopRotating()
{
    rotationManager.stopRotating();
}