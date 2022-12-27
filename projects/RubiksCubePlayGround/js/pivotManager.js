var rightPivot = new THREE.Object3D(),
leftPivot = new THREE.Object3D(),
topPivot = new THREE.Object3D(),
bottomPivot = new THREE.Object3D(),
frontPivot = new THREE.Object3D(),
backPivot = new THREE.Object3D();

const frontPivotPositions = 
[
    
    [-6,-6,-6],
    [0,-6,-6],
    [6,-6,-6],
    [-6,0,-6],
    [0,0,-6],
    [6,0,-6],
    [-6,6,-6],
    [0,6,-6],
    [6,6,-6]
    
];

const backPivotPositions = [];

const righPivotPositions = [];

const leftPivotPositions = [];

const topPivotPositions = [];

const bottomPivotPositions =[];

const sideNames = 
[
    "Front",
    "Top",
    "Back",
    "Bottom",
    "Left",
    "Right"
];

const pivotPositions =
[
    frontPivotPositions,
    topPivotPositions,
    backPivotPositions,
    bottomPivotPositions,
    leftPivotPositions,
    righPivotPositions
];

const pivots = 
[
    frontPivot,
    topPivot,
    backPivot,
    bottomPivot,
    leftPivot,
    rightPivot
];

const xAxis = new THREE.Vector3(1,0,0);
const yAxis = new THREE.Vector3(0,1,0);
const zAxis = new THREE.Vector3(0,0,1);
const negZAxis = new THREE.Vector3(0,0,-1);

const pivotNameToRotationAxis = new Map(
    [
        [sideNames[0], negZAxis],
        [sideNames[1], yAxis],
        [sideNames[2], negZAxis],
        [sideNames[3], yAxis],
        [sideNames[4], xAxis],
        [sideNames[5], xAxis]
    ]
);

var tagsToFaceName = new Map(
    [
        ["0,0,-1", sideNames[0] + "Face"],
        ["0,1,0", sideNames[1] + "Face"],
        ["0,0,1", sideNames[2] + "Face"],
        ["0,-1,0", sideNames[3] + "Face"],
        ["-1,0,0", sideNames[4] + "Face"],
        ["1,0,0", sideNames[5] + "Face"]
    ]
);

var sideNameToPositions = new Map();

var sideNameToPivot = new Map();


export function createPivots(scene)
{
    initializeMaps();
    initializePivotPositions();
    for(var i = 0; i < sideNames.length; i++)
    {
        var name = sideNames[i];
        var pivot = sideNameToPivot.get(name);
        pivot.name = name;
        scene.add(pivot);
    }
}

function initializePivotPositions()
{
    for(var i = 0; i < frontPivotPositions.length; i++)
    {
        var arr = frontPivotPositions[i];
        var rightArr = [arr[2], arr[1], arr[0]];
        var leftArr = [arr[2] * -1, arr[1], arr[0]];
        var topArr = [arr[1], arr[2] * -1, arr[0]];
        var bottomArr = [arr[1], arr[2], arr[0]];
        var backArr = [arr[0], arr[1], arr[2] * -1];


        righPivotPositions[i] = rightArr; 
        leftPivotPositions[i] = leftArr;
        topPivotPositions[i] = topArr;
        bottomPivotPositions[i] = bottomArr;
        backPivotPositions[i] = backArr;

    }
}

function initializeMaps()
{
    for(var i = 0; i < sideNames.length; i++)
    {
        sideNameToPositions.set(sideNames[i], pivotPositions[i]);
        sideNameToPivot.set(sideNames[i], pivots[i]);
        
    }
}

export function changeParent(originalParent, newParent, sideName)
{
    var positions = sideNameToPositions.get(sideName);
    for(var i = 0; i < positions.length; i++)
    {
        var child = getChildFromUserData(originalParent, positions[i]);
        
        if(child != null)
        {
            newParent.attach(child);
        }
    }
}

