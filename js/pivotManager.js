var rightPivot = new THREE.Object3D(),
leftPivot = new THREE.Object3D(),
topPivot,
bottomPivot,
frontPivot,
backPivot;


var righPivotPositions = 
["-1,-1,-1", 
"-1,-1,0",
"-1,-1,1",
"-1,0,-1",
"-1,0,0",
"-1,0,1",
"-1,1,-1",
"-1,1,0",
"-1,1,1"];


var leftPivotPositions = 
["1,-1,-1", 
"1,-1,0",
"1,-1,1",
"1,0,-1",
"1,0,0",
"1,0,1",
"1,1,-1",
"1,1,0",
"1,1,1"];

export function getRightPivot()
{
    return rightPivot;
}

export function getLeftPivot()
{
    return leftPivot;
}

export function createPivots(scene, cube)
{
    updatePivot(scene, cube, leftPivotPositions, leftPivot);
}

function updatePivot(scene, cube, pivotPositions, pivot)
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

    scene.add(pivot);
}

export function disableLefttSide(cube)
{
    console.log("cube " + cube);
    for(var i = 0; i < cube.children.length; i++)
    {
        var child = cube.children[i];
        var posString = child.userData.X + "," + child.userData.Y + "," + child.userData.Z;
        
        console.log(posString);

        if(leftPivotPositions.includes(posString))
        {
            child.visible = false;
        }
    }
}