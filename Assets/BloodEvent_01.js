#pragma strict

//Accessing SoundWave script.
var overlord : GameObject;
overlord = GameObject.Find("overlord");
var SoundWave : SoundWave;
SoundWave = overlord.GetComponent("SoundWave");

//Accessing PlayerSpeech script.
@System.NonSerialized
var p1Avatar : GameObject;
p1Avatar = GameObject.Find("p1Avatar");
@System.NonSerialized
var PlayerSpeech : PlayerSpeech;
PlayerSpeech = p1Avatar.GetComponent("PlayerSpeech");

var growSpeed : float = 1;
var maxSize: float = 0.5;
var stopTalk : boolean; //Switch for Player speech so it doesn't keep running.

function Start () {
	transform.localScale = Vector3.zero;
}

function StartEvent() {
	stopTalk = true;
	while (transform.lossyScale.x < maxSize) {
		transform.localScale += Vector3(0.1, 0, 0.1) * Time.deltaTime * growSpeed;
		var movePos : Vector3 = Vector3(0, 0, -0.5) * Time.deltaTime * growSpeed;
		transform.Translate(movePos);
		if  (transform.lossyScale.x < (maxSize/1.25) && !stopTalk)
			PlayerSpeech.Talk("Oh my God ... What's on the other side?", 2.0);
			stopTalk = false;
		yield WaitForFixedUpdate();
	}
}

function DestroyEvent () {
	SoundWave.SoundInput (0.333, gameObject.transform);
	Destroy(gameObject);
}