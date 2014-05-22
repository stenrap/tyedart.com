<?php

class ManageController extends BaseController
{
	function __construct()
	{
		$this->beforeFilter('auth');
	}
	
	/**
	 * Handles GET requests to /manage
	 */
	public function getIndex()
	{
		$logos = Logo::all();
		
		return "The caption for logo 1: ".$logos[1]->caption;
	}
}