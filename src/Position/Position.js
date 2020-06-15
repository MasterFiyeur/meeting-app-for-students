//https://api-adresse.data.gouv.fr/search/?q=Cergy&type=municipality&autocomplete=1
import React, { Component } from 'react';
//import {URL_API} from '../App';
//import EditProfilePhoto from '../PhotosProfil/EditProfilePhoto';

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
        mdp:"",
        couleur:"red",
        compteur:0
      };
    }

    /**
     * Mettre de lier l'écriture dans les champs aux valeurs correspondantes 
     * dans l'état du composant
     * @param {event} event Ajout/Suppression d'un caractère dans un champs 
     */
    inputChange(event) {
      event.preventDefault();
      /* Mise à jour des valeurs des inputs */
      const { name, value } = event.target;
      this.setState({
        [name]: value
      })
      if(event.target.value.length>5){
        this.verifStrength(event.target.value);
      }else{
        this.setState({
          compteur:1
        });
      }
    }

    verifStrength(mdp){
      const LETTRE_MIN="abcdefghijklmnopqrstuvwxyz";
      const LETTRE_MAJ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const CHIFFRE="0123456789";
      let maj=0,min=0,chi=0,spe=0;
      for(let i=0 ; i<mdp.length ; i++){
        if(LETTRE_MIN.indexOf(mdp[i]) !== -1){
          min=1;
        }else if(LETTRE_MAJ.indexOf(mdp[i]) !== -1){
          maj=1;
        }else if(CHIFFRE.indexOf(mdp[i]) !== -1){
          chi=1;
        }else{
          spe=1;
        }
      }
      this.setState({
        compteur:maj+min+chi+spe
      });
    }



    render(){
      return(
        <div style={{marginTop:"20px"}}>
          <h2>Page de Test #Théo hehe</h2>
          <form>
          <div>
              <div style={{display:"flex"}}>
                <div style={{width:"40px",height:"10px",borderTopLeftRadius:"30px",borderBottomLeftRadius:"30px",background:"linear-gradient(to right,#FF3737, #FFAD37)"}}></div>
                <div style={{width:"40px",height:"10px",background:(this.state.compteur>1?"linear-gradient(to right,#FFAD37, #54FF48)":"#C7C3BD")}}></div>
                <div style={{width:"40px",height:"10px",background:(this.state.compteur>2?"linear-gradient(to right,#54FF48,#48BCFF)":"#C7C3BD")}}></div>
                <div style={{width:"40px",height:"10px",background:(this.state.compteur>3?"linear-gradient(to right,#48BCFF,#4872FF)":"#C7C3BD"),borderTopRightRadius:"30px",borderBottomRightRadius:"30px"}}></div>
              </div>
              <input className="input"
                name="mdp"
                type="text"
                placeholder="Ton mdp"
                value={this.state.mdp}
                onChange={event => this.inputChange(event)} 
              />
            </div>
          </form>
        </div>
      );
    }
}

export default Position;