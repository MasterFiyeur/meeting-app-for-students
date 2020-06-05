import React, { Component } from 'react';
import {Card, Carousel} from 'react-bootstrap';
import {URL_API} from '../App';

/**
 * Composant de test (Théo)
 * J'utilise ce composant à l'adresse /position afin d'effectuer 
 * des tests pour savoir si il est cohérent de le rajouter
 * lors de l'inscription afin de recup les coordonnées GPS 
 * pour pouvoir calculer la distance entre deux personnes
 * ------------------------------------------------------
 * Si tu veux tester un truc rapido, utilise cette page pour ne 
 * pas tout casser ;)
 */

 //faire image crop

class CardId extends Component{//this.props.id
    constructor(props) {
        super(props);

        this.state = {
          tabImage : [false,false,false,false,false]
        };
      }

    componentDidMount(){
        this.initTabImage();
    }

    initTabImage(){
        const axios = require('axios');  //Requêtes HTTP
        const url = URL_API+'getPreferenceCard.php?id='+this.props.id;
          axios.get(url)
          .then(res => {
            console.log(res.data);
            this.setState({
                tabImage:[
                    res.data.tabImage[0],
                    res.data.tabImage[1],
                    res.data.tabImage[2],
                    res.data.tabImage[3],
                    res.data.tabImage[4]
                ]
            })
          })
          .catch(err => {
            console.log(err);
          });
    }

    render(){
      return(
        <div>
          <h2>Carte de {this.props.id}</h2>
          <Card style={{width: "350px",borderRadius:"15px"}}>
          <Carousel>
                {(!this.state.tabImage[0] && 
                !this.state.tabImage[1] && 
                !this.state.tabImage[2] &&
                !this.state.tabImage[3] &&
                !this.state.tabImage[4]) &&
                <Carousel.Item>
                <img
                    style={{borderTopRightRadius:"15px",borderTopLeftRadius:"15px"}}
                    className="d-block w-100"
                    src="https://projetsiteeisti.yj.fr/imageProfil/0.png"
                    alt="Pas d'image de profil"
                />
                </Carousel.Item>
                }{this.state.tabImage[0] && 
                    <Carousel.Item>
                        <img
                        style={{borderTopRightRadius:"15px",borderTopLeftRadius:"15px"}}
                        className="d-block w-100"
                        src={"https://projetsiteeisti.yj.fr/imageProfil/"+this.props.id+"-1.png"}
                        alt="Profile 1"
                        />
                    </Carousel.Item>
                }{this.state.tabImage[1] && 
                    <Carousel.Item>
                        <img
                        style={{borderTopRightRadius:"15px",borderTopLeftRadius:"15px"}}
                        className="d-block w-100"
                        src={"https://projetsiteeisti.yj.fr/imageProfil/"+this.props.id+"-2.png"}
                        alt="Profile 2"
                        />
                    </Carousel.Item>
                }{this.state.tabImage[2] && 
                    <Carousel.Item>
                        <img
                        style={{borderTopRightRadius:"15px",borderTopLeftRadius:"15px"}}
                        className="d-block w-100"
                        src={"https://projetsiteeisti.yj.fr/imageProfil/"+this.props.id+"-3.png"}
                        alt="Profile 3"
                        />
                    </Carousel.Item>
                }{this.state.tabImage[3] && 
                    <Carousel.Item>
                        <img
                        style={{borderTopRightRadius:"15px",borderTopLeftRadius:"15px"}}
                        className="d-block w-100"
                        src={"https://projetsiteeisti.yj.fr/imageProfil/"+this.props.id+"-4.png"}
                        alt="Profile 4"
                        />
                    </Carousel.Item>
                }{this.state.tabImage[4] && 
                    <Carousel.Item>
                        <img
                        style={{borderTopRightRadius:"15px",borderTopLeftRadius:"15px"}}
                        className="d-block w-100"
                        src={"https://projetsiteeisti.yj.fr/imageProfil/"+this.props.id+"-5.png"}
                        alt="Profile 5"
                        />
                    </Carousel.Item>
                }
            </Carousel>
            <Card.Body style={{overflowY: "scroll",height:"25vh"}}>
                {/* Ici mettre bio et certaines caractéristiques */}
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                </Card.Text>
            </Card.Body>
        </Card>
     </div>
     );
    }
}

export default CardId;