<?php
//ob_start();
set_include_path( get_include_path().PATH_SEPARATOR.dirname(__FILE__).'/lib');
set_include_path( get_include_path().PATH_SEPARATOR.dirname(__FILE__).'/lib/Zend');
error_reporting(E_ERROR);
ini_set("max_execution_time",0);
session_save_path(dirname(__FILE__));
include_once 'SMTPMailer.php';
include_once 'email_validation.php';

$validator=new email_validation_class();

	if(!function_exists("GetMXRR"))
	{
		$_NAMESERVERS=array('8.8.8.8','8.8.4.4','4.2.2.1','4.2.2.2');
		include("getmxrr.php");
	}
	$validator->timeout=10;

	$validator->data_timeout=0;

	$validator->localuser="verify";

	$validator->localhost="emailaddressverifier.com";
	
	$validator->debug = 1;
	$validator->html_debug = 1;
	
/*
 * Read unsub kist
 */
$totalUnsubscribers = 0;
$unsubscribersArray = array ();
$fileHandler =  fopen("storage/unsubdeatils.csv","r");
if ($fileHandler) {
	 while (($data = fgetcsv($fileHandler, 1000, ",")) !== FALSE) {
	 	$totalUnsubscribers++;
	 	$data[0] = nl2br(trim($data[0]));
	 	array_push($unsubscribersArray,$data[0]);
	 }
	fclose($fileHandler);
}
//echo "<pre>";print_r($unsubscribersArray);exit;
ini_set('session.gc_probability', 1);
session_start();
if (!isset($_SESSION['userinfo'])) {
	header("Location: login.php");exit;
}
if (isset($_GET['action'])) {
	if ($_GET['action'] == 'logout') {
		unset($_SESSION['userinfo']);
		header("Location: login.php");exit;
	}
}
# **********
# ** (c) 2004. All rights reserved.
# ** You may change or alter this code so that it works on your server. 
# ** You do not have rights to resell this script unless you purchased rights.
# **********
# ** This delay can be set to any
# ** whole number of seconds.
# **********
$send_button = "Send Message";
$checked1 = "";
$checked2 ="";
$tot_emails = 0;
$max_emails = '';

$thetags = '<option value="%Email%">%Email%</option>'."\n";
/*if (isset($_SESSION['thetags'])) {
	$tag_array = explode(',',$_SESSION['thetags']);
		  foreach ($tag_array as $key => $value){	
		    $thetags .= '<option value="%'.$value.'%">%'.$value.'%</option>'."\n";
		  }  
} */
$term = isset($_POST['term'])?trim($_POST['term']):",";
$tot_emails =  isset($_POST['tot_emails'])?trim($_POST['tot_emails']):"0";



if (isset($_POST['loadfile'])) {
  $emaillist='';
// echo "<pre>";print_r($_POST);exit;
  if (($_FILES['addressfile']['error'])== 0){
		//$content = fread(fopen($addressfile,"r"),filesize($addressfile));
		//$addresses = split("[[:space:]]+", trim($content));
		//$emaillist = join("\n", $addresses) . "\n";
		//echo "<pre>";print_r($_POST);exit;
		$lines = file2($_FILES['addressfile']['tmp_name']);
		
		$titles_radiogroup = @$_POST['titles_radiogroup'] == 1 ? 1: 0;
		if ($titles_radiogroup == 1) {
		  $checked1 = "checked";
		  $checked2 = "";
		  //extract the titles
		  $titles = $lines[0];
		  array_shift($lines); 
		  $emaillist = join("\n", $lines);
		  $tot_emails = count($lines);	
		  unset($_SESSION['thetags']);
		  $_SESSION['thetags'] = $_POST['titles'] = $titles;
		  $tag_array = explode(',',$titles);
		  foreach ($tag_array as $key => $value){
		  	if ($value != 'Email'){
		    	$thetags .= '<option value="%'.$value.'%">%'.$value.'%</option>'."\n";
		  }
		  }    
		}else{
		  $checked1 = "";
		  $checked2 = "checked";
		  $titles="";
		  $emaillist = join("\n", $lines);
		 // print $emaillist;exit;
		  $tot_emails = count($lines);
		  $thetags = '<option value="%Email%">%Email%</option>'."\n";	
		}	
		$enc_check = "";
	    if (@$_POST['enc']) {
	      $enc_check = "checked";
	    }
	}  
}
$chkContentTypePlain = "checked='checked'";
$chkContentTypeHtml = "";
if (isset($_POST['contenttype'])) {
	if(@$_POST['contenttype'] == 'plain') {
			$chkContentTypePlain = "checked='checked'";
			$chkContentTypeHtml = "";
	} else {
		$chkContentTypePlain = "";
		$chkContentTypeHtml = "checked='checked'";
	}
}

