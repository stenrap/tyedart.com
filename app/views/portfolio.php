<?php

$logos = Logo::orderBy('place')->get();
$firstFourLogos = array();

for ($i = 0; $i < count($logos); $i++) {
	$firstFourLogos[] = $logos[$i];
	if ($i == 3)
		break;
}

$data = array(
	'firstFourlogos' => $firstFourLogos
);

$scripts = <<<SCRIPTS
<script src="/assets/js/libs/TweenLite.min.js"></script>
<script src="/assets/js/libs/CSSPlugin.min.js"></script>
<script>
    var app = app || {};
    app.Logos = new Backbone.Collection();
    app.Logos.reset($logos);
</script>
<script src="/assets/js/views/portfolio-views.js"></script>
<script src="/assets/js/apps/portfolio-app.js"></script>
SCRIPTS;

$mustache = new Mustache_HTML_Engine();
echo $mustache->renderContent('Portfolio', null, 'portfolio', $data, $scripts);