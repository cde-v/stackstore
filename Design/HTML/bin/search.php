<?php	
	if(empty($_POST['searchbar']))
	{
		return false;
	}
	
	$searchbar = $_POST['searchbar'];
	
	$to = 'receiver@yoursite.com'; // Email submissions are sent to this email

	// Create email	
	$email_subject = "Message from Stackstore.";
	$email_body = "You have received a new message. \n\n".
				  "Searchbar: $searchbar \n";
	$headers = "From: contact@yoursite.com\n";
	$headers .= "Reply-To: DoNotReply@yoursite.com";	
	
	mail($to,$email_subject,$email_body,$headers); // Post message
	return true;			
?>