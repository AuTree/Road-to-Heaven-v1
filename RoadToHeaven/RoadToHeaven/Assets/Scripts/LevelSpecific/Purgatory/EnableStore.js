#pragma strict
var store: GameObject;

function OnTriggerEnter(other: Collider)
{
	if(other.tag == "Player")
	{
		Debug.Log("I got the player!");
		OpenStore();
	}
}

function OnTriggerExit(other: Collider)
{
	if(other.tag == "Player")
	{
		Debug.Log("The player left!");
		CloseStore();
	}
}

function OpenStore()
{
	switch(store.name)
	{
		case "CubeDemon":
			var demon: DemonStore = store.GetComponent(DemonStore);
			demon.enableStore = true;
			break;
			
		case "CubeAngel":
			var angel: AngelStore = store.GetComponent(AngelStore);
			angel.enableStore = true;
			break;
			
		case "CubeGunGuy":
			var gunGuy: GunStore = store.GetComponent(GunStore);
			gunGuy.enableStore = true;
			break;
			
		default:
			Debug.LogError("Can't open store!");
			break;
	}
}

function CloseStore()
{
	switch(store.name)
	{
		case "CubeDemon":
			var demon: DemonStore = store.GetComponent(DemonStore);
			demon.enableStore = false;
			break;
			
		case "CubeAngel":
			var angel: AngelStore = store.GetComponent(AngelStore);
			angel.enableStore = false;
			break;
			
		case "CubeGunGuy":
			var gunGuy: GunStore = store.GetComponent(GunStore);
			gunGuy.enableStore = false;
			break;
			
		default:
			Debug.LogError("Can't close store!");
			break;
	}
}