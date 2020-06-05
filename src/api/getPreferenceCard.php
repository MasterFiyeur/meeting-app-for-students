<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

header('Access-Control-Max-Age: 1000');

header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');



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
$ObjIdKey->issetGET=false;
 if(isset($_GET['id'])){
    $dossierImage = "../imageProfil/"; 
    $id = $_GET['id'];
    $ObjIdKey->issetGET=true;
    $ObjIdKey->tabImage= array(
        file_exists($dossierImage.$id."-1.png"),
        file_exists($dossierImage.$id."-2.png"),
        file_exists($dossierImage.$id."-3.png"),
        file_exists($dossierImage.$id."-4.png"),
        file_exists($dossierImage.$id."-5.png")
    );
}

echo (json_encode($ObjIdKey));


?>