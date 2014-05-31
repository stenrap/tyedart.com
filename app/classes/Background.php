<?php

class Background
{
	private static $july = array(
		
		"july-back1.png",
		"july-back2.png",
		
	);
	
	private static $backgrounds = array(
		
		"back1.png",
		"back2.png",
		"back3.png",
		"back4.png",
		"back5.png",
		"back6.png",
		
	);
	
	public static function get()
	{
		/* 
		 	if (param back is set)
		 		return the specific background requested
		 	
			if (4th of July)
				return one of the two patriotic logos
			
			if cookie && cookie + 1 < count($backgrounds)
				set cookie to cookie + 1
				return large/small $backgrounds[cookie]
			
			set cookie to 0
			return large/small $backgrounds[0]
			
		 */
		
		if (Input::has('back')) {
			$back = Input::get('back') - 1;
			if (Input::has('july') && $back < count(self::$july)) {
				return self::$july[$back];
			} else {
				if ($back < count(self::$backgrounds))
					return self::$backgrounds[$back];
			}
		}
		
		$year = date('Y');
		
		/* Check for July 4th */
		if (time() > strtotime("07/01/$year 12:00AM America/Los_Angeles") && 
			time() < strtotime("07/08/$year 12:00AM America/Los_Angeles")) {
			return self::$july[1]; // WYLO ... Create a function that accepts an array and does the rest of the pseudo code above...
		}
	}
}