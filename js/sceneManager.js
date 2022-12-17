var scene;
export function createScene()
{
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );
     
}

export function createLighting()
{
    // downward light
    var directionalLight = new THREE.DirectionalLight( 0xffffff, .25);
    directionalLight.position.y = 2;
    scene.add( directionalLight );

    // back  light
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.x = -2;
    scene.add( directionalLight );
    

    // downard diagonal light
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.x = 2;
    directionalLight.position.z = 2;
    scene.add( directionalLight );

    // upward diagaonal light
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.x = 2;
    directionalLight.position.z = 2;
    directionalLight.position.y = -5;
    scene.add( directionalLight );


    const ambientLight = new THREE.AmbientLight (0x11111, 1);
    scene.add(ambientLight); 
}

export function getScene()
{
    return scene;
}
