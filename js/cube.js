var cube = new THREE.Object3D();

export function createCube(scene)
{
    const materials = [
        new THREE.MeshPhongMaterial({color: 'white'})
        ,new THREE.MeshPhongMaterial({color: 'green'})
        ,new THREE.MeshPhongMaterial({color: 'yellow'})
        ,new THREE.MeshPhongMaterial({color: 'blue'})
        ,new THREE.MeshPhongMaterial({color: 'red'})
        ,new THREE.MeshPhongMaterial({color: 0xFF8C00})
    ];


    createFront(materials[0]);
    createLeft(materials[1]);
    createRight(materials[2]);
    createBack(materials[3]);
    createTop(materials[4]);
    createBottom(materials[5]);

    scene.add(cube);

    return cube;
}

function createFront(material)
{
        var front = new THREE.Object3D();

        //front
        const box = new THREE.BoxGeometry(5, 5, 1); // width, height, depth

        var initialX = 3;

        for(var i = 0; i < 3; i++)
        {
            for(var j = 2; j >= 0; j--)
            {
                var mesh = new THREE.Mesh(box, material);
                mesh.position.set(initialX + j * 6, i * 6, 0);
                
                const colNum = 2-j;
                mesh.name = i + "," + colNum;
                mesh.userData = {ROW: i, Col: colNum};
                front.add(mesh);
            }
        }
        front.name = "FrontParent";
        cube.add(front);


    }

    function createLeft(material)
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
                const colNum = 2-j;
                mesh.name = i + "," + colNum;
                mesh.userData = {ROW: i, Col: colNum};
                right.add(mesh);
            }
        }
        right.name = "LeftParent";
        cube.add(right);

    }

    function createRight(material)
    {
        var left = new THREE.Object3D();
        const box = new THREE.BoxGeometry(1, 5, 5); // width, height, depth

        var initialY = -6;
        var initialZ = -6;

        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                var mesh = new THREE.Mesh(box, material);
                mesh.position.set(0, initialY + i * 6, initialZ + j * 6);
                mesh.name = i + "," + j;
                mesh.userData = {ROW: i, Col: j};
                left.add(mesh);
            }
        }
        left.name = "RightParent";
        cube.add(left);

    }
    function createBack(material)
    {
        var back = new THREE.Object3D();

        const box = new THREE.BoxGeometry(5, 5, 1); // width, height, depth

        var initialY = 12;
        var initialX = 3;

        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                var mesh = new THREE.Mesh(box, material);
                mesh.position.set(initialX + j * 6, initialY - i * 6, 18);
                mesh.name = i + "," + j;
                mesh.userData = {ROW: i, Col: j};
                back.add(mesh);
            }
        }
        back.name = "BackParent";
        cube.add(back);

    }
    function createTop(material)
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
                const colNum = (2 - j);
                mesh.name = i + "," + colNum;
                mesh.userData = {ROW: i, Col: colNum};
                top.add(mesh);
            }
        }
        top.name = "TopParent";
        cube.add(top);
    }
    function createBottom(material)
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
                const colNum = (2 - j);
                mesh.name = i + "," + colNum;
                mesh.userData = {ROW: i, Col: colNum};
                bottom.add(mesh);
            }
        }
        bottom.name = "BottomParent";
        cube.add(bottom);
    }