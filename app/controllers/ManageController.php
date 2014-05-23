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
	public function index()
	{
		$logos = Logo::all();
		return View::make('manage');
// 		return "The caption for logo 1: ".$logos[1]->caption;
	}
	
	/**
	 * Handles POST requests to /manage
	 */
	public function store()
	{
		// This should return the ID of the newly created item
		return "Thanks for posting! The id of the newly created item is...";
	}
	
	/**
	 * Handles PUT requests to /manage/{id}
	 * 
	 * @param int $id
	 */
	public function update($id)
	{
		
	}
	
	/**
	 * Handles DELETE requests to /manage/{id}
	 * 
	 * @param int $id
	 */
	public function destroy($id)
	{
		
	}
}