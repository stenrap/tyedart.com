<?php

$logos = Logo::orderBy('place')->get();
$firstFourLogos = array();

for ($i = 0; $i < count($logos); $i++) {
	$firstFourLogos[] = $logos[$i];
	if ($i == 3)
		break;
}

$data = array(
	'logos'          => $logos,
	'firstFourlogos' => $firstFourLogos
);

$scripts = array(
	// TODO: Populate this bad boy...
);

$mustache = new Mustache_HTML_Engine();
echo $mustache->renderContent('Portfolio', Background::get(), 'portfolio', $data, $scripts);