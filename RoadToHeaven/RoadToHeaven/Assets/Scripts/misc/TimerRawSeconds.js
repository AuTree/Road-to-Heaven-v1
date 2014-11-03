#pragma strict

var hours: float;
var minutes: float;
var seconds: float;
var addMore: boolean;

function Start () 
{
	minutes = 60;
	addMore = true;
}

function Update () 
{
	CountDown();
	if(seconds > 50 && addMore == true)
	{
		seconds += 50;
		addMore = false;
	}
}


function CountDown()
{
	//Catch for adding time
	if(seconds >= 60)
	{
		seconds -= 60;
		minutes++;
		if(minutes >= 60)
		{
			minutes -= 60;
			hours ++;
		}
	}
	//Hour catch
	if(minutes == 0 && seconds == 0 && hours > 0)
	{
		hours --;
		minutes = 59;
		seconds = 59;
	}
	
	//Ticking time down
	if(seconds <= 0)
    {
        seconds = 59;
        if(minutes >= 1)
        {
            minutes--;
        }
        else
        {
            minutes = 0;
            seconds = 0;
            // This makes the guiText show the time as X:XX. ToString.("f0") formats it so there is no decimal place.
            //GameObject.Find("TimerText").guiText.text = minutes.ToString("f0") + ":0" + seconds.ToString("f0");
        }
    }
    else
    {
        seconds -= Time.deltaTime;
    }
    Debug.Log(hours +":" + minutes + ":" + seconds);
}

/*

        else
        {
            Minutes = 0;
            Seconds = 0;
            // This makes the guiText show the time as X:XX. ToString.("f0") formats it so there is no decimal place.
            GameObject.Find("TimerText").guiText.text = Minutes.ToString("f0") + ":0" + Seconds.ToString("f0");
        }
    }
    else
    {
        Seconds -= Time.deltaTime;
    }
     
    // These lines will make sure the time is shown as X:XX and not X:XX.XXXXXX
  
}
*/