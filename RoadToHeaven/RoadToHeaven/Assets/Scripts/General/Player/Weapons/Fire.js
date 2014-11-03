@script RequireComponent(AudioSource) 
//PreFabs--------------------------------------------------------------
var rocket: GameObject;
var pistolModel: GameObject;
var rifleModel: GameObject;
var shotgunModel: GameObject;
var rocketModel: GameObject;
var shotDebrisPrefab: GameObject;

//Sounds 
var audioShotgun: AudioClip;
var audioBullet: AudioClip;

//Private Vars--------------------------------------------------------------
private var AttackTimer : float;
private var waitingForReload: float;
private var previousWeapon: int;
private var weaponSwitched: boolean;
private var canceledReload:boolean;
private var weaponSetup: boolean;
private var reloadTimer: float; //Container for current Max Ammo
private var fireRate : float; //Container for current Max Ammo
private var maxClipSize: int; //Container for current Max Clip size
private var weaponRange: float; //Container for current weapon range for raycast
private var bulletSpawnPoint: GameObject;
private var weaponDamage: int; //Container for current weapon damage
private var rocketSpeed: float;

//Need Access for GUI---------------------------------------------
var currentWeapon: int;
var currentAmmo:int;//Container for current Ammo
var currentInClip: int; //Container for ammo in clip
var isReloading: boolean;



function Start()
{
	//Get bullet spawn point
	bulletSpawnPoint = GameObject.Find("BulletSpawnPoint");
	
	//Temp seetings for testing, CHANGE LATER!!!!
	WorldVars._instance.hasPistol = 1;
	WorldVars._instance.hasRifle = 1;
	WorldVars._instance.hasShotgun = 1;
	WorldVars._instance.hasRocket = 1;
	
	//Setup current and previous weapon
	isReloading = false;
	weaponSwitched = false;
	currentWeapon = 0; // for first time setup
	GetCurrentWeapon(currentWeapon);
}

