
var rightPivot, leftPivot, topPivot, bottomPivot, frontPivot, backPivot;

export function getRightPivot()
{
    return rightPivot;
}

export function initPivots(scene)
{
    rightPivot = createPivot(scene, "RightParent");
    scene.add(rightPivot);
}

function createPivot(scene, parentName)
{
    var pivot = new THREE.Object3D();
    
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