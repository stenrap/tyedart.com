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

App::missing(function($exception) {
	return Response::view('error', array(), 404);
});

Route::resource('quote', 'QuoteController', array('only' => array('index', 'store')));

Route::resource('portfolio', 'PortfolioController', array('only' => array('index')));

Route::controller('login', 'LoginController');

Route::get('logout', function() {
	if (Auth::check()) {
		Auth::logout();
	}
	
	return Redirect::to('/');
});

Route::resource('manage', 'ManageController', array('except' => array('create', 'show', 'edit')));

// Specify the home controller last so it doesn't match every other path.
Route::controller('/', 'HomeController');
