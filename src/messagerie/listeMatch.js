import React, { Component } from 'react';
import Cookies from 'js-cookie';

import {URL_API} from '../App';
class ListMatch extends Component {
	constructor(props) {
        super(props);
        this.state = {
        		list : ""
        }
    }


	loadMyMatch(){
		const axios = require('axios');  //Requêtes HTTP
		let config = {
            headers: {
            logginid: Cookies.get("ID")
            }
        }
        let formdata = new FormData();
		const url = URL_API+'nbrMatch.php';
        axios.post(url,formdata,config)
        .then(res => {
        	this.setState({list : res.data});
        })
        
        .catch(err => {
            console.log(err);
        });
	}

	getname(){

	}


	affMatch() {		
		let ret = "";
		let match = this.state.list;
		match = match.slice(0,-1);
		let lmatch = match.split(';');
		ret = lmatch.map(el => <tr style={{border:"solid black 2px",borderRadius : '10px'}}><td>{el.split('-')[0]}</td><td>{el.split('-')[1]}</td></tr>);
		return (ret)
	}

	componentDidMount() {
		this.loadMyMatch()
	}
	render(){
		return(
			<div className="listeMatch" >
				
				
				<table>
					<tbody>
						{this.affMatch()}	
					</tbody>
				</table>
			</div>
		)
	}
}

export default ListMatch;