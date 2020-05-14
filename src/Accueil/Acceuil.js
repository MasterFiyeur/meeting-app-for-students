import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

class Accueil extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <p>Bonjour (page Accueil) ! </p>
                <NavLink to="/login">
                    <button>Se connecter</button>
                </NavLink>
            </div>
        );
    }
}

export default Accueil;