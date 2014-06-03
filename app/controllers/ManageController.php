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
		$newName = null;
		
		if (Input::hasFile('logoFile') && Input::file('logoFile')->isValid()) {
			$newName = uniqid() . '.' . Input::file('logoFile')->getClientOriginalExtension();
			Input::file('logoFile')->move(public_path().'/assets/images/desktop', $newName);
		}
		
		// WYLO: Insert the new logo into the database...
		//       then make the thumbnail...
		//       then redirect to (/manage) so that page refresh doesn't cause another POST...
		
		return "Thanks for posting to ".public_path()."/assets/images/desktop/".$newName."! The id of the newly created item is...";
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