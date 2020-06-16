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
if($ObjIdKey->connected && isset($_POST['id'])){
    if(isset($_POST['supprCompte'])){
        $cnx = connexionPDO();
        $req = $cnx -> prepare('SELECT carte FROM user WHERE id= ?');
        $req -> execute(array($_POST['id']));
        if ($ligne = $req -> fetch()) {
            if ($ligne != NULL && $ligne['carte']!="1" && $ligne['carte']!="0") {
                if(!(unlink("../imageCarteEtudiante/".$_POST["id"].".".$ligne["carte"]))){
                    $ObjIdKey->CarteSuppr="failure";
                }else{
                    $ObjIdKey->CarteSuppr="success";
                }
            }else{
                $ObjIdKey->CarteSuppr="no student card";
            }    
        }
        $req -> closeCursor();
        $dossierImage = "../imageProfil/"; 
        $id=$_POST["id"];
        if(file_exists($dossierImage.$id."-1.png")){
            if(!(unlink($dossierImage.$id."-1.png"))){
                $ObjIdKey->PhotoProfile[0]="Error photo 1";
            }else{
                $ObjIdKey->PhotoProfile[0]="Photo 1 suppressed";
            }
        }else{
            $ObjIdKey->PhotoProfile[0]="Photo 1 doesn't exist";
        }
        if(file_exists($dossierImage.$id."-2.png")){
            if(!(unlink($dossierImage.$id."-2.png"))){
                $ObjIdKey->PhotoProfile[1]="Error photo 2";
            }else{
                $ObjIdKey->PhotoProfile[1]="Photo 2 suppressed";
            }
        }else{
            $ObjIdKey->PhotoProfile[1]="Photo 2 doesn't exist";
        }
        if(file_exists($dossierImage.$id."-3.png")){
            if(!(unlink($dossierImage.$id."-3.png"))){
                $ObjIdKey->PhotoProfile[2]="Error photo 3";
            }else{
                $ObjIdKey->PhotoProfile[2]="Photo 3 suppressed";
            }
        }else{
            $ObjIdKey->PhotoProfile[2]="Photo 3 doesn't exist";
        }
        if(file_exists($dossierImage.$id."-4.png")){
            if(!(unlink($dossierImage.$id."-4.png"))){
                $ObjIdKey->PhotoProfile[3]="Error photo 4";
            }else{
                $ObjIdKey->PhotoProfile[3]="Photo 4 suppressed";
            }
        }else{
            $ObjIdKey->PhotoProfile[3]="Photo 4 doesn't exist";
        }
        if(file_exists($dossierImage.$id."-5.png")){
            if(!(unlink($dossierImage.$id."-5.png"))){
                $ObjIdKey->PhotoProfile[4]="Error photo 5";
            }else{
                $ObjIdKey->PhotoProfile[4]="Photo 5 suppressed";
            }
        }else{
            $ObjIdKey->PhotoProfile[4]="Photo 5 doesn't exist";
        }
        $cnx = connexionPDO();
        $req = $cnx -> prepare('DELETE FROM user WHERE user.id = ?;DELETE FROM preference WHERE preference.prefId = ?');
        $req -> execute(array($_POST['id'],$_POST['id']));
        $ObjIdKey->supprCompte="success";
        $req -> closeCursor();
    }elseif (isset($_POST["operation"]) && $_POST["operation"]==="certif") {
        $cnx = connexionPDO();
        $req = $cnx -> prepare('SELECT carte FROM user WHERE user.id = ?');
        $req -> execute(array($_POST['id']));
        if ($ligne = $req -> fetch()) {
            if ($ligne != NULL && $ligne['carte']!="1" && $ligne['carte']!="0") {
                if(!(unlink("../imageCarteEtudiante/".$_POST["id"].".".$ligne["carte"]))){
                    $ObjIdKey->CarteSuppr="failure";
                }else{
                    $ObjIdKey->CarteSuppr="success";
                }
            }else{
                $ObjIdKey->CarteSuppr="no student card";
            }    
        }
        $req -> closeCursor();
        $cnx = connexionPDO();
        $req = $cnx -> prepare('UPDATE user SET carte="1" WHERE id = ?');
        $req -> execute(array($_POST['id']));
        $req -> closeCursor();
    }elseif(isset($_POST["rank"])){
        if($_POST["rank"]==="promote"){//On le met premium
            $cnx = connexionPDO();
            $req = $cnx -> prepare('UPDATE user SET grade="premium" WHERE id = ?');
            $req -> execute(array($_POST['id']));
            $req -> closeCursor();
            $ObjIdKey->newGrade="premium";
        }else{//On le met nouveau
            $cnx = connexionPDO();
            $req = $cnx -> prepare('UPDATE user SET grade="nouveau" WHERE id = ?');
            $req -> execute(array($_POST['id']));
            $req -> closeCursor();
            $ObjIdKey->newGrade="nouveau";
        }
    }elseif(isset($_POST["action"]) && $_POST["action"]==="resetLike"){
        $cnx = connexionPDO();
        $req = $cnx -> prepare('UPDATE user SET actuLike="20200615" WHERE id = ?');
        $req -> execute(array($_POST['id']));
        $req -> closeCursor();
    }//elseif(){}
    echo (json_encode($ObjIdKey));
}else{
    print("Couple (id,key) factice.");
}

?>