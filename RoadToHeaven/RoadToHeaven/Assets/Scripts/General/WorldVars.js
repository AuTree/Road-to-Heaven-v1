#pragma strict

//Instance Var for this script
static var _instance: WorldVars = null;
private var GC: GameController;
private var PC: PlayerController;
private var TS: TraitSystem;  
private var PS: PowerSystem;
private var PCStorage: GameObject;

// World Variables*************************************************************************
var difficultySetting: int; //Will be set after new game is pressed. Will range from 0-2!
var spawnPos: int; //Will be set in World Map after Travel is pressed. If more than one spawn point is unlocked!
var gameStarted: boolean; //Will be used to change only for the main menu buttons.
var isSavedGame: int;

//Trait System variables*******************************************************************
var currentPlayerTraits = new int[20];
var maxPlayerHealth: int;
var maxPlayerStamina: int;
var forwardSpeed: float;
var backwardSpeed: float;
var sideSpeed: float;
var jumpHeight: float;

//Power System Variables
var aP1Ab: int[] = [0,0,0,0,0];
var aP2Ab: int[] = [0,0,0,0,0];
var aP3Ab: int[] = [0,0,0,0,0];
var aP4Ab: int[] = [0,0,0,0,0];
var aP5Ab: int[] = [0,0,0,0,0];
var aP6Ab: int[] = [0,0,0,0,0];
var aP7Ab: int[] = [0,0,0,0,0];
var aP8Ab: int[] = [0,0,0,0,0];
var aP9Ab: int[] = [0,0,0,0,0];
var aP10Ab: int[] = [0,0,0,0,0];
var dP1Ab: int[] = [0,0,0,0,0];
var dP2Ab: int[] = [0,0,0,0,0];
var dP3Ab: int[] = [0,0,0,0,0];
var dP4Ab: int[] = [0,0,0,0,0];
var dP5Ab: int[] = [0,0,0,0,0];
var dP6Ab: int[] = [0,0,0,0,0];
var dP7Ab: int[] = [0,0,0,0,0];
var dP8Ab: int[] = [0,0,0,0,0];
var dP9Ab: int[] = [0,0,0,0,0];
var dP10Ab: int[] = [0,0,0,0,0];

//GunStore Vars
var storedPistolUpgrades : int [] = new int [5];
var storedRifleUpgrades : int [] = new int [5];
var storedShotgunUpgrades : int [] = new int [5];
var storedRocketUpgrades : int [] = new int [5];
var storedGeneralUpgrades : int [] = new int [10];

//GameController Variables*****************************************************************
var storedCurrentTime:Vector3;
var storedSouls: int;
var storedScore: int;

//Player Weapon Vars----------------Used in Fire Script************************************
var hasPistol: int;
var hasRifle: int;
var hasShotgun: int;
var hasRocket: int;

var currentPistolAmmoTotal: int;
var currentRifleAmmoTotal: int;
var currentShotgunAmmoTotal: int;
var currentRocketAmmoTotal: int;

var currentPistolAmmoInClip: int;
var currentRifleAmmoInClip: int;
var currentShotgunAmmoInClip: int;
var currentRocketAmmoInClip: int;

var maxPistolAmmo: int;
var maxRifleAmmo: int;
var maxShotgunAmmo: int;
var maxRocketAmmo: int;

//Weapon Max Clip size-----------------------------------
var maxPistolClipSize: int;
var maxRifleClipSize: int;
var maxShotgunClipSize: int;
var maxRocketClipSize: int;

//Weapon Fire Rates; lower is faster---------------------
var pistolFireRate:float;
var rifleFireRate:float;
var shotgunFireRate:float;
var rocketFireRate: float;

//Weapon Damage-------------------------------------------
var pistolDamage: int;
var rifleDamage: int;
var shotgunDamage: int;
var rocketDamage: int;

//Bullet Speed---------------------------
var pistolWeaponRange: float;
var rifleWeaponRange: float;
var shotgunWeaponRange: float;
var rocketBulletSpeed: float;

