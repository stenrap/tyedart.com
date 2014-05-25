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
	
	public function renderContent($title, $template, $data, $scripts)
	{
		$baseTemplate    = $this->loadTemplate('base');
		$contentTemplate = $this->loadTemplate($template);
		$contentHtml     = $contentTemplate->render($data);
// 		return $contentHtml;
		return $baseTemplate->render(array('title' => $title, 'content' => $contentHtml, 'scripts' => ''));
	}
}