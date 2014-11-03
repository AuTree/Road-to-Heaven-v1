#pragma strict

var enableStore: boolean;
var openStore: boolean;
var pauseBackground: Texture2D;
var selGrid : int = -1;
var selector : int;
var cost: Vector3;

var storeSkin: GUISkin;
var errorSkin: GUISkin;
var mainScreenSkin: GUISkin;

var powerLabelW: int = 150;
var costPosW: int = 350;
var backgroundWidth: int = 700;
var backgroundHeight: int = 800;
var screenPosW: int = 241;
var screenPosH: int = 250;
var gridPosW: int = 75;
var gridPosH: int = 175;
var gridWidth: int = 550;
var gridHeight: int = 430;
var sBtnPosW: int = 300;
var sBtnPosH: int = 630;

private var screenName: String = "MainScreen";
private var powers : GUIContent[];
private var power1Names: String[];
private var power1Descs: String[];
private var power2Names: String[];
private var power2Descs: String[]; 
private var power3Names: String[]; 
private var power3Descs: String[]; 
private var power4Names: String[]; 
private var power4Descs: String[]; 
private var power5Names: String[]; 
private var power5Descs: String[]; 
private var power6Names: String[]; 
private var power6Descs: String[]; 
private var power7Names: String[]; 
private var power7Descs: String[]; 
private var power8Names: String[]; 
private var power8Descs: String[]; 
private var power9Names: String[]; 
private var power9Descs: String[]; 
private var power10Names: String[]; 
private var power10Descs: String[];
 
//Cast Vars
private var PS: PowerSystem;
private var PC: PlayerController;
private var GC: GameController;
private var AND: AStoreND;

function Awake()
{
	PS = GameObject.FindGameObjectWithTag("PlayerController").GetComponent(PowerSystem);
	PC = GameObject.FindGameObjectWithTag("PlayerController").GetComponent(PlayerController);
	GC = GameObject.FindGameObjectWithTag("GameController").GetComponent(GameController);
	AND = GameObject.FindGameObjectWithTag("GameVars").GetComponent(AStoreND);
}

function Start()
{
	powers = [new GUIContent (AND.angelPowerNames[0], AND.angelPowerImgs[0]), new GUIContent (AND.angelPowerNames[1], AND.angelPowerImgs[1]), 
	new GUIContent (AND.angelPowerNames[2], AND.angelPowerImgs[2]), new GUIContent (AND.angelPowerNames[3], AND.angelPowerImgs[3]), 
	new GUIContent (AND.angelPowerNames[4], AND.angelPowerImgs[4]), new GUIContent (AND.angelPowerNames[5], AND.angelPowerImgs[5]), 
	new GUIContent (AND.angelPowerNames[6], AND.angelPowerImgs[6]), new GUIContent (AND.angelPowerNames[7], AND.angelPowerImgs[7]), 
	new GUIContent (AND.angelPowerNames[8], AND.angelPowerImgs[8]), new GUIContent (AND.angelPowerNames[9], AND.angelPowerImgs[9])];
	 
	power1Names = AND.ability1Names;
	power1Descs = AND.ability1Descs;
	power2Names = AND.ability2Names;
	power2Descs = AND.ability2Descs;
	power3Names = AND.ability3Names;
	power3Descs = AND.ability3Descs;
	power4Names = AND.ability4Names;
	power4Descs = AND.ability4Descs;
	power5Names = AND.ability5Names;
	power5Descs = AND.ability5Descs;
	power6Names = AND.ability6Names;
	power6Descs = AND.ability6Descs;
	power7Names = AND.ability7Names;
	power7Descs = AND.ability7Descs;
	power8Names = AND.ability8Names;
	power8Descs = AND.ability8Descs;
	power9Names = AND.ability9Names;
	power9Descs = AND.ability9Descs;
	power10Names = AND.ability10Names;
	power10Descs = AND.ability10Descs;
}
	
function Update()
{
	if(enableStore && Input.GetButtonDown("Use"))
	{
		switch(openStore)
		{
			case true:
				openStore = false;
				PC.disableMovement = false;
				break;
				
			case false:
				openStore = true;
				PC.disableMovement = true;
				break;
				
			default:
				Debug.Log("Something is broken with the Angel Store System");
				break;
		}
		
	}
	
	if(GC.isPaused && openStore)
	{
		openStore = false;
	}
}

