<?php
include "connexionBDD.php";

/** Description du retour
 * 0 -> L'adresse mail existe déjà
 * Compte crée pour les retours suivants
 * 1 -> Upload de l'image effectué avec succès !
 * 2 -> Echec de l\'upload de l'image !
 * 3 -> Aucune image n'a été séléctionnée !
 */

/* Vérification unicité de l'adresse mail */
try {
    $adressNotFound = false;
    $cnx = connexionPDO();
    $req = $cnx -> prepare('select id from user where mail = ?');
    $req -> execute(array($_POST["email"]));
    if ($ligne = $req -> fetch()) {
        if ($ligne != NULL) {
            print '0';
            die();
        }
    }
    //Pas d'adresse mail similaire trouvée
    $req -> closeCursor();
} catch (PDOException $e) {
    print "Erreur !".$e -> getMessage();
    die();
}

/* Création du compte */
    try {
    //Requête pour ajouter la ligne
    $cnx = connexionPDO();
    $req = $cnx -> prepare('INSERT INTO user(`mail`,`password`,`nom`,`prenom`,`birthDate`,`ville`) 
    VALUES (?,?,?,?,?,?)');
    $req -> execute(array($_POST["email"],$_POST["password"],$_POST["nom"],$_POST["prenom"],$_POST["dateBirth"],$_POST["ville"]));
    $req -> closeCursor();
    print '1';
} catch (PDOException $e) {
    print "Erreur !".$e -> getMessage();
    die();
}

?>