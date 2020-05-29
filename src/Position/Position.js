//https://api-adresse.data.gouv.fr/search/?q=Cergy&type=municipality&autocomplete=1
import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert';

/**
 * Composant de test (Théo)
 * J'utilise ce composant à l'adresse /position afin d'effectuer 
 * des tests pour savoir si il est cohérent de le rajouter
 * lors de l'inscription afin de recup les coordonnées GPS 
 * pour pouvoir calculer la distance entre deux personnes
 */

class Position extends Component{
    constructor(props) {
        super(props);

        this.state = {
          alertShow: false, alertMessage : "", alertVariant:"",//Affichage, message et type de l'alerte
          ville: "", //Input avec la ville
          name: "", lat: null, long: null //Res de l'API, ville et coordonnées GPS
          
        };
      }
     
      sendLogin(event) {
        event.preventDefault();
        {/*const axios = require('axios').default;  //Requêtes HTTP

        const url = "https://api-adresse.data.gouv.fr/search/?q="+this.state.ville+"&type=municipality&autocomplete=1"
        axios.get(url)
        .then(res => {
          if(res.data>0){
            //Se connecter
            console.log("Mail et mdp bon ! Votre id est : ",res.data);
          }else{
            this.setState({
                password:res.data
            });
            for(let i=0;i<10;i++){
                if(res.data.features[i]!=null){
                    console.log(res.data.features[i]);
                }
            }
            //Affichage en rouge du message de mdp incorrect
            this.setState({alertShow:true,alertMessage:"Adresse mail ou mot de passe incorrect.",alertVariant:"danger"});
          }
        })
        .catch(err => {
          console.log(err);
          //Affichage en jaune qu'il y a une erreur dans la requête
          this.setState({alertShow:true,alertMessage:"Une erreur s'est produite.",alertVariant:"warning"});
        });*/}

      }

      inputChangeVille(event){
        event.preventDefault();
        this.setState({
          ville: event.target.value
        })
        const axios = require('axios').default;
        const url = "https://api-adresse.data.gouv.fr/search/?q="+event.target.value+"&type=municipality&autocomplete=1"
        axios.get(url)
        .then(res => {
            console.log(res);
            if(res.data!==null){
            for(let i=0;i<10;i++){
                if(res.data.features[0]!=null){
                    this.setState({
                        name: res.data.features[0].properties.city,
                        lat: res.data.features[0].geometry.coordinates[1],
                        long: res.data.features[0].geometry.coordinates[0]
                    })
                    console.log("name : "+res.data.features[0].properties.city);
                    console.log("lat : "+res.data.features[0].geometry.coordinates[1]);
                    console.log("long : "+res.data.features[0].geometry.coordinates[0]);
                    this.setState({alertShow:true,alertMessage:"Ville trouvée.",alertVariant:"secondary"});
                }
            }
        }
        })
        .catch(err => {
          console.log(err);
          //Affichage en jaune qu'il y a une erreur dans la requête
          this.setState({alertShow:true,alertMessage:"Une erreur s'est produite.",alertVariant:"warning"});
        });

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

          {/* Formulaire de position */}
          <form onSubmit={event => this.sendLogin(event)}>
            <input className="input"
              name="ville"
              type="text"
              placeholder="Ville"
              value={this.state.ville}
              onChange={event => this.inputChangeVille(event)} 
            /><label htmlFor="ville">{"Ville trouvée : "+this.state.name}</label>
            {/* Peut-être faire une liste déroulante si l'api met pas la ville en 1er */}
            <br />
            <button className="btn btn-danger" type="submit">Ne fais rien</button>
          </form>
        </div>
      );
    }
}

export default Position;