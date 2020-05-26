<?php
include "../connexionBDD.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
      
//Demande de récupération du prenom
try {
    $cnx = connexionPDO();
    $req = $cnx -> prepare('select id from user where mail = ? AND password = ?');
    $req -> execute(array($_GET["mail"], $_GET["password"]));
    if ($ligne = $req -> fetch()) {
        if ($ligne != NULL) {
            print($ligne['id']);
        } else {
            print(NULL);
        }
    }
    $req -> closeCursor();
} catch (PDOException $e) {
    print "Erreur !".$e -> getMessage();
    die();
}
?>