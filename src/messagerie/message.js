import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {URL_API} from '../App';



class ListMessages extends Component {
	constructor(props) {
        super(props);
    }
	getMessage(){

	}


	render() {
		return(

		<div>
			plop
			{this.props.id}
			{this.props.id2}
		</div>

		)
	}


}

export default ListMessages