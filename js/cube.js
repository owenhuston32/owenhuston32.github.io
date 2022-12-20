var cube = new THREE.Object3D();

var cubeSize = 5;

const materials = [
    new THREE.MeshPhongMaterial({color: 'white'})
    ,new THREE.MeshPhongMaterial({color: 'yellow'})
    ,new THREE.MeshPhongMaterial({color: 'green'})
    ,new THREE.MeshPhongMaterial({color: 'blue'})
    ,new THREE.MeshPhongMaterial({color: 'red'})
    ,new THREE.MeshPhongMaterial({color: 0xFF8C00})
        ,new THREE.MeshPhongMaterial({color: 'deeppink'})
];

const frontSticker = new THREE.BoxGeometry(cubeSize, cubeSize, .1);
const frontStickerMesh = new THREE.Mesh(frontSticker, materials[0]);

const rightSticker = new THREE.BoxGeometry(.1, cubeSize, cubeSize);
const rightStickerMesh = new THREE.Mesh(rightSticker, materials[0]);

const topSticker = new THREE.BoxGeometry(cubeSize, .1, cubeSize);
const topStickerMesh = new THREE.Mesh(topSticker, materials[0]);

const backStickerMesh = frontStickerMesh;
const leftStickerMesh = rightStickerMesh;
const bottomStickerMesh = topStickerMesh;

const distanceBetweenPieces = 6;

export function createCube(scene)
{
    cube = createPieces();
    cube.name = "Cube";
    scene.add(cube);

    return cube;
}


function createPieces()
{
    var cube = new THREE.Object3D();
    for(var x = -1; x < 2; x++)
    {
        for(var y = -1; y < 2; y++)
        {
            for(var z = -1; z < 2; z++)
            {

                        var piece = createBox();
                        piece.position.set(x * distanceBetweenPieces ,  y * distanceBetweenPieces , z * distanceBetweenPieces );
                        piece.userData = {X: x, Y: y, Z: z};
                        cube.add(piece);
                    
            }
        }
    }


    return cube;
}

function createBox()
{
    var obj = new THREE.Object3D();
    var box = new THREE.BoxGeometry(5, 5, 5); // width, height, depth
    
    var boxMesh = new THREE.Mesh(box, materials[6]);      

    obj.add(boxMesh);
    addStickers(obj);
    

    return obj;
}

function addStickers(obj)
{

    addSticker(obj, frontStickerMesh, materials[0], 
        new THREE.Vector3(frontStickerMesh.position.x, frontStickerMesh.position.y, frontStickerMesh.position.z - cubeSize / 2 + .01));

    addSticker(obj, backStickerMesh, materials[1], 
        new THREE.Vector3(backStickerMesh.position.x, backStickerMesh.position.y, backStickerMesh.position.z + cubeSize / 2 + .01));
    
    addSticker(obj, rightStickerMesh, materials[2], 
        new THREE.Vector3(rightStickerMesh.position.x - cubeSize / 2 + .01, rightStickerMesh.position.y, rightStickerMesh.position.z));
    
    addSticker(obj, leftStickerMesh, materials[3], 
        new THREE.Vector3(leftStickerMesh.position.x + cubeSize / 2 - .01, leftStickerMesh.position.y, leftStickerMesh.position.z));
        
    addSticker(obj, topStickerMesh, materials[4], 
        new THREE.Vector3(topStickerMesh.position.x, topStickerMesh.position.y + cubeSize / 2 + .01, topStickerMesh.position.z));
        
    addSticker(obj, bottomStickerMesh, materials[5], 
        new THREE.Vector3(bottomStickerMesh.position.x, bottomStickerMesh.position.y + cubeSize / 2 - .01, bottomStickerMesh.position.z));
            
    
}

function addSticker(obj, stickerMesh, material, position)
{
    var clone = stickerMesh.clone();
    clone.material = material;
    clone.position.set(position.x, position.y, position.z);

    obj.add(clone);
}


