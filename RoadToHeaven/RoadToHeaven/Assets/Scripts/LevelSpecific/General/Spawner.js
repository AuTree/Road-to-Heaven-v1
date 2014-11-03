
var enemyType: GameObject[];// The Object to spawn; Changed to an Array!
var numberOfEnemies: int; 
var numOfEnemyTypes: int; 
var playerPrefab: GameObject;

private var spawnCounter: int;
private var spawnPoints:GameObject[]; 
private var enemiesSpawned: int;
private var PC: PlayerController;
private var GC: GameController;

function Awake()
{
	PC = GameObject.FindGameObjectWithTag("PlayerController").GetComponent(PlayerController);
	GC = GameObject.FindGameObjectWithTag("GameController").GetComponent(GameController);
	PC.NewLevel(Application.loadedLevelName); //put here so the displayGUI can find the spawned player!
}

function Start()
{
	//GC.FadeIn();
	SetUpLevel(Application.loadedLevelName);
	
	enemiesSpawned = 0;
    spawnPoints = GameObject.FindGameObjectsWithTag ("SpawnPoint"); 
    for (var respawn in spawnPoints)
    {
       spawnCounter++;
    }
    
    if(numberOfEnemies > spawnCounter)
    {
    	Debug.LogError("Not enough enemy spawn locations!");
    }
    
    GC.isPaused = false;
}

function Update()
{
	if(enemiesSpawned < numberOfEnemies)   

    {   
        SpawnNewEnemy();
    }
}

function RandomEnemy(): int
{
       var randomChance: int = Random.Range(0, 100);
       var returnMe :int;

       if(randomChance >= 50)
      {
          returnMe = 0;
          return returnMe; //a 50% chance
      }
      else if(randomChance >= 20 && randomChance <50)
      {
          returnMe = 1;
          return returnMe; // a 30% chance
      }

      else if(randomChance >= 5 && randomChance <20)
      {
          returnMe = 2;
          return returnMe; // a 15% chance
      }
      else if(randomChance >= 0 && randomChance < 5)
      {
          returnMe = 3;
          return returnMe; // a 5% chance
      }
}
 
function SpawnNewEnemy() 
{
    var randomIndex: int = Random.Range(0, spawnCounter); 
    var randomEnemy: int = RandomEnemy();
    var spawnPointReference: SpawnChecker = spawnPoints[randomIndex].GetComponent(SpawnChecker);

    if(spawnPointReference.hasEnemy == false)
    {
    	var tempEnemy: GameObject;
        tempEnemy = Instantiate(enemyType[randomEnemy], spawnPointReference.transform.position, spawnPointReference.transform.rotation);
        enemiesSpawned ++; 
 		
 		tempEnemy.name = Application.loadedLevelName + "_BM" + enemiesSpawned.ToString();
        spawnPointReference.hasEnemy = true;
    }
}

function SetUpLevel(levelName: String)
{		
	switch(levelName) //Gets the level name and can set whatever vars you want for that level.
    { 
		case "Red": 
			numberOfEnemies = 5;
            break;

        case "Blue":    
			numberOfEnemies = 5;
			break;

        case "Purple":
			numberOfEnemies = 10; 
			break;
                  
        case "Yellow":
			numberOfEnemies = 5;
			break;

        case "Green":
			numberOfEnemies = 5; 
			break;

        default:
			Debug.LogError("Couldn't locate the level name!");
			break;
    }       
}
 
