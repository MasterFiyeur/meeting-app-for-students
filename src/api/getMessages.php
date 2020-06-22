<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

header('Access-Control-Max-Age: 1000');

header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');


include "connexionBDD.php";



try {

	$cnx = connexionPDO();
	$id = $_POST["id"];
	$id2 = $_POST["id2"];
	$match = "d".$id."_".$id2;
	$sql = "SELECT * FROM `".$match."`";
    $messages = $cnx-> prepare($sql);
	$messages -> execute();
	$ObjIdKey->message="";
	$idTemp = array();
    foreach ($messages as $row) {
		$ObjIdKey->message .= $row["id"] . "-" . $row["message"].";";
		$idTemp[] = $row["num"];
	}
	$ObjIdKey->idTab=$idTemp;
	$messages -> closeCursor();
    echo (json_encode($ObjIdKey));

}
catch (PDOException $e){
	print "Erreur !".$e -> getMessage();
    die();
}



?>