#pragma strict

//Accessing PlayerSpeech script.
var p1Avatar : GameObject;
p1Avatar = GameObject.Find("p1Avatar");
var PlayerSpeech : PlayerSpeech;
PlayerSpeech = p1Avatar.GetComponent("PlayerSpeech");

var girlEvent01 : Transform;
var girlPrefab : GameObject;
var p1Pos : Transform;

function Start () {
	light.intensity = 0;
}

function StartEvent () {
	PlayerSpeech.Talk ("What the ...", 0.75); //Gives p1 speech through GUI.
	var interval : float = Mathf.Round(Random.Range (2,5));
	var girlInterval : int = Mathf.RoundToInt ((interval * 2) / 3);
	print ("Lighting, how many times? " + interval + " | girl interval: " + girlInterval);
	var girlSpeed : float = 0.7  / (1 + interval); //Increment as girl moves towards p1.
	var girlInc : float = 0;
	for (var i=0;i<=interval;i++) {
		var timer : float = Random.Range (0.3, 1.0); //Timer for lighting flashes.
		var intensity : float = Random.Range (3, 8); //Intensity of lighting.
		if (girlInterval > 0) {
			var prefabTimer : float = timer / 2.5; //Timer for prefab to disappear. She will disappear before lighting flash goes out.
			var dist : float = Vector3.Distance(girlEvent01.position, p1Pos.position); //Sets var.dist as the distance between girl and p1.
			girlInc += girlSpeed; //Increments prefab's position as she get's closer to player.
			var travelPt : float = Mathf.Lerp (0, dist, girlInc); //Moving gob
			var girlMove : Vector3 = travelPt * Vector3.Normalize (p1Pos.position - girlEvent01.position) + girlEvent01.position; 
			girlEvent01.LookAt(p1Pos); //Rotate girl to face p1.
			var girlRotation : Quaternion = girlEvent01.rotation;
			girlRotation.y += 180;
			girlInterval--;
			var girl : GameObject = Instantiate(girlPrefab, girlMove, girlRotation);
		}
		while (timer > 0) {
			var lightPow = intensity * Mathf.Pow(timer,1.5);
			light.intensity = lightPow;
			timer -= Time.deltaTime;
			prefabTimer -= Time.deltaTime;
			if (prefabTimer < 0 && girl)
				Destroy(girl);
			yield;
		}
	}
}