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

    window.onresize = function() {
        onWindowResize();
    };

    document.addEventListener("DOMContentLoaded", startInputListener);

    onWindowResize();
    
}

function animate()
{
    requestAnimationFrame ( animate );  
    cameraManager.render(sceneManager.getScene(), screenManager.getRenderers());
}

function startInputListener()
{
    const el = document.getElementById("overlay");

    var mousePos = new THREE.Vector2();


    el.addEventListener("touchstart", function(ev) {
        ev.preventDefault();
        mousePos.x = ev.touches[0].clientX;
        mousePos.y = ev.touches[0].clientY;
        onMouseDown(mousePos, screenManager.getFullScreenCanvas(), false);
      }, {
        passive: false
      });


      el.addEventListener("touchmove", function(ev) {
        ev.preventDefault();
        mousePos.x = ev.touches[0].clientX;
        mousePos.y = ev.touches[0].clientY;
        onMouseMove(mousePos, screenManager.getFullScreenCanvas(), false);
      }, {
        passive: false
      });
      
      el.addEventListener("touchend", function(ev) {
        ev.preventDefault();
        onMouseUp(ev);
      }, {
        passive: false
      });

    el.onmousedown = function(event){onMouseDown(event, screenManager.getFullScreenCanvas(), true)};
    el.onmousemove = function(event){onMouseMove(event, screenManager.getFullScreenCanvas(), true)};
    el.onmouseup = function(event){onMouseUp(event)};
}

function onMouseDown(event, fullScreenCanvas, isMouse)
{
    console.log("mouse down");

    var mouse = inputManager.onMouseDown(event, fullScreenCanvas, isMouse);

    var cameraIndex = cameraManager.getCameraIndexFromMouse(mouse);

    mouse = inputManager.screenToCameraSpace(mouse, cameraIndex);
    
    pressedObject = raycaster.raycast(mouse, cameraManager.getCamera(cameraIndex), sceneManager.getScene());

}

function onMouseMove(event, fullScreenCanvas)
{
    var draggedVector = inputManager.onMouseMove(event, fullScreenCanvas);

    console.log("moving");

    if(pressedObject)
    {
        objectManager.rotateObject(pressedObject, draggedVector);
    }

}
function onMouseUp()
{
    console.log("mouse up");
    
    objectManager.stopRotating();
    pressedObject = null;
    inputManager.onMouseUp();
}

function onWindowResize()
{
    screenManager.onWindowResize();
    cameraManager.onWindowResize(screenManager.getCanvasArray());
}