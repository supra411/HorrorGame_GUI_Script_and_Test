#pragma strict
import System.Collections.Generic;

//Creating enum for item type.
enum itemType {key, note, puzzle}

//Variable for images.
var keyImg : Texture2D;
var noteImg : Texture2D;
var puzzleImg : Texture2D;

class Item {
    var typeOfItem : itemType; //The type of the item.
    var nameOfItem : String; //The name of the item.
    var descOfItem : String; //Description of the item.
    var imgOfItem : Texture2D;
	//Constructor.
    function Item (t : itemType, n : String, d : String, img : Texture2D) {
       typeOfItem = t;
       nameOfItem = n;
       descOfItem = d;
       imgOfItem = img;
    }
}

//Varibles and Arrays.
var inventory : List.<Item>;

function AddItem (t : itemType) {
	var d : String = ("I have a friend");
	var n : String = ("Friend");
	switch (t) {
		case itemType.key:
			d = "A key to a door.  Now to find the door ...";
			n = "A key";
			var img : Texture2D = keyImg;
			break;
		case itemType.note:
			d = "A note.  Written in a language that I don't understand.";
			n = "A note";
			img = noteImg;
			break;
		case itemType.puzzle:
			d = "A strange piece ... of jewelry?";
			n = "Strange jewelry";
			img = puzzleImg;
			break;
	}
	var item = new Item (t, n, d, img);
	inventory.Add(item);
}

function AddItem (t : itemType, n: String, d: String) {
	switch (t) {
		case itemType.key:
			var img : Texture2D = keyImg;
			break;
		case itemType.note:
			img = noteImg;
			break;
		case itemType.puzzle:
			img = puzzleImg;
			break;
	}
	var item = new Item (t, n, d, img);
	inventory.Add(item);
}

//Search in inventory to see if item name matches with argument.
function ConsumeItem (n : String) {
	for (var i=0; i<inventory.Count; i++) {
		if (inventory[i].nameOfItem == n) {
			inventory.RemoveAt(i);
			print ("Inventory: " + n + " found at index " + i);
			return true;
		}	
	}
	print ("Inventory: Cannont find " + n + ".");
	return false;
}

//Search and use item inventory that matches its TYPE.
function ConsumeItem (t : itemType) {
	for (var i=0; i<inventory.Count; i++) {
		if (inventory[i].typeOfItem == t) {
			inventory.RemoveAt(i);
			print ("Inventory: " + t + " found at index " + i);
			return true;
		}	
	}
	print ("Inventory: Cannont find " + t + ".");
	return false;
}

var menuSwitch : boolean; //Turns on/off menu.

function Update () {
	if (Input.GetKeyUp(KeyCode.K)) {
		AddItem (itemType.key);
		print ("Added key to inventory.");
	}
	if (Input.GetKeyUp(KeyCode.J)) {
		AddItem (itemType.note);
		print ("Added note to inventory.");
	}
	if (Input.GetKeyUp(KeyCode.P)) {
		for (var i=0; i<inventory.Count; i++)
			print ("Item number: " + (i+1) + " | Item Name: " + inventory[i].nameOfItem + " | " + inventory[i].descOfItem);
	}
	if (Input.GetKeyUp(KeyCode.I)) {
		if (!menuSwitch) {
			lvl1 = menuLvl.inventory;
			showItem = -1;
			menuSwitch = true;
			PlayerMove.enabled = false;
			TargetMove.enabled = false;
			CameraFollow.enabled = false;
		}
		else if (menuSwitch) {
			menuSwitch = false;
			PlayerMove.enabled = true;
			TargetMove.enabled = true;
			CameraFollow.enabled = true;
		}
	}
}

//Accessing PlayerMove script.
@System.NonSerialized
var p1Avatar : GameObject;
p1Avatar = GameObject.Find("p1Avatar");
var PlayerMove : PlayerMove;
PlayerMove = p1Avatar.GetComponent("PlayerMove");

//Accessing TargetMove script.
@System.NonSerialized
var p1Follow : GameObject;
p1Follow = GameObject.Find("p1Follow");
@System.NonSerialized
var TargetMove : TargetMove;
TargetMove = p1Follow.GetComponent("TargetMove");

//Accessing CameraFollow script.
@System.NonSerialized
var p1CameraGameObject : GameObject;
p1CameraGameObject = GameObject.Find("p1Camera");
@System.NonSerialized
var CameraFollow : CameraFollow;
CameraFollow = p1CameraGameObject.GetComponent("CameraFollow");