//Weapon Reload Times; lower means faster-----------------
var pistolReloadTime:float;
var rifleReloadTime:float;
var shotgunReloadTime:float;
var rocketReloadTime:float;

//Level specific variables***************************************************************
//Red Level (01) Vars---------------------------------------------------------

//LocationUnlocks--------------------------
var red_Region1Unlock: int;
var red_Region2Unlock: int;
var red_Region3Unlock: int;
var red_Region4Unlock: int;
var red_Region5Unlock: int;

//Blue Level (02) Vars---------------------------------------------------------

//LocationUnlocks--------------------------
var blue_Region1Unlock: int;
var blue_Region2Unlock: int;
var blue_Region3Unlock: int;
var blue_Region4Unlock: int;
var blue_Region5Unlock: int;

//Green Level (03) Vars---------------------------------------------------------

//LocationUnlocks--------------------------
var green_Region1Unlock: int;
var green_Region2Unlock: int;
var green_Region3Unlock: int;
var green_Region4Unlock: int;
var green_Region5Unlock: int;

//Yellow Level (04) Vars---------------------------------------------------------

//LocationUnlocks--------------------------
var yellow_Region1Unlock: int;
var yellow_Region2Unlock: int;
var yellow_Region3Unlock: int;
var yellow_Region4Unlock: int;
var yellow_Region5Unlock: int;

//Purple Level (05) Vars---------------------------------------------------------

//LocationUnlocks--------------------------
var purple_Region1Unlock: int;
var purple_Region2Unlock: int;
var purple_Region3Unlock: int;
var purple_Region4Unlock: int;
var purple_Region5Unlock: int;

//Tutorial---------------


function Awake()
{
	if (_instance != null && _instance != this)
	{
		Destroy(gameObject);
		return;
	}
	else
	{
		_instance = this;
	}
	
	DontDestroyOnLoad(this.gameObject);
	gameObject.name = "$World Variables";
	
	PCStorage = GameObject.FindGameObjectWithTag("PlayerController");
	TS = PCStorage.GetComponent(TraitSystem);
	PC = PCStorage.GetComponent(PlayerController);
	PS = PCStorage.GetComponent(PowerSystem);
	GC = GameObject.FindGameObjectWithTag("GameController").GetComponent(GameController);
}

function Start()
{
	gameStarted = false; //Used to change load game to resume game in the Main Menu.
;	
	
}

