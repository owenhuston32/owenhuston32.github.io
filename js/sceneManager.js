var scene;
export function createScene()
{
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );
     
}

export function createLighting()
{
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.2 );
    directionalLight.position.x = 2;
    directionalLight.position.z = 2;
    scene.add( directionalLight );
    const ambientLight = new THREE.AmbientLight (0x11111, 10);
    scene.add(ambientLight);   
}

export function getScene()
{
    return scene;
}
