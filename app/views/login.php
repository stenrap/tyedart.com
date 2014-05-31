<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Tyedart - Login</title>
	<link rel="stylesheet" href="/assets/css/tyedart-manage.css">
</head>
<body>
	<div id="login-wrapper">
		<?php if (isset($invalid)) echo '<p>Invalid credentials...</p>'; ?>
		<form action="" method="post" id="login-form">
			<input type="email" name="email" id="login-email" placeholder="Email Address" required autofocus />
			<input type="password" name="password" id="login-password" placeholder="Password" required />
		</form>
		<div id="login-button-back"></div>
		<div id="login-button" title="Authenticate"></div>
	</div>
</body>
</html>