function SaveData()
{
	//Gather the data here first
	GatherData();
	
	//Save Weapon Data
	SaveInt("hasPistol", hasPistol);
	SaveInt("hasRifle", hasRifle);
	SaveInt("hasShotgun", hasShotgun);
	SaveInt("hasRocket", hasRocket);
	
	SaveInt("maxPistolAmmo", maxPistolAmmo);
	SaveInt("maxRifleAmmo", maxRifleAmmo);
	SaveInt("maxShotgunAmmo", maxShotgunAmmo);
	SaveInt("maxRocketAmmo", maxRocketAmmo);
	
	SaveInt("maxPistolClipSize", maxPistolClipSize);
	SaveInt("maxRifleClipSize", maxRifleClipSize);
	SaveInt("maxShotgunClipSize", maxShotgunClipSize);
	SaveInt("maxRocketClipSize", maxRocketClipSize);
	
	SaveFloat("pistolFireRate", pistolFireRate);
	SaveFloat("rifleFireRate", rifleFireRate);
	SaveFloat("shotgunFireRate", shotgunFireRate);
	SaveFloat("rocketFireRate", rocketFireRate);
	
	SaveInt("pistolDamage", pistolDamage);
	SaveInt("rifleDamage", rifleDamage);
	SaveInt("shotgunDamage", shotgunDamage);
	SaveInt("rocketDamage", rocketDamage);
	
	SaveInt("pistolWeaponRange", pistolWeaponRange);
	SaveInt("rifleWeaponRange", rifleWeaponRange);
	SaveInt("shotgunWeaponRange", shotgunWeaponRange);
	SaveInt("rocketBulletSpeed", rocketBulletSpeed);
	
	SaveFloat("pistolReloadTime", pistolReloadTime);
	SaveFloat("rifleReloadTime", rifleReloadTime);
	SaveFloat("shotgunReloadTime", shotgunReloadTime);
	SaveFloat("rocketReloadTime", rocketReloadTime);
	
	SaveInt("currentPistolAmmoTotal", currentPistolAmmoTotal);
	SaveInt("currentRifleAmmoTotal", currentRifleAmmoTotal);
	SaveInt("currentShotgunAmmoTotal", currentShotgunAmmoTotal);
	SaveInt("currentRocketAmmoTotal", currentRocketAmmoTotal);
	
	SaveInt("currentPistolAmmoInClip", currentPistolAmmoInClip);
	SaveInt("currentRifleAmmoInClip", currentRifleAmmoInClip);
	SaveInt("currentShotgunAmmoInClip", currentShotgunAmmoInClip);
	SaveInt("currentRocketAmmoInClip", currentRocketAmmoInClip);
	
	//Save Trait System Vars
	SaveInt("maxPlayerHealth", maxPlayerHealth);
	SaveInt("maxPlayerStamina", maxPlayerStamina);
	SaveFloat("forwardSpeed", forwardSpeed);
	SaveFloat("backwardSpeed", backwardSpeed);
	SaveFloat("sideSpeed", sideSpeed);
	SaveFloat("jumpHeight", jumpHeight); 
	
	SaveIntArray(19, "TraitSlot", currentPlayerTraits);
	
	//Save PowerSystem Vars
	SaveIntArray(5, "aP1Ab", aP1Ab);
	SaveIntArray(5, "aP2Ab", aP2Ab);
	SaveIntArray(5, "aP3Ab", aP3Ab);
	SaveIntArray(5, "aP4Ab", aP4Ab);
	SaveIntArray(5, "aP5Ab", aP5Ab);
	SaveIntArray(5, "aP6Ab", aP6Ab);
	SaveIntArray(5, "aP7Ab", aP7Ab);
	SaveIntArray(5, "aP8Ab", aP8Ab);
	SaveIntArray(5, "aP9Ab", aP9Ab);
	SaveIntArray(5, "aP10Ab", aP10Ab);
	SaveIntArray(5, "dP1Ab", dP1Ab);
	SaveIntArray(5, "dP2Ab", dP2Ab);
	SaveIntArray(5, "dP3Ab", dP3Ab);
	SaveIntArray(5, "dP4Ab", dP4Ab);
	SaveIntArray(5, "dP5Ab", dP5Ab);
	SaveIntArray(5, "dP6Ab", dP6Ab);
	SaveIntArray(5, "dP7Ab", dP7Ab);
	SaveIntArray(5, "dP8Ab", dP8Ab);
	SaveIntArray(5, "dP9Ab", dP9Ab);
	SaveIntArray(5, "dP10Ab", dP10Ab);
	
	//Save GunStore Upgrade data
	SaveIntArray(5, "storedPistolUpgrades", storedPistolUpgrades);
	SaveIntArray(5, "storedRifleUpgrades", storedRifleUpgrades);
	SaveIntArray(5, "storedShotgunUpgrades", storedShotgunUpgrades);
	SaveIntArray(5, "storedRocketUpgrades", storedRocketUpgrades);
	SaveIntArray(10, "storedGeneralUpgrades", storedGeneralUpgrades);
	
	//Save Gathered Data
	SaveVector3("storedCurrentTime", storedCurrentTime);
	SaveInt("storedSouls", storedSouls);
	SaveInt("storedScore", storedScore);
	
	//Save Player spawn points
	SaveInt("red_Region1Unlock", red_Region1Unlock);
	SaveInt("red_Region2Unlock", red_Region2Unlock);
	SaveInt("red_Region3Unlock", red_Region3Unlock);
	SaveInt("red_Region4Unlock", red_Region4Unlock);
	SaveInt("red_Region5Unlock", red_Region5Unlock);
	SaveInt("blue_Region1Unlock", blue_Region1Unlock);
	SaveInt("blue_Region2Unlock", blue_Region2Unlock);
	SaveInt("blue_Region3Unlock", blue_Region3Unlock);
	SaveInt("blue_Region4Unlock", blue_Region4Unlock);
	SaveInt("blue_Region5Unlock", blue_Region5Unlock);
	SaveInt("green_Region1Unlock", green_Region1Unlock);
	SaveInt("green_Region2Unlock", green_Region2Unlock);
	SaveInt("green_Region3Unlock", green_Region3Unlock);
	SaveInt("green_Region4Unlock", green_Region4Unlock);
	SaveInt("green_Region5Unlock", green_Region5Unlock);
	SaveInt("yellow_Region1Unlock", yellow_Region1Unlock);
	SaveInt("yellow_Region2Unlock", yellow_Region2Unlock);
	SaveInt("yellow_Region3Unlock", yellow_Region3Unlock);
	SaveInt("yellow_Region4Unlock", yellow_Region4Unlock);
	SaveInt("yellow_Region5Unlock", yellow_Region5Unlock);
	SaveInt("purple_Region1Unlock", purple_Region1Unlock);
	SaveInt("purple_Region2Unlock", purple_Region2Unlock);
	SaveInt("purple_Region3Unlock", purple_Region3Unlock);
	SaveInt("purple_Region4Unlock", purple_Region4Unlock);
	SaveInt("purple_Region5Unlock", purple_Region5Unlock);
	
	SaveInt("isSavedGame", 1);
	
	Debug.Log("Data was saved!");
}

