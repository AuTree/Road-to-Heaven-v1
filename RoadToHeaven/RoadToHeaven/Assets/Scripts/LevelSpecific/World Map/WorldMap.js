//@script ExecuteInEditMode()

var worldMap: Texture2D;
var guiSkin: GUISkin;

var travelingDest: int = 0;
var traveling: boolean = false;

var chooseLocationWidth: int;
var chooseLocationHeight: int;
var button1Offset: int = 55;
private var timerInfoBWidth: int = 300;
private var timerInfoBHeight: int = 100;
var topPadding: int = 43;
var widthPadding: int = -45;
var heightPadding: int = 10;
var redTravelWidth: int = 222;
var redTravelHeight: int = 315;
var blueTravelWidth: int = -261;
var blueTravelHeight: int = 389;
var greenTravelWidth: int = 613;
var greenTravelHeight: int = -57;
var yellowTravelWidth: int = -30;
var yellowTravelHeight: int = 88;
var purpleTravelWidth: int = 382;
var purpleTravelHeight: int = -368;

private var GC: GameController;

function Awake()
{
	GC = GameObject.FindGameObjectWithTag("GameController").GetComponent(GameController);
}

function OnGUI()
{
	GUI.skin = guiSkin;
	
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), worldMap);
	
	//Display time
	if(Mathf.Round(GC.currentTime.z) <= 9)
	{
		GUI.Label(Rect(Screen.width - (timerInfoBWidth + widthPadding), topPadding, timerInfoBWidth, timerInfoBHeight), 
		GC.currentTime.x.ToString("f0") + ":" + GC.currentTime.y.ToString("f0") + ":0" + GC.currentTime.z.ToString("f0"));
	}
	else
	{
		GUI.Label(Rect(Screen.width - (timerInfoBWidth + widthPadding), topPadding, timerInfoBWidth, timerInfoBHeight), 
		GC.currentTime.x.ToString("f0") + ":" + GC.currentTime.y.ToString("f0") + ":" + GC.currentTime.z.ToString("f0"));
	}
	
	//Display travel buttons
	if(GUI.Button(Rect(Screen.width/2 - redTravelWidth, Screen.height/2 - redTravelHeight,100,50), "Travel")) 
	{
		travelingDest = 1;
		traveling = true;
	}
	
	if(GUI.Button(Rect(Screen.width/2 - blueTravelWidth, Screen.height/2 - blueTravelHeight,100,50), "Travel")) 
	{	
		travelingDest = 2;
		traveling = true;
	}
	
	if(GUI.Button(Rect(Screen.width/2 - greenTravelWidth, Screen.height/2 - greenTravelHeight,100,50), "Travel")) 
	{
		travelingDest = 3;
		traveling = true;
	}
	if(GUI.Button(Rect(Screen.width/2 - yellowTravelWidth, Screen.height/2 - yellowTravelHeight,100,50), "Travel")) 
	{
		travelingDest = 4;
		traveling = true;
	}
	
	if(GUI.Button(Rect(Screen.width/2 - purpleTravelWidth, Screen.height/2 - purpleTravelHeight,100,50), "Travel")) 
	{
		travelingDest = 5;
		traveling = true;
	}
	
	//Choice Location Button
	if(traveling)
	{
		GUI.Box(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - chooseLocationHeight, 200, 50), "Choose your Location");
		
		switch(travelingDest)
		{//Display five buttons with the locations
			case 1:
				if(WorldVars._instance.red_Region1Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - button1Offset), 200,50), "Red Spawn 1")) 
					{
						WorldVars._instance.spawnPos = 1;
						Application.LoadLevel("Red");
					}
				}
				
				if(WorldVars._instance.red_Region2Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*2 )), 200,50), "Red Spawn 2")) 
					{
						WorldVars._instance.spawnPos = 2;
						Application.LoadLevel("Red");
					}
				}
				
				if(WorldVars._instance.red_Region3Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*3 )), 200,50), "Red Spawn 3")) 
					{
						WorldVars._instance.spawnPos = 3;
						Application.LoadLevel("Red"); 
					}
				}
				
				if(WorldVars._instance.red_Region4Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*4 )), 200,50), "Red Spawn 4")) 
					{
						WorldVars._instance.spawnPos = 4;
						Application.LoadLevel("Red"); 
					}
				}
				
				if(WorldVars._instance.red_Region5Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*5 )), 200,50), "Red Spawn 5")) 
					{
						WorldVars._instance.spawnPos = 5;
						Application.LoadLevel("Red"); 
					}
				}
				
				
				break;
				
			case 2:
				if(WorldVars._instance.blue_Region1Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - button1Offset), 200,50), "Blue Spawn 1")) 
					{
						WorldVars._instance.spawnPos = 1;
						Application.LoadLevel("Blue");
					}
				}
				
				if(WorldVars._instance.blue_Region2Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*2 )), 200,50), "Blue Spawn 2")) 
					{
						WorldVars._instance.spawnPos = 2;
						Application.LoadLevel("Blue");
					}
				}
				
				if(WorldVars._instance.blue_Region3Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*3 )), 200,50), "Blue Spawn 3")) 
					{
						WorldVars._instance.spawnPos = 3;
						Application.LoadLevel("Blue");
					}
				}
				
				if(WorldVars._instance.blue_Region4Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*4 )), 200,50), "Blue Spawn 4")) 
					{
						WorldVars._instance.spawnPos = 4;
						Application.LoadLevel("Blue");
					}
				}
				
				if(WorldVars._instance.blue_Region5Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*5 )), 200,50), "Blue Spawn 5")) 
					{
						WorldVars._instance.spawnPos = 5;
						Application.LoadLevel("Blue");
					}
				}
				
				break;
			case 3:
				if(WorldVars._instance.green_Region1Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - button1Offset), 200,50), "Green Spawn 1")) 
					{
						WorldVars._instance.spawnPos = 1;
						Application.LoadLevel("Green");
					}
				}
				
				if(WorldVars._instance.green_Region2Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*2 )), 200,50), "Green Spawn 2")) 
					{
						WorldVars._instance.spawnPos = 2;
						Application.LoadLevel("Green");
					}
				}
				
				if(WorldVars._instance.green_Region3Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*3 )), 200,50), "Green Spawn 3")) 
					{
						WorldVars._instance.spawnPos = 3;
						Application.LoadLevel("Green");
					}
				}
				
				if(WorldVars._instance.green_Region4Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*4 )), 200,50), "Green Spawn 4")) 
					{
						WorldVars._instance.spawnPos = 4;
						Application.LoadLevel("Green");
					}
				}
				
				if(WorldVars._instance.green_Region5Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*5 )), 200,50), "Green Spawn 5")) 
					{
						WorldVars._instance.spawnPos = 5;
						Application.LoadLevel("Green");
					}
				}
				
				break;
				
			case 4:
				if(WorldVars._instance.yellow_Region1Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - button1Offset), 200,50), "Yellow Spawn 1")) 
					{
						WorldVars._instance.spawnPos = 1;
						Application.LoadLevel("Yellow");
					}
				}
				
				if(WorldVars._instance.yellow_Region2Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*2 )), 200,50), "Yellow Spawn 2")) 
					{
						WorldVars._instance.spawnPos = 2;
						Application.LoadLevel("Yellow");
					}
				}
				
				if(WorldVars._instance.yellow_Region3Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*3 )), 200,50), "Yellow Spawn 3")) 
					{
						WorldVars._instance.spawnPos = 3;
						Application.LoadLevel("Yellow");
					}
				}
				
				if(WorldVars._instance.yellow_Region4Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*4 )), 200,50), "Yellow Spawn 4")) 
					{
						WorldVars._instance.spawnPos = 4;
						Application.LoadLevel("Yellow");
					}
				}
				
				if(WorldVars._instance.yellow_Region5Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*2 )), 200,50), "Yellow Spawn 2")) 
					{
						WorldVars._instance.spawnPos = 2;
						Application.LoadLevel("Yellow");
					}
				}
				
				break;
				
			case 5:
				if(WorldVars._instance.purple_Region1Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - button1Offset), 200,50), "Purple Spawn 1")) 
					{
						WorldVars._instance.spawnPos = 1;
						Application.LoadLevel("Purple");
					}
				}
				
				if(WorldVars._instance.purple_Region2Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*2 )), 200,50), "Purple Spawn 2")) 
					{
						WorldVars._instance.spawnPos = 2;
						Application.LoadLevel("Purple");
					}
				}

				
				if(WorldVars._instance.purple_Region3Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*3 )), 200,50), "Purple Spawn 3")) 
					{
						WorldVars._instance.spawnPos = 3;
						Application.LoadLevel("Purple");
					}
				}
				
				if(WorldVars._instance.purple_Region4Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*4 )), 200,50), "Purple Spawn 4")) 
					{
						WorldVars._instance.spawnPos = 4;
						Application.LoadLevel("Purple");
					}
				}
				
				if(WorldVars._instance.purple_Region5Unlock == 1)
				{
					if(GUI.Button(Rect(Screen.width/2 - chooseLocationWidth, Screen.height/2 - (chooseLocationHeight - (button1Offset*5 )), 200,50), "Purple Spawn 5")) 
					{
						WorldVars._instance.spawnPos = 5;
						Application.LoadLevel("Purple");
					}
				}
				
				break;
				
			default:
				Debug.LogError("Couldn't load level!");
				break;
		}
	}
}