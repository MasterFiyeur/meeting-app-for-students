import React, { Component } from 'react';
import RangeSlider from './Slider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

class Filtre extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checkedA: true,
            showFiltreEtude: false,
            TabEtudes: [
                {name: "Lycée" , value: 1},
                {name: "Université", value: 1},
                {name: "Ecole d'Ingénieur", value: 1},
                {name: "Ecole de commerce", value: 1},
                {name: "Ecole supérieur", value: 1},
                {name: "Reconversion", value: 1},
                {name: "Sabatique", value: 1},
            ],
            showFiltreSport: false,
            TabSport: [
                {name: "Passionée" , value: 1},
                {name: "Régulièrement", value: 1},
                {name: "Parfois", value: 1},
                {name: "Une fois au chalet", value: 1},
                {name: "Jamais", value: 1},
            ],
            showFiltreYeux: false,
            TabYeux: [
                {name: "Noir" , value: 1},
                {name: "Marron", value: 1},
                {name: "Vert", value: 1},
                {name: "Bleu", value: 1},
                {name: "Verron", value: 1},
                {name: "Autre", value: 1},

            ],
           showFiltreCheveux: false,
            TabCheveux: [
                {name: "Noir" , value: 1},
                {name: "Brun", value: 1},
                {name: "Auburn", value: 1},
                {name: "Châtain", value: 1},
                {name: "Roux", value: 1},
                {name: "Blond", value: 1},
                {name: "Blanc", value: 1},
                {name: "Autre", value: 1},

            ],
            showFiltreAlcool: false,
            TabAlcool: [
                {name: "Tous les jours" , value: 1},
                {name: "Régulièrement", value: 1},
                {name: "A l'occasion", value: 1},
                {name: "Jamais", value: 1},
            ],
            showFiltreTabac: false,
            TabTabac: [
                {name: "Fréquemment", value: 1},
                {name: "A l'occasion", value: 1},
                {name: "Jamais", value: 1},
            ],
           showFiltreReligion: false,
            TabReligion: [
                {name: "Agnosticisme" , value: 1},
                {name: "Athéisme", value: 1},
                {name: "Bouddhisme", value: 1},
                {name: "Christianisme", value: 1},
                {name: "Hindouisme", value: 1},
                {name: "Jaïnisme", value: 1},
                {name: "Judaïsme", value: 1},
                {name: "Islam", value: 1},
                {name: "Zoroastrisme", value: 1},
                {name: "Sikhisme", value: 1},
                {name: "Spiritualité", value: 1},
                {name: "Autre", value: 1},
            ],
            showFiltreAstrologie: false,
            TabAstrologie: [
                {name: "Verseau" , value: 1},
                {name: "Poissons", value: 1},
                {name: "Bélier", value: 1},
                {name: "Taureau", value: 1},
                {name: "Gémeaux", value: 1},
                {name: "Cancer", value: 1},
                {name: "Lion", value: 1},
                {name: "Vierge", value: 1},
                {name: "Scorpion", value: 1},
                {name: "Sagittaire", value: 1},
                {name: "Capricorne", value: 1},
                {name: "Balance", value: 1},
            ],            
            showFiltreAnimaux: false,
            TabAnimaux: [
                {name: "Chiens" , value: 1},
                {name: "Chats", value: 1},
                {name: "Beaucoup", value: 1},
                {name: "Autres", value: 1},
                {name: "Aucun", value: 1},
                {name: "Allergique", value: 1},
            ],
            Actif: "",
            init:0,
            connect:true
        };
{/* Fonction pour filtre ETUDE */}
this.handleChangeEtude = this.handleChangeEtude.bind(this);
this.handleClickInEtude = this.handleClickInEtude.bind(this);
this.handleClickOutEtude = this.handleClickOutEtude.bind(this);
{/* Fonction pour filtre Sport */}
this.handleChangeSport = this.handleChangeSport.bind(this);
this.handleClickInSport = this.handleClickInSport.bind(this);
this.handleClickOutSport = this.handleClickOutSport.bind(this);
{/* Fonction pour filtre Yeux */}
this.handleChangeYeux = this.handleChangeYeux.bind(this);
this.handleClickInYeux = this.handleClickInYeux.bind(this);
this.handleClickOutYeux = this.handleClickOutYeux.bind(this);
{/* Fonction pour filtre Cheveux */}
this.handleChangeCheveux = this.handleChangeCheveux.bind(this);
this.handleClickInCheveux = this.handleClickInCheveux.bind(this);
this.handleClickOutCheveux = this.handleClickOutCheveux.bind(this);
{/* Fonction pour filtre Alcool */}
this.handleChangeAlcool = this.handleChangeAlcool.bind(this);
this.handleClickInAlcool = this.handleClickInAlcool.bind(this);
this.handleClickOutAlcool = this.handleClickOutAlcool.bind(this);
{/* Fonction pour filtre Tabac */}
this.handleChangeTabac = this.handleChangeTabac.bind(this);
this.handleClickInTabac = this.handleClickInTabac.bind(this);
this.handleClickOutTabac = this.handleClickOutTabac.bind(this);
{/* Fonction pour filtre Religion */}
this.handleChangeReligion = this.handleChangeReligion.bind(this);
this.handleClickInReligion = this.handleClickInReligion.bind(this);
this.handleClickOutReligion = this.handleClickOutReligion.bind(this);
{/* Fonction pour filtre Astrologie */}
this.handleChangeAstrologie = this.handleChangeAstrologie.bind(this);
this.handleClickInAstrologie = this.handleClickInAstrologie.bind(this);
this.handleClickOutAstrologie = this.handleClickOutAstrologie.bind(this);
{/* Fonction pour filtre Animaux */}
this.handleChangeAnimaux = this.handleChangeAnimaux.bind(this);
this.handleClickInAnimaux = this.handleClickInAnimaux.bind(this);
this.handleClickOutAnimaux = this.handleClickOutAnimaux.bind(this);
{/* Fonction pour filtre Actif */}
this.handleChangeActif = this.handleChangeActif.bind(this);

   }
    inputChange(event) {
        event.preventDefault();
        /* Mise à jour des valeurs des inputs */
        const { name, value } = event.target;
        this.setState({
          [name]: value
        })
      }
    handleChange(event){
      this.setState({
        [event.target.name]: event.target.checked 
     })
    }
   /* Fonction pour filtre ETUDE */
    handleClickInEtude(event) {
      this.setState({showFiltreEtude: true});
    }

    handleClickOutEtude(event) {
      this.setState({showFiltreEtude: false});
    }
    handleChangeEtude(event) {
      this.setState({isChecked: !this.state.isChecked});
      const num = event.target.value
       if (this.state.TabEtudes[num].value===1){this.state.TabEtudes[num].value=0;}
       else if (this.state.TabEtudes[num].value===0){this.state.TabEtudes[num].value=1;}
       console.log(this.state.TabEtudes)
       }
   /* Fonction pour filtre SPORT */
    handleClickInSport(event) {
      this.setState({showFiltreSport: true});
    }

    handleClickOutSport(event) {
      this.setState({showFiltreSport: false});
    }
    handleChangeSport(event) {
      this.setState({isChecked: !this.state.isChecked});
      const num = event.target.value
       if (this.state.TabSport[num].value===1){this.state.TabSport[num].value=0;}
       else if (this.state.TabSport[num].value===0){this.state.TabSport[num].value=1;}
       console.log(this.state.TabSport)
       }
   /* Fonction pour filtre Yeux */
    handleClickInYeux(event) {
      this.setState({showFiltreYeux: true});
    }

    handleClickOutYeux(event) {
      this.setState({showFiltreYeux: false});
    }
    handleChangeYeux(event) {
      this.setState({isChecked: !this.state.isChecked});
      const num = event.target.value
       if (this.state.TabYeux[num].value===1){this.state.TabYeux[num].value=0;}
       else if (this.state.TabYeux[num].value===0){this.state.TabYeux[num].value=1;}
       console.log(this.state.TabYeux)
       }
   /* Fonction pour filtre Cheveux */
    handleClickInCheveux(event) {
      this.setState({showFiltreCheveux: true});
    }

    handleClickOutCheveux(event) {
      this.setState({showFiltreCheveux: false});
    }
    handleChangeCheveux(event) {
      this.setState({isChecked: !this.state.isChecked});
      const num = event.target.value
       if (this.state.TabCheveux[num].value===1){this.state.TabCheveux[num].value=0;}
       else if (this.state.TabCheveux[num].value===0){this.state.TabCheveux[num].value=1;}
       console.log(this.state.TabCheveux)
       }
   /* Fonction pour filtre Alcool */
    handleClickInAlcool(event) {
      this.setState({showFiltreAlcool: true});
    }

    handleClickOutAlcool(event) {
      this.setState({showFiltreAlcool: false});
    }
    handleChangeAlcool(event) {
      this.setState({isChecked: !this.state.isChecked});
      const num = event.target.value
       if (this.state.TabAlcool[num].value===1){this.state.TabAlcool[num].value=0;}
       else if (this.state.TabAlcool[num].value===0){this.state.TabAlcool[num].value=1;}
       console.log(this.state.TabAlcool)
       }
   /* Fonction pour filtre Tabac */
    handleClickInTabac(event) {
      this.setState({showFiltreTabac: true});
    }

    handleClickOutTabac(event) {
      this.setState({showFiltreTabac: false});
    }
    handleChangeTabac(event) {
      this.setState({isChecked: !this.state.isChecked});
      const num = event.target.value
       if (this.state.TabTabac[num].value===1){this.state.TabTabac[num].value=0;}
       else if (this.state.TabTabac[num].value===0){this.state.TabTabac[num].value=1;}
       console.log(this.state.TabTabac)
       }
   /* Fonction pour filtre Religion */
    handleClickInReligion(event) {
      this.setState({showFiltreReligion: true});
    }

    handleClickOutReligion(event) {
      this.setState({showFiltreReligion: false});
    }
    handleChangeReligion(event) {
      this.setState({isChecked: !this.state.isChecked});
      const num = event.target.value
       if (this.state.TabReligion[num].value===1){this.state.TabReligion[num].value=0;}
       else if (this.state.TabReligion[num].value===0){this.state.TabReligion[num].value=1;}
       console.log(this.state.TabReligion)
       }
   /* Fonction pour filtre Astrologie */
    handleClickInAstrologie(event) {
      this.setState({showFiltreAstrologie: true});
    }

    handleClickOutAstrologie(event) {
      this.setState({showFiltreAstrologie: false});
    }
    handleChangeAstrologie(event) {
      this.setState({isChecked: !this.state.isChecked});
      const num = event.target.value
       if (this.state.TabAstrologie[num].value===1){this.state.TabAstrologie[num].value=0;}
       else if (this.state.TabAstrologie[num].value===0){this.state.TabAstrologie[num].value=1;}
       console.log(this.state.TabAstrologie)
       }  
   /* Fonction pour filtre Animaux */
    handleClickInAnimaux(event) {
      this.setState({showFiltreAnimaux: true});
    }

    handleClickOutAnimaux(event) {
      this.setState({showFiltreAnimaux: false});
    }
    handleChangeAnimaux(event) {
      this.setState({isChecked: !this.state.isChecked});
      const num = event.target.value
       if (this.state.TabAnimaux[num].value===1){this.state.TabAnimaux[num].value=0;}
       else if (this.state.TabAnimaux[num].value===0){this.state.TabAnimaux[num].value=1;}
       console.log(this.state.TabAnimaux)
       }  
   /* Fonction pour filtre Actif */
      handleChangeActif(event) {
        this.setState({
          Actif: event.target.value
        });
      }                          
    render(){
      return(
        <div>
          {/* Formulaire des Filtres de la personne' */}
          <form >
            <br/>
            <br/>
            <br/>
                {/* Voir Uniquement des personnes vérifier */}
                <div>
                <FormGroup row>
                  <FormControlLabel
                  labelPlacement ='start'
                  label ="Voir seulement des profils vérifié :"
                  control={<Switch checked={this.state.checkedA} onChange={event => this.handleChange(event)} name="checkedA" />}
                  />
                  </FormGroup>
                  </div>

                {/* Filtre Etude */}
                {this.state.showFiltreEtude===false && <div><label htmlFor="Etude" >Etudes</label> <button onClick={() => this.handleClickInEtude()}>Ajouter ce filtre</button></div>}
                {this.state.showFiltreEtude===true && <div >
                      <label htmlFor="Etude">Vous ne verrez plus les profils ayant les préférences décochés</label>
                      <div >
                        <label htmlFor="lycée">Lycée</label>
                        <input type="checkbox"
                               id="lycée" 
                               name="lycée"
                               value="0"
                               checked={this.state.TabEtudes[0].value===1?true:false}
                               onChange={this.handleChangeEtude}
                        />
                        
                        <label htmlFor="Université">Université</label>
                        <input type="checkbox"
                               id="Université" 
                               name="Université"
                               value="1"
                               checked={this.state.TabEtudes[1].value===1?true:false}
                               onChange={this.handleChangeEtude}

                        />
                        
                        <label htmlFor="ing">Ecole d'Igénieur</label>
                        <input type="checkbox"
                               id="ing" 
                               name="Ecole d'Ingénieur"
                               value="2"
                               checked={this.state.TabEtudes[2].value===1?true:false}
                               onChange={this.handleChangeEtude}
                        />
                                               
                        <label htmlFor="eco">Ecole de commerce</label>
                        <input type="checkbox"
                               id="eco" 
                               name="Ecole de commerce"
                               value="3"
                               checked={this.state.TabEtudes[3].value===1?true:false}
                               onChange={this.handleChangeEtude}
                        />
                        
                        <label htmlFor="sup">Ecole supérieur</label>
                        <input type="checkbox"
                               id="sup" 
                               name="Ecole supérieur"
                               value="4"
                               checked={this.state.TabEtudes[4].value===1?true:false}
                               onChange={this.handleChangeEtude}
                        />
                        
                        <label htmlFor="Reconversion">Reconversion</label>
                        <input type="checkbox"
                               id="Reconversion" 
                               name="Reconversion"
                               value="5"
                               checked={this.state.TabEtudes[5].value===1?true:false}
                               onChange={this.handleChangeEtude}
                        />
                        
                        <label htmlFor="saba">Année sabatique</label>
                        <input type="checkbox"
                               id="saba" 
                               name="Sabatique"
                               value="6"
                               checked={this.state.TabEtudes[6].value===1?true:false}
                               onChange={this.handleChangeEtude}
                        />                                                                
                      </div>
                      <button onClick={() => this.handleClickOutEtude()}>Fermer</button>
                  </div>}
                {/* Filtre Sport */}
                {this.state.showFiltreSport===false && <div><label htmlFor="Sport" >Activités Physique</label> <button onClick={() => this.handleClickInSport()}>Ajouter ce filtre</button></div>}
                {this.state.showFiltreSport===true && <div >
                      <label htmlFor="Sport">Vous ne verrez plus les profils ayant les préférences décochés</label>
                      <div >
                        <label htmlFor="Passionée">Passionée</label>
                        <input type="checkbox"
                               id="Passionée" 
                               name="Passionée"
                               value="0"
                               checked={this.state.TabSport[0].value===1?true:false}
                               onChange={this.handleChangeSport}
                        />
                      
                        <label htmlFor="Régulièrement">Régulièrement</label>
                        <input type="checkbox"
                               id="Régulièrement" 
                               name="Régulièrement"
                               value="1"
                               checked={this.state.TabSport[1].value===1?true:false}
                               onChange={this.handleChangeSport}

                        />
                      
                        <label htmlFor="Parfois">Parfois</label>
                        <input type="checkbox"
                               id="Parfois" 
                               name="Parfois"
                               value="2"
                               checked={this.state.TabSport[2].value===1?true:false}
                               onChange={this.handleChangeSport}
                        />
                                             
                        <label htmlFor="chalet">Une fois au chalet</label>
                        <input type="checkbox"
                               id="chalet" 
                               name="Une fois au chalet"
                               value="3"
                               checked={this.state.TabSport[3].value===1?true:false}
                               onChange={this.handleChangeSport}
                        />
                      
                        <label htmlFor="Jamais">Jamais</label>
                        <input type="checkbox"
                               id="Jamais" 
                               name="Jamais"
                               value="4"
                               checked={this.state.TabSport[4].value===1?true:false}
                               onChange={this.handleChangeSport}
                        />
                                                                               
                      </div>
                      <button onClick={() => this.handleClickOutSport()}>Fermer</button>
                  </div>}
                {/* Filtre Yeux */}
                {this.state.showFiltreYeux===false && <div><label htmlFor="Yeux" >Couleur des Yeux</label> <button onClick={() => this.handleClickInYeux()}>Ajouter ce filtre</button></div>}
                {this.state.showFiltreYeux===true && <div >
                      <label htmlFor="Yeux">Vous ne verrez plus les profils ayant les préférences décochés</label>
                      <div >
                        <label htmlFor="Noir">Noir</label>
                        <input type="checkbox"
                               id="Noir" 
                               name="Noir"
                               value="0"
                               checked={this.state.TabYeux[0].value===1?true:false}
                               onChange={this.handleChangeYeux}
                        />
                        
                        <label htmlFor="Marron">Marron</label>
                        <input type="checkbox"
                               id="Marron" 
                               name="Marron"
                               value="1"
                               checked={this.state.TabYeux[1].value===1?true:false}
                               onChange={this.handleChangeYeux}

                        />
                        
                        <label htmlFor="Vert">Vert</label>
                        <input type="checkbox"
                               id="Vert" 
                               name="Vert"
                               value="2"
                               checked={this.state.TabYeux[2].value===1?true:false}
                               onChange={this.handleChangeYeux}
                        />
                                               
                        <label htmlFor="Bleu">Bleu</label>
                        <input type="checkbox"
                               id="Bleu" 
                               name="Bleu"
                               value="3"
                               checked={this.state.TabYeux[3].value===1?true:false}
                               onChange={this.handleChangeYeux}
                        />
                        
                        <label htmlFor="Verron">Verron</label>
                        <input type="checkbox"
                               id="Verron" 
                               name="Verron"
                               value="4"
                               checked={this.state.TabYeux[4].value===1?true:false}
                               onChange={this.handleChangeYeux}
                        />
                        <label htmlFor="Autre">Autre</label>
                        <input type="checkbox"
                               id="Autre" 
                               name="Autre"
                               value="5"
                               checked={this.state.TabYeux[5].value===1?true:false}
                               onChange={this.handleChangeYeux}
                        />                                                                               
                      </div>
                      <button onClick={() => this.handleClickOutYeux()}>Fermer</button>
                  </div>}
                {/* Filtre Cheveux */}
                {this.state.showFiltreCheveux===false && <div><label htmlFor="Cheveux" >Couleur des Cheveux</label> <button onClick={() => this.handleClickInCheveux()}>Ajouter ce filtre</button></div>}
                {this.state.showFiltreCheveux===true && <div >
                      <label htmlFor="Cheveux">Vous ne verrez plus les profils ayant les préférences décochés</label>
                      <div >
                        <label htmlFor="Noir">Noir</label>
                        <input type="checkbox"
                               id="Noir" 
                               name="Noir"
                               value="0"
                               checked={this.state.TabCheveux[0].value===1?true:false}
                               onChange={this.handleChangeCheveux}
                        />
                        
                        <label htmlFor="Brun">Brun</label>
                        <input type="checkbox"
                               id="Brun" 
                               name="Brun"
                               value="1"
                               checked={this.state.TabCheveux[1].value===1?true:false}
                               onChange={this.handleChangeCheveux}

                        />
                        
                        <label htmlFor="Auburn">Auburn</label>
                        <input type="checkbox"
                               id="Auburn" 
                               name="Auburn"
                               value="2"
                               checked={this.state.TabCheveux[2].value===1?true:false}
                               onChange={this.handleChangeCheveux}
                        />
                                               
                        <label htmlFor="Châtain">Châtain</label>
                        <input type="checkbox"
                               id="Châtain" 
                               name="Châtain"
                               value="3"
                               checked={this.state.TabCheveux[3].value===1?true:false}
                               onChange={this.handleChangeCheveux}
                        />
                        
                        <label htmlFor="Roux">Roux</label>
                        <input type="checkbox"
                               id="Roux" 
                               name="Roux"
                               value="4"
                               checked={this.state.TabCheveux[4].value===1?true:false}
                               onChange={this.handleChangeCheveux}
                        />
                        <label htmlFor="Blond">Blond</label>
                        <input type="checkbox"
                               id="Blond" 
                               name="Blond"
                               value="5"
                               checked={this.state.TabCheveux[5].value===1?true:false}
                               onChange={this.handleChangeCheveux}
                        />  
                        <label htmlFor="Blond">Blond</label>
                        <input type="checkbox"
                               id="Blond" 
                               name="Blond"
                               value="6"
                               checked={this.state.TabCheveux[6].value===1?true:false}
                               onChange={this.handleChangeCheveux}
                        />
                        <label htmlFor="Autre">Autre</label>
                        <input type="checkbox"
                               id="Autre" 
                               name="Autre"
                               value="6"
                               checked={this.state.TabCheveux[6].value===1?true:false}
                               onChange={this.handleChangeCheveux}
                        />                                                    
                      </div>
                      <button onClick={() => this.handleClickOutCheveux()}>Fermer</button>
                  </div>}
                {/* Filtre Alcool */}
                {this.state.showFiltreAlcool===false && <div><label htmlFor="Alcool" >Alcool</label> <button onClick={() => this.handleClickInAlcool()}>Ajouter ce filtre</button></div>}
                {this.state.showFiltreAlcool===true && <div >
                      <label htmlFor="Alcool">Vous ne verrez plus les profils ayant les préférences décochés</label>
                      <div >
                        <label htmlFor="Tous les jours">Tous les jours</label>
                        <input type="checkbox"
                               id="Tous les jours" 
                               name="Tous les jours"
                               value="0"
                               checked={this.state.TabAlcool[0].value===1?true:false}
                               onChange={this.handleChangeAlcool}
                        />
                      
                        <label htmlFor="Régulièrement">Régulièrement</label>
                        <input type="checkbox"
                               id="Régulièrement" 
                               name="Régulièrement"
                               value="1"
                               checked={this.state.TabAlcool[1].value===1?true:false}
                               onChange={this.handleChangeAlcool}

                        />
                      
                        <label htmlFor="A l'occasion">A l'occasion</label>
                        <input type="checkbox"
                               id="A l'occasion" 
                               name="A l'occasion"
                               value="2"
                               checked={this.state.TabAlcool[2].value===1?true:false}
                               onChange={this.handleChangeAlcool}
                        />
                                             
                      
                        <label htmlFor="Jamais">Jamais</label>
                        <input type="checkbox"
                               id="Jamais" 
                               name="Jamais"
                               value="3"
                               checked={this.state.TabAlcool[3].value===1?true:false}
                               onChange={this.handleChangeAlcool}
                        />
                                                                               
                      </div>
                      <button onClick={() => this.handleClickOutAlcool()}>Fermer</button>
                  </div>}
                {/* Filtre Tabac */}
                {this.state.showFiltreTabac===false && <div><label htmlFor="Tabac" >Tabac</label> <button onClick={() => this.handleClickInTabac()}>Ajouter ce filtre</button></div>}
                {this.state.showFiltreTabac===true && <div >
                      <label htmlFor="Tabac">Vous ne verrez plus les profils ayant les préférences décochés</label>
                      <div >              
                        <label htmlFor="Fréquemment">Fréquemment</label>
                        <input type="checkbox"
                               id="Fréquemment" 
                               name="Fréquemment"
                               value="1"
                               checked={this.state.TabTabac[0].value===1?true:false}
                               onChange={this.handleChangeTabac}

                        />
                      
                        <label htmlFor="A l'occasion">A l'occasion</label>
                        <input type="checkbox"
                               id="A l'occasion" 
                               name="A l'occasion"
                               value="2"
                               checked={this.state.TabTabac[1].value===1?true:false}
                               onChange={this.handleChangeTabac}
                        />
                                             
                      
                        <label htmlFor="Jamais">Jamais</label>
                        <input type="checkbox"
                               id="Jamais" 
                               name="Jamais"
                               value="3"
                               checked={this.state.TabTabac[2].value===1?true:false}
                               onChange={this.handleChangeTabac}
                        />
                                                                               
                      </div>
                      <button onClick={() => this.handleClickOutTabac()}>Fermer</button>
                  </div>}
                {/* Filtre Religion */}
                {this.state.showFiltreReligion===false && <div><label htmlFor="Religion" >Religion</label> <button onClick={() => this.handleClickInReligion()}>Ajouter ce filtre</button></div>}
                {this.state.showFiltreReligion===true && <div >
                      <label htmlFor="Religion">Vous ne verrez plus les profils ayant les préférences décochés</label>
                      <div >
                        <label htmlFor="Agnosticisme">Agnosticisme</label>
                        <input type="checkbox"
                               id="Agnosticisme" 
                               name="Agnosticisme"
                               value="0"
                               checked={this.state.TabReligion[0].value===1?true:false}
                               onChange={this.handleChangeReligion}
                        />
                        
                        <label htmlFor="Athéisme">Athéisme</label>
                        <input type="checkbox"
                               id="Athéisme" 
                               name="Athéisme"
                               value="1"
                               checked={this.state.TabReligion[1].value===1?true:false}
                               onChange={this.handleChangeReligion}

                        />
                        
                        <label htmlFor="Bouddhisme">Bouddhisme</label>
                        <input type="checkbox"
                               id="Bouddhisme" 
                               name="Bouddhisme"
                               value="2"
                               checked={this.state.TabReligion[2].value===1?true:false}
                               onChange={this.handleChangeReligion}
                        />
                                               
                        <label htmlFor="Christianisme">Christianisme</label>
                        <input type="checkbox"
                               id="Christianisme" 
                               name="Christianisme"
                               value="3"
                               checked={this.state.TabReligion[3].value===1?true:false}
                               onChange={this.handleChangeReligion}
                        />
                        
                        <label htmlFor="Hindouisme">Hindouisme</label>
                        <input type="checkbox"
                               id="Hindouisme" 
                               name="Hindouisme"
                               value="4"
                               checked={this.state.TabReligion[4].value===1?true:false}
                               onChange={this.handleChangeReligion}
                        />
                        <label htmlFor="Jaïnisme">Jaïnisme</label>
                        <input type="checkbox"
                               id="Jaïnisme" 
                               name="Jaïnisme"
                               value="5"
                               checked={this.state.TabReligion[5].value===1?true:false}
                               onChange={this.handleChangeReligion}
                        />  
                        <label htmlFor="Judaïsme">Judaïsme</label>
                        <input type="checkbox"
                               id="Judaïsme" 
                               name="Judaïsme"
                               value="6"
                               checked={this.state.TabReligion[6].value===1?true:false}
                               onChange={this.handleChangeReligion}
                        />
                        <label htmlFor="Islam">Islam</label>
                        <input type="checkbox"
                               id="Islam" 
                               name="Islam"
                               value="7"
                               checked={this.state.TabReligion[7].value===1?true:false}
                               onChange={this.handleChangeReligion}
                        />
                        <label htmlFor="Zoroastrisme">Zoroastrisme</label>
                        <input type="checkbox"
                               id="Zoroastrisme" 
                               name="Zoroastrisme"
                               value="8"
                               checked={this.state.TabReligion[8].value===1?true:false}
                               onChange={this.handleChangeReligion}
                        />                                                                             
                      
                        <label htmlFor="Sikhisme">Sikhisme</label>
                        <input type="checkbox"
                               id="Sikhisme" 
                               name="Sikhisme"
                               value="9"
                               checked={this.state.TabReligion[9].value===1?true:false}
                               onChange={this.handleChangeReligion}
                        /> 
                        <label htmlFor="Spiritualité">Spiritualité</label>
                        <input type="checkbox"
                               id="Spiritualité" 
                               name="Spiritualité"
                               value="10"
                               checked={this.state.TabReligion[10].value===1?true:false}
                               onChange={this.handleChangeReligion}
                        />
                        <label htmlFor="Autre">Autre</label>
                        <input type="checkbox"
                               id="Autre" 
                               name="Autre"
                               value="11"
                               checked={this.state.TabReligion[11].value===1?true:false}
                               onChange={this.handleChangeReligion}
                        />                                                  

                      </div>
                      <button onClick={() => this.handleClickOutReligion()}>Fermer</button>
                  </div>}
                {/* Filtre Astrologie */}
                {this.state.showFiltreAstrologie===false && <div><label htmlFor="Astrologie" >Astrologie</label> <button onClick={() => this.handleClickInAstrologie()}>Ajouter ce filtre</button></div>}
                {this.state.showFiltreAstrologie===true && <div >
                      <label htmlFor="Astrologie">Vous ne verrez plus les profils ayant les préférences décochés</label>
                      <div >
                        <label htmlFor="Verseau">Verseau</label>
                        <input type="checkbox"
                               id="Verseau" 
                               name="Verseau"
                               value="0"
                               checked={this.state.TabAstrologie[0].value===1?true:false}
                               onChange={this.handleChangeAstrologie}
                        />
                        
                        <label htmlFor="Poissons">Poissons</label>
                        <input type="checkbox"
                               id="Poissons" 
                               name="Poissons"
                               value="1"
                               checked={this.state.TabAstrologie[1].value===1?true:false}
                               onChange={this.handleChangeAstrologie}

                        />
                        
                        <label htmlFor="Bélier">Bélier</label>
                        <input type="checkbox"
                               id="Bélier" 
                               name="Bélier"
                               value="2"
                               checked={this.state.TabAstrologie[2].value===1?true:false}
                               onChange={this.handleChangeAstrologie}
                        />
                                               
                        <label htmlFor="Taureau">Taureau</label>
                        <input type="checkbox"
                               id="Taureau" 
                               name="Taureau"
                               value="3"
                               checked={this.state.TabAstrologie[3].value===1?true:false}
                               onChange={this.handleChangeAstrologie}
                        />
                        
                        <label htmlFor="Gémeaux">Gémeaux</label>
                        <input type="checkbox"
                               id="Gémeaux" 
                               name="Gémeaux"
                               value="4"
                               checked={this.state.TabAstrologie[4].value===1?true:false}
                               onChange={this.handleChangeAstrologie}
                        />
                        <label htmlFor="Cancer">Cancer</label>
                        <input type="checkbox"
                               id="Cancer" 
                               name="Cancer"
                               value="5"
                               checked={this.state.TabAstrologie[5].value===1?true:false}
                               onChange={this.handleChangeAstrologie}
                        />  
                        <label htmlFor="Lion">Lion</label>
                        <input type="checkbox"
                               id="Lion" 
                               name="Lion"
                               value="6"
                               checked={this.state.TabAstrologie[6].value===1?true:false}
                               onChange={this.handleChangeAstrologie}
                        />
                        <label htmlFor="Vierge">Vierge</label>
                        <input type="checkbox"
                               id="Vierge" 
                               name="Vierge"
                               value="7"
                               checked={this.state.TabAstrologie[7].value===1?true:false}
                               onChange={this.handleChangeAstrologie}
                        />
                        <label htmlFor="Scorpion">Scorpion</label>
                        <input type="checkbox"
                               id="Scorpion" 
                               name="Scorpion"
                               value="8"
                               checked={this.state.TabAstrologie[8].value===1?true:false}
                               onChange={this.handleChangeAstrologie}
                        />                                                                             
                      
                        <label htmlFor="Sagittaire">Sagittaire</label>
                        <input type="checkbox"
                               id="Sagittaire" 
                               name="Sagittaire"
                               value="9"
                               checked={this.state.TabAstrologie[9].value===1?true:false}
                               onChange={this.handleChangeAstrologie}
                        /> 
                        <label htmlFor="Capricorne">Capricorne</label>
                        <input type="checkbox"
                               id="Capricorne" 
                               name="Capricorne"
                               value="10"
                               checked={this.state.TabAstrologie[10].value===1?true:false}
                               onChange={this.handleChangeAstrologie}
                        />
                        <label htmlFor="Balance">Balance</label>
                        <input type="checkbox"
                               id="Balance" 
                               name="Balance"
                               value="11"
                               checked={this.state.TabAstrologie[11].value===1?true:false}
                               onChange={this.handleChangeAstrologie}
                        />                                                  

                      </div>
                      <button onClick={() => this.handleClickOutAstrologie()}>Fermer</button>
                  </div>}
                  {/* Filtre Animaux */}
                {this.state.showFiltreAnimaux===false && <div><label htmlFor="Animaux" >Animaux</label> <button onClick={() => this.handleClickInAnimaux()}>Ajouter ce filtre</button></div>}
                {this.state.showFiltreAnimaux===true && <div >
                      <label htmlFor="Animaux">Vous ne verrez plus les profils ayant les préférences décochés</label>
                      <div >
                        <label htmlFor="Chiens">Chiens</label>
                        <input type="checkbox"
                               id="Chiens" 
                               name="Chiens"
                               value="0"
                               checked={this.state.TabAnimaux[0].value===1?true:false}
                               onChange={this.handleChangeAnimaux}
                        />
                        
                        <label htmlFor="Chats">Chats</label>
                        <input type="checkbox"
                               id="Chats" 
                               name="Chats"
                               value="1"
                               checked={this.state.TabAnimaux[1].value===1?true:false}
                               onChange={this.handleChangeAnimaux}

                        />
                        
                        <label htmlFor="Beaucoup">Beaucoup</label>
                        <input type="checkbox"
                               id="Beaucoup" 
                               name="Beaucoup"
                               value="2"
                               checked={this.state.TabAnimaux[2].value===1?true:false}
                               onChange={this.handleChangeAnimaux}
                        />
                                               
                        <label htmlFor="Autres">Autres</label>
                        <input type="checkbox"
                               id="Autres" 
                               name="Autres"
                               value="3"
                               checked={this.state.TabAnimaux[3].value===1?true:false}
                               onChange={this.handleChangeAnimaux}
                        />
                        
                        <label htmlFor="Aucun">Aucun</label>
                        <input type="checkbox"
                               id="Aucun" 
                               name="Aucun"
                               value="4"
                               checked={this.state.TabAnimaux[4].value===1?true:false}
                               onChange={this.handleChangeAnimaux}
                        />
                        <label htmlFor="Allergique">Allergique</label>
                        <input type="checkbox"
                               id="Allergique" 
                               name="Allergique"
                               value="5"
                               checked={this.state.TabAnimaux[5].value===1?true:false}
                               onChange={this.handleChangeAnimaux}
                        />  

                      </div>
                      <button onClick={() => this.handleClickOutAnimaux()}>Fermer</button>
                  </div>}

              {/*--------------------------Radio button-------------------------- */}
            <div className="input-group">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="Filtre Actif">Filtre Actif :</label>
              </div> 
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="EtudesActif">Etudes</label>
                <input 
                  className="form-check-input"
                  type="radio"
                  name="EtudesActif"
                  id="EtudesActif"
                  value="Etudes"
                  checked={this.state.Actif==='Etudes'}
                  onChange={this.handleChangeActif}
                  />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="SportActif">Activités Physique</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="SportActif" 
                  id="SportActif" 
                  value="Activités Physique"
                  checked={this.state.Actif==='Activités Physique'}
                  onChange={this.handleChangeActif}
                  />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="YeuxActif">Yeux</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="YeuxActif" 
                  id="YeuxActif" 
                  value="Yeux" 
                  checked={this.state.Actif==='Yeux'}
                  onChange={this.handleChangeActif}
                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="CheveuxActif">Cheveux</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="CheveuxActif" 
                  id="CheveuxActif" 
                  value="Cheveux" 
                  checked={this.state.Actif==='Cheveux'}
                  onChange={this.handleChangeActif}
                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="AlcoolActif">Alcool</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="AlcoolActif" 
                  id="AlcoolActif" 
                  value="Alcool" 
                  checked={this.state.Actif==='Alcool'}
                  onChange={this.handleChangeActif}
                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="TabacActif">Tabac</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="TabacActif" 
                  id="TabacActif" 
                  value="Tabac" 
                  checked={this.state.Actif==='Tabac'}
                  onChange={this.handleChangeActif}
                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="ReligionActif">Religion</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="ReligionActif" 
                  id="ReligionActif" 
                  value="Religion" 
                  checked={this.state.Actif==='Religion'}
                  onChange={this.handleChangeActif}
                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="AstrologieActif">Astrologie</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="AstrologieActif" 
                  id="AstrologieActif" 
                  value="Astrologie" 
                  checked={this.state.Actif==='Astrologie'}
                  onChange={this.handleChangeActif}
                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="AnimauxActif">Animaux</label>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="AnimauxActif" 
                  id="AnimauxActif" 
                  value="Animaux" 
                  checked={this.state.Actif==='Animaux'}
                  onChange={this.handleChangeActif}
                />
              </div>
            </div>
            <br/>
              {/*--------------------------SAVE-------------------------- */}
                <br/>
                <button type="submit">Sauvegarder</button>
              </form>
            </div>
          );
    }
}

export default Filtre;
