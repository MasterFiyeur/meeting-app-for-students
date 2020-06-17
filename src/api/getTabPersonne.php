<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, logginid, logginkey');


include "connexionBDD.php";

/**
 * Calcule l'age
 */
function age($date) { 
    $age = date('Y') - $date; 
   if (date('md') < date('md', strtotime($date))) { 
       return $age - 1; 
   } 
   return $age; 
} 

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
$mySearch=array("Hommes");
$myTrancheMin="17";
$myTrancheMax="37";
$ObjIdKey->connected=isLogged($id,$key);
if($ObjIdKey->connected){
    $cnx = connexionPDO();
    $req = $cnx -> prepare('SELECT jeCherche,trancheAge FROM preference WHERE prefId=?');
    $req -> execute(array($id));
    if ($ligne = $req -> fetch()) {
        if ($ligne != NULL) {
            if($ligne['jeCherche']==="Hommes"){
                $mySearch=array("Homme"); 
            }elseif($ligne['jeCherche']==="Femmes"){
                $mySearch=array("Femme");
            }else{
                $mySearch=array("Femme","Homme","Vivant");
            }
            $myTrancheMin=explode("-",$ligne['trancheAge'])[0];
            $myTrancheMax=explode("-",$ligne['trancheAge'])[1];
        }
    }
    $req -> closeCursor();

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
            $ObjIdKey->tab[] = $row["id"];
        }
    }
    $req -> closeCursor();
    
    //Ici faut recuperer le tableau et appliquer les filtres
    //Peut etre ce serait intelligent de récuperer

    //Traitement de l'age
    $arrTemp=array();
    foreach ($ObjIdKey->tab as &$valueId1) {
        $cnx = connexionPDO();
        $req = $cnx -> prepare('SELECT birthDate FROM user WHERE id= ?');
        $req -> execute(array($valueId1));
        if ($ligne = $req -> fetch()) {
            if ($ligne != NULL) {
                $sonAge=age($ligne['birthDate']);
            }
        }
        if($sonAge>=$myTrancheMin && $sonAge<=$myTrancheMax){
            $arrTemp[] = $valueId1;
        }
        $req -> closeCursor();
    }
    $ObjIdKey->tab=$arrTemp;
    unset($arrTemp);

    //Traitement du sexe recherché
    $arrTemp=array();
    foreach ($ObjIdKey->tab as &$valueId1) {
        $cnx = connexionPDO();
        $req = $cnx -> prepare('SELECT jeSuis FROM preference WHERE prefId= ?');
        $req -> execute(array($valueId1));
        if ($ligne = $req -> fetch()) {
            if ($ligne != NULL) {
                $ilEst=$ligne['jeSuis'];
            }
        }
        if(in_array($ilEst,$mySearch)){
            $arrTemp[] = $valueId1;
        }
        $req -> closeCursor();
    }
    $ObjIdKey->tab=$arrTemp;
    unset($arrTemp);





    echo (json_encode($ObjIdKey));
}else{
    print("Couple (id,key) factice.");
}

?>