#pragma strict

@System.NonSerialized
var talking : boolean;
@System.NonSerialized
var timer : float;

var heightOfBox : float = 0.1; //Height of GUI box (in percentage to the screen).
var widthOfBox : float = 0.2; //Width of GUI box (in percentage to the screen).

@System.NonSerialized
var guiH : float; //Height of GUI.
@System.NonSerialized
var guiW : float; //Width of GUI.
@System.NonSerialized
var skinForGUI : GUISkin; //Accessing GUI Skin.

function Start () {
	guiH = Screen.height * heightOfBox;
	guiW = Screen.width * widthOfBox;
	talking = false;
	skinForGUI = Resources.Load("skinForGUI");
}

@System.NonSerialized
var speechBubble : String;

function Talk (s : String, t : float) {
	speechBubble = s;
	timer = t;
	talking = true;
}

//Camera for WorldToScreenPoint.
@System.NonSerialized
var p1Camera : Camera;
p1Camera = GameObject.Find("p1Camera").camera;

function OnGUI () {
	if (talking) {
		GUI.skin = skinForGUI;
		var guiLocate : Vector2 = p1Camera.WorldToScreenPoint (transform.position);
		var guiY : float = Screen.height - guiLocate.y - guiH;
		var guiX : float = guiLocate.x - guiW;
		GUI.BeginGroup (Rect (guiX, guiY, guiW, guiH));
			GUI.Label (Rect (0, 0, guiW, guiH/2), speechBubble, "speechSkin");
		GUI.EndGroup();
//Set timer for GUI so it doesn't last forever.
		if (timer > 0)
			timer -= Time.deltaTime;
		else if (timer <= 0)
			talking = false;
	}
}