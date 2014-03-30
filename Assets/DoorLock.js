#pragma strict
import System.Collections.Generic;

var p1Pos : Transform; //p1's position to measure distance.
var openDistance : float = 3; //Max. distance that p1 needs to be from the door to open it.

@System.NonSerialized
var eventSwitch = new boolean[5]; //eventSwitch turns on/off triggers and colliders.

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


@System.NonSerialized
var TriggerScript : TriggerScript;
TriggerScript = p1Avatar.GetComponent("TriggerScript");

function Start () {
	eventSwitch = [true, true, true, true, true];
}

function Update () {
	//Var.distance is the distance between p1 and door. Used sqrMagnitude to save processing power.
	var distance : float = (transform.position - p1Pos.position).sqrMagnitude;
	if (distance < openDistance * openDistance) { //Compares distance to openDistance to see if p1 is close enough to open the door.
		if (Input.GetKeyUp(KeyCode.Space)) {
			var haveKey : boolean = SaveData.ConsumeItem (itemType.key);
			if (haveKey) {
				PlayerSpeech.Talk ("Voila!", 1);
				haveKey = false;
				StartCoroutine(OpenDoor ());
			}
			else if (!haveKey) {
				PlayerSpeech.Talk ("I don't have a key.", 1.5);
				if (eventSwitch[0]) {
					if (gameObject.name == "door_04") {
						print("Monster sequence. Step 1");
						eventSwitch[0] = false;
						TriggerScript.EventSwitchScript (1, true);
					}
				}
			}
		}
	}
}

var doorSpeed : float = 0.01; //Speed of door swing.
var doorSpeedSlope : float = 2.5; //Slope of door's swing speed.

@System.NonSerialized
var startRotation : Quaternion;

function OpenDoor () {
	var startRotation = transform.rotation; //Current rotation of the door.
	var endRotation = transform.rotation.eulerAngles; //Current rotation of the door to add y rotation by 115 degrees.
	endRotation.y += 115; //Add 115 degrees to endRotation.y, so the stop will stop at 115 degrees.
	var swingIncrement : float = 0;
	while (swingIncrement < 1) {
		swingIncrement += doorSpeed * (2 / (1 + (doorSpeedSlope * swingIncrement)));
		transform.rotation = Quaternion.Lerp(startRotation, Quaternion.Euler(endRotation), swingIncrement);
		yield;
	}
}