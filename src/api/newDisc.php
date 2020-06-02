<?php
include "connexionBDD.php";

try {
	$cnx = connexionPDO();
	$name = "d".$_POST["id1"]."_".$_POST["id2"];
	$req = $cnx -> prepare("CREATE TABLE `".$name."` (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	message VARCHAR(300) NOT NULL); ");
	$req -> execute();
    $req -> closeCursor();
    print '1';
}
catch (PDOException $e){
	print "Erreur !".$e -> getMessage();
    die();
}


?>