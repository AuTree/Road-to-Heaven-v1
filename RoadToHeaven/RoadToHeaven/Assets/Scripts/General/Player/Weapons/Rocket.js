private var rocketSpeed : float;
private var rocketDamage: int;

function Update () 
{
    transform.Translate(Vector3.forward * rocketSpeed * Time.deltaTime);
}

function SetVars(speed: float, damage: int)
{
	rocketSpeed = speed;
	rocketDamage = damage;
}

function OnTriggerEnter(other:Collider)
{	
	if(other.gameObject.tag == "Level")
	{
		Destroy(this.gameObject);
	}
	
	else if (other.gameObject.tag == "Enemy")
	{
		other.gameObject.GetComponent("EnemyFodder").TakingDamage(rocketDamage);
		Debug.Log("Hit the enemy for " + rocketDamage + "!");
		Destroy(this.gameObject);
	}
}