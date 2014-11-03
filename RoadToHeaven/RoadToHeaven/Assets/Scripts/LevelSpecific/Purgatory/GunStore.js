#pragma strict

var enableStore: boolean;
var openStore: boolean;
private var screenName: String = "MainScreen";
private var backgroundPosW: int = 384;
private var backgroundPosH: int = 256;
private var weaponScreen: String = "Pistol";
private var personScreen:String = "Health";

var checkBox: Texture2D[];
var pistolUpgrades: int[] = new int[5];
var rifleUpgrades: int[]= new int[5];
var shotgunUpgrades: int[]= new int[5];
var rocketUpgrades: int[]= new int[5];
var generalUpgrades: int[]= new int[10];

private var generalScrollViewVector : Vector2 = Vector2.zero;
private var pistolScrollViewVector : Vector2 = Vector2.zero;
private var rifleScrollViewVector : Vector2 = Vector2.zero;
private var shotgunScrollViewVector : Vector2 = Vector2.zero;
private var rocketScrollViewVector : Vector2 = Vector2.zero;

private var pUpNames: String[];
private var pUpDescs: String[];
private var pUpCosts: Vector3[] = new Vector3[5];
private var rUpNames: String[];
private var rUpDescs: String[];
private var rUpCosts: Vector3[];
private var sUpNames: String[];
private var sUpDescs: String[];
private var sUpCosts: Vector3[];
private var rocUpNames: String[];
private var rocUpDescs: String[];
private var rocUpCosts: Vector3[];
private var generalUpNames: String[];
private var generalUpDescs: String[];
private var generalUpCosts: Vector3[];


private var GC:GameController;
private var GSI: GunStoreInfo;
private var PC: PlayerController;
private var WV: WorldVars;
private var TS: TraitSystem;

function Awake()
{
	GC = GameObject.FindGameObjectWithTag("GameController").GetComponent(GameController);
	GSI = GameObject.FindGameObjectWithTag("GameVars").GetComponent(GunStoreInfo);
	WV = GameObject.FindGameObjectWithTag("GameVars").GetComponent(WorldVars);
	PC = GameObject.FindGameObjectWithTag("PlayerController").GetComponent(PlayerController);
	TS = GameObject.FindGameObjectWithTag("PlayerController").GetComponent(TraitSystem);
}

function Start()
{
	//Get all the Names, Descs, and Costs
	pUpNames = GSI.pistolUpgradeNames;
	pUpDescs = GSI.pistolUpgradeDescs;
	pUpCosts = GSI.pistolUpgradeCosts;
	rUpNames = GSI.rifleUpgradeNames;
	rUpDescs = GSI.rifleUpgradeDescs;
	rUpCosts = GSI.rifleUpgradeCosts;
	sUpNames = GSI.shotgunUpgradeNames;
	sUpDescs = GSI.shotgunUpgradeDescs;
	sUpCosts = GSI.shotgunUpgradeCosts;
	rocUpNames = GSI.rocketUpgradeNames;
	rocUpDescs = GSI.rocketUpgradeDescs;
	rocUpCosts = GSI.rocketUpgradeCosts;
	generalUpNames = GSI.generalUpgradeNames;
	generalUpDescs = GSI.generalUpgradeDescs;
	generalUpCosts = GSI.generalUpgradeCosts;

	
	//Get current Upgrades from World Vars
	pistolUpgrades = WV.storedPistolUpgrades;
	rifleUpgrades = WV.storedRifleUpgrades;
	shotgunUpgrades = WV.storedShotgunUpgrades;
	rocketUpgrades = WV.storedRocketUpgrades;
	generalUpgrades = WV.storedGeneralUpgrades;
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
				SaveGunStoreData();
				break;
				
			case false:
				openStore = true;
				PC.disableMovement = true;
				break;
				
			default:
				Debug.Log("Something is broken with the Gun Store System");
				break;
		}
		
	}
	
	if(GC.isPaused && openStore)
	{
		openStore = false;
		SaveGunStoreData();
	}
}