function LoadData()
{
	//Load all of the saved data to start the game back where it was!
	
	//Load Weapon data
	hasPistol = LoadInt("hasPistol");
	hasRifle = LoadInt("hasRifle");
	hasShotgun = LoadInt("hasShotgun");
	hasRocket = LoadInt("hasRocket");
	maxPistolAmmo = LoadInt("maxPistolAmmo");
	maxRifleAmmo = LoadInt("maxRifleAmmo");
	maxShotgunAmmo = LoadInt("maxShotgunAmmo");
	maxRocketAmmo = LoadInt("maxRocketAmmo");
	
	maxPistolClipSize = LoadInt("maxPistolClipSize");
	maxRifleClipSize = LoadInt("maxRifleClipSize");
	maxShotgunClipSize = LoadInt("maxShotgunClipSize");
	maxRocketClipSize = LoadInt("maxRocketClipSize");
	pistolFireRate = LoadFloat("pistolFireRate");
	rifleFireRate = LoadFloat("rifleFireRate");
	shotgunFireRate = LoadFloat("shotgunFireRate");
	rocketFireRate = LoadFloat("rocketFireRate");
	pistolDamage = LoadInt("pistolDamage");
	rifleDamage = LoadInt("rifleDamage");
	shotgunDamage = LoadInt("shotgunDamage");
	rocketDamage = LoadInt("rocketDamage");
	pistolWeaponRange = LoadInt("pistolWeaponRange");
	rifleWeaponRange = LoadInt("rifleWeaponRange");
	shotgunWeaponRange = LoadInt("shotgunWeaponRange");
	rocketBulletSpeed = LoadInt("rocketBulletSpeed");
	pistolReloadTime = LoadFloat("pistolReloadTime");
	rifleReloadTime = LoadFloat("rifleReloadTime");
	shotgunReloadTime = LoadFloat("shotgunReloadTime");
	rocketReloadTime = LoadFloat("rocketReloadTime");
	
	currentPistolAmmoTotal = LoadInt("currentPistolAmmoTotal");
	currentRifleAmmoTotal = LoadInt("currentRifleAmmoTotal");
	currentShotgunAmmoTotal = LoadInt("currentShotgunAmmoTotal");
	currentRocketAmmoTotal = LoadInt("currentRocketAmmoTotal");
	currentPistolAmmoInClip = LoadInt("currentPistolAmmoInClip");
	currentRifleAmmoInClip = LoadInt("currentRifleAmmoInClip");
	currentShotgunAmmoInClip = LoadInt("currentShotgunAmmoInClip");
	currentRocketAmmoInClip = LoadInt("currentRocketAmmoInClip");
	
	//Load Trait System Vars
	forwardSpeed = LoadFloat("forwardSpeed");
	backwardSpeed = LoadFloat("backwardSpeed");
	sideSpeed = LoadFloat("sideSpeed");
	jumpHeight = LoadFloat("jumpHeight"); 
	
	//Load data to be Pushed 
	storedCurrentTime = LoadVector3("storedCurrentTime");
	storedSouls = LoadInt("storedSouls");
	storedScore = LoadInt("storedScore");
	
	currentPlayerTraits = LoadIntArray(19, "TraitSlot");
	
	//Load Power System Arrays
	aP1Ab = LoadIntArray(5, "aP1Ab");
	aP2Ab = LoadIntArray(5, "aP2Ab");
	aP3Ab = LoadIntArray(5, "aP3Ab");
	aP4Ab = LoadIntArray(5, "aP4Ab");
	aP5Ab = LoadIntArray(5, "aP5Ab");
	aP6Ab = LoadIntArray(5, "aP6Ab");
	aP7Ab = LoadIntArray(5, "aP7Ab");
	aP8Ab = LoadIntArray(5, "aP8Ab");
	aP9Ab = LoadIntArray(5, "aP9Ab");
	aP10Ab = LoadIntArray(5, "aP10Ab");
	dP1Ab = LoadIntArray(5, "dP1Ab");
	dP2Ab = LoadIntArray(5, "dP2Ab");
	dP3Ab = LoadIntArray(5, "dP3Ab");
	dP4Ab = LoadIntArray(5, "dP4Ab");
	dP5Ab = LoadIntArray(5, "dP5Ab");
	dP6Ab = LoadIntArray(5, "dP6Ab");
	dP7Ab = LoadIntArray(5, "dP7Ab");
	dP8Ab = LoadIntArray(5, "dP8Ab");
	dP9Ab = LoadIntArray(5, "dP9Ab");
	dP10Ab = LoadIntArray(5, "dP10Ab");
	
	//Load GunStore arrays
	storedPistolUpgrades = LoadIntArray(5, "storedPistolUpgrades");
	storedRifleUpgrades = LoadIntArray(5, "storedRifleUpgrades");
	storedShotgunUpgrades = LoadIntArray(5, "storedShotgunUpgrades");
	storedRocketUpgrades = LoadIntArray(5, "storedRocketUpgrades");
	storedGeneralUpgrades = LoadIntArray(10, "storedGeneralUpgrades");
	
	//Load player spawn unlocks
	red_Region1Unlock = LoadInt("red_Region1Unlock");
	red_Region2Unlock = LoadInt("red_Region2Unlock");
	red_Region3Unlock = LoadInt("red_Region3Unlock");
	red_Region4Unlock = LoadInt("red_Region4Unlock");
	red_Region5Unlock = LoadInt("red_Region5Unlock");
	blue_Region1Unlock = LoadInt("blue_Region1Unlock");
	blue_Region2Unlock = LoadInt("blue_Region2Unlock");
	blue_Region3Unlock = LoadInt("blue_Region3Unlock");
	blue_Region4Unlock = LoadInt("blue_Region4Unlock");
	blue_Region5Unlock = LoadInt("blue_Region5Unlock");
	green_Region1Unlock = LoadInt("green_Region1Unlock");
	green_Region2Unlock = LoadInt("green_Region2Unlock");
	green_Region3Unlock = LoadInt("green_Region3Unlock");
	green_Region4Unlock = LoadInt("green_Region4Unlock");
	green_Region5Unlock = LoadInt("green_Region5Unlock");
	yellow_Region1Unlock = LoadInt("yellow_Region1Unlock");
	yellow_Region2Unlock = LoadInt("yellow_Region2Unlock");
	yellow_Region3Unlock = LoadInt("yellow_Region3Unlock");
	yellow_Region4Unlock = LoadInt("yellow_Region4Unlock");
	yellow_Region5Unlock = LoadInt("yellow_Region5Unlock");
	purple_Region1Unlock = LoadInt("purple_Region1Unlock");
	purple_Region2Unlock = LoadInt("purple_Region2Unlock");
	purple_Region3Unlock = LoadInt("purple_Region3Unlock");
	purple_Region4Unlock = LoadInt("purple_Region4Unlock");
	purple_Region5Unlock = LoadInt("purple_Region5Unlock");
	
	Debug.Log("Data was loaded!");
	PushData(); //Push loaded data back out!
}

