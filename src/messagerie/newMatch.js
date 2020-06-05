import React, { Component } from 'react';
import Cookies from 'js-cookie';

import {URL_API} from '../App';

class NewMatch extends Component{
	constructor(props){
		super(props);
	}
	createMatch(event){
		event.preventDefault();
		const axios = require('axios');  //Requêtes HTTP
		let formdata = new FormData();
		let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
		formdata.append("id2","42");
        const url = URL_API+'newDisc.php';
        axios.post(url,formdata,config)
        .then(res => {
            console.log("Réponse newMatch: "+res.data);
            if(res.data=='1'){
              this.setState({
                alertClass:"alert-primary",
                alertMessage: "discution créé avec succès !",
                etape:1
              });
              this.setState({alertShow: true});
            }else if(res.data == '2'){
            	console.error("vous n'avez pas l'air d'etre connecté");
            }else {
            	console.error('Problème dans le retour de l\'API/newUser.');

            }
          })
        .catch(err => {
            console.log(err);
          });
	}

	render(){
		return(
			<div>
				<button className="btn-accueil" onClick={event => this.createMatch(event)}>NewMatch</button>
			</div>
		)
	}


}

export default NewMatch;