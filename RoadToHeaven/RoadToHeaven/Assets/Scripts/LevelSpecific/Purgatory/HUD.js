#pragma strict
var pauseBackground: Texture2D;
var hudGuiSkin: GUISkin;
var pauseGuiSkin: GUISkin;
var weaponImages: Texture2D[];

var timerInfoBWidth: int = 300;
var timerInfoBHeight: int = 100;
var soulInfoBWidth: int = 300;
var soulInfoBHeight: int = 100;
var topPadding: int = 10;
var widthPadding: int = 10;
var heightPadding: int = 10;
var enableGUI: boolean = true;


var powerSelector: int = 0;
var powerSlotSelector: int = 0;

private var powerGui: GUIContent[];
private var debugTools: boolean;
private var GC: GameController;
private var PC: PlayerController;
private var WV: WorldVars;
private var AND: AStoreND;
private var DND: DStoreND;

function Awake()
{
	GC = GameObject.FindGameObjectWithTag("GameController").GetComponent(GameController);
	PC = GameObject.FindGameObjectWithTag("PlayerController").GetComponent(PlayerController);
	WV = GameObject.FindGameObjectWithTag("GameVars").GetComponent(WorldVars);
	AND = GameObject.FindGameObjectWithTag("GameVars").GetComponent(AStoreND);
	DND = GameObject.FindGameObjectWithTag("GameVars").GetComponent(DStoreND);
}

function Start()
{
	//GC.FadeIn();
	GC.isPaused = false;
	GC.isInGame = false;
	PC.disableMovement = false;
	PC.NewLevel(Application.loadedLevelName);
	Time.timeScale = 1;
	
	powerGui = [new GUIContent (AND.angelPowerImgs[0]), new GUIContent (AND.angelPowerImgs[1]), new GUIContent (AND.angelPowerImgs[2]), 
	new GUIContent (AND.angelPowerImgs[3]), new GUIContent (AND.angelPowerImgs[4]), new GUIContent (AND.angelPowerImgs[5]), new GUIContent (AND.angelPowerImgs[6]), 
	new GUIContent (AND.angelPowerImgs[7]), new GUIContent (AND.angelPowerImgs[8]), new GUIContent (AND.angelPowerImgs[9]), new GUIContent (DND.demonPowerImgs[0]), 
	new GUIContent (DND.demonPowerImgs[1]), new GUIContent (DND.demonPowerImgs[2]), new GUIContent (DND.demonPowerImgs[3]), new GUIContent (DND.demonPowerImgs[4]), 
	new GUIContent (DND.demonPowerImgs[5]), new GUIContent (DND.demonPowerImgs[6]), new GUIContent (DND.demonPowerImgs[7]), new GUIContent (DND.demonPowerImgs[8]), 
	new GUIContent (DND.demonPowerImgs[9])];
}

function OnGUI()
{	
	if(enableGUI)
	{
		if(GC.isPaused)
		{
			GUI.skin = pauseGuiSkin;
			GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), pauseBackground);
			/*
			//Powers*******************************************************************
			GUI.BeginGroup(Rect(45, 78, 520, 430));
			powerSelector = GUI.SelectionGrid(Rect (0, 0, 520, 430), powerSelector, powerGui, 5);
			//Still need active powers!!
			GUI.EndGroup();
			*/
			
			//Bottom Row Pause***********************************************************
			GUI.BeginGroup (Rect (0, 675, 1366, 100));
			GUI.Box (Rect (418, 15, 530, 70), "");
			if(GUI.Button (Rect (608, 25, 150, 50), "Resume"))
			{
				GC.Pause();
			}
			
			if(GUI.Button (Rect (1200, 25, 150, 50), "Debug Options"))
			{
				debugTools = !debugTools;
			}
			
			if(GUI.Button (Rect (433, 25, 150, 50), "Settings"))
			{
				Debug.Log("There isn't a settings menu yet!");
			}
			
			if(GUI.Button (Rect (783, 25, 150, 50), "Save & Quit"))
			{
				WV.SaveData();
				Application.Quit();
			}
			
			GUI.Label(Rect(147, 2, soulInfoBWidth, soulInfoBHeight), "Souls:" + GC.soulCounter.ToString());
			
			if(Mathf.Round(GC.currentTime.z) <= 9)
			{
				GUI.Label(Rect(912, 2, timerInfoBWidth, timerInfoBHeight), 
				GC.currentTime.x.ToString("f0") + ":" + GC.currentTime.y.ToString("f0") + ":0" + GC.currentTime.z.ToString("f0"));
			}
			else
			{
				GUI.Label(Rect(912, 2, timerInfoBWidth, timerInfoBHeight), 
				GC.currentTime.x.ToString("f0") + ":" + GC.currentTime.y.ToString("f0") + ":" + GC.currentTime.z.ToString("f0"));
			}
			GUI.EndGroup ();
			
			if(debugTools)
			{
				GUI.BeginGroup (Rect (1200, 460, 150, 250));
				
				if(GUI.Button (Rect (0, 0, 150, 50), "+ 50 Souls"))
				{
					
					GC.soulCounter += 50;
				}
				
				if(GUI.Button (Rect (0, 60, 150, 50), "+ 100 Souls"))
				{
					GC.soulCounter += 100;
				}
				
				if(GUI.Button (Rect (0, 120, 150, 50), "+ 10 mintues"))
				{
					GC.currentTime.y += 10;
				}
				
				if(GUI.Button (Rect (0, 180, 150, 50), "- 10 minutes"))
				{
					GC.currentTime.y -= 10;
				}
				GUI.EndGroup ();
			}
		}
		else
		{
			GUI.skin = hudGuiSkin;
			
			//Display the various player stats
			GUI.Box(Rect(widthPadding, topPadding, soulInfoBWidth, soulInfoBHeight), "Souls:" + GC.soulCounter.ToString());
		
			//Diplay logic for the special timer cases!
			if(Mathf.Round(GC.currentTime.z) <= 9)
			{
				GUI.Box(Rect(Screen.width - (timerInfoBWidth + widthPadding), topPadding, timerInfoBWidth, timerInfoBHeight), 
				GC.currentTime.x.ToString("f0") + ":" + GC.currentTime.y.ToString("f0") + ":0" + GC.currentTime.z.ToString("f0"));
			}
			else
			{
				GUI.Box(Rect(Screen.width - (timerInfoBWidth + widthPadding), topPadding, timerInfoBWidth, timerInfoBHeight), 
				GC.currentTime.x.ToString("f0") + ":" + GC.currentTime.y.ToString("f0") + ":" + GC.currentTime.z.ToString("f0"));
			}
		}
	}
}