import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {URL_API} from '../App';

import Draggable from './draggableMessagerie'

class ListMessages extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	list : "",
        	message : "",
        	messages :"",
        	x: 100,
        	y: 100,
        }
        this.handleChange = this.handleChange.bind(this);
    	this.sendMessage = this.sendMessage.bind(this);
    }

    _move = (x, y) => this.setState({x, y});

	getMessage(){
		const axios = require('axios');  //Requêtes HTTP
        let formdata = new FormData();
        formdata.append('id',this.props.id);
        formdata.append('id2',this.props.id2);
		const url = URL_API+'getMessages.php';
        axios.post(url,formdata)
        .then(res => {
        	this.setState({list : res.data});
        })
        
        .catch(err => {
            console.log(err);
        });
   		this.affMessage();

	}


	affMessage(){
		let ret = "";
		let messages = this.state.list;
		messages = messages.slice(0,-1);
		let lmessages = messages.split(';');
		ret = lmessages.map(el => <div className={el.split('-')[0] == Cookies.get("ID") ? "message-me" : "message"}>
									<div className="left-m"><strong>{el.split('-')[0]}</strong></div>
									<div className="right-m">{el.split('-')[1]}</div>
								  </div>);
		this.setState({messages : ret})
	}

	

	componentDidMount(){
		  this.interval = setInterval(() => this.getMessage(), 1000);
	}

	handleChange(event) {
		console.log(event.target.value)
  	    this.setState({message: event.target.value});
	}

	componentWillUnmount() {
  		clearInterval(this.interval);
	}
	sendMessage(event){
		event.preventDefault();
		const axios = require('axios');  //Requêtes HTTP
		let config = {
            headers: {
            logginid: Cookies.get("ID")
            }
        }
        let formdata = new FormData();
        formdata.append('id',this.props.id);
        formdata.append('id2',this.props.id2);
        formdata.append('message',this.state.message)
        this.setState({message : ""})
		const url = URL_API+'sendMessage.php';
        axios.post(url,formdata,config)
        .then(res => {
        	console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
	}

	render() {
        const {x, y} = this.state;

		return(

		<Draggable x={x} y={y} onMove={this._move}>
			<div className="message_header">
			salut

			</div>
			<div className="messages">
				

				
						{this.state.messages}
			</div>
			<div className="message_footer">
				<form onSubmit={event => this.sendMessage(event)}>
						<input type="text" autocomplete="off" value={this.state.message} name="message" onChange={this.handleChange} />
						<input type="submit" />
				</form>
			</div>
		</Draggable>



		)
	}


}

export default ListMessages