function GatherData()
{
	//Collect data from the different scripts, mainly the Gamecontroller!
	storedCurrentTime = GC.currentTime;
	storedSouls = GC.soulCounter;
	storedScore = GC.score;
	
	aP1Ab = PS.aPower1Ab;
	aP2Ab = PS.aPower2Ab;
	aP3Ab = PS.aPower3Ab;
	aP4Ab = PS.aPower4Ab;
	aP5Ab = PS.aPower5Ab;
	aP6Ab = PS.aPower6Ab;
	aP7Ab = PS.aPower7Ab;
	aP8Ab = PS.aPower8Ab;
	aP9Ab = PS.aPower9Ab;
	aP10Ab = PS.aPower10Ab;
	
	dP1Ab = PS.dPower1Ab;
	dP2Ab = PS.dPower2Ab;
	dP3Ab = PS.dPower3Ab;
	dP4Ab = PS.dPower4Ab;
	dP5Ab = PS.dPower5Ab;
	dP6Ab = PS.dPower6Ab;
	dP7Ab = PS.dPower7Ab;
	dP8Ab = PS.dPower8Ab;
	dP9Ab = PS.dPower9Ab;
	dP10Ab = PS.dPower10Ab;
	
	
	//Gather the Players traits
	var gatherTraitCounter : int = 0;
	for(var gtc in TS.activeTraits)
	{
		currentPlayerTraits[gatherTraitCounter] = TS.activeTraits[gatherTraitCounter];
		gatherTraitCounter++;
	}
}

