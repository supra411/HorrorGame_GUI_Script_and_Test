#pragma strict
/* 

* Camera's x and z follows Camera.

* Camera's y is determined by whether the player is moving or not. If player is moving, it sets the y to 
* topHeight. If the player stops moving, it sets y to bottomHeight.  It will use Mathf.Lerp to smooth
* camera y movement.

*/

var p1 : Transform;
var topY : float = 14.0; //Camera's supposed y coordinates when player is moving
var bottomY : float = 8.0; //Camera's supposed y coordinates when player stops moving.
var futureY : float; //Camera's future y coordinates.
var currentY : float; //Camera's current y coordinates.
var posX : float; //Camera's x coordinates.
var posZ : float; //Camera's z coordinates.
var timerSwitch : boolean; //Switch to turn timer on and off for moving camera up and down.
var zoomWaitTime : float = 0.5; //Sets timer's length.
var timer : float; //Timer's variable
var zoomSpeed : float = 0.05; //Sets the speed that camera's zoom. MUST be between 1 and 0.

function Start () {
	timerSwitch = false;
	futureY = bottomY;
	currentY = bottomY;
}

function Update () {
//Detects if player press down WASD, set future Tand sets stopTimer to true.
	if (Input.GetButtonDown("Vertical") || Input.GetButtonDown("Horizontal")) {
		futureY = topY;
		timerSwitch = false;
	}
	if (Input.GetButton("Vertical") || Input.GetButton("Horizontal")) {
		timerSwitch = false;
	}
//Dectects if player releases WASD, and sets stopTimer to false.
	else if (Input.GetButtonUp("Vertical") || Input.GetButtonUp("Horizontal")) {
		timer = zoomWaitTime;
		timerSwitch = true;
	}
//Begins timer if !stopTimer.  If timer <= 0, it sets  
	if (timerSwitch) {
		if (timer > 0)
			timer -= Time.deltaTime;
		if (timer<=0){
			futureY = bottomY;
			timerSwitch = false;
		}
	}
//Sets camera's x,y,z variables, and sets it's position to those coordinates.
	currentY = Mathf.Lerp(currentY, futureY, zoomSpeed);
	var p1Vector : Vector3 = new Vector3 (p1.position.x, currentY, p1.position.z);
	transform.position = p1Vector;
}