import React, { Component } from 'react';
import RangeSlider from './Slider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
function FiltrEtude(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
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

this.handleChangeEtude = this.handleChangeEtude.bind(this);
this.handleClickIn = this.handleClickIn.bind(this);
this.handleClickOut = this.handleClickOut.bind(this);
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
    handleClickIn(event) {
      this.setState({showFiltreEtude: true});
    }

    handleClickOut(event) {
      this.setState({showFiltreEtude: false});
    }
    handleChangeEtude(event) {
      this.setState({isChecked: !this.state.isChecked});
      const num = event.target.value
       if (this.state.TabEtudes[num].value===1){this.state.TabEtudes[num].value=0;}
       else if (this.state.TabEtudes[num].value===0){this.state.TabEtudes[num].value=1;}
       console.log(this.state.TabEtudes)
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
                {this.state.showFiltreEtude===false && <button onClick={() => this.handleClickIn()}>Ajouter ce filtre</button>}
                {this.state.showFiltreEtude===true && <div >
                      <label htmlFor="Etude">Etudes</label>
                      <div >
                        <br/>
                        <label htmlFor="lycée">Lycée</label>
                        <input type="checkbox"
                               id="lycée" 
                               name="lycée"
                               value="0"
                               checked={this.state.TabEtudes[0].value===1?true:false}
                               onChange={this.handleChangeEtude}
                               key={this.state.TabEtudes}
                        />
                        <br/>
                        <label htmlFor="Université">Université</label>
                        <input type="checkbox"
                               id="Université" 
                               name="Université"
                               value="1"
                               checked={this.state.TabEtudes[1].value===1?true:false}
                               onChange={this.handleChangeEtude}

                        />
                        <br/>
                        <label htmlFor="ing">Ecole d'Igénieur</label>
                        <input type="checkbox"
                               id="ing" 
                               name="Ecole d'Ingénieur"
                               value="2"
                               checked={this.state.TabEtudes[2].value===1?true:false}
                               onChange={this.handleChangeEtude}
                        />
                        <br/>                       
                        <label htmlFor="eco">Ecole de commerce</label>
                        <input type="checkbox"
                               id="eco" 
                               name="Ecole de commerce"
                               value="3"
                               checked={this.state.TabEtudes[3].value===1?true:false}
                               onChange={this.handleChangeEtude}
                        />
                        <br/>
                        <label htmlFor="sup">Ecole supérieur</label>
                        <input type="checkbox"
                               id="sup" 
                               name="Ecole supérieur"
                               value="4"
                               checked={this.state.TabEtudes[4].value===1?true:false}
                               onChange={this.handleChangeEtude}
                        />
                        <br/>
                        <label htmlFor="Reconversion">Reconversion</label>
                        <input type="checkbox"
                               id="Reconversion" 
                               name="Reconversion"
                               value="5"
                               checked={this.state.TabEtudes[5].value===1?true:false}
                               onChange={this.handleChangeEtude}
                        />
                        <br/>
                        <label htmlFor="saba">Année sabatique</label>
                        <input type="checkbox"
                               id="saba" 
                               name="Sabatique"
                               value="6"
                               checked={this.state.TabEtudes[6].value===1?true:false}
                               onChange={this.handleChangeEtude}
                        />                                                                
                      </div>
                      <br/>
                      <button onClick={() => this.handleClickOut()}>Fermer</button>
                  </div>}

              {/*--------------------------SAVE-------------------------- */}
                <br/>
                <button type="submit">Sauvegarder</button>
              </form>
            </div>
          );
    }
}

export default Filtre;
