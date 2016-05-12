<?php
ob_start();
session_save_path(dirname(__FILE__));
ini_set('session.gc_probability', 1);

session_start();
if (isset($_SESSION['userinfo'])) {
	header("Location: index.php");exit;
}

$errorMessage = "";
if (isset($_GET['action'])) {
	if($_GET['action'] == 'forgot') {
		if(file_exists("storage/info.txt") === true ) {
			$emailInfo = file("storage/info.txt");
			$emailMessage = "Here is your password for the MAILER \n\n";
			$emailMessage .= "Username : admin\n";
			$emailMessage .= "Password : ".$emailInfo[0];
			$emailMessage .= "\n\n\n\n";
			$emailMessage .= "Regards,\nunderpricedhost@gmail.com";
			$emailMessage .= "\nhttp://www.underpricedhost.com/";
			if(mail($emailInfo[1], "Password of your MAILER", $emailMessage)) {
				$errorMessage = "<br>Password Information sent to your mail";
			}else {
				$errorMessage = "<br>Mail Failes";
			}
		} else {
			$errorMessage = "<br>No Information found.";
		}
	}
}
if (isset($_POST['login'])) {
	//Not First time
	$errorFlag = false;
	$errorMessage = "";
	
	$username = trim($_POST['user_login']);
	$password =  trim($_POST['user_password']);
	if (strlen($username) <= 0 ) {
		$errorFlag = true;
		$errorMessage .="<br/>Username Required.";
	}
	if (strlen($password) <= 0 ) {
		$errorFlag = true;
		$errorMessage .="<br/>Password Required.";
	}
	if ($errorFlag === false) {
		if(file_exists("storage/info.txt") === true ) {
			$userInfo = file("storage/info.txt");
			if (count($userInfo) <= 0) {
				if ($username == 'admin') {
					//$password = md5($password);
					if ($password == 'admin') {
						//header('location : index.php');//exit;
						header("Location: createacess.php");exit;
					} else {
						$errorFlag = true;
						$errorMessage .="<br/>Invalid Password.";
					}
				} else {
					$errorFlag = true;
					$errorMessage .="<br/>Invalid Username.";
				}
			} else {
				if ($username == 'admin'){
					//$password = md5($password);
					if ($password == trim($userInfo[0])) {
						//header('location : index.php');//exit;
						$_SESSION['userinfo'] = $username;
						header("Location: index.php");exit;
						
					}else {
						$errorFlag = true;
						$errorMessage .="<br/>Invalid Password.";
					}
				} else {
					$errorFlag = true;
					$errorMessage .="<br/>Invalid Username.";
				}
			}
		} else {
			//User logged first time
			if ($username == 'admin') {
				//$password = md5($password);
				if ($password == 'admin') {
					//header('location : index.php');//exit;
					header("Location: createacess.php");exit;
				} else {
					$errorFlag = true;
					$errorMessage .="<br/>Invalid Password.";
				}
			} else {
				$errorFlag = true;
				$errorMessage .="<br/>Invalid Username.";
			}
		}
	}
	
}
?>
<br/><br/><br/><br/><br/><br/><br/><br/>
<form name="frm" action="<?php echo $_SERVER['PHP_SELF']?>" method="POST">
<p align="center">
<span style="color: red"><?php echo $errorMessage;?></span>
</p>
<table width="500" height="150" border="1" align="center" cellpadding="1" cellspacing="0">
        <tr> 
          <td width="520" height="23" bgcolor="#4AA5FF"> <div align="center"><font color="#FFFFFF" face="Verdana, Arial, Helvetica, sans-serif"><strong> 
              DANGEROUS MAILER LOGIN</strong></font></div></td>
        </tr>
        <tr> 
          <td height="100" valign="top" bgcolor="#4AA5FF"> 
            <table width="100%" height="100" border="0" cellpadding="5" cellspacing="0" bgcolor="#FFFFFF">
              <tr> 
                <td height="34"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    Username
                    </font></div></td>
                    <td><input type="text" name="user_login" id="user_login"/></td>
              </tr>
              
              <tr> 
                <td height="34"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    Password
                    </font></div></td>
                    <td><input type="password" name="user_password" id="user_password"/></td>
              </tr>
               
              <tr> 
                <td height="34" colspan="2"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    <input type="submit" name="login" value="Login"/>
                    </font></div></td>
                </tr>
                
                <tr> 
                <td height="34" colspan="2"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    <a href="login.php?action=forgot" style="text-decoration: none;"><input type="button" value="Forgot Password"/></a>
                    </font></div></td>
                </tr>
			</table>
		</td>
		</tr>
</table>
</form>
