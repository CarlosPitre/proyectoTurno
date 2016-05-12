<?php
$htmlMessage = "";
if (isset($_GET['email'])) {
	$unsubEmail = trim($_GET['email']);
	$fileHandler = fopen("storage/unsubdeatils.csv","a+");
	if ($fileHandler) {
		$allEmails = file("storage/unsubdeatils.csv");
		//echo "<pre>";print_r($allEmails);exit;
		if(in_array($unsubEmail."\n",$allEmails)) {
			$htmlMessage = "Duplicate Email.";
		}else {
			$unsubDetails = array($unsubEmail);
		fputcsv($fileHandler,$unsubDetails);
		$htmlMessage = "You are successfully unsubscribed. You will not receive any more emails.";
		}
		
		
		
	}else{
		$htmlMessage = "Sorry !! At this the unsubscription doesn't works.Please try again.";
	}
	fclose($fileHandler);
} else {
	$htmlMessage = "No Emails Found !!";
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Unsubscribe from the list</title>
<link rel="stylesheet" type="text/css" href="css/view.css" media="all" />
<style type="">
.tdClass {
	border:0px solid blue;
	text-align:left;
	
}
.tdHead{
	border:0px solid blue;
	text-align:left;
	font-size :15px;
    border-bottom :1px solid blue; 
	background-color :#66A3D3;
color : #ffffff;
}
.tdClassOdd {
	border:0px solid blue;
	text-align:left;
	background-color :#FFFFCC;
}
.tdClassBottom {
	border:0px solid blue;
	text-align:left;
	/*background-color :#CC6600;*/
}


</style>
</head>
<body id="main_body" >
	
	<img id="top" src="images/top.png" alt="" />
	<div id="form_container">
	
		<h1 style='font-size:18px;text-indent: 100px;color:#847351;'><a>UNSUBSCRIPTION FORM</a></h1>		
		<div class="form_success">
			<?php print @$htmlMessage;?>
			
		</div>
		<h3>List Administrator</h3>
		<?php 
		if(file_exists("storage/info.txt") === true ) {
			$userInfo = file("storage/info.txt");
			 array_shift ( $userInfo);
			 array_shift ( $userInfo);
			// echo "<pre>";print_r($userInfo);
			 $website = $userInfo[count($userInfo)-1];
			foreach ($userInfo as $info) {
				echo "<br/>".$info;
			}
		}
		?>
		
		<div id="footer" class="success">
		<?php 
			
		?>
			Powered by <a href="<?php echo $website;?>" target="_blank">Dangerous Mailer</a>
		
		</div>		
	</div>
	<img id="bottom" src="images/bottom.png" alt="" />
	</body>
</html>