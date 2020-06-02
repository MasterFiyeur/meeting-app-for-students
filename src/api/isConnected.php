<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

header('Access-Control-Max-Age: 1000');

header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, logginid, logginkey');



include "connexionBDD.php";

      

/**

 * - Vérification de la correspondance entre id et key

 * - Entrée :

 *  GET : 

 *      id => Valeur du cookie ID

 *      key => Valeur du cookie KEY

 * - Sortie : id, NULL, error

 *  id => nombre correspondant à l'identifiant de l'utilisateur

 *  NULL => Aucun id ne correspond au couple (mail/mdp)

 *  error => Problème durant la connexion à la BDD

 *           ou lors de la requête SQL

 */
$id = $_SERVER['HTTP_LOGGINID'];
$key = $_SERVER['HTTP_LOGGINKEY'];
$ObjIdKey->connect=isLogged($id,$key);
echo (json_encode($ObjIdKey));

?>