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
 *  GET :
 *      account => Permet de connaître les informations à renvoyer
 * - Sortie : Object :
 *      connect => Vrai ou faux selon l'authenticité du couple (id,token)
 *      tab => Tableau des informations demandées
 */

$id = $_SERVER['HTTP_LOGGINID'];
$key = $_SERVER['HTTP_LOGGINKEY'];
$ObjIdKey->connected=isLogged($id,$key);
if($ObjIdKey->connected){
    $cnx = connexionPDO();
    $req = $cnx -> prepare('SELECT * FROM signalement ORDER BY signalement.num ASC');
    $req -> execute();
    $ObjIdKey->tab= array();
    foreach ($req as $row) {
        $ObjIdKey->tab[] = (object) ['id' => $row["idEnvoyeur"],'message' => $row["message"]];
    }
    $req -> closeCursor();
    echo (json_encode($ObjIdKey));
}else{
    print("Couple (id,key) factice.");
}

?>