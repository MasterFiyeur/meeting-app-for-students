import React, { Component } from 'react';
import '../Contact.css';
import WilliamContact from '../images/WilliamContact.jpg';
import TheoContact from '../images/TheoContact.jpg';
import FlorentContact from '../images/FlorentContact.png';
import JulienContact from '../images/JulienContact.jpg';

class Contact extends Component{
    constructor(props) {
        super(props);
      }

    render(){
      return(
        <div className="Contact">
          <br />
          <br />
          <br />
          <br />
          <span className="title-Contact">Nous contacter</span>
          <div className="container">
            <div className="row presentation">
              <div className="col">
                <img className="rounded-circle" src={TheoContact} alt="Theo" width="140" height="140" align="left" />
                <div className="description-Contact">
                  <span className="titre-Contact">Théo Julien étudiant de seconde année de cycle préparatoire</span><br />
                  Developpeur Chef <br />
                  <b><a href="mailto:theo.julien@eisti.fr"><i className="fas fa-address-card"></i>  Email</a></b>
                </div>
              </div>
            </div>

            <div className="row presentation">
              <div className="col">
                <img className="rounded-circle" src={WilliamContact} alt="William" width="140" height="140" align="left" />
                <div className="description-Contact">
                  <span className="titre-Contact">William Kaczmarek étudiant de seconde année de cycle
                    préparatoire<i className="fas fa-hand-middle-finger"></i></span><br />
                  Developpeur Profil et indentateur médiocre<br />
                  <b><a href="mailto:william.kaczmarek@eisti.fr"><i className="fas fa-address-card"></i>  Email</a></b>
                </div>
              </div>
            </div>

            <div className="row presentation">
              <div className="col">
                <img className="rounded-circle" src={FlorentContact} alt="Florent" width="140" height="140" align="left" />
                <div className="description-Contact">
                  <span className="titre-Contact">Florent Bednarek étudiant de seconde année de cycle
                    préparatoire</span><br />
                  Developpeur Messagerie <br />
                  <b><a href="mailto:florent.bednarek@eisti.fr"><i className="fas fa-address-card"></i>  Email</a></b>
                </div>
              </div>
            </div>
            <div className="row presentation">
              <div className="col">
                <img className="rounded-circle" src={JulienContact} alt="Julien" width="140" height="140"
                  align="left" />
                <div className="description-Contact">
                  <span className="titre-Contact">Julien Richard étudiant de seconde année de cycle préparatoire</span>
                  <br />
                  Designer 
                  <br />
                  <b><a href="mailto:richardjul@eisti.fr"><i className="fas fa-address-card"></i>  Email</a></b>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default Contact;