#pragma strict
@script RequireComponent(CharacterController)

private var pawnName: String;
private var canJump: boolean = true;

private var verticalRotation: float;
private var verticalVelocity: float;
private var upDownRange: float = 60.0f;
private var rotLeftRight: float;
private var sideSpeed: float;
private var forwardSpeed: float;

private var CC: CharacterController;
private var PC:PlayerController;
private var GC: GameController;

function Awake() 
{
	//Screen.lockCursor = true; //This will turn off the mouse cursor in game.
	PC = GameObject.FindGameObjectWithTag("PlayerController").GetComponent(PlayerController);
	GC = GameObject.FindGameObjectWithTag("GameController").GetComponent(GameController);
	CC = GetComponent(CharacterController);
}

function Update () 
{
	if(!PC.disableMovement)
	{
		// Rotation
		transform.Rotate(0, rotLeftRight, 0);

		// Movement	
		verticalVelocity += Physics.gravity.y * Time.deltaTime;
		
		var speed: Vector3 = new Vector3(sideSpeed, verticalVelocity, forwardSpeed);
		speed = transform.rotation * speed;
		CC.Move(speed * Time.deltaTime);
	}
}


function SetUpPawn(Name: String)
{
	this.name = pawnName;
}

function SetForwardSpeed(speed: float)
{
	forwardSpeed = speed;
}

function SetSideSpeed (speed: float)
{
	sideSpeed = speed;
}

function SetPawnRotation(rotation: float)
{
	rotLeftRight = rotation;
}

function RotateCamera(verticalAmount: float)
{
	if(!PC.disableMovement)
	{
		verticalRotation -= verticalAmount;
		verticalRotation = Mathf.Clamp(verticalRotation, -upDownRange, upDownRange);
		Camera.main.transform.localRotation = Quaternion.Euler(verticalRotation, 0, 0);
	}
}

function Jump(jumpHeight: float)
{
	if(CC.isGrounded && canJump && !PC.disableMovement)	
	{
		verticalVelocity = jumpHeight;
		Debug.Log("Jumping!");
	}
}

function SetCanJump(jump: boolean)
{
	canJump = jump;
}
