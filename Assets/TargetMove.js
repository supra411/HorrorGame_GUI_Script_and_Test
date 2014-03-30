#pragma strict

var p1Camera : Camera;
var followPos : Vector3; //Position of target that is set up mouse input, without camera's height.
var targetPos : Vector3; //Final position of target.

function Update () {
	followPos = Input.mousePosition;
	targetPos = p1Camera.ScreenToWorldPoint(Vector3 (followPos.x, followPos.y, 15.0));
	transform.position = targetPos;
}