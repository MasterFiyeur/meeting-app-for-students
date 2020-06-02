import React, { Component } from 'react';

import {URL_API} from '../App';

class NewMatch extends Component{
	constructor(props){
		super(props);
	}
	createMatch(event){
		event.preventDefault();
		const axios = require('axios');  //Requêtes HTTP
		let formdata = new FormData();
		formdata.append("id1","41");
		formdata.append("id2","42");
        const url = URL_API+'newDisc.php';
        axios.post(url,formdata)
        .then(res => {
            console.log("Réponse newUser: "+res.data);
            if(res.data=='1'){
              this.setState({
                alertClass:"alert-primary",
                alertMessage: "discution créé avec succès !",
                etape:1
              });
              this.setState({alertShow: true});
            }else{
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
				<button className="btn btn-danger" onClick={event => this.createMatch(event)}></button>
			</div>
		)
	}


}

export default NewMatch;