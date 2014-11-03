#pragma strict

function OnTriggerEnter(other: Collider)
{
	if(other.tag == "Player")
	{
		switch(Application.loadedLevelName)
		{
			case "Red":
				WorldVars._instance.red_Region2Unlock = 1;
				break;
			case "Green":
				WorldVars._instance.green_Region2Unlock = 1;
				break;
			case "Yellow":
				WorldVars._instance.yellow_Region2Unlock = 1;
				break;
			case "Purple":
				WorldVars._instance.purple_Region2Unlock = 1;
				break;
			case "Blue":
				WorldVars._instance.blue_Region2Unlock = 1;
				break;
			default:
				Debug.LogError("Could not unlock Spawn point 2");
				break;
		}
	}
}