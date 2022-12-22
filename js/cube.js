var cube = new THREE.Object3D();

var box;

var cubeSize = 5;

const materials = [
    new THREE.MeshPhongMaterial({color: 'white'})
    ,new THREE.MeshPhongMaterial({color: 'red'})
    ,new THREE.MeshPhongMaterial({color: 'green'})
    ,new THREE.MeshPhongMaterial({color: 'orange'})
    ,new THREE.MeshPhongMaterial({color: 'yellow'})
    ,new THREE.MeshPhongMaterial({color: 'blue'})
        ,new THREE.MeshPhongMaterial({color: 'deeppink'})
];

const frontSticker = new THREE.BoxGeometry(cubeSize, cubeSize, .1);
const frontStickerMesh = new THREE.Mesh(frontSticker, materials[0]);

const sideSticker = new THREE.BoxGeometry(.1, cubeSize, cubeSize);
const sideStickerMesh = new THREE.Mesh(sideSticker, materials[0]);

const topSticker = new THREE.BoxGeometry(cubeSize, .1, cubeSize);
const topStickerMesh = new THREE.Mesh(topSticker, materials[0]);

const distanceBetweenPieces = 6;

export function createCube(scene)
{
    box = createBox();
    cube = createPieces(box);
    cube.name = "Cube";
    scene.add(cube);

    console.log(scene);

    return cube;
}


function createPieces(box)
{
    var cube = new THREE.Object3D();
    for(var x = -1; x < 2; x++)
    {
        for(var y = -1; y < 2; y++)
        {
            for(var z = -1; z < 2; z++)
            {
                var boxClone = box.clone();

                var xPos = x * distanceBetweenPieces;
                var yPos = y * distanceBetweenPieces;
                var zPos = z * distanceBetweenPieces;
                boxClone.position.set(xPos, yPos , zPos );
                boxClone.userData = {X: xPos, Y: yPos, Z: zPos};
                cube.add(boxClone);
                    
            }
        }
    }


    return cube;
}

function createBox()
{
    var obj = new THREE.Object3D();

    addStickers(obj);

    return obj;
}

function addStickers(obj)
{

    //front sticker
    addSticker(obj, frontStickerMesh, materials[0], 
        new THREE.Vector3(frontStickerMesh.position.x, frontStickerMesh.position.y, frontStickerMesh.position.z - cubeSize / 2 + .01), "FrontFace");

    //top sticker
    addSticker(obj, topStickerMesh, materials[1], 
        new THREE.Vector3(topStickerMesh.position.x, topStickerMesh.position.y + cubeSize / 2 + .01, topStickerMesh.position.z), "TopFace");
           
    //back sticker
    addSticker(obj, frontStickerMesh, materials[2], 
        new THREE.Vector3(frontStickerMesh.position.x, frontStickerMesh.position.y, frontStickerMesh.position.z + cubeSize / 2 + .01), "BackFace");
    
    //bottom sticker
    addSticker(obj, topStickerMesh, materials[3], 
        new THREE.Vector3(topStickerMesh.position.x, topStickerMesh.position.y - cubeSize / 2 + .01, topStickerMesh.position.z), "BottomFace");

    //left sticker
    addSticker(obj, sideStickerMesh, materials[4], 
        new THREE.Vector3(sideStickerMesh.position.x + cubeSize / 2 + .01, sideStickerMesh.position.y, sideStickerMesh.position.z), "LeftFace");
                  
    //right sticker
    addSticker(obj, sideStickerMesh, materials[5], 
        new THREE.Vector3(sideStickerMesh.position.x - cubeSize / 2 + .01, sideStickerMesh.position.y, sideStickerMesh.position.z), "RightFace");
    
    
}

function addSticker(obj, stickerMesh, material, newPosition, name)
{
    var clone = stickerMesh.clone();
    clone.material = material;
    clone.position.set(newPosition.x, newPosition.y, newPosition.z);

    clone.name = name;
    obj.add(clone);
}


