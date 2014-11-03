var instructionText: String = "";
var titleScreen:Texture2D;
var padding: int = 15;
var newGameToggle: boolean = false;

private var GC: GameController;
private var WV: WorldVars;

function Awake()
{
	GC = GameObject.FindGameObjectWithTag("GameController").GetComponent(GameController);
	WV = GameObject.FindGameObjectWithTag("GameVars").GetComponent(WorldVars);
}

function OnGUI()
{
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), titleScreen);
	GUI.Label(Rect(10,20,250,200), "Console: " + instructionText);
	
	if(GUI.Button(Rect(Screen.width/2 - 150, Screen.height - 65, 300, 50), "New Game"))
	{
		newGameToggle = !newGameToggle;
	}
	
	if(newGameToggle) 
	{
		if(GUI.Button(Rect(Screen.width/2 - 75,Screen.height - (125 + padding), 150, 50), "Normal"))
		{
			instructionText = "Game was set to normal!";
			WV.NewGame(1); //Set new game to true. Delete the game save if there is one.
			WV.gameStarted = true;
			WV.spawnPos = 1;
			Application.LoadLevel("Purgatory");
		}
		
		if(GUI.Button(Rect(Screen.width/2 - (155 + padding + 75),Screen.height - (125 + padding), 150, 50), "Easy"))
		{
			instructionText = "Game was set to easy!";
			WV.NewGame(0); //Set new game to true. Delete the game save if there is one.
			WV.gameStarted = true;
			WV.spawnPos = 1;
			Application.LoadLevel("Purgatory");
		}
		
		if(GUI.Button(Rect(Screen.width/2 + (155 + padding - 75),Screen.height - (125 + padding), 150, 50), "Hard"))
		{
			instructionText = "Game was set to hard!";
			WV.NewGame(2); //Set new game to true. Delete the game save if there is one.
			WV.gameStarted = true;
			WV.spawnPos = 1;
			Application.LoadLevel("Purgatory");
		}
		
	}
	
	if(WV.gameStarted)
	{
		if(GUI.Button(Rect(Screen.width/2 - (310 + padding + 150),Screen.height - (50 + padding),300,50), "Resume Game"))
		{
			instructionText = "Resuming game!";
			Application.LoadLevel("Purgatory");
		}
	}
	else
	{
		if(GUI.Button(Rect(Screen.width/2 - (310 + padding + 150),Screen.height - (50 + padding),300,50), "Load Game"))
		{
			if(PlayerPrefs.GetInt("isSavedGame") == 1)
			{
				WV.gameStarted = true;
				WV.LoadData();
				WV.spawnPos = 1;
				Application.LoadLevel("Purgatory");
			}
			else
			{
				instructionText = "There is no saved game!";
			}
		}
	}
	
	if(GUI.Button(Rect(Screen.width/2 + (310 + padding - 150),Screen.height - (50 + padding),300,50), "Settings"))
	{
		instructionText = "There is no settings menu!";
	}
	
	if(GUI.Button(Rect(Screen.width - (100 + padding),Screen.height - (50 + padding),100,50), "Quit"))
	{
		Application.Quit();	
	}
}