<?php

class HomeController extends BaseController
{
	/**
	 * Handles GET requests to /
	 */
	public function getIndex()
	{
		return View::make('home');
	}
}
