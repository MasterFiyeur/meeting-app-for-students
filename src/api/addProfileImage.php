<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

header('Access-Control-Max-Age: 1000');

header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');



include "connexionBDD.php";



/**

 * - Upload de la carte étudiante si elle a été envoyée

 * - Conditions : 2Mo et au format jpg/jpeg/png

 * - Entrée :

 *  POST : 

 *      email => adresse mail de l'utilisateur

 *  FILES :

 *      file => fichier envoyé

 * - Sortie : 0, 1, 2, 3, error

 *  0 => Aucune image n'a été envoyée

 *  1 => Image envoyé/téléchargé avec succès et ajout de l'extension à la BDD

 *  2 => La taille du fichier dépasse 2Mo

 *  3 => L'extension du fichier n'est pas dans ceux acceptés

 *  error => Problème durant la connexion à la BDD

 *           ou lors de la requête SQL

 *  Erreur... => Problème lors du téléchargement de l'image dans le dossier

 *               (peut être fichier ou mail inexistant)

 */



 /* Déclaration CONSTANTES */

 define('DOSSIER', '../imageProfil/'); //Dossier dans lequel importer les images



/* Upload de l'image */

if(isset($_FILES['file'])){

    $allowed_ext = array("jpg","png","jpeg","JPG","PNG","JPEG");//Extension d'image acceptée

    $ext = strtolower(substr(basename($_FILES['file']['name']), strrpos(basename($_FILES['file']['name']),".",-1)+1)); //Extension du fichier

    if(in_array($ext,$allowed_ext)){ //Extension comprise dans celles acceptée

        if($_FILES['file']['size']<4000000 && $_FILES['file']['tmp_name']!=NULL){

            $name=/*$id.*/"test.".$ext; //Nouveau nom du fichier

            if(move_uploaded_file($_FILES['file']['tmp_name'], DOSSIER . $name)) //Si la fonction renvoie TRUE, c'est que ça a fonctionné...

            {
                print '1';
            }

            else //Sinon (la fonction renvoie FALSE).

            {

                print 'Erreur lors de l\'upload de la carte';

            }

        }else{

            print '2';

        }

    }else{

        print '3';

    }

}else{

    print '0';

}



?>