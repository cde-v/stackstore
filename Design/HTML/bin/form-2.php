<?php	
	if(empty($_POST['email']) || empty($_POST['name']) || empty($_POST['name']))
	{
		return false;
	}
	
	$email = $_POST['email'];
	$name = $_POST['name'];
	$name = $_POST['name'];
	
	$to = 'receiver@yoursite.com'; // Email submissions are sent to this email

	// Create email	
	$email_subject = "Message from Stackstore.";
	$email_body = "You have received a new message. \n\n".
				  "Email: $email \nName: $name \nName: $name \n";
	$headers = "From: contact@yoursite.com\n";
	$headers .= "Reply-To: $email";	
	
	mail($to,$email_subject,$email_body,$headers); // Post message
	return true;			
?>