import React, { Component } from 'react';

import {URL_API} from '../App';

class Register extends Component{
    constructor(props) {
        super(props);

        this.state = {
          //Valeur des input email, password, prenom, nom, dateBirth, ville et StudentCard
          email: "", password : "", verifPassword : "", prenom : "", nom : "", dateBirth : "", ville : "",
          StudentCard: null,
          alertShow:false, alertMessage:"", alertClass:"alert-danger", //Affichage, type et définition du message de l'alert
          name: "", context:null, lat: null, long: null, //Resultat de l'API, ville et coordonnées GPS
          etape: 0 //0 -> Creation du compte; 1 -> Upload carte étudiante; 2 -> Création du compte terminée
        };
      }

      fifteenYearsAgo(){
        let curr = new Date();
        curr.setDate(curr.getDate()-365*15);
        return (curr.toISOString().substr(0,10));
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
        }else if(this.state.password!==this.state.verifPassword){
          this.setState({alertMessage: "Vos mots de passe ne correspondent pas."});
          return false;
        }
        if(this.state.nom.length < 2 || this.state.nom.length < 2){ //Taille nom et prenom => 2
          this.setState({alertMessage: "Vous n'avez pas renseignez votre nom/prénom."});
          return false;
        }
        if(this.state.name===""){this.setState({name:this.state.ville});}
        if(this.state.name.length < 2){ //Taille ville => 2
          this.setState({alertMessage: "Vous n'avez pas renseignez votre ville."});
          return false;
        }
        if(this.state.dateBirth===""){
          this.setState({alertMessage: "Votre date de naissance n'est pas précisée."});
          return false;
        }

