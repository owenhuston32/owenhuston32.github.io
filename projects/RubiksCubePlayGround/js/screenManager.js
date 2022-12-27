var fullScreenCanvas;
var canvasArray = [];
var renderers = [];

    export function setupScreen(document)
    {
        var overlay = document.createElement('div');
        overlay.setAttribute("id", "overlay");
        document.body.appendChild(overlay);

        var fullScreen = document.createElement('div');
        fullScreen.setAttribute("id", "fullScreen");

        for(var i = 0; i < 4; i++)
        {
            var cameraContainerDiv = document.createElement('div');
    
            cameraContainerDiv.setAttribute("id", "cameraContainer" + i);

            var renderer = new THREE.WebGLRenderer( { antialias: true } );

            renderers.push(renderer);
        
            var canvas = renderer.domElement;
            
            //changes canvas resolution
            canvas.setAttribute("width", "500%");
            canvas.setAttribute("height", "500%");
        
            canvasArray.push(canvas);

            cameraContainerDiv.appendChild(canvas);

            fullScreen.appendChild(cameraContainerDiv);
        }

        document.body.appendChild (fullScreen);

        fullScreenCanvas = fullScreen;
    }
    
    export function getRenderers()
    {
        return renderers;
    }
    export function getFullScreenCanvas()
    {
        return fullScreenCanvas;
    }
    export function getCanvasArray()
    {
        return canvasArray;
    }

    export function onWindowResize()
    {
        for(var i = 0; i < renderers.length; i++)
        {
            var width = canvasArray[i].width;
            var height = canvasArray[i].height;
            resizeRenderer(renderers[i], 0, 0, width, height);
        }
    }

    function resizeRenderer(renderer, left, bottom, width, height)
    {
        renderer.setViewport (left,bottom,width,height);
        renderer.setScissor(left,bottom,width,height);
        renderer.setScissorTest( true );

    }

        