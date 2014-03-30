#pragma strict
 
var damping = 6.0;
var smooth = true;
 
var area: Rect; //The area where the AI should stay in.
var speed: float; //The moving speed in float ( 0.1 0.2 1.2 etc)
private var me: Transform; //The AI itself (in my case a cube)
private var target: Transform;
private var doLookAt: boolean = false;
private var targetPosXZ: Vector3; //Make sure it is global
 
 
function Awake () { //Is called when the game is loaded
 me = transform; //Sets me to the cube
 if (rigidbody)
  rigidbody.freezeRotation = true;
}
 
 
function LateUpdate () {
 //if (target) { //We do have a target but this will get in our way later on so remove this if statement!
  if (smooth && doLookAt == true)
  {
   // Look at and dampen the rotation
   var rotation = Quaternion.LookRotation(targetPosXZ - me.position);
   me.rotation = Quaternion.Slerp(me.rotation, rotation, Time.deltaTime * damping);
  }
  else if(!smooth && doLookAt == true) //This else made the problem
  {
   // Remember that we got the variable: targetPosXZ Because we dont want it to look up? 
   //Remember to change it in this smooth scripts
      transform.LookAt(targetPosXZ);
  }
 //}
}
 
//Let the AI Follow the player when it is within 20 units.
//We're going to use something called: Pythagorean theorem
//I don't know the right name in english but wikipedia should do you.
// A²+B²=C³
// A is transform.x - target.x
// B is transform.y - target.y
//BUT this can also make negative values for example:
// A = 120-150 = -30
//To make sure we always get positive we're going to use Mathf.Abs
//This makes sure that the outcome is always positive Ex:
// Mathf.Abs(-23) = 23
// Mathf.Abs(23) = 23
//Let's start
 
function Update () { //Gets called alot
 target = GameObject.FindWithTag("Player").transform; //Finds a nearby object with the tag 'Player' 
 var dist: float;
 targetPosXZ = Vector3(target.position.x, me.position.y, target.position.z);
 //This is just the same as we did first but this doesnt take up that much space.
 dist = Mathf.Sqrt(Mathf.Pow(Mathf.Abs(target.position.x - me.position.x),2) + Mathf.Pow(Mathf.Abs(target.position.z - me.position.z),2));
  
 doLookAt = false;
  
 //Lets let the cube look at us when we're within 10 units And it is higher then 3 units
 if(dist <= 10 && dist > 1.2)
 {
  doLookAt = true;
   
  //Now to make it move:
  //We need to change to target position because we don't want the cube to move up.
  //There are multiple ways of changing this for example to make a new variable (usefull later)
  //Or to directly make a new Vector3 (I'm gonna use the new variable because it will be usefull later)
  me.position = Vector3.MoveTowards(me.position, targetPosXZ, speed * Time.deltaTime);
   
  //Debug a 3D line to show where our cube is going.
  Debug.DrawLine(me.position, targetPosXZ); //As easy as that!
 }
 else if(dist <= 1.2) //If cube is within 3 units from the player
 {
  doLookAt = true;
 }
  
 //Lets output the distance in the console.
 //Debug.Log(dist);
  
}