function OnGUI () 
{
	if(openStore)
	{
		switch(screenName)
		{
			case "MainScreen":
				GUI.BeginGroup(new Rect(Screen.width/2 - backgroundPosW, Screen.height/2 - backgroundPosH, 768, 572));
				GUI.Box(Rect(0, 0, 768, 512), "This is the Main Menu!");
				
				if(GUI.Button(Rect(70, 128, 250, 250), "Personal Upgrades"))
				{
					screenName = "PersonMain";
				}
				
				if(GUI.Button(Rect(458, 128, 250, 250), "Weapon Upgrades"))
				{
					screenName = "WeaponMain";
				}
				
				GUI.EndGroup();
				break;
				
			case "WeaponMain":
				//Default UI
				GUI.BeginGroup(new Rect(Screen.width/2 - backgroundPosW, Screen.height/2 - backgroundPosH, 768, 572));
				GUI.Box(Rect(0, 0, 768, 512), "This is the Weapon Menu!");
				if(GUI.Button(Rect(0, 522, 100, 50), "Back"))
				{
					screenName = "MainScreen";
					 generalScrollViewVector  = Vector2.zero;
					 pistolScrollViewVector  = Vector2.zero;
					 rifleScrollViewVector  = Vector2.zero;
					 shotgunScrollViewVector  = Vector2.zero;
					 rocketScrollViewVector  = Vector2.zero;
				}
				
				//User Buttons
				if(GUI.Button(Rect(25, 25, 100, 100), "Pistol"))
				{
					weaponScreen = "Pistol";
				}
				
				if(GUI.Button(Rect(25, 150, 100, 100), "Rifle"))
				{
					weaponScreen = "Rifle";
				}
				
				if(GUI.Button(Rect(25, 275, 100, 100), "Shotgun"))
				{
					weaponScreen = "Shotgun";
				}
				
				if(GUI.Button(Rect(25, 400, 100, 100), "Rocket"))
				{
					weaponScreen = "Rocket";
				}
				
				switch(weaponScreen)
				{
					case "Pistol":
						PistolUpgrades();
						break;
					case "Rifle":
						RifleUpgrades();
						break;
					case "Shotgun":
						ShotgunUpgrades();
						break;
					case "Rocket":
						RocketUpgrades();
						break;
					default:
						break;
				}
				GUI.EndGroup();
				break;
				
			case "PersonMain":
				//Default UI
				GUI.BeginGroup(new Rect(Screen.width/2 - backgroundPosW, Screen.height/2 - backgroundPosH, 768, 572));
				GUI.Box(Rect(0, 0, 768, 512), "Person Upgrades!");
				if(GUI.Button(Rect(0, 522, 100, 50), "Back"))
				{
					screenName = "MainScreen";
					 generalScrollViewVector  = Vector2.zero;
					 pistolScrollViewVector  = Vector2.zero;
					 rifleScrollViewVector  = Vector2.zero;
					 shotgunScrollViewVector  = Vector2.zero;
					 rocketScrollViewVector  = Vector2.zero;
				}
				
				GeneralUpgrades();
				GUI.EndGroup();
				break;
				
			default:
				break;
		}
	}
}

