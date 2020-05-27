<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

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