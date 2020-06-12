import React, { Component } from 'react';
import {URL_API} from '../App';
import Cookies from 'js-cookie';
import PhotosProfil from '../PhotosProfil/PhotosProfil';


class EditProfilePhoto extends Component{
    constructor(props) {
        super(props);

        this.state = {
          tabImage : [
              false,
              false,
              false,
              false,
              false
          ],
          crop:false
        };
      }

    componentDidMount(){
      this.initTabImage();
    }

    initTabImage(){
      const axios = require('axios');  //Requêtes HTTP
        const url = URL_API+'getPreferenceCard.php?id='+Cookies.get('ID');
          axios.get(url)
          .then(res => {
            this.setState({
                tabImage:[
                    res.data.tabImage[0],
                    res.data.tabImage[1],
                    res.data.tabImage[2],
                    res.data.tabImage[3],
                    res.data.tabImage[4]
                ],
                crop:false
            });
          })
          .catch(err => {
            console.log(err);
          });
    }

    isCropping = (cropp) => {
      this.setState({
        crop:false
      });
      this.initTabImage();
    }

    supprImage(num){
      const axios = require('axios');  //Requêtes HTTP
      let config = {
        headers: {
        logginid: Cookies.get("ID"),
        logginkey: Cookies.get("KEY")
        }
      }
      let formData = new FormData();
        formData.append('number',num);

      const url = URL_API+'delProfileImage.php?id='+Cookies.get('ID');
      axios.post(url,formData,config)
        .then(res => {
          console.log(res.data.deletion);
          this.initTabImage();
        })
        .catch(err => {
          console.log(err);
        });
    }

    render(){
      return(
        <div style={{display:"flex"}}>
            {!(this.state.tabImage[0] || this.state.tabImage[1] || this.state.tabImage[2] || this.state.tabImage[3] || this.state.tabImage[4]) &&
              <div>Vous n'avez pas d'image de profile</div>
            }
            {(this.state.tabImage[0]) &&
            <div>
                <img width="200px" src={"https://projetsiteeisti.yj.fr/imageProfil/"+Cookies.get('ID')+"-1.png"} alt="Profile 1" />
                <br/>
                <button onClick={() => this.supprImage(1)}>Supprimer</button>
            </div>
            }{(this.state.tabImage[1]) &&
            <div>
                <img width="200px" src={"https://projetsiteeisti.yj.fr/imageProfil/"+Cookies.get('ID')+"-2.png"} alt="Profile 2" />
                <br/>
                <button onClick={() => this.supprImage(2)}>Supprimer</button>
            </div>
            }{(this.state.tabImage[2]) &&
            <div>
                <img width="200px" src={"https://projetsiteeisti.yj.fr/imageProfil/"+Cookies.get('ID')+"-3.png"} alt="Profile 3" />
                <br/>
                <button onClick={() => this.supprImage(3)}>Supprimer</button>
            </div>
            }{(this.state.tabImage[3]) &&
            <div>
                <img width="200px" src={"https://projetsiteeisti.yj.fr/imageProfil/"+Cookies.get('ID')+"-4.png"} alt="Profile 4" />
                <br/>
                <button onClick={() => this.supprImage(4)}>Supprimer</button>
            </div>
            }{(this.state.tabImage[4]) &&
            <div>
                <img width="200px" src={"https://projetsiteeisti.yj.fr/imageProfil/"+Cookies.get('ID')+"-5.png"} alt="Profile 5" />
                <br/>
                <button onClick={() => this.supprImage(5)}>Supprimer</button>
            </div>
            }
            {(!(this.state.tabImage[0] && this.state.tabImage[1] && this.state.tabImage[2] && this.state.tabImage[3] && this.state.tabImage[4]) && (!this.state.crop)) &&
              <button onClick={() => this.setState({crop:true})}>Ajouter une photo !</button>
            }
            {this.state.crop &&
            <PhotosProfil isCropping={this.isCropping}/>
            }
        </div>
      );
    }
}

export default EditProfilePhoto;