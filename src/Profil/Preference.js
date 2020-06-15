import React, { Component } from 'react';
import RangeSlider from './Slider';
import EditProfilesPhoto from '../PhotosProfil/EditProfilePhoto';
import {URL_API} from '../App';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";


class Preference extends Component{
    constructor(props) {
        super(props);

        //Prochaine étape : pré-sélectionner les valeurs déjà renseignées 
        //Simulation retour de la requête avec une constante(tableau je pense)
        //On peut mettre dans les select value={this.state} ce qui permet de 
        //initialiser aux valeurs de la BDD

        this.state = {
          JeSuis : "", //Sexe
          JeCherche : "", //souhaite voir
          But : 0, //ce que je cherche
          TrancheAge : [0,0], //Tranche D'âge
          Description : "", //A propos de vous         
          Ville : "", //Ville 
          Latitude:"", Longitude:"", Contexte:"", NomVille:"",
          Etudes: "", //Etudes
          Taille : 100, //Taille
          Yeux: "0", //Couleur des Yeux
          Cheveux: "",//Couleur des Cheveux
          Sport: "",//Activités Physique 
          Alcool: "", //Alcool
          Tabac: "",//Fumeur
          Animaux: "",// Animaux de compagnie 
          Religion: "",//Croyance
          Astro: "",// Signe Astrologique
          init:0,
          connect:true
        };
      this.handleChangeLookingFor = this.handleChangeLookingFor.bind(this);
      this.handleChangeSexe = this.handleChangeSexe.bind(this);
      }

      componentDidMount(){
        this.initPref();
      }

      initPref(){
        const axios = require('axios');  //Requêtes HTTP
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        const url = URL_API+'getPreferenceValues.php?img=yes';
          axios.get(url,config)
          .then(res => {
            const tabCoor = res.data.tabPref.gps.split(';');
            const tabAge = res.data.tabPref.trancheAge.split('-');
            this.setState({
                connect : res.data.connect,
                JeSuis : res.data.tabPref.jeSuis,
                JeCherche : res.data.tabPref.jeCherche, 
                But : res.data.tabPref.butRencontre, 
                TrancheAge : [parseInt(tabAge[0],10),parseInt(tabAge[1],10)], 
                Description : res.data.tabPref.bio,       
                Ville : res.data.tabPref.ville,
                Latitude:tabCoor[0], Longitude:tabCoor[1],
                Etudes: res.data.tabPref.etude, 
                Taille : res.data.tabPref.taille, 
                Yeux: res.data.tabPref.yeux, 
                Cheveux: res.data.tabPref.cheveux,
                Sport: res.data.tabPref.sport,
                Alcool: res.data.tabPref.alcool,
                Tabac: res.data.tabPref.tabac,
                Animaux: res.data.tabPref.animaux,
                Religion: res.data.tabPref.religion,
                Astro: res.data.tabPref.astro,
                init:1,
                certif:res.data.certif
            });
            console.log(this.state);
          })
          .catch(err => {
            console.log(err);
          });
      }

      /**
       * Envoie les données du 1er formulaire avec les coordonnées de la ville
       * au serveur pour pouvoir creer un compte
       * @param {event} event Action du 1er form par le bouton Submit
       */
      sendPref(event) {
        event.preventDefault();
        const axios = require('axios');  //Requêtes HTTP
        let config = {
          headers: {
          logginid: Cookies.get("ID"),
          logginkey: Cookies.get("KEY")
          }
      }
        let formData = new FormData();
        formData.append('jeSuis',this.state.JeSuis);
        formData.append('jeCherche',this.state.JeCherche);
        formData.append('But',this.state.But);
        formData.append('TrancheAge',this.state.TrancheAge[0]+"-"+this.state.TrancheAge[1]);
        formData.append('Description',this.state.Description);
        formData.append('Ville',(this.state.NomVille===""?this.state.Ville:this.state.NomVille));
        formData.append('Coor',this.state.Latitude+";"+this.state.Longitude);
        formData.append('Etudes',this.state.Etudes);
        formData.append('Taille',this.state.Taille);
        formData.append('Yeux',this.state.Yeux);
        formData.append('Cheveux',this.state.Cheveux);
        formData.append('Sport',this.state.Sport);
        formData.append('Alcool',this.state.Alcool);
        formData.append('Tabac',this.state.Tabac);
        formData.append('Animaux',this.state.Animaux);
        formData.append('Religion',this.state.Religion);
        formData.append('Astro',this.state.Astro);
        const url = URL_API+'setPreference.php';
        axios.post(url,formData,config)
        .then(res => {
          if(res.data.status!=="failure"){
            this.setState({
              connect : res.data.connect
            });
            console.log(res.data);
          }else{
            console.log("Une erreur s'est produite");
          }
        })
        .catch(err => {
          console.log(err);
        });
      }