function OnGUI()
{
	if(openStore)
	{
		GUI.DrawTexture(Rect(Screen.width / 2 - (backgroundWidth/2), Screen.height / 2 - (backgroundHeight/2), backgroundWidth, backgroundHeight), pauseBackground);
		//Debug.Log(screenName);
		switch(screenName)
		{
			case "MainScreen":
				GUI.BeginGroup (Rect(Screen.width / 2 - backgroundWidth/2, Screen.height / 2 - backgroundHeight/2, backgroundWidth, backgroundHeight));
				GUI.skin = mainScreenSkin;
				selGrid = -1;
				selGrid = GUI.SelectionGrid(Rect (gridPosW, gridPosH, gridWidth, gridHeight), selGrid, powers, 2);
				
				if(GUI.Button(Rect(sBtnPosW, sBtnPosH, 100, 50), "Close"))
				{
					openStore = false;
					PC.disableMovement = false;
				}
				//Debug.Log(selGrid);
				switch(selGrid)
				{
					case 0:
						screenName = "Power 1";
						break;
					case 1:
						screenName = "Power 2";
						break;
					case 2:
						screenName = "Power 3";
						break;
					case 3:
						screenName = "Power 4";
						break;
					case 4:
						screenName = "Power 5";
						break;
					case 5:
						screenName = "Power 6";
						break;
					case 6:
						screenName = "Power 7";
						break;
					case 7:
						screenName = "Power 8";
						break;
					case 8:
						screenName = "Power 9";
						break;
					case 9:
						screenName = "Power 10";
						break;
					default:
						screenName = "MainScreen";
						//Debug.Log("Waiting for a Selection!");
						break;
				}	
				GUI.EndGroup ();
				break;
				
			case "Power 1":
				PowerGUI(PS.aPower1Ab, power1Names, power1Descs, AND.angelPowerNames[0]);
				break;
				
			case "Power 2":
				PowerGUI(PS.aPower2Ab, power2Names, power2Descs, AND.angelPowerNames[1]);
				break;
			
			case "Power 3":
				PowerGUI(PS.aPower3Ab, power3Names, power3Descs, AND.angelPowerNames[2]);
				break;
				
			case "Power 4":
				PowerGUI(PS.aPower4Ab, power4Names, power4Descs, AND.angelPowerNames[3]);
				break;
			
			case "Power 5":
				PowerGUI(PS.aPower5Ab, power5Names, power5Descs, AND.angelPowerNames[4]);
				break;
				
			case "Power 6":
				PowerGUI(PS.aPower6Ab, power6Names, power6Descs, AND.angelPowerNames[5]);
				break;
			
			case "Power 7":
				PowerGUI(PS.aPower7Ab, power7Names, power7Descs, AND.angelPowerNames[6]);
				break;
				
			case "Power 8":
				PowerGUI(PS.aPower8Ab, power8Names, power8Descs, AND.angelPowerNames[7]);
				break;
			
			case "Power 9":
				PowerGUI(PS.aPower9Ab, power9Names, power9Descs, AND.angelPowerNames[8]);
				break;
				
			case "Power 10":
				PowerGUI(PS.aPower10Ab, power10Names, power10Descs, AND.angelPowerNames[9]);
				break;
				
			case "Error 1":
				GUI.skin = errorSkin;
				GUI.BeginGroup (Rect(Screen.width / 2 - screenPosW, Screen.height / 2 - screenPosH, backgroundWidth, backgroundHeight));
				GUI.Label(Rect(10,10, 450, 250), "Sorry you already have the max number of Abilites allowed (5). Into order to purchase another ability you must refund" +
				 " your current powers!");
				 
				if(GUI.Button(Rect(200,500, 100, 50), "Back"))
				{
					screenName = "MainScreen";
					selGrid = -1;
				}
				
				GUI.EndGroup();
				break;
				
			case "Error 2":
				GUI.skin = errorSkin;
				GUI.BeginGroup (Rect(Screen.width / 2 - screenPosW, Screen.height / 2 - screenPosH, backgroundWidth, backgroundHeight));
				GUI.Label(Rect(10,10, 450, 250), "Sorry you do not have enough soul to purchase this ability upgrade.");
				 
				if(GUI.Button(Rect(200,500, 100, 50), "Back"))
				{
					screenName = "MainScreen";
					selGrid = -1;
				}
				
				GUI.EndGroup();
				break;
			
			default:
				openStore = false;
				Debug.LogError(screenName + ", Something is wrong here in the Angel Store.");
				break;
		}
		
	}
}

