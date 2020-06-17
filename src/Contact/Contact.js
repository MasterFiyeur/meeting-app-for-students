import React, { Component } from 'react';
import '../Contact.css';
import WilliamContact from '../images/WilliamContact.jpg';
import TheoContact from '../images/TheoContact.jpg';
import FlorentContact from '../images/FlorentContact.png';
class Contact extends Component{
    constructor(props) {
        super(props);
      }

    render(){
      return(
        <div className="Contact">
          <br/>
          <br/>
          <br/>
          <br/>
          <span className="title-Contact">Nous contacter</span>
           <div class="container">
                <div class="row presentation">
                    <div class="col">
                            <img class="rounded-circle" src={TheoContact} alt="image" width="140" height="140" align="left"/>
                            <div class="description-Contact">
                            <span class="titre-Contact">Théo Julien étudiant de seconde année de cycle préparatoire</span><br/>
                              Developpeur Chef <br/>
                              <b><a href="mailto:theo.julien@eisti.fr" >Email</a></b>
                            </div>
                    </div>
                </div>
              
                <div class="row presentation">
                    <div class="col">
                        <img class="rounded-circle" src={WilliamContact} alt="image" width="140" height="140" align="left"/>
                        <div class="description-Contact">
                        <span class="titre-Contact">William Kaczmarek étudiant de seconde année de cycle préparatoire</span><br/>
                          Developpeur Profil <br/>
                         <b><a href="mailto:william.kaczmarek@eisti.fr" >Email</a></b>
                        </div>
                    </div>
                </div>
                 
                <div class="row presentation">
                  <div class="col">
                    <img class="rounded-circle" src={FlorentContact} alt="image" width="140" height="140" align="left"/>
                    <div class="description-Contact">
                    <span class="titre-Contact">Florent Bednarek étudiant de seconde année de cycle préparatoire</span><br/>
                      Developpeur Messagerie <br/>
                      <b><a href="mailto:florent.bednarek@eisti.fr" >Email</a></b>
                    </div>
                  </div>
                </div>
                <div class="row presentation">
                  <div class="col">
                    <img class="rounded-circle" src="images/canard_raph.jpg" alt="image" width="140" height="140" align="left"/>
                    <div class="description-Contact">
                    <span class="titre-Contact">Julien Richard étudiant de seconde année de cycle préparatoire</span><br/>

                      Designer <br/>
                      <b><a href="mailto:julien.richard@eisti.fr" >Email</a></b>
                    </div>
                  </div>
                </div>
        </div>
        </div>
      );
    }
}

export default Contact;