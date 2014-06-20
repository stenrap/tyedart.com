<?php

class QuoteController extends \BaseController {

	/**
	 * Handles GET requests to /quote
	 *
	 * @return Response
	 */
	public function index()
	{
		return View::make('quote');
	}


	/**
	 * Handles POST requests to /store
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}


}
