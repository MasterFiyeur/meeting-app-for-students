<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, logginid, logginkey');

include "connexionBDD.php";

/**

 * - Vérification de la correspondance entre id et key
 * - Entrée :
 *  Headers : 
 *      id => Valeur du cookie ID
 *      key => Valeur du cookie KEY
 * - Sortie : Object :
 *      connect => Vrai ou faux selon l'authenticité du couple (id,token)
 */

$id = $_SERVER['HTTP_LOGGINID'];
$key = $_SERVER['HTTP_LOGGINKEY'];
$ObjIdKey->connected=isLogged($id,$key);
if($ObjIdKey->connected){
    if(isset($_POST["pin"]) && isset($_POST["num"]) && $_POST["num"]==="30092000" && $_POST["pin"]==="Théo"){
        $cnx = connexionPDO();
        $req = $cnx -> prepare('UPDATE user SET grade="premium" WHERE id = ?');
        $req -> execute(array($id));
        $req -> closeCursor();
        $ObjIdKey->Message="Vous êtes désormais premium";
    }else{
        $ObjIdKey->Message="Mauvaise combinaison numéro-PIN";
    }
    echo (json_encode($ObjIdKey));
}else{
    $ObjIdKey->Message="Veuillez vous connecter";
    echo (json_encode($ObjIdKey));
}
?>