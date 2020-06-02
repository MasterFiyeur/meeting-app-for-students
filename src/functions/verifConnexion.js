import Cookies from 'js-cookie';
import {URL_API} from '../App';

export function verifConnexion() {
    let connected= false;
    const url = URL_API+'isConnected.php';
        const axios = require('axios').default;  //Requêtes HTTP
        let config = {
            headers: {
              logginid: Cookies.get("ID"),
              logginkey: Cookies.get("KEY")
            }
        }
        axios.get(url,config)
        .then(res => {
          if(res.data.connect){
              return(true);
          }else{
              return(false);
          }
        })
        .catch(err => {
          console.log(err);
          return(false);
        });
}