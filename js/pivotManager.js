var rightPivot = new THREE.Object3D(),
leftPivot = new THREE.Object3D(),
topPivot = new THREE.Object3D(),
bottomPivot = new THREE.Object3D(),
frontPivot = new THREE.Object3D(),
backPivot = new THREE.Object3D();

var frontPivotPositions = 
[
    [-1,-1,-1],
    [0,-1,-1],
    [1,-1,-1],
    [-1,0,-1],
    [0,0,-1],
    [1,0,-1],
    [-1,1,-1],
    [0,1,-1],
    [1,1,-1]
];

var backPivotPositions = 
[

];

var righPivotPositions = 
[   [-1,-1,-1], 
    [-1,-1,0],
    [-1,-1,1],
    [-1,0,-1],
    [-1,0,0],
    [-1,0,1],
    [-1,1,-1],
    [-1,1,0],
    [-1,1,1]
];


var leftPivotPositions = 
[   [1,-1,-1], 
    [1,-1,0],
    [1,-1,1],
    [1,0,-1],
    [1,0,0],
    [1,0,1],
    [1,1,-1],
    [1,1,0],
    [1,1,1]
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

    updatePivot(cube, positions, pivot);
    setOriginalCopyVisible(cube, pivot, positions, originalCubeVisible)

}
export function deactivateSide(cube, pivot)
{
    pivot.visible = false;

    var positions = sideNameToPositions.get(pivot.name);

    setOriginalCopyVisible(cube, pivot, positions, pivot);
}


function updatePivot(cube, pivotPositions, pivot)
{
    for(var i = 0; i < cube.children.length; i++)
    {
        var child = cube.children[i];
        var pos = [child.userData.X , child.userData.Y , child.userData.Z];


        if(pivotListContainsPos(pos, pivotPositions))
        {
            pivot.attach(child.clone());
        }
    }
    
    pivot.visible = true;

}

function pivotListContainsPos(pos, posList)
{
    for(var i = 0; i < posList.length; i++)
    {
        var subList = posList[i];
        var result = true;
        for(var j = 0; j < subList.length; j++)
        {
            if(subList[j] != pos[j])
            {
                result = false;
            }

        }

        if(result)
            return true;
    }
    return false;
}

export function setOriginalCopyVisible(cube, pivot, pivotPositions, visible)
{

    if(!visible)
    {
        for(var i = 0; i < cube.children.length; i++)
        {
            var child = cube.children[i];
            var pos = [child.userData.X , child.userData.Y , child.userData.Z];
    
            if(pivotListContainsPos(pos, pivotPositions))
            {
                child.visible = visible;
            }
        }
    }
    else
    {
        copySideToOriginal(cube, pivot);
    }
}

function copySideToOriginal(cube, pivot)
{
    for(var i = 0; i < pivot.children.length; i++)
    {
        var child = pivot.children[i];
        var x = child.userData.X;
        var y = child.userData.y;
        var z = child.userData.z;
        var sidePiece = getObjectFromPosition(pivot, x, y, z);
        var originalPiece = getObjectFromPosition(cube, x, y, z);

        cube.remove(originalPiece);
        //cube.add(sidePiece);
    }
}

function getObjectFromPosition(obj, x, y, z)
{
    for(var i = 0; i < obj.children.length; i++)
    {
        var child = obj.children[i]; 
        if(child.userData.X == x
            && child.userData.Y == y
            && child.userData.Z == z)
            {
                console.log("true");
                return child;

            }
    }
    return null;
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