function PushData()
{
	//Push data back to the GameController and other scripts.
	GC.currentTime = storedCurrentTime;
	GC.soulCounter = storedSouls;
	GC.score = storedScore;
	
	TS.modifiedForwardSpeed = forwardSpeed;
	TS.modifiedBackwardSpeed = backwardSpeed;
	TS.modifiedSideSpeed = sideSpeed;
	TS.modifiedJumpHeight = jumpHeight;
	
	PS.aPower1Ab = aP1Ab;
	PS.aPower2Ab = aP2Ab;
	PS.aPower3Ab = aP3Ab;
	PS.aPower4Ab = aP4Ab;
	PS.aPower5Ab = aP5Ab;
	PS.aPower6Ab = aP6Ab;
	PS.aPower7Ab = aP7Ab;
	PS.aPower8Ab = aP8Ab;
	PS.aPower9Ab = aP9Ab;
	PS.aPower10Ab = aP10Ab;
	PS.dPower1Ab = dP1Ab;
	PS.dPower2Ab = dP2Ab;
	PS.dPower3Ab = dP3Ab;
	PS.dPower4Ab = dP4Ab;
	PS.dPower5Ab = dP5Ab;
	PS.dPower6Ab = dP6Ab;
	PS.dPower7Ab = dP7Ab;
	PS.dPower8Ab = dP8Ab;
	PS.dPower9Ab = dP9Ab;
	PS.dPower10Ab = dP10Ab;
	
	
	//Push data to the Trait system
	var pushTraitCounter : int = 0;
	for(var ptc in currentPlayerTraits)
	{
		if(ptc != 0)
		{
			TS.activeTraits.Add(currentPlayerTraits[pushTraitCounter]); 
			pushTraitCounter++;
		}
		
	}
	
	TS.ForceTraitUpdate();
	Debug.Log("Data was pushed!");
}

