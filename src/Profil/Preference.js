import React, { Component } from 'react';

class Preference extends Component{
    constructor(props) {
        super(props);

        this.state = {
          show: false, //Affichage ou non de l'alerte

          Description : null,
          Taille : null,
          ville : "Cergy", //Valeur du input ville
          prenom : "William", //Valeur du input prenom
          nom : "kaczmarek", //Valeur du input nom
          dateBirth : "19/11/2000", //Valeur du input date de naissance
          
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
             {/* Mettre les images de profils, la possibilité de les suppr ou les rajouter*/}
            <br/>
            <label htmlFor="Photo">Vos photos :</label>
            <input type="file" name="Photo" id="Photo"/>{/* Faire tuto https://www.youtube.com/watch?v=sp9r6hSWH_o */}
            <br/>
             {/* Text area où le mec rentre sa description*/}

            <label htmlFor="Description">A propos de vous :</label>
            <input
              id="Description"
              name="Description"
              type="text"

              placeholder="Dîtes nous en plus ;)"
              style={{ minHeight: 100 }}
              maxlength="10"
              value={this.state.Description}
              onChange={event => this.inputChange(event)} 
            />
            <br/>
          {/* City*/}
            <label htmlFor="ville">Ajouter ma ville :</label>
            <input
              id="ville"
              name="ville"
              type="text"
              placeholder="Paris"
              value={this.state.ville}
              onChange={event => this.inputChange(event)} 
            />
            {/* Taille*/}
            <label htmlFor="Taille">Taille :</label>
            <input
              label={{ basic: true, content: 'cm' }}
              labelPosition='right'
              id="Taille"
              name="Taille"
              type="number"
              min="100"
              max="300"
              onChange={event => this.inputChange(event)}
            />
            <br />
            <label htmlFor="prenom">Prénom :</label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              placeholder="Ton prénom"
              value={this.state.prenom}
              onChange={event => this.inputChange(event)} 
            />
            <br />

            <br />
            <label htmlFor="dateBirth">Date de naissance :</label>
            <input
              id="dateBirth"
              name="dateBirth"
              type="date"
              maxLength="10"
              placeholder="jj/mm/aaaa"
              value={this.state.dateBirth}
              onChange={event => this.inputChange(event)} 
            />

            <button type="submit">Sauvegarder</button>
          </form>
        </div>
      );
    }
}

export default Preference;