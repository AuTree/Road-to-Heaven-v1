#pragma strict
var pawnPrefab: GameObject;
var pawnPrefabDead: GameObject;
var spawnPlayer: boolean;
var mouseSensitivity: float = 5.0f;
var disableMovement: boolean = false;

private var spawnPos: Vector3;
private var spawnRot: Quaternion;
private var player: GameObject;  

private var WV: WorldVars;
private var pawn: PlayerPawn;
private var TS: TraitSystem;
private var PS: PowerSystem;
private var GC: GameController;
static var _instance: PlayerController = null;

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
		gameObject.name = "$Player Controller";
		
		WV = GameObject.FindGameObjectWithTag("GameVars").GetComponent(WorldVars);
		PS = gameObject.GetComponent(PowerSystem);
		TS = gameObject.GetComponent(TraitSystem);
		GC = GameObject.FindGameObjectWithTag("GameController").GetComponent(GameController);
}

function Update()
{
	if(pawn != null)
	{
		//Powers
		if(Input.GetMouseButton(1))//Right Mouse button
		{
			PS.UsePower();
		}
		
		if(Input.GetButtonDown("Shift") && Input.GetAxis("Mouse ScrollWheel"))//MouseWheel button up & shift key
		{
			PS.ChangePower(Input.GetAxis("Mouse ScrollWheel"));
		}
		
		//Testing
		if(Input.GetButtonDown("Tab"))//Just for testing!
		{
			disableMovement = !disableMovement;
		}
		
		//Movement
		if(Input.GetButtonDown("Jump"))
		{
			pawn.SetCanJump(TS.canPawnJump);
			pawn.Jump(TS.modifiedJumpHeight);
			//Debug.Log("Should jump!");
		}
		
		pawn.SetForwardSpeed(Input.GetAxis("Vertical") * TS.modifiedForwardSpeed);
		pawn.SetSideSpeed(Input.GetAxis("Horizontal") * TS.modifiedSideSpeed);
		pawn.SetPawnRotation(Input.GetAxis("Mouse X") * mouseSensitivity);
		pawn.RotateCamera(Input.GetAxis("Mouse Y") * mouseSensitivity);
	}
}

function NewLevel(Level: String)
{
	switch(Level) //Gets the level name and can set whatever vars you want for that level.
    { 
		case "Red": 
			CreateNewPawn(pawnPrefab);
			GC.StartClock();
            break;

        case "Blue":    
			CreateNewPawn(pawnPrefab);
			GC.StartClock();
			break;

        case "Purple":
			CreateNewPawn(pawnPrefab);
			GC.StartClock();
			break;
                  
        case "Yellow":
			CreateNewPawn(pawnPrefab);
			GC.StartClock();
			break;

        case "Green":
				CreateNewPawn(pawnPrefab);
				GC.StartClock();
			break;
			
		case "Purgatory":
			Debug.Log("Spawning a dead pawn!");
			CreateNewPawn(pawnPrefabDead);
			break;

        default:
			Debug.LogError("Couldn't locate the level name!");
			break;
    } 
}

function CreateNewPawn(pPrefab: GameObject)
{
	var name: String = "PlayerPawn";
	GetSpawnLocation(WV.spawnPos);
	pawn = Instantiate(pPrefab,spawnPos, spawnRot).GetComponent(PlayerPawn);
	pawn.SetUpPawn(name); 
}

function GetSpawnLocation (Position: int)
{
	var temp: GameObject;
	switch(Position)// Grab spawn point from World varoables script set up in the World Map
    {
    	case 1:
        	temp = GameObject.FindGameObjectWithTag("PlayerSpawnPOS1");
            break;
	  	case 2:
	  		temp = GameObject.FindGameObjectWithTag("PlayerSpawnPOS2");
	  		break;
	  	case 3:
	  		temp = GameObject.FindGameObjectWithTag("PlayerSpawnPOS3");
	  		break;
	  	case 4:
	  		temp = GameObject.FindGameObjectWithTag("PlayerSpawnPOS4");
	  		break;
	  	case 5:
	  		temp = GameObject.FindGameObjectWithTag("PlayerSpawnPOS5");
	  		break;
	  	default:
	  		temp = GameObject.FindGameObjectWithTag("PlayerSpawnPOS1");
	  		Debug.LogError("Didn't get a valid spawn point from the World Map! Setting to spawn point 1.");
	  		break;
    }
    
	spawnPos = temp.transform.position;
	spawnRot = temp.transform.rotation;
}

