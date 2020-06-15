<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

header('Access-Control-Max-Age: 1000');

header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, logginid, logginkey');


$cnx = connexionPDO();
	$id = $_SERVER['HTTP_LOGGINID'];
	$id2 = $_POST["id2"];
	$sql = "SELECT * FROM listeMatch";
    $messages = $cnx-> prepare($sql);
    $messages -> execute();
    foreach ($messages as $row) {
        	print $row["id"] . "-" . $row["message"].";";
    }
	$messages -> closeCursor();
}
catch (PDOException $e){
	print "Erreur !".$e -> getMessage();
    die();




?>