if (isset($_POST['submit'])){
    #Open the file attachment if any, and base64_encode it for email transport
	/*If ($file_name){
		@copy($file, "./$file_name") or die("The file you are trying to upload couldn't be copied to the server, make sure the folder where this script is located has it's permissions set correctly.");
		$content = fread(fopen($file,"r"),filesize($file));
		$content = chunk_split(base64_encode($content));
		$uid = strtoupper(md5(uniqid(time())));
		$name = basename($file);
		print '<input name="ffile" type="hidden" value="true">';
	}*/

	
	$message = urlencode($_POST['message']);
	$message = ereg_replace("%5C%22", "%22", $message);
	$message = urldecode($message);
	$message = stripslashes($message);
	$subject = stripslashes($_POST['subject']);	
	$emaillist = stripslashes($_POST['emaillist']);
	$max_emails = $_POST['max_emails'];
	$term = stripslashes($_POST['term']);
	
	if ($max_emails > 0) {
	  if ($_POST['submit'] == "Send Message") {
	    $send_button = "Resume";    
	  }else{
	    $send_button = "Send Message";         
	  }    
	}else{
	  $send_button = "Send Message";
	}
	$enc_check = "";
	if (@$_POST['enc']) {
	  $enc_check = "checked";
	}
	$titles_radiogroup = @$_POST['titles_radiogroup'] == 1 ? 1: 0;
	if ($titles_radiogroup == 1) {
	  $checked1 = "checked";
	  $checked2 = "";
	}else{
	  $checked1 = "";
	  $checked2 = "checked";
	}
	
}else{
  $send_button = "Send Message";
}
function file2($filename) {
       $fp = fopen($filename, "r");
       $buffer = fread($fp, filesize($filename));
       $_SESSION['emaillist'] = trim($buffer);
       fclose($fp);
       //$lines = preg_split("/\r?\n|\r|/", trim($buffer));
       $lines = preg_split("/\r?\n|\r/", trim($buffer));
      // echo "<pre>";print_r($lines);
       return $lines;
} 

?> 
<html>
<script language="JavaScript">
<!--
function clearAll(){
  var f1 = document.forms[0];
  f1.realname.value="";
  f1.from.value="";
  f1.replyto.value="";
  f1.file.value="";
  f1.subject.value="";
  f1.message.value="";  
}
function clearList(){
  var f1 = document.forms[0];
  f1.emaillist.value="";
  f1.titles.value="";
  f1.tot_emails.value="";
}
function checkvalue(){
  var f1 = document.forms[0];
  if (f1.max_emails.value != ""){
	 // alert(f1.max_emails.value);
    mxe = parseFloat(f1.max_emails.value);
    if (isNaN(mxe)){
      wm = "The maximum number of emails is an invalid entry."; 
      alert(wm);
	  return false;
    }else{
      return true;
    }
  }
}
function add_tag(){
  var f1 = document.forms[0];
  f1.message.value = f1.message.value + f1.tags.options[f1.tags.selectedIndex].value;
}

