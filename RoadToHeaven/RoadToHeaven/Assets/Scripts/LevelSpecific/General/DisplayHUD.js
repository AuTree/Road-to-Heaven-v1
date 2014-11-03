
var weaponInfoBWidth: int = 300;
var weaponInfoBHeight: int = 100;
var timerInfoBWidth: int = 300;
var timerInfoBHeight: int = 100;
var soulInfoBWidth: int = 300;
var soulInfoBHeight: int = 100;
var topPadding: int = 10;
var widthPadding: int = 10;
var heightPadding: int = 10;

var crosshair: Texture2D;
var currentWeapon: int;
var hudGuiSkin: GUISkin;
var pauseGuiSkin: GUISkin;
var pauseBackground: Texture2D;

private var weaponStats: Fire;
private var GC: GameController;
private var WV: WorldVars;

function Awake()
{
	GC = GameObject.FindGameObjectWithTag("GameController").GetComponent(GameController);
	WV = GameObject.FindGameObjectWithTag("GameVars").GetComponent(WorldVars);
}

function Start()
{//Delayed so the Spawner call tell the playController in Awake to create the PlayerPawn.
	weaponStats = GameObject.FindGameObjectWithTag("Player").GetComponent(Fire);
}

function Update()
{
	currentWeapon = weaponStats.currentWeapon;
}

function OnGUI()
{
	//Pause Menu
	if(GC.isPaused)
	{
		GUI.skin = pauseGuiSkin;
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), pauseBackground);
		
		//Bottom Row Pause
		GUI.BeginGroup (Rect (0, 675, 1366, 100));
		GUI.Box (Rect (418, 15, 530, 70), "");
		if(GUI.Button (Rect (608, 25, 150, 50), "Resume"))
		{
			GC.Pause();
		}
		
		if(GUI.Button (Rect (1200, 25, 150, 50), "Purgatory"))
		{
			weaponStats.SaveCurrentWeaponsStats(currentWeapon);
			WV.spawnPos = 1;
			Application.LoadLevel("Purgatory");
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
	}
	else
	{
		GUI.skin = hudGuiSkin;
		//Display the various player stats
		GUI.DrawTexture(Rect(Screen.width/2 - 32, Screen.height/2 - 32, 64, 64), crosshair);
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
		
		switch(currentWeapon)
		{
			case 0: 
				GUI.Box(Rect(Screen.width - (weaponInfoBWidth + widthPadding), Screen.height - (weaponInfoBHeight + heightPadding), weaponInfoBWidth, weaponInfoBHeight), 
				"Pistol " + weaponStats.currentInClip + "/" + weaponStats.currentAmmo);
				break;
				
			case 1: 
				GUI.Box(Rect(Screen.width - (weaponInfoBWidth + widthPadding), Screen.height - (weaponInfoBHeight + heightPadding), weaponInfoBWidth, weaponInfoBHeight), 
				"Rifle " + weaponStats.currentInClip + "/" + weaponStats.currentAmmo);
				break;
				
			case 2:
				GUI.Box(Rect(Screen.width - (weaponInfoBWidth + widthPadding), Screen.height - (weaponInfoBHeight + heightPadding), weaponInfoBWidth, weaponInfoBHeight), 
				"Shotgun " + weaponStats.currentInClip + "/" + weaponStats.currentAmmo);
				break;
				
			case 3:
				GUI.Box(Rect(Screen.width - (weaponInfoBWidth + widthPadding), Screen.height - (weaponInfoBHeight + heightPadding), weaponInfoBWidth, weaponInfoBHeight), 
				"Rocket " + weaponStats.currentInClip + "/" + weaponStats.currentAmmo);
				break;
			
			default:
				GUI.Box(Rect(Screen.width - (weaponInfoBWidth + widthPadding), Screen.height - (weaponInfoBHeight + heightPadding), weaponInfoBWidth, weaponInfoBHeight),
				"Something is broken");
				break;
		}
		
		if(weaponStats.isReloading)
		{
			GUI.Label(Rect(Screen.width - (weaponInfoBWidth + widthPadding), Screen.height - (weaponInfoBHeight + heightPadding + 50), weaponInfoBWidth, weaponInfoBHeight),
			 "Reloading " + weaponStats.currentInClip + "/" + weaponStats.currentAmmo);
		}
	}
	
}

