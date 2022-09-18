<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];
$date = $_POST['date'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->isSMTP();                                     
$mail->Host = 'smtp.yandex.ru';  
$mail->SMTPAuth = true;                              
$mail->Username = 'rakoth-gri@yandex.ru';                 
$mail->Password = '5agu7by5';                           
$mail->SMTPSecure = 'ssl';                            
$mail->Port = 465;                                   
 
$mail->setFrom('rakoth-gri@yandex.ru', 'school Project');   // От кого письмо 
$mail->addAddress('galievi.f@yandex.ru'); 
$mail->addAttachment('../img/gallery/1.png', 'school Project');    
$mail->isHTML(true);      

$mail->Subject = 'Письмо тестовое';
$mail->Body = "\n
	Поступило тестовое письмо \n
	Имя: $name \n
	Номер телефона: $phone \n
	E-mail:  $email \n
	Дата: $date  \n
	Текст сообщения: $message "; 

	if(!$mail->send()) return false;
	else return true;
	
	
?>