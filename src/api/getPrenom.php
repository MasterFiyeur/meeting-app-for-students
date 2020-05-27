<?php
include "connexionBDD.php";
      
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