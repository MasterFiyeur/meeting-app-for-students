<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

header('Access-Control-Max-Age: 1000');

header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, logginid, logginkey');


include "connexionBDD.php";



try {

	$cnx = connexionPDO();
	$id = $_POST["id"];
    $id2 = $_POST["id2"];
	$sql = "DELETE FROM listeMatch WHERE id = ? AND id2 = ?";
    $delete = $cnx-> prepare($sql);
    $delete -> execute(array($id,$id2));
    
	$delete -> closeCursor();
}
catch (PDOException $e){
	print "Erreur !".$e -> getMessage();
    die();
}



?>