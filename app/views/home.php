<?php

$mustache = new Mustache_HTML_Engine();
echo $mustache->renderContent("Logos, Graphic Design, Childrens' Books, Comics", Background::get(), null, null, array());