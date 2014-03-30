#pragma strict
import System.Collections.Generic;

var p1Pos : Transform; //p1's position to measure distance.
var openDistance : float = 4; //Max. distance that p1 needs to be from the door to open it.

//Accessing SaveData script.
@System.NonSerialized
var overlord : GameObject;
overlord = GameObject.Find("overlord");
@System.NonSerialized
var SaveData : SaveData;
SaveData = overlord.GetComponent("SaveData");

//Accessing PlayerSpeech script.
@System.NonSerialized
var p1Avatar : GameObject;
p1Avatar = GameObject.Find("p1Avatar");
@System.NonSerialized
var PlayerSpeech : PlayerSpeech;
PlayerSpeech = p1Avatar.GetComponent("PlayerSpeech");

function Update () {
	//Var.distance is the distance between p1 and door. Used sqrMagnitude to save processing power.
	var distance : float = (transform.position - p1Pos.position).sqrMagnitude;
	if (distance < openDistance * openDistance) { //Compares distance to openDistance to see if p1 is close enough to open the door.
		if (Input.GetKeyUp(KeyCode.Space)) {
			PlayerSpeech.Talk ("Locked. Strange, it doesn't have a keyhole.", 2.0);
		}
	}
}