import React, { Component } from 'react';

class Preference extends Component{
    constructor(props) {
        super(props);

        this.state = {
           Description : null,
          Taille : null,
          City : "Cergy", //Valeur du input City          
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
              <input type="file" name="Photo" id="Photo"/>{/* Faire tuto https://www.youtube.com/watch?v=sp9r6hSWH_o */}
            </div>
            <br/>
            {/*--------------------------Sexe--------------------------*/}
            <div class="input-group">
              <div class="input-group-prepend">
                <label class="input-group-text" for="sexe">Je suis :</label>
              </div> 
              <div class="form-check form-check-inline">
                <label class="form-check-label" for="homme">un homme</label>
                <input 
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="homme"
                  value="option1"
                />
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label" for="femme">une femme</label>
                <input 
                  class="form-check-input" 
                  type="radio" 
                  name="inlineRadioOptions" 
                  id="femme" 
                  value="option2"
                />
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label" for="vivant">vivant</label>
                <input 
                  class="form-check-input" 
                  type="radio" 
                  name="inlineRadioOptions" 
                  id="vivant" 
                  value="option3" 
                />
              </div>
            </div>
            <br/>
            {/*--------------------------Souhaite voir--------------------------*/}
            <div class="input-group">
              <div class="input-group-prepend">
                <label class="input-group-text" for="lookingfor">Je souhaite rencontrer :</label>
              </div> 
              <div class="form-check form-check-inline">
                <label class="form-check-label" for="homme">des hommes</label>
                <input 
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="homme"
                  value="option1"
                />
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label" for="femme">des femmes</label>
                <input 
                  class="form-check-input" 
                  type="radio" 
                  name="inlineRadioOptions" 
                  id="femme" 
                  value="option2"
                />
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label" for="both">les deux</label>
                <input 
                  class="form-check-input" 
                  type="radio" 
                  name="inlineRadioOptions" 
                  id="both" 
                  value="option3" 
                />
              </div>
            </div>
            <br/>
          {/*--------------------------Cherche-------------------------- */}
            <div class="input-group ">
              <div class="input-group-prepend">
                <label class="input-group-text" for="purpose">Ce que je cherche :</label>
              </div>
              <select  id="purpose">
                <option selected>A remplir</option>
                <option value="1">Du sérieux</option>
                <option value="2">Aller boire un verre</option>
                <option value="3">On verra</option>
                <option value="4">Pas de prise de tête</option>
                <option value="5">Occuper ma soirée </option>
                <option value="5">Amitié </option>
                <option value="5">Seulement tchatter </option>
              </select>
            </div>
            <br />
            {/*--------------------------Description--------------------------*/}
            <div class="input-group">
              <div class="input-group-prepend">
                <label class="input-group-text" for="Description">A propos de vous :</label>
              </div> 
                <textarea
                  id="Description"
                  name="Description"
                  type="text"
                  placeholder="Vous avez 350 caractères pour nous en dire plus ;)"
                  style={{ minWidth: 370}}
                  rows="2"
                  maxlength="350"
                  value={this.state.Description}
                  onChange={event => this.inputChange(event)} 
                />
            </div>
            <br/>
            {/*-------------------------- City--------------------------*/}
            <div class="input-group">
              <div class="input-group-prepend">
                <label class="input-group-text" for="City">Habite à :</label>
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
            <div class="input-group ">
              <div class="input-group-prepend">
                <label class="input-group-text" for="Study">J'étudie au :</label>
              </div>
              <select  id="Study">
                <option selected>A remplir</option>
                <option value="1">Lycée</option>
                <option value="2">Université</option>
                <option value="3">Ecole d'Ingénieur</option>
                <option value="4">Ecole de commerce</option>
                <option value="5">Ecole supérieur </option>
                <option value="5">Reconversion </option>
                <option value="5">Année sabatique </option>
              </select>
            </div>
            <br />
            {/*--------------------------Taille-------------------------- */}
            <div class="input-group">
            <div class="input-group-prepend">
              <label class="input-group-text" for="Taille">Taille :</label>
            </div>
                 <input
                  id="Taille"
                  name="Taille"
                  type="number"
                  min="100"
                  max="300"
                  onChange={event => this.inputChange(event)}
                />
              <div class="input-group-append">
                <label class="input-group-text" for="Taille">cm</label>
              </div>
            </div>
          <br />
        {/*--------------------------Yeux-------------------------- */}
          <div class="input-group">
            <div class="input-group-prepend">
              <label class="input-group-text" for="Yeux">Yeux :</label>
            </div>
            <select  id="Yeux">
              <option selected>A remplir</option>
              <option value="1">Noir</option>
              <option value="2">brun </option>
              <option value="3">auburn</option>
              <option value="4">châtain</option>
              <option value="5">roux</option>
              <option value="6">blond </option>
              <option value="7">blanc</option>
              <option value="8">Autre</option>

            </select>
          </div>
          <br />
          {/*--------------------------Cheveux-------------------------- */}
          <div class="input-group">
            <div class="input-group-prepend">
              <label class="input-group-text" for="Hair">Cheveux :</label>
            </div>
            <select  id="Hair">
              <option selected>A remplir</option>
              <option value="1">Noir</option>
              <option value="2">Marron</option>
              <option value="3">Vert</option>
              <option value="4">Bleue</option>
              <option value="5">Verron</option>
              <option value="6">Autre</option>

            </select>
          </div>
          <br />
          {/*--------------------------Sport-------------------------- */}
          <div class="input-group ">
            <div class="input-group-prepend">
              <label class="input-group-text" for="Sport">Activités physique :</label>
            </div>
            <select  id="Sport">
              <option selected>A remplir</option>
              <option value="1">Passioné</option>
              <option value="2">Régulièrement</option>
              <option value="3">Parfois</option>
              <option value="4">une fois au chalet</option>
              <option value="5">Quel horreur</option>
            </select>
          </div>
          <br />
          {/*--------------------------Alcool-------------------------- */}
          <div class="input-group">
            <div class="input-group-prepend">
              <label class="input-group-text" for="Alcool">Alcool :</label>
            </div>
            <select  id="Alcool">
              <option selected>A remplir</option>
              <option value="1">Tous les jours</option>
              <option value="2">Régulièrement</option>
              <option value="3">A l'occasion</option>
              <option value="4">Jamais</option>
            </select>
            </div>
          <br />
          {/*--------------------------Tabac-------------------------- */}
          <div class="input-group">
            <div class="input-group-prepend">
              <label class="input-group-text" for="Tabac">Tabac :</label>
            </div>
            <select  id="Tabac">
              <option selected>A remplir</option>
              <option value="1">Fréquemment</option>
              <option value="2">A l'occasion</option>
              <option value="3">Jamais</option>
            </select>
          </div>
          <br />
          {/*--------------------------Animaux Domestique-------------------------- */}
          <div class="input-group">
            <div class="input-group-prepend">
              <label class="input-group-text" for="Pet">Animaux de compagnie :</label>
            </div>
            <select  id="Pet">
              <option selected>A remplir</option>
              <option value="1">Chiens</option>
              <option value="2">Chats</option>
              <option value="3">Beaucoup :)</option>
              <option value="4">Autres</option>
              <option value="5">Aucun</option>
              <option value="6">Allergiques :'(</option>
            </select>
          </div>
          <br />
        {/*--------------------------Religion-------------------------- */}
          <div class="input-group">
            <div class="input-group-prepend">
              <label class="input-group-text" for="Religion">Religion :</label>
            </div>
            <select  id="Religion">
              <option selected>A remplir</option>
              <option value="1">Agnosticisme</option>
              <option value="2">Athéisme</option>
              <option value="3">Bouddhisme</option>
              <option value="4">Christianisme</option>
              <option value="5">Hindouisme</option>
              <option value="6">Jaïnisme</option>
              <option value="7">Judaïsme</option>
              <option value="8">Islam</option>
              <option value="9">Zoroastrisme</option>
              <option value="10">Sikhisme</option>
              <option value="11">Spiritualité</option>
              <option value="12">Autre</option>
            </select>
          </div>
          <br />
          {/*--------------------------Signe Astro-------------------------- */}
          <div class="input-group">
            <div class="input-group-prepend">
              <label class="input-group-text" for="Astro">Signe astrlogique :</label>
            </div>
            <select  id="Asro">
              <option selected>A remplir</option>
              <option value="1">Verseau</option>
              <option value="2">Poissons</option>
              <option value="3">Bélier</option>
              <option value="4">Taureau</option>
              <option value="5">Gémeaux</option>
              <option value="6">Cancer</option>
              <option value="7">Lion</option>
              <option value="8">Vierge</option>
              <option value="9">Scorpion</option>
              <option value="10">Sagittaire</option>
              <option value="11">Capricorne</option>
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
