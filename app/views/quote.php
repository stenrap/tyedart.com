<?php

$data = array(
	'posted' => $posted,
	'got'    => !$posted
);

$scripts = <<<SCRIPTS
<script src="/assets/js/libs/jquery.validate.min.js"></script>
<script src="/assets/js/apps/quote-app.js"></script>
SCRIPTS;

$mustache = new Mustache_HTML_Engine();
echo $mustache->renderContent('Quote', $posted ? Background::getThanks() : null, 'quote', $data, $scripts);