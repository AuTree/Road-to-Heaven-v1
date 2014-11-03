var speed:float = 1.0f;
var targetRange: float = 1.0f;

var gameController: GameController;
var player: GameObject; 

function start ()
{
	gameController = GameObject.FindGameObjectWithTag("GameController").GetComponent("GameController");
	player = GameObject.FindGameObjectWithTag("Player");
}	
function Update ()
{
	CheckDistance();
}


function CheckDistance()
{
	var moveDirection:Vector3 = (player.transform.position - transform.position).normalized;
	transform.position += moveDirection*speed*Time.deltaTime;
	var dist = Vector3.Distance(player.transform.position, transform.position);
	
	if(dist <= targetRange )
	{
		//give player a soul
		//gameController.soulCounter++;
		//Destroy(gameObject);
	}	
}
