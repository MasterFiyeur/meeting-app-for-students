import React, { Component } from 'react';
import {URL_API} from '../App';
import Cookies from 'js-cookie';

class TableauCarteId extends Component{
    constructor(props) {
      super(props);

      this.state = {
          tabID: this.props.Tableau,
          Actuel:{Prenom:"",Nom:"",Id:"",Extension:""}
      };
    }

    reset(){
        const axios = require('axios');  //Requêtes HTTP
        const url = URL_API+'getTabCarteEtudiante.php';
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        axios.get(url,config)
        .then(res => {
            if(res.data.connected){ //Mise à jour de connected si réponse positive 
                console.log(res.data.tab);
                this.props.updateTab(res.data.tab);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    openCarte(){
        window.open("https://projetsiteeisti.yj.fr/imageCarteEtudiante/"+this.state.Actuel.Id+"."+this.state.Actuel.Extension);
    }

    certificate(){
        const axios = require('axios');  //Requêtes HTTP
        const url = URL_API+'setCertif.php?id='+this.state.Actuel.Id+"&img="+this.state.Actuel.Extension;
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        axios.get(url,config)
        .then(res => {
            console.log(res.data);
            if(res.data.connected){ //Mise à jour de connected si réponse positive 
                console.log("Profil certifié ! ");
                this.reset();
            }else{
                console.log("Erreur lors de la certification du profil.");
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    deleteCarte(){
        const axios = require('axios');  //Requêtes HTTP
        const url = URL_API+'delCarteEtudiante.php?id='+this.state.Actuel.Id+"&img="+this.state.Actuel.Extension;
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        axios.get(url,config)
        .then(res => {
            console.log(res.data);
            if(res.data.connected){ //Mise à jour de connected si réponse positive 
                console.log("Carte étudiante supprimée ! ");
                this.reset();
            }else{
                console.log("Erreur lors de la suppression de la carte étudiante.");
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    alertId(el){
        const axios = require('axios');  //Requêtes HTTP
        const url = URL_API+'getExtensionCarte.php?id='+el.Id;
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        axios.get(url,config)
        .then(res => {
            if(res.data.connected){ //Mise à jour de connected si réponse positive 
                this.setState({
                    Actuel:{
                        Prenom:el.Prenom,
                        Nom:el.Nom,
                        Id:el.Id,
                        Extension:res.data.extension
                    }
                });
                console.log(el.Prenom+" "+el.Nom+" sélectionné !");
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    PropsToTabHTML(){
    let res;
    if(this.props.Tableau!=null && this.props.Tableau.length>0){
        res = this.props.Tableau.map(el => <tr key={el.Id}><td>{el.Prenom}</td><td>{el.Nom}</td><td><button onClick={() => this.alertId(el)}>{el.Id}</button></td></tr>);
        return res;
    }else{
        return(<tr><td colSpan="3">Plus de carte à valider</td></tr>)
    }
    }


    render(){
      return(
        <div style={{marginTop:"20px"}}>
            <h2>Gestion des cartes étudiantes</h2>
            <table style={{border:"thin solid black"}}>
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {this.PropsToTabHTML()}
                </tbody>
            </table>
            {this.state.Actuel.Prenom!=="" &&
            <>
            <button onClick={() => this.openCarte()}>Voir carte étudiante</button>
            <button style={{backgroundColor:"#48FF5B"}} onClick={() => this.certificate()}>Certifier</button>
            <button style={{backgroundColor:"#FF5B48"}} onClick={() => this.deleteCarte()}>Re-demander</button>
            </>
            }
        </div>
      );
    }
}

export default TableauCarteId;