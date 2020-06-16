import React, { Component } from 'react';
import {URL_API} from '../App';
import Cookies from 'js-cookie';

class TableauManage extends Component{
    constructor(props) {
      super(props);

      this.state = {
          tabID: this.props.Tableau,
          Actuel:{Prenom:"",Nom:"",Id:""}
      };
    }

    reset(){
        const axios = require('axios');  //Requêtes HTTP
        const url = URL_API+'getTabCarteEtudiante.php?account=yes';
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
                        Id:el.Id
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

    deleteAccount(){
        const axios = require('axios');  //Requêtes HTTP
        const url = URL_API+'manageAccount.php';
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        let formData = new FormData();
        formData.append('id',this.state.Actuel.Id);
        formData.append('supprCompte',"yes");
        axios.post(url,formData,config)
        .then(res => {
            if(res.data.connected){
                console.log(res.data);
                alert("Compte "+this.state.Actuel.Id+" supprimé !");
                this.reset();
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    certificate(){
        const axios = require('axios');  //Requêtes HTTP
        const url = URL_API+'manageAccount.php';
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        let formData = new FormData();
        formData.append('id',this.state.Actuel.Id);
        formData.append('operation','certif');
        axios.post(url,formData,config)
        .then(res => {
            if(res.data.connected){
                console.log(res.data);
                console.log("Compte "+this.state.Actuel.Id+" certifié !");
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    render(){
      return(
        <div style={{marginTop:"20px"}}>
            <h2>Gestion des comptes</h2>
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
            <button style={{backgroundColor:"#48FF5B"}} onClick={() => this.certificate()}>Certifier</button>
            <button style={{backgroundColor:"#FF5B48"}} onClick={() => this.deleteAccount()}>Supprimer le compte</button>
            </>
            }
        </div>
      );
    }
}

export default TableauManage;