function scrollWindow() {
    window.scrollBy(0, document.body.scrollHeight);
}
function initScroll() {
    setInterval("scrollWindow()", 100);
}
//-->
</script>
<body>
<p align="right"><a href="index.php?action=logout">Logout</a>&nbsp;|&nbsp;<a href="http://www.dangerousmailer.com/help" target="_blank">Help</a>
<form name="form1" method="post" action="" enctype="multipart/form-data" style="margin:0px" onsubmit="return (checkvalue())">
<table width="85%" border="0" cellspacing="0" cellpadding="3" align="center">
  <tr> 
    <td height="25" colspan="2" valign="top">
      <div align="center" style="margin-bottom: 20px;"><font size="4" face="Verdana, Arial, Helvetica, sans-serif"><strong><a href="http://dangerousmailer.com" target="_blank">DANGEROUS MAILER</a> 
        </strong></font></div>
    </td>
  </tr>
  <tr align="center"> 
    <td width="40%" height="575" valign="top"> 
      <table width="300" height="569" border="0" align="center" cellpadding="1" cellspacing="0">
        <tr> 
          <td width="520" height="23" bgcolor="#4AA5FF"> <div align="center"><font color="#FFFFFF" face="Verdana, Arial, Helvetica, sans-serif"><strong>Step 
              1: Load Your Mailing List</strong></font></div></td>
        </tr>
        <tr> 
          <td height="546" valign="top" bgcolor="#4AA5FF"> 
            <table width="100%" height="522" border="0" cellpadding="5" cellspacing="0" bgcolor="#FFFFFF">
              <tr> 
                <td height="34" colspan="2"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    <input type=file name=addressfile>
                    </font></div></td>
              </tr>
              <tr> 
                <td width="54%" height="32"> <div align="right"><font size="2" face="Verdana, Arial, Helvetica, sans-serif">Fields 
                    terminated by:</font></div></td>
                <td width="46%"><input name="term" type="text" id="term" value="<? print $term; ?>" size="10"></td>
              </tr>
              <tr> 
                <td height="26" colspan="2"> <div align="left"><font size="2" face="Verdana, Arial, Helvetica, sans-serif"> 
                    <input name="enc" type="checkbox" value="checkbox" <?php print isset($_POST['enc'])?'checked':''; ?>>
                    Enclosed Fields</font><font size="2" face="Verdana, Arial, Helvetica, sans-serif"> 
                    </font></div></td>
              </tr>
              <tr> 
                <td height="26" colspan="2"> <p align="left"> 
                    <label> 
                    <input name="titles_radiogroup" type="radio" value="1" <?php print $checked1; ?>>
                    <font size="2" face="Verdana, Arial, Helvetica, sans-serif">With 
                    Titles</font></label>
                    <br>
                    <label> 
                    <input type="radio" name="titles_radiogroup" value="0" <?php print $checked2; ?>>
                    <font size="2" face="Verdana, Arial, Helvetica, sans-serif">Without 
                    Titles</font></label>
                    <br>
                  </p></td>
              </tr>
              <tr> 
                <td height="34" colspan="2"><div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    <input name="loadfile" type="submit" id="loadfile" value="Load Addresses From File">
                    </font></div></td>
              </tr>
              <tr> 
                <td height="32" colspan="2"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    </font> <font size="-1" face="Verdana, Arial, Helvetica, sans-serif">Titles: 
                    <input name="titles" type="text" id="titles" value="<?php print @$_POST['titles']; ?>" size="30">
                    </font></div></td>
              </tr>
              <tr> 
                <td height="272" colspan="2" valign="top"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    <textarea name="emaillist" cols="30" rows="15" wrap="OFF"><?php print @$emaillist; ?></textarea>
                    </font></div></td>
              </tr>
              <tr> 
                <td height="32" valign="top"> <div align="right"><font size="2" face="Verdana, Arial, Helvetica, sans-serif">Total 
                    Emails:</font></div></td>
                <td height="32" valign="top"> <input name="tot_emails" type="text" id="tot_emails" value="<?php print $tot_emails; ?>" size="10"></td>
              </tr>
              <tr> 
                <td height="34" colspan="2" valign="top"> <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    <input type="button" name="Button" value="Clear List" onClick="clearList()">
                    </font></div></td>
              </tr>
            </table></td>
        </tr>
      </table></td>
    <td width="60%" valign="top"> 
      <table width="500" height="449" border="0" align="center" cellpadding="1" cellspacing="0">
        <tr> 
          <td height="22" bgcolor="#4AA5FF"> <div align="center"><font color="#FFFFFF" face="Verdana, Arial, Helvetica, sans-serif"><strong>Step 
              2: Deliver Your Emails</strong></font></div></td>
        </tr>
        <tr> 
          <td height="427" valign="top" bgcolor="#4AA5FF"> 
            <table width="100%" border="0" cellpadding="5" cellspacing="0" bgcolor="#FFFFFF">
              <tr> 
                <td width="20%">
                  <div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">Your 
                    Name:</font></div>
                </td>
                <td width="80%"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                  <input type="text" name="realname" value="<? print @$_POST['realname']; ?>" size="30">
                  </font></td>
              </tr>
              <tr> 
                <td>
                  <div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">Your 
                    Email:</font></div>
                </td>
                <td><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                  <input type="text" name="from" value="<? print @$_POST['from']; ?>" size="30">
                  </font></td>
              </tr>
              <tr> 
                <td>
                  <div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">Reply-To:</font></div>
                </td>
                <td><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                  <input type="text" name="replyto" value="<? print @$_POST['replyto']; ?>" size="30">
                  </font></td>
              </tr>
              <tr> 
                <td>
                  <div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">Subject:</font></div>
                </td>
                <td><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                  <input type="text" name="subject" value="<? print @$_POST['subject']; ?>" size="58">
                  </font></td>
              </tr>
              <tr> 
                <td>
                  <div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">Delay:</font></div>
                </td>
                <td><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                  <input name="delaySecs" type="text" value="<?php echo @$_POST['delaySecs'];?>" size="10" >
                  Minimum 1 seconds</font></td>
              </tr>
              <tr> 
                <td>
                  <div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">Max 
                    Emails:</font></div>
                </td>
                <td><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                  <input name="max_emails" type="text" value="<? print @$max_emails; ?>" size="10">
                  Leave blank to send to all emails</font></td>
              </tr>
              <tr> 
                <td>
                  <div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">Titles:</font></div>
                </td>
                <td><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                  <select name="tags" id="tags" onChange="add_tag()">
                    <?php print @$thetags; ?>
                  </select>
                  </font></td>
              </tr>
              <tr> 
                <td colspan="2">
                  <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                    <textarea name="message" cols="60" rows="10" wrap="OFF"><? print stripslashes(@$_POST['message']); ?></textarea>
                    <br>
                    <input type="radio" name="contenttype" value="plain" <?php echo $chkContentTypePlain;?> >
                    Plain 
                    <input type="radio" name="contenttype" value="html" <?php echo $chkContentTypeHtml;?> >
                    HTML </font></div>
                </td>
              </tr>
              <!-- attachment start -->
               <tr> 
                <td>
                  <div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">Attachment 
                </font></div>
                </td>
                <td><input type="file" name="attachment"/></td>
              </tr>
              <!-- attachment ends -->
               <tr> 
                <td colspan="2">
                <?php $chkUndubLink= isset($_POST['chk_unsublink']) ? "checked='checked'" : ""; ?>
                <input type="checkbox" name="chk_unsublink" value="1" <?php echo $chkUndubLink; ?>/>
                <font size="-1" face="Verdana, Arial, Helvetica, sans-serif">           
                  Do you want to include the UNSUBSCRIBE LINK ?</font><br/>Unsubscribers: <a href="storage/unsubdeatils.csv" target="_blank"><?php echo $totalUnsubscribers;?> </a>so far </td>
              </tr>
              <!-- Email Exists UI Starts -->
               <tr> 
                <td colspan="2">
                <?php $chkEmailExists= isset($_POST['chk_emailexists']) ? "checked='checked'" : ""; ?>
                <input type="checkbox" name="chk_emailexists" value="1" <?php echo $chkEmailExists; ?>/>
                <font size="-1" face="Verdana, Arial, Helvetica, sans-serif">           
                  Do you want to check the REAL EXISTENCE of an email address before actually sending
   an email to it? This will thus avoid 99% of bounces</font> </td>
              </tr>
              <?php $_POST['localuser'] = isset($_POST['localuser'])?$_POST['localuser'] : "verify";?>
               <tr>
              	<td> <div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">localuser :</font> </div></td>
              	<td> <input type='text' name='localuser' size='25' value="<?php echo $_POST['localuser']?>" /> </td>
              	  
              </tr>
              <tr>
              <td colspan="2">
               
                <p style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size: 10px;">         
                  (Type any local email account present on this domain on which 
   this DM software is installed. For example if your
   domain is underpricedhost.com and if support@underpricedhost.com is the 
   email account then type "support" as a localuser. 
   support@underpricedhost.com should be a real existing email account.)
                  </p> </td>
              </tr>
              <?php $_POST['localhost'] = isset($_POST['localhost'])?$_POST['localhost'] : "emailaddressverifier.com";?>
               <tr>
              	<td> <div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">localhost :</font><br/>
              	 </div></td>
              	<td> <input type='text' name='localhost' size='25' value="<?php echo $_POST['localhost']?>" /> </td>
              	
              </tr>
               <tr>
              <td colspan="2">
               
                <p style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size: 10px;">           
                 (Type the exact domain name on which 
   this DM software is installed. For example if underpricedhost.com
   is the domain on which you have installed this DM software then 
   type "underpricedhost.com" as a localhost.)
                  </p> </td>
              </tr>
              <!-- Email Exists UI Ends -->
              <tr>
              <?php 
              $chkSmtp = isset($_POST['chk_smtp']) ? "checked='checked'" : "";
              
              ?>
              	<td colspan="2"> <input type="checkbox" name="chk_smtp" value="external" <?php echo $chkSmtp;?>/>
              	<font size="-1" face="Verdana, Arial, Helvetica, sans-serif">  Do you want to use External SMTP Server </font></td>
              </tr>
              <tr>
              	<td> <div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">SMTP Host :</font> </div></td>
              	<td> <input type='text' name='smtp_host' size='25' value="<?php echo $_POST['smtp_host']?>" /> </td>
              	
              </tr>
              <?php 
             	 $smtpPort = isset($_POST['smtp_port']) ? $_POST['smtp_port'] : 25;
              ?>
              <tr>
              	<td><div align="right">
              	<font size="-1" face="Verdana, Arial, Helvetica, sans-serif">  
              	SMTP Port : 
              	</font></div> </td><td><input type="text" name='smtp_port' size='4' maxlength="4" value="<?php echo $smtpPort;?>"/> </td>
              </tr>
              <tr>
              	<td><div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">  Login ID :</font> </div> </td><td><input type="text" name='smtp_username' size='25' maxlength="50" value="<?php echo $_POST['smtp_username']?>"/> </td>
              </tr>
              <tr>
              	<td><div align="right"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">  Password : </font></div> </td><td><input type="password" name='smtp_password' size='25' maxlength="50" value="<?php echo $_POST['smtp_password']?>"/> </td>
              </tr>
               <tr>
                <?php 
              $chkSmtpSecure = isset($_POST['chk_smtp_secure']) ? "checked='checked'" : "";
              
              ?>
              	<td colspan="2"> <input type="checkbox" name="chk_smtp_secure" value="1" <?php echo $chkSmtpSecure;?>/><font size="-1" face="Verdana, Arial, Helvetica, sans-serif">  Enable secure connection</font></td>
              </tr>
              <tr> 
                <td height="55" colspan="2"> 
                  <table width="100%" border="0" cellspacing="0" cellpadding="1">
                    <tr> 
                      <td width="51%" height="31"> 
                        <div align="center"> </div>
                        <div align="center"> </div>
                        <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                          <input type="button" name="Button" value="Clear All" onClick="clearAll()">
                          </font></div>
                      </td>
                      <td width="49%">
                        <div align="center"><font size="-1" face="Verdana, Arial, Helvetica, sans-serif"> 
                          <input name="submit" type="submit" id="submit" value="<?php print @$send_button ?>">
                          </font></div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table></td>
  </tr>
