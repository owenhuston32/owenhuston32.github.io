var cameras = [];
export function createCameras(canvasArray)
{
    for(var i=0;i<4;i++)
    {
        var SCREEN_W = canvasArray[i].clientWidth, SCREEN_H = canvasArray[i].clientHeight;
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


export function render(scene, renderers)
{   
    for(var i = 0; i < renderers.length; i++)
    {
        renderers[i].render (scene, cameras[i]);
    }
    
}

export function getCamera(index)
{
    return cameras[index];
}

export function onWindowResize(canvasArray)
{
    
    for(var i = 0; i < cameras.length; i++)
    {
        var width = canvasArray[i].clientWidth;
        var height = canvasArray[i].clientHeight;

        cameras[i].aspect = width / height;
        cameras[i].updateProjectionMatrix();
    }
    
}