function PowerGUI(pAbilites:int[], aNames:String[], aDescs: String[], powerName: String)
{
	var abilites: int[] = pAbilites;
	var abilityName: String[] = aNames;
	var abilityDesc: String[] = aDescs;
	GUI.skin = storeSkin;
	GUI.BeginGroup (Rect(Screen.width / 2 - screenPosW, Screen.height / 2 - screenPosH, backgroundWidth, backgroundHeight));
	GUI.Label(Rect(powerLabelW, 0, 200, 50), powerName);
	//Power Buttons
	//Ability 1
	if(GUI.Button(Rect(0,50, 100, 100), abilityName[0]))
	{
		selector = 0;
	}
	GUI.Box(Rect(100,50,400,100), abilityDesc[0]);
	
	//Ability 2
	if(GUI.Button(Rect(0,150, 100, 100), abilityName[1]))
	{
		selector = 1;
	}
	GUI.Box(Rect(100,150,400,100), abilityDesc[1]);
	
	//Ability 3
	if(GUI.Button(Rect(0,250, 100, 100), abilityName[2]))
	{
		selector = 2;
	}
	GUI.Box(Rect(100,250,400,100), abilityDesc[2]);
	
	//Ability 4
	if(GUI.Button(Rect(0,350, 100, 100), abilityName[3]))
	{
		selector = 3;
	}
	GUI.Box(Rect(100,350,400,100), abilityDesc[3]);
	
	//Ability 5
	if(GUI.Button(Rect(0,450, 100, 100), abilityName[4]))
	{
		selector = 4;
	}
	GUI.Box(Rect(100,450,400,100), abilityDesc[4]);
	
	//Get cost
	switch(selector)
	{
		case 0:
			cost = Vector3(0,5,0);
			break;
		case 1:
			cost = Vector3(0,10,0);
			break;
		case 2:
			cost = Vector3(0,15,0);
			break;
		case 3:
			cost = Vector3(0,20,0);
			break;
		case 4:
			cost = Vector3(0,30,0);
			break;
		default:
			Debug.Log("Couldn't get find the selector!");
			cost = Vector3();
			break;
	}
	
	//Bottom Buttons
	GUI.Box(Rect(costPosW, 0, 150, 50), "Cost:  " + cost.y + " Minutes");
	if(GUI.Button(Rect(165,550, 75, 50), "Back"))
	{
		screenName = "MainScreen";
		selGrid = -1;
	}
	
	if(GUI.Button(Rect(240,550, 100, 50), "Purchase"))
	{
		Debug.Log("Something was bought!");
		if(abilites[selector] == 0)
		{
			if(PS.activePowers.Count != 5)
			{
				if(GC.IsEnoughTime(cost))
				{
					abilites[selector] = 1;
					GC.TakeTime(cost);
					PS.UpdateCurrentPowers();
					//Play money sound
					//Add power to PowerSystem!
				}
				else
				{
					//play error sound
					Debug.Log("Not enough Time!");
					screenName = "Error 2";
				}
			}
			else
			{
				var emptySlot: boolean = false;
				
				//Check for empty slots
				for(var t in PS.activePowers)
				{
					if(t == "")
					{
						emptySlot = true;
					}
				}
				
				if(emptySlot)
				{//Change here also!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
					if(GC.IsEnoughTime(cost))
					{
						abilites[selector] = 1;
						GC.TakeTime(cost);
						PS.UpdateCurrentPowers();
						//Play money sound
						//Add power to PowerSystem!
					}
					else
					{
						//play error sound
						Debug.Log("Not enough Time!");
						screenName = "Error 2";
					}
				}
				else
				{
					//Error Sound
					Debug.Log("To many powers, need to refund souls.");
					screenName = "Error 1";
				}
			}
			
		}
		else
		{
			//This was already bought!
			//Make an error screen or error sound!
		}
	}
	
	GUI.EndGroup ();
}