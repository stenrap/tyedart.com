<?php

class OneLogo
{
	public $caption;
	
	function __construct($caption)
	{
		$this->caption = $caption;
	}
}

class Logos
{
	public $name;
	public $logos;
	
	function __construct($name, $logos)
	{
		$this->name  = $name;
		$this->logos = array();
		
		for ($i = 0; $i < count($logos); $i++) {
			$this->logos[] = $logos[$i];
		}
	}
}