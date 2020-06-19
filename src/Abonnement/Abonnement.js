import React, { Component } from 'react';
import './Abonnement.css';
import PhotoCarteAbonnement from './AbonnementCard.jpg';
import {URL_API} from '../App';
import Cookies from 'js-cookie';

/**
 * Class qui s'occupe de la page abonnement
 */
class Abonnement extends Component{
    constructor(props) {
        super(props);

        this.state={
            numero:"", //Numéro de carte
            pin:"", //Code pin de carte
            message:"" //Message lors de l'achat
        }
      }

    /**
     * Envoi des codes à l'API pour savoir si 
     * le grade de premium peut être attribué
     */
    sendCodes(){
        if(this.state.pin==="" || this.state.numero===""){
            this.setState({message:"Veuillez remplir les champs"});
        }else{
            const axios = require('axios');  //Requêtes HTTP
            let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
            }
            let formData = new FormData();
            formData.append('num',this.state.numero);
            formData.append('pin',this.state.pin);
            const url = URL_API+'setPremium.php';
            axios.post(url,formData,config)
            .then(res => {
                this.setState({
                    message:res.data.Message
                });
            })
            .catch(err => {
            console.log(err);
            });
        }
    }


    /**
       * Met à jour la valeur du form dans lequel l'utilisateur écrit
       * @param {event} event Changement de la valeur d'un champ texte
       */
    inputChange(event) {
        event.preventDefault();
        /* Mise à jour des valeurs des inputs */
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    
    /**
     * Rendu du component
     */
    render(){
      return(
      <div style={{marginTop:"80px"}}>
            <h2 className="title-Abonnement">Abonne toi :</h2>
            <div className="row">
                <div className="col-lg container_Abonnement"> 
                    <div className="card_Abonnement">
                        <div className="imgBox_Abonnement">
                            <img src={PhotoCarteAbonnement} width="300px" alt="AbonnementCard"/>
                        </div>
                        <div className="details_Abonnement">
                            <h2><strong style={{fontFamily:"Quicksand"}}>Premium</strong></h2>
                            <br/>
                            <br/>
                            <ul>
                                <li>Pas de limite de likes</li>
                                <li>Filtre des partenaires qui sont proposés</li>
                            </ul>
                            <br/>
                            <br/>
                            <svg className="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <p>Trouvez votre partenaire selon <strong>VOS</strong> goûts de la personne idéale !</p>
                        </div>
                    </div>
                </div>
                <div className="input_container_Abonnement col-lg">
                    <div className="text-size_Abonnement">
                        39,99€
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <div>
                            <label htmlFor="numCarteBancaire">Numéro de carte </label>
                            <input type="text" id="numCarteBancaire" placeholder="Numero" name="numero" value={this.state.numero} onChange={event => this.inputChange(event)}/>
                        </div>
                        <div>
                            <label>Code PIN</label>
                            <input type="text" placeholder="Numero" name="pin" value={this.state.pin} onChange={event => this.inputChange(event)}/>
                        </div>
                        <br/>
                        <p>{this.state.message}</p>
                        <br/>
                        <button className="btn-abonnement-acheter" onClick={() => this.sendCodes()}>Acheter</button>
                    </div>
                </div>
            </div>
      </div>
      );
    }
}

export default Abonnement;