<?php

$data = array();

$scripts = <<<SCRIPTS

SCRIPTS;

$mustache = new Mustache_HTML_Engine();
echo $mustache->renderContent('Quote', null, 'error', $data, $scripts);