function Update () 
{
	if(!GameController._instance.isPaused)
	{
		//Change weapon with Mouse wheel
		if(Input.GetAxis("Mouse ScrollWheel") > 0)//MouseWheel button up
		{
			previousWeapon = currentWeapon;
			weaponSwitched = true;
			if(currentWeapon == 3)
			{
				currentWeapon = 0;
			}
				else
				{
					currentWeapon++;
					//Check to see if player has other weapons; if not skip that weapon with the scroll
					if(currentWeapon == 1 && WorldVars._instance.hasRifle != 1)
					{
						currentWeapon++;
					}
					else if (currentWeapon == 2 && WorldVars._instance.hasShotgun != 1)
					{
						currentWeapon++;
					}
					else if(currentWeapon == 3 && WorldVars._instance.hasRocket != 1)
					{
						currentWeapon = 0;
					}
					
					
				}
		}
		else if (Input.GetAxis("Mouse ScrollWheel") < 0)//Mouse Wheel down
		{
			previousWeapon = currentWeapon;
			weaponSwitched = true;
			if(currentWeapon == 0)//This check is important because we start with the pistol unlike above^^
			{
				currentWeapon = 3;//This should be the highest weapon; for me its the four one.
				if(WorldVars._instance.hasRocket != 1)//Check if player has this; then set back and check all over weapons until player has it.
				{
					currentWeapon--;
					if(WorldVars._instance.hasShotgun != 1)
					{
						currentWeapon--;
						if(WorldVars._instance.hasRifle != 1)
						{
							currentWeapon = 0;
						}
						
					}
					
				}
				
			}
				else
				{
					currentWeapon--;
					if(currentWeapon == 1 && WorldVars._instance.hasRifle != 1)
					{
						currentWeapon--;
					}
					else if (currentWeapon == 2 && WorldVars._instance.hasShotgun != 1)
					{
						currentWeapon--;
					}
					else if(currentWeapon == 3 && WorldVars._instance.hasRocket != 1)
					{
						currentWeapon = 0;
					}
				}
		}
		
		//Change weapons with Numbers directly; 1-4.
		if(Input.GetKeyDown(KeyCode.Alpha1) || Input.GetKeyDown(KeyCode.Keypad1) && WorldVars._instance.hasPistol == 1)
		{
			previousWeapon = currentWeapon;
			weaponSwitched = true;
			currentWeapon = 0;
		}
		else if (Input.GetKeyDown(KeyCode.Alpha2) || Input.GetKeyDown(KeyCode.Keypad2) && WorldVars._instance.hasRifle == 1)
		{
			previousWeapon = currentWeapon;
			weaponSwitched = true;
			currentWeapon = 1;
		}
		else if (Input.GetKeyDown(KeyCode.Alpha3) || Input.GetKeyDown(KeyCode.Keypad3) && WorldVars._instance.hasShotgun == 1)
		{
			previousWeapon = currentWeapon;
			weaponSwitched = true;
			currentWeapon = 2;
		}
		else if (Input.GetKeyDown(KeyCode.Alpha4) || Input.GetKeyDown(KeyCode.Keypad4) && WorldVars._instance.hasRocket == 1)
		{
			previousWeapon = currentWeapon;
			weaponSwitched = true;
			currentWeapon = 3;
		}
		
		//Input for Reload
		if(Input.GetButtonDown("Reload") && currentAmmo > 0 && currentInClip != maxClipSize)
		{Debug.Log("Reload Manual");
			Reload();
		}
		
		//Did we switch weapons, if so save weapon stats
		if(weaponSwitched)
		{
			SaveCurrentWeaponsStats(previousWeapon);
			GetCurrentWeapon(currentWeapon); //What is the current weapon selected?
			weaponSwitched = false;
			
			if(isReloading)
			{
				canceledReload = true;
			}
		}
			
		//if can fire, fire. Check for reloading!
		if(!isReloading)
		{
			if (AttackTimer > 0)
			{
				AttackTimer -= Time.deltaTime;
			}
			
			if (AttackTimer <= 0)
			{
				if(currentWeapon == 1)
				{
					if(Input.GetButton("Fire"))//AutoFire bullets
					{
						Fire(currentWeapon);
						AttackTimer = fireRate;
						currentInClip--;
						
						if(currentInClip == 0 && currentAmmo >= 1)
						{
							Reload();
						}
					}
				}
					else
					{
						if(Input.GetButtonDown("Fire"))//Single fire bullets per click
						{
							if(currentInClip >= 1)
							{
								Fire(currentWeapon);
								AttackTimer = fireRate;
								currentInClip--;
								
								if(currentInClip == 0 && currentAmmo >= 1)//AutoReload at Zero
								{
									Reload();
								}
							}
							else if(currentInClip == 0 && currentAmmo >= 1)//If you canceled a reload but now fire without Ammo; Force reload
							{
								Reload();
							}
						}
					}
				
			}
		}
			else
			{
				if (AttackTimer > 0)
				{
					AttackTimer -= Time.deltaTime;
				}
				
					if(!canceledReload)
					{
						waitingForReload -= Time.deltaTime;
						
						if(waitingForReload <= 0)
						{
							 //wait till finished to refill clips
							if(currentAmmo >= maxClipSize)
							{	
								var temp2: int = maxClipSize - currentInClip;
								currentAmmo -= temp2;
								currentInClip += temp2;
							}
							else
							{
								if(currentInClip + currentAmmo > maxClipSize)
								{
									var temp: int;
									temp = (currentInClip + currentAmmo) - maxClipSize;
									currentInClip = maxClipSize;
									currentAmmo = temp;
								}
								else
								{
									currentInClip += currentAmmo;
									currentAmmo = 0;
								}
							}
							isReloading = false;
						}
					}
					else
					{
						waitingForReload = 0;
						isReloading = false;
					}	
					
				
			}
	}
}

function GetCurrentWeapon(currentWeapon: int)
{
	Debug.Log("Get new stats!");
	switch (currentWeapon)
	{
		case 0://Pistol
			reloadTimer = WorldVars._instance.pistolReloadTime;
			weaponRange = WorldVars._instance.pistolWeaponRange;
			weaponDamage = WorldVars._instance.pistolDamage;
			currentAmmo = WorldVars._instance.currentPistolAmmoTotal;
			fireRate = WorldVars._instance.pistolFireRate;
			maxClipSize = WorldVars._instance.maxPistolClipSize;
			currentInClip = WorldVars._instance.currentPistolAmmoInClip;
			pistolModel.SetActive(true);
			break;
			
		case 1://Rifle
			reloadTimer = WorldVars._instance.rifleReloadTime;
			weaponRange = WorldVars._instance.rifleWeaponRange;
			weaponDamage = WorldVars._instance.rifleDamage;
			currentAmmo = WorldVars._instance.currentRifleAmmoTotal;
			fireRate = WorldVars._instance.rifleFireRate;
			maxClipSize = WorldVars._instance.maxRifleClipSize;
			currentInClip = WorldVars._instance.currentRifleAmmoInClip;
			rifleModel.SetActive(true);
			break;
			
		case 2://Shotgun
			reloadTimer = WorldVars._instance.shotgunReloadTime;
			weaponRange = WorldVars._instance.shotgunWeaponRange;
			weaponDamage = WorldVars._instance.shotgunDamage;
			currentAmmo = WorldVars._instance.currentShotgunAmmoTotal;
			fireRate = WorldVars._instance.shotgunFireRate;
			maxClipSize = WorldVars._instance.maxShotgunClipSize;
			currentInClip = WorldVars._instance.currentShotgunAmmoInClip;
			shotgunModel.SetActive(true);
			break;
			
		case 3://Rocket
			reloadTimer = WorldVars._instance.rocketReloadTime;
			rocketSpeed = WorldVars._instance.rocketBulletSpeed;
			weaponDamage = WorldVars._instance.rocketDamage;
			currentAmmo = WorldVars._instance.currentRocketAmmoTotal;
			fireRate = WorldVars._instance.rocketFireRate;
			maxClipSize = WorldVars._instance.maxRocketClipSize;
			currentInClip = WorldVars._instance.currentRocketAmmoInClip;
			rocketModel.SetActive(true);
			break;
			
		default:
			Debug.Log("There is no current weapon!");
			break;
	}
}

