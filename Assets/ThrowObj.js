#pragma strict

//Accessing SoundWave script.
@System.NonSerialized
var overlord : GameObject;
overlord = GameObject.Find("overlord");
@System.NonSerialized
var SoundWave : SoundWave;
SoundWave = overlord.GetComponent("SoundWave");

@System.NonSerialized
var soundSize : float;
@System.NonSerialized
var lastPos : Vector3; //Most recent recorded position since last update.
@System.NonSerialized
var timer : float;

var startSize : float = 0.3;
//var throwForce : float = 500.0;
var timerStart : float = 0.3;

function Start () {
//	gameObject.rigidbody.AddForce(Vector3.forward * throwForce, ForceMode.Acceleration);
	soundSize = startSize;
	
}

function OnCollisionEnter (other : Collision) {
	SoundWave.SoundInput (soundSize, gameObject.transform);
	soundSize *= 0.5;
}

function Update () {
//Once every mini second, the game will check the movement made since last var.timer update.
	if (timer>0)
		timer -=Time.deltaTime;
	else {
		if ((transform.position - lastPos).sqrMagnitude < 1) {
			print ("Disappearing rock");
			Destroy(gameObject);
		}
		lastPos = transform.position;
		timer = timerStart;
	}
}