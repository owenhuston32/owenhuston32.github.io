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
    "Back",
    "Right",
    "Left",
    "Top",
    "Bottom"
];

const pivotPositions =
[
    frontPivotPositions,
    backPivotPositions,
    righPivotPositions,
    leftPivotPositions,
    topPivotPositions,
    bottomPivotPositions
];

const pivots = 
[
    frontPivot,
    backPivot,
    rightPivot,
    leftPivot,
    topPivot,
    bottomPivot
];

const xAxis = new THREE.Vector3(1,0,0);
const yAxis = new THREE.Vector3(0,1,0);
const negZAxis = new THREE.Vector3(0,0,-1);

const pivotNameToRotationAxis = new Map(
    [
        [sideNames[0], negZAxis],
        [sideNames[1], negZAxis],
        [sideNames[2], xAxis],
        [sideNames[3], xAxis],
        [sideNames[4], yAxis],
        [sideNames[5], yAxis],
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



export function deactivateSide(cube, pivot)
{
    updateFaceNames(pivot);
    updateTags(pivot);
    changeParent(pivot, cube, pivot.name);
}




export function updateTags(pivot)
{

    console.log("new tags");
    for(var i = 0; i < pivot.children.length; i ++)
    {
        var child = pivot.children[i];
    

        var worldPos =new THREE.Vector3();

        child.getWorldPosition(worldPos);

        worldPos.x = Math.round(worldPos.x / 6) * 6;
        worldPos.y = Math.round(worldPos.y / 6) * 6;
        worldPos.z = Math.round(worldPos.z / 6) * 6;

        child.userData = {X : worldPos.x,
            Y : worldPos.y,
            Z : worldPos.z};

        console.log(worldPos);


    }
}

function updateFaceNames(pivot)
{

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

export function getRotationAxis(pivotName)
{
    return pivotNameToRotationAxis.get(pivotName);
}