function PistolUpgrades()
{	
	pistolScrollViewVector = GUI.BeginScrollView(Rect(150, 50, 568, 412), pistolScrollViewVector, Rect (0, 0, 548, 568));
	//get pistolmodifer from traitsystem
	var pistolModifer: float = TS.modifiedPistolCost;
	var pCost: Vector3[] = new Vector3[5];
	
	//Setup a modified cost based off of the trait system modifer
	
	for(var b = 0; b<5; b++)
	{
		pCost[b] = pUpCosts[b] * pistolModifer;
		/*
		pCost[b].x = pUpCosts[b].x * pistolModifer;
		pCost[b].y = pUpCosts[b].y * pistolModifer;
		pCost[b].z = pUpCosts[b].z * pistolModifer;
		*/
	}
	
	//draw checkboxes
	for(var a = 0; a<5; a++)
	{
		GUI.DrawTexture(Rect(0, (a*110)+10, 100, 100), checkBox[pistolUpgrades[a]]);
	}

	//pCost[0]= Mathf.RoundToInt(pCost[0] * pistolModifer);	
	if(GUI.Button(Rect(100, 10, 425, 100), pUpNames[0] + "\n" + "Cost: " + pCost[0] + "\n" + pUpDescs[0]))
	{
		if(GC.IsEnoughTime(pCost[0]) && pistolUpgrades[0] != 1)
		{
			pistolUpgrades[0] = 1;
			GC.TakeTime(pCost[0]);
			//Apply upgraded stats here
		}
	}
	
	//pCost[1]= Mathf.RoundToInt(pCost[1] * pistolModifer);	
	if(GUI.Button(Rect(100, 120, 425, 100), pUpNames[1] + "\n" + "Cost: " + pCost[1] + "\n" + pUpDescs[1]))
	{
		if(GC.IsEnoughTime(pCost[1]) && pistolUpgrades[1] != 1)
		{
			pistolUpgrades[1] = 1;
			GC.TakeTime(pCost[1]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 230, 425, 100), pUpNames[2] + "\n" + "Cost: " + pCost[2] + "\n" + pUpDescs[2]))
	{
		if(GC.IsEnoughTime(pCost[2]) && pistolUpgrades[2] != 1)
		{
			pistolUpgrades[2] = 1;
			GC.TakeTime(pCost[2]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 340, 425, 100), pUpNames[3] + "\n" + "Cost: " + pCost[3] + "\n" + pUpDescs[3]))
	{
		if(GC.IsEnoughTime(pCost[3]) && pistolUpgrades[3] != 1)
		{
			pistolUpgrades[3] = 1;
			GC.TakeTime(pCost[3]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 450, 425, 100), pUpNames[4] + "\n" + "Cost: " + pCost[4] + "\n" + pUpDescs[4]))
	{
		if(GC.IsEnoughTime(pCost[4]) && pistolUpgrades[4] != 1)
		{
			pistolUpgrades[4] = 1;
			GC.TakeTime(pCost[4]);
			//Apply upgraded stats here
		}
	}
	
	GUI.EndScrollView();
}

function RifleUpgrades()
{
	rifleScrollViewVector = GUI.BeginScrollView(Rect(150, 50, 568, 412), rifleScrollViewVector, Rect (0, 0, 548, 568));
	
	//get riflemodifer from traitsystem
	var rifleModifer: float = TS.modifiedRifleCost;
	var rCost: Vector3[] = new Vector3[5];
	
	//Setup a modified cost based off of the trait system modifer
	for(var b = 0; b<5; b++)
	{
		rCost[b] = rUpCosts[b] * rifleModifer;
	}
	
	//draw checkboxes
	for(var a = 0; a<5; a++)
	{
		GUI.DrawTexture(Rect(0, (a*110)+10, 100, 100), checkBox[rifleUpgrades[a]]);
	}

	//rCost[0]= Mathf.RoundToInt(rCost[0] * rifleModifer);	
	if(GUI.Button(Rect(100, 10, 425, 100), rUpNames[0] + "\n" + "Cost: " + rCost[0] + "\n" + rUpDescs[0]))
	{
		if(GC.IsEnoughTime(rCost[0]) && rifleUpgrades[0] != 1)
		{
			rifleUpgrades[0] = 1;
			GC.TakeTime(rCost[0]);
			//Apply upgraded stats here
		}
	}
	
	//rCost[1]= Mathf.RoundToInt(rCost[1] * rifleModifer);	
	if(GUI.Button(Rect(100, 120, 425, 100), rUpNames[1] + "\n" + "Cost: " + rCost[1] + "\n" + rUpDescs[1]))
	{
		if(GC.IsEnoughTime(rCost[1]) && rifleUpgrades[1] != 1)
		{
			rifleUpgrades[1] = 1;
			GC.TakeTime(rCost[1]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 230, 425, 100), rUpNames[2] + "\n" + "Cost: " + rCost[2] + "\n" + rUpDescs[2]))
	{
		if(GC.IsEnoughTime(rCost[2]) && rifleUpgrades[2] != 1)
		{
			rifleUpgrades[2] = 1;
			GC.TakeTime(rCost[2]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 340, 425, 100), rUpNames[3] + "\n" + "Cost: " + rCost[3] + "\n" + rUpDescs[3]))
	{
		if(GC.IsEnoughTime(rCost[3]) && rifleUpgrades[3] != 1)
		{
			rifleUpgrades[3] = 1;
			GC.TakeTime(rCost[3]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 450, 425, 100), rUpNames[4] + "\n" + "Cost: " + rCost[4] + "\n" + rUpDescs[4]))
	{
			if(GC.IsEnoughTime(rCost[4]) && rifleUpgrades[4] != 1)
		{
			rifleUpgrades[4] = 1;
			GC.TakeTime(rCost[4]);
			//Apply upgraded stats here
		}
	}
	
	GUI.EndScrollView();

}

