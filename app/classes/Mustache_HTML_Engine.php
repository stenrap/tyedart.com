<?php

/**
 * This class simply wraps Mustache_Engine, providing the long path to the template files and
 * overriding the default template file extension (.html is better in the IDE than .mustache).
 * 
 * @author Rob Johansen
 */
class Mustache_HTML_Engine extends Mustache_Engine
{
	function __construct()
	{
		parent::__construct(array(
			'loader' => new Mustache_Loader_FilesystemLoader(__DIR__.'/../templates', array('extension' => '.html'))
		));
	}
	
	public function renderContent($title, $background, $template, $data, $scripts)
	{
		$showBack        = !is_null($background);
		$baseTemplate    = $this->loadTemplate('base');
		$contentTemplate = is_null($template) ? '' : $this->loadTemplate($template);
		$contentHtml     = is_null($template) ? '' : $contentTemplate->render($data);
		
		return $baseTemplate->render(array(
				
				'title' => $title,
				'showBack' => $showBack,
				'background' => $background,
				'content' => $contentHtml,
				'scripts' => $scripts,
				
		));
	}
	
	public function renderManagePage()
	{
		$manageTemplate = $this->loadTemplate('manage');
		return $manageTemplate->render(array('logos' => Logo::orderBy('place')->get()));
	}
}