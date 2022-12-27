var cameras = [];
export function createCameras(canvasArray)
{
    for(var i=0;i<4;i++)
    {
        var fustrum = .25;
        var SCREEN_W = canvasArray[i].clientWidth, SCREEN_H = canvasArray[i].clientHeight;
        var subCamera = new THREE.OrthographicCamera (SCREEN_W * fustrum / -2, SCREEN_W * fustrum / 2, SCREEN_H * fustrum / 2, SCREEN_H * fustrum / -2, 0, 1000);
        if(i==0)
        {
            //top
               subCamera.position.y = 200;
               subCamera.lookAt (new THREE.Vector3(0,0,0));
               subCamera.rotation.z = THREE.Math.degToRad(180);   
               subCamera.position.z = 10;
            }
           else if(i==1)
               {
               //isometric
                subCamera.position.x = -15;
                subCamera.position.z = -15;
                subCamera.position.y = 10;
                subCamera.lookAt (new THREE.Vector3(0,0,0));
                subCamera.position.y = 20;
                subCamera.position.z = -10;

               }
           else if(i==2)
               {
               //front
               subCamera.position.z = -20;
               subCamera.lookAt (new THREE.Vector3(0,0,0));
               }
           else
               {
               //right
              subCamera.position.x = -20;
              subCamera.lookAt (new THREE.Vector3(0,0,0));
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

export function getCameraIndexFromMouse(mouse)
{
    if(mouse.x < 0)
    {
        if(mouse.y < 0 )
        {
            return 2;
        }
        else
        {
            return 0;
        }
    }
    else
    {   
        if(mouse.y < 0 )
        {
            return 3;
        }
        else
        {
            return 1;
        }

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

        var fustrum = .25;
        cameras[i].left = width * fustrum / - 2;
        cameras[i].right = width * fustrum / 2;
        cameras[i].top = height * fustrum / 2;
        cameras[i].bottom = height * fustrum / -2;

        cameras[i].updateProjectionMatrix();
    }
    
}