@System.NonSerialized
var guiX : float;
@System.NonSerialized
var guiY : float;
@System.NonSerialized
var guiH : float;
@System.NonSerialized
var guiS : float;
@System.NonSerialized
var itemBoxX : float;
@System.NonSerialized
var skinForGUI : GUISkin; //Accessing GUI Skin.
@System.NonSerialized
var showItem : int;
@System.NonSerialized
var lvl1 : menuLvl; //Item chosen in first level of menu (i.e., inventory, story, options, etc.)

var unitSize : float = 0.05; //Square unit based on Screen.height.
var unitSpace : float = 0.02; //Gap between units.
var readX : float = 0.1;
var readY : float = 0.1;
var itemBox : float = 0.3;

enum menuLvl {inventory, story, options}

function Start () {
	guiX = Screen.width * readX;
	guiY = Screen.height * readY;
	itemBoxX = Screen.width * itemBox;
	guiH = Screen.height * unitSize;
	guiS = Screen.height * unitSpace;
	menuSwitch = false;
	skinForGUI = Resources.Load("skinForGUI");
}

function OnGUI () {
	if (menuSwitch) {
		print("Turn on menu GUI.");
		GUI.skin = skinForGUI;
		GUI.depth = -10;
		GUI.BeginGroup(Rect(guiX, guiY, 15*guiH, 5*guiH));
			GUI.BeginGroup(Rect(0, 0, 3*guiH, 5*guiH));
				if (GUI.Button(Rect(0, 0, 3*guiH, guiH), "Inventory")) {
					lvl1 = menuLvl.inventory;
				}
				if (GUI.Button(Rect(0, guiH+guiS, 3*guiH, guiH), "Story")) {
					lvl1 = menuLvl.story;
				}
				if (GUI.Button(Rect(0, 2*(guiH+guiS), 3*guiH, guiH), "Options")) {
					lvl1 = menuLvl.options;
				}
			GUI.EndGroup();
			if (lvl1 == menuLvl.inventory) {
				GUI.BeginGroup(Rect((3*guiH)+guiS, 0, 3*guiH, 5*guiH));
					if (inventory.Count>0) {
						for (var i=0; i<inventory.Count; i++) {
							if (GUI.Button(Rect(0, i*(guiH+guiS), 3*guiH, guiH), (i+1) + ". " + inventory[i].nameOfItem)) {
								showItem = i;
								print ("Checking item " + (showItem+1) + " | " + inventory[showItem].nameOfItem);
							}
						}
					}
					else
						GUI.Label(Rect(0, 0, 2*guiH, guiH), "No Item", "inventoryDetail");
				GUI.EndGroup();
				if (showItem >= 0) {
					GUI.BeginGroup(Rect((6*guiH) + (2*guiS), 0, 8*guiH, 5*guiH));//GUI for each item.
						GUI.Label(Rect(0, 0, 5*guiH, guiH), (showItem+1) + ". " + inventory[showItem].nameOfItem, "inventoryName");
						GUI.DrawTexture(Rect((5*guiH)+guiS, 0, guiH, guiH), inventory[showItem].imgOfItem, ScaleMode.ScaleToFit);
						GUI.Label(Rect(0, guiH+guiS, 8*guiH, (4*guiH)-guiS), inventory[showItem].descOfItem, "inventoryDetail");
					GUI.EndGroup();
				}
			}
			else if (lvl1 == menuLvl.story) {
				var noteCount : int = 0; //Number of notes for GUI layout.
				GUI.BeginGroup(Rect((3*guiH)+guiS, 0, 8*guiH, 5*guiH));
					if (inventory.Count>0) {
						for (i=0; i<inventory.Count; i++) {
							if (inventory[i].typeOfItem == itemType.note) {
								GUI.BeginGroup(Rect(0, noteCount*(guiH+guiS), 8*guiH, (3*guiH)+guiS));
									GUI.Label(Rect(0, 0, 3*guiH, 1.5*guiH), (showItem+1) + ". " + inventory[i].nameOfItem, "inventoryName");
									GUI.DrawTexture(Rect((3*guiH)+guiS, 0, guiH, guiH), inventory[i].imgOfItem, ScaleMode.ScaleToFit);
									GUI.Label(Rect(0, (1.5*guiH)+guiS, 8*guiH, (4*guiH)-guiS), inventory[i].descOfItem, "inventoryDetail");
									noteCount ++;
								GUI.EndGroup();
							}
							if (noteCount<=0)
								GUI.Label(Rect(0, 0, 8*guiH, 2*guiH), "At the beginning ...", "inventoryDetail");
						}
					}
					else
						GUI.Label(Rect(0, 0, 8*guiH, guiH), "At the beginning ...", "inventoryDetail");
				GUI.EndGroup();
			}
		GUI.EndGroup();
	}
}