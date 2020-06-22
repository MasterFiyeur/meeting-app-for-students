import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {URL_API} from '../App';

import Draggable from './draggableMessagerie'
import CardId from '../CardId/CardId';


class ListMessages extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	showP : 0,
			list : "",
			tabIdMess:null,
        	message : "",
        	messages :"",
        	prenom1 : "",
        	prenom2 : "",
        	x: 0,
        	y: 70,
        	unmount : 0,
        }
        this.handleChange = this.handleChange.bind(this);
    	this.sendMessage = this.sendMessage.bind(this);
    	this.dismiss = this.dismiss.bind(this)
    }
	

    isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };
    /*
		envoie l'information au component parent qu'il faut fermer celui ci
		retire les cookies messages
    */
	dismiss() {
  		this.setState({unmount:1});

  		Cookies.remove('m_id1');
  		Cookies.remove('m_id2');
       setTimeout(() => this.props.unmountMe(),1000);
    } 
    _move = (x, y) => this.setState({x, y});

    /*
		recupere les messages d'une discussion donnée et les stock dans une chaine de caractere
    */
	getMessage(){
		const axios = require('axios');  //Requêtes HTTP
        let formdata = new FormData();
        formdata.append('id',this.props.id);
        formdata.append('id2',this.props.id2);
		const url = URL_API+'getMessages.php';
        axios.post(url,formdata)
        .then(res => {
        	this.setState({list : res.data.message,tabIdMess:res.data.idTab});
        })
        
        .catch(err => {
            console.log(err);
        });
   		this.affMessage();

	}

	/*
		Signalement d'un message
    */
   	signal(index) {
		const axios = require('axios');  //Requêtes HTTP
		let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        let formdata = new FormData();
        formdata.append('id',this.props.id);
		formdata.append('id2',this.props.id2);
		formdata.append('num',index);
		const url = URL_API+'addSignalement.php';
        axios.post(url,formdata,config)
        .then(res => {
			console.log(res.data);
			alert("Message signalé !");
        })
        .catch(err => {
            console.log(err);
        });
	}


    /*
		gere l'entrée de texte dans le champ message
    */
	handleChange(event) {
  	    this.setState({message: event.target.value});
	}


    /*
		lors de la fermeture detruit les intervale et crée des cookie si l'utilisateur n'a pas appuyé sur la croix
    */
	componentWillUnmount() {
  		clearInterval(this.interval);
  		clearInterval(this.interval2);
  		clearInterval(this.interval3);
        if (this.isMobileDevice()){return;}
  		if (this.state.unmount == 0 ) {
  			Cookies.set('m_id1',this.props.id);
  			Cookies.set('m_id2',this.props.id2);
  		}
	}


    /*
		envoie le message en entré dans la discussion
    */
	sendMessage(event){
		event.preventDefault();
		if (this.state.message == ""){return}
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



    /*
		recupere le prenom associé a une id donné
    */
	prenom(id){
		const axios = require('axios');  //Requêtes HTTP
        let formdata = new FormData();
        formdata.append('id',id);
		const url = URL_API+'prenom.php';
        axios.post(url,formdata)
        .then(res => {
        	if(id == Cookies.get('ID')){
        		this.setState({prenom1 : res.data});
        	} else {
        		this.setState({prenom2 : res.data});

        	}
        })
        .catch(err => {
            console.log(err);
        });
	}

	prenom2(id){
		if (id == Cookies.get("ID")){return this.state.prenom1}
		else {return this.state.prenom2}
	}

	
    /*
		prepare le JSX pour afficher tout les messages
    */
	affMessage(){
		let ret = "";
		let messages = this.state.list;
		messages = messages.slice(0,-1);
		let lmessages = messages.split(';');
		ret = lmessages.map((el,index) => <div key={index} className={el.split('-')[0] == Cookies.get("ID") ? "message-me" : "message"}>
									<div className="left-m">
										<strong>{this.prenom2(el.split('-')[0])}</strong>
										{el.split('-')[0] !== Cookies.get("ID") && 
										<svg onClick={() => this.signal(this.state.tabIdMess[index])} className="bi bi-exclamation" width="25px" height="25px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  											<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
										</svg>
										}
									</div>
									<div className="right-m">{el.split('-')[1]}</div>
								  </div>);
		this.setState({messages : ret})
	}


    /*
		setup des intervales pour actualiser les messages toute les secondes
    */
	componentDidMount(){
		  this.interval = setInterval(() => this.getMessage(), 1000);
		  this.interval2 = setInterval(() => this.prenom(this.props.id),1000);
		  this.interval3 = setInterval(() => this.prenom(this.props.id2),1000);

	}


	render() {
        const {x, y} = this.state;
        let id;
        if (this.props.id == Cookies.get('ID')){id = this.props.id2} else {id = this.props.id}
		return(

		<Draggable className="draggable" x={x} y={y} onMove={this._move}>
			<div className="message_header">
				<div className="prenom" ><strong>{this.state.prenom2}</strong></div>
				<div className="showprofile" onClick={() => this.setState({showP : 1 - this.state.showP})}>Profile</div>
				<div className="Quit fa fa-times" onClick={this.dismiss}></div>
			</div>
			{ this.state.showP == 1 ? 
				<div className="profilMessage">
				<CardId hisId={id} />
				</div>
				:
				<div><div className="messages">				
					{this.state.list == "" ? <div>aucun message envoyé</div> : this.state.messages}
				</div>
			
				<div className="message_footer">
					<form onSubmit={event => this.sendMessage(event)}>
							<input className="input minput" type="text" autoComplete="off" value={this.state.message} name="message" onChange={this.handleChange} />
							<input className="btn-simple envoyer" type="submit" />
					</form>
				</div></div>
			}
		</Draggable>



		)
	}


}

export default ListMessages