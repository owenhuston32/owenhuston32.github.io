const raycaster = new THREE.Raycaster;

export function raycast(mouse, camera, scene)
{

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects( scene.children, true );
    
    var pressedObject;

    if ( intersects.length > 0 ) 
    {
        var intersection = intersects[ 0 ];
        pressedObject = intersection.object;
    }

    console.log(pressedObject);

    return pressedObject;
}