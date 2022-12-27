var scene;
export function createScene()
{
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );
     
}

export function createLighting()
{

    const ambientLight = new THREE.AmbientLight ( 0x404040, 5);
    scene.add(ambientLight); 
}

export function getScene()
{
    return scene;
}
