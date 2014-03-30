#pragma strict

//Access LightEvent_01 Script.
@System.NonSerialized
var lighting01 : GameObject;
lighting01 = GameObject.Find ("lighting01");
@System.NonSerialized
var LightEvent_01 : LightEvent_01;
LightEvent_01 = lighting01.GetComponent ("LightEvent_01");

//Access MonsterEvent_01 Script.
@System.NonSerialized
var monster01 : GameObject;
monster01 = GameObject.Find ("monster01");
@System.NonSerialized
var MonsterEvent_01 : MonsterEvent_01;
MonsterEvent_01 = monster01.GetComponent ("MonsterEvent_01");

//Access BloodEvent_01 Script.
@System.NonSerialized
var blood01 : GameObject;
blood01 = GameObject.Find ("blood01");
@System.NonSerialized
var BloodEvent_01 : BloodEvent_01;
BloodEvent_01 = blood01.GetComponent ("BloodEvent_01");

//Access PleaEvent_01 Script.
@System.NonSerialized
var plea01 : GameObject;
plea01 = GameObject.Find ("plea01");
@System.NonSerialized
var PleaEvent_01 : PleaEvent_01;
PleaEvent_01 = plea01.GetComponent ("PleaEvent_01");

@System.NonSerialized
var eventSwitch = new boolean [10]; //eventSwitch turns on/off triggers and colliders.

function Start () {
//Turns all the event switches on, except for the second one, which will be turned on when p1 touches door 
	eventSwitch = [true, false, true, true, false, true, true, true, true, true];
}


function OnTriggerEnter (trig : Collider) {
//Trigger Event for lighning and girl.
	if (eventSwitch[0]) {
		if (trig.gameObject.name == "triggerLighting_01") {
			eventSwitch[0] = false;
			LightEvent_01.StartEvent();
		}
	}
//Trigger event is for the monster at end of the level.
	if (eventSwitch[1]) {
		if (trig.gameObject.name == "triggerMonster_01") {
			eventSwitch[1] = false;
			MonsterEvent_01.StartEvent();
		}
	}
//Trigger event for plea event #1.  Location: At first hallway intersection adjacent to courtyard.
	if (eventSwitch[2]) {
		if (trig.gameObject.name == "triggerPlea_01") {
			eventSwitch[2] = false;
			PleaEvent_01.StartEvent();
		}
	}
	if (eventSwitch[3]) {
		if (trig.gameObject.name == "triggerPlea_02")
			eventSwitch[3] = false;
	}
//Trigger Event for blood.
	if (trig.gameObject.name == "triggerBlood_01") {
		BloodEvent_01.StartEvent();
		eventSwitch[4] = true;
	}
//Trigger Event to destroy blood.
	if (eventSwitch[4]) {
		if (trig.gameObject.name == "triggerBlood_01Off")
			BloodEvent_01.DestroyEvent();
	}
	if (trig.gameObject.name == "note01")
		print ("P1 touched note01.");
}

function OnTriggerExit (trig : Collider) {
	
}

function OnCollisionEnter (col : Collision) {
	if (col.gameObject.name == "girl")
		print ("P1 touched girl.");
}

//Activating/Deactiving eventSwitch(es) that were initially false/true.
function EventSwitchScript (n : int, b : boolean) {
	print ("eventSwitch[" + n + "]: " + b);
	eventSwitch[n] = b;
}