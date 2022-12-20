var rightPivot = new THREE.Object3D(),
leftPivot = new THREE.Object3D(),
topPivot = new THREE.Object3D(),
bottomPivot = new THREE.Object3D(),
frontPivot = new THREE.Object3D(),
backPivot = new THREE.Object3D();

var frontPivotPositions = 
[
    "-1,-1,-1",
    "0,-1,-1",
    "1,-1,-1",
    "-1,0,-1",
    "0,0,-1",
    "1,0,-1",
    "-1,1,-1",
    "0,1,-1",
    "1,1,-1"
];

var backPivotPositions = 
[

];

var righPivotPositions = 
[   "-1,-1,-1", 
    "-1,-1,0",
    "-1,-1,1",
    "-1,0,-1",
    "-1,0,0",
    "-1,0,1",
    "-1,1,-1",
    "-1,1,0",
    "-1,1,1"
];


var leftPivotPositions = 
[   "1,-1,-1", 
    "1,-1,0",
    "1,-1,1",
    "1,0,-1",
    "1,0,0",
    "1,0,1",
    "1,1,-1",
    "1,1,0",
    "1,1,1"
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

var sideNameToPositions = new Map(
    [
        ["Front", frontPivotPositions],
        ["Back", backPivotPositions],
        ["Right", righPivotPositions],
        ["Left", leftPivotPositions],
        ["Top", topPivotPositions],
        ["Bottom", bottomPivotPositions]
    ]
);

var sideNameToPivot = new Map(
    [
        ["Front", frontPivot],
        ["Back", backPivot],
        ["Right", rightPivot],
        ["Left", leftPivot],
        ["Top", topPivot],
        ["Bottom", bottomPivot]
    ]
);

export function getFrontPivot()
{
    return frontPivot;
}

export function getBackPivot()
{
    return backPivot;
}

export function getRightPivot()
{
    return rightPivot;
}

export function getLeftPivot()
{
    return leftPivot;
}

export function createPivots(scene, cube, originalCubeVisible)
{
    for(var i = 0; i < sideNames.length; i++)
    {
        var sideName = sideNames[i];
        var pivot = sideNameToPivot.get(sideName);

        activateSide(sideName, cube, originalCubeVisible);
        pivot.name = sideName;
        scene.add(pivot);
        pivot.visible = false;
    }

}
export function activateSide(sideName, cube, originalCubeVisible)
{
    var pivot = sideNameToPivot.get(sideName);
    var positions = sideNameToPositions.get(sideName);

    console.log(sideName);

    updatePivot(cube, positions, pivot);
    setOriginalCopyVisible(cube, positions, originalCubeVisible)

}
export function deactivateSide(cube, pivot)
{
    pivot.visible = false;

    var positions = sideNameToPositions.get(pivot.name);

    setOriginalCopyVisible(cube, positions, pivot);
}


function updatePivot(cube, pivotPositions, pivot)
{
    for(var i = 0; i < cube.children.length; i++)
    {
        var child = cube.children[i];
        var posString = child.userData.X + "," + child.userData.Y + "," + child.userData.Z;


        if(pivotPositions.includes(posString))
        {
            pivot.attach(child.clone());
        }
    }
    
    pivot.visible = true;

}
export function setOriginalCopyVisible(cube, pivotPositions, visible)
{
    for(var i = 0; i < cube.children.length; i++)
    {
        var child = cube.children[i];
        var posString = child.userData.X + "," + child.userData.Y + "," + child.userData.Z;

        if(pivotPositions.includes(posString))
        {
            child.visible = visible;
        }
    }
}

export function updateTags(pivot)
{
    for(var i = 0; i < pivot.children.length; i ++)
    {
        var child = pivot.children[i];

        var worldPos = new THREE.Vector3();
        child.getWorldPosition(worldPos);

        child.userData = {X : Math.round(worldPos.x / 6),
            Y : Math.round(worldPos.y / 6),
            Z : Math.round(worldPos.z / 6)};
    }
}