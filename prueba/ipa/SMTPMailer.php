<?php

require_once 'Zend/Mail.php';
require_once 'Zend/Mail/Transport/Smtp.php';

class SMTPMailer {
	
	private $smtpHost;
	private $smtpUsername;
	private $smtpPassword;
	private $smtpPort = 25;
	private $isSecure = false;
	private $smtpTransport = false;
	
	private $mailer ;
	
	private $mailFrom;
	private $mailFromEmail;
	
	private $mailSubject;
	private $mailBody;
	
	private $replayMail;
	
	
	private $mailType = 'plain';
	
	private $attachment;
	
	public function __construct() {
		
	}
	public function createSMTP () {
		try{
			$configArray = array (
							'auth'     => 'login',
							'username' => $this->smtpUsername,
							'password' => $this->smtpPassword,
							'port'     => $this->smtpPort
						);
			if($this->isSecure === true) {
				$configArray['ssl'] = 'tls';
			}
			$this->smtpTransport = new Zend_Mail_Transport_Smtp($this->smtpHost, $configArray);
			
		}catch (Zend_Exception $e) {
			throw new Zend_Exception($e->getMessage ());
		}
	}
	
	public function sendEmails($to,$attachment = array ()) {
		try{
			$this->mailer = new Zend_Mail ();
			//var_dump($this->mailer);exit;
			if ($this->mailType == 'html') {
				
				$this->mailer->setBodyHtml($this->getMailBody());
			}else{
				$this->mailer->setBodyText($this->getMailBody());
			}
			
			$this->mailer->setFrom($this->mailFromEmail, $this->mailFrom);
			$this->mailer->addTo($to);
			$this->mailer->setSubject($this->mailSubject);
			if (!empty($attachment)) {
				$this->mailer->createAttachment($attachment['data'],$attachment['type'],Zend_Mime::DISPOSITION_ATTACHMENT, Zend_Mime::ENCODING_BASE64,$attachment['name']);
			}
			
			$this->mailer->send($this->smtpTransport);
			return true;
		} catch (Zend_Exception $e) {
			return false;	
		}
		
	}
	
	public function defaultMailer ($to,$attachment = array ()) {
		try {
			$this->mailer = new Zend_Mail ();
			if ($this->mailType == 'html') {
				
				$this->mailer->setBodyHtml($this->getMailBody());
			}else{
				$this->mailer->setBodyText($this->getMailBody());
			}
			$this->mailer->setFrom($this->mailFromEmail, $this->mailFrom);
			$this->mailer->addTo($to);
			$this->mailer->setSubject($this->mailSubject);
			if (!empty($attachment)) {
				$this->mailer->createAttachment($attachment['data'],$attachment['type'],Zend_Mime::DISPOSITION_ATTACHMENT, Zend_Mime::ENCODING_BASE64,$attachment['name']);
			}
			
			$this->mailer->send();
			return true;
		} catch (Zend_Exception $e) {
			return false;	
		}
	}
	public function getSmtpHost() {
		return $this->smtpHost;
	}

	public function getSmtpUsername() {
		return $this->smtpUsername;
	}

	public function getSmtpPassword() {
		return $this->smtpPassword;
	}

	public function getSmtpPort() {
		return $this->smtpPort;
	}

	public function getIsSecure() {
		return $this->isSecure;
	}

	public function setSmtpHost($smtpHost) {
		$this->smtpHost = $smtpHost;
	}

	public function setSmtpUsername($smtpUsername) {
		$this->smtpUsername = $smtpUsername;
	}

	public function setSmtpPassword($smtpPassword) {
		$this->smtpPassword = $smtpPassword;
	}

	public function setSmtpPort($smtpPort) {
		$this->smtpPort = $smtpPort;
	}

	public function setIsSecure($isSecure) {
		$this->isSecure = $isSecure;
	}
	public function getMailFrom() {
		return $this->mailFrom;
	}

	public function getMailFromEmail() {
		return $this->mailFromEmail;
	}

	public function getMailSubject() {
		return $this->mailSubject;
	}

	public function getMailBody() {
		return $this->mailBody;
	}

	public function getReplayMail() {
		return $this->replayMail;
	}

	

	public function setMailFrom($mailFrom) {
		$this->mailFrom = $mailFrom;
	}

	public function setMailFromEmail($mailFromEmail) {
		$this->mailFromEmail = $mailFromEmail;
	}

	public function setMailSubject($mailSubject) {
		$this->mailSubject = $mailSubject;
	}

	public function setMailBody($mailBody) {
		$this->mailBody = $mailBody;
	}

	public function setReplayMail($replayMail) {
		$this->replayMail = $replayMail;
	}
	public function getMailType() {
		return $this->mailType;
	}

	public function setMailType($mailType) {
		$this->mailType = $mailType;
	}

	
	

	
	
	

}

?>