#pragma strict

function OnTriggerEnter(other: Collider)
{
	if(other.tag == "Player")
	{
		switch(Application.loadedLevelName)
		{
			case "Red":
				WorldVars._instance.red_Region4Unlock = 1;
				break;
			case "Green":
				WorldVars._instance.green_Region4Unlock = 1;
				break;
			case "Yellow":
				WorldVars._instance.yellow_Region4Unlock = 1;
				break;
			case "Purple":
				WorldVars._instance.purple_Region4Unlock = 1;
				break;
			case "Blue":
				WorldVars._instance.blue_Region4Unlock = 1;
				break;
			default:
				Debug.LogError("Could not unlock Spawn point 4");
				break;
		}
	}
}