function getChildFromUserData(obj, posArray)
{

    for(var i = 0; i < obj.children.length; i++)
    {
        var child = obj.children[i];
        var childX = child.userData.X;
        var childY = child.userData.Y;
        var childZ = child.userData.Z;
        if(childX == posArray[0]
            && childY == posArray[1]
            && childZ == posArray[2])
            {
                return child;
            }
    }
    return null;
}



export function deactivateSide(cube, pivot, rotationRadians, pressedObj)
{
        updateFaceNames(pivot, rotationRadians, pressedObj);
        updateTags(pivot);
        changeParent(pivot, cube, pivot.name);
        pivot.rotation.set(0,0,0);
}




export function updateTags(pivot)
{
    for(var i = 0; i < pivot.children.length; i ++)
    {
        var child = pivot.children[i];
    
        var worldPos =new THREE.Vector3();

        child.getWorldPosition(worldPos);

        worldPos.x = Math.round(worldPos.x);
        worldPos.y = Math.round(worldPos.y);
        worldPos.z = Math.round(worldPos.z);

        child.userData = {X : worldPos.x,
            Y : worldPos.y,
            Z : worldPos.z};


    }
}

function updateFaceNames(pivot, rotationRadians, pressedObj, rotationAxis)
{
    var rotationAxis = getRotationAxis(pressedObj, pivot.name);
    var rotationAxisCopy = new THREE.Vector3(rotationAxis.x,
        rotationAxis.y, rotationAxis.z);

    if(rotationAxisCopy.z != 0)
    {
        rotationAxisCopy.z *= -1;
    }

    if(rotationAxisCopy.y != 0)
    {
        rotationAxisCopy.y *= -1;
    }

    for(var i = 0; i < pivot.children.length; i++)
    {
        var cubePiece = pivot.children[i];
        for(var j = 0; j < cubePiece.children.length; j++)
        {
            var face = cubePiece.children[j];
            var x = face.userData.X;
            var y = face.userData.Y;
            var z = face.userData.Z;

            var pos = new THREE.Vector3(x,y,z);
            
            pos.applyAxisAngle(rotationAxisCopy, rotationRadians);

            pos.set(Math.round(pos.x), Math.round(pos.y), Math.round(pos.z));

            face.userData = {X: pos.x, Y: pos.y, Z: pos.z};

            face.name = tagsToFaceName.get(pos.x + "," + pos.y + "," + pos.z);
        }
    }
}


export function getPivotFromMouseMove(pressedObj, mouseMoveAxis)
{
    if(mouseMoveAxis.x == 1)
    {
        if(pressedObj.name == "FrontFace" || pressedObj.name == "RightFace")
        {
            return getPivotFromFace(pressedObj.parent.userData.Y, [topPivot, bottomPivot]);
        }
        else if(pressedObj.name == "TopFace")
        {
            return getPivotFromFace(pressedObj.parent.userData.Z, [backPivot, frontPivot]);
        }
    }
    else if(mouseMoveAxis.y == 1)
    {
        if(pressedObj.name == "FrontFace" || pressedObj.name == "TopFace")
        {
            return getPivotFromFace(pressedObj.parent.userData.X, [leftPivot, rightPivot]);
        }
        else if(pressedObj.name == "RightFace")
        {
            return getPivotFromFace(pressedObj.parent.userData.Z, [backPivot, frontPivot]);
        }
    }

    return null;
}

function getPivotFromFace(userDataVal, pivotArray)
{
    if(userDataVal == 6)
    {
        return pivotArray[0];
    }
    else if(userDataVal == -6)
    {
        return pivotArray[1];
    }
    return null;
}

export function getRotationAxis(pressedObj, pivotName)
{
    if(pressedObj.name == "TopFace" 
    && (pivotName == "Front" || pivotName == "Back"))
    {
        return zAxis;
    }

    return pivotNameToRotationAxis.get(pivotName);
}