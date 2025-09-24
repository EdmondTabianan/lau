<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags($_POST["name"]);
    $email = strip_tags($_POST["email"]);
    $message = strip_tags($_POST["message"]);

    $entry = "Name: $name\nEmail: $email\nMessage: $message\n-----\n";

    file_put_contents("message.txt", $entry, FILE_APPEND);

    echo "Message saved! Thank you!";
}
?>
