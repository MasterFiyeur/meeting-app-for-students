<?php
include "connexionBDD.php";

/* Upload de l'image */
if(isset($_FILES['file'])){

    $cnx = connexionPDO();
    $req = $cnx -> prepare('SELECT id FROM user WHERE mail = ?');
    $req -> execute((array($_POST["email"])));
    if ($ligne = $req -> fetch()) {
        if ($ligne != NULL) {
            $id= $ligne['id'];
        } else {
            $id = NULL;
        }
    }
    $req -> closeCursor();
    $dossier = '../imageCarteEtudiante/';
    $allowed_ext = array("jpg","png","jpeg","JPG","PNG","JPEG");//Extension d'image acceptée
    $ext = substr(basename($_FILES['file']['name']), strrpos(basename($_FILES['file']['name']),".",-1)+1);
    if(in_array($ext,$allowed_ext)){ //Extension comprise dans celles acceptée
        if($_FILES['file']['size']<4000000 && $_FILES['file']['tmp_name']!=NULL){
            //Taille inférieur à 2Mo je sais pas pk on peut pas faire +
            //Quand c'est + on a size =0 et tmp_name chelou
            $name=$id.".".$ext;

            //print $_FILES['file']['tmp_name'].' et '.$name;

            if(move_uploaded_file($_FILES['file']['tmp_name'], $dossier . $name)) //Si la fonction renvoie TRUE, c'est que ça a fonctionné...
            {
                $cnx = connexionPDO();
                $req = $cnx -> prepare('UPDATE user SET carte = ? WHERE mail = ?;');
                $req -> execute((array($ext,$_POST["email"])));
                $req -> closeCursor();
                print '1';
            }
            else //Sinon (la fonction renvoie FALSE).
            {
                print 'Erreur lors de l\'upload de la carte';
            }
        }else{
            //Taille trop grande
            print '2';
        }
    }else{
        //Extension non acceptée
        print '3';
    }
}else{
    print '0';
}

?>