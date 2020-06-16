import React, { Component } from 'react';
import Cookies from 'js-cookie';

import {URL_API} from '../App';

class NewMatch extends Component{
	constructor(props){
		super(props);
	}
	

	render(){
		return(
			<div>
				<button className="btn btn-danger" onClick={event => this.createMatch(event)}>creer un match</button>

			</div>
		)
	}


}

export default NewMatch;