function ShotgunUpgrades()
{	
	shotgunScrollViewVector = GUI.BeginScrollView(Rect(150, 50, 568, 412), shotgunScrollViewVector, Rect (0, 0, 548, 568));
	//get shotgunmodifer from traitsystem
	var shotgunModifer: float = TS.modifiedShotgunCost;
	var sCost: Vector3[] = new Vector3[5];
	
	//Setup a modified cost based off of the trait system modifer
	for(var b = 0; b<5; b++)
	{
		sCost[b] = sUpCosts[b] * shotgunModifer;
	}
	
	//draw checkboxes
	for(var a = 0; a<5; a++)
	{
		GUI.DrawTexture(Rect(0, (a*110)+10, 100, 100), checkBox[shotgunUpgrades[a]]);
	}

	//sCost[0]= Mathf.RoundToInt(sCost[0] * shotgunModifer);	
	if(GUI.Button(Rect(100, 10, 425, 100), sUpNames[0] + "\n" + "Cost: " + sCost[0] + "\n" + sUpDescs[0]))
	{
		if(GC.IsEnoughTime(sCost[0]) && shotgunUpgrades[0] != 1)
		{
			shotgunUpgrades[0] = 1;
			GC.TakeTime(sCost[0]);
			//Apply upgraded stats here
		}
	}
	
	//sCost[1]= Mathf.RoundToInt(sCost[1] * shotgunModifer);	
	if(GUI.Button(Rect(100, 120, 425, 100), sUpNames[1] + "\n" + "Cost: " + sCost[1] + "\n" + sUpDescs[1]))
	{
		if(GC.IsEnoughTime(sCost[1]) && shotgunUpgrades[1] != 1)
		{
			shotgunUpgrades[1] = 1;
			GC.TakeTime(sCost[1]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 230, 425, 100), sUpNames[2] + "\n" + "Cost: " + sCost[2] + "\n" + sUpDescs[2]))
	{
		if(GC.IsEnoughTime(sCost[2]) && shotgunUpgrades[2] != 1)
		{
			shotgunUpgrades[2] = 1;
			GC.TakeTime(sCost[2]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 340, 425, 100), sUpNames[3] + "\n" + "Cost: " + sCost[3] + "\n" + sUpDescs[3]))
	{
		if(GC.IsEnoughTime(sCost[3]) && shotgunUpgrades[3] != 1)
		{
			shotgunUpgrades[3] = 1;
			GC.TakeTime(sCost[3]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 450, 425, 100), sUpNames[4] + "\n" + "Cost: " + sCost[4] + "\n" + sUpDescs[4]))
	{
			if(GC.IsEnoughTime(sCost[4]) && shotgunUpgrades[4] != 1)
		{
			shotgunUpgrades[4] = 1;
			GC.TakeTime(sCost[4]);
			//Apply upgraded stats here
		}
	}
	
	GUI.EndScrollView();
}

