<?php

class QuoteController extends \BaseController {

	/**
	 * Handles GET requests to /quote
	 *
	 * @return Response
	 */
	public function index()
	{
		$posted = Session::has('posted');
		
		if ($posted) {
			Session::forget('posted');
		}
		
		return View::make('quote')->with('posted', $posted);
	}


	/**
	 * Handles POST requests to /store
	 *
	 * @return Response
	 */
	public function store()
	{
		// INSERT the quote...
		
		return Redirect::to('quote')->with('posted', true);
	}


}
