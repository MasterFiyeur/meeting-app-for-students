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
$ObjIdKey->issetGetId=false;
$ObjIdKey->issetGetInfo=false;
$ObjIdKey->issetGetmyId=false;
 if(isset($_GET['id'])){
    $dossierImage = "../imageProfil/"; 
    $id = $_GET['id'];
    $ObjIdKey->issetGetId=true;
    $ObjIdKey->tabImage= array(
        file_exists($dossierImage.$id."-1.png"),
        file_exists($dossierImage.$id."-2.png"),
        file_exists($dossierImage.$id."-3.png"),
        file_exists($dossierImage.$id."-4.png"),
        file_exists($dossierImage.$id."-5.png")
    );
    if(isset($_GET['info']) && $_GET['info']=="yes"){
        $ObjIdKey->issetGetInfo=true;
        $cnx = connexionPDO();
        $req = $cnx -> prepare('SELECT prenom,birthDate,gps,bio,etude,taille,yeux,cheveux,sport,alcool,tabac,animaux,religion,astro FROM user, preference WHERE id = ? AND prefId = ?');
        $req -> execute(array($_GET['id'],$_GET['id']));
        if ($ligne = $req -> fetch()) {
            if ($ligne != NULL) {
                $ObjIdKey->tabPref= array(
                    $ligne['prenom'],
                    $ligne['birthDate'],
                    $ligne['gps'],
                    $ligne['bio'],
                    $ligne['etude'],
                    $ligne['taille'],
                    $ligne['yeux'],
                    $ligne['cheveux'],
                    $ligne['sport'],
                    $ligne['alcool'],
                    $ligne['tabac'],
                    $ligne['animaux'],
                    $ligne['religion'],
                    $ligne['astro']
                );
                $ObjIdKey->readPref=true;
            } else {
                $ObjIdKey->readPref=false;
            }
        }
        $req -> closeCursor();
    }
    if(isset($_GET['myId'])){
        $ObjIdKey->issetGetmyId=$_GET['myId'];
        $cnx = connexionPDO();
        $req = $cnx -> prepare('SELECT gps FROM preference WHERE prefId = ?');
        $req -> execute(array($_GET['myId']));
        if ($ligne = $req -> fetch()) {
            if ($ligne != NULL) {
                $ObjIdKey->myCoor=$ligne['gps'];
            }
        }
        $req -> closeCursor();
    }
    if(isset($_GET['certif'])){
        $ObjIdKey->issetCertif=$_GET['certif'];
        $cnx = connexionPDO();
        $req = $cnx -> prepare('SELECT carte FROM user WHERE id = ?');
        $req -> execute(array($id));
        if ($ligne = $req -> fetch()) {
            if ($ligne != NULL) {
                $ObjIdKey->certif=$ligne['carte'];
            }
        }
        $req -> closeCursor();
    }
}

echo (json_encode($ObjIdKey));


?>