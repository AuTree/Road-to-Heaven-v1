#pragma strict

var currentTime: Vector3 = new Vector3(0,0,1); //start with one second
//currentTime.x = hours
//currentTime.y = minutes
//currentTime.z = seconds
var calTime: boolean = false;
var soulCounter: int;
var score: int;
var isPaused: boolean = false;
var isInGame: boolean;

private var PC: PlayerController;
private var WV: WorldVars;
static var _instance:GameController = null;

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
	gameObject.name = "$GameController";
	
	WV = GameObject.FindGameObjectWithTag("GameVars").GetComponent(WorldVars);
	PC = GameObject.FindGameObjectWithTag("PlayerController").GetComponent(PlayerController);

}

function Start () 
{
	Time.timeScale = 1;
	isPaused = false;
	isInGame = false;
}

function Update () 
{
	//Check for game over
	if(currentTime.x == 0 && currentTime.y ==0 && currentTime.z ==0)
	{
		GameOver();
	}
	
	if(calTime)
	{
		CountDown();
		CurrentScore();
	}

	if(Input.GetButtonDown("Pause"))//Setup pause menu
	{
		if(isInGame && !isPaused)
		{
			Pause();
			Debug.Log("Game was paused!");
		}
		else if(Application.loadedLevelName == "Purgatory")
		{
			Pause();
		}
		
	}
}

function StartClock()
{
	calTime = true;
}

function StopClock()
{
	calTime = false;
}

function CurrentScore()
{
	score = (currentTime.x * 3600) + (currentTime.y * 60) + currentTime.z;
	score = Mathf.RoundToInt(score);
}

function GetScore(): int
{
	return score;
}

function CountDown()
{
	//Catch for adding time
	if(currentTime.z >= 60)
	{
		currentTime.z -= 60;
		currentTime.y++;
		
		if(currentTime.y >= 60)
		{
			currentTime.y -= 60;
			currentTime.x ++;
		}
	}
	//Hour catch
	if(currentTime.y == 0 && currentTime.z == 0 && currentTime.x > 0)
	{
		currentTime.x --;
		currentTime.y = 59;
		currentTime.z = 59;
	}
	
	//Ticking time down
	if(currentTime.z <= 0)
    {
        currentTime.z = 59;
        if(currentTime.y >= 1)
        {
            currentTime.y--;
        }
        else
        {
            currentTime.y = 0;
            currentTime.z = 0;
        }
    }
    else
    {
        currentTime.z -= Time.deltaTime;
    }
}

function Pause()
{
	if(isPaused)
	{
		isPaused = false;
		PlayerController._instance.disableMovement = false;
		Time.timeScale = 1;
	}
	else
	{
		isPaused = true;
		PlayerController._instance.disableMovement = true;
		Time.timeScale = 0;
	}
}

function AddSouls (amount : int)
{
	soulCounter += amount;
}

function GetSouls (): int
{
	return soulCounter;
}

function GameOver()
{
	Debug.Log("Game is over! Time ran out");
	//Do game over stuff!
}

function UnlockLevels()
{//After tutioral level is done!
	Debug.Log("Levels unlocked!");
	WV.red_Region1Unlock = 1;
	WV.green_Region1Unlock = 1;
	WV.yellow_Region1Unlock = 1;
	WV.purple_Region1Unlock = 1;
	WV.blue_Region1Unlock = 1;		
}

function TakeTime(amount: Vector3)
{
	currentTime -= amount;
	
	if(currentTime.z < 0)
	{
		currentTime.z *= -1;
		currentTime.y --;
	}
	
	if(currentTime.y < 0 && currentTime.x > 0)
	{
		currentTime.y *= -1;
		currentTime.x --;
	}
}

function IsEnoughTime(timeInput: Vector3): boolean
{
	//Do check code to see if the input time can be subtracted from the current time!
	var tempVector: Vector3 = Vector3.zero;
	var testVector: Vector3;
	
	testVector = currentTime - timeInput;
	
	if(testVector.x > tempVector.x ||testVector.y > tempVector.y || testVector.z > tempVector.z)
	{
		return true;
	}
	else
	{
		return false;
	}
	
	
}
/*
function LoadLevel(levelName: String)
{
	var levelLoaded: boolean = false;
	var newLevel: String = levelName;
	var currentLevel: String;
	
	StopClock();
	WV.SaveData();
	currentLevel = Application.loadedLevelName;
	
	if(currentLevel != newLevel)
	{
		Debug.Log("Preparing to load " + newLevel);
		Application.LoadLevel(newLevel);
		Debug.Log("Starting to load " + newLevel);
		
		while(levelLoaded == false)
		{
			Debug.Log("Loading!");
			levelLoaded = Application.isLoadingLevel;
		}
		
		Debug.Log(newLevel + " loaded!");
		LevelLoaded(newLevel);
	}
}

function LevelLoaded(levelName: String)
{
	switch(levelName)
	{
		case "Red": 
			isInGame = true;
            break;

        case "Blue":    
			isInGame = true;
			break;

        case "Purple":
			isInGame = true;
			break;
                  
        case "Yellow":
			isInGame = true;
			break;

        case "Green":
			isInGame = true;
			break;
			
		case "Purgatory":
			//No Clock for this level
			isInGame = false;
			break;
			
		case "Tutorial":
			//No Clock for this level
			isInGame = true;
			break;
			
		case "WorldMap":
			//StopClock();
			//isInGame = false;
			break;
			
		case "MainMenu":
			StopClock();
			isInGame = false;
			break;

        default:
			Debug.LogError("Couldn't locate the level name!");
			break;
	}
}
*/
