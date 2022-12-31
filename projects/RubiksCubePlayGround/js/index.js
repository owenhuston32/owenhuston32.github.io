import * as screenManager from './screenManager.js';
import * as cameraManager from './cameraManager.js';
import * as sceneManager from './sceneManager.js';
import * as inputManager from './inputManager.js';
import * as raycaster from './raycastManager.js';
import * as objectManager from './objectManager.js';

var pressedObject, mouseDown = false;
const ongoingTouches = [];
init();

function init()
{

    
    screenManager.setupScreen(document);

    cameraManager.createCameras(screenManager.getCanvasArray());

    sceneManager.createScene();

    objectManager.createCube(sceneManager.getScene());

    sceneManager.createLighting();

    animate();


    //startInputListener();

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
    console.log("start input listener");

    const el = document.getElementById("overlay");

    el.addEventListener("touchstart", function(ev) {
        ev.preventDefault();
        onMouseDown(ev, screenManager.getFullScreenCanvas());
      }, {
        passive: false
      });


      el.addEventListener("touchmove", function(ev) {
        ev.preventDefault();
        onMouseMove(ev, screenManager.getFullScreenCanvas());
      }, {
        passive: false
      });
      
      el.addEventListener("touchend", function(ev) {
        ev.preventDefault();
        onMouseUp(ev);
      }, {
        passive: false
      });

    //window.ontouchstart = function(event) {
    //    console.log("touch start");
    //};
    //window.ontouchmove = function(event) {
    //    console.log("touch move");
    //};
    //window.ontouchend = function(event) {
    //    event.preventDefault();
    //    console.log("touch end");
    //};



    //document.getElementById("overlay").onmousedown = function(event){onMouseDown(event, screenManager.getFullScreenCanvas())};
    
    //window.ontouchstart = function(event){onMouseDown(event, screenManager.getFullScreenCanvas())};

    //document.getElementById("overlay").onmousemove = function(event){onMouseMove(event, screenManager.getFullScreenCanvas())};
    //window.ontouchmove = function(event){onMouseMove(event, screenManager.getFullScreenCanvas())};


    //document.onmouseup = function(event){onMouseUp(event)};
    //window.ontouchend = function(event){onMouseUp(event)};
}

function onMouseDown(event, fullScreenCanvas)
{
    //document.getElementById("overlay").setPointerCapture(event.pointerId);

    event.preventDefault();
    event.stopImmediatePropagation();

    mouseDown = true;

    console.log("mouse down");

    var mouse = inputManager.onMouseDown(event, fullScreenCanvas);

    var cameraIndex = cameraManager.getCameraIndexFromMouse(mouse);

    mouse = inputManager.screenToCameraSpace(mouse, cameraIndex);
    
    pressedObject = raycaster.raycast(mouse, cameraManager.getCamera(cameraIndex), sceneManager.getScene());

}

function onMouseMove(event, fullScreenCanvas)
{
    event.preventDefault();
    if(!mouseDown)
        return;

    var draggedVector = inputManager.onMouseMove(event, fullScreenCanvas);

    console.log("moving");

    if(pressedObject)
    {
        objectManager.rotateObject(pressedObject, draggedVector);
    }

}
function onMouseUp(event)
{
    event.preventDefault();
    console.log(event.touch)

    mouseDown = false;
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

function copyTouch({ identifier, pageX, pageY }) {
    return { identifier, pageX, pageY };
  }
  

function ongoingTouchIndexById(idToFind) {
    for (let i = 0; i < ongoingTouches.length; i++) {
      const id = ongoingTouches[i].identifier;
  
      if (id === idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }
  