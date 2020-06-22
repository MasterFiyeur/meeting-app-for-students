<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, logginid, logginkey');

include "connexionBDD.php";

/**
 * - Met à jour le profil de l'utilisateur
 * - Entrée :
 *  Headers : 
 *      id => Valeur du cookie ID
 *      key => Valeur du cookie KEY
 *  POST :
 *      Toutes les information relatives à un profil
 * - Sortie : Object :
 *      connect => Vrai ou faux selon l'authenticité du couple (id,token)
 *      status => état de l'opération
 */

$id = $_SERVER['HTTP_LOGGINID'];
$key = $_SERVER['HTTP_LOGGINKEY'];
$ObjIdKey->connect=isLogged($id,$key);
if($ObjIdKey->connect && isset($_POST)){
    
    $cnx = connexionPDO();
	$id = $_POST["id"];
	$id2 = $_POST["id2"];
    $tableName = "d".$id."_".$id2;
    $req = $cnx -> prepare("SELECT * FROM `".$tableName."` WHERE num=?");
    $req -> execute(array($_POST["num"]));
    if ($ligne = $req -> fetch()) {
        if ($ligne != NULL) {
            $ObjIdKey->idEnvoyeur=$ligne["id"];
            $ObjIdKey->message=$ligne["message"];
        } else {
            $ObjIdKey->idEnvoyeur="echec";
            $ObjIdKey->message="fail";
        }
    }
    $req -> closeCursor();
    $req = $cnx -> prepare("INSERT INTO signalement(`message`,`idEnvoyeur`) 
    VALUES (?,?)");
    $req -> execute(array($ObjIdKey->message,$ObjIdKey->idEnvoyeur));
    $req -> closeCursor();
    $ObjIdKey->status="success";
}else{
    $ObjIdKey->status="failure";
}
echo (json_encode($ObjIdKey));

?>