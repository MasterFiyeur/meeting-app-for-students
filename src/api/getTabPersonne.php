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
$arrayLikes;
$arrayDislikes;
$ObjIdKey->connected=isLogged($id,$key);
if($ObjIdKey->connected){
    $cnx = connexionPDO();
    $req = $cnx -> prepare('SELECT likes,dislikes FROM user WHERE id=?');
    $req -> execute(array($id));
    if ($ligne = $req -> fetch()) {
        if ($ligne != NULL) {
            $arrayLikes = explode(";",$ligne['likes']);
            $arrayDislikes = explode(";",$ligne['dislikes']);
        }
    }
    $req -> closeCursor();

    $cnx = connexionPDO();
    $req = $cnx -> prepare('SELECT * FROM user WHERE id!= ? ORDER BY user.id ASC');
    $req -> execute(array($id));
    $ObjIdKey->tab= array();
    foreach ($req as $row) {
        if(!(in_array($row["id"],$arrayLikes) || in_array($row["id"],$arrayDislikes))){
            $ObjIdKey->tab[] = (object) ['id' => $row["id"]];
        }
    }
    //Ici faut recuperer le tableau et appliquer les filtres
    //Peut etre ce serait intelligent de récuperer 
    $req -> closeCursor();
    echo (json_encode($ObjIdKey));
}else{
    print("Couple (id,key) factice.");
}

?>