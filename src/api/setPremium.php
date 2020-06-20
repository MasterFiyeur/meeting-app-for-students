<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, logginid, logginkey');

include "connexionBDD.php";

/**

 * - Promotion de l'utilisateur au grade de premium lorsqu'il a payé
 * - Entrée :
 *  Headers : 
 *      id => Valeur du cookie ID
 *      key => Valeur du cookie KEY
 *  POST :
 *      num => correspondrait au numéro de la carte bancaire
 *      pin => correspondrait au code à 3 chiffre au dos de la carte
 * - Sortie : Object :
 *      connect => Vrai ou faux selon l'authenticité du couple (id,token)
 *      Message => Message à renvoyer à l'utilisateur
 */

$id = $_SERVER['HTTP_LOGGINID'];
$key = $_SERVER['HTTP_LOGGINKEY'];
$ObjIdKey->connected=isLogged($id,$key);
if($ObjIdKey->connected){
    //Vérification de la correspondance du numéro/pin
    if(isset($_POST["pin"]) && isset($_POST["num"]) && $_POST["num"]==="30092000" && $_POST["pin"]==="Théo"){
        $cnx = connexionPDO();
        //Mise à joru du grade
        $req = $cnx -> prepare('UPDATE user SET grade="premium" WHERE id = ?');
        $req -> execute(array($id));
        $req -> closeCursor();
        $ObjIdKey->Message="Vous êtes désormais premium";
    }else{
        //Mauvais code
        $ObjIdKey->Message="Mauvaise combinaison numéro-PIN";
    }
    echo (json_encode($ObjIdKey));
}else{
    //Utilisateur non connecté
    $ObjIdKey->Message="Veuillez vous connecter";
    echo (json_encode($ObjIdKey));
}
?>