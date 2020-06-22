import React, { Component } from 'react';
import {URL_API} from '../App';
import Cookies from 'js-cookie';


/**
 * Class qui s'occupe de la gestion des carte étudiantes dans la page panel administrateur
 */
class TableauSignal extends Component{
    constructor(props) {
      super(props);

      this.state = {
          tabID: this.props.Tableau
      };
    }

    /**
     * Transformation du tableau d'objet en un tableau html avec le nom, prenom et ID de l'utilisateur
     */
    PropsToTabHTML(){
    let res;
    if(this.props.Tableau!=null && this.props.Tableau.length>0){
        res = this.props.Tableau.map(el => <tr key={el.Id}><td>{el.Prenom}</td><td>{el.Nom}</td><td><button onClick={() => this.alertId(el)}>{el.Id}</button></td></tr>);
        return res;
    }else{
        return(<tr><td colSpan="3">Aucun message signalé</td></tr>);
    }
    }


    /**
     * Rendu du component
     */
    render(){
      return(
        <div style={{marginTop:"20px"}}>
            <h2>Affichage des messages signalés</h2>
            <div style={{display:"flex",justifyContent:"center",marginTop:"3%"}}>
                <div>
                <table style={{border:"thin solid black"}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.PropsToTabHTML()}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
      );
    }
}

export default TableauSignal;