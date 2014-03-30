#pragma strict

@System.NonSerialized
var inRange : boolean; //(For GUI) Is p1 colliding with key's trigger?

function OnTriggerEnter(other : Collider) {
	if (other.name == "p1Avatar")
		inRange = true;
}

function OnTriggerExit(other : Collider) {
	print("Key collider EXIT : " + other.name);
	if (other.name == "p1Avatar")
		inRange = false;
}

function OnTriggerStay (other : Collider) {
	if (other.name == "p1Avatar") {
		if (Input.GetKeyUp(KeyCode.Space)) {
			yield WaitForSeconds (0.5);
			SaveData.AddItem (itemType.key);
			Destroy (gameObject);
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

//Accessing p1Avatar.
@System.NonSerialized
var p1Avatar : GameObject;
p1Avatar = GameObject.Find("p1Avatar");

//Accessing key
@System.NonSerialized
var keyLight : Light; //Variable to access keyLight
keyLight = GameObject.Find("keyLight").GetComponent(Light);

var flashDistance : float = 8; //Distance between p1 and key before key starts flashing.
var lightFreq : float = 2; //How quickly does the key flashes? (Higher = faster).
var lightRange : float = 0.3; //Range of keyLight.range (Higher = Bigger difference between the highest and lowest possible value).
var lightMin : float = 0.5; //Smallest possible value for keyLight.range.

@System.NonSerialized
var lightTime : float; //Stores time for sin formula for the key's flashing.
@System.NonSerialized
var continueFlash : boolean; //Allows keyLight.range to go before zero before turning off (set to false).

var heightOfBox : float = 0.05; //Height of GUI box (in percentage to the screen).
var widthOfBox : float = 0.1; //Width of GUI box (in percentage to the screen).

@System.NonSerialized
var guiH : float;
@System.NonSerialized
var guiW : float;
@System.NonSerialized
var skinForGUI : GUISkin; //Accessing GUI Skin.

function Start () {
	lightTime = 0;
	continueFlash = false;
	guiH = Screen.height * heightOfBox;
	guiW = Screen.width * widthOfBox;
	inRange = false;
	keyLight.enabled = true;
	skinForGUI = Resources.Load("skinForGUI");
}

function Update () {
//Var.distance is the distance between p1 and key. Used sqrMagnitude to save processing power.
	var distance : float = (transform.position - p1Avatar.transform.position).sqrMagnitude;
	if (distance < flashDistance * flashDistance || continueFlash) { //Compares distance to flashDistance to start flash.
		print ("In range of key");
		lightTime += Time.deltaTime;
		keyLight.range = (((Mathf.Sin(lightTime * lightFreq) + 1) / 2) * lightRange) + lightMin;
		if (distance < flashDistance * flashDistance) {
			continueFlash = true;
		}
		else if (distance >= flashDistance * flashDistance) {
			print ("Out of range of key");
			if (keyLight.range <= lightMin + 0.1) {//Turns off flashing once p1 exits range of key 
				continueFlash = false;
				keyLight.range = 0;
			}
		}
	}
}

@System.NonSerialized
var p1Camera : Camera; //Camera for WorldToScreenPoint.
p1Camera = GameObject.Find("p1Camera").camera;

var keyImg : Texture2D; //Img of key for GUI.

function OnGUI () {
	if (inRange) {
		GUI.skin = skinForGUI;
		var guiLocate : Vector2 = p1Camera.WorldToScreenPoint (transform.position);
		var guiY : float = Screen.height - guiLocate.y - guiH;
		var guiX : float = guiLocate.x - guiW;
		GUI.BeginGroup (Rect (guiX, guiY, guiW, guiH));
			GUI.Label (Rect (0, 0, guiH, guiH), "Key");
			GUI.DrawTexture (Rect (guiW/2, 0, guiH, guiH), keyImg, ScaleMode.ScaleToFit);
		GUI.EndGroup();
	}
}