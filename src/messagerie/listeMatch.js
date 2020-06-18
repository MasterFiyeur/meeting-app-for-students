import React, { Component } from 'react';
import Cookies from 'js-cookie';

import {URL_API} from '../App';
import ListMessages from './message'


class ListMatch extends Component {
	constructor(props) {
        super(props);
        this.state = {
        		list : "",
        		show : 0,
        		id : 0,
        		id2: 0,
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

	handleClick(id,id2){
		this.setState({show : 1});
		this.setState({id : id});
		this.setState({id2 : id2})
	}



	affMatch() {		
		let ret = "";
		let match = this.state.list;
		match = match.slice(0,-1);
		let lmatch = match.split(';');
		ret = lmatch.map(el => <tr style={{border:"solid black 2px",borderRadius : '10px'}} onClick={ () => {this.handleClick(el.split('-')[0],el.split('-')[1])}}>
									<td>{el.split('-')[0]}</td>
									<td>{el.split('-')[1]}</td>
								</tr>);
		return (
				<table>
					<tbody> 
						{ret}
					</tbody>
				</table>
				);
	}

	componentDidMount() {
		this.loadMyMatch()
	}
  	


	render(){
		return(
			
			<div>
				
				<div className="listeMatch" >
					{this.affMatch()}	
				</div>
				{this.state.show === 1 &&
					<ListMessages id={this.state.id} id2={this.state.id2} />
				}
				
			</div>
		)
	}
}

export default ListMatch;