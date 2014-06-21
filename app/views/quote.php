<?php

$data = array(
	'posted' => $posted,
	'got'    => !$posted
);

$scripts = <<<SCRIPTS

SCRIPTS;

$mustache = new Mustache_HTML_Engine();
echo $mustache->renderContent('Quote', null, 'quote', $data, $scripts);