        return true;
      }

      sendAccount(event) {
        event.preventDefault();
        const axios = require('axios');  //Requêtes HTTP
        const sha256 = require('hash-anything').sha256; //Hash du mdp

        if(!this.verif()){ //Un des champs mal rempli
          this.setState({alertShow:true});
        }else{
          let formData = new FormData();
          formData.append('email',this.state.email);
          formData.append('password',sha256(this.state.password));
          formData.append('prenom',this.state.prenom);
          formData.append('nom',this.state.nom);
          formData.append('dateBirth',this.state.dateBirth);
          formData.append('ville',this.state.name);
          formData.append('coor',this.state.lat+";"+this.state.long);
          const url = URL_API+'newUser.php';
          axios.post(url,formData)
          .then(res => {
            console.log("Réponse newUser: "+res.data);
            if(res.data>=0){
              switch(res.data){
                case 0:
                  this.setState({
                    alertMessage: "L'adresse mail existe déjà.",
                    alertClass:"alert-danger",
                  });
                  break;
                case 1:
                  this.setState({
                    alertClass:"alert-primary",
                    alertMessage: "Compte crée avec succès !",
                    etape:1
                  });
                  break;
                default:
                  this.setState({alertMessage: "La réponse de l'API n'est pas celle attendue."});
              }
              this.setState({alertShow: true});
            }else{
              console.error('Problème dans le retour de l\'API/newUser.');
            }
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
      
      
      sendCard(event){
        event.preventDefault();
        const axios = require('axios');  //Requêtes HTTP
        
        let formData = new FormData();
        formData.append('file',this.state.StudentCard);
        formData.append('email',this.state.email);

        const url = URL_API+'setCarteEtudiante.php';
          axios.post(url,formData)
          .then(res => {
            console.log("Réponse setCarteEtudiante: "+res.data);
            if(res.data>=0){
              switch(res.data){
                case 0:
                  this.setState({
                    alertMessage: "Aucune carte étudiante n'a été envoyée.",
                    alertClass:"alert-secondary",
                    etape:2
                  });
                  break;
                case 1:
                  this.setState({
                    alertClass:"alert-primary",
                    alertMessage: "Carte étudiante envoyée avec succès !",
                    etape:2
                  });
                  break;
                case 2:
                  this.setState({
                    alertClass:"alert-danger",
                    alertMessage: "Votre image dépasse 2Mo !",
                  });
                  break;
                case 3:
                  this.setState({
                    alertClass:"alert-danger",
                    alertMessage: "L'extension de votre image n'est pas acceptée !",
                  });
                  break;
                default:
                  this.setState({alertMessage: "La réponse de l'API n'est pas celle attendue."});
              }
              this.setState({alertShow: true});
            }else{
              this.setState({
              alertClass:"alert-warning",
              alertMessage: "L'image a rencontré un problème durant l'upload.",
              alertShow: true
              });
              console.error('Problème dans le retour de l\'API/setCarteEtudiante.');
            }
          })
          .catch(err => {
            console.log(err);
            this.setState({
              alertClass:"alert-warning",
              alertMessage: "La requête/le serveur a rencontré un problème.",
              alertShow: true
            });
          });
        }

      inputChangeStudentCard(event){
        let files = event.target.files;
        let reader = new FileReader();
        if(files[0]!=null){
          reader.readAsDataURL(files[0]);
          reader.onload=(e)=>{
            this.setState({
              StudentCard:files[0]
            })
            console.log(this.state.StudentCard);
          }
        }else{
          this.setState({
            StudentCard:null
          })
        }
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

      inputChange(event) {
        event.preventDefault();
        /* Mise à jour des valeurs des inputs */
        const { name, value } = event.target;
        this.setState({
          [name]: value
        })
      }

    render(){
      /*Il faut que je sépare en deux form donc deux fonctions 
      d'envoie et que finisse l'api setCarteEtudiant */
      return(
        <div className="text-blue">
          {this.state.alertShow &&
            <div className={"alert alert-dismissible fade show " + this.state.alertClass} >
              {this.state.alertMessage}
            </div>
          }
          {this.state.etape===0  &&
            <form onSubmit={event => this.sendAccount(event)}>
            {/* Formulaire d'enregistrement du compte' */}
              <label htmlFor="email">E-mail :</label>
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
              <label htmlFor="verifPassword">Vérifie ton mot de passe :</label>
              <input className="input"
                id="verifPassword"
                name="verifPassword"
                type="password"
                placeholder="Ton mot de passe"
                value={this.state.verifPassword}
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
              <br/>
              <label htmlFor="ville">Ville :</label>
              <input className="input"
                id="ville"
                name="ville"
                type="text"
                placeholder="Ta ville"
                value={this.state.ville}
                onChange={event => this.inputChangeVille(event)} 
              />
              {this.state.name!=="" &&
                <label htmlFor="ville">
                  {this.state.name+" - "+this.state.context}
                </label>
              }
              <br />
              <label htmlFor="dateBirth">Date de naissance :</label>
              <input className="input"
                id="dateBirth"
                name="dateBirth"
                type="date"
                maxLength="10"
                placeholder="jj/mm/aaaa"
                min="1960-01-01"
                max={this.fifteenYearsAgo()}
                value={this.state.dateBirth}
                onChange={event => this.inputChange(event)} 
              />
              <br/>
              <button className="btn btn-danger" type="submit">S'enregister</button>
            </form>
          }
          {this.state.etape===1  &&
            <form onSubmit={event => this.sendCard(event)}>
            {/* Formulaire pour upload la carte étudiante */}
              <h4>Envoi de la carte étudiante</h4>
              <p color="grey">Votre carte étudiante dois être au format .png/.jpg/.jpeg 
              et ne doit pas dépasser 2Mo.</p>
              <label htmlFor="Student_Card">Carte étudiante :</label>
              <input className="input" 
              type="file" 
              name="StudentCard" 
              id="Student_Card"
              onChange={event => this.inputChangeStudentCard(event)} 
              />
              <br/>
              <button type="submit">Upload</button>
            </form>
          }
          {this.state.etape===2 &&
            <div>
              <h4 className="text-blue">Ton compte viens d'être créé</h4>
              <p className="text-blue">Je t'invite à aller vite te connecter pour profiter de notre application :)</p>
              <a href="/"><button className="btn btn-danger">Fermer</button></a>
            </div>
          }

        </div>
      );
    }
}

export default Register;












