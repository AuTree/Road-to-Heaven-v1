#pragma strict
import System.Collections.Generic; //Need for lists

var activePowers = new List.<String>();
var reservePowers: String[] = new String[20];
var currentPower: int;
var angelNames: String[];
var demonNames: String[];
var powerNames: String[] = ["Grid 1 Name", "Grid 2 Name", "Grid 3 Name", "Grid 4 Name"];

//Power Abilites Upgrades
var aPower1Ab: int[];
var aPower2Ab: int[];
var aPower3Ab: int[];
var aPower4Ab: int[];
var aPower5Ab: int[];
var aPower6Ab: int[];
var aPower7Ab: int[];
var aPower8Ab: int[];
var aPower9Ab: int[];
var aPower10Ab: int[];
var dPower1Ab: int[];
var dPower2Ab: int[];
var dPower3Ab: int[];
var dPower4Ab: int[];
var dPower5Ab: int[];
var dPower6Ab: int[];
var dPower7Ab: int[];
var dPower8Ab: int[];
var dPower9Ab: int[];
var dPower10Ab: int[];

private var PP:PlayerPowers;
private var AND: AStoreND;
private var DND: DStoreND;

function Awake()
{
	AND = GameObject.FindGameObjectWithTag("GameVars").GetComponent(AStoreND);
	DND = GameObject.FindGameObjectWithTag("GameVars").GetComponent(DStoreND);
}

function Start()
{
	angelNames = AND.angelPowerNames;
	demonNames = DND.demonPowerNames;
}

function UsePower()
{
	PP = GameObject.FindGameObjectWithTag("Player").GetComponent(PlayerPowers);
	
	if(PP != null && activePowers.Count != 0)
	{
		switch(activePowers[currentPower])
		{
			case angelNames[0]:
				PP.AngelPower1();
				break;
				
			case angelNames[1]:
				PP.AngelPower2();
				break;
				
			case angelNames[2]:
				PP.AngelPower3();
				break;
				
			case angelNames[3]:
				PP.AngelPower4();
				break;
				
			case angelNames[4]:
				PP.AngelPower5();
				break;
				
			case angelNames[5]:
				PP.AngelPower6();
				break;
				
			case angelNames[6]:
				PP.AngelPower7();
				break;
				
			case angelNames[7]:
				PP.AngelPower8();
				break;
				
			case angelNames[8]:
				PP.AngelPower9();
				break;
				
			case angelNames[9]:
				PP.AngelPower10();
				break;
			
			case demonNames[0]:
				PP.DemonPower1();
				break;
				
			case demonNames[1]:
				PP.DemonPower2();
				break;
				
			case demonNames[2]:
				PP.DemonPower3();
				break;
				
			case demonNames[3]:
				PP.DemonPower4();
				break;
				
			case demonNames[4]:
				PP.DemonPower5();
				break;
				
			case demonNames[5]:
				PP.DemonPower6();
				break;
				
			case demonNames[6]:
				PP.DemonPower7();
				break;
				
			case demonNames[7]:
				PP.DemonPower8();
				break;
				
			case demonNames[8]:
				PP.DemonPower9();
				break;
				
			case demonNames[9]:
				PP.DemonPower10();
				break;
				
			default:
				Debug.Log("There is not an  vaild active power to use!" + " Active Power:" + activePowers[currentPower]);
				break;
		}
	}
	else
	{
		Debug.Log("There isn't a active player pawn; or the pawn is in Purgatory.");
	}
}

function ChangePower(dir: int)
{
	if(dir > 0)
	{
		currentPower ++;
		if(currentPower > activePowers.Count -1)
		{
			currentPower = 0;
		}
	}
	else if (dir < 0)
	{
		currentPower --;
		if(currentPower == 0)
		{
			currentPower = activePowers.Count -1;
		}
	}
}

