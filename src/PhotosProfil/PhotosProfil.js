import React, { Component } from 'react';
import ImageCrop from './CropImage';
import {URL_API} from '../App';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";

/**
 * Composant qui demande à l'utilisateur de 
 * upload une photo de profil
 */

class PhotosProfil extends Component{
    constructor(props) {
        super(props);

        this.state = {
          userProfilePic: '',
          editor: null,
          scaleValue: 1,
          connected:true
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
            this.setState({userProfilePic : this.DataURLtoFile(url,"image.png")});
        }
    }

    sendCard(event){
        event.preventDefault();
        const axios = require('axios');  //Requêtes HTTP
        let config = {
          headers: {
          logginid: Cookies.get("ID"),
          logginkey: Cookies.get("KEY")
          }
        }
        let formData = new FormData();
        console.log(this.state.userProfilePic);
        formData.append('file',this.state.userProfilePic);

        const url = URL_API+'addProfileImage.php';
          axios.post(url,formData,config)
          .then(res => {
            console.log(res.data);
            if(!res.data.connect){
              this.setState({connected:false});
            }
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
      if(!this.state.connected){
        Cookies.remove("ID");
        Cookies.remove("KEY");
        return(<Redirect to='/'/>);
      }//Ici on peut rajouter un state si c'est fini ca redirige vers edit profil
      return(
        <div>
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={this.profileImageChange} />
            <br/>
            <ImageCrop
              imageSrc={this.state.selectedImage}
              setEditorRef={this.setEditorRef}
              onCrop={this.onCrop}
              scaleValue={this.state.scaleValue}
              onScaleChange={this.onScaleChange}
              />
              
              {/* Submit */} 
            <form onSubmit={event => this.sendCard(event)}>
              <button disabled={this.state.userProfilePic===""} type="submit">Upload</button>
            </form>
        </div>
      );
    }
}

export default PhotosProfil;