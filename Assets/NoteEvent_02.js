#pragma strict

@System.NonSerialized
var inRange : boolean; //(For GUI) Is p1 colliding with note's trigger?
@System.NonSerialized
var noteOn : boolean; //(For GUI) Reading note
@System.NonSerialized
var noteContent : String = "Investigating the shattered windshield, I saw that it still clings onto her hair.  What led to this?";
@System.NonSerialized
var noteName : String = "Diary Page\nJuly 3,1970";

function OnTriggerEnter(other : Collider) {
	print("Note collider ENTER : " + other.name);
	if (other.name == "p1Avatar")
		inRange = true;
}

function OnTriggerExit(other : Collider) {
	print("Note collider EXIT : " + other.name);
	if (other.name == "p1Avatar") {
		if (inRange)
			inRange = false;
	}
}

//Accessing p1 GameObject.
@System.NonSerialized
var p1Avatar : GameObject;
p1Avatar = GameObject.Find("p1Avatar");

//Accessing MovePlayer script in p1Avatar.
var PlayerMove : PlayerMove;
PlayerMove = p1Avatar.GetComponent("PlayerMove");

//Accessing MoveTarget script.
@System.NonSerialized
var p1Follow : GameObject;
p1Follow = GameObject.Find("p1Follow");
@System.NonSerialized
var TargetMove : TargetMove;
TargetMove = p1Follow.GetComponent("TargetMove");

//Accessing CameraFollow script.
@System.NonSerialized
var p1CameraGameObject : GameObject;
p1CameraGameObject = GameObject.Find("p1Camera");
@System.NonSerialized
var CameraFollow : CameraFollow;
CameraFollow = p1CameraGameObject.GetComponent("CameraFollow");

function OnTriggerStay (other : Collider) {
	if (other.name == "p1Avatar") {
		if (!noteOn) {
			if (Input.GetKeyUp(KeyCode.Space)) {
				if (inRange)
					inRange = false;
				noteOn = true;
				PlayerMove.enabled = false;
				TargetMove.enabled = false;
				CameraFollow.enabled = false;
			}
		}
		else {
			if (Input.GetKeyUp(KeyCode.Space)) {
				Destroy (gameObject, 0.5);
				SaveData.AddItem (itemType.note, noteName, noteContent);
				PlayerMove.enabled = true;
				TargetMove.enabled = true;
				CameraFollow.enabled = true;
			}
		}
	}
}

//Accessing SaveData script in game object overlord.
@System.NonSerialized
var overlord : GameObject;
overlord = GameObject.Find("overlord");
@System.NonSerialized
var SaveData : SaveData;
SaveData = overlord.GetComponent("SaveData");

var heightOfBox : float = 0.075; //Height of GUI box (in percentage to the screen).
var widthOfBox : float = 0.15; //Width of GUI box (in percentage to the screen).

@System.NonSerialized
var guiH : float;
@System.NonSerialized
var guiW : float;
@System.NonSerialized
var skinForGUI : GUISkin; //Accessing GUI Skin.

function Start () {
	guiH = Screen.height * heightOfBox;
	guiW = Screen.width * widthOfBox;
	inRange = false;
	noteOn = false;
	skinForGUI = Resources.Load("skinForGUI");
}

@System.NonSerialized
var p1Camera : Camera; //Camera for WorldToScreenPoint.
p1Camera = GameObject.Find("p1Camera").camera;

var noteImg : Texture2D; //Img of key for GUI.

var readStart : float = 0.2;

function OnGUI () {
	if (inRange) { //Colliding with ob
		GUI.skin = skinForGUI;
		var guiLocate : Vector2 = p1Camera.WorldToScreenPoint (transform.position);
		var guiY : float = Screen.height - guiLocate.y - guiH;
		var guiX : float = guiLocate.x - guiW;
		GUI.BeginGroup(Rect (guiX, guiY, guiW, guiH));
			GUI.Label(Rect (0, 0, guiH, guiH), "Note");
			GUI.DrawTexture (Rect (guiW/2, 0, guiH, guiH), noteImg, ScaleMode.ScaleToFit);
		GUI.EndGroup();
	}
	if (noteOn) {
		GUI.skin = skinForGUI;
		guiX = Screen.width * readStart;
		guiY = Screen.height * readStart;
		GUI.BeginGroup(Rect(guiX, guiY, 9.5*guiH, guiH));
			GUI.Label (Rect (0, 0, 3*guiH, guiH), noteName);
			GUI.DrawTexture (Rect (3*guiH, 0, guiH, guiH), noteImg, ScaleMode.ScaleToFit);
			GUI.Label (Rect (4.5*guiH, 0, 5*guiH, guiH), noteContent, "noteSkin");
		GUI.EndGroup();
	}
}