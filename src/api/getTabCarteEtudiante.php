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
    $cnx = connexionPDO();
    if(isset($_GET["account"])){
        $req = $cnx -> prepare('SELECT * FROM user ORDER BY user.id ASC');
    }else{
        $req = $cnx -> prepare('SELECT * FROM user WHERE carte!=1 AND carte!="0" ORDER BY user.id ASC');
    }
    $req -> execute();
    $ObjIdKey->tab= array();
    foreach ($req as $row) {
        $ObjIdKey->tab[] = (object) ['Prenom' => $row["prenom"],'Nom' => $row["nom"],'Id' => $row["id"]];
    }
    $req -> closeCursor();
    echo (json_encode($ObjIdKey));
}else{
    print("Couple (id,key) factice.");
}

?>