function UpdateCurrentPowers()
{
	//Should we keep loop through these arrays? No, if any one element is true.
	var loopAP1: boolean = true;
	var loopAP2: boolean = true;
	var loopAP3: boolean = true;
	var loopAP4: boolean = true;
	var loopAP5: boolean = true;
	var loopAP6: boolean = true;
	var loopAP7: boolean = true;
	var loopAP8: boolean = true;
	var loopAP9: boolean = true;
	var loopAP10: boolean = true;
	
	var loopDP1: boolean = true;
	var loopDP2: boolean = true;
	var loopDP3: boolean = true;
	var loopDP4: boolean = true;
	var loopDP5: boolean = true;
	var loopDP6: boolean = true;
	var loopDP7: boolean = true;
	var loopDP8: boolean = true;
	var loopDP9: boolean = true;
	var loopDP10: boolean = true;
	
	//Reset the active Powers array to nothing
	if(activePowers.Count > 0)
	{
		for(var a = 0; a< activePowers.Count; a++)
		{
			activePowers[a] = "";
		}
	}
	
	//add powers back; Controls for more than 5 powers will be in the stores not here!
	for(var b = 0; b < 5; b++)
	{
		if(aPower1Ab[b] != 0 && loopAP1)
		{
			activePowers.Add(angelNames[0]);
			loopAP1 = false; //stop this loop
		}
		
		if(aPower2Ab[b] != 0 && loopAP2)
		{
			activePowers.Add(angelNames[1]);
			loopAP2 = false; //stop this loop
		}
		
		if(aPower3Ab[b] != 0 && loopAP3)
		{
			activePowers.Add(angelNames[2]);
			loopAP3 = false; //stop this loop
		}
		
		if(aPower4Ab[b] != 0 && loopAP4)
		{
			activePowers.Add(angelNames[3]);
			loopAP4 = false; //stop this loop
		}
		
		if(aPower5Ab[b] != 0 && loopAP5)
		{
			activePowers.Add(angelNames[4]);
			loopAP5 = false; //stop this loop
		}
		
		if(aPower6Ab[b] != 0 && loopAP6)
		{
			activePowers.Add(angelNames[5]);
			loopAP6 = false; //stop this loop
		}
		
		if(aPower7Ab[b] != 0 && loopAP7)
		{
			activePowers.Add(angelNames[6]);
			loopAP7 = false; //stop this loop
		}
		
		if(aPower8Ab[b] != 0 && loopAP8)
		{
			activePowers.Add(angelNames[7]);
			loopAP8 = false; //stop this loop
		}
		
		if(aPower9Ab[b] != 0 && loopAP9)
		{
			activePowers.Add(angelNames[8]);
			loopAP9 = false; //stop this loop
		}
		
		if(aPower10Ab[b] != 0 && loopAP10)
		{
			activePowers.Add(angelNames[9]);
			loopAP10 = false; //stop this loop
		}
		
		if(dPower1Ab[b] != 0 && loopDP1)
		{
			activePowers.Add(demonNames[0]);
			loopDP1 = false; //stop this loop
		}
		
		if(dPower2Ab[b] != 0 && loopDP2)
		{
			activePowers.Add(demonNames[1]);
			loopDP2 = false; //stop this loop
		}
		
		if(dPower3Ab[b] != 0 && loopDP3)
		{
			activePowers.Add(demonNames[2]);
			loopDP3 = false; //stop this loop
		}
		
		if(dPower4Ab[b] != 0 && loopDP4)
		{
			activePowers.Add(demonNames[3]);
			loopDP4 = false; //stop this loop
		}
		
		if(dPower5Ab[b] != 0 && loopDP5)
		{
			activePowers.Add(demonNames[4]);
			loopDP5 = false; //stop this loop
		}
		
		if(dPower6Ab[b] != 0 && loopDP6)
		{
			activePowers.Add(demonNames[5]);
			loopDP6 = false; //stop this loop
		}
		
		if(dPower7Ab[b] != 0 && loopDP7)
		{
			activePowers.Add(demonNames[6]);
			loopDP7 = false; //stop this loop
		}
		
		if(dPower8Ab[b] != 0 && loopDP8)
		{
			activePowers.Add(demonNames[7]);
			loopDP8 = false; //stop this loop
		}
		
		if(dPower9Ab[b] != 0 && loopDP9)
		{
			activePowers.Add(demonNames[8]);
			loopDP9 = false; //stop this loop
		}
		
		if(dPower10Ab[b] != 0 && loopDP10)
		{
			activePowers.Add(demonNames[9]);
			loopDP10 = false; //stop this loop
		}
	}
	//Update something!
}