import System.Collections.Generic; //Need for lists

var activeTraits = new List.<int>(); //will store all traits that the player currently has. Also can be saved in WorldVars.
var modifiedForwardSpeed: float; 
var modifiedBackwardSpeed: float;
var modifiedSideSpeed: float;
var modifiedJumpHeight: float;
var modifiedPistolCost: float;
var modifiedRifleCost: float;
var modifiedShotgunCost: float;
var modifiedRocketCost: float;
var modifiedGeneralCost: float;
var canPawnJump: boolean;

private var thresHoldStep: int = 50 ; //Will be 50. this is the needed jump to reach the next threshold
private var updateSteps: boolean;
private var updateTraits: boolean;
private var desiredStep: int; //The number of Traits that we will like to be at
private var currentStep: int; //Where we are right now with the Traits

private var WV: WorldVars;

function Awake()
{
	WV = GameObject.FindGameObjectWithTag("GameVars").GetComponent(WorldVars);
}

function Update()
{
	if(updateTraits) //if updateTraits = true
	{
		Debug.Log("applying traits!");
		ApplyTraits();
	}
	
	if(updateSteps)
	{
		var thresHoldNumber: int = Mathf.RoundToInt(GameController._instance.soulCounter / thresHoldStep); //Gives us how far off we are from our desired point. 
		//We round it to an Int to get rid of any decimal places in case it cannot not be cleanly divided by the thresHoldStep.
		
		if(thresHoldNumber != activeTraits.Count)
		{
			desiredStep = thresHoldNumber;
			currentStep = activeTraits.Count;
			updateSteps = false; //Stop checking until we apply all the new traits!
			updateTraits = false; //Don't update traits until we apply all the new traits!
		}
		
		updateSteps = false;
	}
	else
	{
		if(currentStep != desiredStep)
		{
			if(currentStep > desiredStep)
			{
				RemoveTrait();
				currentStep --;
				updateTraits = true; //Remove the trait we took away from our stats
			}
			else
			{
				// It has to be less than because we know it's not equal or it won't be here.
				AddTrait();
				currentStep ++;
				updateTraits = true;
			}
		}
		else
		{
			updateSteps = true;
			updateTraits = false; //So we don't watse time updating until we hit a threshold!
		}
	}
	
	
}

private function AddTrait()
{
	//Add trait at Random at the end of the activeTrait array.
	var stopLoop: boolean = false;
	var randomTrait: int;
	
	while(!stopLoop) //Creates a loop to stop having the same trait twice on the player.
	{
		stopLoop = true;
		randomTrait = Random.Range(1,40); //Gives us a random number from 1 to 40
		
		for(var j in activeTraits)
		{
			if(randomTrait == j)
			{
				stopLoop = false;
			}
		}
	}
	//Once the loop stops, we add the random trait.
	activeTraits.Add(randomTrait); //Adds the random trait to the end of the array.
}

private function RemoveTrait()
{
	//Remove the last trait from the activeTrait array.
	activeTraits.RemoveAt(activeTraits.Count - 1); //Removes the last trait added to the array.
}

private function ApplyTraits()
{
	//Reset stats to default 
	WV.GetTraitModValues();
	modifiedPistolCost = 1.0f;
	modifiedRifleCost = 1.0f;
	modifiedShotgunCost = 1.0f;
	modifiedRocketCost = 1.0f;
	modifiedGeneralCost = 1.0f;
	canPawnJump = true;

	//Apply traits
	for(var t in activeTraits)
	{
		switch(t)
		{
			case 1:
				modifiedJumpHeight = WorldVars._instance.jumpHeight * 2;
				break;
			case 2:
				modifiedForwardSpeed = WorldVars._instance.forwardSpeed * 2; 
				break;
			case 3:
				Debug.Log("Heavenly abilities cost -20% mana");
				break;
			case 4:
				Debug.Log("Demonic abilities cost -20% mana");
				break;
			case 5:
				modifiedPistolCost = .85;
				modifiedRifleCost = .85;
				modifiedShotgunCost = .85;
				modifiedRocketCost = .85;
				modifiedGeneralCost = .85;
				Debug.Log("Store items -15% cost");
				break;
			case 6:
				modifiedSideSpeed = WorldVars._instance.sideSpeed * 2;
				break;
			case 7:
				//modifiedRegenAmount = WorldVars._instance.storedRegenAmount * 2;
				break;
			case 8:
				Debug.Log("-20% damage reduction!");
				break;
			case 9:
				canPawnJump = false; 
				break;
			case 10:
				Debug.Log("10% damage every jump!");
				break;
			case 11:
				modifiedPistolCost  = 1.15;
				modifiedRifleCost  = 1.15;
				modifiedShotgunCost  = 1.15;
				modifiedRocketCost  = 1.15;
				modifiedGeneralCost  = 1.15;
				Debug.Log("Store items +15% cost");
				break;
			//To 30;  
			case 30:
				break;
			default:
				Debug.Log(t + " is not yet coded!");
				break;
		}
	}
	
	updateTraits = false;
	Debug.Log("Traits applied!");
}

function ForceTraitUpdate() //Use this when you change a variable in World Vars like maxHealth, it will force the traits to recalucate to include the new number.
{
	ApplyTraits();
}