      onSliderAgeChange = (newValue) => {
        this.setState({
          TrancheAge : newValue
        })
      };

      /**
       * Propose une ville française selon la valeur du champs ville et mise à
       * jour de ses coordonnées grâce à l'API Adresse du gouvernement
       * @param {event} event Ajout/Suppression d'un caractère dans le champ ville
       */
      inputChangeVille(event){
        event.preventDefault();
        this.setState({
          Ville: event.target.value
        })
        if(event.target.value!==""){
          const axios = require('axios').default;
          const url = "https://api-adresse.data.gouv.fr/search/?q="+event.target.value+"&type=municipality&autocomplete=1"
          axios.get(url)
          .then(res => {
            if(res.data!==null){
              if(res.data.features[0]!=null){
                this.setState({
                NomVille: res.data.features[0].properties.city,
                Latitude: res.data.features[0].geometry.coordinates[1],
                Longitude: res.data.features[0].geometry.coordinates[0],
                Contexte: res.data.features[0].properties.context
                })
              }
            }
          })
          .catch(err => {
            console.log(err);
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
      handleChangeLookingFor(event) {
        this.setState({
          JeCherche: event.target.value
        });
      }
      handleChangeSexe(event) {
        this.setState({
          JeSuis: event.target.value
        });
      }

    render(){
      /* Utilisateur redirigé si non connecté */
      if(!this.state.connect){
          Cookies.remove("ID");//Supression du cookie
          Cookies.remove("KEY");//Suppression du cookie
          return (<Redirect to='/'/>); //Renvoi à la page de connexion
      }
      return(
        <div style={{marginTop:"10%"}}>
          {/* Formulaire du profil de la personne' */}
          {this.state.init===1?
          <div>
            {/*--------------------------Photos--------------------------*/}
            <EditProfilesPhoto />
            <br/>
          <form onSubmit={event => this.sendPref(event)}>
            {this.state.certif==="1"?
              <div>T'es certifié !</div>
              :this.state.certif==="0"?
                <div>Veuillez envoyer votre carte étudiante.</div>
                :<div>Votre carte étudiante est en attente de validation...</div>
            }
            {/*--------------------------Sexe--------------------------*/}
            <div className="input-group">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="sexe">Je suis :</label>
              </div> 
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="Male">Un homme</label>
                <input 
                  className="form-check-input"
                  type="radio"
                  name="JeSuis"
                  id="Male"
                  value="Homme"
                  checked={this.state.JeSuis==="Homme"}
                  onChange={this.handleChangeSexe}


                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="Female">Une femme</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="JeSuis" 
                  id="Female"
                  value="Femme"
                  checked={this.state.JeSuis==="Femme"}
                  onChange={this.handleChangeSexe}


                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="Alive">Vivant</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="JeSuis" 
                  id="Alive"
                  value="Vivant"
                  checked={this.state.JeSuis==="Vivant"}
                  onChange={this.handleChangeSexe}
 
                />
              </div>
            </div>
            <br/>
            {/*--------------------------Souhaite voir--------------------------*/}
            <div className="input-group">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="lookingfor">Je souhaite rencontrer :</label>
              </div> 
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="Hommes">Des hommes</label>
                <input 
                  className="form-check-input"
                  type="radio"
                  name="lookingfor"
                  id="Hommes"
                  value="Hommes"
                  checked={this.state.JeCherche==='Hommes'}
                  onChange={this.handleChangeLookingFor}
                  />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="Femmes">Des femmes</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="lookingfor" 
                  id="Femmes" 
                  value="Femmes"
                  checked={this.state.JeCherche==='Femmes'}
                  onChange={this.handleChangeLookingFor}
                  />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="Les deux">Les deux</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="lookingfor" 
                  id="Les deux" 
                  value="Les deux" 
                  checked={this.state.JeCherche==='Les deux'}
                  onChange={this.handleChangeLookingFor}
                />
              </div>
            </div>
            <br/>
          {/*--------------------------Cherche-------------------------- */}
            <div className="input-group ">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="But">Ce que je cherche :</label>
              </div>
              <select  id="But" value={this.state.But} name="But" onChange={(event) => this.inputChange(event)}>
                <option  value="0">A remplir</option>
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
            <RangeSlider intervalle={this.state.TrancheAge} onSliderAgeChange={this.onSliderAgeChange}/>
            <br />
            {/*--------------------------Description--------------------------*/}
            <div className="input-group">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="Description">A propos de vous :</label>
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
            {/*-------------------------- Ville--------------------------*/}
            {this.state.NomVille!=="" &&
              <label>
                {this.state.NomVille+" - "+this.state.Contexte}
              </label>
            }
            <div className="input-group">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="Ville">J'habite à :</label>
              </div>                
              <input
                  id="Ville"
                  name="Ville"
                  type="text"
                  placeholder="Paris"
                  value={this.state.Ville}
                  onChange={event => this.inputChangeVille(event)} 
                />
            </div>
            <br />
            {/*--------------------------Etudes-------------------------- */}
            <div className="input-group ">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="Etudes">J'étudie au :</label>
              </div>
              <select  id="Etudes" value={this.state.Etudes} name="Etudes" onChange={(event) => this.inputChange(event)}>
                <option  value="none">A remplir</option>
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
                <label className="input-group-text" htmlFor="Taille">Je mesure :</label>
              </div>
                   <input
                    id="Taille"
                    name="Taille"
                    type="number"
                    min="100"
                    max="300"
                    value={this.state.Taille}
                    onChange={event => this.inputChange(event)}
                  />
                <div className="input-group-append">
                  <label className="input-group-text" htmlFor="Taille">cm</label>
                </div>
            </div>
            <br />
            {/*--------------------------Yeux-------------------------- */}
              <div className="input-group">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="Yeux">Mes yeux sont :</label>
                </div>
                <select  id="Yeux" value={this.state.Yeux} name="Yeux" onChange={(event) => this.inputChange(event)}>
                  <option  value="none">A remplir</option>
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
                  <label className="input-group-text" htmlFor="Cheveux">Mes cheveux sont :</label>
                </div>
                <select  id="Cheveux" value={this.state.Cheveux} name="Cheveux" onChange={(event) => this.inputChange(event)}>
                <option  value="none">A remplir</option>
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
                  <label className="input-group-text" htmlFor="Sport">Les activités physique :</label>
                </div>
                <select  id="Sport" value={this.state.Sport} name="Sport" onChange={(event) => this.inputChange(event)}>
                  <option  value="none">A remplir</option>
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
                  <label className="input-group-text" htmlFor="Alcool">L'alcool :</label>
                </div>
                <select  id="Alcool" value={this.state.Alcool} name="Alcool" onChange={(event) => this.inputChange(event)}>
                  <option  value="none">A remplir</option>
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
                  <label className="input-group-text" htmlFor="Tabac">Le tabac :</label>
                </div>
                <select  id="Tabac" value={this.state.Tabac} name="Tabac" onChange={(event) => this.inputChange(event)}>
                  <option  value="none">A remplir</option>
                  <option value="Fréquemment">Fréquemment</option>
                  <option value="A l'occasion">A l'occasion</option>
                  <option value="Jamais">Jamais</option>
                </select>
              </div>
              <br />
              {/*--------------------------Animaux Domestique-------------------------- */}
              <div className="input-group">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="Animaux">Mes animaux de compagnie :</label>
                </div>
                <select  id="Animaux" value={this.state.Animaux} name="Animaux" onChange={(event) => this.inputChange(event)}>
                  <option  value="none">A remplir</option>
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
                  <label className="input-group-text" htmlFor="Religion">Ma religion :</label>
                </div>
                <select  id="Religion" value={this.state.Religion} name="Religion" onChange={(event) => this.inputChange(event)}>
                  <option  value="none">A remplir</option>
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
                  <label className="input-group-text" htmlFor="Astro">Mon signe astrologique :</label>
                </div>
                <select  id="Astro" value={this.state.Astro} name="Astro" onChange={(event) => this.inputChange(event)}>
                  <option  value="none">A remplir</option>
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
                  <option value="Balance">Balance</option>
                </select>
              </div>
              <br />
              {/*--------------------------SAVE-------------------------- */}
                <button type="submit">Sauvegarder</button>
              </form>
              </div>
              :
              <div>Chargement...</div>
              }
            </div>
          );
    }
}

export default Preference;
