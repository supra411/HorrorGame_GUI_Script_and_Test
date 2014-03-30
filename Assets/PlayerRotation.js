#pragma strict

var target : Transform; //Invisible target to keep this script looking at.

function Update () {
	var relativePos : Vector3 = target.position - transform.position; //Var.relativePos computes the direction from transform.position to target.position (needs (0, 0, 0) coordinates).
	relativePos = Vector3(relativePos.x, 0, relativePos.z);
	var rotation = Quaternion.LookRotation(relativePos);
	transform.rotation = rotation;
}