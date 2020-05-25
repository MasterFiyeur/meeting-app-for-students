import React, { Component } from 'react';

class Register extends Component{
    constructor(props) {
        super(props);

        this.state = {
          show: false, //Affichage ou non de l'alerte
          email: null, //Valeur du input email
          password : null, //Valeur du input password
          prenom : null, //Valeur du input prenom
          nom : null, //Valeur du input nom
          dateBirth : "", //Valeur du input date de naissance
          ville : null //Valeur du input ville
        };
      }
     
      sendLogin(event) {
        event.preventDefault();
        alert("email: " + this.state.email+'\n'+"mdp :"+this.state.password);
        /* Affichage de l'alert */
        this.setState({
          show:true
        })
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
          {/* Formulaire d'enregistrement de la personne' */}
          <form onSubmit={event => this.sendLogin(event)}>
            <label htmlFor="email">E-mail :</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Ton adresse e-mail"
              value={this.state.email}
              onChange={event => this.inputChange(event)} 
            />
            <br />
            <label htmlFor="password">Mot de passe :</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Ton mot de passe"
              value={this.state.password}
              onChange={event => this.inputChange(event)} 
            />
            <br />
            <label htmlFor="nom">Nom :</label>
            <input
              id="nom"
              name="nom"
              type="text"
              placeholder="Ton Nom"
              value={this.state.nom}
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
            <label htmlFor="ville">Ville :</label>
            <input
              id="ville"
              name="ville"
              type="text"
              placeholder="Ta ville"
              value={this.state.ville}
              onChange={event => this.inputChange(event)} 
            />
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
            <br />
            <label htmlFor="Student_Card">Carte étudiante :</label>
            <input type="file" name="StudentCard" id="Student_Card"/>{/* Faire tuto https://www.youtube.com/watch?v=sp9r6hSWH_o */}
            <br/>
            <button type="submit">S'enregister</button>
          </form>
        </div>
      );
    }
}

export default Register;