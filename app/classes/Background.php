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
		"back7.png",
		
	);
	
	public static function get()
	{
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
		
		// Check for July 4th
		if (time() > strtotime("07/01/$year 12:00AM America/Los_Angeles") && 
			time() < strtotime("07/05/$year 12:00AM America/Los_Angeles")) {
			return self::getWithCookie(self::$july);
		}
		
		// Check for another holiday...?
		
		// Return one of the default backgrounds
		return self::getWithCookie(self::$backgrounds);
	}
	
	private static function getWithCookie($backgroundArray)
	{
		$backgroundNumber = Cookie::has('back') ? Cookie::get('back') : -1;
		$backgroundNumber = $backgroundNumber + 1 < count($backgroundArray) ? $backgroundNumber + 1 : 0;
		
		Cookie::queue('back', $backgroundNumber, 60 * 24 * 365);
		
		return $backgroundArray[$backgroundNumber];
	}
	
	public static function getThanks() {
		return "thanks.jpg";
	}
	
	public static function getVenn() {
		return "venn.png";
	}
}