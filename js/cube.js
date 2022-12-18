var cube = new THREE.Object3D();

const materials = [
    new THREE.MeshPhongMaterial({color: 'white'})
    ,new THREE.MeshPhongMaterial({color: 'yellow'})
    ,new THREE.MeshPhongMaterial({color: 'green'})
    ,new THREE.MeshPhongMaterial({color: 'blue'})
    ,new THREE.MeshPhongMaterial({color: 'red'})
    ,new THREE.MeshPhongMaterial({color: 0xFF8C00})
        ,new THREE.MeshPhongMaterial({color: 'deeppink'})
];

export function createCube(scene)
{
    var front = createSide(materials[0], new THREE.Vector3(), new THREE.Vector3(), "FrontParent");
    cube.add(front);
    
    var right = createSide(materials[1], new THREE.Vector3(0, THREE.MathUtils.degToRad(90), 0), new THREE.Vector3(-9, 0, 9), "RightParent");
    cube.add(right);
    
    var back = createSide(materials[2], new THREE.Vector3(0, THREE.MathUtils.degToRad(180), 0), new THREE.Vector3(0, 0, 18),  "BackParent");
    cube.add(back);

    var left = createSide(materials[3], new THREE.Vector3(0, THREE.MathUtils.degToRad(270), 0), new THREE.Vector3(9, 0, 9),"LeftParent");
    cube.add(left);

    var top = createSide(materials[4], new THREE.Vector3(THREE.MathUtils.degToRad(90), 0, 0), new THREE.Vector3(0, 9, 9), "TopParent");
    cube.add(top);

    var bottom = createSide(materials[5], new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0), new THREE.Vector3(0, -9, 9), "BottomParent");
    cube.add(bottom);

    scene.add(cube);

    return cube;
}


function createSide(material, rotation, position, name)
{
    var side = new THREE.Object3D();
    const box = new THREE.BoxGeometry(5, 5, 1); // width, height, depth
    var initialY = -6;
    var initialX = 6;

    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            var mesh = new THREE.Mesh(box, material);
            mesh.position.set(initialX - j * 6, initialY + i * 6, 0);
            mesh.name = i + "," + j;
            mesh.userData = {ROW: i, Col: j};
            side.add(mesh);
        }
    }
    side.rotation.set(rotation.x, rotation.y, rotation.z);
    side.position.set(position.x, position.y, position.z);
    side.name = name;

    return side;
}