function SaveCurrentWeaponsStats(previousWeapon: int)
{
	Debug.Log("Saved current weapon stats.");
	switch (previousWeapon)
	{
		case 0://Pistol
			WorldVars._instance.currentPistolAmmoTotal = currentAmmo;
			WorldVars._instance.currentPistolAmmoInClip = currentInClip;
			pistolModel.SetActive(false);
			break;
			
		case 1://Rifle
			WorldVars._instance.currentRifleAmmoTotal = currentAmmo;
			WorldVars._instance.currentRifleAmmoInClip = currentInClip;
			rifleModel.SetActive(false);
			break;
			
		case 2://Shotgun
			WorldVars._instance.currentShotgunAmmoTotal = currentAmmo;
			WorldVars._instance.currentShotgunAmmoInClip = currentInClip;
			shotgunModel.SetActive(false);
			break;
			
		case 3://Rocket
			WorldVars._instance.currentRocketAmmoTotal = currentAmmo;
			WorldVars._instance.currentRocketAmmoInClip = currentInClip;
			rocketModel.SetActive(false);
			break;
			
		default:
			Debug.Log("There was no previous weapon!");
			break;
	}
}

function Fire(currentWeapon: int)
{
	var pos: Vector3 = bulletSpawnPoint.transform.position;
	var dir: Vector3 = bulletSpawnPoint.transform.forward;
	var hit: RaycastHit;
	if(audio.isPlaying)
	{
		audio.Stop();
	}

	switch (currentWeapon)
	{
		case 0://Pistol
			audio.clip = audioBullet;
			audio.Play();
			if(Physics.Raycast(pos, dir, hit, weaponRange))
			{
				var pHitPoint: Vector3 = hit.point;
				var pGo: GameObject = hit.collider.gameObject;
				
				if(shotDebrisPrefab != null)
				{
					Instantiate(shotDebrisPrefab, pHitPoint, Quaternion.identity); //hitInfo.normal
				}

				if(pGo.gameObject.tag == "Enemy")
				{
					//Do weapon Damage
					pGo.GetComponent("EnemyFodder").TakingDamage(weaponDamage);
				}
				
			}
			break;
			
		case 1://Rifle
			audio.clip = audioBullet;
			audio.Play();
			if(Physics.Raycast(pos, dir, hit, weaponRange))
			{
				var rHitPoint: Vector3 = hit.point;
				var rGo: GameObject = hit.collider.gameObject;
				if(shotDebrisPrefab != null)
				{
					Instantiate(shotDebrisPrefab, rHitPoint, Quaternion.identity); //hitInfo.normal
				}

				if(rGo.gameObject.tag == "Enemy")
				{
					//Do weapon Damage
					rGo.GetComponent("EnemyFodder").TakingDamage(weaponDamage);
				}
				
			}
			break;
			
		case 2://Shotgun
			audio.clip = audioShotgun;
			audio.Play();
			for(var s = 0; s < 5; s++)//Spread shot of five
			{
				var randomVec: Vector3 = new Vector3(Random.Range(0.1, 0.15), Random.Range(0.05, 0.15), 0);
				var tempDir: Vector3 = randomVec + dir;
				if(Physics.Raycast(pos, tempDir, hit, weaponRange))
				{
					var sHitPoint: Vector3 = hit.point;
					var sGo: GameObject = hit.collider.gameObject;
					
					if(shotDebrisPrefab != null)
					{
						Instantiate(shotDebrisPrefab, sHitPoint, Quaternion.identity); //hitInfo.normal
					}
					
					if(sGo.gameObject.tag == "Enemy")
					{
						//Do weapon Damage
						sGo.GetComponent("EnemyFodder").TakingDamage(weaponDamage);
					}
					
				}
			}	
			break;
			
		case 3://Rocket
			var iRocket: Rocket = Instantiate(rocket, bulletSpawnPoint.transform.position, bulletSpawnPoint.transform.rotation).GetComponent(Rocket);
			iRocket.SetVars(rocketSpeed, weaponDamage);
			break;
			
		default:
			Debug.Log("There is a problem with firing!");
			break;
	}
	
	Debug.Log("Fired something");
}

function Reload()
{
	Debug.Log("In reload function");
	canceledReload = false;
	isReloading = true;
	waitingForReload = reloadTimer;
}




