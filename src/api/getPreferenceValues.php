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
$ObjIdKey->connect=isLogged($id,$key);
if($ObjIdKey->connect){
    $cnx = connexionPDO();
    $req = $cnx -> prepare('SELECT jeSuis,ville,gps,jeCherche,butRencontre,trancheAge,bio,
    etude,taille,yeux,cheveux,sport,alcool,tabac,animaux,religion,astro
    FROM preference WHERE prefId = ?');
    $req -> execute(array($id));
    if ($ligne = $req -> fetch()) {
        if ($ligne != NULL) {
            $tabPreference->jeSuis=$ligne['jeSuis'];
            $tabPreference->ville=$ligne['ville'];
            $tabPreference->gps=$ligne['gps'];
            $tabPreference->jeCherche=$ligne['jeCherche'];
            $tabPreference->butRencontre=$ligne['butRencontre'];
            $tabPreference->trancheAge=$ligne['trancheAge'];
            $tabPreference->bio=$ligne['bio'];
            $tabPreference->etude=$ligne['etude'];
            $tabPreference->taille=$ligne['taille'];
            $tabPreference->yeux=$ligne['yeux'];
            $tabPreference->cheveux=$ligne['cheveux'];
            $tabPreference->sport=$ligne['sport'];
            $tabPreference->alcool=$ligne['alcool'];
            $tabPreference->tabac=$ligne['tabac'];
            $tabPreference->animaux=$ligne['animaux'];
            $tabPreference->religion=$ligne['religion'];
            $tabPreference->astro=$ligne['astro'];
            $ObjIdKey->tabPref=$tabPreference;
            $ObjIdKey->readPref=true;
        } else {
            $ObjIdKey->readPref=false;
        }
    }
    $req -> closeCursor();
}
echo (json_encode($ObjIdKey));

?>