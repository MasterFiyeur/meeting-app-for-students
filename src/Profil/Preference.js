import React, { Component } from 'react';
import InputRange from 'react-input-range';


class Preference extends Component{
    constructor(props) {
        super(props);

        //Prochaine étape : pré-sélectionner les valeurs déjà renseignées 
        //Simulation retour de la requête avec une constante(tableau je pense)

        this.state = {
          Description : null,
          Taille : null,
          City : "Cergy", //Valeur du input City          
          value1: {min: 18, max: 24,},
        };
      }
    

      
       

      inputChange(event) {
        event.preventDefault();
        /* Mise à jour des valeurs des inputs */
        const { name, value } = event.target;
        this.setState({
          [name]: value
        })
      }

    render(){
      return(
        <div>
          {/* Formulaire du profil de la personne' */}
         
          <form onSubmit={event => this.sendLogin(event)}>
            <br/>
            <div>{/* Mettre les images de profils, la possibilité de les suppr ou les rajouter*/}
              <label htmlFor="Photo">Vos photos :</label>
              <input type="file" name="Photo" id="Photo"/>
            </div>
            <br/>
            {/*--------------------------Sexe--------------------------*/}
            <div className="input-group">
              <div className="input-group-prepend">
                <label className="input-group-text" for="sexe">Je suis :</label>
              </div> 
              <div className="form-check form-check-inline">
                <label className="form-check-label" for="homme">Un homme</label>
                <input 
                  className="form-check-input"
                  type="radio"
                  name="jeSuis"
                  id="homme"
                  value="Homme"
                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" for="femme">Une femme</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="jeSuis" 
                  id="femme" 
                  value="Femme"
                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" for="vivant">Vivant</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="jeSuis" 
                  id="vivant" 
                  value="Vivant" 
                />
              </div>
            </div>
            <br/>
            {/*--------------------------Souhaite voir--------------------------*/}
            <div className="input-group">
              <div className="input-group-prepend">
                <label className="input-group-text" for="lookingfor">Je souhaite rencontrer :</label>
              </div> 
              <div className="form-check form-check-inline">
                <label className="form-check-label" for="homme">Des hommes</label>
                <input 
                  className="form-check-input"
                  type="radio"
                  name="jeCherche"
                  id="homme"
                  value="Hommes"
                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" for="femme">Des femmes</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="jeCherche" 
                  id="femme" 
                  value="Femmes"
                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" for="both">Les deux</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="jeCherche" 
                  id="both" 
                  value="Les deux" 
                />
              </div>
            </div>
            <br/>
          {/*--------------------------Cherche-------------------------- */}
            <div className="input-group ">
              <div className="input-group-prepend">
                <label className="input-group-text" for="purpose">Ce que je cherche :</label>
              </div>
              <select  id="purpose">
                <option selected>A remplir</option>
                <option value="1">Du sérieux</option>
                <option value="2">Aller boire un verre</option>
                <option value="3">On verra</option>
                <option value="4">Pas de prise de tête</option>
                <option value="5">Occuper ma soirée </option>
                <option value="6">Amitié </option>
                <option value="7">Seulement tchatter </option>
              </select>
            </div>
            <br />
           {/*--------------------------Tranche d age-------------------------- */}
          
                <label  for="Age">Tranche d'age :</label>
             
               <InputRange
                  draggableTrack
                  maxValue={35}
                  minValue={18}
                  onChange={value => this.setState({ value1: value })}
                  onChangeComplete={value => console.log(value)}
                  value={this.state.value5} 
                />
          
            <br />
            {/*--------------------------Description--------------------------*/}
            <div className="input-group">
              <div className="input-group-prepend">
                <label className="input-group-text" for="Description">A propos de vous :</label>
              </div> 
                <textarea
                  id="Description"
                  name="Description"
                  type="text"
                  placeholder="Vous avez 350 caractères pour nous en dire plus ;)"
                  style={{resize: "none"}}
                  rows="2"//hauteur
                  cols="50" //largeur
                  maxLength="350"
                  value={this.state.Description}
                  onChange={event => this.inputChange(event)} 
                />
            </div>
            <br/>
            {/*-------------------------- City--------------------------*/}
            <div className="input-group">
              <div className="input-group-prepend">
                <label className="input-group-text" for="City">J'habite à :</label>
              </div>                <input
                  id="City"
                  name="City"
                  type="text"
                  placeholder="Paris"
                  value={this.state.City}
                  onChange={event => this.inputChange(event)} 
                />
            </div>
            <br />
            {/*--------------------------Etudes-------------------------- */}
            <div className="input-group ">
              <div className="input-group-prepend">
                <label className="input-group-text" for="Study">J'étudie au :</label>
              </div>
              <select  id="Study">
                <option selected>A remplir</option>
                <option value="Lycée">Lycée</option>
                <option value="Université">Université</option>
                <option value="Ecole d'Ingénieur">Ecole d'Ingénieur</option>
                <option value="Ecole de commerce">Ecole de commerce</option>
                <option value="Ecole supérieur">Ecole supérieur</option>
                <option value="Reconversion">Reconversion </option>
                <option value="Année sabatique">Année sabatique</option>
              </select>
            </div>
            <br />
            {/*--------------------------Taille-------------------------- */}
            <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" for="Taille">Je mesure :</label>
            </div>
                 <input
                  id="Taille"
                  name="Taille"
                  type="number"
                  min="100"
                  max="300"
                  onChange={event => this.inputChange(event)}
                />
              <div className="input-group-append">
                <label className="input-group-text" for="Taille">cm</label>
              </div>
            </div>
          <br />
        {/*--------------------------Yeux-------------------------- */}
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" for="Yeux">Mes yeux sont :</label>
            </div>
            <select  id="Yeux">
              <option selected value="none">A remplir</option>
              <option value="Noir">Noir</option>
              <option value="Marron">Marron</option>
              <option value="Vert">Vert</option>
              <option value="Bleu">Bleu</option>
              <option value="Verron">Verron</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <br />
          {/*--------------------------Cheveux-------------------------- */}
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" for="Hair">Mes cheveux sont :</label>
            </div>
            <select  id="Hair">
            <option selected value="none">A remplir</option>
              <option value="Noir">Noir</option>
              <option value="Brun">Brun</option>
              <option value="Auburn">Auburn</option>
              <option value="Châtain">Châtain</option>
              <option value="Roux">Roux</option>
              <option value="Blond">Blond</option>
              <option value="Blanc">Blanc</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <br />
          {/*--------------------------Sport-------------------------- */}
          <div className="input-group ">
            <div className="input-group-prepend">
              <label className="input-group-text" for="Sport">Les activités physique :</label>
            </div>
            <select  id="Sport">
              <option selected value="none">A remplir</option>
              <option value="Passioné">Passioné(e)</option>
              <option value="Régulièrement">Régulièrement</option>
              <option value="Parfois">Parfois</option>
              <option value="Une fois au chalet">Une fois au chalet</option>
              <option value="Quelle horreur">Quelle horreur</option>
            </select>
          </div>
          <br />
          {/*--------------------------Alcool-------------------------- */}
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" for="Alcool">L'alcool :</label>
            </div>
            <select  id="Alcool">
              <option selected value="none">A remplir</option>
              <option value="Tous les jours">Tous les jours</option>
              <option value="Régulièrement">Régulièrement</option>
              <option value="A l'occasion">A l'occasion</option>
              <option value="Jamais">Jamais</option>
            </select>
            </div>
          <br />
          {/*--------------------------Tabac-------------------------- */}
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" for="Tabac">Le tabac :</label>
            </div>
            <select  id="Tabac">
              <option selected value="none">A remplir</option>
              <option value="Fréquemment">Fréquemment</option>
              <option value="A l'occasion">A l'occasion</option>
              <option value="Jamais">Jamais</option>
            </select>
          </div>
          <br />
          {/*--------------------------Animaux Domestique-------------------------- */}
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" for="Pet">Mes animaux de compagnie :</label>
            </div>
            <select  id="Pet">
              <option selected value="none">A remplir</option>
              <option value="Chiens">Chiens</option>
              <option value="Chats">Chats</option>
              <option value="Beaucoup">Beaucoup :)</option>
              <option value="Autres">Autres</option>
              <option value="Aucun">Aucun</option>
              <option value="Allergique">Allergique :'(</option>
            </select>
          </div>
          <br />
        {/*--------------------------Religion-------------------------- */}
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" for="Religion">Ma religion :</label>
            </div>
            <select  id="Religion">
              <option selected value="none">A remplir</option>
              <option value="Agnosticisme">Agnosticisme</option>
              <option value="Athéisme">Athéisme</option>
              <option value="Bouddhisme">Bouddhisme</option>
              <option value="Christianisme">Christianisme</option>
              <option value="Hindouisme">Hindouisme</option>
              <option value="Jaïnisme">Jaïnisme</option>
              <option value="Judaïsme">Judaïsme</option>
              <option value="Islam">Islam</option>
              <option value="Zoroastrisme">Zoroastrisme</option>
              <option value="Sikhisme">Sikhisme</option>
              <option value="Spiritualité">Spiritualité</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <br />
          {/*--------------------------Signe Astro-------------------------- */}
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" for="Astro">Mon signe astrologique :</label>
            </div>
            <select  id="Asro">
              <option selected value="none">A remplir</option>
              <option value="Verseau">Verseau</option>
              <option value="Poissons">Poissons</option>
              <option value="Bélier">Bélier</option>
              <option value="Taureau">Taureau</option>
              <option value="Gémeaux">Gémeaux</option>
              <option value="Cancer">Cancer</option>
              <option value="Lion">Lion</option>
              <option value="Vierge">Vierge</option>
              <option value="Scorpion">Scorpion</option>
              <option value="Sagittaire">Sagittaire</option>
              <option value="Capricorne">Capricorne</option>
            </select>
          </div>
          <br />
          {/*--------------------------SAVE-------------------------- */}
            <button type="submit">Sauvegarder</button>
          </form>
        </div>
      );
    }
}

export default Preference;
