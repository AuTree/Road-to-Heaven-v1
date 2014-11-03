#pragma strict

var maxHealth: int = 10;
var health: int;
var damagePerSecond: int = 2;
var hittingRange: float = 1;
var hitTimer: float = 0;
var gib:GameObject;

private var explosionForce: float = 500;
private var explosionRadius: float = 1;
private var spawnRadius: float = .5f;
private var spawnAmount: float = 10;

private var heightTimer: float = 3;

private var PTarget: GameObject;
private var PP: PlayerPawn;
private var GC: GameController;
private var CC: CharacterController;

function Awake()
{
	GC = GameObject.FindGameObjectWithTag("GameController").GetComponent(GameController);
	CC = gameObject.GetComponent(CharacterController);
}

function Start () 
{
	health = maxHealth;
	
	PP = GameObject.FindGameObjectWithTag("Player").GetComponent(PlayerPawn);
	PTarget = GameObject.FindGameObjectWithTag("Player");
}

function Update () 
{
	if(health <= 0)
	{
		Death();
	}
}

function Death()
{
	var soulWorth: float = maxHealth * .1;
	GC.AddSouls(soulWorth);
	
	var spawnPosition:Vector3;
	for(var i = 0; i < spawnAmount; i++)
	{
		spawnPosition = transform.position + Random.onUnitSphere*spawnRadius;
		var gibInstance: GameObject = Instantiate(gib, spawnPosition, gib.transform.rotation) as GameObject;
		gibInstance.rigidbody.AddExplosionForce(explosionForce, transform.position, explosionRadius);
	}
		
	Destroy(gameObject);
}

function TakingDamage(incoming:int)
{
	health -= incoming;
}

function DealingMeleeDamage ()
{	
	hitTimer -= Time.deltaTime;
	
	if(hitTimer <= 0)
	{
		//damage player soul
		Debug.Log("Enemy hit Player for" + damagePerSecond);
		//Add time based damage!
		hitTimer = 1.0;
	}
	
	if(hitTimer < -1)
	{
		hitTimer = 0;
	}
}