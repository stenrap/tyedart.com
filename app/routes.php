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

Route::controller('login', 'LoginController');

Route::get('logout', function()
{
	if (Auth::check()) {
		Auth::logout();
	}
	
	return Redirect::to('/');
});

// Route::controller('manage', 'ManageController');
Route::resource('manage', 'ManageController', array('except' => array('create', 'show', 'edit')));

Route::controller('/', 'HomeController');
