#pragma strict

//Accessing MonsterSpeech script.
@System.NonSerialized
var overlord : GameObject;
overlord = GameObject.Find("overlord");
@System.NonSerialized
var MonsterSpeech : MonsterSpeech;
MonsterSpeech = overlord.GetComponent("MonsterSpeech");
@System.NonSerialized
var SoundWave : SoundWave;
SoundWave = overlord.GetComponent("SoundWave");

@System.NonSerialized
var monster : GameObject;
@System.NonSerialized
var key : GameObject;

var monsterPrefab : GameObject;
var p1Pos : Transform;
var monsterSpeed : float = 5;
var openDistance : float = 3;

function StartEvent () {
	print ("Reached PleaEvent_01");
	monster = Instantiate(monsterPrefab, transform.position, transform.rotation);
	SoundWave.SoundInput (0.3, monster.transform);
	monster.transform.LookAt(p1Pos); //Rotate girl to face p1.
	MonsterSpeech.Talk(true, "Please ...", 2, gameObject);
	yield WaitForSeconds (2.0);
	MonsterSpeech.Talk(true, "... help me ...", 1.0, gameObject);
	yield WaitForSeconds (1.0);
	Destroy (monster);
}