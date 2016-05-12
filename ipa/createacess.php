<?php 
ob_start();
session_save_path(dirname(__FILE__));
ini_set('session.gc_probability', 1);
session_start();
if (isset($_SESSION['userinfo'])) {
	header("Location: index.php");exit;
}
$errorMessage = "";

if (isset($_POST['update'])) {
	$errorFlag = false;
	$errorMessage ="";
	$password = trim($_POST['user_password']);
	$userEmail = trim($_POST['user_email']);
	if (strlen($password) <= 0) {
		$errorMessage .= "<br/>New Password Required.";
		$errorFlag = true;
	}
	if (strlen($userEmail) <= 0) {
		$errorMessage .= "<br/>Email Required.";
		$errorFlag = true;
	} else {
		if(!preg_match ("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/", $userEmail)) {
			$errorMessage .= "<br/>Invalid Email.";
			$errorFlag = true;
		}
	}

	if (strlen($_POST['admin_name']) <= 0) {
		$errorMessage .= "<br/>Administrator Name Required.";
		$errorFlag = true;
	}
	if (strlen($_POST['admin_addr']) <= 0) {
		$errorMessage .= "<br/>Administrator Address Required.";
		$errorFlag = true;
	}
	if (strlen($_POST['admin_city']) <= 0) {
		$errorMessage .= "<br/>Administrator City Required.";
		$errorFlag = true;
	}
if (strlen($_POST['admin_state']) <= 0) {
		$errorMessage .= "<br/>Administrator State Required.";
		$errorFlag = true;
	}
	if (strlen($_POST['admin_country']) <= 0) {
		$errorMessage .= "<br/>Administrator Country Required.";
		$errorFlag = true;
	}
	if (strlen($_POST['admin_website']) <= 0) {
		$errorMessage .= "<br/>Dangerous Mailer Affiliate Website Required.";
		$errorFlag = true;
	}else {
		if(strpos($_POST['admin_website'],"http://") === false) {
			$_POST['admin_website'] = "http://".$_POST['admin_website'];
		}
		
	}
	//if(file_exists("storage/info.txt") === false ) {
	if ($errorFlag === false) {
		$fileHandle = fopen("storage/info.txt", 'w');
		if($fileHandle === false) {
			$errorMessage = "<br/>Can't able to create informations";
			$errorFlag = true;
		}else {
			//$password = md5($password);
			fwrite($fileHandle, $password);
			fwrite($fileHandle, "\n");
			fwrite($fileHandle, $userEmail);
			
					
			fwrite($fileHandle, "\n");
			fwrite($fileHandle, $_POST['admin_name']);
			
			fwrite($fileHandle, "\n");
			fwrite($fileHandle, $_POST['admin_addr']);
			
			fwrite($fileHandle, "\n");
			fwrite($fileHandle, $_POST['admin_city']);
			
			fwrite($fileHandle, "\n");
			fwrite($fileHandle, $_POST['admin_state']);
			
			fwrite($fileHandle, "\n");
			fwrite($fileHandle, $_POST['admin_country']);
			
			fwrite($fileHandle, "\n");
			fwrite($fileHandle, $_POST['admin_website']);
			
			fclose($fileHandle);
			$_SESSION['userinfo'] = $userEmail;
			header("Location: index.php");exit;
		}
	}
	//}
}

?>
<form name="frm" action="<?php echo $_SERVER['PHP_SELF']?>" method="POST">
<p align="center">
<span style="color: red"><?php echo $errorMessage;?></span>
</p>
<table width="500" height="150" border="1" align="center" cellpadding="1" cellspacing="0">
        <tr> 
          <td width="520" height="23" bgcolor="#4AA5FF"> <div align="center"><font color="#FFFFFF" face="Verdana, Arial, Helvetica, sans-serif"><strong> 
              Update Information</strong></font></div></td>
        </tr>
        <tr> 
          <td height="100" valign="top" bgcolor="#4AA5FF"> 
            <table width="100%" height="100" border="0" cellpadding="5" cellspacing="0" bgcolor="#FFFFFF">
            
              
              <tr> 
                <td height="34"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                   New Password
                    </font></div></td>
                    <td><input type="password" name="user_password" id="user_password"/></td>
              </tr>
              
               <tr> 
                <td height="34"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    Email
                    </font></div></td>
                    <td><input type="text" name="user_email" id="user_email" value="<?php echo @$_POST['user_email'];?>" /></td>
              </tr>
              
              <tr> 
                <td height="34"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    Administrator Name
                    </font></div></td>
                    <td><input type="text" name="admin_name" id="admin_name" value="<?php echo @$_POST['admin_name'];?>"/></td>
              </tr>
              
              <tr> 
                <td height="34"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    Administrator Address
                    </font></div></td>
                    <td><input type="text" name="admin_addr" id="admin_addr" value="<?php echo @$_POST['admin_addr'];?>"/></td>
              </tr>
              
              <tr> 
                <td height="34"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    Administrator City
                    </font></div></td>
                    <td><input type="text" name="admin_city" id="admin_city" value="<?php echo @$_POST['admin_city'];?>"/></td>
              </tr>
              <tr> 
                <td height="34"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    Administrator State
                    </font></div></td>
                    <td><input type="text" name="admin_state" id="admin_state" value="<?php echo @$_POST['admin_state'];?>"/></td>
              </tr>
              <tr> 
                <td height="34"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    Administrator Country
                    </font></div></td>
                    <td><input type="text" name="admin_country" id="admin_country" value="<?php echo @$_POST['admin_country'];?>"/></td>
              </tr>
               
                <tr> 
                <td height="34"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    Dangerous Mailer Affiliate Website
                    </font></div></td>
                    <td><input type="text" name="admin_website" id="admin_website" value="<?php echo @$_POST['admin_website'];?>"/></td>
              </tr>
              
              <tr> 
                <td height="34" colspan="2"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    <input type="submit" name="update" value="Update"/>
                    </font></div></td>
                </tr>
			</table>
		</td>
		</tr>
</table>
</form>