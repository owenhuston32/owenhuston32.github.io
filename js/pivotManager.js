var rightPivot = new THREE.Object3D(),
leftPivot = new THREE.Object3D(),
topPivot = new THREE.Object3D(),
bottomPivot = new THREE.Object3D(),
frontPivot = new THREE.Object3D(),
backPivot = new THREE.Object3D();

var frontPivotPositions = 
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

var backPivotPositions = 
[

];

var righPivotPositions = 
[   [-6,-6,-6], 
    [-6,-6,0],
    [-6,-6,6],
    [-6,0,-6],
    [-6,0,0],
    [-6,0,6],
    [-6,6,-6],
    [-6,6,0],
    [-6,6,6]
    
];


var leftPivotPositions = 
[   [6,-6,-6],
    [6,-6,0],
    [6,-6,6],
    [6,0,-6],
    [6,0,0],
    [6,0,6],
    [6,6,-6],
    [6,6,0],
    [6,6,6]
];

var topPivotPositions = 
[

];

var bottomPivotPositions =
[

];

var sideNames = 
[
    "Front",
    "Back",
    "Right",
    "Left",
    "Top",
    "Bottom"
];

var pivotPositions =
[
    frontPivotPositions,
    backPivotPositions,
    righPivotPositions,
    leftPivotPositions,
    topPivotPositions,
    bottomPivotPositions
];

var pivots = 
[
    frontPivot,
    backPivot,
    rightPivot,
    leftPivot,
    topPivot,
    bottomPivot

];


var sideNameToPositions = new Map();

var sideNameToPivot = new Map();

export function createPivots(scene)
{
    initializeMaps();
    for(var i = 0; i < sideNames.length; i++)
    {
        var name = sideNames[i];
        var pivot = sideNameToPivot.get(name);
        console.log(pivot);
        pivot.name = name;
        scene.add(pivot);
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
        return frontPivot;
    }

    return rightPivot;
}