function GetTraitModValues()
{
	TS.modifiedForwardSpeed = forwardSpeed;
	TS.modifiedBackwardSpeed = backwardSpeed;
	TS.modifiedSideSpeed = sideSpeed;
	TS.modifiedJumpHeight = jumpHeight;
}

function ResetVars()
{
	PlayerPrefs.DeleteAll();//Should delete all the stored vars!
	
	//default weapons stats
	hasPistol = 0;
	hasRifle = 0;
	hasShotgun = 0;
	hasRocket = 0;
	maxPistolAmmo = 80;
	maxRifleAmmo = 330;
	maxShotgunAmmo = 30;
	maxRocketAmmo = 5;
	
	maxPistolClipSize = 8;
	maxRifleClipSize = 30;
	maxShotgunClipSize = 6;
	maxRocketClipSize = 1;
	pistolFireRate = .25f;
	rifleFireRate = .1f;
	shotgunFireRate = .5f;
	rocketFireRate = 0;
	pistolDamage = 5;
	rifleDamage = 3;
	shotgunDamage = 7;
	rocketDamage = 15;
	pistolWeaponRange = 150.0f;
	rifleWeaponRange = 200.0f;
	shotgunWeaponRange = 100.0f;
	rocketBulletSpeed = 10;
	pistolReloadTime = 1f;
	rifleReloadTime = 2.5f;
	shotgunReloadTime = 3f;
	rocketReloadTime = 4f;
	
	//Set the Ammo to the Max
	currentPistolAmmoTotal = maxPistolAmmo;
	currentRifleAmmoTotal = maxRifleAmmo;
	currentShotgunAmmoTotal = maxShotgunAmmo;
	currentRocketAmmoTotal = maxRocketAmmo;
	currentPistolAmmoInClip = maxPistolClipSize;
	currentRifleAmmoInClip = maxRifleClipSize;
	currentShotgunAmmoInClip = maxShotgunClipSize;
	currentRocketAmmoInClip = maxRocketClipSize;
	
	//Reset Trait Vars
	forwardSpeed = 10.0f;
	backwardSpeed = 10.0f;
	sideSpeed = 7.0f;
	jumpHeight = 5.0f;
	
	for(var i = 0; i < 20; i++)
	{
		currentPlayerTraits[i] = 0;
	}
	
	//Reset PowerSystem
	for(var j = 0; j<5; j++)
	{
		aP1Ab[j] = 0;
		aP2Ab[j] = 0;
		aP3Ab[j] = 0;
		aP4Ab[j] = 0;
		aP5Ab[j] = 0;
		aP6Ab[j] = 0;
		aP7Ab[j] = 0;
		aP8Ab[j] = 0;
		aP9Ab[j] = 0;
		aP10Ab[j] = 0;
		dP1Ab[j] = 0;
		dP2Ab[j] = 0;
		dP3Ab[j] = 0;
		dP4Ab[j] = 0;
		dP5Ab[j] = 0;
		dP6Ab[j] = 0;
		dP7Ab[j] = 0;
		dP8Ab[j] = 0;
		dP9Ab[j] = 0;
		dP10Ab[j] = 0;
	}
	
	
	//Reset Player clock
	storedCurrentTime = new Vector3(0,0,1); //always give one second on the clock!
	
	//Reset Player Soul Count && Score
	storedSouls = 0;
	storedScore = 0;
	
	//Reset Spawn Points (They wont unlock until they are true)
	red_Region1Unlock = 0;
	red_Region2Unlock = 0;
	red_Region3Unlock = 0;
	red_Region4Unlock = 0;
	red_Region5Unlock = 0;
	blue_Region1Unlock = 0;
	blue_Region2Unlock = 0;
	blue_Region3Unlock = 0;
	blue_Region4Unlock = 0;
	blue_Region5Unlock = 0;
	green_Region1Unlock = 0;
	green_Region2Unlock = 0;
	green_Region3Unlock = 0;
	green_Region4Unlock = 0;
	green_Region5Unlock = 0;
	yellow_Region1Unlock = 0;
	yellow_Region2Unlock = 0;
	yellow_Region3Unlock = 0;
	yellow_Region4Unlock = 0;
	yellow_Region5Unlock = 0;
	purple_Region1Unlock = 0;
	purple_Region2Unlock = 0;
	purple_Region3Unlock = 0;
	purple_Region4Unlock = 0;
	purple_Region5Unlock = 0;
	
	isSavedGame = 0;
	Debug.Log("Data was reset!");
}

