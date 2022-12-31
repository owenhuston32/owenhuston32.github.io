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

    document.body.onpointerdown = (event) => {
        document.body.setPointerCapture(event.pointerId);
        console.log('pointerdown');
    };

    

    document.body.onpointerup = (event) => {
        console.log('pointerup');
    };

    //document.getElementById("overlay").onmousedown = function(event){onMouseDown(event, screenManager.getFullScreenCanvas())};
    //document.body.onpointerenter = function(event){onMouseDown(event, screenManager.getFullScreenCanvas())};
    
    //document.getElementById("overlay").onmousemove = function(event){onMouseMove(event, screenManager.getFullScreenCanvas())};
    //document.getElementById("overlay").onpointermove = function(event){onMouseMove(event, screenManager.getFullScreenCanvas())};

    //document.getElementById("overlay").onmouseup = function(event){onMouseUp(event)};
    //document.body.onpointerleave = function(event){onMouseUp(event)};

}

function onMouseDown(event, fullScreenCanvas)
{
    document.body.setPointerCapture(event.pointerId);

    console.log("mouse down");
    console.log(event.pointerId);

    var mouse = inputManager.onMouseDown(event, fullScreenCanvas);

    var cameraIndex = cameraManager.getCameraIndexFromMouse(mouse);

    mouse = inputManager.screenToCameraSpace(mouse, cameraIndex);
    
    pressedObject = raycaster.raycast(mouse, cameraManager.getCamera(cameraIndex), sceneManager.getScene());

}

function onMouseMove(event, fullScreenCanvas)
{
    //document.getElementById("overlay").setPointerCapture(event.pointerId);
    console.log("moving");
    var draggedVector = inputManager.onMouseMove(event, fullScreenCanvas);

    if(pressedObject)
    {
        objectManager.rotateObject(pressedObject, draggedVector);
    }

}
function onMouseUp(event)
{
    console.log("mouse up");
    console.log(event.pointerId);
    
    objectManager.stopRotating();
    pressedObject = null;
    inputManager.onMouseUp();
}

function onWindowResize()
{
    screenManager.onWindowResize();
    cameraManager.onWindowResize(screenManager.getCanvasArray());
}