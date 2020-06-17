import React, { Component } from 'react';
import '../About.css';
import WilliamAbout from '../images/WilliamAbout.jpg';
import TheoAbout from '../images/TheoAbout.jpg';
import FlorentAbout from '../images/FlorentAbout.png';
//import JulienAbout from '../images/JulienAbout.jpg';

class About extends Component{
    constructor(props) {
        super(props);
      }

    render(){
      return(
      <div  >
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
        <div className="box-About">
        {/* Pour Théo */}
          <div className="card-About">
            <div className="imgBx-About">
                <img src={TheoAbout} alt="images"/>
            </div>
            <div className="details-About">
                <h2>Théo Julien<br/><span>Developpeur Chef</span><span className="description">Un vrai crack ce petit fou va coder jusqu'à 5h du matin s'il le faut. La légende raconte qu'il travaille déjà pour google et que l'EISTI n'est qu'une couverture pour ne pas payer d'impot sur son salaire à 9 chiffres.</span></h2>
            </div>
          </div>
        {/* Pour Willik */}
         <div className="card-About">
           <div className="imgBx-About">
              <img src={WilliamAbout} alt="images"/>
           </div>
           <div className="details-About">
              <h2>William Kaczmarek<br/><span>Developpeur profil</span><span className="description">Jeune disciple et coach sportif du déveloper chef, ce petit BG est très éfficace quand il n'est pas alcoolisé ou en peine de coeur.</span></h2>
            </div>
         </div>
        {/* Pour Florent */}
         <div className="card-About">
           <div className="imgBx-About">
              <img src={FlorentAbout}/>
           </div>
           <div className="details-About">
              <h2>Florent Bednarek<br/><span>Developpeur messagerie</span><span className="description">Un jeune loup solitaire, on ne sait pas trop quand il travaille mais des dinguerie apparaissent de temps en temps. Cet enfant pourrai même égaler les plus grands s'il ne se couchait pas à 20h30.</span></h2>
            </div>
         </div>
        {/* Pour Julien */}
         <div className="card-About">
           <div className="imgBx-About">
              <img src=""/>
           </div>
           <div className="details-About">
              <h2>Julien Richard<br/><span>Graphiste du goulag</span><span className="description">L'adopté du groupe, le vilan petit canrd, la cinquième roue du carrosse. Après des multiples tentatives de la part du disciple de l'enfermer au goulag ce jeune Twittos arrive toujours à s'échapper. </span></h2>
            </div>
         </div>
        </div>
        </div>
      );
    }
}

export default About;