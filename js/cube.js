var cube = new THREE.Object3D();
export function createCube(scene)
{
    const materials = [
        new THREE.MeshPhongMaterial({color: 'white'})
        ,new THREE.MeshPhongMaterial({color: 'yellow'})
        ,new THREE.MeshPhongMaterial({color: 'green'})
        ,new THREE.MeshPhongMaterial({color: 'blue'})
        ,new THREE.MeshPhongMaterial({color: 'red'})
        ,new THREE.MeshPhongMaterial({color: 0xFF8C00})
    ];


    createFront(materials[0], scene);
    createLeft(materials[1], scene);
    createRight(materials[2], scene);
    createBack(materials[3], scene);
    createTop(materials[4], scene);
    createBottom(materials[5], scene);

    scene.add(cube);
}

function createFront(material, scene)
{
        var front = new THREE.Object3D();

        //front
        const box = new THREE.BoxGeometry(5, 5, 1); // width, height, depth

        var initialX = 3;

        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                var mesh = new THREE.Mesh(box, material);
                mesh.position.set(initialX + j * 6, i * 6, 0);
                mesh.name = j + "," + i;
                front.add(mesh);
            }
        }
        front.name = "FrontParent";
        cube.add(front);


    }

    function createLeft(material, scene)
    {
        var left = new THREE.Object3D();
        const box = new THREE.BoxGeometry(1, 5, 5); // width, height, depth

        var initialY = 0;
        var initialZ = 3;

        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                var mesh = new THREE.Mesh(box, material);
                mesh.position.set(0, initialY + i * 6, initialZ + j * 6);
                mesh.name = i + "," + j;
                left.add(mesh);
            }
        }
        left.name = "LeftParent";
        cube.add(left);
    }

    function createRight(material, scene)
    {
        var right = new THREE.Object3D();
        const box = new THREE.BoxGeometry(1, 5, 5); // width, height, depth

        var initialY = 0;
        var initialZ = 3;

        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                var mesh = new THREE.Mesh(box, material);
                mesh.position.set(18, initialY + i * 6, initialZ + j * 6);
                mesh.name = i + "," + j;
                right.add(mesh);
            }
        }
        right.name = "RightParent";
        cube.add(right);
    }
    function createBack(material, scene)
    {
        var back = new THREE.Object3D();

        const box = new THREE.BoxGeometry(5, 5, 1); // width, height, depth

        var initialX = 3;

        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                var mesh = new THREE.Mesh(box, material);
                mesh.position.set(initialX + j * 6, i * 6, 18);
                mesh.name = j + "," + i;
                back.add(mesh);
            }
        }
        back.name = "BackParent";
        cube.add(back);

    }
    function createTop(material, scene)
    {
        var top = new THREE.Object3D();
        const box = new THREE.BoxGeometry(5, 1, 5); // width, height, depth

        var initialX = 3;
        var initialZ = 3;

        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                var mesh = new THREE.Mesh(box, material);
                mesh.position.set(initialX + j * 6, 15, initialZ + i*6);
                mesh.name = i + "," + j;
                top.add(mesh);
            }
        }
        top.name = "TopParent";
        cube.add(top);
    }
    function createBottom(material, scene)
    {
        var bottom = new THREE.Object3D();
        const box = new THREE.BoxGeometry(5, 1, 5); // width, height, depth

        var initialX = 3;
        var initialZ = 3;

        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                var mesh = new THREE.Mesh(box, material);
                mesh.position.set(initialX + j * 6, -3, initialZ + i*6);
                mesh.name = j + "," + i;
                bottom.add(mesh);
            }
        }
        bottom.name = "BottomParent";
        cube.add(bottom);
    }