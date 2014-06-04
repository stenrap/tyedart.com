<?php

class ManageController extends BaseController
{
	const THUMBNAIL_SIZE = 320;	
	
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
		if (!Input::hasFile('logoFile') || !Input::has('caption')) {
			return Redirect::to('manage');
		}
		
		$newName = null;
		
		if (Input::hasFile('logoFile') && Input::file('logoFile')->isValid()) {
			$newName = uniqid() . '.' . Input::file('logoFile')->getClientOriginalExtension();
			Input::file('logoFile')->move(public_path().'/assets/images/desktop', $newName);
		}
		
		DB::beginTransaction();
		
		$place = Logo::all()->count();
		$place++;
		
		DB::table('logos')->insert(array(
		
			'filename' => $newName,
			'caption'  => Request::instance()->request->get('caption'),
			'url'      => Request::instance()->request->get('url'),
			'place'    => $place,
			
		));
		
		DB::commit();
		
		$desktopName = public_path().'/assets/images/desktop/'.$newName;
		$srcImage    = imagecreatefromjpeg($desktopName);
		$srcSize     = getimagesize($desktopName);
		$srcW        = $srcSize[0];
		$srcH        = $srcSize[1];
		$srcX        = 0;
		$srcY        = 0;
		
		if ($srcW > $srcH) {
			$srcX = ($srcW - $srcH) / 2;
			$srcW = $srcH;
		} elseif ($srcH > $srcW) {
			$srcY = ($srcH - $srcW) / 2;
			$srcH = $srcW;
		}
		
		$dstImage = imagecreatetruecolor(self::THUMBNAIL_SIZE, self::THUMBNAIL_SIZE);
		
		imagecopyresampled($dstImage, $srcImage, 0, 0, $srcX, $srcY, self::THUMBNAIL_SIZE, self::THUMBNAIL_SIZE, $srcW, $srcH);
		imagejpeg($dstImage, public_path().'/assets/images/thumbnails/'.$newName, 80);
		imagedestroy($dstImage);
		
		return Redirect::to('manage');
	}
	
	/**
	 * Handles PUT requests to /manage/{id}
	 * 
	 * @param int $id
	 */
	public function update($id)
	{
		/*
		 * Pseudo Code for Updating a Logo
		 * 
		 * ==================================================================
		 *     Case 1: The logo was moved up (oldPlace = 4, newPlace = 1)
		 * ==================================================================
		 * 
		 * 1. 
		 * 
		 * 
		 * ====================================================================
		 *     Case 2: The logo was moved down (oldPlace = 2, newPlace = 5)
		 * ====================================================================
		 * 
		 * 1. 
		 * 
		 */
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