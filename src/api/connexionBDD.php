<?php 



/* Header pour les permission */

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

header('Access-Control-Max-Age: 1000');

header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, logginid, logginkey');



/**

 * - Fonction de connexion à la bdd projetsiterencontre locale

 * - Encodage spécifié : utf8

 */

function connexionPDO(){

    $login = "projavrp_root";

    $mdp = "Les 4 BG !$";

    $bd = "projavrp_projetsiterencontre";

    $serveur = "localhost";

    try{

        $conn = new PDO("mysql:host=$serveur;dbname=$bd;charset=utf8", $login, $mdp);

        return $conn;

    }catch(PDOException $e){

        print "Erreur de connexion PDO";

        die();

    }

}
function str_rand(){
    $res = "";
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    $charArray = str_split($chars);
    for($i = 0; $i < 50; $i++){
        $randChar = array_rand($charArray);
        $res .= $charArray[$randChar];
    }
    return $res;
}

function isLogged($id, $key){
    $logged = false;
    $cnx = connexionPDO();
    $req = $cnx -> prepare('SELECT connecttoken FROM user WHERE id = ?');
    $req -> execute(array($id));
    if ($ligne = $req -> fetch()) {
        if ($ligne != NULL) {
            if($ligne['connecttoken']===$key){
                $logged = true;
            }
        }
    }
    return $logged;
}


?>