function RocketUpgrades()
{	
	rocketScrollViewVector = GUI.BeginScrollView(Rect(150, 50, 568, 412), rocketScrollViewVector, Rect (0, 0, 548, 568));
	//get rocketmodifer from traitsystem
	var rocketModifer: float = TS.modifiedRocketCost;
	var rocCost: Vector3[] = new Vector3[5];
	
	//Setup a modified cost based off of the trait system modifer
	for(var b = 0; b<5; b++)
	{
		rocCost[b] = rocUpCosts[b] * rocketModifer;
	}
	
	//draw checkboxes
	for(var a = 0; a<5; a++)
	{
		GUI.DrawTexture(Rect(0, (a*110)+10, 100, 100), checkBox[rocketUpgrades[a]]);
	}

	//rocCost[0]= Mathf.RoundToInt(rocCost[0] * rocketModifer);	
	if(GUI.Button(Rect(100, 10, 425, 100), rocUpNames[0] + "\n" + "Cost: " + rocCost[0] + "\n" + rocUpDescs[0]))
	{
		if(GC.IsEnoughTime(rocCost[0]) && rocketUpgrades[0] != 1)
		{
			rocketUpgrades[0] = 1;
			GC.TakeTime(rocCost[0]);
			//Apply upgraded stats here
		}
	}
	
	//rocCost[1]= Mathf.RoundToInt(rocCost[1] * rocketModifer);	
	if(GUI.Button(Rect(100, 120, 425, 100), rocUpNames[1] + "\n" + "Cost: " + rocCost[1] + "\n" + rocUpDescs[1]))
	{
		if(GC.IsEnoughTime(rocCost[1]) && rocketUpgrades[1] != 1)
		{
			rocketUpgrades[1] = 1;
			GC.TakeTime(rocCost[1]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 230, 425, 100), rocUpNames[2] + "\n" + "Cost: " + rocCost[2] + "\n" + rocUpDescs[2]))
	{
		if(GC.IsEnoughTime(rocCost[2]) && rocketUpgrades[2] != 1)
		{
			rocketUpgrades[2] = 1;
			GC.TakeTime(rocCost[2]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 340, 425, 100), rocUpNames[3] + "\n" + "Cost: " + rocCost[3] + "\n" + rocUpDescs[3]))
	{
		if(GC.IsEnoughTime(rocCost[3]) && rocketUpgrades[3] != 1)
		{
			rocketUpgrades[3] = 1;
			GC.TakeTime(rocCost[3]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 450, 425, 100), rocUpNames[4] + "\n" + "Cost: " + rocCost[4] + "\n" + rocUpDescs[4]))
	{
			if(GC.IsEnoughTime(rocCost[4]) && rocketUpgrades[4] != 1)
		{
			rocketUpgrades[4] = 1;
			GC.TakeTime(rocCost[4]);
			//Apply upgraded stats here
		}
	}
	
	GUI.EndScrollView();
}

