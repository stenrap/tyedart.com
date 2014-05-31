<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Tyedart - Login</title>
	<link rel="stylesheet" href="/assets/css/tyedart-manage.css">
	<script src="/assets/js/libs/jquery-min.js"></script>
	<script type="text/javascript">
		function submitLogin() {
			$('#login-form').submit();
		}
		
		$(function() {
			$('#login-button').click(submitLogin);
			$('#login-email, #login-password').keypress(function(e){
				var keyCode = (e.keyCode ? e.keyCode : e.which);
				if (keyCode == 13) {
					submitLogin();
				}
			});
		});
	</script>
</head>
<body>
	<div id="login-wrapper">
		<form action="" method="post" id="login-form">
			<input type="email" name="email" id="login-email" placeholder="Email Address" required autofocus />
			<input type="password" name="password" id="login-password" placeholder="Password" required />
		</form>
		<div id="login-button-back"></div>
		<div id="login-button" title="log in"></div>
	</div>
</body>
</html>