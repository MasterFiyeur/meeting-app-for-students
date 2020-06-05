//https://api-adresse.data.gouv.fr/search/?q=Cergy&type=municipality&autocomplete=1
import React, { Component } from 'react';
import {Card, Carousel} from 'react-bootstrap';
import ImageCrop from './CropImage';
import {URL_API} from '../App';
import PhotosProfil from './PhotosProfil';

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

class Position extends Component{
    constructor(props) {
        super(props);

        this.state = {
          StudentCard: null,
          userProfilePic: '',
          editor: null,
          scaleValue: 1,
          imagefile:null
        };
      }
     
      setEditorRef = editor => this.setState({ editor })

      /**
       * Change la valeur de l'état StudentCard en fonction du fichier sélectionné
       * @param {event} event Fichier sélectionné
       */
      inputChangeStudentCard(event){
        let files = event.target.files;
        let reader = new FileReader();
        if(files[0]!=null){
          console.log(files[0]);
          reader.readAsDataURL(files[0]);
          reader.onload=(e)=>{
            this.setState({
              StudentCard:files[0]
            })
            console.log(this.state.StudentCard);
          }
        }else{
          this.setState({
            StudentCard:null
          })
        }
      }

      DataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      };

      profileImageChange = (fileChangeEvent) => {
        const file = fileChangeEvent.target.files[0];
        const { type } = file;
        if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg'))) {
        } else {
          this.setState({selectedImage: fileChangeEvent.target.files[0]});
        }
      }

      onCrop = () => {
        const {editor} = this.state;
        if(editor !=null){
          const url = editor.getImage().toDataURL();
          this.setState({userProfilePic : url});
          console.log(this.DataURLtoFile(url,"yo.png"));
        }
      }

      onScaleChange = (scaleValueEvent) => {
        const scaleValue = parseFloat(scaleValueEvent.target.value);
        this.setState({ scaleValue });
      }

      /**
       * Envoie de la valeur du champ file au serveur pour faire vérifier
       * la carte étudiante par les modérateurs
       * @param {event} event Action du 2nd form par le bouton Submit
       */
      sendCard(event){
        event.preventDefault();
        const axios = require('axios');  //Requêtes HTTP
        console.log(event);
        let formData = new FormData();
        formData.append('file',this.DataURLtoFile(this.state.userProfilePic,"yo.png"));
        formData.append('email',"julientheo@eisti.eu");

        const url = URL_API+'setCarteEtudiante.php';
          axios.post(url,formData)
          .then(res => {
            console.log("Réponse setCarteEtudiante: "+res.data);
          })
          .catch(err => {
            console.log(err);
          });
        }

    render(){
      return(
        <div>
          <h2>Page de Test #Théo hehe</h2>
          <PhotosProfil />
          {/*<Card style={{width: "30%",borderTopRightRadius:"15px",borderTopLeftRadius:"15px",marginLeft:"30%"}}>
          <Carousel>
              <Carousel.Item>
                <img
                  style={{borderTopRightRadius:"15px",borderTopLeftRadius:"15px"}}
                  className="d-block w-100"
                  src="https://projetsiteeisti.yj.fr/imageCarteEtudiante/38.png"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  style={{borderTopRightRadius:"15px",borderTopLeftRadius:"15px"}}
                  className="d-block w-100"
                  src="https://projetsiteeisti.yj.fr/imageCarteEtudiante/38.png"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  style={{borderTopRightRadius:"15px",borderTopLeftRadius:"15px"}}
                  className="d-block w-100"
                  src="https://projetsiteeisti.yj.fr/imageCarteEtudiante/38.png"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
            <Card.Body style={{overflowY: "scroll",height:"25vh"}}>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </Card.Text>
            </Card.Body>
      </Card>*}
  
            {/*<input type="file" accept="image/png, image/jpeg, image/jpg" onChange={this.profileImageChange} />
            <br/>
            <ImageCrop
              imageSrc={this.state.selectedImage}
              setEditorRef={this.setEditorRef}
              onCrop={this.onCrop}
              scaleValue={this.state.scaleValue}
              onScaleChange={this.onScaleChange}
              />
            <img src={this.state.userProfilePic} />
            <form onSubmit={event => this.sendCard(event)}>
              {/* Bouton Submit 2 *//*}
              <button type="submit">Upload</button>
            </form>*/}
        </div>
      );
    }
}

export default Position;