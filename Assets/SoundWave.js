#pragma strict
import System.Collections.Generic;

@System.NonSerialized
var p1Avatar : GameObject;
p1Avatar = GameObject.Find("p1Avatar");

var soundSpeed : float = 40.0;
var soundImg : Texture2D;

@System.NonSerialized
var soundList : List.<Sound> = new List.<Sound>(); ; //Generic List for sounds.

@System.NonSerialized
var p1Camera : Camera;
p1Camera = GameObject.Find("p1Camera").camera;

function Start() {
	soundList.Clear();
}

class Sound { //
	var amp : float; //Stores alpha of soundwave. Read only.
	var size : float; //Stores size of soundwave. Read only.
	var maxSize : float; //Stores maxSize of soundwave. Doesn't change
//	var sSpeed : float; //!!!DEBUG!!! Remove if you decide that speed of soundwave will always be the same.
	var disp : float; //Displacement of soundwave's (0,0) point from it's center. Proportional to its size.
	var loc : Vector3; //Stores world coordinate of the center of the soundwave.
	function Sound (m : float, t: Vector3) {
		amp = 1; //New soundwave always starts at 1.
		size = 0; //Size always starts at 0;
		maxSize = m;
		loc = t;
	}
}

//Function used by other options.
function SoundInput (m : float, t : Transform) {
	var pos : Vector3 = t.position;
	var sound = new Sound (m, pos);
	soundList.Add(sound);
}

function SoundManage () {
	if (soundList.Count>0){
		var soundSize : int = soundList.Count;
		for (var i=0; i<soundList.Count; i++) {
			soundList[i].size += ((soundSpeed / 100) * Time.deltaTime) * Screen.width;
			soundList[i].disp += (((soundSpeed / 100) * Screen.width) / 2) * Time.deltaTime;
			soundList[i].amp = 1 - (soundList[i].size / (soundList[i].maxSize * Screen.width));
			if (soundList[i].amp <= 0) {
				soundList.RemoveAt(i);
				i--;
			}
		}
	}
}

function OnGUI () {
	if (soundList.Count>0) {
		SoundManage();
		for (var i=0; i<soundList.Count; i++) {
			var soundLoc : Vector2 = p1Camera.WorldToScreenPoint (soundList[i].loc);
			var sY : float = Screen.height - soundLoc.y - soundList[i].disp;
			var sX : float = soundLoc.x - soundList[i].disp;
			GUI.color.a = soundList[i].amp;
			GUI.DrawTexture(Rect(sX, sY, soundList[i].size, soundList[i].size), soundImg, ScaleMode.ScaleToFit);
		}
	}
}

//Test sound script.
function Update() {
	if (Input.GetKeyUp(KeyCode.X)) {
		SoundInput (.5, p1Avatar.transform);
	}
}