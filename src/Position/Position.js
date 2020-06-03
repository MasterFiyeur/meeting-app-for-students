//https://api-adresse.data.gouv.fr/search/?q=Cergy&type=municipality&autocomplete=1
import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert';

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

class Position extends Component{
    constructor(props) {
        super(props);

        this.state = {
          alertShow: false, alertMessage : "", alertVariant:"",//Affichage, message et type de l'alerte
          ville: "", //Input avec la ville
          name: "", context:null, lat: null, long: null //Res de l'API, ville et coordonnées GPS
          
        };
      }
     
      sendLogin(event) {
        event.preventDefault();

      }

      inputChangeVille(event){
        event.preventDefault();
        this.setState({
          ville: event.target.value
        })
        //il faut que rien soit envoyé si le champ est vide
        console.log("Value = "+event.target.value);
        if(event.target.value!==""){
          const axios = require('axios').default;
          const url = "https://api-adresse.data.gouv.fr/search/?q="+event.target.value+"&type=municipality&autocomplete=1"
          axios.get(url)
          .then(res => {
            console.log(res);
            if(res.data!==null){
              if(res.data.features[0]!=null){
                this.setState({
                name: res.data.features[0].properties.city,
                lat: res.data.features[0].geometry.coordinates[1],
                long: res.data.features[0].geometry.coordinates[0],
                context: res.data.features[0].properties.context
                })
              }
            }
          })
          .catch(err => {
            console.log(err);
            //Affichage en jaune qu'il y a une erreur dans la requête
            this.setState({alertShow:true,alertMessage:"Une erreur s'est produite.",alertVariant:"warning"});
          });
        }
      }

    render(){
      return(
        <div>
          <Alert
          variant={this.state.alertVariant} 
          id="AlertIncorrect" 
          show={this.state.alertShow} 
          onClose={() => this.setState({alertShow:false})}
          dismissible>
            {this.state.alertMessage}
          </Alert>
          <h2>Page de Test #Théo hehe</h2>
          <img 
          src="https://projetwebeisti.yj.fr/imageCarteEtudiante/44.jpg"
          height="300px"
          width="300px"
          alt="Carte étudiante de l'id 44"
          >

          </img>
          {/* Formulaire de position */}
          <form onSubmit={event => this.sendLogin(event)}>
            <input className="input"
              id="ville"
              name="ville"
              type="text"
              placeholder="Ta ville"
              value={this.state.ville}
              onChange={event => this.inputChangeVille(event)} 
            /><label htmlFor="ville">
              {this.state.name===""?
              "":this.state.name+" - "+this.state.context}
              </label>
            {/* Peut-être faire une liste déroulante si l'api met pas la ville en 1er */}
            <br />
            <button className="btn btn-danger" type="submit">Ne fais rien</button>
          </form>
        </div>
      );
    }
}

export default Position;