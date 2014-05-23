<!DOCTYPE html>
<html>
<head>
	<title>Tyedart - Login</title>
</head>
<body>
	<div id="login-wrapper">
		<?php if (isset($invalid)) echo '<p>Invalid credentials...</p>'; ?>
		<form action="" method="post">
			<input type="email" name="email" placeholder="Email Address" required autofocus />
			<input type="password" name="password" placeholder="Password" required />
			<input type="submit" value="Log In"/>
		</form>
	</div>
</body>
</html>