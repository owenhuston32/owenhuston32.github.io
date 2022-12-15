var cameras = [];

export function createCameras(canvas)
{
    // look up the size the canvas is being displayed
    var SCREEN_W = canvas.clientWidth, SCREEN_H = canvas.clientHeight;


    for(var i=0;i<4;i++)
    {
        var subCamera = new THREE.OrthographicCamera (SCREEN_W / -4, SCREEN_W / 4, SCREEN_H / 4, SCREEN_H / -4, 0, 1000);
        if(i==0)
        {
            //top
               subCamera.position.y = 7;
               subCamera.lookAt (new THREE.Vector3(0,0,0));
               subCamera.position.z = -.75;
               subCamera.position.x = -.5;

               }
           else if(i==1)
               {
               //isometric
                subCamera.position.x = 14;
                subCamera.position.z = 15;
                subCamera.position.y = -6;
                subCamera.lookAt (new THREE.Vector3(0,0,0));

               }
           else if(i==2)
               {
               //side
               subCamera.position.z = 7;
               subCamera.lookAt (new THREE.Vector3(0,0,0));
               subCamera.position.x = -.5
               
               }
           else
               {
               //front
              subCamera.position.x = 6;
              subCamera.lookAt (new THREE.Vector3(0,0,0));
              subCamera.position.y = 0;
              subCamera.position.z = -.5;

               }

            subCamera.name  = "camera: " + i;
           cameras.push(subCamera);
        }
}

export function render(canvas, renderer, scene)
{   
    var SCREEN_W = canvas.clientWidth, SCREEN_H = canvas.clientHeight;

    var left,bottom, width, height;

    left = 1; bottom = 0.5*SCREEN_H; width = 0.5*SCREEN_W-1; height = 0.5*SCREEN_H;

    setupCamera(left, bottom, width, height, renderer, cameras[0], scene);

    left = 0.5*SCREEN_W+1; bottom = 0.5*SCREEN_H; width = 0.5*SCREEN_W-1; height = 0.5*SCREEN_H;
    setupCamera(left, bottom, width, height, renderer, cameras[1], scene);
   
    left = 1; bottom = 1; width = 0.5*SCREEN_W-1; height = 0.5*SCREEN_H-2;
    setupCamera(left, bottom, width, height, renderer, cameras[2], scene);
    
    left = 0.5*SCREEN_W+1; bottom = 1; width = 0.5*SCREEN_W-1; height = 0.5*SCREEN_H-2;
    setupCamera(left, bottom, width, height, renderer, cameras[3], scene);
    
}

export function getCamera(index)
{
    return cameras[index];
}


function setupCamera(left, bottom, width, height, renderer, camera, scene)
{
    renderer.setViewport (left,bottom,width,height);
    renderer.setScissor(left,bottom,width,height);
    renderer.setScissorTest( true );
    camera.updateProjectionMatrix();
    renderer.render (scene,camera);
}