function NewGame(difficultySetting: int)
{
	ResetVars();//Does what it says, resets all the variables that can and will be saved.
	
	switch(difficultySetting)
	{
		case 0://Easy
			storedCurrentTime = Vector3(1,0,0);
			Debug.Log("Difficulty was set to Easy");
			break;
			
		case 1://Normal
			storedCurrentTime = Vector3(0,30,0);
			Debug.Log("Difficulty was set to Normal");
			break;
			
		case 2://Hard
			storedCurrentTime = Vector3(0,10,0);
			Debug.Log("Difficulty was set to Hard");
			break;
			
		default:
			Debug.LogError("Difficulty Setting is broken! Setting to Normal.");
			storedCurrentTime = Vector3(0,30,0);
			break;
	}
	
	PushData(); //After vars are reset push new data out.
	SaveData(); //Make new game permanent
}

function SaveIntArray(arrayLenght: int, arrayName: String, theArray: int[])
{
	for(var x = 0; x< arrayLenght; x++)
	{
		PlayerPrefs.SetInt(arrayName + x, theArray[x]);
	}
}

function LoadIntArray(arrayLenght: int, arrayName: String): int[]
{
	var tempArray: int[] = new int[arrayLenght];
	for(var x = 0; x< arrayLenght; x++)
	{
		tempArray[x] = PlayerPrefs.GetInt(arrayName + x);
	}
	
	return tempArray;
}

function SaveInt(intName: String, theInt: int)
{
	PlayerPrefs.SetInt(intName, theInt);
}

function LoadInt(intName: String): int
{	
	var returnMe: int = PlayerPrefs.GetInt(intName);
	return returnMe;
}

function SaveFloat(floatName: String, theFloat: float)
{
	PlayerPrefs.SetFloat(floatName,theFloat);
}

function LoadFloat(floatName): float
{
	var returnMe: float = PlayerPrefs.GetFloat(floatName);
	return returnMe;
}

function SaveBool(boolName: String, theBool: boolean)
{
	var tempBoolInt: int;
	switch(theBool)
	{
		case true:
			tempBoolInt = 1;
			break;
		case false:
			tempBoolInt = 0;
			break;
	}
	
	PlayerPrefs.SetInt(boolName, tempBoolInt);
}

function LoadBool(boolName: String): boolean
{
	var tempInt: int;
	var tempBool: boolean;
	tempInt = PlayerPrefs.GetInt(boolName);
	
	switch(tempInt)
	{
		case 0:
			tempBool = false;
			break;
		case 1:
			tempBool = true;
			break;
	}
	
	return tempBool;
}

function SaveVector3(vectorName: String, vectorVar: Vector3)
{
	var tempx: float;
	var tempy: float;
	var tempz: float;
	
	tempx = vectorVar.x;
	tempy = vectorVar.y;
	tempz = vectorVar.z;
	
	PlayerPrefs.SetFloat(vectorName + "x", tempx);
	PlayerPrefs.SetFloat(vectorName + "y", tempy);
	PlayerPrefs.SetFloat(vectorName + "z", tempz);
}

function LoadVector3(vectorName: String): Vector3
{
	var tempx: float;
	var tempy: float;
	var tempz: float;
	var tempVector: Vector3;
	
	tempx = PlayerPrefs.GetFloat(vectorName + "x");
	tempy = PlayerPrefs.GetFloat(vectorName + "y");
	tempz = PlayerPrefs.GetFloat(vectorName + "z");
	
	tempVector = new Vector3(tempx, tempy, tempz);
	return tempVector;
}