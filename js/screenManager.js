var container, renderer, canvas;

    export function setupScreen(document)
    {
        container = document.createElement('div');
    
        container.setAttribute("id", "screenContainer");
        
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        
        
        canvas = renderer.domElement;
        
        container.appendChild(canvas);
        
        document.body.appendChild (container);
        
        window.addEventListener ('resize', onWindowResize(), false);
        
    }
        
    export function getRenderer()
    {
        return renderer;
    }
        
    export function getCanvas()
    {
        return canvas;
    }

    export function onWindowResize()
    {
        // look up the size the canvas is being displayed
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        
        renderer.setSize(width, height, false);
    }
        