
var rightPivot, leftPivot, topPivot, bottomPivot, frontPivot, backPivot;

export function getRightPivot()
{
    return rightPivot;
}

export function getLeftPivot()
{
    return leftPivot;
}

export function getTopPivot()
{
    return topPivot;
}

export function getBottomPivot()
{
    return bottomPivot;
}

export function getFrontPivot()
{
    return frontPivot;
}

export function getBackPivot()
{
    return backPivot;
}

export function createPivots(scene)
{
    rightPivot = createPivot(scene, "RightParent");
    scene.add(rightPivot);

    leftPivot = createPivot(scene, "LeftParent");

    var col = 0;
    var rows = [0, 1, 2];

    var sides = ["FrontParent", "TopParent", "BackParent", "BottomParent"];

    for(var sideIndex = 0; sideIndex < sides.length; sideIndex++)
    {
        var children = scene.getObjectByName(sides[sideIndex]).children;
        for(var i = 0; i < children.length; i++)
        {
            var child = children[i];
            if(rows.includes(child.userData.ROW)
                && child.userData.COL == col)
            {
                leftPivot.attach(children[i]);
            }
        }    
    }
    
    scene.add(leftPivot);

    topPivot = createPivot(scene, "TopParent");
    scene.add(topPivot);

    bottomPivot = createPivot(scene, "BottomParent");
    scene.add(bottomPivot);

    frontPivot = createPivot(scene, "FrontParent");
    scene.add(frontPivot);

    backPivot = createPivot(scene, "BackParent");
    scene.add(backPivot);

}

function createPivot(scene, parentName)
{
    var pivot = new THREE.Group();
    
    var parent = scene.getObjectByName(parentName);

    pivot.position.set(parent.position.x, parent.position.y, parent.position.z);
    pivot.rotation.set(parent.rotation.x, parent.rotation.y, parent.rotation.z);

    var childrenCopy = getChildrenCopy(parent);
    for(var i = 0; i < childrenCopy.length; i++)
    {
        pivot.add(childrenCopy[i]);
    }

    return pivot;

}

function getChildrenCopy(parent)
{
    var children = [];

    for(var i = 0; i < parent.children.length; i++)
    {
        children.push(parent.children[i]);
    }
    return children;

}