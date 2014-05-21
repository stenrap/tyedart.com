<?php

class LoginController extends BaseController
{
	
	/**
	 * Handles GET requests to /login
	 */
	public function getIndex()
	{
		if (Auth::check()) {
			return Redirect::to('/manage');
		} else {
			return View::make('login');
		}
	}
	
	/**
	 * Handles POST requests to /login (i.e. login attempts)
	 */
	public function postIndex()
	{
		$email    = Input::has('email')    ? Input::get('email')    : NULL;
		$password = Input::has('password') ? Input::get('password') : NULL;
		
		if ($email && $password && Auth::attempt(array('email' => $email, 'password' => $password), true)) {
			return Redirect::to('/manage');
		} else {
			return View::make('/login', array('invalid' => true));
		}
	}
}