function GeneralUpgrades()
{
	generalScrollViewVector = GUI.BeginScrollView(Rect(150, 50, 568, 412), generalScrollViewVector, Rect (0, 0, 548, 1110));
	
	//get generalmodifer from traitsystem
	var generalModifer: float = TS.modifiedGeneralCost;
	var generalCost: Vector3[] = new Vector3[10];
	
	//Setup a modified cost based off of the trait system modifer
	for(var b = 0; b<10; b++)
	{
		generalCost[b] = generalUpCosts[b] * generalModifer;
	}
	
	//draw checkboxes
	for(var a = 0; a<10; a++)
	{
		GUI.DrawTexture(Rect(0, (a*110)+10, 100, 100), checkBox[generalUpgrades[a]]);
	}

	//generalCost[0]= Mathf.RoundToInt(generalCost[0] * generalModifer);	
	if(GUI.Button(Rect(100, 10, 425, 100), generalUpNames[0] + "\n" + "Cost: " + generalCost[0] + "\n" + generalUpDescs[0]))
	{
		if(GC.IsEnoughTime(generalCost[0]) && generalUpgrades[0] != 1)
		{
			generalUpgrades[0] = 1;
			GC.TakeTime(generalCost[0]);
			//Apply upgraded stats here
		}
	}
	
	//generalCost[1]= Mathf.RoundToInt(generalCost[1] * generalModifer);	
	if(GUI.Button(Rect(100, 120, 425, 100), generalUpNames[1] + "\n" + "Cost: " + generalCost[1] + "\n" + generalUpDescs[1]))
	{
		if(GC.IsEnoughTime(generalCost[1]) && generalUpgrades[1] != 1)
		{
			generalUpgrades[1] = 1;
			GC.TakeTime(generalCost[1]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 230, 425, 100), generalUpNames[2] + "\n" + "Cost: " + generalCost[2] + "\n" + generalUpDescs[2]))
	{
		if(GC.IsEnoughTime(generalCost[2]) && generalUpgrades[2] != 1)
		{
			generalUpgrades[2] = 1;
			GC.TakeTime(generalCost[2]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 340, 425, 100), generalUpNames[3] + "\n" + "Cost: " + generalCost[3] + "\n" + generalUpDescs[3]))
	{
		if(GC.IsEnoughTime(generalCost[3]) && generalUpgrades[3] != 1)
		{
			generalUpgrades[3] = 1;
			GC.TakeTime(generalCost[3]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 450, 425, 100), generalUpNames[4] + "\n" + "Cost: " + generalCost[4] + "\n" + generalUpDescs[4]))
	{
			if(GC.IsEnoughTime(generalCost[4]) && generalUpgrades[4] != 1)
		{
			generalUpgrades[4] = 1;
			GC.TakeTime(generalCost[4]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 560, 425, 100), generalUpNames[5] + "\n" + "Cost: " + generalCost[5] + "\n" + generalUpDescs[5]))
	{
		if(GC.IsEnoughTime(generalCost[5]) && generalUpgrades[5] != 1)
		{
			generalUpgrades[5] = 1;
			GC.TakeTime(generalCost[5]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 670, 425, 100), generalUpNames[6] + "\n" + "Cost: " + generalCost[6] + "\n" + generalUpDescs[6]))
	{
		if(GC.IsEnoughTime(generalCost[6]) && generalUpgrades[6] != 1)
		{
			generalUpgrades[6] = 1;
			GC.TakeTime(generalCost[6]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 780, 425, 100), generalUpNames[7] + "\n" + "Cost: " + generalCost[7] + "\n" + generalUpDescs[7]))
	{
		if(GC.IsEnoughTime(generalCost[7]) && generalUpgrades[7] != 1)
		{
			generalUpgrades[7] = 1;
			GC.TakeTime(generalCost[7]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 890, 425, 100), generalUpNames[8] + "\n" + "Cost: " + generalCost[8] + "\n" + generalUpDescs[8]))
	{
		if(GC.IsEnoughTime(generalCost[8]) && generalUpgrades[8] != 1)
		{
			generalUpgrades[8] = 1;
			GC.TakeTime(generalCost[8]);
			//Apply upgraded stats here
		}
	}
	
	if(GUI.Button(Rect(100, 1010, 425, 100), generalUpNames[9] + "\n" + "Cost: " + generalCost[9] + "\n" + generalUpDescs[9]))
	{
		if(GC.IsEnoughTime(generalCost[9]) && generalUpgrades[9] != 1)
		{
			generalUpgrades[9] = 1;
			GC.TakeTime(generalCost[9]);
			//Apply upgraded stats here
		}
	}
	
	GUI.EndScrollView();
}

function SaveGunStoreData()
{
	WV.storedPistolUpgrades = pistolUpgrades;
	WV.storedRifleUpgrades = rifleUpgrades;
	WV.storedShotgunUpgrades = shotgunUpgrades;
	WV.storedRocketUpgrades = rocketUpgrades;
	WV.storedGeneralUpgrades = generalUpgrades;
	Debug.Log("Gun Store data was sent to World Vars!");
}