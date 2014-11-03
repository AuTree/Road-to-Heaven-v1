#pragma strict

private var GC: GameController;

function Awake()
{
	GC = GameObject.FindGameObjectWithTag("GameController").GetComponent(GameController);
}

function OnTriggerEnter (other : Collider) 
{
	if(other.tag == "Player")
	{
		GameController._instance.UnlockLevels(); //Just for testing
		Application.LoadLevel("WorldMap");
	}
}