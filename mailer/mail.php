<?php 

function clear_data($val)
{
	$val = trim($val);
	$val = stripslashes($val);
	$val = htmlspecialchars($val);
	return $val;
}

function validate()
{
	$formValuesArray = [];
	foreach ($_POST as $key => $value) :
		if (!trim($value)) die("Не все поля формы заполнены!");
		$formValuesArray[$key] = clear_data($value);
	endforeach;
	return $formValuesArray;
}

// получаем ассоциативный массив данных из формы, где ключи это имена полей формы!
$formValuesArray = validate();


// Формируем параметры для отправки: 
$to = "galievi.f@yandex.ru"; // кому

$subject = "Тестовое письмо"; // от кого

$headers = "From: {$formValuesArray['email']}\r\n";
$headers .= "Reply-To: {$formValuesArray['email']}\r\n";
$headers .= "Content-type: text/html;charset=utf-8\r\n"; // заголовки

$message = "Поступило тестовое письмо: <br>
	Имя: {$formValuesArray['name']} <br>
	Номер телефона: {$formValuesArray['phone']} <br>
	E-mail:  {$formValuesArray['email']} <br>
	Текст сообщения: {$formValuesArray['message']} "; // Сообщение


mail($to, $subject, $message, $headers);
	
	
?>