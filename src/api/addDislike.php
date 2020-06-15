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
    $req = $cnx -> prepare('SELECT dislikes FROM user WHERE id = ?');
    $req -> execute(array($id));
    if ($ligne = $req -> fetch()) {
        if ($ligne != NULL) {
            $ObjIdKey->dislikes=$ligne["dislikes"];
        } else {
            $ObjIdKey->dislikes="echec";
        }
    }
    $req -> closeCursor();
    if($ObjIdKey->dislikes!=="echec" && $_GET["id"]){
        $ObjIdKey->dislikes .=$_GET["id"].";";
        $cnx = connexionPDO();
        $req = $cnx -> prepare('UPDATE user set dislikes=? WHERE id = ?');
        $req -> execute(array($ObjIdKey->dislikes,$id));
        $req -> closeCursor();
    }
    echo (json_encode($ObjIdKey));
}else{
    print("Couple (id,key) factice.");
}

?>