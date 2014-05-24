<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Manage Logos - Tyedart</title>
	<link rel="stylesheet" href="/assets/css/tyedart-manage.css">
</head>
<body>
	<header>
		<h1>Manage Logos</h1>
		<a href="/logout" title="log out"><img alt="log out" src="/assets/images/desktop/unlock.png"></a>
	</header>
	<form action="" method="post" enctype="multipart/form-data" id="upload-form">
		<input type="file" name="logoFile" required />
		<input type="text" name="caption" placeholder="Caption" required />
		<input type="text" name="url" placeholder="URL" />
		<input type="submit" value="Upload Logo" />
	</form>
	
</body>
</html>