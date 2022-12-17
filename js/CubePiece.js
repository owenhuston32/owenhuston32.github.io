export default class CubePiece{


    
    constructor(scene)
    {
        const materials = [
            new THREE.MeshPhongMaterial({color: 'white'})
        ,new THREE.MeshPhongMaterial({color: 'yellow'})
        ,new THREE.MeshPhongMaterial({color: 'green'})
        ,new THREE.MeshPhongMaterial({color: 'blue'})
        ,new THREE.MeshPhongMaterial({color: 'red'})
        ,new THREE.MeshPhongMaterial({color: 0xFF8C00})
        ];


        this.createFront(materials[0], scene);
        this.createLeft(materials[1], scene);
        this.createRight(materials[2], scene);
        this.createBack(materials[3], scene);
        this.createTop(materials[4], scene);
        this.createBottom(materials[5], scene);
    }

    createFront(material, scene)
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
                mesh.name = "Front";
                front.add(mesh);
            }
        }
        front.name = "Front";
        scene.add(front);


    }

    createLeft(material, scene)
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
                mesh.name = "Left";
                left.add(mesh);
            }
        }
        left.name = "Left";
        scene.add(left);
    }

    createRight(material, scene)
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
                mesh.name = "Right";
                right.add(mesh);
            }
        }
        right.name = "Right";
        scene.add(right);
    }
    createBack(material, scene)
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
                mesh.name = "Back";
                back.add(mesh);
            }
        }
        back.name = "Back";
        scene.add(back);

    }
    createTop(material, scene)
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
                mesh.name = "Top";
                top.add(mesh);
            }
        }
        top.name = "Top";
        scene.add(top);
    }
    createBottom(material, scene)
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
                mesh.name = "Bottom";
                bottom.add(mesh);
            }
        }
        bottom.name = "Bottom";
        scene.add(bottom);
    }
}