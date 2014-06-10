<?php

class ManageController extends BaseController
{
	const THUMBNAIL_SIZE  = 320;
	const TEMP_LOGO_PLACE = 100000;
	
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
		
		// Increment the place of all existing logos
		DB::table('logos')->increment('place');
		
		// Insert the new logo at place 0
		DB::table('logos')->insert(array(
		
			'filename' => $newName,
			'caption'  => Request::instance()->request->get('caption'),
			'url'      => Request::instance()->request->get('url'),
			'place'    => 0,
			
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
		if (Input::has('move')) {
			$oldPlace = Input::get('oldPlace');
			$newPlace = Input::get('newPlace');
			
			DB::beginTransaction();
			
			DB::table('logos')
						->where('place', '=', $oldPlace)
						->update(array('place' => self::TEMP_LOGO_PLACE));
			
			if ($oldPlace > $newPlace) {
				DB::table('logos')
							->where('place', '>=', $newPlace)
							->where('place', '<', $oldPlace)
							->increment('place');
			} else {
				DB::table('logos')
							->where('place', '>', $oldPlace)
							->where('place', '<=', $newPlace)
							->decrement('place');
			}
			
			DB::table('logos')
						->where('place', '=', self::TEMP_LOGO_PLACE)
						->update(array('place' => $newPlace));
			
			DB::commit();
		} elseif (Input::has('update')) {
			$caption = Input::get('caption');
			$url     = Input::get('url');
			DB::table('logos')
						->where('id', '=', $id)
						->update(array('caption' => $caption, 'url' => $url));
		}
	}
	
	/**
	 * Handles DELETE requests to /manage/{id}
	 * 
	 * @param int $id
	 */
	public function destroy($id)
	{
		DB::beginTransaction();
		
		$place = DB::table('logos')
							->where('id', '=', $id)
							->pluck('place');
		
		DB::table('logos')
					->where('id', '=', $id)
					->delete();
		
		DB::table('logos')
					->where('place', '>', $place)
					->decrement('place');
		
		DB::commit();
	}
}