</table>
</form>
</body>
</html>
<div style="margin-left:200px;">
  <?php
if (isset($_POST['submit'])){
	/*
	 * Attachment
	 */
	$fileatt = $_FILES['attachment']['tmp_name'];
	$fileatt_type = $_FILES['attachment']['type'];
	$fileatt_name = $_FILES['attachment']['name'];
	
	
	$validator->localuser= trim($_POST['localuser']);

	$validator->localhost= trim($_POST['localhost']);
	
	//echo "<pre>";var_dump($term);
  //	echo "<pre>";print_r($_POST);exit;
  	$titles_radiogroup = @$_POST['titles_radiogroup'] == 1 ? 1: 0;
	$submit = $_POST['submit'];
	//obtain flags
	$start_num = 0;
	$pause=false;$send=false;
	if      (strpos($submit, 'Resume')!==false) {$pause=true;}
	else if (strpos($submit, 'Send')!==false)  {$send=true;}
	
	
	if ($pause) {
	   //display sent emails
	   foreach ($_POST as $key => $value){
	   	
	     if (strpos($key, 'sentemail')!==false) {	   
		   $em = explode('_',$key);
		   $last_id = $em[1];
		   $email_num = $last_id+1;
		   print $email_num.' Sending mail to <font color="#FF00FF">'.$value.'</font><font size="7" color="#0000FF"> ... Successfull!</font><br>';
		   print '<input name="'.$key.'" type="hidden" value="'.$value.'">';   
		 }
	   }
	   	 
	   if ($submit=='Resume') { 
	     print "Process has been resumed.<br>";
		 $send=true;
		 $start_num = $last_id+1;
       }else{
	     exit;
	   }      
	}	
	
  if ($send) {
  	$from = $_POST['from'];
  	$subject = $_POST['subject'];
  	$message = $_POST['message'];
  	$emaillist = $_POST['emaillist'];
  	$realname = $_POST['realname'];
  	
  	$message = urlencode($_POST['message']);
	$message = ereg_replace("%5C%22", "%22", $message);
	$message = urldecode($message);
	$message = stripslashes($message);
	$subject = stripslashes($_POST['subject']);	
	$emaillist = stripslashes($_POST['emaillist']);
	$max_emails = $_POST['max_emails'];
	$term = stripslashes($_POST['term']);
	
	if (!$from || !$subject || !$message || !$emaillist){
	print "Please complete all fields before sending your message.";
	exit;
	}
	$delaySecs = (int) $_POST['delaySecs'];
	if($delaySecs <= -1) {
		print "Delay seconds must me greater than 0";exit;
	}
	//obtain email data
    $emaillist=trim($emaillist);
	$allemails = split("\n", $emaillist);
	//echo "<pre>";var_dump($titles_radiogroup);exit;
	if ($titles_radiogroup == 1) {
	  
	foreach ($allemails as $key => $row){
	 if (strpos($row,$term)===false) {
	    print "The given termination delimiter was not found, make sure you entered it correctly.";
		exit;
	  }
	  $emaildata[$key] = explode($term,$row);
	  $enc = $_POST['enc'];
	  if ($enc) {
	    foreach ($emaildata[$key] as $key2 => $value) {
		  $emaildata[$key][$key2] = substr($value,1,strlen($value)-2);
		}
	  }
	}
	//determine the email index
	$email_ind = 0;
	$the_titles = explode(',',$_POST['titles']);
	
	foreach ($the_titles as $key => $value) {  
	  $value = strtolower($value);
	  if (strpos($value,"email")!==false) {
         $email_ind = $key;
        // print $email_ind;exit;
		 break; 
	  }
	}
	
	//construct the tag titles array
	foreach ($the_titles as $key => $value) {
	   $st = '%'.$value.'%';
	   $the_titles[$key] = $st;
	}
	
	}
	$numemails = count($allemails);
	if ($max_emails) {
	   $numemails = $max_emails;
	}
	if ($numemails > $tot_emails) {
	  $numemails = $tot_emails;    
	}
    
	/**
	 * Create SMTP
	 */
	$smtpMailer = new SMTPMailer();
	if(isset($_POST['chk_smtp']) && $_POST['chk_smtp'] == 'external') {
		
		
		
		if (!trim($_POST['smtp_host']) | !trim($_POST['smtp_port']) | !trim($_POST['smtp_username']) | !trim($_POST['smtp_password'])) {
			print "Please complete SMTP info";exit;
		}
		$intPattern = "/([0-9]{2,4})$/";
		if (!preg_match($intPattern,trim($_POST['smtp_port']),$matches)) {
			
			print "Invalid SMTP Port";exit;
		}
		
		$smtpMailer -> setSmtpHost(trim($_POST['smtp_host']));
		$smtpMailer -> setSmtpUsername(trim($_POST['smtp_username']));
		$smtpMailer -> setSmtpPassword(trim($_POST['smtp_password']));
		$smtpMailer -> setSmtpPort($_POST['smtp_port']);
		if (isset($_POST['chk_smtp_secure'])){
			$smtpMailer -> setIsSecure(true);
		} else {
			$smtpMailer -> setIsSecure(false);
		}
		
		$smtpMailer -> setMailType($_POST['contenttype']);
		
		$smtpMailer -> setMailFrom($realname);
		$smtpMailer -> setMailFromEmail($from);
		
		$smtpMailer -> setReplayMail($_POST['replyto']);
		try {
			$smtpMailer -> createSMTP();
		}catch (Zend_Exception $e) {
			print "<br/>".$e->getMessage ();exit;
		}
		
		
	}
	//process the emails
	//echo "<pre>";print_r($emaildata);
	for($x=$start_num; $x<$numemails; $x++){
		print "<script type='text/javascript'>scrollWindow();</script>";
	    if ($titles_radiogroup == 1) {$to = $emaildata[$x][$email_ind];}
		else{$to = $allemails[$x];}
		if ($to){
		    $to = ereg_replace(" ", "", $to);
			//replace tag titles
			$tmp_message = $message;
			$tmp_subject = $subject;
			//var_dump($titles_radiogroup);
			if ($titles_radiogroup == 1) {
			  foreach ($the_titles as $key => $value){
			    $message = ereg_replace($value, $emaildata[$x][$key], $message);
			    $subject = ereg_replace($value, $emaildata[$x][$key], $subject);
			  }
			}else{
			//	print $message;
			  $message = ereg_replace("%Email%", $to, $message);
			 // print ">>>".$message;
			  $subject = ereg_replace("%Email%", $to, $subject);
			}
			$email_num = $x+1;
			$contenttype = $_POST['contenttype'];
			$replyto = $_POST['replyto'];
			$uid = strtoupper(md5(uniqid(time())));
			$unsubLinkFlag = false;
			if (count ($unsubscribersArray) > 0) {
				if (in_array(trim($to),$unsubscribersArray)) {
					print $email_num.' Sorry I wont send him email. '.$to.' has already unsubscribed.<br/>';
					$unsubLinkFlag = true;
				}else {
					print $email_num.' Checking syntax of <font color="#FF00FF">'.$to.'</font>';
				}
			} else {
				print $email_num.' Checking syntax of <font color="#FF00FF">'.$to.'</font>';
			}
			$pattern = "/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i";
			if ($unsubLinkFlag === false) {
				if(!preg_match($pattern,trim($to))) {
		       		print "<font color='#FF0000'>... Invalid Email Address!</font><br>";
		       		flush();
		           continue;
		       } else {
		       	
		           print "... Seems good!<br>";
		       }
			}
	       
		    print '<input name="sentemail_'.$x.'" type="hidden" value="'.$to.'">';
		    flush();
			if(isset($_POST['chk_unsublink'])) {
				$serverInfo =  $_SERVER['PHP_SELF'];
				$serverInfoArray = explode("/",$serverInfo);
				unset($serverInfoArray[count($serverInfoArray)-1]);
				 
				$unLink = $_SERVER['HTTP_HOST'].implode("/",$serverInfoArray)."/unsubscribe.php?email=".$to;
				if ($contenttype == 'plain') {
					$unLink ="To Unsubscribe, please click here\n".$unLink;

				}else {
					$unLink = "To unsubscribe, please <a href='".$unLink."'>click here</a>";
				}
				
				$message = $message."\n\n".$unLink;
			}
			if ($unsubLinkFlag === false) {
				if (isset($_POST['chk_emailexists'])) {
					$result = $validator->ValidateEmailBox(trim($to));
					if($result == 0){
						print "<br><font size='5' color='#FF0000'>The Email address $to may not be valid and may be undeliverable.</font><br>";
						flush();
						continue;
					}else if($result == 1){
						
						print "<br><font size='5' color='#008000'>Email Address $to is valid and deliverable.</font><br>";
					}else {
						print "<br><font size='5' style='color:#FF0000'>The Email address $to may not be valid and may be undeliverable.</font><br>";
					}
					flush();
				}
				
				print "&nbsp;&nbsp;&nbsp;&nbsp;Sending mail to $to ...";
			}
			
			if(isset($_POST['chk_smtp']) && $_POST['chk_smtp'] == 'external') {
				$smtpMailer->setMailSubject($subject);
				
				if ($unsubLinkFlag === false) {
					if ($contenttype == 'plain') {
						$smtpMailer->setMailType('plain');
					}else{
						$smtpMailer->setMailType('html');
						$message = stripslashes($message);
					}
					$smtpMailer->setMailBody($message);
					$attachmentArray = array();
					if (is_uploaded_file($fileatt))  {
						$file = fopen($fileatt, 'rb');
						$data = fread($file, filesize($fileatt));
						$attachmentArray['data'] = $data;
						$attachmentArray['type'] = $fileatt_type;
						$attachmentArray['name'] = $fileatt_name;
						
					}
					if($smtpMailer->sendEmails($to,$attachmentArray) === true){
						print '<font color="#0000FF"> ... Successfull!</font><br>';
					}else{
						print '<font color="#FF0000"> ... Aborted!</font><br>';
					}
					
			   		
				}
				
			} else {
				$smtpMailer -> setMailType($_POST['contenttype']);
		
				$smtpMailer -> setMailFrom($realname);
				$smtpMailer -> setMailFromEmail($from);
				
				$smtpMailer -> setReplayMail($_POST['replyto']);
				
				$smtpMailer->setMailSubject($subject);
				if ($contenttype == 'plain') {
					$smtpMailer->setMailType('plain');
				}else{
					$smtpMailer->setMailType('html');
					$message = stripslashes($message);
				}
				$smtpMailer->setMailBody($message);
				
				$attachmentArray = array();
				if (is_uploaded_file($fileatt))  {
						$file = fopen($fileatt, 'rb');
						$data = fread($file, filesize($fileatt));
						$attachmentArray['data'] = $data;
						$attachmentArray['type'] = $fileatt_type;
						$attachmentArray['name'] = $fileatt_name;
						
				}
				if ($unsubLinkFlag === false) {
					if($smtpMailer->defaultMailer($to,$attachmentArray) === true){
						print '<font size="5" color="#0000FF"> ... Successfull!</font><br>';
					}else{
						print '<font color="#FF0000"> ... Aborted!</font><br>';
					}
					
				}
			}
		   
			
		    
		    
		    sleep($delaySecs);
		    flush();
			$message = $tmp_message;
			$subject = $tmp_subject;
		}
	}
	if ($numemails == $tot_emails) {
	    print "Done!<br>";
	}else if ($start_num >= $max_emails) {
        print "Error: you forgot to increase the maximum number of emails.<br>";
		$submit = "Send Message";    
    }else{
	    if ($max_emails) {
	        if (@$ffile) {
	            print 'Process has been paused ... <font color="#FF0000">NOTE: You must re-attach your attached file before resuming.</font><br>';
	        }else{
		        print 'Process has been paused ... <font color="#0000FF">Enter in the new Maximum number of emails and click the Resume button.</font><br>';
	        }  
	    }	
	}
  }
}
?>
</div>