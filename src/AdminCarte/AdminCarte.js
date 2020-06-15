import React, { Component } from 'react';
import TableauCarteId from './TableauCarteId';
import {URL_API} from '../App';
import Cookies from 'js-cookie';
import TableauManage from './TableauManage';

class AdminCarte extends Component{
    constructor(props) {
      super(props);

      this.state = {
        loaded:false,
        array:null,
        buttonLabel:"Gérer les comptes"
      };
    }

    componentDidMount(){
      this.setPropsTableau();
    }

    updateTab = (newArray) => {
      this.setState({
        array: newArray
      });
    }

    setPropsTableau(){
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
            this.setState({
              array:res.data.tab,
              loaded:true
            });
          }
      })
      .catch(err => {
          console.log(err);
      });
    }

    setComtpeTableau(){
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
            this.setState({
              array:res.data.tab,
              loaded:true
            });
          }
      })
      .catch(err => {
          console.log(err);
      });
    }

    buttonSwap(){
      if(this.state.buttonLabel==="Gérer les comptes"){
        this.setState({
          buttonLabel: "Gérer les certifications"
        });
        this.setComtpeTableau();
      }else{
        this.setState({
          buttonLabel: "Gérer les comptes"
        });
        this.setPropsTableau();
      }
    }

    render(){
      return(
        <div style={{marginTop:"20px"}}>
          <button onClick={() => this.buttonSwap()} style={{height:"70px",width:"200px"}}>{this.state.buttonLabel}</button>
          {(this.state.loaded && this.state.buttonLabel==="Gérer les comptes") && 
          <TableauCarteId Tableau={this.state.array} updateTab={this.updateTab}/>
          }
          {(this.state.loaded && this.state.buttonLabel==="Gérer les certifications") && 
          <TableauManage Tableau={this.state.array} updateTab={this.updateTab}/>
          }
        </div>
      );
    }
}

export default AdminCarte;