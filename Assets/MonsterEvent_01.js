#pragma strict

//Accessing PlayerSpeech script.
@System.NonSerialized
var p1Avatar : GameObject;
p1Avatar = GameObject.Find("p1Avatar");
@System.NonSerialized
var PlayerSpeech : PlayerSpeech;
PlayerSpeech = p1Avatar.GetComponent("PlayerSpeech");

//Accessing SoundWave script.
@System.NonSerialized
var overlord : GameObject;
overlord = GameObject.Find("overlord");
@System.NonSerialized
var SoundWave : SoundWave;
SoundWave = overlord.GetComponent("SoundWave");


@System.NonSerialized
var monster : GameObject;
@System.NonSerialized
var key : GameObject;

var skeletonPrefab : GameObject;
var p1Pos : Transform;
var keyPrefab : GameObject;

@System.NonSerialized
var stepTimer : float;
@System.NonSerialized
var monsterSwitch : boolean;

var monsterStepFreq : float = 0.3; //Time (in secs) between steps for soundwave.
var monsterSpeed : float = 5;
var openDistance : float = 3;

function StartEvent () {
	stepTimer = 0;
	monsterSwitch = true;
	PlayerSpeech.Talk ("OH SHIT!", 1.0); //Gives p1 speech through GUI.
	monster = Instantiate(skeletonPrefab, transform.position, transform.rotation);
	while (monsterSwitch) {
//Rotates Monster so it's always facing p1.
		var relativePos : Vector3 = p1Pos.position - transform.position;
		relativePos = Vector3(relativePos.x, 0, relativePos.z);
		var rotation = Quaternion.LookRotation(relativePos);
		monster.transform.rotation = rotation;
//		transform.LookAt(p1Pos);
//Moves the monster towards p1.
		monster.transform.Translate (Vector3.forward * monsterSpeed * Time.deltaTime);
//		transform.position = Vector3.MoveTowards(transform.position, p1Pos.position, monsterSpeed * Time.deltaTime);
//Destroys monster if it reaches var.openDistance away from p1.
		var distance : float = (monster.transform.position - p1Pos.position).sqrMagnitude;
		if (stepTimer > 0)
			stepTimer -= Time.deltaTime;
		else {
			SoundWave.SoundInput (0.3, monster.transform);
			stepTimer = monsterStepFreq;
		}
		if (distance < openDistance * openDistance)
			monsterSwitch = false;
		yield WaitForFixedUpdate();
	}
	var keyPos : Vector3 = monster.transform.position;
	Destroy (monster);
	transform.position = monster.transform.position;
	key = Instantiate (keyPrefab, transform.position, transform.rotation);
}