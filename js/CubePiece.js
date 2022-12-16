export default class CubePiece{

    constructor(scene, position, tag)
    {
        this.createCube(scene, position, tag);
    }

    createCube(scene, position, tag)
    {
        const geometry = new THREE.BoxGeometry(12, 12, 12); // width, height, depth
        const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position.x, position.y, position.z); 
        scene.add(mesh);

        var cube = mesh;

        cube.userData = {TAG: tag};

        return cube;
    }
}