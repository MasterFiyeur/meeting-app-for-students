import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";
import {URL_API} from '../App';
import NewMatch from '../messagerie/newMatch';
import ListMatch from '../messagerie/listeMatch';
import CardId from '../CardId/CardId';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Pageprincipale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: true, //true : utilisateur connecté; false : utilisateur non connecté
            pref:false, //Passe à true lorsque l'utilisateur clique sur preference
            tabPersonne:null,
            currentIndex:0,
            loaded:false
        }
      }
    
    /**
     * Page mise à jour
     */
    componentDidMount(){
        /* Vérif des cookies ID et KEY */
        this.loadTableauPersonne();
        this.verifConnexion();
    }

    dislike(){
        const url = URL_API+'addDislike.php?id='+this.state.tabPersonne[this.state.currentIndex].id;
        const axios = require('axios').default;  //Requêtes HTTP
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        axios.get(url,config)
        .then(res => {
            if(res.data.connected){ //Mise à jour de connected si réponse négative
                if(res.data.dislikes!=="echec"){
                    alert("Disliked !");
                }
                console.log(res.data);
            }
        })
        .catch(err => {
            console.log(err);
        });
            this.setState({
                currentIndex:this.state.currentIndex+1
            });
    }

    like(){
        const url = URL_API+'addLike.php?id='+this.state.tabPersonne[this.state.currentIndex].id;
        const axios = require('axios').default;  //Requêtes HTTP
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        axios.get(url,config)
        .then(res => {
            if(res.data.connected){ //Mise à jour de connected si réponse négative
                if(res.data.likes!=="echec"){
                    alert("Liked !");
                }
                console.log(res.data);
            }
        })
        .catch(err => {
            console.log(err);
        });
            this.setState({
                currentIndex:this.state.currentIndex+1
            });
    }

    loadTableauPersonne(){
        const url = URL_API+'getTabPersonne.php';
        const axios = require('axios').default;  //Requêtes HTTP
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        axios.get(url,config)
        .then(res => {
            if(res.data.connected){ //Mise à jour de connected si réponse négative
                this.setState({
                    tabPersonne:res.data.tab,
                    currentIndex:0,
                    loaded:true
                });
                console.log(res.data);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    /**
     * Met à jour l'état connected selon la véracité 
     * du couple (Cookie.get("ID"),Cookie.get("KEY"))
     */
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
            console.log("Connecté ? "+res.data.connect); //Réponse dans la console
            if(!res.data.connect){ //Mise à jour de connected si réponse négative
                this.setState({
                    connected:false
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
        if(!(Cookies.get("ID")>0)){//Si Cookies.get("ID") n'existe pas on se déconnecte
            this.setState({
                connected:false
            })
        }
    }
    
    /**
     * Déconnecte l'utilisateur en changeant l'état connected
     */
    deconnect(){
        //Suppression du token dans la bdd
        const url = URL_API+'delToken.php';
        const axios = require('axios').default;  //Requêtes HTTP
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        axios.get(url,config)
        .then(res => {
            console.log(res.data); //Réponse dans la console
        })
        .catch(err => {
            console.log(err);
        });
        this.setState({
            connected:false
        })
    }

    /**
     * Test le couple (ID,KEY) en 
     * appelant la fonction verifConnexion()
     */
    test(){
        this.verifConnexion();
    }


    /**
     * Rendu
     */
    render(){
        /* Utilisateur redirigé si non connecté */
        if(!this.state.connected){
            Cookies.remove("ID");//Supression du cookie
            Cookies.remove("KEY");//Suppression du cookie
            return (<Redirect to='/'/>); //Renvoi à la page de connexion
        }else if(this.state.pref){
            return (<Redirect to='/preference'/>);//Renvoi à la page des preferences
        }
      return(

        <div className="container-fluid margetop18">
            <div className="row">
                <div className="col-lg">
                    <button 
                    className="btn-accueil" 
                    onClick={() => this.deconnect()}
                    >Déconnexion
                    </button>
                </div>
                <div className="col-lg">
                    <button 
                    className="btn-accueil" 
                    onClick={() => this.test()}
                    >Tester (id,key)
                    </button>
                </div>
                 <div className="col-lg">
                    <NewMatch />
                    <div>
                        <button className="btn btn-danger" ><Link to="/mesmatch">mes match</Link></button>
                    </div>
                </div>
                {(this.state.tabPersonne!==null && this.state.tabPersonne.length > this.state.currentIndex) && 
                    <>
                    <button 
                        className="btn-accueil" 
                        style={{backgroundColor:"#48FF5B",height:"50%"}}
                        onClick={() => this.like()}>
                            Like
                    </button>
                    {(this.state.currentIndex!==null && this.state.loaded) &&
                        <>
                        <CardId hisId={this.state.tabPersonne[this.state.currentIndex].id}/>
                        </>
                    }
                    <button 
                        className="btn-accueil" 
                        style={{backgroundColor:"#FF5B48",height:"50%"}}
                        onClick={() => this.dislike()}>
                            Dislike
                    </button>
                    </>
                }
                {(this.state.tabPersonne!==null && this.state.tabPersonne.length <= this.state.currentIndex) && 
                    <>
                    <button 
                        className="btn-accueil" 
                        style={{backgroundColor:"#48FF5B",height:"50%"}}
                        disabled>
                            Like
                    </button>
                    <Card>
                        <Card.Title>Wow quelle énergie !</Card.Title>
                        <Card.Text>Vous avez épuisé tout notre stock de partenaire</Card.Text>
                        <Card.Text>Revenez plus tard </Card.Text>
                        <Card.Text>
                            <svg className="bi bi-emoji-smile-upside-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm0-1a8 8 0 1 1 0 16A8 8 0 0 1 8 0z"/>
                                <path fillRule="evenodd" d="M4.285 6.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683z"/>
                                <path d="M7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5z"/>
                            </svg>
                        </Card.Text>
                    </Card>
                    <button 
                        className="btn-accueil" 
                        style={{backgroundColor:"#FF5B48",height:"50%"}}
                        disabled>
                            Dislike
                    </button>
                    </>
                }
                <button 
                    className="btn-accueil" 
                    onClick={() => this.setState({pref:true})}>
                        Preferences
                </button>
            </div>
        </div>
      );
    }
}


export default Pageprincipale;

