<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});

Route::controller('/login', 'LoginController');

Route::get('/logout', function()
{
	if (Auth::check()) {
		Auth::logout();
	}
	
	return Redirect::to('/login');
});

Route::get('/manage', array('before' => 'auth', function()
{
	return 'Upload some photos!';
}));
