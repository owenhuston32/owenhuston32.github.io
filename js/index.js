import * as screenManager from './screenManager.js';
import * as cameraManager from './cameraManager.js';
import * as sceneManager from './sceneManager.js';
import * as inputManager from './inputManager.js';
import * as raycaster from './raycastManager.js';
import * as objectManager from './objectManager.js';

var mouse, pressedObject, cameraIndex;

init();

function init()
{

    
    screenManager.setupScreen(document);

    cameraManager.createCameras(screenManager.getCanvasArray());

    startInputListener();

    sceneManager.createScene();

    objectManager.createCube(sceneManager.getScene());

    sceneManager.createLighting();

    animate();



    window.onresize = function() {
        onWindowResize();
    };
    
}

function animate()
{
    requestAnimationFrame ( animate );  
    cameraManager.render(sceneManager.getScene(), screenManager.getRenderers());
}

function startInputListener()
{
    document.onmousedown = function(event){onMouseDown(event, screenManager.getFullScreenCanvas())};

    document.onmousemove = function(event){onMouseMove(event, screenManager.getFullScreenCanvas())};

    document.onmouseup = function(){onMouseUp()};

}

function onMouseDown(event, canvas)
{
    mouse = inputManager.onMouseDown(event, canvas);

    cameraIndex = inputManager.getCornerClicked(mouse);

    mouse = inputManager.screenToCameraSpace(mouse, cameraIndex);

    pressedObject = raycaster.raycast(mouse, cameraManager.getCamera(cameraIndex), sceneManager.getScene())

}

function onMouseMove(event, canvas)
{
    var draggedVector = inputManager.onMouseMove(event, canvas);


    if(pressedObject)
    {
        objectManager.rotateObject(pressedObject, draggedVector, cameraIndex);
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