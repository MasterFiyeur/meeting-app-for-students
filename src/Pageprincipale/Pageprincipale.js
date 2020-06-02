import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";
import {URL_API} from '../App';

class Pageprincipale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: true
        }
      }
    
    verifConnexion() {
        /* A executer à chaque fois que l'on veut utiliser l'id :
            this.verifConnexion();
            if(this.state.connected){
                alors on est assuré de l'identité du user
            }*/
        const url = URL_API+'isConnected.php';
        const axios = require('axios').default;  //Requêtes HTTP
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        axios.get(url,config)
        .then(res => {
            console.log("Connecté ? "+res.data.connect);
            if(!res.data.connect){
                this.setState({
                    connected:false
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
        if(!(Cookies.get("ID")>0)){
            this.setState({
                connected:false
            })
        }
    }
    

    deconnect(){
        this.setState({
            connected:false
        })
    }

    test(){
        this.verifConnexion();
    }


    render(){
        /* Utilisateur redirigé si non connecté */
        if(!this.state.connected){
            Cookies.remove("ID");
            Cookies.remove("KEY");
            return (<Redirect to='/'/>);
        }
      return(
        <div>
            <button 
            className="btn btn-danger" 
            onClick={() => this.deconnect()}
            >Déconnexion
            </button>
            <br/>
            <button 
            className="btn btn-danger" 
            onClick={() => this.test()}
            >Tester (id,key)
            </button>
        </div>
      );
    }
}


export default Pageprincipale;

