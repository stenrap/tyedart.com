<?php

$bishop = new OneLogo('Bishop Software');
$canyon = new OneLogo('Canyon Precision Machine');
$celise = new OneLogo('Celise Salmon Photography');

$data = new Logos('Rob', array($bishop, $canyon, $celise));

$mustache = new Mustache_HTML_Engine();
echo $mustache->renderContent('Portfolio', 'portfolio', $data, array());