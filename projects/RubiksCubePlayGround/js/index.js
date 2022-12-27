import * as screenManager from './screenManager.js';
import * as cameraManager from './cameraManager.js';
import * as sceneManager from './sceneManager.js';
import * as inputManager from './inputManager.js';
import * as raycaster from './raycastManager.js';
import * as objectManager from './objectManager.js';

var pressedObject;

init();

function init()
{

    
    screenManager.setupScreen(document);

    cameraManager.createCameras(screenManager.getCanvasArray());

    sceneManager.createScene();

    objectManager.createCube(sceneManager.getScene());

    sceneManager.createLighting();

    animate();


    startInputListener();

    window.onresize = function() {
        onWindowResize();
    };

    onWindowResize();
    
}

function animate()
{
    requestAnimationFrame ( animate );  
    cameraManager.render(sceneManager.getScene(), screenManager.getRenderers());
}

function startInputListener()
{

    document.getElementById("overlay").onmousedown = function(event){onMouseDown(event, screenManager.getFullScreenCanvas())};

    document.getElementById("overlay").onmousemove = function(event){onMouseMove(event, screenManager.getFullScreenCanvas())};

    document.onmouseup = function(){onMouseUp()};

}

function onMouseDown(event, fullScreenCanvas)
{

    var mouse = inputManager.onMouseDown(event, fullScreenCanvas);

    var cameraIndex = cameraManager.getCameraIndexFromMouse(mouse);

    mouse = inputManager.screenToCameraSpace(mouse, cameraIndex);
    
    pressedObject = raycaster.raycast(mouse, cameraManager.getCamera(cameraIndex), sceneManager.getScene());

}

function onMouseMove(event, fullScreenCanvas)
{
    var draggedVector = inputManager.onMouseMove(event, fullScreenCanvas);

    if(pressedObject)
    {
        objectManager.rotateObject(pressedObject, draggedVector);
    }

}
function onMouseUp()
{
    objectManager.stopRotating();
    pressedObject = null;
    inputManager.onMouseUp();
}

function onWindowResize()
{
    screenManager.onWindowResize();
    cameraManager.onWindowResize(screenManager.getCanvasArray());
}