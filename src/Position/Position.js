//https://api-adresse.data.gouv.fr/search/?q=Cergy&type=municipality&autocomplete=1
import React, { Component } from 'react';
import {URL_API} from '../App';
import CardId from '../CardId/CardId';

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
          <CardId hisId="38" />
        </div>
      );
    }
}

export default Position;