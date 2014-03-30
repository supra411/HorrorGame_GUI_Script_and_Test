#pragma strict

enum p1Control {full, vertical, horizontal}

var moveSpeed : float = 3;
var lastPos : Vector3;

@System.NonSerialized
var controllerMovement : Vector3;
@System.NonSerialized
var hitCollision : boolean;

function Start () {
	hitCollision = true;
}

var radius : float = 4.0; //Radius for sphere to test distance.

//Accessing lamp
@System.NonSerialized
var lampLight : Light;
lampLight = GameObject.Find("lampLight").light;

var rockPrefab : GameObject;

function Update () {
	if (hitCollision) {
		var vertical : float = Input.GetAxisRaw("Vertical");
			controllerMovement += Vector3(0, 0, vertical * moveSpeed);
		var horizontal : float = Input.GetAxisRaw	("Horizontal");
			controllerMovement += Vector3(horizontal * moveSpeed, 0, 0 );
//		if (Input.GetAxisRaw ("Vertical") < -.1)
//			controllerMovement += Vector3(0, 0,-1 * moveSpeed);
//	    if (Input.GetAxisRaw ("Vertical") > .1)
//	    	controllerMovement += Vector3(0, 0, 1 * moveSpeed);
//	    if (Input.GetAxisRaw ("Horizontal") < -.1)
//	    	controllerMovement += Vector3(-1 * moveSpeed, 0, 0);
//	    if (Input.GetAxisRaw ("Horizontal") > .1)
//	    	controllerMovement += Vector3(1 * moveSpeed, 0, 0);
	}
	else if (!hitCollision)
		hitCollision = true;
	}
	if (Input.GetKeyUp(KeyCode.C)) { //Crouching: layer 9 = under.
		if (gameObject.layer != 9) {
			gameObject.layer = 9;
			print ("Hiding under object");
		}
		else {
			gameObject.layer = 0;
			print ("Standing after hiding.");
		}
	if (Input.GetKeyUp(KeyCode.Q)) {
		var wallArray : Collider[] = Physics.OverlapSphere (transform.position, radius);
		var distClosest : float = Mathf.Infinity;
		for (var wall : Collider in wallArray) {
			if (wall.CompareTag("wall")) {
				var dist : float = (transform.position - wall.gameObject.transform.position).sqrMagnitude;
				if (dist < distClosest) {
					var wallClosest : Collider = wall;
					distClosest = dist;
				}			
			}
		}
		print ("Sidling to " + wallClosest.gameObject.name);
	}
    if (Input.GetKeyUp(KeyCode.E)) {
    	if (lampLight.enabled)
    		lampLight.enabled = false;
    	else
    		lampLight.enabled = true;
    }

}

//Target for throwDist.
@System.NonSerialized
var p1Follow : Transform;
p1Follow = GameObject.Find("p1Follow").transform;

//Accessing rockMuzzle.
@System.NonSerialized
var rockMuzzle : Transform;
rockMuzzle = GameObject.Find("rockMuzzle").transform;

var rawStrength : float = 0.05;

function FixedUpdate () {
	rigidbody.velocity = Vector3.zero;
	transform.Translate (controllerMovement * Time.deltaTime, Space.World);
	controllerMovement = Vector3.zero;
    if (Input.GetMouseButtonUp(0)){
    	var throwDist : float = Vector3.Distance(rockMuzzle.position, p1Follow.position);
    	var throwForce : float = throwDist * rawStrength;
    	print("Left Mouse Click");
    	var rock : GameObject = Instantiate(rockPrefab, rockMuzzle.position, transform.localRotation);
    	
    	rock.rigidbody.AddRelativeForce(Vector3.forward * throwForce, ForceMode.Impulse);
    }
}

function OnCollisionEnter (other : Collision) {
    hitCollision = false;
}