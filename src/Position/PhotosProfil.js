import React, { Component } from 'react';
import ImageCrop from './CropImage';
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


class PhotosProfil extends Component{
    constructor(props) {
        super(props);

        this.state = {
          userProfilePic: '',
          editor: null,
          scaleValue: 1
        };
    }
    
    setEditorRef = editor => this.setState({ editor })
    
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
        if(fileChangeEvent.target.files[0]!==undefined){
            const file = fileChangeEvent.target.files[0];
            const { type } = file;
            if ((type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg'))) {
                this.setState({selectedImage: fileChangeEvent.target.files[0]});
            }
        }
    }

    onCrop = () => {
        const {editor} = this.state;
        if(editor !=null){
            const url = editor.getImage().toDataURL();
            this.setState({userProfilePic : this.DataURLtoFile(url,"yo.png")});
            //console.log(this.DataURLtoFile(url,"yo.png"));
        }
    }

    sendCard(event){
        event.preventDefault();
        const axios = require('axios');  //Requêtes HTTP
        let formData = new FormData();
        console.log(this.state.userProfilePic);
        formData.append('file',this.state.userProfilePic);

        const url = URL_API+'addProfileImage.php';
          axios.post(url,formData)
          .then(res => {
            console.log("Réponse addProfileImage: "+res.data);
          })
          .catch(err => {
            console.log(err);
          });
        }

    onScaleChange = (scaleValueEvent) => {
        const scaleValue = parseFloat(scaleValueEvent.target.value);
        this.setState({ scaleValue });
    }

    render(){
      return(
        <div style={{width:"30%"}}>
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={this.profileImageChange} />
            <br/>
            <ImageCrop
              imageSrc={this.state.selectedImage}
              setEditorRef={this.setEditorRef}
              onCrop={this.onCrop}
              scaleValue={this.state.scaleValue}
              onScaleChange={this.onScaleChange}
              />
              
            <form onSubmit={event => this.sendCard(event)}>
              {/* Bouton Submit 2 */}
              <button type="submit">Upload</button>
            </form>
        </div>
      );
    }
}

export default PhotosProfil;