<?php 

/* Header pour les permission */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

/**
 * - Fonction de connexion à la bdd projetsiterencontre locale
 * - Encodage spécifié : utf8
 */
function connexionPDO(){
    $login = "root";
    $mdp = "";
    $bd = "projetsiterencontre";
    $serveur = "localhost";
    try{
        $conn = new PDO("mysql:host=$serveur;dbname=$bd;charset=utf8", $login, $mdp);
        return $conn;
    }catch(PDOException $e){
        print "Erreur de connexion PDO";
        die();
    }
}
?>