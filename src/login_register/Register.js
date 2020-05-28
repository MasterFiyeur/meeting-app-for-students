import React, { Component } from 'react';

import {URL_API} from '../App';

class Register extends Component{
    constructor(props) {
        super(props);

        this.state = {
          //Valeur des input email, password, prenom, nom, dateBirth, ville et StudentCard
          email: "", password : "", prenom : "", nom : "", dateBirth : "", ville : "",
          StudentCard: null,
          alertShow:false, alertMessage:"", alertClass:"alert alert-danger alert-dismissible fade show" //Affichage, type et définition du message de l'alert
        };
      }

      verif(){ //Vérification de la véracité des données
        let positionArobase= this.state.email.indexOf("@");
        if(this.state.email===""){ //Chaîne vide
          this.setState({alertMessage: "Votre e-mail n'est pas précisé."});
          return false;
        }else if(this.state.email.indexOf("@")===-1){ //Ne contient pas de @
          this.setState({alertMessage: "Votre e-mail n'est pas correcte."});
          return false;
        }else if(!(this.state.email.indexOf(".com",positionArobase) !== -1 ||
        this.state.email.indexOf(".fr",positionArobase) !== -1 ||
        this.state.email.indexOf(".eu",positionArobase) !== -1 ||
        this.state.email.indexOf(".org",positionArobase) !== -1 ||
        this.state.email.indexOf(".net",positionArobase) !== -1)){ //Ne fini pas par .com/.fr/.eu/.org/.net
          this.setState({alertMessage: "Votre e-mail doit finir par .com/.fr/.eu/.org/.net."});
          return false;
        }
        if(this.state.password.length < 6){ //Taille mdp inférieure à 6
          this.setState({alertMessage: "Votre mot de passe doit contenir plus de 6 caractère."});
          return false;
        }if(this.state.nom.length < 2 || this.state.nom.length < 2){ //Taille nom et prenom => 2
          this.setState({alertMessage: "Vous n'avez pas renseignez votre nom/prénom."});
          return false;
        }if(this.state.ville.length < 2){ //Taille ville => 2
          this.setState({alertMessage: "Vous n'avez pas renseignez votre ville."});
          return false;
        }
        if(this.state.dateBirth===""){
          this.setState({alertMessage: "Votre date de naissance n'est pas précisée."});
          return false;
        }

        return true;
      }

      sendLogin(event) {
        event.preventDefault();
        const axios = require('axios');  //Requêtes HTTP
        const sha256 = require('hash-anything').sha256; //Hash du mdp

        if(!this.verif()){ //Un des champs mal rempli
          this.setState({alertShow:true});
        }else{
          let formData = new FormData();
          formData.append('file',this.state.StudentCard);
          formData.append('email',this.state.email);
          formData.append('password',sha256(this.state.password));
          formData.append('prenom',this.state.prenom);
          formData.append('nom',this.state.nom);
          formData.append('dateBirth',this.state.dateBirth);
          formData.append('ville',this.state.ville);
          const url = URL_API+'api/newUser';
          axios.post(url,formData)
          .then(res => {
            console.log(res.data+"\nlength :"+res.data.length);
            if(res.data>=0){
              switch(res.data){
                case 0:
                  this.setState({alertMessage: "L'adresse mail existe déjà"});
                  break;
                case 1:
                  this.setState({
                    alertClass:"alert alert-primary alert-dismissible fade show",
                    alertMessage: "Compte crée avec succès ! Carte étudiante transmise."
                  });
                  break;
                case 2:
                  this.setState({alertMessage: "Erreur lors du téléchargement de la carte étudiante"});
                  break;
                case 3:
                  this.setState({
                    alertClass:"alert alert-primary alert-dismissible fade show",
                    alertMessage: "Compte crée avec succès ! Aucune carte étudiante transmise."
                  });
                  break;
                default:
                  this.setState({alertMessage: "La réponse de l'API n'est pas celle attendue"});
              }
              this.setState({alertShow: true});

              console.log(res.data);
            }else{
              console.error('Problème dans le retour de l\'API/newUser');
            }
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
      
      inputChangeStudentCard(event){
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload=(e)=>{
          this.setState({
            StudentCard:files[0]
          })
          console.log(this.state.StudentCard);
        }
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
        <div className="text-blue">
          {this.state.alertShow &&
            <div className={this.state.alertClass} >
              {this.state.alertMessage}
            </div>
          }
          {/* Formulaire d'enregistrement de la personne' */}
          <form onSubmit={event => this.sendLogin(event)}>
            <label  htmlFor="email">E-mail :</label>
            <input className="input"
              id="email"
              name="email"
              type="text"
              placeholder="Ton adresse e-mail"
              value={this.state.email}
              onChange={event => this.inputChange(event)} 
            />
            <br />
            <label htmlFor="password">Mot de passe :</label>
            <input className="input"
              id="password"
              name="password"
              type="password"
              placeholder="Ton mot de passe"
              value={this.state.password}
              onChange={event => this.inputChange(event)} 
            />
            <br />
            <label htmlFor="nom">Nom :</label>
            <input className="input"
              id="nom"
              name="nom"
              type="text"
              placeholder="Ton Nom"
              value={this.state.nom}
              onChange={event => this.inputChange(event)} 
            />
            <br />
            <label htmlFor="prenom">Prénom :</label>
            <input className="input"
              id="prenom"
              name="prenom"
              type="text"
              placeholder="Ton prénom"
              value={this.state.prenom}
              onChange={event => this.inputChange(event)} 
            />
            <br />
            <label htmlFor="ville">Ville :</label>
            <input className="input"
              id="ville"
              name="ville"
              type="text"
              placeholder="Ta ville"
              value={this.state.ville}
              onChange={event => this.inputChange(event)} 
            />
            <br />
            <label htmlFor="dateBirth">Date de naissance :</label>
            <input className="input"
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
            <input className="input"
            type="file" 
            name="StudentCard" 
            id="Student_Card"
            onChange={event => this.inputChangeStudentCard(event)} 
            />{/* Faire tuto https://www.youtube.com/watch?v=sp9r6hSWH_o */}
            <br/>
            <button className="btn btn-danger" type="submit">S'enregister</button>
          </form>
        </div>
      );
    }
}

export default Register;