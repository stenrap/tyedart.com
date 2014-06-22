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
	 * Handles POST requests to /quote
	 *
	 * @return Response
	 */
	public function store()
	{
		// Email the quote information to Tyler
		$first = Input::has('first') ? Request::instance()->request->get('first') : '';
		$last  = Input::has('last')  ? Request::instance()->request->get('last')  : '';
		$phone = Input::has('phone') ? Request::instance()->request->get('phone') : '';
		$email = Input::has('email') ? Request::instance()->request->get('email') : '';
		$org   = Input::has('org')   ? Request::instance()->request->get('org')   : '';
		$site  = Input::has('site')  ? Request::instance()->request->get('site')  : '';
		$time  = Input::has('time')  ? Request::instance()->request->get('time')  : '';
		$refer = Input::has('refer') ? Request::instance()->request->get('refer') : '';
		$work  = Input::has('work')  ? Request::instance()->request->get('work')  : '';
		
		if (strlen($phone) > 0 || strlen($email) > 0) {
			$from    = "From: Tyedart Quote Request <quoterequest@tyedart.com>"; // TODO: Create this email address when tyedart.com is transferred to bluehost...
			$to      = "rob.johansen@gmail.com"; // TODO: Get the right email address here...
			$subject = "Quote Request";
			$body    = "Hey Radical,\n\n";
			$body   .= "Someone just requested a quote on tyedart.com! Hopefully you'll turn this into a pile of cash:\n\n";
			$body   .= "Name: $first $last\n";
			$body   .= "Phone: $phone\n";
			$body   .= "Email: $email\n";
			$body   .= "Company/Organization: $org\n";
			$body   .= "Website: $site\n";
			$body   .= "Best time to contact: $time\n";
			$body   .= "Referred by: $refer\n";
			$body   .= "Description of work: $work\n\n";
			$body   .= "Your humble, lowly, future janitor (and definitely NOT the man),\n";
			$body   .= "Rob\n";
			mail($to, $subject, $body, $from);
			
			return Redirect::to('quote')->with('posted', true);
		}
		
		return Redirect::to('quote')->with('posted', false);
	}


}
