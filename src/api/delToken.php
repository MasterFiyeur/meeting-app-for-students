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
if(isLogged($id,$key)){
    $cnx = connexionPDO();
    $req = $cnx -> prepare('UPDATE user SET connecttoken = "" WHERE id = ? AND connecttoken = ?');
    $req -> execute(array($id,$key));
    $req -> closeCursor();
    print("Token supprimé !");
}else{
    print("Couple (id,key) factice.");
}

?>