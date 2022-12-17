

export function createRightPivot(cube, scene)
{
    var rightPivot = new THREE.Object3D();

    rightPivot.position.y = 6;
    rightPivot.position.z = 9;

    for(var i = 0; i < cube.children.length; i++)
    {
        console.log("cube child: " + cube.children[i].name);
        var child = cube.children[i];
        if(child.name === "RightParent") 
        {
            var copy = getChildrenCopy(child);
            for(var j = 0; j < copy.length; j++)
            {
                console.log("child: child: " + copy[j].name);
                rightPivot.add(copy[j]);
            }
        }
    }

    return rightPivot;

}

function getChildrenCopy(parent)
{
    var copy = [];

    for(var i = 0; i < parent.children.length; i++)
    {
        copy[i] = parent.children[i];
    }
    return copy;

}