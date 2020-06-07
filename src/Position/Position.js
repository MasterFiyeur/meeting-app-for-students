//https://api-adresse.data.gouv.fr/search/?q=Cergy&type=municipality&autocomplete=1
import React, { Component } from 'react';
import {URL_API} from '../App';
import EditProfilePhoto from '../PhotosProfil/EditProfilePhoto';

/**
 * Composant de test (Théo)
 * J'utilise ce composant à l'adresse /position afin d'effectuer 
 * des tests pour savoir si il est cohérent de le rajouter
 * lors de l'inscription afin de recup les coordonnées GPS 
 * pour pouvoir calculer la distance entre deux personnes
 * ------------------------------------------------------
 * Si tu veux tester un truc rapido, utilise cette page pour ne 
 * pas tout casser ;)
 */

 //Faire affichage des 5 images et pouvoir les supprimer

class Position extends Component{
    constructor(props) {
        super(props);

        this.state = {
          StudentCard: null,
          userProfilePic: '',
          editor: null,
          scaleValue: 1,
          imagefile:null
        };
      }

    render(){
      return(
        <div style={{marginTop:"20px"}}>
          <h2>Page de Test #Théo hehe</h2>
          <EditProfilePhoto />
        </div>
      );
    }
}

export default Position;